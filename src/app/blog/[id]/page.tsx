"use client";

import React from "react";
import { useBlog } from "@/api/blog/use-get-blog";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeft, Calendar, Eye, Share2 } from "lucide-react";

export default function BlogDetail({ params }: { params: { id: string } }) {
  const {
    data: blogData,
    isLoading,
    error,
  } = useBlog({
    variables: {
      id: params.id,
    },
  });

  const blog = blogData?.data?.blog;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5]">
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse max-w-4xl mx-auto space-y-8">
            <div className="h-8 bg-white rounded-lg w-3/4" />
            <div className="h-4 bg-white rounded-lg w-1/4" />
            <div className="h-[60vh] bg-white rounded-2xl" />
            <div className="space-y-4">
              <div className="h-4 bg-white rounded-lg w-full" />
              <div className="h-4 bg-white rounded-lg w-5/6" />
              <div className="h-4 bg-white rounded-lg w-4/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[#F5F5F5]">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-red-500">
            Error loading blog post. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary to-secondary">
        <div className="absolute inset-0 bg-black/50"></div>
        {blog.coverImage && (
          <div className="absolute inset-0">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          </div>
        )}

        <div className="container mx-auto relative">
          {/* Navigation */}
          <div className="pt-8 px-4">
            <Link
              href="/blog"
              className="inline-flex items-center text-white hover:text-white/80 transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </div>

          {/* Hero Content */}
          <div className="py-20 sm:py-28 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {/* Category Tag */}
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium text-white border border-white/10">
                  {blog.category.name}
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                  {blog.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-white/90">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${blog.author.name}&backgroundColor=ffffff`}
                      alt={blog.author.name}
                      className="w-8 h-8 rounded-full bg-white/20 p-0.5"
                    />
                    <span className="font-medium">{blog.author.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>
                      {format(new Date(blog.createdAt), "MMMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    <span>{blog.views} views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto -mt-16 relative z-10">
          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <article className="prose prose-lg max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: blog.content || "" }}
                className="prose-headings:font-bold prose-headings:text-primary prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-secondary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg prose-strong:text-primary prose-strong:font-semibold"
              />
            </article>

            {/* Share and Category */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-500">Share:</span>
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500">Category:</span>
                  <Link
                    href={`/blog?category=${blog.category.slug}`}
                    className="bg-primary/5 text-primary hover:bg-primary hover:text-white transition-colors px-4 py-1.5 rounded-full text-sm font-medium"
                  >
                    {blog.category.name}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Blog */}
          <div className="text-center mb-16">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-full hover:bg-secondary transition-colors gap-2 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
