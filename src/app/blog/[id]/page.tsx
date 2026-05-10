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
      // Provide better fallback metadata instead of "Blog Post Not Found"
      return {
        title: `Business Blog - Registration SEVA`,
        description: "Read expert insights on business registration, compliance, and entrepreneurship in India. Stay updated with the latest business trends and legal requirements.",
        keywords: [
          "registration seva blog",
          "business registration",
          "compliance",
          "entrepreneurship",
          "business tips",
          "legal advice",
        ].join(", "),
        openGraph: {
          title: "Business Blog - Registration SEVA",
          description: "Expert insights on business registration, compliance, and entrepreneurship in India.",
          type: "website",
          images: [
            {
              url: "/logo.jpg",
              width: 1200,
              height: 630,
              alt: "Registration SEVA - Business Blog",
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title: "Business Blog - Registration SEVA",
          description: "Expert insights on business registration, compliance, and entrepreneurship in India.",
          images: ["/logo.jpg"],
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
        blog.category?.name?.toLowerCase() || "business tips",
      ].join(", "),
      openGraph: {
        title: blog.title,
        description: `Read ${blog.title} on Registration SEVA blog.`,
        type: "article",
        publishedTime: blog.createdAt,
        authors: [blog.author?.name || "Registration SEVA"],
        images: blog.coverImage
          ? [
              {
                url: blog.coverImage,
                width: 1200,
                height: 630,
                alt: blog.title,
              },
            ]
          : [
              {
                url: "/logo.jpg",
                width: 1200,
                height: 630,
                alt: blog.title,
              },
            ],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: `Read ${blog.title} on Registration SEVA blog.`,
        images: blog.coverImage ? [blog.coverImage] : ["/logo.jpg"],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    // Provide better fallback metadata instead of "Blog Post Not Found"
    return {
      title: `Business Blog - Registration SEVA`,
      description: "Read expert insights on business registration, compliance, and entrepreneurship in India. Stay updated with the latest business trends and legal requirements.",
      keywords: [
        "registration seva blog",
        "business registration",
        "compliance",
        "entrepreneurship",
        "business tips",
        "legal advice",
      ].join(", "),
      openGraph: {
        title: "Business Blog - Registration SEVA",
        description: "Expert insights on business registration, compliance, and entrepreneurship in India.",
        type: "website",
        images: [
          {
            url: "/logo.jpg",
            width: 1200,
            height: 630,
            alt: "Registration SEVA - Business Blog",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Business Blog - Registration SEVA",
        description: "Expert insights on business registration, compliance, and entrepreneurship in India.",
        images: ["/logo.jpg"],
      },
    };
  }
}

export default function BlogDetail({ params }: Props) {
  return <BlogDetailClient id={params.id} />;
}
