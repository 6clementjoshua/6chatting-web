import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { applicantConfirmationEmail, supportNotificationEmail } from "@/lib/jobEmails";

function safeName(name: string) {
    return name.replace(/[^\w.\-]+/g, "_");
}

export async function POST(req: Request) {
    try {
        const form = await req.formData();

        const jobId = String(form.get("jobId") || "").trim();
        const jobTitle = String(form.get("jobTitle") || "").trim();

        const fullName = String(form.get("fullName") || "").trim();
        const email = String(form.get("email") || "").trim();
        const phone = String(form.get("phone") || "").trim();
        const location = String(form.get("location") || "").trim();

        const employmentType = String(form.get("employmentType") || "").trim();
        const shift = String(form.get("shift") || "").trim();

        const portfolio = String(form.get("portfolio") || "").trim();
        const coverNote = String(form.get("coverNote") || "").trim();

        const cv = form.get("cv");

        if (!jobId || !jobTitle) {
            return NextResponse.json({ error: "Missing job selection." }, { status: 400 });
        }
        if (!fullName || !email || !phone || !location || !employmentType || !shift) {
            return NextResponse.json({ error: "Missing required applicant fields." }, { status: 400 });
        }
        if (!(cv instanceof File) || !cv.name) {
            return NextResponse.json({ error: "CV upload is required." }, { status: 400 });
        }

        // Basic size limit (adjust if you want)
        const MAX_BYTES = 20 * 1024 * 1024;
        if (cv.size > MAX_BYTES) {
            return NextResponse.json({ error: "CV is too large. Max 20MB." }, { status: 400 });
        }

        const bucket = "job-cvs";

        const now = new Date();
        const yyyy = now.getUTCFullYear();
        const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
        const dd = String(now.getUTCDate()).padStart(2, "0");

        const fileName = safeName(cv.name);
        const key = `${yyyy}/${mm}/${dd}/${crypto.randomUUID()}_${fileName}`;

        // 1) Upload file (service role)
        const { error: upErr } = await supabaseAdmin().storage
            .from(bucket)
            .upload(key, cv, {
                contentType: cv.type || "application/octet-stream",
                upsert: false,
            });

        if (upErr) {
            return NextResponse.json({ error: `CV upload failed: ${upErr.message}` }, { status: 500 });
        }

        // 2) Insert DB record (store path permanently)
        const { data: row, error: insErr } = await supabaseAdmin()
            .from("jobs_applications")
            .insert({
                job_id: jobId,
                job_title: jobTitle,
                full_name: fullName,
                email,
                phone,
                location,
                employment_type: employmentType,
                shift,
                portfolio: portfolio || null,
                cover_note: coverNote || null,
                cv_bucket: bucket,
                cv_path: key,
                // private bucket: public url not available
                cv_public_url: null,
                cv_file_name: cv.name,
                cv_mime_type: cv.type || null,
                cv_size: cv.size,
            })
            .select("id, created_at")
            .single();

        if (insErr || !row?.id) {
            // cleanup uploaded file if DB insert fails
            await supabaseAdmin().storage.from(bucket).remove([key]);
            return NextResponse.json(
                { error: `DB insert failed: ${insErr?.message || "Unknown error"}` },
                { status: 500 }
            );
        }

        // 3) Create signed URL for HR/support (expires)
        const EXPIRES_SECONDS = 60 * 60 * 24 * 7; // 7 days
        const { data: signed, error: signErr } = await supabaseAdmin().storage
            .from(bucket)
            .createSignedUrl(key, EXPIRES_SECONDS);

        // If signing fails, we still keep the application (fail-soft)
        const cvSignedUrl = signErr ? "" : (signed?.signedUrl || "");

        // 4) Send emails (optional but recommended)
        const resendKey = process.env.RESEND_API_KEY;
        const from = process.env.EMAIL_FROM;
        const supportTo = process.env.EMAIL_SUPPORT_TO || "support@6chatting.com";

        if (resendKey && from) {
            const resend = new Resend(resendKey);

            const applicantMail = applicantConfirmationEmail({
                fullName,
                jobTitle,
                applicationId: row.id,
            });

            const supportMail = supportNotificationEmail({
                fullName,
                email,
                phone,
                location,
                jobTitle,
                employmentType,
                shift,
                portfolio: portfolio || undefined,
                coverNote: coverNote || undefined,
                applicationId: row.id,
                cvUrl: cvSignedUrl || "(Signed URL unavailable — generate from admin)",
            });

            const [aRes, sRes] = await Promise.allSettled([
                resend.emails.send({
                    from,
                    to: email,
                    subject: applicantMail.subject,
                    html: applicantMail.html,
                    text: applicantMail.text,
                }),
                resend.emails.send({
                    from,
                    to: supportTo,
                    subject: supportMail.subject,
                    html: supportMail.html,
                    text: supportMail.text,
                }),
            ]);

            if (aRes.status === "rejected") console.error("Applicant email failed:", aRes.reason);
            if (sRes.status === "rejected") console.error("Support email failed:", sRes.reason);
        }

        return NextResponse.json(
            {
                ok: true,
                applicationId: row.id,
                createdAt: row.created_at,
            },
            { status: 200 }
        );
    } catch (e: any) {
        return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
    }
}
