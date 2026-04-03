"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const industries = [
  {
    title: "Plumbers",
    description: "Burst pipes, blocked drains, hot water. Every call answered, every job booked.",
    emoji: "🔧",
  },
  {
    title: "Electricians",
    description: "Power faults, switchboard upgrades, safety inspections. On the spot.",
    emoji: "⚡",
  },
  {
    title: "Restaurants & Cafes",
    description: "Table bookings, catering enquiries, opening hours. Handled professionally.",
    emoji: "🍽️",
  },
  {
    title: "HVAC",
    description: "Emergency heating and cooling calls. After-hours service sorted.",
    emoji: "❄️",
  },
  {
    title: "Builders",
    description: "Quote requests, site visit bookings, client follow-ups. All managed.",
    emoji: "🏗️",
  },
  {
    title: "Medical & Dental",
    description: "Patient appointments, cancellation management, after-hours triage.",
    emoji: "🏥",
  },
];

export default function IdealFor() {
  const ref = useScrollAnimation();

  return (
    <section id="industries" ref={ref} className="fade-in-section py-24 md:py-32 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#3B82F6] font-semibold text-sm uppercase tracking-widest mb-3">
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
              className="bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:border-[#3B82F6]/30 hover:shadow-md transition-all group"
            >
              <div className="text-3xl mb-4">{industry.emoji}</div>
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
