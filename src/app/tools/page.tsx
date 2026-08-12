import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { tools, toolCategories } from "@/data/toolsData";

export const metadata: Metadata = {
  title: "Free Business Tools - Registration SEVA | Calculators & Generators",
  description:
    "Free online business tools by Registration Seva: GST calculator, invoice generator, salary slip generator, income tax calculator, offer letter generator, NDA generator and more. No login required.",
  keywords:
    "free business tools, gst calculator, invoice generator, salary slip generator, income tax calculator, tds calculator, hra calculator, offer letter generator, nda generator, rent agreement generator, pdf compressor",
  alternates: {
    canonical: "https://www.registrationseva.com/tools",
  },
  openGraph: {
    title: "Free Business Tools - Registration SEVA",
    description:
      "Free online calculators and document generators for Indian businesses: GST, invoices, salary slips, HR letters, legal drafts and more.",
    type: "website",
    url: "https://www.registrationseva.com/tools",
  },
};

const ToolsPage = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Free Business Tools
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Free online calculators and document generators for Indian
            businesses — GST, invoicing, payroll, HR letters, tax and legal
            drafts. No login required, instant PDF download.
          </p>
        </div>

        {/* Tools grouped by category */}
        {toolCategories.map((category) => (
          <div key={category} className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools
                .filter((tool) => tool.category === category)
                .map((tool) => (
                  <div
                    key={tool.slug}
                    className="bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border flex flex-col"
                  >
                    <div className="p-6 flex flex-1 flex-col justify-between gap-6">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-primary">
                            {tool.name}
                          </h3>
                          {tool.popular && (
                            <span className="shrink-0 bg-secondary/15 text-primary text-xs font-semibold px-2 py-1 rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 text-sm">
                          {tool.description}
                        </p>
                      </div>
                      <div className="text-center">
                        <Link
                          href={`/tools/${tool.slug}`}
                          className="inline-block px-6 py-2 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary/90 transition duration-300 shadow-lg"
                        >
                          Use Tool
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-primary to-blue-600 text-white p-12 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">
            Need More Than Just Tools?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Our experts handle company registration, GST, trademark and
            compliance end to end.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact-us"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Free Consultation
            </Link>
            <Link
              href="/our-services"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;
