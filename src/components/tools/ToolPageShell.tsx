import React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface ToolFaq {
  q: string;
  a: string;
}

interface ToolPageShellProps {
  badge: string;
  title: string;
  intro: string;
  chips?: string[];
  faqs?: ToolFaq[];
  children: React.ReactNode;
}

export default function ToolPageShell({
  badge,
  title,
  intro,
  chips = [],
  faqs = [],
  children,
}: ToolPageShellProps) {
  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 pt-12 pb-8 text-center">
          <span className="inline-block bg-secondary/15 text-primary text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-4">
            {badge}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {title}
          </h1>
          <p className="text-gray-700 max-w-3xl mx-auto md:text-lg">{intro}</p>
          {chips.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="bg-white border border-primary/20 text-primary text-xs font-medium px-3 py-1 rounded-full"
                >
                  {chip}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tool */}
      <section className="container mx-auto px-4 pb-12">{children}</section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-12">
        <div className="text-center bg-gradient-to-r from-primary to-blue-600 text-white p-8 md:p-12 rounded-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Need Expert Business Support?
          </h2>
          <p className="md:text-lg mb-6 opacity-90 max-w-3xl mx-auto">
            Registration Seva helps with company registration, GST, trademark,
            compliance and more. Talk to our experts for end-to-end support.
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
      </section>

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="container mx-auto px-4 pb-12 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6">
            FAQs
          </h2>
          <Accordion type="single" collapsible className="bg-white rounded-xl border px-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-8 bg-secondary/10 border border-secondary/40 rounded-lg p-4 text-sm text-gray-700">
            <strong className="text-primary">Important Note:</strong> Documents
            and calculations generated through this free tool should be
            reviewed and verified before official use.
          </div>
        </section>
      )}
    </div>
  );
}
