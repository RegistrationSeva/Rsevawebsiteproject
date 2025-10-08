import React from "react";
import { services } from "../servicesData";
import { Metadata } from "next";
import ServiceDetailClient from "./ServiceDetailClient";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

function generateDynamicTitle(service: any): string {
  const title = service.title;
  const slug = service.slug;
  
  // Determine service category and create appropriate suffix
  let category = "";
  
  if (slug.includes("company") || slug.includes("llp") || slug.includes("partnership") || slug.includes("proprietorship")) {
    category = "Registration";
  } else if (slug.includes("gst") || slug.includes("tax") || slug.includes("income-tax")) {
    category = "Services";
  } else if (slug.includes("trademark") || slug.includes("copyright") || slug.includes("patent")) {
    category = "Registration";
  } else if (slug.includes("fssai") || slug.includes("license") || slug.includes("import-export")) {
    category = "License";
  } else if (slug.includes("compliance") || slug.includes("annual") || slug.includes("filing")) {
    category = "Services";
  } else if (slug.includes("change") || slug.includes("increase") || slug.includes("add")) {
    category = "Services";
  } else {
    category = "Registration";
  }
  
  // Create SEO-friendly title
  // Format: "Service Title | Category | Registration SEVA"
  const brandName = "Registration SEVA";
  const separator = " | ";
  
  // Option 1: Full title with category and brand (if fits in 70 chars for better SEO)
  const fullTitle = `${title}${separator}${category}${separator}${brandName}`;
  if (fullTitle.length <= 70) {
    return fullTitle;
  }
  
  // Option 2: Title with brand only (if fits)
  const simpleTitleWithBrand = `${title}${separator}${brandName}`;
  if (simpleTitleWithBrand.length <= 70) {
    return simpleTitleWithBrand;
  }
  
  // Option 3: Shortened title with brand
  const maxTitleLength = 70 - brandName.length - separator.length;
  const truncatedTitle = title.slice(0, maxTitleLength).trim();
  const lastSpace = truncatedTitle.lastIndexOf(" ");
  const finalTitle = lastSpace > 0 ? truncatedTitle.slice(0, lastSpace) : truncatedTitle;
  
  return `${finalTitle}${separator}${brandName}`;
}

function generateServiceKeywords(service: any): string {
  // Extract individual words from URL slug (these MUST appear in keywords)
  const slugWords = service.slug
    .split("-")
    .filter((word: string) => word.length > 2); // Keep words longer than 2 chars

  // Convert slug to readable phrase
  const slugPhrase = slugWords.join(" ");

  // Extract important words from title (remove common words)
  const commonWords = ["in", "of", "for", "and", "the", "a", "an", "with", "to", "or"];
  const titleWords = service.title
    .toLowerCase()
    .split(" ")
    .filter((word: string) => !commonWords.includes(word) && word.length > 2);

  // Combine title words and slug words, remove duplicates
  const allServiceWords = Array.from(new Set([...slugWords, ...titleWords]));

  // Build keyword string with URL keywords FIRST (most important for SEO check)
  const keywordList = [
    slugPhrase, // Full slug phrase: "private limited company"
    service.title.toLowerCase(), // Full title
    ...allServiceWords, // Individual words from both slug and title
    "registration seva",
    "india",
    "online",
  ];

  // Remove duplicates and empty values
  const uniqueKeywords = Array.from(new Set(keywordList)).filter(Boolean);

  return uniqueKeywords.join(", ");
}

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    return {
      title: "Service Not Found - Registration SEVA",
      description: "The requested service could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  // Generate dynamic title based on service category
  const dynamicTitle = generateDynamicTitle(service);

  // Generate dynamic keywords based on service content
  const serviceKeywords = generateServiceKeywords(service);

  // Create canonical URL
  const canonicalUrl = `https://registrationseva.com/our-services/${params.slug}`;

  return {
    title: dynamicTitle,
    description: service.description,
    keywords: serviceKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: dynamicTitle,
      description: service.description,
      type: "website",
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: dynamicTitle,
      description: service.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default function ServiceDetail({ params }: Props) {
  const service = services.find((s) => s.slug === params.slug);
  
  if (!service) {
    notFound();
  }

  return <ServiceDetailClient serviceData={service} />;
}
