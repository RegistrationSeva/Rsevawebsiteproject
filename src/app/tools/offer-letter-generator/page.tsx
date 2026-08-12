import React from "react";
import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import OfferLetterGeneratorClient from "./OfferLetterGeneratorClient";

export const metadata: Metadata = {
  title: "Free Offer Letter Generator Online - Registration SEVA",
  description:
    "Create a professional offer letter online for employees with company details, candidate details, role, salary, joining date, probation, notice period and PDF download.",
  alternates: {
    canonical: "https://www.registrationseva.com/tools/offer-letter-generator",
  },
  openGraph: {
    title: "Free Offer Letter Generator Online - Registration SEVA",
    description:
      "Create professional employee offer letters online with PDF download.",
    type: "website",
    url: "https://www.registrationseva.com/tools/offer-letter-generator",
  },
};

export default function OfferLetterGeneratorPage() {
  return (
    <ToolPageShell
      badge="HR & Payroll Tool"
      title="Free Offer Letter Generator Online"
      intro="Create a professional employee offer letter with company details, candidate details, designation, joining date, salary/CTC, probation period, notice period, terms and PDF download. Useful for startups, small businesses, HR teams and consultants."
      chips={["No Login Required", "PDF Download", "HR Document", "India-Focused"]}
      faqs={[
        {
          q: "Is this offer letter generator free?",
          a: "Yes, this tool is free to use without login.",
        },
        {
          q: "Can I download the offer letter as PDF?",
          a: "Yes, you can download the generated offer letter as a PDF.",
        },
        {
          q: "Is an offer letter the same as an appointment letter?",
          a: "No. An offer letter usually communicates the job offer, while an appointment letter usually contains detailed employment terms.",
        },
        {
          q: "Can I use this for official HR documentation?",
          a: "You should review and customize the generated letter based on company policy, applicable law and specific facts before official use.",
        },
      ]}
    >
      <OfferLetterGeneratorClient />
    </ToolPageShell>
  );
}
