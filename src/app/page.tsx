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
    locale: "en_IN",
    url: "https://www.registrationseva.com",
    siteName: "Registration Seva",
    title: "Registration Seva - Your Trusted Business Consultancy Partner",
    description:
      "Expert business consultancy services including company incorporation, trademark registration, compliance guidance, and legal advice. We support you through every phase of your business registration and growth journey.",
    images: [
      {
        url: "/logo.jpg",
        width: 1024,
        height: 321,
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
    canonical: "https://www.registrationseva.com",
  },
  category: "Business Services",
  classification: "Business Consultancy",
};

// JSON-LD structured data — rendered server-side so AI crawlers can parse them
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": "https://www.registrationseva.com/#organization",
  name: "Registration Seva",
  legalName: "Registration Seva",
  url: "https://www.registrationseva.com",
  logo: {
    "@type": "ImageObject",
    url: "https://www.registrationseva.com/logo.jpg",
    width: 1024,
    height: 321,
  },
  image: "https://www.registrationseva.com/logo.jpg",
  description:
    "Registration Seva is a leading business consultancy firm in India providing company registration, trademark, GST, MSME, and compliance services since 2016.",
  foundingDate: "2016-10-06",
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "East Delhi",
    addressRegion: "Delhi",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
      areaServed: "IN",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/registration-seva",
  ],
  serviceArea: {
    "@type": "Country",
    name: "India",
  },
  knowsAbout: [
    "Company Registration",
    "Trademark Registration",
    "GST Registration",
    "MSME Registration",
    "Business Compliance",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.registrationseva.com/#website",
  url: "https://www.registrationseva.com",
  name: "Registration Seva",
  description:
    "Expert business registration and compliance services across India.",
  publisher: {
    "@id": "https://www.registrationseva.com/#organization",
  },
  inLanguage: "en-IN",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does company registration take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Private Limited Companies typically take 7-15 days, while LLPs may take 10-20 days. We ensure the fastest possible processing by preparing accurate documentation.",
      },
    },
    {
      "@type": "Question",
      name: "What documents are required for company registration?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Required documents include identity proof, address proof, and photographs of directors, along with business address proof and PAN cards. We provide a comprehensive checklist tailored to your specific situation.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide ongoing compliance support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we offer comprehensive compliance support including annual filings, GST returns, tax compliance, and regulatory updates to ensure your business remains compliant.",
      },
    },
    {
      "@type": "Question",
      name: "Can you help with trademark registration?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely! We provide complete trademark registration services including trademark search, application filing, and registration process management across India.",
      },
    },
    {
      "@type": "Question",
      name: "What makes Registration Seva different?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our combination of legal expertise, industry knowledge, and customer-centric approach sets us apart. We provide personalized service, transparent pricing, and comprehensive support throughout your business journey.",
      },
    },
  ],
};

