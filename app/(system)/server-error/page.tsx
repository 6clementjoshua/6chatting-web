import Image from "next/image";

function cx(...parts: Array<string | false | undefined | null>) {
    return parts.filter(Boolean).join(" ");
}

function LogoBadge({ size = 56, className = "" }: { size?: number; className?: string }) {
    return (
        <div className={cx("logoBadge", className)} style={{ width: size, height: size }} aria-hidden="true">
            <Image src="/6logo.PNG" alt="6chatting" fill sizes={`${size}px`} className="object-contain" priority />
        </div>
    );
}

export default function ServerErrorPage() {
    return (
        <main className="wrap">
            <section className="card" role="status" aria-live="polite">
                <div className="top">
                    <LogoBadge />
                </div>

                <h1 className="title">We’re fixing something</h1>

                <p className="text">
                    Sorry — our server had trouble processing this request. This is usually temporary.
                    Please refresh in a moment. If it continues, contact support and include your <b>Cloudflare Ray ID</b> if shown.
                </p>

                <div className="actions">
                    <a className="btn primary" href="javascript:location.reload()">Try Again</a>
                    <a className="btn" href="mailto:support@6chatting.com?subject=6chatting%20Server%20Error%20(500)">
                        Contact Support
                    </a>
                </div>

                <div className="note">
                    <div className="noteTitle">Helpful notes</div>
                    <div className="noteText">
                        • If you just tried again and it still fails, wait 30–60 seconds and retry.<br />
                        • If you’re on a weak network, switching networks may help.<br />
                        • If Cloudflare shows a <b>Ray ID</b>, include it in your email — it speeds up investigation.
                    </div>
                </div>

                <div className="footer">
                    <div>6Clement Joshua</div>
                    <div>Cross River State, Calabar, Nigeria</div>
                    <div className="muted">© 6chatting. All rights reserved.</div>
                </div>
                <div
                    dangerouslySetInnerHTML={{
                        __html: "::CLOUDFLARE_ERROR_500S_BOX::",
                    }}
                    aria-hidden="true"
                />

            </section>

            <style>{`
        :root { color-scheme: light; }
        .wrap{
          min-height: 100dvh;
          display:flex;
          align-items:center;
          justify-content:center;
          padding: 40px 16px;
          background: #ffffff;
          color: #0b0b0f;
          font-family: var(--font-sans), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        }
        .card{
          width: min(680px, 100%);
          border-radius: 28px;
          border: 1px solid rgba(0,0,0,.10);
          background: rgba(255,255,255,.92);
          padding: 28px 22px;
          box-shadow:
            18px 18px 44px rgba(0,0,0,.12),
            -18px -18px 44px rgba(255,255,255,.95),
            inset 0 2px 0 rgba(255,255,255,.85);
        }
        .top{ display:flex; justify-content:center; padding-top:6px; }
        .logoBadge{
          position: relative;
          border-radius: 18px;
          padding: 10px;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,.10);
          box-shadow: 0 14px 34px rgba(0,0,0,.22);
          overflow:hidden;
        }
        .title{
          margin: 18px 0 8px;
          text-align:center;
          font-size: clamp(28px, 4.6vw, 44px);
          line-height: 1.05;
          letter-spacing: -0.03em;
          font-weight: 900;
          font-family: var(--font-display), var(--font-sans), system-ui;
        }
        .text{
          margin: 0 auto;
          text-align:center;
          max-width: 58ch;
          font-size: 16px;
          line-height: 1.75;
          color: rgba(11,11,15,.80);
          font-weight: 650;
        }
        .actions{
          margin-top: 18px;
          display:flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content:center;
        }
        .btn{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          padding: 14px 18px;
          border-radius: 999px;
          text-decoration:none;
          font-weight: 900;
          font-size: 14px;
          color: #0b0b0f;
          background:#ffffff;
          border:1px solid rgba(0,0,0,.10);
          box-shadow:
            0 16px 40px rgba(0,0,0,.18),
            inset 0 2px 0 rgba(255,255,255,.95),
            inset 0 -10px 18px rgba(0,0,0,.08);
          transition: transform .15s ease, box-shadow .15s ease;
        }
        .btn:hover{ transform: translateY(1px); }
        .btn.primary{
          box-shadow:
            0 18px 46px rgba(0,0,0,.22),
            inset 0 2px 0 rgba(255,255,255,.95),
            inset 0 -12px 22px rgba(0,0,0,.10);
        }
        .note{
          margin-top: 18px;
          padding: 14px 14px;
          border-radius: 18px;
          border: 1px solid rgba(0,0,0,.10);
          background: rgba(255,255,255,.86);
        }
        .noteTitle{
          font-weight: 900;
          font-size: 13px;
          letter-spacing: -0.01em;
          color: rgba(11,11,15,.92);
        }
        .noteText{
          margin-top: 6px;
          font-weight: 650;
          font-size: 12.5px;
          line-height: 1.7;
          color: rgba(11,11,15,.72);
        }
        .footer{
          margin-top: 18px;
          text-align:center;
          font-size: 12.5px;
          line-height: 1.7;
          color: rgba(11,11,15,.62);
          font-weight: 650;
        }
        .muted{ opacity: .75; }

        @media (prefers-color-scheme: dark) {
          .wrap { background: #050505; color: #ffffff; }
          .card{
            background: rgba(10,10,10,.75);
            border-color: rgba(255,255,255,.10);
            box-shadow: 0 24px 70px rgba(0,0,0,.60);
          }
          .text, .noteText, .footer { color: rgba(255,255,255,.72); }
          .noteTitle{ color: rgba(255,255,255,.90); }
          .btn{
            background: rgba(255,255,255,.92);
            color: #0b0b0f;
          }
        }
      `}</style>
        </main>
    );
}
