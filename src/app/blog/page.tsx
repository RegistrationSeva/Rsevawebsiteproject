/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title:
    "Blog | Registration SEVA – Business Registration, Trademark & Compliance Insights in India",
  description:
    "Explore expert insights, guides, and tips from Registration Seva on business registration, trademark protection, GST, compliance, and entrepreneurship in India.",
  keywords:
    "registration seva blog, business registration tips, trademark blog, GST blog, compliance blog, startup guides, entrepreneurship india",
  openGraph: {
    title:
      "Blog | Registration SEVA – Business Registration, Trademark & Compliance Insights in India",
    description:
      "Stay updated with Registration Seva’s blog featuring expert advice, articles, and resources on business registration, compliance, and entrepreneurship.",
    type: "website",
  },
};

export default function Blog() {
  return <BlogClient />;
}
