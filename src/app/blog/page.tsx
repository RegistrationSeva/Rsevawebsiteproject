/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog | Registration SEVA - Business & Compliance",
  description:
    "Explore expert insights, comprehensive guides, and actionable tips from Registration Seva on business registration, trademark protection, GST compliance, MSME registration, and entrepreneurship in India. Stay informed about the latest business regulations, government policies, and compliance requirements with our detailed articles and step-by-step tutorials.",
  keywords:
    "registration seva blog, business registration tips, trademark blog, GST blog, compliance blog, startup guides, entrepreneurship india, company incorporation, LLP registration, private limited company, business compliance, MSME registration, FSSAI license, ISO certification, business articles",
  openGraph: {
    title: "Blog | Registration SEVA - Business & Compliance Insights",
    description:
      "Stay updated with Registration Seva's comprehensive blog featuring expert advice, detailed articles, and valuable resources on business registration, trademark protection, compliance, and entrepreneurship in India.",
    type: "website",
  },
};

export default function Blog() {
  return <BlogClient />;
}
