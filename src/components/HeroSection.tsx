"use client";
import React from "react";
import { FaAngleDown } from "react-icons/fa";

function HeroSection() {
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <section className="relative h-screen bg-gradient-to-tl from-secondary via-primary/50 to-primary">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center justify-around h-full text-center text-white container mx-auto px-4 py-20">
          <div className="flex flex-col justify-center items-center gap-y-6">
            <h1 className="text-3xl md:text-6xl font-extrabold mb-4">
              Welcome to Registration Seva
            </h1>

            <p className="text-lg md:text-xl max-w-3xl mb-8 text-justify md:text-center">
              Your Trusted Consultancy for All Business Needs. Whether
              you&apos;re starting a new venture or growing an existing
              business&lsquo; our team of experts provides specialized guidance
              to ensure your success. From company incorporation and trademark
              assistance to compliance and legal advice&lsquo; we support you
              through each phase of the registration process. Our role is to
              provide expert consultancy and assistance to help you navigate the
              necessary steps and procedures for your business.
            </p>
          </div>
          <button
            className="bg-primary p-3 rounded-full"
            onClick={handleScrollDown}
          >
            <FaAngleDown className="text-3xl" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
