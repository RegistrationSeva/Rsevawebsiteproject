import React from "react";
import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ClientProposalGeneratorClient from "./ClientProposalGeneratorClient";

export const metadata: Metadata = {
  title: "Free Client Proposal Generator Online - Registration SEVA",
  description:
    "Create professional client proposals online with scope, deliverables, timeline, pricing, GST/non-GST option, payment terms and PDF download.",
  alternates: {
    canonical:
      "https://www.registrationseva.com/tools/client-proposal-generator",
  },
  openGraph: {
    title: "Free Client Proposal Generator Online - Registration SEVA",
    description:
      "Generate professional service proposals with scope, pricing, timeline, payment terms, assumptions and PDF download.",
    type: "website",
    url: "https://www.registrationseva.com/tools/client-proposal-generator",
  },
};

export default function ClientProposalGeneratorPage() {
  return (
    <ToolPageShell
      badge="Business Document Tool"
      title="Free Client Proposal Generator"
      intro="Create professional client proposals for services, consulting, freelancing, agencies and small businesses with scope, deliverables, pricing, payment terms and PDF download."
      chips={["No Login Required", "PDF Download", "Service Proposal", "Business Tools"]}
      faqs={[
        {
          q: "Is this proposal generator free?",
          a: "Yes, the client proposal generator is completely free to use without login.",
        },
        {
          q: "Can I create a GST or non-GST proposal?",
          a: "Yes, choose Non-GST Proposal, GST Proposal - CGST + SGST or GST Proposal - IGST and set the GST rate.",
        },
        {
          q: "Is my proposal data stored anywhere?",
          a: "No, everything runs in your browser. Your proposal data is never uploaded to our servers.",
        },
      ]}
    >
      <ClientProposalGeneratorClient />
    </ToolPageShell>
  );
}
