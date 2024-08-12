"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm, ValidationError } from "@formspree/react";
import { toast } from "sonner";

const Footer = () => {
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
  return (
    <footer className="px-7 grid md:grid-cols-3 py-10 gap-6 bg-[white]">
      {/* Services Card */}
      <div className="p-7 shadow-lg hover:shadow-xl transition-shadow rounded-lg">
        <h2 className="text-2xl font-bold text-black mb-6">Services</h2>
        <div className="flex flex-col">
          {services.map((service, index) => (
            <React.Fragment key={index}>
              <Link
                href="/"
                className="hover:underline text-gray-700 leading-relaxed"
              >
                {service.name}
              </Link>
              {index < services.length - 1 && (
                <div className="w-full bg-gray-300 h-px my-3"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Registration Seva Card */}
      <div className="p-7 shadow-lg hover:shadow-xl transition-shadow rounded-lg">
        <h2 className="text-2xl font-bold text-black mb-6">
          REGISTRATION SEVA
        </h2>
        <div className="flex flex-col">
          {rSevaServices.map((service, index) => (
            <React.Fragment key={index}>
              <Link
                href={service?.link}
                className="hover:underline text-gray-700 leading-relaxed"
              >
                {service.name}
              </Link>
              {index < rSevaServices.length - 1 && (
                <div className="w-full bg-gray-300 h-px my-3"></div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-center gap-5 mt-8">
          <FaFacebook className="text-primary cursor-pointer" size={23} />
          <FaTwitter className="text-primary cursor-pointer" size={23} />
          <RiWhatsappFill className="text-primary cursor-pointer" size={23} />
          <FaYoutube className="text-primary cursor-pointer" size={23} />
          <FaLinkedin className="text-primary cursor-pointer" size={23} />
        </div>
      </div>

      {/* Contact Us Card */}
      <div className="p-7 shadow-lg hover:shadow-xl transition-shadow rounded-lg">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          Contact Us
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
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            theme="light"
          />
          <button
            type="submit"
            className="bg-primary px-7 py-3 rounded-lg text-[white] text-center mt-4 transition-transform transform hover:scale-105"
            disabled={state.submitting}
          >
            Submit
          </button>
        </form>
      </div>
    </footer>
  );
};

const services = [
  { name: "Private Limited Company", link: "/" },
  { name: "One Person Company", link: "/" },
  { name: "LLP Registration", link: "/" },
  { name: "Section 8 Company", link: "/" },
  { name: "MSME/Udyam Registrations", link: "/" },
  { name: "GST Registration", link: "/" },
  { name: "Startup India Registration", link: "/" },
];

// Data for Registration Seva services
const rSevaServices = [
  { name: "About Us", link: "/" },
  { name: "Privacy Policy", link: "/privacy-policy" },
  { name: "Refund Policy", link: "/refund-policy" },
  { name: "Satisfaction Guarantee", link: "/satisfaction-guarantee" },
  { name: "Terms & Conditions", link: "/terms-condition" },
  { name: "Contact Us", link: "/contact-us" },
];

export default Footer;
