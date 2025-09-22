import React from "react";
import { services } from "../servicesData";
import { Metadata } from "next";
import ServiceDetailClient from "./ServiceDetailClient";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    return {
      title: "Service Not Found - Registration SEVA",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: `${service.title} - Registration SEVA`,
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
      title: service.title,
      description: service.description,
      type: "website",
    },
  };
}

export default function ServiceDetail({ params }: Props) {
  return <ServiceDetailClient slug={params.slug} />;
}
