import React from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { BlogPost } from "@/types/blog";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.id}`} className="group block">
      <div className="relative h-48 mb-4 rounded-2xl overflow-hidden bg-card transition-transform duration-300 group-hover:scale-[1.02]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        {/* Add actual image when available */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium text-white">
            {post.category}
          </div>
          <div className="flex items-center gap-1 text-xs text-white/80">
            <Calendar className="h-3 w-3" />
            {post.date}
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h2>
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {post.excerpt}
        </p>
        <div className="inline-flex items-center text-sm text-primary font-medium group-hover:underline">
          Read More
          <svg
            className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
