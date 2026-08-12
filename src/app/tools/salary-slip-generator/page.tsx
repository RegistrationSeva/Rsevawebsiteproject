import React from "react";
import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import SalarySlipGeneratorClient from "./SalarySlipGeneratorClient";

export const metadata: Metadata = {
  title: "Free Salary Slip Generator Online - Registration SEVA",
  description:
    "Create professional salary slips online for free. Enter employee details, salary, paid days, earnings and deductions to generate salary slip PDF instantly.",
  alternates: {
    canonical: "https://www.registrationseva.com/tools/salary-slip-generator",
  },
  openGraph: {
    title: "Free Salary Slip Generator Online - Registration SEVA",
    description:
      "Create professional salary slips online for free with employee details, salary breakup, deductions, net salary and PDF download.",
    type: "website",
    url: "https://www.registrationseva.com/tools/salary-slip-generator",
  },
};

export default function SalarySlipGeneratorPage() {
  return (
    <ToolPageShell
      badge="HR & Payroll Tool"
      title="Free Salary Slip Generator Online"
      intro="Create professional salary slips online for employees with salary breakup, paid days, deductions, net salary and PDF download. Useful for small businesses, HR teams, payroll consultants and employers."
      chips={["No Login", "Single & Bulk Slips", "PDF Download", "CSV Upload"]}
      faqs={[
        {
          q: "Is this salary slip generator free?",
          a: "Yes, the basic salary slip generator is free to use without login.",
        },
        {
          q: "Can I generate bulk salary slips?",
          a: "Yes, download the CSV template, fill employee data, upload it and generate a salary slip PDF for every employee.",
        },
        {
          q: "Is my data stored?",
          a: "No, everything runs in your browser. Your salary data is never uploaded to our servers.",
        },
      ]}
    >
      <SalarySlipGeneratorClient />
    </ToolPageShell>
  );
}
