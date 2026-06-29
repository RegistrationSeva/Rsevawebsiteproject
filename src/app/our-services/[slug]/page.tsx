import React from "react";
import { services } from "../servicesData";
import { Metadata } from "next";
import ServiceDetailClient from "./ServiceDetailClient";
import { notFound } from "next/navigation";

const BASE_URL = "https://www.registrationseva.com";

type Props = {
  params: { slug: string };
};

function generateDynamicTitle(service: any): string {
  const title = service.title;
  const brandName = "Registration SEVA";
  const separator = " | ";
  const maxLength = 65; // SEO best practice: keep titles under 65 characters
  
  // Option 1: Title with brand (if fits under 65 chars)
  const simpleTitleWithBrand = `${title}${separator}${brandName}`;
  if (simpleTitleWithBrand.length <= maxLength) {
    return simpleTitleWithBrand;
  }
  
  // Option 2: Shorten title to fit with brand
  const maxTitleLength = maxLength - brandName.length - separator.length - 3; // Reserve 3 chars for "..."
  
  if (title.length > maxTitleLength) {
    // Find the last complete word that fits
    const truncatedTitle = title.slice(0, maxTitleLength).trim();
    const lastSpace = truncatedTitle.lastIndexOf(" ");
    const finalTitle = lastSpace > 0 ? truncatedTitle.slice(0, lastSpace) : truncatedTitle;
    
    return `${finalTitle}${separator}${brandName}`;
  }
  
  return simpleTitleWithBrand;
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

  const canonicalUrl = `${BASE_URL}/our-services/${params.slug}`;

  return {
    title: dynamicTitle,
    description: service.description,
    keywords: serviceKeywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: dynamicTitle,
      description: service.description,
      type: "website",
      url: canonicalUrl,
      images: [
        {
          url: "/logo.jpg",
          width: 1024,
          height: 321,
          alt: `${service.title} - Registration SEVA`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dynamicTitle,
      description: service.description,
      images: ["/logo.jpg"],
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

  const pageUrl = `${BASE_URL}/our-services/${service.slug}`;

  // Service JSON-LD — server-rendered so AI crawlers (GPTBot, CCBot, Anthropic) can parse it
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: pageUrl,
    provider: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Registration Seva",
      url: BASE_URL,
    },
    areaServed: { "@type": "Country", name: "India" },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: pageUrl,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Our Services", item: `${BASE_URL}/our-services` },
      { "@type": "ListItem", position: 3, name: service.title, item: pageUrl },
    ],
  };

  // FAQPage schema — only if service has FAQ entries
  const faqItems = (service as any)?.faq?.data?.filter(
    (f: any) => f?.title && f?.description && !(service as any)?.faq?.isEmpty
  );
  const faqSchema =
    faqItems && faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((f: any) => ({
            "@type": "Question",
            name: f.title,
            acceptedAnswer: { "@type": "Answer", text: f.description },
          })),
        }
      : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <ServiceDetailClient serviceData={service} />
    </>
  );
}
