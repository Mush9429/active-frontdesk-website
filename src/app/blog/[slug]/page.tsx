import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import { CALENDLY_URL } from "@/lib/constants";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | Active FrontDesk`,
    description: post.excerpt,
  };
}

function renderMarkdown(content: string) {
  // Simple markdown-to-HTML for blog posts
  const lines = content.split("\n");
  const html: string[] = [];
  let inList = false;
  let inTable = false;
  let tableRows: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Table handling
    if (trimmed.startsWith("|")) {
      if (!inTable) {
        inTable = true;
        tableRows = [];
      }
      if (!trimmed.match(/^\|[\s-|]+\|$/)) {
        tableRows.push(trimmed);
      }
      continue;
    } else if (inTable) {
      // End of table
      const headerRow = tableRows[0];
      const dataRows = tableRows.slice(1);
      const parseRow = (row: string) =>
        row
          .split("|")
          .filter((c) => c.trim())
          .map((c) => c.trim());

      let tableHtml =
        '<table class="w-full border-collapse my-6 text-sm"><thead><tr>';
      for (const cell of parseRow(headerRow)) {
        tableHtml += `<th class="text-left p-3 border-b border-[#E2E8F0] text-[#0F172A] font-semibold">${cell}</th>`;
      }
      tableHtml += "</tr></thead><tbody>";
      for (const row of dataRows) {
        tableHtml += "<tr>";
        for (const cell of parseRow(row)) {
          tableHtml += `<td class="p-3 border-b border-[#E2E8F0]/50 text-[#475569]">${cell}</td>`;
        }
        tableHtml += "</tr>";
      }
      tableHtml += "</tbody></table>";
      html.push(tableHtml);
      inTable = false;
    }

    // Close list if we're not on a list item
    if (inList && !trimmed.startsWith("- ") && !trimmed.startsWith("* ")) {
      html.push("</ul>");
      inList = false;
    }

    if (trimmed === "") {
      html.push("");
      continue;
    }

    // Headings
    if (trimmed.startsWith("### ")) {
      html.push(
        `<h3 class="text-xl font-bold text-[#0F172A] mt-10 mb-4">${trimmed.slice(4)}</h3>`
      );
    } else if (trimmed.startsWith("## ")) {
      html.push(
        `<h2 class="text-2xl font-bold text-[#0F172A] mt-12 mb-4">${trimmed.slice(3)}</h2>`
      );
    }
    // Horizontal rule
    else if (trimmed === "---") {
      html.push('<hr class="border-[#E2E8F0] my-10" />');
    }
    // List items
    else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (!inList) {
        html.push('<ul class="space-y-2 my-4 ml-4">');
        inList = true;
      }
      const content = trimmed.slice(2).replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#0F172A]">$1</strong>');
      html.push(
        `<li class="text-[#475569] leading-relaxed flex gap-2"><span class="text-[#2563EB] mt-1">&#8226;</span><span>${content}</span></li>`
      );
    }
    // Italics paragraph
    else if (trimmed.startsWith("*") && trimmed.endsWith("*")) {
      const inner = trimmed.slice(1, -1).replace(
        /\[(.+?)\]\((.+?)\)/g,
        '<a href="$2" class="text-[#2563EB] hover:underline">$1</a>'
      );
      html.push(
        `<p class="text-[#94A3B8] italic my-4 leading-relaxed">${inner}</p>`
      );
    }
    // Regular paragraph
    else {
      let text = trimmed;
      text = text.replace(
        /\*\*(.+?)\*\*/g,
        '<strong class="text-[#0F172A]">$1</strong>'
      );
      text = text.replace(
        /\[(.+?)\]\((.+?)\)/g,
        '<a href="$2" class="text-[#2563EB] hover:underline">$1</a>'
      );
      html.push(`<p class="text-[#475569] leading-relaxed my-4">${text}</p>`);
    }
  }

  if (inList) html.push("</ul>");

  return html.join("\n");
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const contentHtml = renderMarkdown(post.content);

  return (
    <>
      <Header />
      <main className="pt-32 pb-24 px-6">
        <article className="max-w-3xl mx-auto">
          <div className="mb-10">
            <a
              href="/blog"
              className="text-sm text-[#94A3B8] hover:text-[#2563EB] transition-colors mb-6 inline-block"
            >
              &larr; Back to blog
            </a>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium text-[#2563EB] bg-[#EFF6FF] px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-xs text-[#94A3B8]">{post.readTime}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-[#94A3B8]">
              <span>{post.author}</span>
              <span>&#8226;</span>
              <span>
                {new Date(post.date).toLocaleDateString("en-AU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          <div
            className="prose-light"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          <div className="mt-16 p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-center">
            <h3 className="text-xl font-bold text-[#0F172A] mb-3">
              Want to stop missing calls?
            </h3>
            <p className="text-[#475569] mb-6">
              See how Active FrontDesk catches every call and books jobs while
              you work.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Book a Demo
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
