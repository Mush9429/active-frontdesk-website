"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const stats = [
  {
    value: "24/7",
    label: "Availability",
    description: "No lunch breaks, no sick days, no closing time.",
  },
  {
    value: "Every Call",
    label: "Answered",
    description: "No voicemail. No rings left hanging.",
  },
  {
    value: "<2s",
    label: "Answer Time",
    description: "Picked up before the second ring, day or night.",
  },
];

export default function StatsBand() {
  const ref = useScrollAnimation();

  return (
    <section ref={ref} className="fade-in-section relative overflow-hidden bg-[#0F172A] py-20 md:py-24">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(37, 99, 235, 0.25) 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-0 sm:divide-x sm:divide-white/10">
          {stats.map((stat) => (
            <div key={stat.label} className="sm:px-8 first:sm:pl-0 last:sm:pr-0">
              <p className="text-4xl sm:text-5xl font-extrabold text-white mb-3">
                {stat.value}
              </p>
              <p className="text-sm font-semibold text-white mb-2">{stat.label}</p>
              <p className="text-sm text-[#94A3B8]">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
