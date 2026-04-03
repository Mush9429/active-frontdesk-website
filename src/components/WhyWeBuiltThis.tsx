"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function WhyWeBuiltThis() {
  const ref = useScrollAnimation();

  return (
    <section ref={ref} className="fade-in-section py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual — phone screen mockup */}
          <div className="relative">
            <div className="bg-[#F8FAFC] rounded-3xl border border-[#E2E8F0] p-8 md:p-10">
              {/* Phone mockup */}
              <div className="max-w-[280px] mx-auto">
                <div className="bg-[#0F172A] rounded-[2rem] p-3 shadow-2xl">
                  <div className="bg-[#1E293B] rounded-[1.5rem] overflow-hidden">
                    {/* Status bar */}
                    <div className="flex items-center justify-between px-5 pt-3 pb-2">
                      <span className="text-[10px] text-white/60 font-medium">9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-3.5 h-2 border border-white/60 rounded-sm relative">
                          <div className="absolute inset-[1px] right-[2px] bg-green-400 rounded-[1px]" />
                        </div>
                      </div>
                    </div>

                    {/* Incoming call screen */}
                    <div className="px-5 pt-6 pb-8 text-center">
                      <div className="w-16 h-16 rounded-full bg-[#3B82F6]/20 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                      </div>
                      <p className="text-white/40 text-xs mb-1">Incoming call</p>
                      <p className="text-white font-semibold text-lg mb-1">0412 345 678</p>
                      <p className="text-white/50 text-xs mb-6">Melbourne, VIC</p>

                      {/* AI answering indicator */}
                      <div className="bg-[#3B82F6]/20 border border-[#3B82F6]/30 rounded-xl px-4 py-3 mb-4">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-green-400 text-xs font-semibold">AI Receptionist Active</span>
                        </div>
                        <p className="text-white/70 text-[11px] leading-relaxed">
                          &ldquo;Hi, thanks for calling Smith Plumbing. This is Alex, how can I help you today?&rdquo;
                        </p>
                      </div>

                      {/* Call actions */}
                      <div className="flex items-center justify-center gap-3">
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-10 h-10 rounded-full bg-[#475569] flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25" />
                            </svg>
                          </div>
                          <span className="text-white/40 text-[9px]">Booking</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-10 h-10 rounded-full bg-[#475569] flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
                            </svg>
                          </div>
                          <span className="text-white/40 text-[9px]">CRM</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-10 h-10 rounded-full bg-[#475569] flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133" />
                            </svg>
                          </div>
                          <span className="text-white/40 text-[9px]">SMS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating notification cards */}
              <div className="absolute -right-2 top-16 bg-white rounded-xl border border-[#E2E8F0] shadow-lg px-4 py-3 max-w-[200px] hidden md:block">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-xs font-semibold text-[#0F172A]">New Booking</span>
                </div>
                <p className="text-[10px] text-[#475569]">Tomorrow 10:00am - Blocked drain, Brunswick</p>
              </div>

              <div className="absolute -left-2 bottom-20 bg-white rounded-xl border border-[#E2E8F0] shadow-lg px-4 py-3 max-w-[200px] hidden md:block">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-[#3B82F6] rounded-full" />
                  <span className="text-xs font-semibold text-[#0F172A]">Customer Added</span>
                </div>
                <p className="text-[10px] text-[#475569]">John Smith - 0412 345 678 saved to CRM</p>
              </div>
            </div>
          </div>

          {/* Story content */}
          <div>
            <p className="text-[#3B82F6] font-semibold text-sm uppercase tracking-widest mb-3">
              Why We Built This
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-6 leading-tight">
              We watched good tradies<br className="hidden sm:block" /> lose jobs to voicemail.
            </h2>

            <div className="space-y-4 text-[#475569] leading-relaxed">
              <p>
                We kept seeing the same thing. Skilled tradies - great at their work - losing thousands in revenue because they couldn&apos;t answer the phone while on a job.
              </p>
              <p>
                The customer calls. No one picks up. They call the next plumber on Google. By the time you call back, they&apos;ve already booked someone else.
              </p>
              <p>
                Hiring a receptionist costs $4,500/month and only covers business hours. Answering services take messages but don&apos;t book jobs. Neither solved the actual problem.
              </p>
              <p className="text-[#0F172A] font-medium">
                So we built an AI receptionist that sounds Australian, knows your business, checks your real calendar, and books confirmed appointments - 24 hours a day, 7 days a week.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <p className="text-2xl font-extrabold text-[#3B82F6]">2s</p>
                <p className="text-xs text-[#475569] mt-1">Answer time</p>
              </div>
              <div className="text-center p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <p className="text-2xl font-extrabold text-[#3B82F6]">24/7</p>
                <p className="text-xs text-[#475569] mt-1">Availability</p>
              </div>
              <div className="text-center p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <p className="text-2xl font-extrabold text-[#3B82F6]">48h</p>
                <p className="text-xs text-[#475569] mt-1">Setup time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
