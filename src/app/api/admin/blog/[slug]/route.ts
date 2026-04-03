import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const blogDir = path.join(process.cwd(), "content", "blog");

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const filePath = path.join(blogDir, `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  return NextResponse.json(JSON.parse(raw));
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const filePath = path.join(blogDir, `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const data = await request.json();

  const updated = {
    ...existing,
    title: data.title || existing.title,
    excerpt: data.excerpt || existing.excerpt,
    content: data.content || existing.content,
    category: data.category || existing.category,
    author: data.author || existing.author,
    readTime: data.readTime || existing.readTime,
  };

  // Recalculate read time if content changed
  if (data.content && !data.readTime) {
    const wordCount = data.content.split(/\s+/).length;
    updated.readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
  }

  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));

  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const filePath = path.join(blogDir, `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  fs.unlinkSync(filePath);

  return NextResponse.json({ success: true, deleted: slug });
}
