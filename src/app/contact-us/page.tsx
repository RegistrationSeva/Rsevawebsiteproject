import { Metadata } from "next";
import ContactUsClient from "./ContactUsClient";

export const metadata: Metadata = {
  title: "Contact Us - Registration SEVA | Expert Business Registration & Compliance Support",
  description:
    "Get in touch with Registration Seva for expert assistance in business registration, trademark protection, GST compliance, MSME registration, and all regulatory requirements. Our certified professionals provide personalized consultation and support across India. Available Mon-Sat 9:30 AM - 6:30 PM. Call us at +91 123 456 7890 or email info@registrationseva.com for quick response and expert guidance.",
  keywords:
    "contact registration seva, registration seva support, business registration help, trademark assistance, GST support, compliance consultancy india, business registration services, company incorporation support, expert consultation, pan india support, registration seva contact number, registration seva email",
  openGraph: {
    title: "Contact Us - Registration SEVA | Get Expert Business & Compliance Assistance",
    description:
      "Reach out to Registration Seva's team of certified professionals for comprehensive assistance with business registration, trademark services, GST compliance, and all regulatory solutions across India. Quick response guaranteed within 24 hours.",
    type: "website",
  },
};

export default function ContactUs() {
  return <ContactUsClient />;
}
