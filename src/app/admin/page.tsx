import { getAllPosts } from "@/lib/blog";

export default function AdminDashboard() {
  const posts = getAllPosts();

  const stats = [
    {
      label: "Published Articles",
      value: posts.length.toString(),
      change: "SEO content",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      color: "blue",
    },
    {
      label: "Active Clients",
      value: "0",
      change: "Connect Supabase",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: "emerald",
    },
    {
      label: "Monthly Revenue",
      value: "$0",
      change: "Connect billing",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "violet",
    },
    {
      label: "Calls This Month",
      value: "--",
      change: "Connect analytics",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      color: "amber",
    },
  ];

  const colorMap: Record<string, { bg: string; text: string; iconBg: string }> = {
    blue: { bg: "bg-[#3B82F6]/10", text: "text-[#3B82F6]", iconBg: "bg-[#3B82F6]/20" },
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", iconBg: "bg-emerald-500/20" },
    violet: { bg: "bg-violet-500/10", text: "text-violet-400", iconBg: "bg-violet-500/20" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-400", iconBg: "bg-amber-500/20" },
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-[#64748B] text-sm mt-1">
          Welcome back. Here&apos;s your business overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const colors = colorMap[stat.color];
          return (
            <div
              key={stat.label}
              className="bg-[#111113] border border-[#1E293B] rounded-xl p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${colors.iconBg} flex items-center justify-center ${colors.text}`}>
                  {stat.icon}
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-[#64748B] mt-1">{stat.label}</p>
              <p className={`text-xs mt-2 ${colors.text}`}>{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/admin/blog/new"
            className="group bg-[#111113] border border-[#1E293B] rounded-xl p-5 hover:border-[#3B82F6]/50 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6] mb-3">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-white group-hover:text-[#3B82F6] transition-colors">
              New Blog Post
            </h3>
            <p className="text-xs text-[#64748B] mt-1">
              Create and publish SEO content
            </p>
          </a>

          <div className="bg-[#111113] border border-[#1E293B] rounded-xl p-5 opacity-50">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-white">Add Client</h3>
            <p className="text-xs text-[#64748B] mt-1">
              Coming soon — connect Supabase
            </p>
          </div>

          <div className="bg-[#111113] border border-[#1E293B] rounded-xl p-5 opacity-50">
            <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400 mb-3">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-white">Create Invoice</h3>
            <p className="text-xs text-[#64748B] mt-1">
              Coming soon — connect Supabase
            </p>
          </div>
        </div>
      </div>

      {/* Recent Blog Posts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recent Blog Posts</h2>
          <a
            href="/admin/blog"
            className="text-sm text-[#3B82F6] hover:text-[#2563EB] transition-colors"
          >
            View all
          </a>
        </div>
        <div className="bg-[#111113] border border-[#1E293B] rounded-xl overflow-hidden">
          {posts.length === 0 ? (
            <div className="p-8 text-center text-[#64748B]">
              <p>No blog posts yet.</p>
              <a href="/admin/blog/new" className="text-[#3B82F6] text-sm mt-2 inline-block">
                Create your first post
              </a>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1E293B]">
                  <th className="text-left text-xs font-medium text-[#64748B] uppercase tracking-wider px-5 py-3">
                    Title
                  </th>
                  <th className="text-left text-xs font-medium text-[#64748B] uppercase tracking-wider px-5 py-3 hidden sm:table-cell">
                    Category
                  </th>
                  <th className="text-left text-xs font-medium text-[#64748B] uppercase tracking-wider px-5 py-3 hidden md:table-cell">
                    Date
                  </th>
                  <th className="text-right text-xs font-medium text-[#64748B] uppercase tracking-wider px-5 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts.slice(0, 5).map((post) => (
                  <tr
                    key={post.slug}
                    className="border-b border-[#1E293B]/50 last:border-0 hover:bg-[#1E293B]/20 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-white truncate max-w-[300px]">
                        {post.title}
                      </p>
                      <p className="text-xs text-[#64748B] mt-0.5 sm:hidden">
                        {post.category}
                      </p>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className="text-xs font-medium text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-xs text-[#64748B]">
                        {new Date(post.date).toLocaleDateString("en-AU", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <a
                        href={`/admin/blog/${post.slug}/edit`}
                        className="text-xs text-[#3B82F6] hover:text-[#2563EB] font-medium transition-colors"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
