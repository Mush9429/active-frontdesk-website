import { NextResponse } from "next/server";
import { getSupabaseAdmin, ONBOARDING_TABLE } from "@/lib/supabase";

const MIN_FILL_TIME_MS = 3000; // a real 5-step form takes far longer than this to complete
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 3; // max submissions per IP per window

function getClientIp(request: Request): string | null {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Anti-spam metadata is sent alongside the real form fields — pull it out before anything
    // else touches `data`, so it never gets persisted as if it were a genuine business answer.
    const { _hp: honeypot, _startedAt: startedAt, ...data } = body;

    // Honeypot: real visitors never see or fill this field.
    if (honeypot) {
      return NextResponse.json({ error: "Submission rejected." }, { status: 400 });
    }

    // Timing: bots typically submit within milliseconds of loading the page.
    if (typeof startedAt === "number" && Date.now() - startedAt < MIN_FILL_TIME_MS) {
      return NextResponse.json({ error: "Submission rejected." }, { status: 400 });
    }

    // Validate required fields
    const required = [
      "businessName",
      "contactName",
      "contactEmail",
      "contactPhone",
      "businessPhone",
      "industry",
    ];
    const missing = required.filter((field) => !data[field]);
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      // Env vars not configured yet — fail loudly so submissions are never silently lost.
      return NextResponse.json(
        { error: "Submissions are not yet configured. Please contact us directly." },
        { status: 503 }
      );
    }

    const ip = getClientIp(request);

    // Rate limit: reject if this IP has submitted too many times recently.
    if (ip) {
      const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
      const { count } = await supabase
        .from(ONBOARDING_TABLE)
        .select("id", { count: "exact", head: true })
        .eq("ip_address", ip)
        .gte("created_at", since);

      if ((count ?? 0) >= RATE_LIMIT_MAX) {
        return NextResponse.json(
          { error: "Too many submissions. Please try again later, or email us directly." },
          { status: 429 }
        );
      }
    }

    const { error } = await supabase.from(ONBOARDING_TABLE).insert({
      business_name: data.businessName,
      contact_name: data.contactName,
      contact_email: data.contactEmail,
      industry: data.industry,
      status: "new",
      ip_address: ip,
      data, // full form payload as JSONB
    });

    if (error) {
      console.error("Supabase insert failed:", error.message);
      return NextResponse.json(
        { error: "Failed to save submission." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Onboarding form submitted successfully.",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process submission." },
      { status: 500 }
    );
  }
}
