import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration Seva - Your Trusted Business Consultancy Partner",
  description:
    "Expert business consultancy services including company incorporation, trademark registration, compliance guidance, and legal advice. We support you through every phase of your business registration and growth journey.",
  keywords: [
    "business consultancy",
    "company incorporation",
    "trademark registration",
    "business registration",
    "compliance guidance",
    "legal advice",
    "business setup",
    "registration services",
    "company formation",
    "business compliance",
  ],
  authors: [{ name: "Registration Seva" }],
  creator: "Registration Seva",
  publisher: "Registration Seva",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://registrationseva.com",
    siteName: "Registration Seva",
    title: "Registration Seva - Your Trusted Business Consultancy Partner",
    description:
      "Expert business consultancy services including company incorporation, trademark registration, compliance guidance, and legal advice. We support you through every phase of your business registration and growth journey.",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Registration Seva - Business Consultancy Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Registration Seva - Your Trusted Business Consultancy Partner",
    description:
      "Expert business consultancy services including company incorporation, trademark registration, compliance guidance, and legal advice.",
    images: ["/logo.jpg"],
    creator: "@registrationseva",
  },
  alternates: {
    canonical: "https://registrationseva.com",
  },
  category: "Business Services",
  classification: "Business Consultancy",
};

function Home() {
  return (
    <div>
      <HeroSection />
      <WhyChooseUs />
    </div>
  );
}

export default Home;
