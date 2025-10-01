import React from "react";
import Link from "next/link";
import { services } from "./servicesData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services - Registration SEVA",
  description:
    "Discover Registration Seva’s wide range of services including company registration, trademark protection, GST registration, compliance management, and business consultancy across India.",
  keywords:
    "registration seva services, company registration india, trademark services, GST registration, business compliance, startup consultancy, business registration solutions",
  openGraph: {
    title: "Our Services - Registration SEVA",
    description:
      "Explore Registration Seva’s professional services for entrepreneurs and businesses, covering company registration, trademark, GST, and compliance solutions.",
    type: "website",
  },
};

const Services = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          Our Comprehensive Services
        </h1>
        <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
          Registration Seva offers a complete suite of business registration,
          compliance, and legal services designed to support entrepreneurs and
          established businesses across India. Our expert team provides
          end-to-end solutions for all your regulatory and legal requirements.
        </p>
        <div className="bg-gradient-to-r from-primary to-blue-600 text-white p-8 rounded-xl max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">
            Why Choose Our Services?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">1000+</div>
              <div className="text-sm opacity-90">Companies Registered</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">99%</div>
              <div className="text-sm opacity-90">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-90">Customer Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Categories Overview */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">
          Service Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏢</span>
            </div>
            <h3 className="text-xl font-semibold text-primary mb-3">
              Company Formation
            </h3>
            <p className="text-gray-600 text-sm">
              Private Limited, LLP, OPC, Partnership, and Sole Proprietorship
              registration services.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚖️</span>
            </div>
            <h3 className="text-xl font-semibold text-primary mb-3">
              Legal Compliance
            </h3>
            <p className="text-gray-600 text-sm">
              GST registration, tax compliance, annual filings, and regulatory
              adherence.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-semibold text-primary mb-3">
              IP Protection
            </h3>
            <p className="text-gray-600 text-sm">
              Trademark, copyright, patent, and design registration services.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="text-xl font-semibold text-primary mb-3">
              Business Licenses
            </h3>
            <p className="text-gray-600 text-sm">
              Industry-specific licenses, permits, and certifications.
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Services Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">
          Detailed Service Offerings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service, index) => {
            return (
              <div
                key={index}
                className="bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border"
              >
                <div className="p-6 flex flex-1 flex-col justify-between gap-7">
                  <div className="md:h-[222px] overflow-hidden">
                    <h1 className="text-2xl font-semibold mb-1 text-primary">
                      {service?.title}
                    </h1>
                    <p className="text-gray-700 mb-4 text-justify">
                      {service?.description}
                    </p>
                  </div>
                  <div className="text-center flex gap-4 justify-center">
                    <Link
                      href={`/our-services/${service?.slug}`}
                      className="inline-block px-2 py-1 md:px-3 md:py-1 bg-blue-700 text-white rounded-lg font-semibold text-[12px] sm:leading-5 md:text-[17] md:leading-7 hover:bg-blue-500 transition duration-300 ease-in-out transform hover:scale-110 shadow-lg border-2 border-blue-700"
                    >
                      See Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Process Overview */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">
          Our Service Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">1</span>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-3">
              Consultation
            </h3>
            <p className="text-gray-600 text-sm">
              Initial discussion to understand your requirements and business
              objectives.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">2</span>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-3">
              Documentation
            </h3>
            <p className="text-gray-600 text-sm">
              Preparation and verification of all required documents and forms.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">3</span>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-3">
              Submission
            </h3>
            <p className="text-gray-600 text-sm">
              Filing applications with relevant authorities and tracking
              progress.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">4</span>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-3">
              Completion
            </h3>
            <p className="text-gray-600 text-sm">
              Final approval and ongoing support for compliance requirements.
            </p>
          </div>
        </div>
      </div>

      {/* Industry Expertise */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">
          Industry Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-primary mb-3">
              Technology & IT
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Specialized support for software companies, IT services, and
              technology startups.
            </p>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• Software Company Registration</li>
              <li>• Data Protection Compliance</li>
              <li>• Technology Licensing</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-primary mb-3">
              Manufacturing
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Complete support for manufacturing units and industrial
              establishments.
            </p>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• Industrial Licensing</li>
              <li>• Environmental Clearances</li>
              <li>• Quality Certifications</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-primary mb-3">
              Healthcare
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Regulatory support for healthcare providers and pharmaceutical
              companies.
            </p>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• Drug License Registration</li>
              <li>• Medical Device Approval</li>
              <li>• Healthcare Facility Licensing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-primary to-blue-600 text-white p-12 rounded-xl">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl mb-8 opacity-90">
          Contact our experts today for a free consultation and personalized
          service recommendations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact-us"
            className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Free Consultation
          </Link>
          <Link
            href="/about-us"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
