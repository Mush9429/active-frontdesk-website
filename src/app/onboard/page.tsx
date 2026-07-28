"use client";

import { useState } from "react";

interface FormData {
  // Business Info
  businessName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  businessPhone: string;
  abn: string;
  website: string;

  // Service Details
  industry: string;
  services: string;
  serviceAreas: string;
  businessHours: string;
  emergencyTypes: string;

  // Voice & Greeting
  receptionistName: string;
  greeting: string;
  tone: string;

  // Calendar & Booking
  calendarType: string;
  calendarEmail: string;
  appointmentDuration: string;
  maxBookingsPerDay: string;

  // Transfer & Escalation
  transferNumber: string;
  transferTriggers: string;

  // Pricing Info (for knowledge base)
  calloutFee: string;
  hourlyRate: string;
  commonJobPrices: string;

  // Additional
  existingCustomers: string;
  specialInstructions: string;
  howDidYouHear: string;
}

const initialForm: FormData = {
  businessName: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  businessPhone: "",
  abn: "",
  website: "",
  industry: "",
  services: "",
  serviceAreas: "",
  businessHours: "",
  emergencyTypes: "",
  receptionistName: "Alex",
  greeting: "",
  tone: "professional-friendly",
  calendarType: "google",
  calendarEmail: "",
  appointmentDuration: "60",
  maxBookingsPerDay: "",
  transferNumber: "",
  transferTriggers: "",
  calloutFee: "",
  hourlyRate: "",
  commonJobPrices: "",
  existingCustomers: "no",
  specialInstructions: "",
  howDidYouHear: "",
};

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              i < current
                ? "bg-[#2563EB] text-white"
                : i === current
                ? "bg-[#2563EB] text-white ring-4 ring-[#2563EB]/20"
                : "bg-[#F1F5F9] text-[#94A3B8]"
            }`}
          >
            {i < current ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            ) : (
              i + 1
            )}
          </div>
          {i < total - 1 && (
            <div className={`w-8 h-0.5 ${i < current ? "bg-[#2563EB]" : "bg-[#E2E8F0]"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  hint = "",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {hint && <p className="text-xs text-[#94A3B8] mb-2">{hint}</p>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-white border border-[#E2E8F0] rounded-lg px-4 py-3 text-[#0F172A] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  hint = "",
  rows = 3,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {hint && <p className="text-xs text-[#94A3B8] mb-2">{hint}</p>}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full bg-white border border-[#E2E8F0] rounded-lg px-4 py-3 text-[#0F172A] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all resize-none"
      />
    </div>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  hint = "",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {hint && <p className="text-xs text-[#94A3B8] mb-2">{hint}</p>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-white border border-[#E2E8F0] rounded-lg px-4 py-3 text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function OnboardPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  // Spam protection: a hidden field real visitors never fill, and the time the form was first
  // rendered (a genuine person filling a 5-step form always takes several seconds; bots submit
  // near-instantly). Neither is shown to real users and neither is saved as business data.
  const [honeypot, setHoneypot] = useState("");
  const [formStartedAt] = useState(() => Date.now());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const totalSteps = 5;

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, _hp: honeypot, _startedAt: formStartedAt }),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        const body = await response.json().catch(() => ({}));
        setError(
          body.error ||
            "Something went wrong submitting your details. Please try again, or email us at hello@activefrontdesk.com.au."
        );
      }
    } catch {
      setError(
        "We couldn't reach our servers. Please check your connection and try again, or email us at hello@activefrontdesk.com.au."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] mb-3">You&apos;re all set!</h1>
          <p className="text-[#475569] mb-6">
            We&apos;ve received your details. Our team will begin setting up your free 1-month
            trial and have you live within 48 hours. No card required — we&apos;ll be in touch
            shortly.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#1D4ED8] transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Honeypot — invisible to real visitors, some bots fill every field they find */}
      <input
        type="text"
        name="fax"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-3 mb-1">
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>
              <span className="text-sm font-bold text-[#0F172A]">Active FrontDesk</span>
            </a>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Client Onboarding</h1>
          <p className="text-sm text-[#475569] mt-1">
            Fill in your business details so we can set up your AI receptionist.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <StepIndicator current={step} total={totalSteps} />

        {/* Step 1: Business Info */}
        {step === 0 && (
          <div>
            <h2 className="text-lg font-bold text-[#0F172A] mb-1">Business Information</h2>
            <p className="text-sm text-[#475569] mb-6">Tell us about your business.</p>
            <div className="space-y-5">
              <Input label="Business Name" name="businessName" value={form.businessName} onChange={handleChange} required placeholder="e.g. Smith Plumbing" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input label="Your Full Name" name="contactName" value={form.contactName} onChange={handleChange} required placeholder="e.g. John Smith" />
                <Input label="ABN" name="abn" value={form.abn} onChange={handleChange} placeholder="e.g. 12 345 678 901" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input label="Email" name="contactEmail" value={form.contactEmail} onChange={handleChange} required type="email" placeholder="john@smithplumbing.com.au" />
                <Input label="Your Mobile" name="contactPhone" value={form.contactPhone} onChange={handleChange} required type="tel" placeholder="0412 345 678" />
              </div>
              <Input label="Business Phone Number" name="businessPhone" value={form.businessPhone} onChange={handleChange} required hint="The number your customers currently call. We'll forward this to the AI." placeholder="e.g. 03 9876 5432" />
              <Input label="Website (optional)" name="website" value={form.website} onChange={handleChange} placeholder="https://smithplumbing.com.au" />
              <Select
                label="Industry"
                name="industry"
                value={form.industry}
                onChange={handleChange}
                required
                options={[
                  { value: "", label: "Select your industry" },
                  { value: "plumbing", label: "Plumbing" },
                  { value: "electrical", label: "Electrical" },
                  { value: "hvac", label: "HVAC / Air Conditioning" },
                  { value: "building", label: "Building / Construction" },
                  { value: "restaurant", label: "Restaurant / Cafe" },
                  { value: "medical", label: "Medical / Dental" },
                  { value: "other", label: "Other" },
                ]}
              />
            </div>
          </div>
        )}

        {/* Step 2: Services & Hours */}
        {step === 1 && (
          <div>
            <h2 className="text-lg font-bold text-[#0F172A] mb-1">Services & Hours</h2>
            <p className="text-sm text-[#475569] mb-6">What does your business do and when?</p>
            <div className="space-y-5">
              <TextArea
                label="Services You Offer"
                name="services"
                value={form.services}
                onChange={handleChange}
                required
                placeholder="e.g. Blocked drains, hot water systems, gas fitting, leak detection, general plumbing"
                hint="List the main services you want the AI to know about."
              />
              <TextArea
                label="Service Areas"
                name="serviceAreas"
                value={form.serviceAreas}
                onChange={handleChange}
                required
                placeholder="e.g. Melbourne CBD, Brunswick, Fitzroy, Carlton, Northcote, Collingwood (up to 20km from CBD)"
                hint="Suburbs or regions you cover."
              />
              <TextArea
                label="Business Hours"
                name="businessHours"
                value={form.businessHours}
                onChange={handleChange}
                required
                placeholder="e.g. Mon-Fri 7am-5pm, Sat 8am-12pm, closed Sunday"
                hint="The AI answers 24/7 but needs to know your hours for booking and FAQs."
              />
              <TextArea
                label="Emergency Types"
                name="emergencyTypes"
                value={form.emergencyTypes}
                onChange={handleChange}
                placeholder="e.g. Burst pipes, gas leaks, flooding, power outages, no hot water"
                hint="What counts as an emergency for your business? These trigger an immediate transfer to your mobile."
              />
            </div>
          </div>
        )}

        {/* Step 3: Voice & Personality */}
        {step === 2 && (
          <div>
            <h2 className="text-lg font-bold text-[#0F172A] mb-1">Voice & Greeting</h2>
            <p className="text-sm text-[#475569] mb-6">How should your AI receptionist sound?</p>
            <div className="space-y-5">
              <Input
                label="Receptionist Name"
                name="receptionistName"
                value={form.receptionistName}
                onChange={handleChange}
                placeholder="e.g. Alex, Sarah, Jordan"
                hint="The name the AI will introduce itself as."
              />
              <TextArea
                label="Custom Greeting (optional)"
                name="greeting"
                value={form.greeting}
                onChange={handleChange}
                placeholder="e.g. Hi there, thanks for calling Smith Plumbing. This is Alex, how can I help you today?"
                hint="Leave blank and we'll create one for you."
                rows={2}
              />
              <Select
                label="Tone / Personality"
                name="tone"
                value={form.tone}
                onChange={handleChange}
                options={[
                  { value: "professional-friendly", label: "Professional & Friendly (recommended)" },
                  { value: "casual", label: "Casual & Relaxed" },
                  { value: "formal", label: "Formal & Corporate" },
                ]}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input label="Call-out Fee" name="calloutFee" value={form.calloutFee} onChange={handleChange} placeholder="e.g. $80" hint="If applicable." />
                <Input label="Hourly Rate" name="hourlyRate" value={form.hourlyRate} onChange={handleChange} placeholder="e.g. $120/hr" hint="If applicable." />
              </div>
              <TextArea
                label="Common Job Prices (optional)"
                name="commonJobPrices"
                value={form.commonJobPrices}
                onChange={handleChange}
                placeholder="e.g. Blocked drain: from $150, Hot water replacement: from $1,200, Tap repair: from $120"
                hint="The AI will share these when asked about pricing."
                rows={3}
              />
            </div>
          </div>
        )}

        {/* Step 4: Calendar & Transfer */}
        {step === 3 && (
          <div>
            <h2 className="text-lg font-bold text-[#0F172A] mb-1">Calendar & Call Transfer</h2>
            <p className="text-sm text-[#475569] mb-6">How should we manage your bookings?</p>
            <div className="space-y-5">
              <Select
                label="Calendar Type"
                name="calendarType"
                value={form.calendarType}
                onChange={handleChange}
                options={[
                  { value: "google", label: "Google Calendar" },
                  { value: "outlook", label: "Microsoft Outlook" },
                  { value: "apple", label: "Apple Calendar (iCal)" },
                  { value: "other", label: "Other / Not Sure" },
                ]}
              />
              <Input
                label="Calendar Email"
                name="calendarEmail"
                value={form.calendarEmail}
                onChange={handleChange}
                type="email"
                placeholder="john@gmail.com"
                hint="The email linked to your calendar. We'll send you a connection invite."
              />
              <Select
                label="Default Appointment Duration"
                name="appointmentDuration"
                value={form.appointmentDuration}
                onChange={handleChange}
                options={[
                  { value: "30", label: "30 minutes" },
                  { value: "60", label: "1 hour (recommended)" },
                  { value: "90", label: "1.5 hours" },
                  { value: "120", label: "2 hours" },
                ]}
              />
              <Input
                label="Max Bookings Per Day (optional)"
                name="maxBookingsPerDay"
                value={form.maxBookingsPerDay}
                onChange={handleChange}
                placeholder="e.g. 6"
                hint="Leave blank for no limit."
              />
              <Input
                label="Transfer Number"
                name="transferNumber"
                value={form.transferNumber}
                onChange={handleChange}
                required
                type="tel"
                placeholder="0412 345 678"
                hint="Your mobile number. The AI transfers here for emergencies or if the caller wants to speak to a person."
              />
              <TextArea
                label="Other Transfer Triggers (optional)"
                name="transferTriggers"
                value={form.transferTriggers}
                onChange={handleChange}
                placeholder="e.g. Caller asks for a quote over $5,000, caller mentions insurance claim"
                hint="Scenarios where you want the AI to transfer the call to you."
                rows={2}
              />
            </div>
          </div>
        )}

        {/* Step 5: Review */}
        {step === 4 && (
          <div>
            <h2 className="text-lg font-bold text-[#0F172A] mb-1">Review & Submit</h2>
            <p className="text-sm text-[#475569] mb-6">Check your details before we start the setup.</p>

            <div className="space-y-6">
              {[
                {
                  title: "Business",
                  items: [
                    ["Business Name", form.businessName],
                    ["Contact", form.contactName],
                    ["Email", form.contactEmail],
                    ["Phone", form.contactPhone],
                    ["Business Phone", form.businessPhone],
                    ["Industry", form.industry],
                  ],
                },
                {
                  title: "Services",
                  items: [
                    ["Services", form.services],
                    ["Areas", form.serviceAreas],
                    ["Hours", form.businessHours],
                    ["Emergencies", form.emergencyTypes],
                  ],
                },
                {
                  title: "Voice & Pricing",
                  items: [
                    ["AI Name", form.receptionistName],
                    ["Tone", form.tone],
                    ["Call-out Fee", form.calloutFee],
                    ["Hourly Rate", form.hourlyRate],
                  ],
                },
                {
                  title: "Calendar & Transfer",
                  items: [
                    ["Calendar", form.calendarType],
                    ["Calendar Email", form.calendarEmail],
                    ["Appointment Duration", `${form.appointmentDuration} min`],
                    ["Transfer Number", form.transferNumber],
                  ],
                },
              ].map((section) => (
                <div key={section.title} className="bg-white rounded-xl border border-[#E2E8F0] p-5">
                  <h3 className="text-sm font-semibold text-[#0F172A] mb-3">{section.title}</h3>
                  <div className="space-y-2">
                    {section.items
                      .filter(([, val]) => val)
                      .map(([label, val]) => (
                        <div key={label} className="flex justify-between gap-4">
                          <span className="text-xs text-[#94A3B8]">{label}</span>
                          <span className="text-xs text-[#0F172A] font-medium text-right max-w-[60%] truncate">
                            {val}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}

              {form.specialInstructions && (
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
                  <h3 className="text-sm font-semibold text-[#0F172A] mb-2">Special Instructions</h3>
                  <p className="text-xs text-[#475569]">{form.specialInstructions}</p>
                </div>
              )}
            </div>

            <TextArea
              label="Special Instructions (optional)"
              name="specialInstructions"
              value={form.specialInstructions}
              onChange={handleChange}
              placeholder="Anything else we should know? e.g. We don't do gas fitting, always ask for the property type..."
              rows={3}
            />

            <Select
              label="How did you hear about us?"
              name="howDidYouHear"
              value={form.howDidYouHear}
              onChange={handleChange}
              options={[
                { value: "", label: "Select..." },
                { value: "google", label: "Google Search" },
                { value: "referral", label: "Referral / Word of Mouth" },
                { value: "social", label: "Social Media" },
                { value: "ad", label: "Online Ad" },
                { value: "other", label: "Other" },
              ]}
            />

            <div className="mt-6 p-4 bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl">
              <p className="text-sm text-[#1E40AF]">
                <strong>What happens next:</strong> After you submit, we&apos;ll set up your AI receptionist
                within 48 hours. You&apos;ll receive a test call link to try it out before we go live.
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-[#E2E8F0]">
          {step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="bg-[#2563EB] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#1D4ED8] transition-colors text-sm"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-[#2563EB] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#1D4ED8] transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting…" : "Submit & Start Setup"}
            </button>
          )}
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
