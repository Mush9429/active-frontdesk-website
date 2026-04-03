export default function AdminAnalytics() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-[#64748B] text-sm mt-1">
          Call performance and client ROI metrics.
        </p>
      </div>

      <div className="bg-[#111113] border border-[#1E293B] rounded-xl p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-white mb-2">Coming Soon</h2>
        <p className="text-[#94A3B8] text-sm max-w-md mx-auto mb-4">
          Track call volumes, booking rates, and revenue impact per client.
          Pull data from Google Sheets Activity logs automatically.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {["Calls per month", "Booking conversion rate", "Revenue per client", "Missed call trends"].map((feature) => (
            <span key={feature} className="text-xs bg-[#1E293B] text-[#64748B] px-3 py-1.5 rounded-full">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
