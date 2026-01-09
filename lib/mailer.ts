export async function sendSupportThankYouEmail(opts: {
    to: string;
    displayName?: string | null;
    amountFormatted: string;
    provider: "stripe" | "flutterwave";
    receiptUrl?: string | null;
}) {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.SUPPORT_FROM_EMAIL;
    const replyTo = process.env.SUPPORT_REPLY_TO || undefined;

    if (!apiKey || !from) return; // fail-safe: do not break webhook

    const subject = "Thank you for supporting the build of 6chatting";

    const greetingName = (opts.displayName || "").trim() || "there";
    const receiptLine = opts.receiptUrl ? `Receipt: ${opts.receiptUrl}` : "";

    const text = [
        `Hi ${greetingName},`,
        ``,
        `Thank you for supporting the build of 6chatting.`,
        `We’ve confirmed your contribution of ${opts.amountFormatted} via ${opts.provider.toUpperCase()}.`,
        ``,
        `Your support helps infrastructure, reliability, and launch readiness for premium real-time translation.`,
        receiptLine ? `` : "",
        receiptLine || "",
        ``,
        `— 6chatting`,
        `A 6clement Joshua Service`,
    ].filter(Boolean).join("\n");

    await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from,
            to: [opts.to],
            subject,
            text,
            reply_to: replyTo,
        }),
    });
}
