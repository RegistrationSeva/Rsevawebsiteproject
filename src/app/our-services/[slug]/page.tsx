import React from "react";
import { services } from "../servicesData";
import { Metadata } from "next";
import ServiceDetailClient from "./ServiceDetailClient";

type Props = {
  params: { slug: string };
};

function truncateTitleWithSuffix(
  title: string,
  suffix: string,
  maxLength = 60
): string {
  const availableLength = maxLength - suffix.length - 3; // 3 for " | "
  if (availableLength <= 0) return suffix; // fallback if suffix is too long
  if (title.length <= availableLength) return `${title} | ${suffix}`;
  const truncated = title.slice(0, availableLength);
  return `${truncated.slice(0, truncated.lastIndexOf(" "))}... | ${suffix}`;
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

  const suffix =
    "Registration SEVA – Business Registration & Compliance Experts";
  const fullTitle = truncateTitleWithSuffix(service.title, suffix, 60);

  return {
    title: fullTitle,
    description: service.description,
    keywords: [
      "registration seva services",
      "company registration india",
      "trademark services",
      "GST registration",
      "business compliance",
      "startup consultancy",
      "business registration solutions",
      service.title.toLowerCase(),
    ].join(", "),
    openGraph: {
      title: fullTitle,
      description: service.description,
      type: "website",
    },
  };
}

export default function ServiceDetail({ params }: Props) {
  return <ServiceDetailClient slug={params.slug} />;
}
