import React from "react";
import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import QuotationGeneratorClient from "./QuotationGeneratorClient";

export const metadata: Metadata = {
  title: "Free Quotation Generator Online - Registration SEVA",
  description:
    "Create professional quotations online with business details, customer details, item table, GST or non-GST pricing, validity, terms and PDF download.",
  alternates: {
    canonical: "https://www.registrationseva.com/tools/quotation-generator",
  },
  openGraph: {
    title: "Free Quotation Generator Online - Registration SEVA",
    description:
      "Create professional quotations online with item-wise pricing, GST calculation, validity, terms and PDF download.",
    type: "website",
    url: "https://www.registrationseva.com/tools/quotation-generator",
  },
};

export default function QuotationGeneratorPage() {
  return (
    <ToolPageShell
      badge="Business Tool"
      title="Free Quotation Generator Online"
      intro="Create a professional quotation with business details, customer details, item-wise pricing, discounts, GST or non-GST totals, validity, terms and PDF download. Useful for service providers, freelancers, traders, agencies, consultants and small businesses."
      chips={["No Login Required", "GST & Non-GST", "Item-Wise Pricing", "PDF Download"]}
      faqs={[
        {
          q: "Is this quotation generator free?",
          a: "Yes, this tool is free to use without login.",
        },
        {
          q: "Can I create GST quotations?",
          a: "Yes, you can create GST quotations with CGST/SGST or IGST breakup, subject to correct tax selection.",
        },
        {
          q: "Can I create non-GST quotations?",
          a: "Yes, select Non-GST Quotation to prepare quotations without GST calculation.",
        },
        {
          q: "Can I download quotation as PDF?",
          a: "Yes, after entering details you can download a professional quotation PDF.",
        },
        {
          q: "Can I convert quotation to invoice?",
          a: "This tool creates quotations. After approval, you can use Registration Seva's Invoice Generator to create the final invoice.",
        },
      ]}
    >
      <QuotationGeneratorClient />
    </ToolPageShell>
  );
}
