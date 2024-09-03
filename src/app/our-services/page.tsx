import React from "react";
import Link from "next/link";
import { services } from "./servicesData";

const Services = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services?.map((service, index) => {
          return (
            <div
              key={index}
              className="bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border"
            >
              <div className="p-6 flex flex-1 flex-col justify-between gap-7">
                <div className="md:h-[222px] overflow-hidden">
                  <h2 className="text-2xl font-semibold mb-1 text-primary">
                    {service?.title}
                  </h2>
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
                  <Link
                    href={`/contact-us/${service?.slug}`}
                    className="inline-block px-2 py-1 md:px-3 md:py-1 rounded-lg font-semibold text-[12px] leading-5 md:text-[17] md:leading-7  transition duration-300 ease-in-out transform hover:scale-110 shadow-lg border-2 border-blue-700 text-blue-700"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
