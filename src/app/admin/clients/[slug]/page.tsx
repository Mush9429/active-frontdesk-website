import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseAdmin, ONBOARDING_TABLE, type OnboardingRow } from "@/lib/supabase";
import DeleteClientButton from "@/components/admin/DeleteClientButton";

export const dynamic = "force-dynamic";

// Field groups mirror the onboarding form, with human-readable labels.
const groups: { title: string; fields: { key: string; label: string }[] }[] = [
  {
    title: "Business Info",
    fields: [
      { key: "businessName", label: "Business name" },
      { key: "contactName", label: "Contact name" },
      { key: "contactEmail", label: "Contact email" },
      { key: "contactPhone", label: "Contact mobile" },
      { key: "businessPhone", label: "Business phone (to forward)" },
      { key: "abn", label: "ABN" },
      { key: "website", label: "Website" },
    ],
  },
  {
    title: "Service Details",
    fields: [
      { key: "industry", label: "Industry" },
      { key: "services", label: "Services offered" },
      { key: "serviceAreas", label: "Service areas / suburbs" },
      { key: "businessHours", label: "Business hours" },
      { key: "emergencyTypes", label: "Emergency call types" },
    ],
  },
  {
    title: "Voice & Greeting",
    fields: [
      { key: "receptionistName", label: "Receptionist name" },
      { key: "greeting", label: "Custom greeting" },
      { key: "tone", label: "Tone" },
    ],
  },
  {
    title: "Calendar & Booking",
    fields: [
      { key: "calendarType", label: "Calendar type" },
      { key: "calendarEmail", label: "Calendar account email" },
      { key: "appointmentDuration", label: "Appointment duration (min)" },
      { key: "maxBookingsPerDay", label: "Max bookings per day" },
    ],
  },
  {
    title: "Transfer & Escalation",
    fields: [
      { key: "transferNumber", label: "Transfer number (mobile)" },
      { key: "transferTriggers", label: "Transfer triggers" },
    ],
  },
  {
    title: "Pricing (for knowledge base)",
    fields: [
      { key: "calloutFee", label: "Call-out fee" },
      { key: "hourlyRate", label: "Hourly rate" },
      { key: "commonJobPrices", label: "Common job prices" },
    ],
  },
  {
    title: "Additional",
    fields: [
      { key: "existingCustomers", label: "Has existing customer list" },
      { key: "specialInstructions", label: "Special instructions" },
      { key: "howDidYouHear", label: "How they heard about us" },
    ],
  },
];

export default async function ClientDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = getSupabaseAdmin();
  if (!supabase) notFound();

  const { data, error } = await supabase
    .from(ONBOARDING_TABLE)
    .select("*")
    .eq("id", slug)
    .single();

  if (error || !data) notFound();
  const row = data as OnboardingRow;
  const form = row.data || {};

  return (
    <div>
      <Link href="/admin/clients" className="text-sm text-[#64748B] hover:text-white transition-colors inline-flex items-center gap-1.5 mb-6">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to all clients
      </Link>

      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{row.business_name || "Onboarding submission"}</h1>
          <p className="text-[#64748B] text-sm mt-1">
            Submitted {new Date(row.created_at).toLocaleString("en-AU", { dateStyle: "medium", timeStyle: "short" })}
            {" · "}
            <span className="capitalize">{row.status || "new"}</span>
          </p>
        </div>
        <DeleteClientButton id={row.id} businessName={row.business_name || ""} redirectTo="/admin/clients" />
      </div>

      <div className="space-y-5 max-w-3xl">
        {groups.map((group) => (
          <div key={group.title} className="bg-[#111113] border border-[#1E293B] rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-[#1E293B]">
              <h2 className="text-sm font-semibold text-white">{group.title}</h2>
            </div>
            <dl className="divide-y divide-[#1E293B]/50">
              {group.fields.map((field) => {
                const value = form[field.key];
                return (
                  <div key={field.key} className="px-5 py-3 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                    <dt className="text-xs text-[#64748B] uppercase tracking-wider">{field.label}</dt>
                    <dd className="text-sm text-[#E2E8F0] sm:col-span-2 whitespace-pre-wrap break-words">
                      {value && String(value).trim() ? String(value) : <span className="text-[#475569]">—</span>}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
