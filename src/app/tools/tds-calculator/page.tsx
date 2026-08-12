import React from "react";
import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import TdsCalculatorClient from "./TdsCalculatorClient";

export const metadata: Metadata = {
  title:
    "Free TDS Calculator Online | Calculate TDS and Net Payable - Registration SEVA",
  description:
    "Calculate TDS deduction and net payable amount online for contractor payments, professional fees, rent, commission, interest, purchase of goods and custom TDS rates.",
  alternates: {
    canonical: "https://www.registrationseva.com/tools/tds-calculator",
  },
  openGraph: {
    title:
      "Free TDS Calculator Online | Calculate TDS and Net Payable - Registration SEVA",
    description:
      "Calculate TDS amount, net payable and gross amount using common TDS rate presets or custom rates.",
    type: "website",
    url: "https://www.registrationseva.com/tools/tds-calculator",
  },
};

export default function TdsCalculatorPage() {
  return (
    <ToolPageShell
      badge="Tax & Compliance Tool"
      title="Free TDS Calculator Online"
      intro="Calculate TDS deduction, net payable amount and reverse gross-up amount using common TDS rate presets or your own custom rate. Useful for contractor payments, professional fees, rent, commission, interest and business payment planning."
      chips={["TDS Amount", "Net Payable", "Reverse Calculation", "PDF Download"]}
      faqs={[
        {
          q: "Is this TDS calculator free?",
          a: "Yes, this calculator is free to use without login.",
        },
        {
          q: "Does this calculator check TDS threshold automatically?",
          a: "No. It calculates TDS based on the amount and rate selected. You should verify threshold, section and applicability separately.",
        },
        {
          q: "What happens if PAN is not available?",
          a: "The calculator applies a general higher 20% rate when PAN is marked unavailable. Actual treatment should be verified based on applicable law and facts.",
        },
        {
          q: "Can I use a custom TDS rate?",
          a: "Yes, select Custom Rate and enter the percentage manually.",
        },
        {
          q: "Can this be used for official TDS filing?",
          a: "This tool is for general estimation only. Official TDS deduction and filing should be verified with current law, thresholds, PAN status, deductee type and professional advice.",
        },
      ]}
    >
      <TdsCalculatorClient />
    </ToolPageShell>
  );
}
