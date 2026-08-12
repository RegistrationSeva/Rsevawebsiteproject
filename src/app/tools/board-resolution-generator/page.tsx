import React from "react";
import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import BoardResolutionGeneratorClient from "./BoardResolutionGeneratorClient";

export const metadata: Metadata = {
  title: "Free Board Resolution Generator Online - Registration SEVA",
  description:
    "Create professional board resolution drafts for bank account opening, GST authorization, trademark filing, authorized signatory appointment and general company decisions.",
  alternates: {
    canonical:
      "https://www.registrationseva.com/tools/board-resolution-generator",
  },
  openGraph: {
    title: "Free Board Resolution Generator Online - Registration SEVA",
    description:
      "Generate board resolution drafts online with company details, meeting details, resolution type, authorized person details and PDF download.",
    type: "website",
    url: "https://www.registrationseva.com/tools/board-resolution-generator",
  },
};

export default function BoardResolutionGeneratorPage() {
  return (
    <ToolPageShell
      badge="Legal & Business Document Tool"
      title="Free Board Resolution Generator Online"
      intro="Create professional board resolution drafts for common company decisions such as bank account opening, GST authorization, trademark filing, authorized signatory appointment, rent agreement approval and general authorizations."
      chips={["No Login Required", "PDF Download", "Company Use", "Draft Format"]}
      faqs={[
        {
          q: "What is a board resolution?",
          a: "A board resolution is a written record of a decision approved by the board of directors of a company.",
        },
        {
          q: "Can I use this tool for bank account opening?",
          a: "Yes, the tool includes a bank account opening template. Banks may still require their own format or additional documents.",
        },
        {
          q: "Can I create GST authorization resolution?",
          a: "Yes, you can select GST authorization and customize the authorized person and details as required.",
        },
        {
          q: "Is this a legally verified format?",
          a: "This is a general draft utility. Final wording should be reviewed based on company facts, law, Articles of Association and professional advice.",
        },
        {
          q: "Can Registration Seva help with business documents?",
          a: "Yes, Registration Seva can connect users with support for business documents, company compliance and related services.",
        },
      ]}
    >
      <BoardResolutionGeneratorClient />
    </ToolPageShell>
  );
}
