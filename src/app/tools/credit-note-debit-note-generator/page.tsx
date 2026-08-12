import React from "react";
import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import CreditNoteDebitNoteGeneratorClient from "./CreditNoteDebitNoteGeneratorClient";

export const metadata: Metadata = {
  title: "Free Credit Note / Debit Note Generator Online - Registration SEVA",
  description:
    "Create professional credit notes and debit notes online with original invoice reference, reason, item-wise GST adjustment, total value and PDF download.",
  alternates: {
    canonical:
      "https://www.registrationseva.com/tools/credit-note-debit-note-generator",
  },
  openGraph: {
    title: "Free Credit Note / Debit Note Generator Online - Registration SEVA",
    description:
      "Create credit notes and debit notes with GST adjustment, invoice reference and PDF download.",
    type: "website",
    url: "https://www.registrationseva.com/tools/credit-note-debit-note-generator",
  },
};

export default function CreditNoteDebitNoteGeneratorPage() {
  return (
    <ToolPageShell
      badge="Business Tool"
      title="Free Credit Note / Debit Note Generator Online"
      intro="Create professional credit notes and debit notes with original invoice reference, reason for adjustment, item-wise value, GST breakup and PDF download."
      chips={["PDF Download", "GST Adjustment", "Invoice Reference", "No Login Required"]}
    >
      <CreditNoteDebitNoteGeneratorClient />
    </ToolPageShell>
  );
}
