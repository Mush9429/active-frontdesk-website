import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseAdmin, ONBOARDING_TABLE } from "@/lib/supabase";

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_auth")?.value === "authenticated";
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const { error } = await supabase.from(ONBOARDING_TABLE).delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, deleted: id });
}
