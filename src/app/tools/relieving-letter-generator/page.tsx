import React from "react";
import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import RelievingLetterGeneratorClient from "./RelievingLetterGeneratorClient";

export const metadata: Metadata = {
  title: "Free Relieving Letter Generator Online - Registration SEVA",
  description:
    "Create a professional employee relieving letter online with employee details, resignation details, last working date, handover status and PDF download.",
  alternates: {
    canonical:
      "https://www.registrationseva.com/tools/relieving-letter-generator",
  },
  openGraph: {
    title: "Free Relieving Letter Generator Online - Registration SEVA",
    description:
      "Create professional relieving letters online with employee details, last working date and PDF download.",
    type: "website",
    url: "https://www.registrationseva.com/tools/relieving-letter-generator",
  },
};

export default function RelievingLetterGeneratorPage() {
  return (
    <ToolPageShell
      badge="HR & Payroll Tool"
      title="Free Relieving Letter Generator Online"
      intro="Create a professional relieving letter with company details, employee details, resignation date, last working date, handover status, final settlement note, signatory details and PDF download. Useful for HR teams, small businesses, consultants and employers."
      chips={["No Login Required", "PDF Download", "HR Document", "India-Focused"]}
      faqs={[
        {
          q: "Is this relieving letter generator free?",
          a: "Yes, this tool is free to use without login.",
        },
        {
          q: "Can I download the relieving letter as PDF?",
          a: "Yes, you can download the generated relieving letter as a PDF.",
        },
        {
          q: "What details are included in a relieving letter?",
          a: "A relieving letter usually includes employee details, designation, employment period, resignation/exit details, last working date, handover status and signatory details.",
        },
        {
          q: "Is relieving letter the same as experience letter?",
          a: "No. A relieving letter generally confirms that the employee has been relieved from service, while an experience letter generally confirms the employment period, designation and work experience.",
        },
        {
          q: "Can this be used as a final HR document?",
          a: "This tool provides a general format. Employers should review and customize the letter based on company policy, exit formalities and facts before official issue.",
        },
      ]}
    >
      <RelievingLetterGeneratorClient />
    </ToolPageShell>
  );
}
