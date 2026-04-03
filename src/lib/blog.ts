import fs from "fs";
import path from "path";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string | null;
  content: string;
}

const blogDir = path.join(process.cwd(), "content", "blog");

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDir)) return [];

  const files = fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".json"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(blogDir, file), "utf-8");
    return JSON.parse(raw) as BlogPost;
  });

  // Sort by date descending
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(blogDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as BlogPost;
}
