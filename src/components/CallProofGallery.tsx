import Image from "next/image";

interface ProofItem {
  src: string;
  width: number;
  height: number;
  label: string;
}

const calendarProof: ProofItem = {
  src: "/proof/calendar-booking.webp",
  width: 2000,
  height: 1233,
  label: "Booked straight into the calendar",
};

const sheetProof: ProofItem[] = [
  {
    src: "/proof/crm-entry.png",
    width: 2000,
    height: 353,
    label: "Customer added to the CRM",
  },
  {
    src: "/proof/activity-log.png",
    width: 2000,
    height: 680,
    label: "Every call logged automatically",
  },
];

function ProofCard({ src, width, height, label }: ProofItem) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-lg shadow-[#2563EB]/5">
      <p className="flex items-center gap-2 text-xs font-semibold text-[#2563EB] uppercase tracking-wider mb-3">
        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        {label}
      </p>
      <div className="rounded-lg overflow-hidden border border-[#E2E8F0] bg-[#F8FAFC]">
        <Image src={src} alt={label} width={width} height={height} className="w-full h-auto" />
      </div>
    </div>
  );
}

export default function CallProofGallery() {
  return (
    <div className="mt-8">
      <p className="text-center text-xs font-semibold text-[#94A3B8] uppercase tracking-widest mb-4">
        Not a mockup — this actually happened
      </p>
      <div className="space-y-4">
        {/* Calendar stays at a contained width; the wide spreadsheet shots fill the full container */}
        <div className="max-w-3xl mx-auto">
          <ProofCard {...calendarProof} />
        </div>
        {sheetProof.map((item) => (
          <ProofCard key={item.src} {...item} />
        ))}
      </div>
    </div>
  );
}
