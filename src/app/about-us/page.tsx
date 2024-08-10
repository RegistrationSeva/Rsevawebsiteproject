import React from "react";
import { FaCheckCircle } from "react-icons/fa";

function AboutUs() {
  return (
    <div className="container mb-24">
      <h1 className="text-3xl md:text-6xl text-center font-bold container my-11 text-gray-800">
        About Us
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <ul className="flex flex-col gap-6 text-sm md:text-lg text-justify text-gray-700 leading-relaxed">
          <li>
            <b className="text-xl text-primary">Registration Seva</b> is your
            trusted partner in navigating the complexities of starting and
            running a business. As a one-stop solution for all business needs,
            we offer a wide range of services, from registrations and trademarks
            to compliance, consulting, and more. Our team of experts is
            dedicated to helping you achieve your business goals with efficiency
            and ease.
          </li>
          <li>
            <b className="text-xl text-primary">Our Mission</b> <br />
            To provide comprehensive, reliable, and efficient business solutions
            that empower entrepreneurs and businesses to thrive.
          </li>
          <li>
            <b className="text-xl text-primary">Our Vision</b> <br />
            To be the preferred partner for businesses across India, offering a
            full spectrum of services that cater to every aspect of business
            operations.
          </li>
          <li>
            <b className="text-xl text-primary">What Sets Us Apart</b>
            <ul className="mt-4 list-disc ml-5">
              <li className="flex items-start mt-2">
                <FaCheckCircle className="text-primary mt-1 mr-2" />
                <div>
                  <b>All-in-One Solution:</b> We cover everything you need to
                  start, run, and grow your business.
                </div>
              </li>
              <li className="flex items-start mt-2">
                <FaCheckCircle className="text-primary mt-1 mr-2" />
                <div>
                  <b>Experienced Professionals:</b> A team of experts with deep
                  industry knowledge.
                </div>
              </li>
              <li className="flex items-start mt-2">
                <FaCheckCircle className="text-primary mt-1 mr-2" />
                <div>
                  <b>Customer First Approach:</b> We prioritize your needs and
                  tailor our services to meet them.
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AboutUs;
