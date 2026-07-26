import { NextResponse } from "next/server";
import { getSupabaseAdmin, ONBOARDING_TABLE } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const data = await request.json();

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

    const { error } = await supabase.from(ONBOARDING_TABLE).insert({
      business_name: data.businessName,
      contact_name: data.contactName,
      contact_email: data.contactEmail,
      industry: data.industry,
      status: "new",
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
