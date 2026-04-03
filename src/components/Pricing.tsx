"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CALENDLY_URL } from "@/lib/constants";

const includes = [
  "Custom voice setup with a real Aussie accent",
  "Inbound call handling 24/7",
  "Calendar & booking integration",
  "Customer records and call logging",
  "Emergency call transfer to your mobile",
  "Weekly ROI reports",
  "Ongoing support & system updates",
];

export default function Pricing() {
  const ref = useScrollAnimation();

  return (
    <section id="pricing" ref={ref} className="fade-in-section py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#3B82F6] font-semibold text-sm uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] mb-4">
            Like hiring a front desk.<br className="hidden sm:block" /> Without the salary.
          </h2>
          <p className="text-[#475569] text-lg max-w-2xl mx-auto">
            We set it up. You do the work. Simple as that.
          </p>
        </div>

        {/* Main pricing card */}
        <div className="relative bg-white rounded-3xl border border-[#3B82F6]/30 overflow-hidden shadow-lg">
          {/* Top accent */}
          <div className="h-1 bg-gradient-to-r from-[#3B82F6] to-[#2563EB]"></div>

          <div className="p-8 md:p-10">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
              {/* Left: price + features */}
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-[#EFF6FF] text-[#3B82F6] text-xs font-bold px-3 py-1.5 rounded-full mb-6 border border-[#DBEAFE]">
                  Full Service Setup
                </div>

                <div className="mb-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-5xl font-extrabold text-[#0F172A]">$2,000</span>
                    <span className="text-[#475569] font-medium">one-off setup</span>
                  </div>
                </div>
                <div className="mb-8">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-[#0F172A]">$399</span>
                    <span className="text-[#475569] font-medium">/month</span>
                  </div>
                  <p className="text-sm text-[#94A3B8] mt-2">
                    Everything included. No hidden fees. No lock-in.
                  </p>
                </div>

                <ul className="space-y-3">
                  {includes.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#EFF6FF] text-[#3B82F6] flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <span className="text-sm text-[#475569]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: CTA card */}
              <div className="lg:w-72 flex flex-col gap-5">
                <div className="bg-[#F8FAFC] rounded-2xl p-6 text-center border border-[#E2E8F0]">
                  <p className="text-xs text-[#94A3B8] mb-2 uppercase tracking-wider">Compare</p>
                  <p className="text-lg font-bold text-[#0F172A] mb-1">
                    vs $4,500/mo
                  </p>
                  <p className="text-xs text-[#94A3B8]">
                    for a full-time receptionist
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
                    <p className="text-xs text-[#94A3B8]">
                      Active FrontDesk works 24/7, never takes a sick day, and costs a fraction of the price.
                    </p>
                  </div>
                </div>

                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-[#3B82F6] text-white font-bold px-6 py-4 rounded-xl hover:bg-[#2563EB] transition-colors text-base shadow-lg shadow-blue-500/20"
                >
                  Book a Demo
                </a>

                <p className="text-center text-xs text-[#94A3B8]">
                  We handle the full setup. Live in under a week.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
