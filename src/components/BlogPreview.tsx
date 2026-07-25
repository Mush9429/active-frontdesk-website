"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface PostPreview {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
}

export default function BlogPreview({ posts }: { posts: PostPreview[] }) {
  const ref = useScrollAnimation();

  return (
    <section ref={ref} className="fade-in-section py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#2563EB] text-sm font-semibold tracking-wider uppercase mb-4">
            Insights
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
            Latest from the blog
          </h2>
          <p className="text-[#475569] text-lg max-w-2xl mx-auto">
            Practical advice for tradies and hospitality businesses on catching
            more calls and booking more jobs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-white border border-[#E2E8F0] rounded-xl p-6 hover:border-[#2563EB]/50 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-medium text-[#2563EB] bg-[#EFF6FF] px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-[#94A3B8]">{post.readTime}</span>
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-3 group-hover:text-[#2563EB] transition-colors">
                {post.title}
              </h3>
              <p className="text-[#475569] text-sm leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#94A3B8]">
                  {new Date(post.date).toLocaleDateString("en-AU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="text-sm text-[#2563EB] group-hover:translate-x-1 transition-transform">
                  Read more &rarr;
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-[#2563EB] hover:text-[#1D4ED8] font-medium transition-colors"
          >
            View all articles &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
