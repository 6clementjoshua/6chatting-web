import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const RESEND_FROM = process.env.RESEND_FROM || "6chatting Support <support@6chatting.com>";
const SUPPORT_INTERNAL_NOTIFY = process.env.SUPPORT_INTERNAL_NOTIFY; // optional

function requiredEnv() {
    if (!SUPABASE_URL) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
    if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
    if (!RESEND_API_KEY) throw new Error("Missing RESEND_API_KEY");
}

function escapeHtml(input: string) {
    return input
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function buildUserConfirmationEmail(params: {
    name?: string | null;
    email: string;
    ticketId: string;
    topic: string;
    accountType: string;
    reference?: string | null;
    message: string;
}) {
    const logoUrl =
        "https://cuuxdbmmzlrcbrmoywcm.supabase.co/storage/v1/object/public/email-assets/6ix_logo_splash.PNG";

    const safeName = params.name?.trim() ? escapeHtml(params.name.trim()) : "there";
    const safeTopic = escapeHtml(params.topic);
    const safeAcct = escapeHtml(params.accountType);
    const safeRef = params.reference?.trim() ? escapeHtml(params.reference.trim()) : "";
    const safeMsg = escapeHtml(params.message).replaceAll("\n", "<br/>");

    // Mirror your premium email language and layout, but NO BUTTON.
    return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>We received your request</title>

  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      color: #0b0b0f;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
    }

    .container { background-color: #ffffff; }
    .title { color: #0b0b0f; }
    .text { color: #3a3a3a; }
    .muted { color: #6b6b6b; }

    @media (prefers-color-scheme: dark) {
      body { background-color: #050505 !important; color: #ffffff !important; }
      .container { background-color: #050505 !important; }
      .title { color: #ffffff !important; }
      .text { color: rgba(255,255,255,.72) !important; }
      .muted { color: rgba(255,255,255,.45) !important; }
      .logo-wrap { background: #ffffff !important; }
      .card { background: rgba(255,255,255,.06) !important; border-color: rgba(255,255,255,.12) !important; }
      .chip { background: rgba(255,255,255,.08) !important; border-color: rgba(255,255,255,.12) !important; }
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
              <img src="${logoUrl}" width="56" height="56" alt="6chatting" class="logo-wrap" style="
                display:block;
                border-radius:16px;
                padding:10px;
                background:#ffffff;
                box-shadow:0 10px 30px rgba(0,0,0,.25);
              " />
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:10px 0 8px;">
              <div class="title" style="font-size:44px;font-weight:800;letter-spacing:-0.02em;line-height:1.06;">
                We received your request
              </div>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:10px 18px 22px;">
              <div class="text" style="font-size:18px;line-height:1.6;max-width:520px;">
                Hi <b>${safeName}</b> — thanks for contacting <b>6chatting</b>.
                Your message has been received by our team. We’ll review it and respond with the safest next steps.
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:0 18px 18px;">
              <div class="card" style="
                border-radius:20px;
                border:1px solid rgba(0,0,0,.10);
                background:#ffffff;
                box-shadow:0 18px 40px rgba(0,0,0,.10);
                padding:18px;
              ">
                <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:14px;">
                  <span class="chip" style="
                    display:inline-block;
                    padding:10px 14px;
                    border-radius:999px;
                    background:#ffffff;
                    border:1px solid rgba(0,0,0,.08);
                    box-shadow: inset 0 2px 0 rgba(255,255,255,.95), inset 0 -10px 18px rgba(0,0,0,.06);
                    font-weight:800;
                    font-size:12px;
                    color:#0b0b0f;
                  ">Ticket: ${escapeHtml(params.ticketId)}</span>

                  <span class="chip" style="
                    display:inline-block;
                    padding:10px 14px;
                    border-radius:999px;
                    background:#ffffff;
                    border:1px solid rgba(0,0,0,.08);
                    box-shadow: inset 0 2px 0 rgba(255,255,255,.95), inset 0 -10px 18px rgba(0,0,0,.06);
                    font-weight:800;
                    font-size:12px;
                    color:#0b0b0f;
                  ">Topic: ${safeTopic}</span>

                  <span class="chip" style="
                    display:inline-block;
                    padding:10px 14px;
                    border-radius:999px;
                    background:#ffffff;
                    border:1px solid rgba(0,0,0,.08);
                    box-shadow: inset 0 2px 0 rgba(255,255,255,.95), inset 0 -10px 18px rgba(0,0,0,.06);
                    font-weight:800;
                    font-size:12px;
                    color:#0b0b0f;
                  ">Account: ${safeAcct}</span>
                </div>

                ${safeRef
            ? `<div class="muted" style="font-size:13px;line-height:1.7;margin:0 0 10px;">
                        Reference: <span style="font-weight:700;color:inherit;">${safeRef}</span>
                      </div>`
            : ""
        }

                <div class="muted" style="font-size:13px;line-height:1.7;margin:0 0 6px;">
                  Your message:
                </div>
                <div class="text" style="font-size:15px;line-height:1.8;">
                  ${safeMsg}
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:0 18px 12px;">
              <div class="muted" style="font-size:12px;line-height:1.7;max-width:560px;">
                Safety reminder: 6chatting will never ask for your password or OTP code. If anyone requests that, do not share it.
              </div>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:28px 18px 6px;">
              <div class="muted" style="font-size:14px;line-height:1.7;">
                6Clement Joshua<br />
                Cross River State, Calabar, Nigeria
              </div>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:6px 18px 0;">
              <div class="muted" style="font-size:12px;">
                © 6chatting. All rights reserved.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(req: Request) {
    try {
        requiredEnv();

        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
            auth: { persistSession: false },
        });
        const resend = new Resend(RESEND_API_KEY);

        const body = await req.json();

        const topic = String(body.topic ?? "general").slice(0, 60);
        const account_type = String(body.accountType ?? "personal").slice(0, 30);

        const name = body.name ? String(body.name).slice(0, 120) : null;
        const email = String(body.email ?? "").trim().toLowerCase().slice(0, 180);
        const reference = body.reference ? String(body.reference).slice(0, 120) : null;
        const message = String(body.message ?? "").trim().slice(0, 5000);

        if (!email || !message) {
            return NextResponse.json({ ok: false, error: "Missing email or message." }, { status: 400 });
        }

        // Useful request metadata
        const user_agent = req.headers.get("user-agent") || null;
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            req.headers.get("x-real-ip") ||
            null;

        const page = body.page ? String(body.page).slice(0, 120) : "/help";

        // 1) Insert into DB
        const { data, error } = await supabase
            .from("support_requests")
            .insert({
                topic,
                account_type,
                name,
                email,
                reference,
                message,
                page,
                user_agent,
                ip,
            })
            .select("id, created_at")
            .single();

        if (error || !data?.id) {
            return NextResponse.json({ ok: false, error: "Failed to create request." }, { status: 500 });
        }

        const ticketId = String(data.id);

        // 2) Send branded confirmation email to user (NO BUTTON)
        const html = buildUserConfirmationEmail({
            name,
            email,
            ticketId,
            topic,
            accountType: account_type,
            reference,
            message,
        });

        await resend.emails.send({
            from: RESEND_FROM,
            to: [email],
            subject: "6chatting Support — We received your request",
            html,
        });

        // Optional: notify internal support inbox with the raw details
        if (SUPPORT_INTERNAL_NOTIFY) {
            await resend.emails.send({
                from: RESEND_FROM,
                to: [SUPPORT_INTERNAL_NOTIFY],
                subject: `New support request: ${topic} (${account_type})`,
                html: `<pre style="font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; white-space:pre-wrap; line-height:1.6;">
Ticket: ${escapeHtml(ticketId)}
Topic: ${escapeHtml(topic)}
Account: ${escapeHtml(account_type)}
Name: ${escapeHtml(name ?? "")}
Email: ${escapeHtml(email)}
Reference: ${escapeHtml(reference ?? "")}
Page: ${escapeHtml(page)}
IP: ${escapeHtml(ip ?? "")}
UA: ${escapeHtml(user_agent ?? "")}

Message:
${escapeHtml(message)}
</pre>`,
            });
        }

        return NextResponse.json({ ok: true, ticketId }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
    }
}
