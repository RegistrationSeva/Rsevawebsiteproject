import React from "react";
import { services } from "../servicesData";
import { Metadata } from "next";
import ServiceDetailClient from "./ServiceDetailClient";

type Props = {
  params: { slug: string };
};

function truncateTitle(title: string, maxLength = 60): string {
  if (title.length <= maxLength) return title;
  const truncated = title.slice(0, maxLength);
  return truncated.slice(0, truncated.lastIndexOf(" ")) + "...";
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

  const safeTitle = truncateTitle(service.title, 60);

  return {
    title: `${safeTitle} | Registration SEVA – Business Registration & Compliance Experts`,
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
      title: `${safeTitle} | Registration SEVA`,
      description: service.description,
      type: "website",
    },
  };
}

export default function ServiceDetail({ params }: Props) {
  return <ServiceDetailClient slug={params.slug} />;
}
