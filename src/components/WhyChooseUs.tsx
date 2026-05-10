import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, Users, Target, Rocket } from "lucide-react";

function WhyChooseUs() {
  return (
    <div className="container mx-auto my-16 px-4">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Why Choose Registration Seva?
        </h1>
        <p className="text-gray-600 text-base max-w-2xl mx-auto">
          Discover what sets us apart in delivering exceptional business
          solutions
        </p>
      </div>

      {/* Accordion */}
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-3">
          {dataArray.map(({ title, description, icon: Icon }, index) => (
            <AccordionItem
              value={`item-${index + 1}`}
              key={index}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline group [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-3 text-left w-full">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-base font-semibold text-gray-900">
                    {title}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 pt-1">
                <div className="ml-13 text-gray-600 text-sm leading-relaxed">
                  {description}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default WhyChooseUs;

const dataArray = [
  {
    title: "Comprehensive Solutions",
    description:
      "All your business needs covered under one roof. From registration to compliance, we provide end-to-end services that streamline your business operations.",
    icon: CheckCircle2,
  },
  {
    title: "Expert Team",
    description:
      "Professionals with deep industry knowledge and years of experience. Our dedicated experts stay updated with the latest regulations to provide accurate guidance.",
    icon: Users,
  },
  {
    title: "Client-Centric Approach",
    description:
      "Personalized services tailored to your specific needs. We understand that every business is unique and craft customized solutions aligned with your goals.",
    icon: Target,
  },
  {
    title: "Start Your Journey with Us",
    description:
      "Explore our services and find out how we can support your business growth. Join thousands of satisfied clients who have transformed their operations.",
    icon: Rocket,
  },
];