function Home() {
  return (
    <div>
      {/* JSON-LD structured data — native <script> tags, NOT next/script, so AI crawlers see them */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HeroSection />
      <WhyChooseUs />

      {/* Comprehensive Business Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Comprehensive Business Registration Services
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              At Registration Seva, we provide end-to-end business registration
              and compliance solutions that help entrepreneurs and established
              businesses navigate India&apos;s complex regulatory landscape with
              confidence and ease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Company Incorporation
              </h3>
              <p className="text-gray-700 mb-4">
                Our expert team handles all aspects of company formation, from
                Private Limited Companies to LLPs and Proprietorships. We ensure
                proper documentation, regulatory compliance, and seamless
                registration processes.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Private Limited Company Registration</li>
                <li>• Limited Liability Partnership (LLP)</li>
                <li>• One Person Company (OPC)</li>
                <li>• Partnership Firm Registration</li>
                <li>• Sole Proprietorship Setup</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Trademark & IP Protection
              </h3>
              <p className="text-gray-700 mb-4">
                Protect your brand identity with our comprehensive trademark
                registration services. We conduct thorough searches, handle
                applications, and manage the entire registration process
                efficiently.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Trademark Search & Registration</li>
                <li>• Copyright Protection</li>
                <li>• Patent Filing Assistance</li>
                <li>• Design Registration</li>
                <li>• IP Portfolio Management</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Tax & Compliance
              </h3>
              <p className="text-gray-700 mb-4">
                Stay compliant with India&apos;s tax regulations through our
                comprehensive GST, income tax, and other compliance services. We
                ensure your business meets all regulatory requirements.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• GST Registration & Returns</li>
                <li>• Income Tax Compliance</li>
                <li>• TDS Filing & Management</li>
                <li>• Professional Tax Registration</li>
                <li>• Tax Planning & Advisory</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Business Licenses
              </h3>
              <p className="text-gray-700 mb-4">
                Obtain all necessary business licenses and permits for your
                industry. Our team understands sector-specific requirements and
                ensures timely approvals.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Shop & Establishment License</li>
                <li>• Import Export Code (IEC)</li>
                <li>• FSSAI License</li>
                <li>• MSME Registration</li>
                <li>• Industry-Specific Licenses</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Financial Services
              </h3>
              <p className="text-gray-700 mb-4">
                Access comprehensive financial services including accounting,
                bookkeeping, and financial planning to support your business
                growth and compliance needs.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Accounting & Bookkeeping</li>
                <li>• Financial Planning</li>
                <li>• Audit Support</li>
                <li>• Payroll Management</li>
                <li>• Financial Reporting</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Legal Advisory
              </h3>
              <p className="text-gray-700 mb-4">
                Get expert legal guidance for your business operations,
                contracts, and regulatory matters. Our experienced legal team
                provides strategic advice tailored to your needs.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Contract Drafting & Review</li>
                <li>• Legal Compliance Advisory</li>
                <li>• Dispute Resolution</li>
                <li>• Corporate Governance</li>
                <li>• Regulatory Updates</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Expertise Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Industry Expertise & Specializations
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Our team of certified professionals brings deep industry knowledge
              and regulatory expertise across various sectors, ensuring tailored
              solutions for your specific business requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-3xl font-semibold text-primary mb-6">
                Technology & IT Services
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Specialized support for technology startups and IT companies,
                including software development firms, digital agencies, and tech
                consultancies. We understand the unique compliance requirements
                for technology businesses, including data protection
                regulations, software licensing, and intellectual property
                protection.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-primary mb-3">
                  Key Services:
                </h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Software Company Registration</li>
                  <li>• Data Protection Compliance</li>
                  <li>• Software Licensing Agreements</li>
                  <li>• Technology Transfer Documentation</li>
                  <li>• IT Service Tax Compliance</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-semibold text-primary mb-6">
                Manufacturing & Trading
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Comprehensive support for manufacturing units, trading
                companies, and import-export businesses. Our expertise covers
                industrial licensing, quality certifications, environmental
                clearances, and international trade compliance.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-primary mb-3">
                  Key Services:
                </h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Manufacturing License Registration</li>
                  <li>• Import Export Code (IEC)</li>
                  <li>• Quality Certification Support</li>
                  <li>• Environmental Clearances</li>
                  <li>• Trade Compliance Management</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-semibold text-primary mb-6">
                Healthcare & Pharmaceuticals
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Specialized regulatory support for healthcare providers,
                pharmaceutical companies, and medical device manufacturers. We
                handle complex compliance requirements including drug licensing,
                clinical trial approvals, and healthcare facility registrations.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-primary mb-3">
                  Key Services:
                </h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Drug License Registration</li>
                  <li>• Clinical Trial Approvals</li>
                  <li>• Medical Device Registration</li>
                  <li>• Healthcare Facility Licensing</li>
                  <li>• Pharmaceutical Compliance</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-semibold text-primary mb-6">
                Food & Beverage
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Complete support for food manufacturers, restaurants, and
                beverage companies. Our services cover FSSAI licensing, food
                safety compliance, labeling requirements, and quality assurance
                standards.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-primary mb-3">
                  Key Services:
                </h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• FSSAI License Registration</li>
                  <li>• Food Safety Compliance</li>
                  <li>• Quality Control Documentation</li>
                  <li>• Labeling & Packaging Compliance</li>
                  <li>• Export Certification Support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process & Methodology Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-blue-800 text-white">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Proven Process & Methodology
            </h2>
            <p className="text-xl max-w-4xl mx-auto leading-relaxed opacity-90">
              We follow a systematic approach to ensure efficient, accurate, and
              timely completion of all registration and compliance processes.
              Our methodology is designed to minimize delays and maximize
              success rates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Initial Consultation
              </h3>
              <p className="text-white/90 leading-relaxed">
                We begin with a comprehensive consultation to understand your
                business requirements, objectives, and specific needs. This
                helps us tailor our services to your unique situation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Document Preparation
              </h3>
              <p className="text-white/90 leading-relaxed">
                Our experts prepare all necessary documentation, ensuring
                accuracy and completeness. We handle complex legal documents,
                forms, and supporting materials required for registration.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Application Submission
              </h3>
              <p className="text-white/90 leading-relaxed">
                We submit applications to relevant authorities and track
                progress throughout the approval process. Our team maintains
                regular communication with regulatory bodies.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Follow-up & Support
              </h3>
              <p className="text-white/90 leading-relaxed">
                We provide ongoing support, handle queries, and ensure
                successful completion. Our relationship continues beyond
                registration with compliance and advisory services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories & Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Success Stories & Client Testimonials
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Over the years, we have successfully helped thousands of
              businesses across India achieve their registration and compliance
              goals. Here are some of our success stories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-primary mb-2">
                  TechStart Solutions
                </h3>
                <p className="text-gray-600 text-sm">
                  Software Development Company
                </p>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                &quot;Registration Seva helped us incorporate our software
                company and obtain all necessary licenses within 15 days. Their
                expertise in technology sector compliance saved us months of
                research and paperwork.&quot;
              </p>
              <div className="text-primary font-semibold">
                - Rajesh Kumar, Founder
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-primary mb-2">
                  GreenEarth Manufacturing
                </h3>
                <p className="text-gray-600 text-sm">
                  Eco-friendly Products Manufacturer
                </p>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                &quot;The team at Registration Seva handled our complex
                manufacturing license applications and environmental clearances
                efficiently. Their knowledge of regulatory requirements is
                exceptional.&quot;
              </p>
              <div className="text-primary font-semibold">
                - Priya Sharma, Director
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-primary mb-2">
                  FoodCorp India
                </h3>
                <p className="text-gray-600 text-sm">Food Processing Company</p>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                &quot;From FSSAI licensing to export certifications,
                Registration Seva provided comprehensive support. Their
                attention to detail and timely delivery exceeded our
                expectations.&quot;
              </p>
              <div className="text-primary font-semibold">
                - Amit Patel, CEO
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-primary mb-6">
                Our Track Record
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    1000+
                  </div>
                  <div className="text-gray-700">Companies Registered</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    50+
                  </div>
                  <div className="text-gray-700">Cities Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    99%
                  </div>
                  <div className="text-gray-700">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    24/7
                  </div>
                  <div className="text-gray-700">Customer Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Find answers to common questions about business registration,
              compliance, and our services. If you have additional questions,
              feel free to contact us.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-primary mb-4">
                How long does company registration take?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                The timeline for company registration varies depending on the
                type of company and completeness of documentation. Private
                Limited Companies typically take 7-15 days, while LLPs may take
                10-20 days. We ensure the fastest possible processing by
                preparing accurate documentation and maintaining good
                relationships with regulatory authorities.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-primary mb-4">
                What documents are required for company registration?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Required documents include identity proof, address proof, and
                photographs of directors, along with business address proof and
                PAN cards. For foreign nationals, additional documents like
                passport copies and address proof from home country are
                required. We provide a comprehensive checklist tailored to your
                specific situation.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Do you provide ongoing compliance support?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Yes, we offer comprehensive compliance support including annual
                filings, GST returns, tax compliance, and regulatory updates.
                Our ongoing services ensure your business remains compliant with
                changing regulations and avoids penalties.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Can you help with trademark registration?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Absolutely! We provide complete trademark registration services
                including trademark search, application filing, and registration
                process management. Our experts ensure your brand is protected
                and guide you through any objections or oppositions.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-primary mb-4">
                What makes Registration Seva different?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our combination of legal expertise, industry knowledge, and
                customer-centric approach sets us apart. We provide personalized
                service, transparent pricing, and comprehensive support
                throughout your business journey. Our team stays updated with
                regulatory changes and provides proactive guidance to keep your
                business compliant.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
