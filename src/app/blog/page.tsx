import { getAllPosts } from "@/lib/blog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Blog | Active FrontDesk",
  description:
    "Practical advice for tradies and hospitality businesses on catching more calls, booking more jobs, and growing revenue.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
              Blog
            </h1>
            <p className="text-[#475569] text-lg max-w-2xl mx-auto">
              Tips and insights on missed calls, booking systems, and growing
              your trade or hospitality business.
            </p>
          </div>

          <div className="space-y-8">
            {posts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white border border-[#E2E8F0] rounded-xl p-8 hover:border-[#2563EB]/50 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-medium text-[#2563EB] bg-[#EFF6FF] px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-[#94A3B8]">
                    {post.readTime}
                  </span>
                  <span className="text-xs text-[#94A3B8]">
                    {new Date(post.date).toLocaleDateString("en-AU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-[#0F172A] mb-3 group-hover:text-[#2563EB] transition-colors">
                  {post.title}
                </h2>
                <p className="text-[#475569] leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <span className="text-sm text-[#2563EB] group-hover:translate-x-1 inline-block transition-transform">
                  Read more &rarr;
                </span>
              </a>
            ))}

            {posts.length === 0 && (
              <div className="text-center py-16 text-[#94A3B8]">
                <p className="text-lg">No articles yet. Check back soon.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
