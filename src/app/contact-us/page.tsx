import { Metadata } from "next";
import ContactUsClient from "./ContactUsClient";

export const metadata: Metadata = {
  title: "Contact Us - Registration SEVA",
  description:
    "Get in touch with Registration Seva for business registration, trademark, GST, and compliance support. Contact our experts today for quick assistance and consultation across India.",
  keywords:
    "contact registration seva, registration seva support, business registration help, trademark assistance, GST support, compliance consultancy india",
  openGraph: {
    title: "Contact Us - Registration SEVA",
    description:
      "Reach out to Registration Seva’s expert team for assistance with business registration, trademark services, GST, and compliance solutions across India.",
    type: "website",
  },
};

export default function ContactUs() {
  return <ContactUsClient />;
}
