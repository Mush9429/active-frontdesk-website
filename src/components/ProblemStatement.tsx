"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const painPoints = [
  {
    stat: "68%",
    text: "of callers won't leave a voicemail",
    subtext: "They just call the next business.",
  },
  {
    stat: "$200-500",
    text: "lost per missed call",
    subtext: "That's revenue walking out the door.",
  },
  {
    stat: "After 5pm",
    text: "is when most customers call",
    subtext: "And you're already done for the day.",
  },
  {
    stat: "0 sec",
    text: "is how long they'll wait",
    subtext: "Miss the call. Lose the job.",
  },
];

export default function ProblemStatement() {
  const ref = useScrollAnimation();

  return (
    <section ref={ref} className="fade-in-section py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-red-500 font-semibold text-sm uppercase tracking-widest mb-3">
            The Problem
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] mb-4">
            You&apos;re losing jobs right now.
          </h2>
          <p className="text-[#475569] text-lg max-w-2xl mx-auto">
            Every time your phone rings and nobody picks up, money walks straight to your competitor.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:border-red-300 transition-colors group shadow-sm"
            >
              <p className="text-3xl font-extrabold text-[#0F172A] mb-2 group-hover:text-red-500 transition-colors">
                {point.stat}
              </p>
              <p className="text-[#0F172A] font-semibold text-sm mb-1">
                {point.text}
              </p>
              <p className="text-[#94A3B8] text-xs">
                {point.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
