import React from "react";
import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import PurchaseOrderGeneratorClient from "./PurchaseOrderGeneratorClient";

export const metadata: Metadata = {
  title: "Free Purchase Order Generator Online - Registration SEVA",
  description:
    "Create professional purchase orders online with buyer details, supplier details, item table, GST calculation, delivery terms, payment terms and PDF download.",
  alternates: {
    canonical: "https://www.registrationseva.com/tools/purchase-order-generator",
  },
  openGraph: {
    title: "Free Purchase Order Generator Online - Registration SEVA",
    description:
      "Generate professional purchase orders with vendor details, item-wise pricing, GST breakup, delivery terms and PDF download.",
    type: "website",
    url: "https://www.registrationseva.com/tools/purchase-order-generator",
  },
};

export default function PurchaseOrderGeneratorPage() {
  return (
    <ToolPageShell
      badge="Business Tool"
      title="Free Purchase Order Generator Online"
      intro="Create a professional purchase order with buyer details, supplier details, PO number, delivery date, item-wise pricing, GST or non-GST totals, payment terms and PDF download. Useful for businesses, consultants, traders, agencies and procurement teams."
      chips={["No Login Required", "GST & Non-GST", "Vendor PO Format", "PDF Download"]}
      faqs={[
        {
          q: "Is this purchase order generator free?",
          a: "Yes, this tool is free to use without login.",
        },
        {
          q: "Can I create GST purchase orders?",
          a: "Yes, you can create GST purchase orders with CGST/SGST or IGST breakup, subject to correct tax selection.",
        },
        {
          q: "Can I create non-GST purchase orders?",
          a: "Yes, select Non-GST Purchase Order to prepare a PO without GST calculation.",
        },
        {
          q: "Can I download the purchase order as PDF?",
          a: "Yes, after entering details you can download a professional purchase order PDF.",
        },
        {
          q: "Is purchase order same as invoice?",
          a: "No. A purchase order is generally issued by the buyer to order goods or services. An invoice is generally issued by the supplier for billing.",
        },
      ]}
    >
      <PurchaseOrderGeneratorClient />
    </ToolPageShell>
  );
}
