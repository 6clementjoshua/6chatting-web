import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _admin: SupabaseClient | null = null;

export function supabaseAdmin(): SupabaseClient {
    if (_admin) return _admin;

    const url = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceKey) {
        // IMPORTANT: Don't throw at import-time in Next.js builds.
        // We throw only when this function is actually called.
        throw new Error(
            "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
        );
    }

    _admin = createClient(url, serviceKey, {
        auth: { persistSession: false },
    });

    return _admin;
}
