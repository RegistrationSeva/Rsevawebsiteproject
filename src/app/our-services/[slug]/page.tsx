"use client";
import React, { useState, useEffect, useRef } from "react";
import { services } from "../servicesData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { FaPlus } from "react-icons/fa";
import { useForm, ValidationError } from "@formspree/react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";
import ServiceBannerCard from "@/components/ServiceBannerCard";

interface Data {
  title: string;
  description: string;
}

interface NestedData {
  title: string;
  description: string;
  data: Data[];
}

interface Section {
  name: string;
  heading: string;
  conclusion: string;
  data: NestedData[];
  isEmpty?: boolean;
}

interface Service {
  title: string;
  slug: string;
  description: string;
  image: string;
  overview: Section;
  eligibility: Section;
  benefits: Section;
  requirement: Section;
  registration_process: Section;
  compliances: Section;
  why_us: Section;
  faq: Section;
}

interface ServiceDetailProps {
  params: {
    slug: string;
  };
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ params }) => {
  const [serviceItem, setServiceItem] = useState<Service | null>(null);
  const [state, handleSubmit] = useForm("manwjalw");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.succeeded) {
      toast("Message Send Successfully", {
        description:
          "Thank you for your message. We'll get back to you shortly.",
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
      formRef.current?.reset();
    }
  }, [state.succeeded]);

  useEffect(() => {
    if (params && services) {
      const item: any = services.find(
        (service) => service.slug === params.slug
      );
      setServiceItem(item ?? null);
    }
  }, [params]);

  if (!serviceItem) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-4xl">Loading...</p>
      </div>
    );
  }
  const ContactForm = () => {
    return (
      <div className="px-4 py-7 shadow-lg hover:shadow-xl transition-shadow rounded-lg bg-white">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          Get In Touch With Us
        </h2>
        <form
          className="flex flex-col gap-4"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            id="name"
            required
            className="border-2 py-2 rounded-md px-3 border-gray-300 focus:border-primary transition-colors"
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} />
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="Email"
            className="border-2 py-2 rounded-md px-3 border-gray-300 focus:border-primary transition-colors"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
          <input
            type="tel"
            name="phone"
            id="phone"
            required
            placeholder="Mobile"
            className="border-2 py-2 rounded-md px-3 border-gray-300 focus:border-primary transition-colors"
          />
          <ValidationError prefix="Phone" field="phone" errors={state.errors} />
          <textarea
            name="message"
            id="message"
            required
            placeholder="Enter Your Message"
            rows={4}
            className="border-2 py-2 rounded-md px-3 border-gray-300 focus:border-primary transition-colors"
          ></textarea>
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />

          <button
            type="submit"
            className="bg-primary px-7 py-3 rounded-lg text-[white] text-center mt-2 transition-transform transform hover:scale-x-105"
            disabled={state.submitting}
          >
            Submit
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[70%_30%] bg-[#F5F5F5] p-4">
          <div className="flex flex-col justify-center p-6 md:p-10 space-y-7 md:items-start px-7 items-center">
            <div>
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold mb-1 text-primary">
                  Get expert assistance for ({serviceItem.title})
                </h1>
                <h1 className="text-lg md:text-xl font-semibold mb-2 text-primary">
                  Our skilled experts will assist you in the
                  registration process
                </h1>
              </div>
              <p className="text-sm md:text-md text-gray-700 rounded-lg text-justify">
                {serviceItem.description}
              </p>
              <ServiceBannerCard />
            </div>
          </div>
          <ContactForm />
        </div>
        <div className="p-6 md:p-10 space-y-10 divide-y-2">
          {/* Overview */}
          {!serviceItem?.overview?.isEmpty && (
            <div className="space-y-4">
              {serviceItem?.overview?.name && (
                <h1 className="name text-primary" style={{ color: "#0F4A89" }}>
                  {serviceItem?.overview?.name}
                </h1>
              )}
              {serviceItem?.overview?.heading && (
                <p className="heading">{serviceItem?.overview?.heading}</p>
              )}

              {serviceItem?.overview?.data?.map(
                (item: NestedData, index: number) => {
                  return (
                    <div className="" key={index}>
                      {item?.title && <p className="title">{item?.title}</p>}
                      {item?.description && (
                        <p className="description">{item?.description}</p>
                      )}
                      <div className="mt-4">
                        {item?.data?.length > 0 &&
                          item?.data?.map((item: Data, index: number) => {
                            return (
                              <ul className="list-disc px-7" key={index}>
                                {item?.title && (
                                  <>
                                    <li className="paragraph text-sm ">
                                      {item?.title}
                                    </li>
                                    <p>{item?.description}</p>
                                  </>
                                )}
                              </ul>
                            );
                          })}
                      </div>
                    </div>
                  );
                }
              )}

              {serviceItem?.overview?.conclusion && (
                <p className="conclusion">
                  {serviceItem?.overview?.conclusion}
                </p>
              )}
            </div>
          )}

          {/* Eligibility */}
          {!serviceItem?.eligibility?.isEmpty && (
            <div className="space-y-4">
              {serviceItem?.eligibility?.name && (
                <h1 className="name">{serviceItem?.eligibility?.name}</h1>
              )}
              {serviceItem?.eligibility?.heading && (
                <p className="heading">{serviceItem?.eligibility?.heading}</p>
              )}

              {serviceItem?.eligibility?.data?.map(
                (item: NestedData, index: number) => {
                  return (
                    <div
                      key={index}
                      className="px-7 items-center shadow-lg py-4 rounded-xl border border-white border-l-primary border-r-primary space-y-2"
                    >
                      {item?.title && (
                        <p className="title text-center">{item?.title}</p>
                      )}
                      {item?.description && (
                        <p className="description text-center">
                          {item?.description}
                        </p>
                      )}
                      <div className="mt-4">
                        {item?.data?.length > 0 &&
                          item?.data?.map((item: Data, index: number) => {
                            return (
                              <ul className="list-disc px-7" key={index}>
                                {item?.title && (
                                  <li className="paragraph text-sm ">
                                    {item?.title}
                                  </li>
                                )}

                                {item?.description && (
                                  <ul>
                                    <li className="paragraph text-sm ">
                                      {item?.description}
                                    </li>
                                  </ul>
                                )}
                              </ul>
                            );
                          })}
                      </div>
                    </div>
                  );
                }
              )}

              {serviceItem?.eligibility?.conclusion && (
                <p className="conclusion">
                  {serviceItem?.eligibility?.conclusion}
                </p>
              )}
            </div>
          )}

          {/* Benefits */}
          {!serviceItem?.benefits?.isEmpty && (
            <div className="space-y-4">
              {serviceItem?.benefits?.name && (
                <h1 className="name">{serviceItem?.benefits?.name}</h1>
              )}
              {serviceItem?.benefits?.heading && (
                <p className="heading">{serviceItem?.benefits?.heading}</p>
              )}
              <div className="grid md:grid-cols-3 gap-4 mt-5">
                {serviceItem?.benefits?.data?.map(
                  (item: NestedData, index: number) => {
                    return (
                      <div
                        className="px-7 items-center shadow-xl py-4 rounded-xl border border-white border-l-primary border-r-primary space-y-2"
                        key={index}
                      >
                        {item?.title && (
                          <p className="title text-center">{item?.title}</p>
                        )}
                        {item?.description && (
                          <p className="description text-center">
                            {item?.description}
                          </p>
                        )}
                        <div className="mt-4 ">
                          {item?.data?.length > 0 &&
                            item?.data?.map((item: Data, index: number) => {
                              return (
                                <ul className="list-disc px-7" key={index}>
                                  {item?.title && (
                                    <li className="paragraph text-sm ">
                                      {item?.title}
                                    </li>
                                  )}
                                </ul>
                              );
                            })}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>

              {serviceItem?.benefits?.conclusion && (
                <p className="conclusion">
                  {serviceItem?.benefits?.conclusion}
                </p>
              )}
            </div>
          )}

          {/* requirement */}
          {!serviceItem?.requirement?.isEmpty && (
            <div className="space-y-4">
              {serviceItem?.requirement?.name && (
                <h1 className="name">{serviceItem?.requirement?.name}</h1>
              )}
              {serviceItem?.requirement?.heading && (
                <p className="heading">{serviceItem?.requirement?.heading}</p>
              )}
              <div className="grid md:grid-cols-2 gap-4 mt-5">
                {serviceItem?.requirement?.data?.map(
                  (item: NestedData, index: number) => {
                    return (
                      <div
                        key={index}
                        className="px-7 items-center shadow-xl py-4 rounded-xl border border-white border-l-primary border-r-primary space-y-2"
                      >
                        {item?.title && (
                          <p className="title text-center">{item?.title}</p>
                        )}
                        {item?.description && (
                          <p className="description text-center">
                            {item?.description}
                          </p>
                        )}
                        <div className="mt-4 ">
                          {item?.data?.length > 0 &&
                            item?.data?.map((item: Data, index: number) => {
                              return (
                                <div className="space-y-4" key={index}>
                                  {item?.title && (
                                    <p className="title">{item?.title}</p>
                                  )}

                                  <ul className="list-disc px-7">
                                    {item?.description && (
                                      <li className="paragraph text-sm">
                                        {item?.description}
                                      </li>
                                    )}
                                  </ul>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>

              {serviceItem?.requirement?.conclusion && (
                <p className="conclusion">
                  {serviceItem?.requirement?.conclusion}
                </p>
              )}
            </div>
          )}

          {/* registration_process */}
          {!serviceItem?.registration_process?.isEmpty && (
            <div className="space-y-4">
              {serviceItem?.registration_process?.name && (
                <h1 className="name">
                  {serviceItem?.registration_process?.name}
                </h1>
              )}
              {serviceItem?.registration_process?.heading && (
                <p className="heading">
                  {serviceItem?.registration_process?.heading}
                </p>
              )}

              <div className="grid md:grid-cols-2 gap-4 mt-5">
                {serviceItem?.registration_process?.data?.map(
                  (item: NestedData, index: number) => {
                    return (
                      <div
                        className="px-7 items-center shadow-xl py-4 rounded-xl border border-primary  space-y-2"
                        key={index}
                      >
                        {item?.title && (
                          <p className="title text-center">{item?.title}</p>
                        )}
                        {item?.description && (
                          <p className="description text-center">
                            {item?.description}
                          </p>
                        )}
                        <div className="mt-4 ">
                          {item?.data?.length > 0 &&
                            item?.data?.map((item: Data, index: number) => {
                              return (
                                <div className="space-y-4" key={index}>
                                  {item?.title && (
                                    <p className="title ">{item?.title}</p>
                                  )}

                                  <ul className="list-disc px-7">
                                    {item?.title && (
                                      <p className="paragraph underline">
                                        {item?.title}
                                      </p>
                                    )}
                                    {item?.description && (
                                      <li className="paragraph text-sm">
                                        {item?.description}
                                      </li>
                                    )}
                                  </ul>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>

              {serviceItem?.registration_process?.conclusion && (
                <p className="conclusion">
                  {serviceItem?.registration_process?.conclusion}
                </p>
              )}
            </div>
          )}

          {/* compliances */}
          {!serviceItem?.compliances?.isEmpty && (
            <div className="space-y-4">
              {serviceItem?.compliances?.name && (
                <h1 className="name">{serviceItem?.compliances?.name}</h1>
              )}
              {serviceItem?.compliances?.heading && (
                <p className="heading">{serviceItem?.compliances?.heading}</p>
              )}
              {serviceItem?.compliances?.data?.length > 0 && (
                <div className="grid md:grid-cols-2 gap-4 mt-5">
                  {serviceItem?.compliances?.data?.map(
                    (item: NestedData, index: number) => {
                      return (
                        <div
                          className="px-7 items-center shadow-xl py-4 rounded-xl border border-primary  space-y-2"
                          key={index}
                        >
                          {item?.title && (
                            <p className="title text-center">{item?.title}</p>
                          )}
                          {item?.description && (
                            <p className="description text-center">
                              {item?.description}
                            </p>
                          )}
                          <div className="mt-4 ">
                            {item?.data?.length > 0 &&
                              item?.data?.map((item: Data, index: number) => {
                                return (
                                  <div className="space-y-4" key={index}>
                                    {item?.title && (
                                      <p className="title">{item?.title}</p>
                                    )}

                                    <ul className="list-disc px-7">
                                      {item?.description && (
                                        <li className="paragraph text-sm">
                                          {item?.description}
                                        </li>
                                      )}
                                    </ul>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}

              {serviceItem?.compliances?.conclusion && (
                <p className="conclusion">
                  {serviceItem?.compliances?.conclusion}
                </p>
              )}
            </div>
          )}

          {/* why_us */}
          {!serviceItem?.why_us?.isEmpty && (
            <div className="space-y-4">
              {serviceItem?.why_us?.name && (
                <h1 className="name">{serviceItem?.why_us?.name}</h1>
              )}
              {serviceItem?.why_us?.heading && (
                <p className="heading">{serviceItem?.why_us?.heading}</p>
              )}

              {serviceItem?.why_us?.data?.map(
                (item: NestedData, index: number) => {
                  return (
                    <div className="" key={index}>
                      {item?.title && <p className="title">{item?.title}</p>}
                      {item?.description && (
                        <p className="description">{item?.description}</p>
                      )}
                      <div className="mt-4">
                        {item?.data?.length > 0 &&
                          item?.data?.map((item: Data, index: number) => {
                            return (
                              <ul className="list-disc px-7" key={index}>
                                {item?.title && (
                                  <li className="paragraph text-sm ">
                                    {item?.title}
                                  </li>
                                )}
                              </ul>
                            );
                          })}
                      </div>
                    </div>
                  );
                }
              )}

              {serviceItem?.why_us?.conclusion && (
                <p className="conclusion">{serviceItem?.why_us?.conclusion}</p>
              )}
            </div>
          )}

          {/* faq */}
          {!serviceItem?.faq?.isEmpty && (
            <div className="space-y-4">
              {serviceItem?.faq?.name && (
                <h1 className="name">{serviceItem?.faq?.name}</h1>
              )}
              {serviceItem?.faq?.heading && (
                <p className="heading">{serviceItem?.faq?.heading}</p>
              )}
              {serviceItem.faq?.data?.length > 0 && (
                <Accordion type="single" collapsible className="w-ful">
                  {serviceItem.faq?.data.map(
                    ({ title, description, data }, index: number) => (
                      <AccordionItem
                        value={`item-${index + 1}`}
                        key={index}
                        className="overflow-hidden border mb-4  rounded-lg shadow-lg"
                      >
                        <AccordionTrigger className="w-full p-4 text-lg font-semibold mb-2 flex-row flex justify-between items-center">
                          {title}
                          <FaPlus />
                        </AccordionTrigger>
                        <AccordionContent className="p-4">
                          {description}

                          {data?.length > 0 && (
                            <ul className="list-disc px-7 py-4">
                              {data?.map((item: any, index: number) => (
                                <div key={index}>
                                  <p className="paragraph text-sm text-black font-bold">
                                    {item?.title}
                                  </p>
                                  <li className="paragraph text-sm" key={index}>
                                    {item?.description}
                                  </li>
                                </div>
                              ))}
                            </ul>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    )
                  )}
                </Accordion>
              )}

              {serviceItem?.faq?.conclusion && (
                <p className="conclusion">{serviceItem?.faq?.conclusion}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
