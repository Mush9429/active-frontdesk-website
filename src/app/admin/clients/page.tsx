export default function AdminClients() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Clients</h1>
        <p className="text-[#64748B] text-sm mt-1">
          Manage your Active FrontDesk clients.
        </p>
      </div>

      <div className="bg-[#111113] border border-[#1E293B] rounded-xl p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-white mb-2">Coming Soon</h2>
        <p className="text-[#94A3B8] text-sm max-w-md mx-auto mb-4">
          Client management with Supabase integration. Track leads, onboarding status,
          active clients, and churn — all from one place.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {["Client profiles", "Onboarding checklist", "Status tracking", "Call stats per client"].map((feature) => (
            <span key={feature} className="text-xs bg-[#1E293B] text-[#64748B] px-3 py-1.5 rounded-full">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
