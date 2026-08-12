import React from "react";
import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ReceiptGeneratorClient from "./ReceiptGeneratorClient";

export const metadata: Metadata = {
  title: "Free Receipt Generator Online - Registration SEVA",
  description:
    "Create professional payment receipts online with receipt number, payer details, amount received, payment mode, invoice reference, notes and PDF download.",
  alternates: {
    canonical: "https://www.registrationseva.com/tools/receipt-generator",
  },
  openGraph: {
    title: "Free Receipt Generator Online - Registration SEVA",
    description:
      "Generate professional payment receipts online with payer details, payment mode, amount received and PDF download.",
    type: "website",
    url: "https://www.registrationseva.com/tools/receipt-generator",
  },
};

export default function ReceiptGeneratorPage() {
  return (
    <ToolPageShell
      badge="Business Tool"
      title="Free Receipt Generator Online"
      intro="Create a professional payment receipt with business details, payer details, receipt number, amount received, payment mode, invoice reference, notes and PDF download. Useful for small businesses, freelancers, consultants, service providers, shops and agencies."
      chips={["No Login Required", "Payment Receipt", "Invoice Reference", "PDF Download"]}
      faqs={[
        {
          q: "Is this receipt generator free?",
          a: "Yes, this tool is free to use without login.",
        },
        {
          q: "Can I download receipt as PDF?",
          a: "Yes, after entering details you can download a professional receipt PDF.",
        },
        {
          q: "Can I mention invoice number in receipt?",
          a: "Yes, you can enter invoice or bill reference while generating the receipt.",
        },
        {
          q: "Can I create advance payment receipt?",
          a: "Yes, select Advance Receipt and enter payment purpose and amount received.",
        },
        {
          q: "Is this a GST invoice?",
          a: "No, this tool creates a receipt for payment acknowledgement. Use the Invoice Generator for GST or non-GST invoices.",
        },
      ]}
    >
      <ReceiptGeneratorClient />
    </ToolPageShell>
  );
}
