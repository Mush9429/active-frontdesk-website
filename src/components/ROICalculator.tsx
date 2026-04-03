"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function ROICalculator() {
  const ref = useScrollAnimation();
  const [missedCalls, setMissedCalls] = useState(5);

  const avgJobValue = 350;
  const conversionRate = 0.6;
  const weeklyRevenue = missedCalls * avgJobValue * conversionRate;
  const monthlyRevenue = weeklyRevenue * 4;
  const annualRevenue = monthlyRevenue * 12;

  return (
    <section ref={ref} className="fade-in-section py-24 md:py-32 bg-[#F8FAFC]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#3B82F6] font-semibold text-sm uppercase tracking-widest mb-3">
            ROI Calculator
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-4">
            How much are missed calls costing you?
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm">
          {/* Slider */}
          <div className="mb-10">
            <label className="block text-sm font-medium text-[#475569] mb-4">
              How many calls do you miss per week?
            </label>
            <input
              type="range"
              min={1}
              max={20}
              value={missedCalls}
              onChange={(e) => setMissedCalls(parseInt(e.target.value))}
              className="w-full roi-slider"
            />
            <div className="flex justify-between text-xs text-[#94A3B8] mt-2">
              <span>1</span>
              <span className="text-2xl font-extrabold text-[#0F172A] -mt-1">{missedCalls}</span>
              <span>20</span>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#F8FAFC] rounded-xl p-5 text-center border border-[#E2E8F0]">
              <p className="text-xs text-[#94A3B8] mb-1 uppercase tracking-wider">Weekly</p>
              <p className="text-2xl font-extrabold text-[#0F172A]">
                ${weeklyRevenue.toLocaleString()}
              </p>
              <p className="text-xs text-[#94A3B8] mt-1">recovered revenue</p>
            </div>
            <div className="bg-[#F8FAFC] rounded-xl p-5 text-center border border-[#E2E8F0]">
              <p className="text-xs text-[#94A3B8] mb-1 uppercase tracking-wider">Monthly</p>
              <p className="text-2xl font-extrabold text-[#3B82F6]">
                ${monthlyRevenue.toLocaleString()}
              </p>
              <p className="text-xs text-[#94A3B8] mt-1">recovered revenue</p>
            </div>
            <div className="bg-[#F8FAFC] rounded-xl p-5 text-center border border-[#E2E8F0]">
              <p className="text-xs text-[#94A3B8] mb-1 uppercase tracking-wider">Annual</p>
              <p className="text-2xl font-extrabold text-[#0F172A]">
                ${annualRevenue.toLocaleString()}
              </p>
              <p className="text-xs text-[#94A3B8] mt-1">recovered revenue</p>
            </div>
          </div>

          <p className="text-xs text-[#94A3B8] text-center mt-6">
            Based on average job value of ${avgJobValue} and {Math.round(conversionRate * 100)}% conversion rate.
          </p>
        </div>
      </div>
    </section>
  );
}
