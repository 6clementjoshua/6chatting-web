// lib/jobEmails.ts

type ApplicantEmailParams = {
    fullName: string;
    jobTitle: string;
    applicationId: string;
};

type SupportEmailParams = {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    jobTitle: string;
    employmentType: string;
    shift: string;
    portfolio?: string;
    coverNote?: string;
    applicationId: string;
    cvUrl: string;
};

const LOGO_URL =
    "https://cuuxdbmmzlrcbrmoywcm.supabase.co/storage/v1/object/public/email-assets/6ix_logo_splash.PNG";

function shell({
    title,
    headline,
    bodyHtml,
    buttonLabel,
    buttonHref,
    footerNote,
}: {
    title: string;
    headline: string;
    bodyHtml: string;
    buttonLabel?: string;
    buttonHref?: string;
    footerNote?: string;
}) {
    const button = buttonLabel && buttonHref
        ? `
      <tr>
        <td align="center" style="padding:8px 18px 18px;">
          <a href="${buttonHref}" style="
                display:inline-block;
                padding:18px 34px;
                border-radius:999px;
                background:#ffffff;
                color:#0b0b0f;
                text-decoration:none;
                font-weight:800;
                font-size:18px;
                border:1px solid rgba(0,0,0,.08);
                box-shadow:
                  0 18px 40px rgba(0,0,0,.35),
                  inset 0 2px 0 rgba(255,255,255,.95),
                  inset 0 -10px 18px rgba(0,0,0,.12);
              ">
            ${buttonLabel}
          </a>
        </td>
      </tr>
    `
        : "";

    const footer = footerNote
        ? `
      <tr>
        <td align="center" style="padding:10px 18px 0;">
          <div class="muted" style="font-size:13px;line-height:1.6;max-width:540px;">
            ${footerNote}
          </div>
        </td>
      </tr>
    `
        : "";

    return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>${title}</title>

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
      .text { color: rgba(255, 255, 255, .72) !important; }
      .muted { color: rgba(255, 255, 255, .45) !important; }
      .logo-wrap { background: #ffffff !important; }
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
              <img src="${LOGO_URL}" width="56" height="56" alt="6Chatting" class="logo-wrap" style="
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
              <div class="title" style="font-size:46px;font-weight:800;letter-spacing:-0.02em;">
                ${headline}
              </div>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:10px 18px 26px;">
              <div class="text" style="font-size:18px;line-height:1.6;max-width:520px;">
                ${bodyHtml}
              </div>
            </td>
          </tr>

          ${button}

          ${footer}

          <tr>
            <td align="center" style="padding:32px 18px 6px;">
              <div class="muted" style="font-size:14px;line-height:1.7;">
                6Clement Joshua<br />
                Cross River State, Calabar, Nigeria
              </div>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:6px 18px 0;">
              <div class="muted" style="font-size:12px;">
                © 6Chatting. All rights reserved.
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

export function applicantConfirmationEmail(p: ApplicantEmailParams) {
    const bodyHtml = `
    Thank you, <b>${escapeHtml(p.fullName)}</b>.<br /><br />
    We have received your application for <b>${escapeHtml(p.jobTitle)}</b>.<br />
    Your reference ID is <b>${escapeHtml(p.applicationId)}</b>.<br /><br />
    Our team will review your application and contact you if you are shortlisted.
  `;

    return {
        subject: `Application received — ${p.jobTitle}`,
        html: shell({
            title: "Application Received",
            headline: "Application Received",
            bodyHtml,
            footerNote:
                "If you did not apply for a role at 6Chatting, you can safely ignore this email.",
        }),
        text: `Application Received

Thank you, ${p.fullName}.
We have received your application for ${p.jobTitle}.
Reference ID: ${p.applicationId}

If you did not apply, ignore this email.`,
    };
}

export function supportNotificationEmail(p: SupportEmailParams) {
    const bodyHtml = `
    New job application received for <b>${escapeHtml(p.jobTitle)}</b>.<br /><br />

    <b>Applicant</b><br />
    Name: ${escapeHtml(p.fullName)}<br />
    Email: ${escapeHtml(p.email)}<br />
    Phone: ${escapeHtml(p.phone)}<br />
    Location: ${escapeHtml(p.location)}<br /><br />

    <b>Preferences</b><br />
    Employment Type: ${escapeHtml(p.employmentType)}<br />
    Shift: ${escapeHtml(p.shift)}<br /><br />

    <b>Reference</b><br />
    Application ID: <b>${escapeHtml(p.applicationId)}</b><br /><br />

    ${p.portfolio ? `<b>Portfolio</b><br />${escapeHtml(p.portfolio)}<br /><br />` : ""}
    ${p.coverNote ? `<b>Cover Note</b><br />${escapeHtml(p.coverNote).replace(/\n/g, "<br />")}<br /><br />` : ""}

    <b>CV</b><br />
    Use the button below to open the uploaded CV.
  `;

    return {
        subject: `New application — ${p.jobTitle} — ${p.fullName}`,
        html: shell({
            title: "New Job Application",
            headline: "New Job Application",
            bodyHtml,
            buttonLabel: "Open CV",
            buttonHref: p.cvUrl,
            footerNote: "This email was generated by the 6Chatting Jobs system.",
        }),
        text: `New job application

Role: ${p.jobTitle}
Applicant: ${p.fullName}
Email: ${p.email}
Phone: ${p.phone}
Location: ${p.location}
Employment Type: ${p.employmentType}
Shift: ${p.shift}
Application ID: ${p.applicationId}
CV: ${p.cvUrl}
`,
    };
}

function escapeHtml(s: string) {
    return s
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
