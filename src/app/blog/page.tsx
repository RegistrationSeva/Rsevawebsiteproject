/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { BlogCard } from "@/components/blog/BlogCard";
import { SearchHeader } from "@/components/blog/SearchHeader";
import { Pagination } from "@/components/blog/Pagination";
import { useBlogs } from "@/api/blog/use-get-blogs";
import { useCategories } from "@/api/blog/use-get-category";
import { useDebounce } from "@/lib/utils";
import type { Category } from "@/api/blog/types";
import { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog - Registration SEVA",
  description:
    "Explore expert insights, guides, and tips from Registration Seva on business registration, trademark protection, GST, compliance, and entrepreneurship in India.",
  keywords:
    "registration seva blog, business registration tips, trademark blog, GST blog, compliance blog, startup guides, entrepreneurship india",
  openGraph: {
    title: "Blog - Registration SEVA",
    description:
      "Stay updated with Registration Seva’s blog featuring expert advice, articles, and resources on business registration, compliance, and entrepreneurship.",
    type: "website",
  },
};

export default function Blog() {
  return <BlogClient />;
}
