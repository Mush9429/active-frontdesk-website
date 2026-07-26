import Link from "next/link";
import { getSupabaseAdmin, ONBOARDING_TABLE, type OnboardingRow } from "@/lib/supabase";

// Always fetch fresh on each request (no build-time static generation, no env vars needed at build).
export const dynamic = "force-dynamic";

const statusStyles: Record<string, string> = {
  new: "bg-[#2563EB]/10 text-[#2563EB]",
  "in-progress": "bg-amber-500/10 text-amber-400",
  live: "bg-emerald-500/10 text-emerald-400",
};

function SetupNotice() {
  return (
    <div className="bg-[#111113] border border-[#1E293B] rounded-xl p-8 text-center">
      <h2 className="text-lg font-semibold text-white mb-2">Connect Supabase to see submissions</h2>
      <p className="text-[#94A3B8] text-sm max-w-md mx-auto">
        Onboarding submissions are stored in Supabase. Add <code className="text-[#2563EB]">SUPABASE_URL</code> and{" "}
        <code className="text-[#2563EB]">SUPABASE_SERVICE_ROLE_KEY</code> to your environment variables, then reload
        this page.
      </p>
    </div>
  );
}

export default async function AdminClients() {
  const supabase = getSupabaseAdmin();

  let rows: OnboardingRow[] = [];
  let loadError = "";

  if (supabase) {
    const { data, error } = await supabase
      .from(ONBOARDING_TABLE)
      .select("id, created_at, status, business_name, contact_name, contact_email, industry")
      .order("created_at", { ascending: false });
    if (error) loadError = error.message;
    else rows = (data as OnboardingRow[]) ?? [];
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Clients & Onboarding</h1>
        <p className="text-[#64748B] text-sm mt-1">
          Businesses that submitted the onboarding form — everything you need to set up their receptionist.
        </p>
      </div>

      {!supabase ? (
        <SetupNotice />
      ) : loadError ? (
        <div className="bg-[#111113] border border-red-500/30 rounded-xl p-6 text-red-400 text-sm">
          Failed to load submissions: {loadError}
        </div>
      ) : rows.length === 0 ? (
        <div className="bg-[#111113] border border-[#1E293B] rounded-xl p-12 text-center">
          <h2 className="text-lg font-semibold text-white mb-2">No submissions yet</h2>
          <p className="text-[#94A3B8] text-sm max-w-md mx-auto">
            When a new client fills out{" "}
            <code className="text-[#2563EB]">/onboard</code>, their details will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-[#111113] border border-[#1E293B] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1E293B]">
                <th className="text-left text-xs font-medium text-[#64748B] uppercase tracking-wider px-5 py-3">Business</th>
                <th className="text-left text-xs font-medium text-[#64748B] uppercase tracking-wider px-5 py-3 hidden sm:table-cell">Industry</th>
                <th className="text-left text-xs font-medium text-[#64748B] uppercase tracking-wider px-5 py-3 hidden md:table-cell">Submitted</th>
                <th className="text-left text-xs font-medium text-[#64748B] uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-right text-xs font-medium text-[#64748B] uppercase tracking-wider px-5 py-3">Details</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-[#1E293B]/50 last:border-0 hover:bg-[#1E293B]/20 transition-colors">
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-white">{row.business_name || "—"}</p>
                    <p className="text-xs text-[#64748B] mt-0.5">{row.contact_name}{row.contact_email ? ` · ${row.contact_email}` : ""}</p>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="text-sm text-[#94A3B8] capitalize">{row.industry || "—"}</span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-xs text-[#64748B]">
                      {new Date(row.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${statusStyles[row.status] || "bg-[#1E293B] text-[#94A3B8]"}`}>
                      {row.status || "new"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link href={`/admin/clients/${row.id}`} className="text-xs text-[#2563EB] hover:text-[#1D4ED8] font-medium transition-colors">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
