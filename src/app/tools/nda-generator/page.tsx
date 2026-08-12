import React from "react";
import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import NdaGeneratorClient from "./NdaGeneratorClient";

export const metadata: Metadata = {
  title: "Free NDA Generator Online - Registration SEVA",
  description:
    "Create a simple NDA or non-disclosure agreement draft online for mutual, one-way, employee, vendor, freelancer, consultant or client confidentiality use.",
  alternates: {
    canonical: "https://www.registrationseva.com/tools/nda-generator",
  },
  openGraph: {
    title: "Free NDA Generator Online - Registration SEVA",
    description:
      "Generate a simple non-disclosure agreement draft with party details, confidential information, purpose, term, jurisdiction and PDF download.",
    type: "website",
    url: "https://www.registrationseva.com/tools/nda-generator",
  },
};

export default function NdaGeneratorPage() {
  return (
    <ToolPageShell
      badge="Legal & Document Tool"
      title="Free NDA Generator Online"
      intro="Create a simple non-disclosure agreement draft for business, employee, vendor, freelancer, consultant, client or mutual confidentiality use."
      chips={["No Login Required", "PDF Download", "Editable Draft", "Confidentiality Format"]}
      faqs={[
        {
          q: "Can I use this as a final NDA?",
          a: "This tool creates a general draft. Final wording, legal enforceability and suitability should be reviewed by a professional before signing.",
        },
        {
          q: "What is the difference between mutual and one-way NDA?",
          a: "A mutual NDA is used when both parties may share confidential information. A one-way NDA is used when mainly one party shares confidential information.",
        },
        {
          q: "Can this be used for employees or freelancers?",
          a: "Yes, you can select Employee NDA or Vendor / Freelancer NDA and customize the details.",
        },
        {
          q: "Can Registration Seva help with business documents?",
          a: "Yes, Registration Seva can connect users with support for business documents, company compliance and related services.",
        },
      ]}
    >
      <NdaGeneratorClient />
    </ToolPageShell>
  );
}
