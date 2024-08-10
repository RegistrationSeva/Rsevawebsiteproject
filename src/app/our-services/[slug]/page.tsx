"use client";
import React, { useState, useEffect } from "react";
import { services } from "../servicesData";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { FaAngleDown, FaPlus } from "react-icons/fa";

interface Service {
  slug: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string[];
  conclusion: string;
  eligibility: {
    title: string;
    conclusion: string;
    data: {
      title: string;
      description: string;
    }[];
  };
  benefits: {
    title: string;
    conclusion: string;
    data: {
      title: string;
      description: string;
    }[];
  };
  registration_process: {
    title: string;
    conclusion: string;
    data: {
      title: string;
      description: string;
    }[];
  };
  compliances: {
    title: string;
    conclusion: string;
    data: {
      title: string;
      description: string;
    }[];
  };
  faq: {
    title: string;
    conclusion: string;
    data: {
      title: string;
      description: string;
    }[];
  };
  whyUs: {
    title: string;
    description: string;
  };
}

interface ServiceDetailProps {
  params: {
    slug: string;
  };
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ params }) => {
  const [serviceItem, setServiceItem] = useState<Service | null>(null);

  useEffect(() => {
    if (params && services) {
      const item = services.find((service) => service.slug === params.slug);
      setServiceItem(item ?? null);
    }
  }, [params]);

  if (!serviceItem) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-4xl">Not Found..</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <Image
            src={serviceItem.image}
            alt={serviceItem.title}
            className="w-full h-[300px] object-cover transition-transform duration-500 ease-in-out transform rounded-lg"
          />
          <div className="flex flex-col justify-center p-6 md:p-10">
            <h1 className="text-3xl md:text-5xl font-semibold text-gray-800 mb-4">
              {serviceItem.title}
            </h1>
            <h2 className="text-lg md:text-xl font-semibold text-gray-600 mb-2 italic">
              {serviceItem.subtitle}
            </h2>
            <p className="text-md md:text-lg text-gray-700 bg-gray-200 p-4 rounded-lg mt-4 md:mt-7 text-justify">
              {serviceItem.description}
            </p>
            <Link
              href={`/contact-us/${serviceItem.slug}`}
              className="px-7 py-2 bg-blue-700 mt-4 rounded-lg text-xl text-white font-semibold hover:bg-blue-500 text-center"
            >
              Get Quote
            </Link>
          </div>
        </div>
        <div className="p-6 md:p-10 space-y-10 divide-y-2">
          {/* Overview */}
          <ul className="flex flex-col gap-4">
            <h1 className="text-xl md:text-2xl font-bold">Overview</h1>
            {serviceItem.longDescription.map((description, index) => (
              <li
                key={index}
                className="text-sm md:text-lg text-gray-700 text-justify"
              >
                {description}
              </li>
            ))}
          </ul>
          {/* Eligibility */}
          <ul className="flex flex-col gap-4">
            <div className="mt-5">
              <h1 className="text-xl md:text-3xl font-bold text-center">
                Eligibility
              </h1>
              <h2 className="text-sm md:text-lg font-medium text-gray-600 mb-2 italic text-center">
                {serviceItem?.eligibility?.title}
              </h2>
            </div>
            {serviceItem.eligibility?.data?.map((item: any, index: number) => (
              <div className="p-4 shadow-lg rounded-sm">
                <li
                  key={index}
                  className="text-lg md:text-xl text-black font-semibold"
                >
                  {item?.title}:
                </li>
                <p className="text-sm md:text-lg text-gray-700 text-justify">
                  {item?.description}
                </p>
              </div>
            ))}
            <h2 className="text-sm md:text-lg font-medium text-gray-600 mb-2 italic text-center">
              {serviceItem?.eligibility?.conclusion}
            </h2>
          </ul>

          {/* Benefits */}
          <ul className="flex flex-col gap-4">
            <div className="mt-5">
              <h1 className="text-xl md:text-3xl font-bold text-center">
                Benefits
              </h1>
              <h2 className="text-sm md:text-lg font-medium text-gray-600 mb-2 italic text-center">
                {serviceItem?.benefits?.title}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 md:space-x-4 md:space-y-4">
              {serviceItem.benefits?.data?.map((item: any, index: number) => (
                <div className="p-7 shadow-lg rounded-sm cursor-pointer hover:shadow-2xl space-y-4">
                  <li
                    key={index}
                    className="text-lg md:text-xl text-black font-semibold"
                  >
                    {item?.title}:
                  </li>
                  <p className="text-sm md:text-lg text-gray-700 text-justify">
                    {item?.description}
                  </p>
                </div>
              ))}
            </div>
            <h2 className="text-sm md:text-lg font-medium text-gray-600 mb-2 italic text-center">
              {serviceItem?.benefits?.conclusion}
            </h2>
          </ul>

          {/* Requirement */}
          <ul className="flex flex-col gap-4">
            <div className="mt-5 space-y-7">
              <h1 className="text-xl md:text-3xl font-bold text-center">
                Requirement
              </h1>
              <div className="grid md:grid-cols-2 md:space-x-3">
                <div>
                  <div className="mb-4">
                    <h2 className="text-lg md:text-xl font-semibold text-black text-start ">
                      {serviceItem.requirement[0]?.title}
                    </h2>
                    <h2 className="text-sm font-normal text-gray-600 mb-2 italic text-start">
                      {serviceItem.requirement[0]?.description}
                    </h2>
                  </div>

                  {serviceItem.requirement[0]?.data?.map(
                    (item: any, index: number) => (
                      <div>
                        <div className="p-4 shadow-lg rounded-sm">
                          <li
                            key={index}
                            className="text-lg md:text-xl text-black font-semibold"
                          >
                            {item?.title}:
                          </li>
                          <p className="text-sm md:text-lg text-gray-700 text-justify">
                            {item?.description}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
                <div>
                  <div className="mb-4">
                    <h2 className="text-lg md:text-xl font-semibold text-black text-start ">
                      {serviceItem.requirement[1]?.title}
                    </h2>
                    <h2 className="text-sm font-normal text-gray-600 mb-2 italic text-start">
                      {serviceItem.requirement[1]?.description}
                    </h2>
                  </div>

                  {serviceItem.requirement[1]?.data?.map(
                    (item: any, index: number) => (
                      <div>
                        <div className="p-4 shadow-lg rounded-sm">
                          <li
                            key={index}
                            className="text-lg md:text-xl text-black font-semibold"
                          >
                            {item?.title}:
                          </li>
                          <p className="text-sm md:text-lg text-gray-700 text-justify">
                            {item?.description}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <h2 className="text-sm md:text-lg font-medium text-gray-600 mb-2 italic text-center">
              {serviceItem?.benefits?.conclusion}
            </h2>
          </ul>

          {/* Registration Process */}
          <ul className="flex flex-col gap-4">
            <div className="mt-5">
              <h1 className="text-xl md:text-3xl font-bold text-center">
                Registration Process
              </h1>
              <h2 className="text-sm md:text-lg font-medium text-gray-600 mb-2 italic text-center">
                {serviceItem?.registration_process?.title}
              </h2>
            </div>
            {serviceItem.registration_process?.data?.map(
              (item: any, index: number) => (
                <div className="p-4 shadow-lg rounded-sm">
                  <li
                    key={index}
                    className="text-lg md:text-xl text-black font-semibold"
                  >
                    {item?.title}:
                  </li>
                  <p className="text-sm md:text-lg text-gray-700 text-justify">
                    {item?.description}
                  </p>
                </div>
              )
            )}
            <h2 className="text-sm md:text-lg font-medium text-gray-600 mb-2 italic text-start">
              {serviceItem?.registration_process?.conclusion}
            </h2>
          </ul>

          {/* Compliances */}
          <ul className="flex flex-col gap-4">
            <div className="mt-5">
              <h1 className="text-xl md:text-3xl font-bold text-center">
                Compliances
              </h1>
              <h2 className="text-sm md:text-lg font-medium text-gray-600 mb-2 italic text-center">
                {serviceItem?.compliances?.title}
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-ful">
              {serviceItem.compliances?.data.map(
                ({ title, description }, index) => (
                  <AccordionItem
                    value={`item-${index + 1}`}
                    key={index}
                    className="overflow-hidden border mb-4  rounded-lg shadow-lg"
                  >
                    <AccordionTrigger className="w-full p-4 text-lg font-semibold mb-4 flex-row flex justify-between items-center">
                      {title}
                      <FaAngleDown />
                    </AccordionTrigger>
                    <AccordionContent className="p-4">
                      {description}
                    </AccordionContent>
                  </AccordionItem>
                )
              )}
            </Accordion>

            <h2 className="text-sm md:text-lg font-medium text-gray-600 mb-2 italic text-start">
              {serviceItem?.compliances?.conclusion}
            </h2>
          </ul>

          {/* Why Us */}
          <ul className="flex flex-col gap-4">
            <div className="mt-5 space-y-4">
              <h1 className="text-xl md:text-3xl font-bold text-center">
                {serviceItem?.whyUs?.title}
              </h1>
              <h2 className="text-sm md:text-lg font-medium text-gray-600 mb-2 italic text-center">
                {serviceItem?.whyUs?.description}
              </h2>
            </div>
          </ul>

          {/* FAQ */}
          <ul className="flex flex-col gap-4">
            <div className="mt-5">
              <h1 className="text-xl md:text-3xl font-bold text-center">
                Frequently Asked Questions
              </h1>
              <h2 className="text-sm md:text-lg font-medium text-gray-600 mb-2 italic text-center">
                {serviceItem?.faq?.title}
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-ful">
              {serviceItem.faq?.data.map(({ title, description }, index) => (
                <AccordionItem
                  value={`item-${index + 1}`}
                  key={index}
                  className="overflow-hidden border mb-4  rounded-lg shadow-lg"
                >
                  <AccordionTrigger className="w-full p-4 text-lg font-semibold mb-4 flex-row flex justify-between items-center">
                    {title}
                    <FaPlus />
                  </AccordionTrigger>
                  <AccordionContent className="p-4">
                    {description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <h2 className="text-sm md:text-lg font-medium text-gray-600 mb-2 italic text-start">
              {serviceItem?.faq?.conclusion}
            </h2>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
