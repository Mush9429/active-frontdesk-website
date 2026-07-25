"use client";

import { useEffect, useState, use } from "react";
import BlogEditor from "@/components/admin/BlogEditor";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
}

export default function EditBlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/blog/${slug}`)
      .then((res) => {
        if (!res.ok) {
          setNotFound(true);
          setLoading(false);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setPost(data);
          setLoading(false);
        }
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[#64748B] text-sm mt-3">Loading post...</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <p className="text-white text-lg font-medium">Post not found</p>
          <a href="/admin/blog" className="text-[#2563EB] text-sm mt-2 inline-block">
            Back to blog list
          </a>
        </div>
      </div>
    );
  }

  return <BlogEditor mode="edit" initialData={post!} />;
}
