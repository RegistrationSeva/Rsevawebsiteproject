import React from "react";
import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import PfEsicCalculatorClient from "./PfEsicCalculatorClient";

export const metadata: Metadata = {
  title: "Free PF and ESIC Calculator Online - Registration SEVA",
  description:
    "Calculate employee and employer PF/ESIC contribution online, including employee deduction, employer contribution, EPS split and payroll cost summary.",
  alternates: {
    canonical: "https://www.registrationseva.com/tools/pf-esic-calculator",
  },
  openGraph: {
    title: "Free PF and ESIC Calculator Online - Registration SEVA",
    description:
      "Calculate PF, EPS, ESIC employee deduction and employer contribution online for free.",
    type: "website",
    url: "https://www.registrationseva.com/tools/pf-esic-calculator",
  },
};

export default function PfEsicCalculatorPage() {
  return (
    <ToolPageShell
      badge="HR & Payroll Tool"
      title="Free PF and ESIC Calculator Online"
      intro="Calculate employee PF, employer PF, EPS split, ESIC deduction, employer ESIC and total payroll contribution summary. Useful for salary slips, payroll sheets and HR compliance planning."
      chips={["Employee Deduction", "Employer Cost", "EPS Split", "PDF Download"]}
      faqs={[
        {
          q: "Is this PF and ESIC calculator free?",
          a: "Yes, this calculator is free to use without login.",
        },
        {
          q: "What PF rate does this calculator use?",
          a: "It uses the common 12% employee contribution and 12% employer contribution structure for PF calculation.",
        },
        {
          q: "What ESIC rates does this calculator use?",
          a: "It uses 0.75% employee contribution and 3.25% employer contribution for ESIC calculation.",
        },
        {
          q: "Can employer PF be included in CTC?",
          a: "Employer contribution may be included in CTC depending on company policy, but it is not deducted from employee net salary as employee deduction.",
        },
        {
          q: "Can I create salary slips after calculation?",
          a: "Yes, you can use Registration Seva's Salary Slip Generator to create salary slip PDFs.",
        },
      ]}
    >
      <PfEsicCalculatorClient />
    </ToolPageShell>
  );
}
