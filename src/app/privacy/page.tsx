import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Active FrontDesk",
  description:
    "How Active FrontDesk collects, uses, and protects information — including the customer call data we handle on behalf of the businesses we serve.",
};

const sections = [
  {
    heading: "Who we are",
    body: [
      "Active FrontDesk (ABN 95 639 679 926) provides an AI receptionist service for Australian trade and hospitality businesses. When you use our website or engage our service, you trust us with information — both your own, and the details of the customers who call your business. This policy explains what we collect, how we use it, and how we protect it.",
      "We handle personal information in line with the Australian Privacy Principles (APPs) under the Privacy Act 1988 (Cth).",
    ],
  },
  {
    heading: "Information we collect",
    body: [
      "There are two kinds of information involved in our service:",
    ],
    lists: [
      {
        title: "1. Information about you (our client)",
        items: [
          "Your name, business name, email, and phone number.",
          "Business details needed to set up your receptionist — your services, hours, service areas, pricing, and calendar.",
          "Billing information required to process your subscription.",
        ],
      },
      {
        title: "2. Information about your callers",
        items: [
          "When our AI answers a call for your business, it may capture the caller's name, phone number, job or enquiry details, and any appointment they book.",
          "This caller information belongs to you, the business. We only ever handle it to deliver the service you've engaged us for.",
        ],
      },
    ],
  },
  {
    heading: "How we use information",
    body: [
      "Customer call information is confidential. We use it for one purpose only: to run your receptionist and report back to you — booking appointments into your calendar, logging enquiries to your records, and giving you the caller's details so you can follow up.",
      "We do not sell your data or your customers' data. We do not share it with anyone outside the parties needed to deliver the service. We do not use it to train external AI models, and we do not use it for advertising.",
    ],
  },
  {
    heading: "Who owns the data",
    body: [
      "The customer records and call information generated for your business belong to you. We act on your behalf to process it. If you end your subscription, you keep your data, and we will remove it from our systems on request.",
    ],
  },
  {
    heading: "Service providers we rely on",
    body: [
      "To deliver the service, information passes through trusted third-party tools — for example, voice and telephony providers to handle the call, and calendar and spreadsheet services to book appointments and store records. These providers only receive the information needed to perform their function, and we choose reputable providers with their own security and privacy commitments.",
    ],
  },
  {
    heading: "How we protect information",
    body: [
      "We take reasonable steps to keep information secure, including limiting who can access it to only what's necessary to run and support your service. While no online service can guarantee absolute security, we treat your data — and your customers' data — as confidential at every step.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "We keep information for as long as needed to provide your service, or as you instruct. When it's no longer needed, or when you ask us to remove it, we delete it from our systems.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You can ask us to access, correct, or delete the personal information we hold about you at any time. If a caller to your business wants their information corrected or removed, let us know and we'll action it. To make any request, email us at hello@activefrontdesk.com.au.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this policy from time to time. The date below reflects the most recent version. If we make a significant change, we'll take reasonable steps to let our clients know.",
    ],
  },
  {
    heading: "Contact us",
    body: [
      "Questions about your privacy or this policy? Email us at hello@activefrontdesk.com.au and we'll get back to you.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <p className="text-[#2563EB] font-semibold text-sm uppercase tracking-widest mb-3">
              Privacy
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
              Privacy Policy
            </h1>
            <p className="text-[#94A3B8] text-sm">Last updated: 26 July 2026</p>
          </div>

          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-bold text-[#0F172A] mb-4">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.body.map((para, i) => (
                    <p key={i} className="text-[#475569] leading-relaxed">
                      {para}
                    </p>
                  ))}
                  {section.lists?.map((list) => (
                    <div key={list.title}>
                      <p className="font-semibold text-[#0F172A] mt-4 mb-2">
                        {list.title}
                      </p>
                      <ul className="space-y-2">
                        {list.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-[#475569] leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
