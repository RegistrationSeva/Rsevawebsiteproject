"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { blogPosts } from "@/data/blogData";

function BackgroundPattern() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(30deg,var(--primary)_0%,#2563eb_100%)] opacity-90" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath fill='%23ffffff' fill-opacity='0.1' d='M36 34h-4v-4h2v4h4v2h-4v4h-2v-4h-4v-2h4v-4zm0-30h-4V0h2v4h4v2h-4v4h-2V6h-4V4h4V0zM6 34H2v-4h2v4h4v2H4v4H2v-4H0v-2h2v-4zm0-30H2V0h2v4h4v2H4v4H2V6H0V4h2V0z'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

export default function BlogPost() {
  const router = useRouter();
  const params = useParams();
  const postId = Number(params.id);

  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <Button asChild>
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-primary overflow-hidden">
        <BackgroundPattern />
        <div className="relative container mx-auto px-4">
          {/* Navigation */}
          <div className="pt-8">
            <Button
              variant="ghost"
              className="text-white hover:text-white/80 hover:bg-white/10"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </div>

          {/* Hero Content */}
          <div className="py-16 sm:py-24">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {/* Category Tag */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium text-white">
                  {post.category}
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                  {post.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-white/80">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    {post.readTime}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            {/* Add actual image when available */}
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {post.content?.split("\n").map(
              (paragraph, index) =>
                paragraph.trim() && (
                  <p
                    key={index}
                    className="mb-6 text-lg leading-relaxed text-gray-700"
                  >
                    {paragraph.trim()}
                  </p>
                )
            )}
          </div>

          {/* Share and Navigation */}
          <div className="mt-16 pt-8 border-t">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <Button
                variant="outline"
                className="hover:bg-primary/5"
                onClick={() => router.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
              {/* Add share buttons here if needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
