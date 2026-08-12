import React from "react";
import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import GstCalculatorClient from "./GstCalculatorClient";

export const metadata: Metadata = {
  title: "Free GST Calculator Online | Calculate GST Amount - Registration SEVA",
  description:
    "Calculate GST amount, taxable value, CGST, SGST, IGST and GST-inclusive or exclusive invoice totals online for free.",
  alternates: {
    canonical: "https://www.registrationseva.com/tools/gst-calculator",
  },
  openGraph: {
    title:
      "Free GST Calculator Online | Calculate GST Amount - Registration SEVA",
    description:
      "Calculate GST amount, taxable value, CGST, SGST, IGST and invoice totals online for free.",
    type: "website",
    url: "https://www.registrationseva.com/tools/gst-calculator",
  },
};

export default function GstCalculatorPage() {
  return (
    <ToolPageShell
      badge="Tax & GST Tool"
      title="Free GST Calculator Online"
      intro="Calculate taxable value, GST amount, CGST/SGST or IGST breakup and final invoice value in seconds."
      chips={["No Login Required", "Add or Remove GST", "PDF Download"]}
      faqs={[
        {
          q: "Is this GST calculator free?",
          a: "Yes, the GST calculator is free to use without login.",
        },
        {
          q: "Can I calculate GST-inclusive amount?",
          a: "Yes. Select “Remove GST from GST-inclusive amount” to calculate taxable value and GST amount from a total amount.",
        },
        {
          q: "Can I calculate CGST, SGST and IGST?",
          a: "Yes. Select CGST + SGST for intra-state breakup or IGST for inter-state tax amount.",
        },
      ]}
    >
      <GstCalculatorClient />
    </ToolPageShell>
  );
}
