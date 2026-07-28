"use client";

import { useMemo, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const WORKING_DAYS_PER_MONTH = 22;
const CALL_TO_JOB_CONVERSION = 0.3;

function formatAUD(n: number) {
  return n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });
}

export default function RevenueCalculator() {
  const ref = useScrollAnimation();
  const [missedCalls, setMissedCalls] = useState(4);
  const [jobValue, setJobValue] = useState(500);

  const monthlyLoss = useMemo(
    () => Math.round(missedCalls * WORKING_DAYS_PER_MONTH * CALL_TO_JOB_CONVERSION * jobValue),
    [missedCalls, jobValue]
  );

  return (
    <section ref={ref} className="fade-in-section py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8 md:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <label htmlFor="missed-calls" className="text-sm font-semibold text-[#0F172A]">
                  Missed calls per day
                </label>
                <span className="text-2xl font-extrabold text-[#2563EB]">{missedCalls}</span>
              </div>
              <input
                id="missed-calls"
                type="range"
                min={1}
                max={20}
                value={missedCalls}
                onChange={(e) => setMissedCalls(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-[#94A3B8] mt-1.5">
                <span>1</span>
                <span>20</span>
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-2">
                <label htmlFor="job-value" className="text-sm font-semibold text-[#0F172A]">
                  Average job value ($)
                </label>
                <span className="text-2xl font-extrabold text-[#2563EB]">{formatAUD(jobValue)}</span>
              </div>
              <input
                id="job-value"
                type="range"
                min={100}
                max={5000}
                step={100}
                value={jobValue}
                onChange={(e) => setJobValue(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-[#94A3B8] mt-1.5">
                <span>$100</span>
                <span>$5,000</span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#E2E8F0] mt-8 pt-8 text-center">
            <p className="text-[#475569] text-lg">You could be losing up to</p>
            <p className="text-5xl sm:text-6xl font-extrabold text-[#2563EB] my-3">
              {formatAUD(monthlyLoss)}
            </p>
            <p className="text-[#475569] text-lg mb-2">per month in missed revenue</p>
            <p className="text-sm text-[#94A3B8] mb-8">
              Based on a {CALL_TO_JOB_CONVERSION * 100}% call-to-job conversion rate across{" "}
              {WORKING_DAYS_PER_MONTH} working days.
            </p>

            <a
              href="/onboard"
              className="inline-flex items-center justify-center bg-[#2563EB] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#1D4ED8] transition-all text-base shadow-lg shadow-[#2563EB]/20 cursor-pointer"
            >
              Stop losing revenue — try free for 1 month
            </a>
            <p className="text-xs text-[#94A3B8] mt-4">No credit card required</p>
          </div>
        </div>
      </div>
    </section>
  );
}
