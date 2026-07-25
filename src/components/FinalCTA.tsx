"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CALENDLY_URL } from "@/lib/constants";

export default function FinalCTA() {
  const ref = useScrollAnimation();

  return (
    <section ref={ref} className="fade-in-section py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] rounded-3xl px-8 py-16 md:px-16 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-xs font-medium px-4 py-2 rounded-full mb-8 border border-white/20">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
            Taking new clients now
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight">
            Ready to stop<br className="hidden sm:block" /> missing jobs?
          </h2>

          <p className="text-[#BFDBFE] text-lg mb-10 max-w-xl mx-auto">
            We handle the calls. You stay on the tools. More jobs. Less chasing. Your front desk, sorted.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-[#2563EB] font-bold px-8 py-4 rounded-xl hover:bg-[#EFF6FF] transition-all text-base shadow-lg cursor-pointer"
            >
              Book a Demo
            </a>
            <a
              href="/#listen"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all text-base"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Listen to a Demo Call
            </a>
          </div>

          <p className="text-[#BFDBFE] text-sm mt-8">
            No lock-in contracts. Setup in 48 hours.
          </p>
        </div>
      </div>
    </section>
  );
}
