import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Eye } from "lucide-react";
import { BlogPost } from "@/types/blog";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const [imageError, setImageError] = React.useState(false);
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  const handleImageError = (e: any) => {
    console.error("Image failed to load:", post.image);
    console.error("Error event:", e);
    setImageError(true);
  };

  return (
    <Link href={`/blog/${post.id}`} className="group block">
      <div className="relative h-48 mb-4 rounded-2xl overflow-hidden bg-card transition-transform duration-300 group-hover:scale-[1.02]">
        {post.image && !imageError ? (
          <>
            <div className="absolute inset-0 bg-gray-200" />
            <Image
              src={post.image}
              alt={post.title}
              fill
              className={`object-cover transition-opacity duration-300 ${
                isImageLoading ? "opacity-0" : "opacity-100"
              }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={handleImageError}
              onLoad={() => setIsImageLoading(false)}
              unoptimized
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        {isImageLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium text-white w-fit">
              {post.category}
            </div>
            <div className="flex items-center gap-3 text-xs text-white/80">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {post.date}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {post.readTime}
              </div>
            </div>
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
