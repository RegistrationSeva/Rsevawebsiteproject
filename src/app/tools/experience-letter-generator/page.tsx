import React from "react";
import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ExperienceLetterGeneratorClient from "./ExperienceLetterGeneratorClient";

export const metadata: Metadata = {
  title: "Free Experience Letter Generator Online - Registration SEVA",
  description:
    "Create a professional employee experience letter online with employee details, designation, employment period, conduct note and PDF download.",
  alternates: {
    canonical:
      "https://www.registrationseva.com/tools/experience-letter-generator",
  },
  openGraph: {
    title: "Free Experience Letter Generator Online - Registration SEVA",
    description:
      "Create professional employee experience letters online with PDF download.",
    type: "website",
    url: "https://www.registrationseva.com/tools/experience-letter-generator",
  },
};

export default function ExperienceLetterGeneratorPage() {
  return (
    <ToolPageShell
      badge="HR & Payroll Tool"
      title="Free Experience Letter Generator Online"
      intro="Create a professional employee experience letter with company details, employee details, designation, employment duration, conduct note, signatory details and PDF download. Useful for HR teams, small businesses, consultants and employers."
      chips={["No Login Required", "PDF Download", "HR Document", "India-Focused"]}
      faqs={[
        {
          q: "Is this experience letter generator free?",
          a: "Yes, this tool is free to use without login.",
        },
        {
          q: "Can I download the experience letter as PDF?",
          a: "Yes, you can download the generated experience letter as a PDF.",
        },
        {
          q: "What details are included in an experience letter?",
          a: "An experience letter usually includes employee name, designation, department, employment period, work conduct, responsibilities and signatory details.",
        },
        {
          q: "Can this be used as a final HR document?",
          a: "This tool provides a general format. Employers should review and customize the letter based on company policy and facts before official issue.",
        },
      ]}
    >
      <ExperienceLetterGeneratorClient />
    </ToolPageShell>
  );
}
