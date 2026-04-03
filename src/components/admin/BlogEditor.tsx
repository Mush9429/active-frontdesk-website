"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface BlogEditorProps {
  initialData?: {
    slug?: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    readTime: string;
  };
  mode: "create" | "edit";
}

const categories = [
  "Business",
  "Trades",
  "Hospitality",
  "Technology",
  "Tips",
  "Case Study",
];

export default function BlogEditor({ initialData, mode }: BlogEditorProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const [title, setTitle] = useState(initialData?.title || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [category, setCategory] = useState(initialData?.category || "Business");
  const [author, setAuthor] = useState(initialData?.author || "Active FrontDesk");

  async function handleSave() {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!content.trim()) {
      setError("Content is required");
      return;
    }

    setError("");
    setSaving(true);

    try {
      const url =
        mode === "create"
          ? "/api/admin/blog"
          : `/api/admin/blog/${initialData?.slug}`;

      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, excerpt, content, category, author }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to save");
        setSaving(false);
        return;
      }

      router.push("/admin/blog");
      router.refresh();
    } catch {
      setError("Something went wrong");
      setSaving(false);
    }
  }

  // Simple markdown preview
  function renderPreview(md: string) {
    let html = md;
    html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-white mt-6 mb-2">$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-white mt-8 mb-3">$1</h2>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>');
    html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-[#3B82F6] underline">$1</a>');
    html = html.replace(/^- (.+)$/gm, '<li class="text-[#94A3B8] ml-4">$1</li>');
    html = html.replace(/^(?!<[hl]|<li)(.+)$/gm, '<p class="text-[#94A3B8] my-2">$1</p>');
    html = html.replace(/^---$/gm, '<hr class="border-[#1E293B] my-6" />');
    return html;
  }

  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <a
            href="/admin/blog"
            className="p-2 rounded-lg text-[#64748B] hover:text-white hover:bg-[#1E293B] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </a>
          <h1 className="text-2xl font-bold text-white">
            {mode === "create" ? "New Blog Post" : "Edit Post"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
              showPreview
                ? "bg-[#3B82F6]/10 text-[#3B82F6]"
                : "text-[#64748B] hover:text-white hover:bg-[#1E293B]"
            }`}
          >
            {showPreview ? "Editor" : "Preview"}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-50 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {mode === "create" ? "Publish" : "Save Changes"}
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {showPreview ? (
        /* Preview */
        <div className="bg-[#111113] border border-[#1E293B] rounded-xl p-8">
          <div className="max-w-3xl mx-auto">
            <span className="text-xs font-medium text-[#3B82F6] bg-[#3B82F6]/10 px-3 py-1 rounded-full">
              {category}
            </span>
            <h1 className="text-3xl font-bold text-white mt-4 mb-2">{title || "Untitled"}</h1>
            <p className="text-sm text-[#64748B] mb-6">
              {author} &bull; {readTime} min read
            </p>
            {excerpt && (
              <p className="text-[#94A3B8] italic border-l-2 border-[#3B82F6] pl-4 mb-6">
                {excerpt}
              </p>
            )}
            <div
              className="prose-dark"
              dangerouslySetInnerHTML={{ __html: renderPreview(content) }}
            />
          </div>
        </div>
      ) : (
        /* Editor */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main editor */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Why Tradies Miss Calls (And How Much It Costs Them)"
                className="w-full bg-[#111113] border border-[#1E293B] rounded-lg px-4 py-3 text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#3B82F6] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-2">
                Excerpt
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A short summary for the blog listing and SEO meta description..."
                rows={2}
                className="w-full bg-[#111113] border border-[#1E293B] rounded-lg px-4 py-3 text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#3B82F6] transition-colors resize-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-[#94A3B8]">
                  Content
                  <span className="text-[#64748B] font-normal ml-2">(Markdown supported)</span>
                </label>
                <span className="text-xs text-[#64748B]">
                  {wordCount} words &bull; ~{readTime} min read
                </span>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`## Your Heading\n\nStart writing your blog post here. You can use:\n\n- **Bold text** with double asterisks\n- [Links](https://example.com)\n- ## Headings with hash marks\n- ### Subheadings\n- Bullet lists with dashes\n- --- for horizontal rules`}
                rows={24}
                className="w-full bg-[#111113] border border-[#1E293B] rounded-lg px-4 py-3 text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#3B82F6] transition-colors resize-y font-mono text-sm leading-relaxed"
              />
            </div>
          </div>

          {/* Sidebar settings */}
          <div className="space-y-5">
            <div className="bg-[#111113] border border-[#1E293B] rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-white">Post Settings</h3>

              <div>
                <label className="block text-xs font-medium text-[#64748B] uppercase tracking-wider mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#0A0A0B] border border-[#1E293B] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#3B82F6] transition-colors"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#64748B] uppercase tracking-wider mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-[#0A0A0B] border border-[#1E293B] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#3B82F6] transition-colors"
                />
              </div>

              {mode === "edit" && initialData?.slug && (
                <div>
                  <label className="block text-xs font-medium text-[#64748B] uppercase tracking-wider mb-2">
                    Slug
                  </label>
                  <p className="text-sm text-[#94A3B8] bg-[#0A0A0B] border border-[#1E293B] rounded-lg px-3 py-2.5">
                    {initialData.slug}
                  </p>
                </div>
              )}
            </div>

            {/* Markdown help */}
            <div className="bg-[#111113] border border-[#1E293B] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-3">Markdown Guide</h3>
              <div className="space-y-2 text-xs">
                {[
                  { syntax: "## Heading", result: "H2 heading" },
                  { syntax: "### Subheading", result: "H3 heading" },
                  { syntax: "**bold**", result: "Bold text" },
                  { syntax: "[text](url)", result: "Link" },
                  { syntax: "- item", result: "Bullet list" },
                  { syntax: "---", result: "Horizontal rule" },
                  { syntax: "*italic text*", result: "Italic paragraph" },
                  { syntax: "| A | B |", result: "Table row" },
                ].map((item) => (
                  <div key={item.syntax} className="flex justify-between gap-2">
                    <code className="text-[#3B82F6] bg-[#3B82F6]/10 px-1.5 py-0.5 rounded font-mono">
                      {item.syntax}
                    </code>
                    <span className="text-[#64748B]">{item.result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
