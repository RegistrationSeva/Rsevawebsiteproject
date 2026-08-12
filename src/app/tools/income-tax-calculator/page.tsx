import React from "react";
import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import IncomeTaxCalculatorClient from "./IncomeTaxCalculatorClient";

export const metadata: Metadata = {
  title:
    "Income Tax Calculator AY 2026-27 | Old vs New Regime Comparison - Registration SEVA",
  description:
    "Free Income Tax Calculator for India. Compare old vs new tax regime for AY 2026-27 with standard deduction, deductions, rebate, cess and estimated tax payable.",
  alternates: {
    canonical: "https://www.registrationseva.com/tools/income-tax-calculator",
  },
  openGraph: {
    title: "Income Tax Calculator AY 2026-27 | Old vs New Regime Comparison",
    description:
      "Compare old and new income tax regime for India with deductions, rebate and cess.",
    type: "website",
    url: "https://www.registrationseva.com/tools/income-tax-calculator",
  },
};

export default function IncomeTaxCalculatorPage() {
  return (
    <ToolPageShell
      badge="Free Tax Tool for India"
      title="Income Tax Calculator with Old vs New Regime Comparison"
      intro="Estimate income tax payable for AY 2026-27 and instantly compare the old tax regime with the new tax regime using salary, deductions, rebate and cess."
      chips={["AY 2026-27", "Old vs New", "4% Cess", "87A Rebate"]}
      faqs={[
        {
          q: "Which assessment year does this calculator support?",
          a: "It supports FY 2025-26 / AY 2026-27 slab comparison for resident individual taxpayers.",
        },
        {
          q: "Does the calculator apply standard deduction?",
          a: "Yes. If salary / pension is selected, it applies ₹50,000 under old regime and ₹75,000 under new regime, limited to the entered income.",
        },
        {
          q: "Does the new regime allow all deductions?",
          a: "No. The new regime allows only selected deductions. Use the new regime allowed deduction field only for deductions that are actually permitted for your case.",
        },
        {
          q: "Is this a substitute for tax filing advice?",
          a: "No. This is a quick estimate. For ITR filing, capital gains, business income, surcharge, foreign income or special income, consult a tax professional.",
        },
      ]}
    >
      <IncomeTaxCalculatorClient />
    </ToolPageShell>
  );
}
