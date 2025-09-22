import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Satisfaction Guarantee - Registration SEVA",
  description:
    "At Registration Seva, we stand by our commitment to delivering reliable business registration, trademark, GST, and compliance services. Learn about our satisfaction guarantee and how we ensure quality for every client.",
  keywords:
    "registration seva satisfaction guarantee, business registration guarantee, trusted consultancy india, trademark service assurance, GST compliance guarantee, customer satisfaction policy",
  openGraph: {
    title: "Satisfaction Guarantee - Registration SEVA",
    description:
      "Discover Registration Seva’s satisfaction guarantee. We ensure trustworthy, professional, and high-quality services in business registration, trademark, GST, and compliance across India.",
    type: "website",
  },
};

function SatisfactionGuarantee() {
  return (
    <div className="bg-gray-100 py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-20">
        <div className="bg-white p-6 sm:p-8 md:p-12 rounded-lg shadow-lg">
          <h1 className="text-2xl md:text-4xl font-bold text-center text-primary mb-6 md:mb-8">
            Satisfaction Guarantee
          </h1>
          <p className="text-sm md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 text-center">
            Welcome to the Satisfaction Guarantee page of Registrationseva.com.
            We are committed to providing our customers with the highest quality
            services and ensuring their complete satisfaction.
          </p>

          <p className="text-sm md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
            We understand that choosing a service provider can be a difficult
            decision, and we want you to be confident in your choice to use our
            services. That&apos;s why we offer a satisfaction guarantee on our
            services.
          </p>

          <p className="text-sm md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
            Our satisfaction guarantee ensures that if you are not completely
            satisfied with our services, we will work with you to make it right.
            We will take all necessary steps to address your concerns and ensure
            that you are satisfied with our services.
          </p>

          <p className="text-sm md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
            If you are not satisfied with our services for any reason, please
            contact our customer service team through the contact information
            provided on our website. We will work with you to resolve any issues
            and make sure that you are completely satisfied with our services.
          </p>

          <p className="text-sm md:text-lg text-gray-700 leading-relaxed mb-6 md:mb-8">
            Our commitment to customer satisfaction is our top priority, and we
            strive to exceed your expectations with every service we provide.
            Thank you for choosing Registrationseva.com, and we look forward to
            serving you.
          </p>

          <p className="text-center text-sm md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
            <strong>Thank You</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SatisfactionGuarantee;
