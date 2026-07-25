"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const industries = [
  {
    title: "Plumbers",
    description: "Burst pipes, blocked drains, hot water. Every call answered, every job booked.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085z" />
      </svg>
    ),
  },
  {
    title: "Electricians",
    description: "Power faults, switchboard upgrades, safety inspections. On the spot.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Restaurants & Cafes",
    description: "Table bookings, catering enquiries, opening hours. Handled professionally.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.29c0 .82-.664 1.483-1.483 1.483H4.483A1.483 1.483 0 013 20.755v-5.29c0-1.081.768-2.016 1.837-2.174A47.78 47.78 0 016 13.12" />
      </svg>
    ),
  },
  {
    title: "HVAC",
    description: "Emergency heating and cooling calls. After-hours service sorted.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07M8 6l4-2 4 2M8 18l4 2 4-2M6 8l-2 4 2 4M18 8l2 4-2 4" />
      </svg>
    ),
  },
  {
    title: "Builders",
    description: "Quote requests, site visit bookings, client follow-ups. All managed.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    title: "Medical & Dental",
    description: "Patient appointments, cancellation management, after-hours triage.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
];

export default function IdealFor() {
  const ref = useScrollAnimation();

  return (
    <section id="industries" ref={ref} className="fade-in-section py-24 md:py-32 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#2563EB] font-semibold text-sm uppercase tracking-widest mb-3">
            Industries
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] mb-4">
            Built for businesses that can&apos;t<br className="hidden sm:block" /> afford to miss a call.
          </h2>
          <p className="text-[#475569] text-lg max-w-2xl mx-auto">
            From tradies on the tools to restaurants during the dinner rush.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:border-[#2563EB]/30 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] flex items-center justify-center mb-5 group-hover:bg-[#2563EB] group-hover:text-white group-hover:border-[#2563EB] transition-all">
                {industry.icon}
              </div>
              <h3 className="font-bold text-[#0F172A] text-lg mb-2">
                {industry.title}
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                {industry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
