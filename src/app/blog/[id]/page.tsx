import React from "react";
import { Metadata } from "next";
import { getBlog } from "@/api/blog/use-get-blog";
import BlogDetailClient from "./BlogDetailClient";

const BASE_URL = "https://www.registrationseva.com";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const blogData = await getBlog({ id: params.id });
    const blog = blogData?.data?.blog;

    if (!blog) {
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
        alternates: { canonical: `${BASE_URL}/blog` },
        openGraph: {
          title: "Business Blog - Registration SEVA",
          description: "Expert insights on business registration, compliance, and entrepreneurship in India.",
          type: "website",
          images: [{ url: "/logo.jpg", width: 1200, height: 630, alt: "Registration SEVA - Business Blog" }],
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
      alternates: { canonical: `${BASE_URL}/blog/${params.id}` },
      openGraph: {
        title: blog.title,
        description: `Read ${blog.title} on Registration SEVA blog.`,
        type: "article",
        url: `${BASE_URL}/blog/${params.id}`,
        publishedTime: blog.createdAt,
        modifiedTime: blog.updatedAt,
        authors: [blog.author?.name || "Registration SEVA"],
        images: blog.coverImage
          ? [{ url: blog.coverImage, width: 1200, height: 630, alt: blog.title }]
          : [{ url: "/logo.jpg", width: 1200, height: 630, alt: blog.title }],
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
    return {
      title: `Business Blog - Registration SEVA`,
      description: "Read expert insights on business registration, compliance, and entrepreneurship in India.",
      alternates: { canonical: `${BASE_URL}/blog` },
      openGraph: {
        title: "Business Blog - Registration SEVA",
        description: "Expert insights on business registration, compliance, and entrepreneurship in India.",
        type: "website",
        images: [{ url: "/logo.jpg", width: 1200, height: 630, alt: "Registration SEVA - Business Blog" }],
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

export default async function BlogDetail({ params }: Props) {
  // Fetch blog server-side to render JSON-LD — AI crawlers don't execute JS so this must be SSR
  const blogData = await getBlog({ id: params.id });
  const blog = blogData?.data?.blog;

  const jsonLd = blog
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blog.title,
        description: `Read ${blog.title} on Registration SEVA blog.`,
        image: blog.coverImage || `${BASE_URL}/logo.jpg`,
        url: `${BASE_URL}/blog/${params.id}`,
        datePublished: blog.createdAt,
        dateModified: blog.updatedAt || blog.createdAt,
        author: {
          "@type": "Person",
          name: blog.author?.name || "Registration SEVA",
        },
        publisher: {
          "@type": "Organization",
          "@id": `${BASE_URL}/#organization`,
          name: "Registration Seva",
          logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.jpg` },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/blog/${params.id}` },
        articleSection: blog.category?.name || "Business",
        inLanguage: "en-IN",
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BlogDetailClient id={params.id} />
    </>
  );
}
