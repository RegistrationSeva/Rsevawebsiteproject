import React from "react";
import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import RentAgreementDraftGeneratorClient from "./RentAgreementDraftGeneratorClient";

export const metadata: Metadata = {
  title: "Free Rent Agreement Draft Generator Online - Registration SEVA",
  description:
    "Create a basic rent agreement or leave and license draft online with landlord, tenant, property, rent, deposit, term, notice and PDF download.",
  alternates: {
    canonical:
      "https://www.registrationseva.com/tools/rent-agreement-draft-generator",
  },
  openGraph: {
    title: "Free Rent Agreement Draft Generator Online - Registration SEVA",
    description:
      "Generate a basic rent agreement draft with party details, rent, deposit, term, notice, property details and PDF download.",
    type: "website",
    url: "https://www.registrationseva.com/tools/rent-agreement-draft-generator",
  },
};

export default function RentAgreementDraftGeneratorPage() {
  return (
    <ToolPageShell
      badge="Legal & Document Tool"
      title="Free Rent Agreement Draft Generator"
      intro="Create a basic rent agreement or leave and license draft with landlord, tenant, property, rent, deposit, term, notice, maintenance, utility and signature details."
      chips={["No Login Required", "PDF Download", "Editable Draft", "India-Focused"]}
    >
      <RentAgreementDraftGeneratorClient />
    </ToolPageShell>
  );
}
