import React from "react";
import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import NewJoinerSalaryCalculatorClient from "./NewJoinerSalaryCalculatorClient";

export const metadata: Metadata = {
  title:
    "New Joiner Salary Calculator | First Month Salary Calculator - Registration SEVA",
  description:
    "Calculate new employee joining month salary online with fixed salary, joining date pro-rata, manual payable days, custom allowances, PF, ESIC, TDS, deductions, employer cost and PDF download.",
  alternates: {
    canonical:
      "https://www.registrationseva.com/tools/new-joiner-salary-calculator",
  },
  openGraph: {
    title: "New Joiner Salary Calculator - Registration SEVA",
    description:
      "Calculate first-month salary for new employees with custom allowances, optional pro-rata calculation, PF, ESIC, deductions, net payable and PDF download.",
    type: "website",
    url: "https://www.registrationseva.com/tools/new-joiner-salary-calculator",
  },
};

export default function NewJoinerSalaryCalculatorPage() {
  return (
    <ToolPageShell
      badge="HR & Payroll Tool"
      title="New Joiner Salary Calculator"
      intro="Calculate salary for a newly joined employee using fixed monthly salary, joining-date pro-rata or manual payable days. Add custom allowances, PF, ESIC, TDS and deductions, then download a clean PDF summary."
      chips={["Joining Month Salary", "Custom Allowances", "PF / ESIC", "PDF Download"]}
      faqs={[
        {
          q: "What is a New Joiner Salary Calculator?",
          a: "It helps estimate salary payable for a newly joined employee using full monthly salary, joining-date pro-rata or manual payable days, along with allowances and deductions.",
        },
        {
          q: "How is joining month salary calculated?",
          a: "You can calculate it as full monthly salary, joining-date pro-rata salary, or manual payable days. The tool then applies PF, ESIC, TDS and other deductions based on your inputs.",
        },
        {
          q: "Does this tool calculate PF and ESIC?",
          a: "Yes, it can estimate employee and employer PF and ESIC contributions based on user inputs and common default rates. Final applicability should be verified.",
        },
        {
          q: "Can I use this for official payroll?",
          a: "This tool is for general estimation. Official payroll should be checked with appointment terms, salary structure, company policy and applicable statutory requirements.",
        },
        {
          q: "Can I add custom allowances?",
          a: "Yes, you can add custom allowance names and amounts such as mobile allowance, food allowance, incentive allowance or any company-specific salary component.",
        },
        {
          q: "Does this calculator use DA?",
          a: "No separate DA field is used in this tool because DA is generally not used in many private company salary structures. PF wage is calculated on Basic Salary by default, with a manual PF wage option also available.",
        },
        {
          q: "Can I download a PDF summary?",
          a: "Yes, you can download a clean PDF summary of the salary calculation.",
        },
      ]}
    >
      <NewJoinerSalaryCalculatorClient />
    </ToolPageShell>
  );
}
