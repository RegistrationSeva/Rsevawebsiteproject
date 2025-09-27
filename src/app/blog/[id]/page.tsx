import React from "react";
import { Metadata } from "next";
import { getBlog } from "@/api/blog/use-get-blog";
import BlogDetailClient from "./BlogDetailClient";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const blogData = await getBlog({ id: params.id });
    const blog = blogData?.data?.blog;

    if (!blog) {
      return {
        title: "Blog Post Not Found - Registration SEVA",
        description: "The requested blog post could not be found.",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    return {
      title: `${blog.title} - Registration SEVA`,
      description: `Read ${blog.title} on Registration SEVA blog. Expert insights on business registration, compliance, and entrepreneurship in India.`,
      keywords: [
        "registration seva blog",
        "business registration",
        "compliance",
        "entrepreneurship",
        blog.category.name.toLowerCase(),
      ].join(", "),
      openGraph: {
        title: blog.title,
        description: `Read ${blog.title} on Registration SEVA blog.`,
        type: "article",
        publishedTime: blog.createdAt,
        authors: [blog.author.name],
        images: blog.coverImage
          ? [
              {
                url: blog.coverImage,
                width: 1200,
                height: 630,
                alt: blog.title,
              },
            ]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: `Read ${blog.title} on Registration SEVA blog.`,
        images: blog.coverImage ? [blog.coverImage] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post Not Found - Registration SEVA",
      description: "The requested blog post could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default function BlogDetail({ params }: Props) {
  return <BlogDetailClient id={params.id} />;
}
