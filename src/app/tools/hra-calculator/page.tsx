import React from "react";
import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import HraCalculatorClient from "./HraCalculatorClient";

export const metadata: Metadata = {
  title:
    "Free HRA Calculator Online | House Rent Allowance Exemption - Registration SEVA",
  description:
    "Calculate HRA exemption, taxable HRA, rent paid minus 10% salary and metro/non-metro exemption using Registration Seva's free HRA Calculator.",
  alternates: {
    canonical: "https://www.registrationseva.com/tools/hra-calculator",
  },
  openGraph: {
    title:
      "Free HRA Calculator Online | House Rent Allowance Exemption - Registration SEVA",
    description:
      "Calculate House Rent Allowance exemption, taxable HRA and PDF summary using metro/non-metro rules.",
    type: "website",
    url: "https://www.registrationseva.com/tools/hra-calculator",
  },
};

export default function HraCalculatorPage() {
  return (
    <ToolPageShell
      badge="Tax & Salary Tool"
      title="Free HRA Calculator Online"
      intro="Calculate House Rent Allowance exemption, taxable HRA and rent paid minus 10% salary using metro/non-metro rules with a professional PDF summary."
      chips={["No Login Required", "PDF Download", "Metro / Non-Metro", "Salary Tax Tool"]}
      faqs={[
        {
          q: "How is HRA exemption calculated?",
          a: "HRA exemption is the least of three amounts: actual HRA received, rent paid minus 10% of salary, and 50% of salary for metro cities or 40% for non-metro cities.",
        },
        {
          q: "Which cities count as metro for HRA?",
          a: "Delhi, Mumbai, Kolkata and Chennai are treated as metro cities with the 50% salary limit. All other cities use the 40% limit.",
        },
        {
          q: "What if I do not pay rent?",
          a: "HRA exemption is available only when rent is actually paid for rented accommodation. If no rent is paid, the entire HRA received is taxable.",
        },
        {
          q: "Is landlord PAN required?",
          a: "If annual rent exceeds INR 1,00,000, landlord PAN reporting/documentation may be required as per tax guidance. Verify with current rules.",
        },
      ]}
    >
      <HraCalculatorClient />
    </ToolPageShell>
  );
}
