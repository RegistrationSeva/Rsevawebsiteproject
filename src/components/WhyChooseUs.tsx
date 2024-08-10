import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function WhyChooseUs() {
  return (
    <div className="container my-10 flex flex-col gap-6">
      <h1 className="text-xl md:text-4xl font-bold text-center text-primary">
        Why Choose Registration Seva?
      </h1>
      <div>
        <Accordion type="single" collapsible className="w-full">
          {dataArray.map(({ title, description }, index) => (
            <AccordionItem value={`item-${index + 1}`} key={index}>
              <AccordionTrigger>{title}</AccordionTrigger>
              <AccordionContent>{description}</AccordionContent>
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
    description: "All your business needs covered under one roof.",
  },
  {
    title: "Expert Team",
    description: "Professionals with deep industry knowledge.",
  },
  {
    title: "Client-Centric Approach",
    description: "Personalized services tailored to your specific needs.",
  },
  {
    title: "Start Your Journey with Us",
    description:
      "Explore our services and find out how we can support your business.",
  },
];
