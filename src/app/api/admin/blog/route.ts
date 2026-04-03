import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const blogDir = path.join(process.cwd(), "content", "blog");

function ensureBlogDir() {
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }
}

export async function GET() {
  ensureBlogDir();
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".json"));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(blogDir, file), "utf-8");
    return JSON.parse(raw);
  });
  posts.sort(
    (a: { date: string }, b: { date: string }) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  ensureBlogDir();

  const data = await request.json();
  const {
    title,
    excerpt,
    content,
    category,
    author = "Active FrontDesk",
    readTime,
  } = data;

  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and content are required" },
      { status: 400 }
    );
  }

  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  // Check if slug already exists
  const filePath = path.join(blogDir, `${slug}.json`);
  if (fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: "A post with this title already exists" },
      { status: 409 }
    );
  }

  // Calculate read time if not provided
  const wordCount = content.split(/\s+/).length;
  const calculatedReadTime = readTime || `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

  const post = {
    slug,
    title,
    excerpt: excerpt || content.slice(0, 160).replace(/[#*\n]/g, "").trim() + "...",
    author,
    date: new Date().toISOString().split("T")[0],
    category: category || "Business",
    readTime: calculatedReadTime,
    image: null,
    content,
  };

  fs.writeFileSync(filePath, JSON.stringify(post, null, 2));

  return NextResponse.json(post, { status: 201 });
}
