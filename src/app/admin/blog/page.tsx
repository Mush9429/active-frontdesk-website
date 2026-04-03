"use client";

import { useEffect, useState } from "react";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
}

export default function AdminBlogList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/blog")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  async function handleDelete(slug: string) {
    if (!confirm("Are you sure you want to delete this post? This cannot be undone.")) return;

    setDeleting(slug);
    const res = await fetch(`/api/admin/blog/${slug}`, { method: "DELETE" });
    if (res.ok) {
      setPosts(posts.filter((p) => p.slug !== slug));
    }
    setDeleting(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-[#64748B] text-sm mt-1">
            Manage your SEO content. {posts.length} post{posts.length !== 1 ? "s" : ""} published.
          </p>
        </div>
        <a
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Post
        </a>
      </div>

      {loading ? (
        <div className="bg-[#111113] border border-[#1E293B] rounded-xl p-12 text-center">
          <div className="w-8 h-8 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[#64748B] text-sm mt-3">Loading posts...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-[#111113] border border-[#1E293B] rounded-xl p-12 text-center">
          <div className="w-12 h-12 rounded-xl bg-[#1E293B] flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <p className="text-white font-medium">No blog posts yet</p>
          <p className="text-[#64748B] text-sm mt-1">Create your first post to start driving SEO traffic.</p>
          <a
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors mt-4"
          >
            Create First Post
          </a>
        </div>
      ) : (
        <div className="bg-[#111113] border border-[#1E293B] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1E293B]">
                <th className="text-left text-xs font-medium text-[#64748B] uppercase tracking-wider px-5 py-3">
                  Post
                </th>
                <th className="text-left text-xs font-medium text-[#64748B] uppercase tracking-wider px-5 py-3 hidden sm:table-cell">
                  Category
                </th>
                <th className="text-left text-xs font-medium text-[#64748B] uppercase tracking-wider px-5 py-3 hidden md:table-cell">
                  Date
                </th>
                <th className="text-left text-xs font-medium text-[#64748B] uppercase tracking-wider px-5 py-3 hidden lg:table-cell">
                  Read Time
                </th>
                <th className="text-right text-xs font-medium text-[#64748B] uppercase tracking-wider px-5 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.slug}
                  className="border-b border-[#1E293B]/50 last:border-0 hover:bg-[#1E293B]/20 transition-colors"
                >
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-white">{post.title}</p>
                    <p className="text-xs text-[#64748B] mt-1 line-clamp-1 max-w-md">
                      {post.excerpt}
                    </p>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="text-xs font-medium text-[#3B82F6] bg-[#3B82F6]/10 px-2.5 py-1 rounded-full">
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
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-xs text-[#64748B]">{post.readTime}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg text-[#64748B] hover:text-white hover:bg-[#1E293B] transition-colors"
                        title="View live"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                      <a
                        href={`/admin/blog/${post.slug}/edit`}
                        className="p-2 rounded-lg text-[#64748B] hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 transition-colors"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </a>
                      <button
                        onClick={() => handleDelete(post.slug)}
                        disabled={deleting === post.slug}
                        className="p-2 rounded-lg text-[#64748B] hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
