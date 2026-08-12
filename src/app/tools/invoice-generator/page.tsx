import React from "react";
import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import InvoiceGeneratorClient from "./InvoiceGeneratorClient";

export const metadata: Metadata = {
  title: "Free GST Invoice Generator Online - Registration SEVA",
  description:
    "Create professional GST and non-GST invoices online for free. Add seller details, customer details, item table, GST calculation and download invoice PDF.",
  alternates: {
    canonical: "https://www.registrationseva.com/tools/invoice-generator",
  },
  openGraph: {
    title: "Free GST Invoice Generator Online - Registration SEVA",
    description:
      "Create professional GST and non-GST invoices online for free with item table, GST calculation and PDF download.",
    type: "website",
    url: "https://www.registrationseva.com/tools/invoice-generator",
  },
};

export default function InvoiceGeneratorPage() {
  return (
    <ToolPageShell
      badge="Business Tool"
      title="Free GST Invoice Generator Online"
      intro="Create GST and non-GST invoices online with seller details, customer details, item table, tax calculation, payment details and professional PDF download."
      chips={["GST & Non-GST Invoice", "PDF Download", "Item-Wise Calculation", "No Login"]}
      faqs={[
        {
          q: "Is this invoice generator free?",
          a: "Yes, the invoice generator is completely free to use without login.",
        },
        {
          q: "Can I create GST invoices?",
          a: "Yes, you can create GST invoices with item details, GST percentage and invoice total.",
        },
        {
          q: "Can I create non-GST invoices?",
          a: "Yes, select Non-GST Invoice when GST is not applicable.",
        },
        {
          q: "Is my invoice data stored anywhere?",
          a: "No, everything runs in your browser. Your invoice data is never uploaded to our servers.",
        },
      ]}
    >
      <InvoiceGeneratorClient />
    </ToolPageShell>
  );
}
