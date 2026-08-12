import React from "react";
import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import DeliveryChallanGeneratorClient from "./DeliveryChallanGeneratorClient";

export const metadata: Metadata = {
  title: "Free Delivery Challan Generator Online - Registration SEVA",
  description:
    "Create professional delivery challans online with consignor, consignee, item, dispatch, transport and PDF download details.",
  alternates: {
    canonical: "https://www.registrationseva.com/tools/delivery-challan-generator",
  },
  openGraph: {
    title: "Free Delivery Challan Generator Online - Registration SEVA",
    description:
      "Generate delivery challans with dispatch details, item table, transport information and PDF download.",
    type: "website",
    url: "https://www.registrationseva.com/tools/delivery-challan-generator",
  },
};

export default function DeliveryChallanGeneratorPage() {
  return (
    <ToolPageShell
      badge="Business Tool"
      title="Free Delivery Challan Generator Online"
      intro="Create professional delivery challans with consignor, consignee, dispatch, item and transport details. Generate a clean PDF for business movement, delivery records and internal documentation."
      chips={["No Login Required", "PDF Download", "Business Records", "India-Focused"]}
      faqs={[
        {
          q: "What is a delivery challan?",
          a: "A delivery challan is a document used to record movement or delivery of goods where an invoice may not be issued immediately or where a separate delivery record is needed.",
        },
        {
          q: "Can I download a delivery challan PDF?",
          a: "Yes, this tool can generate a professional delivery challan PDF after you enter the required details.",
        },
        {
          q: "Is this a tax invoice?",
          a: "No. A delivery challan is not the same as a tax invoice. Use an invoice generator when you need to issue a GST or non-GST invoice.",
        },
      ]}
    >
      <DeliveryChallanGeneratorClient />
    </ToolPageShell>
  );
}
