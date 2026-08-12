import React from "react";
import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import AppointmentLetterGeneratorClient from "./AppointmentLetterGeneratorClient";

export const metadata: Metadata = {
  title: "Free Appointment Letter Generator Online - Registration SEVA",
  description:
    "Create a professional appointment letter online with employee details, designation, joining date, salary, probation, notice period, working hours, terms and PDF download.",
  alternates: {
    canonical:
      "https://www.registrationseva.com/tools/appointment-letter-generator",
  },
  openGraph: {
    title: "Free Appointment Letter Generator Online - Registration SEVA",
    description:
      "Create professional employee appointment letters online with PDF download.",
    type: "website",
    url: "https://www.registrationseva.com/tools/appointment-letter-generator",
  },
};

export default function AppointmentLetterGeneratorPage() {
  return (
    <ToolPageShell
      badge="HR & Payroll Tool"
      title="Free Appointment Letter Generator Online"
      intro="Create a professional employee appointment letter with company details, employee details, designation, joining date, salary/CTC, probation, notice period, working hours, policies, confidentiality clause, acceptance section and PDF download."
      chips={["No Login Required", "PDF Download", "HR Document", "India-Focused"]}
      faqs={[
        {
          q: "Is this appointment letter generator free?",
          a: "Yes, this tool is free to use without login.",
        },
        {
          q: "Can I download the appointment letter as PDF?",
          a: "Yes, you can download the generated appointment letter as a PDF.",
        },
        {
          q: "Is an appointment letter different from an offer letter?",
          a: "Yes. An offer letter usually communicates the job offer, while an appointment letter usually confirms employment terms in more detail.",
        },
        {
          q: "Can I use this for official HR documentation?",
          a: "You should review and customize the generated appointment letter based on company policy, applicable law and specific facts before official use.",
        },
      ]}
    >
      <AppointmentLetterGeneratorClient />
    </ToolPageShell>
  );
}
