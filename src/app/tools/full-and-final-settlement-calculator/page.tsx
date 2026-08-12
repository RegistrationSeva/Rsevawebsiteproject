import React from "react";
import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import FullAndFinalSettlementCalculatorClient from "./FullAndFinalSettlementCalculatorClient";

export const metadata: Metadata = {
  title: "Free Full & Final Settlement Calculator - Registration SEVA",
  description:
    "Calculate employee full and final settlement online with earned salary, leave encashment, gratuity estimate, notice pay recovery, additions, deductions and PDF download.",
  alternates: {
    canonical:
      "https://www.registrationseva.com/tools/full-and-final-settlement-calculator",
  },
  openGraph: {
    title: "Free Full & Final Settlement Calculator - Registration SEVA",
    description:
      "Estimate earned salary, leave encashment, gratuity, deductions and net F&F payable with PDF download.",
    type: "website",
    url: "https://www.registrationseva.com/tools/full-and-final-settlement-calculator",
  },
};

export default function FullAndFinalSettlementCalculatorPage() {
  return (
    <ToolPageShell
      badge="HR & Payroll Tool"
      title="Free Full & Final Settlement Calculator"
      intro="Estimate employee full and final settlement with earned salary, leave encashment, gratuity estimate, bonus, reimbursements, notice pay recovery, advances and other deductions. Download a clean PDF summary for internal payroll review."
      chips={["Earned Salary", "Leave Encashment", "Gratuity Estimate", "PDF Download"]}
      faqs={[
        {
          q: "Is this Full & Final Settlement Calculator free?",
          a: "Yes, this calculator is free to use without login.",
        },
        {
          q: "Does this tool calculate gratuity automatically?",
          a: "Yes, it can estimate gratuity using a common formula based on Basic + DA, 15 days wages and years of service. Final gratuity should be verified based on law, policy and facts.",
        },
        {
          q: "Can I use this for official settlement?",
          a: "This tool is for general estimation. Official settlement should be verified with attendance records, HR policy, appointment terms, payroll records and applicable law.",
        },
        {
          q: "Does it include PF or ESIC settlement?",
          a: "This calculator focuses on employer-side F&F payables and deductions. PF/ESIC contributions can be reviewed separately using the PF / ESIC Calculator.",
        },
        {
          q: "Can I download a PDF summary?",
          a: "Yes, you can download a clean PDF summary of the calculated settlement.",
        },
      ]}
    >
      <FullAndFinalSettlementCalculatorClient />
    </ToolPageShell>
  );
}
