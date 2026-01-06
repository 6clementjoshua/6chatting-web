// app/api/waitlist/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as { email?: string };
    const cleanEmail = (email ?? "").trim().toLowerCase();

    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Create clients INSIDE the handler (build-safe)
    const resendKey = process.env.RESEND_API_KEY;
    const from = process.env.WAITLIST_FROM;
    const siteUrl = process.env.SITE_URL ?? "https://6chatting.com";

    if (!resendKey) {
      return NextResponse.json(
        { ok: false, error: "Email service not configured." },
        { status: 500 }
      );
    }
    if (!from) {
      return NextResponse.json(
        { ok: false, error: "Sender email not configured." },
        { status: 500 }
      );
    }

    const supabase = supabaseAdmin();

    // Insert into waitlist (duplicates treated as OK if email is UNIQUE)
    const { error: insertError } = await supabase
      .from("waitlist")
      .insert({ email: cleanEmail });

    if (insertError) {
      const msg = insertError.message.toLowerCase();
      const isDuplicate =
        msg.includes("duplicate") || msg.includes("unique constraint");
      if (!isDuplicate) {
        return NextResponse.json(
          { ok: false, error: "Could not join waitlist. Try again." },
          { status: 500 }
        );
      }
    }

    const logoUrl =
      "https://cuuxdbmmzlrcbrmoywcm.supabase.co/storage/v1/object/public/email-assets/6ix_logo_splash.PNG";

    const privacyUrl = `${siteUrl}/policies/privacy`;
    const termsUrl = `${siteUrl}/policies/terms`;

    const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>You're on the 6Chatting Waitlist</title>

  <style>
    body { margin:0; padding:0; background-color:#ffffff; color:#0b0b0f;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; }
    .container { background-color:#ffffff; }
    .title { color:#0b0b0f; }
    .text { color:#3a3a3a; }
    .muted { color:#6b6b6b; }

    @media (prefers-color-scheme: dark) {
      body { background-color:#050505 !important; color:#ffffff !important; }
      .container { background-color:#050505 !important; }
      .title { color:#ffffff !important; }
      .text { color: rgba(255,255,255,.72) !important; }
      .muted { color: rgba(255,255,255,.45) !important; }
      .logo-wrap { background:#ffffff !important; }
    }
  </style>
</head>

<body>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="container">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="620" cellspacing="0" cellpadding="0" style="max-width:620px;">

          <tr>
            <td align="center" style="padding:10px 0 18px;">
              <img src="${logoUrl}" width="56" height="56" alt="6Chatting" class="logo-wrap" style="
                display:block; border-radius:16px; padding:10px; background:#ffffff;
                box-shadow:0 10px 30px rgba(0,0,0,.25);
              " />
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:10px 0 8px;">
              <div class="title" style="font-size:46px;font-weight:800;letter-spacing:-0.02em;">
                You’re on the Waitlist
              </div>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:10px 18px 26px;">
              <div class="text" style="font-size:18px;line-height:1.6;max-width:520px;">
                Thanks for joining <b>6Chatting</b>.
                We’ll email you the moment the app is live on the stores.
              </div>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:8px 18px 18px;">
              <a href="${siteUrl}" style="
                display:inline-block; padding:18px 34px; border-radius:999px;
                background:#ffffff; color:#0b0b0f; text-decoration:none;
                font-weight:800; font-size:18px; border:1px solid rgba(0,0,0,.08);
                box-shadow: 0 18px 40px rgba(0,0,0,.35),
                            inset 0 2px 0 rgba(255,255,255,.95),
                            inset 0 -10px 18px rgba(0,0,0,.12);
              ">
                Visit 6Chatting
              </a>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:0 18px 10px;">
              <div class="muted" style="font-size:12px;line-height:1.6;max-width:560px;">
                You can keep this email as confirmation that your address was added to the waitlist.
              </div>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:32px 18px 6px;">
              <div class="muted" style="font-size:14px;line-height:1.7;">
                6Clement Joshua<br />
                Cross River State, Calabar, Nigeria<br />
                © 6Chatting. All rights reserved.
              </div>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:10px 18px 0;">
              <div class="muted" style="font-size:12px;line-height:1.8;">
                <a href="${privacyUrl}" style="color:inherit;text-decoration:none;margin:0 10px;">Privacy Policy</a>
                <a href="${termsUrl}" style="color:inherit;text-decoration:none;margin:0 10px;">Terms of Service</a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const resend = new Resend(resendKey);

    await resend.emails.send({
      from,
      to: cleanEmail,
      subject: "You’re on the 6chatting waitlist",
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "Unexpected error. Try again." },
      { status: 500 }
    );
  }
}
