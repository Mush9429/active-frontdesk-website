import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client using the service-role key.
 * NEVER import this into a client component — the service-role key must stay on the server.
 *
 * Returns null when the env vars aren't configured yet, so the app still builds and runs
 * (the onboarding API and admin views degrade gracefully until Supabase is connected).
 */
let cached: SupabaseClient | null | undefined;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    cached = null;
    return null;
  }

  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export const ONBOARDING_TABLE = "onboarding_submissions";

export interface OnboardingRow {
  id: string;
  created_at: string;
  status: string;
  business_name: string | null;
  contact_name: string | null;
  contact_email: string | null;
  industry: string | null;
  data: Record<string, string>;
}
