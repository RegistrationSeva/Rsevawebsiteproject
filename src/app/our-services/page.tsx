import React from "react";
import Image from "next/image";
import Link from "next/link";
import { services } from "./servicesData";

const Services = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services?.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative overflow-hidden group">
              <Image
                src={service?.image}
                alt={service?.title}
                width={500}
                height={300}
                className="w-full h-48 object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-1 flex-col justify-between gap-7">
              <div className="md:h-[222px] overflow-hidden">
                <h2 className="text-2xl font-semibold mb-1">
                  {service?.title}
                </h2>
                {/* <h3 className="text-xl font-medium text-gray-700 mb-2">
                  {service?.subtitle}
                </h3> */}
                <p className="text-gray-700 mb-4 text-justify">
                  {service?.description}
                </p>
              </div>
              <div className="text-center flex gap-4 justify-center">
                <Link
                  href={`/our-services/${service?.slug}`}
                  className="inline-block px-4 py-2 md:px-6 md:py-3 bg-blue-700 text-white rounded-full font-semibold text-sm md:text-lg hover:bg-blue-500 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg border-2 border-blue-700"
                >
                  See Details
                </Link>
                <Link
                  href={`/contact-us/${service?.slug}`}
                  className="inline-block px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold text-sm md:text-lg  transition duration-300 ease-in-out transform hover:scale-105 shadow-lg border-2 border-blue-700 text-blue-700"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
