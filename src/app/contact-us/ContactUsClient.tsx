"use client";

import { services } from "@/app/our-services/servicesData";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import images from "@/assets/images";
import { useForm, ValidationError } from "@formspree/react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function ContactUsClient() {
  const [state, handleSubmit] = useForm("manwjalw");
  const formRef = useRef<HTMLFormElement>(null);
  const [inputItem, setInputItem] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    subject: "",
  });

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
    <div className="min-h-screen bg-gray-50">
      <div className="container py-14">
        {/* Hero Section with Introduction */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Get In Touch With Registration SEVA
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Have questions about business registration, trademark protection, GST compliance, or any of our professional services? Our team of experienced consultants is here to help you navigate the complexities of business compliance and registration in India.
            </p>
          </div>

        {/* Why Contact Us Section */}
        <div className="bg-blue-600 rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Why Choose Registration SEVA?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="font-bold text-white mb-2 text-lg">Expert Consultation</h3>
              <p className="text-white/90 text-sm leading-relaxed">Get personalized advice from certified professionals with years of experience.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="font-bold text-white mb-2 text-lg">Quick Response Time</h3>
              <p className="text-white/90 text-sm leading-relaxed">Our team responds to all inquiries within 24 hours.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="font-bold text-white mb-2 text-lg">Comprehensive Services</h3>
              <p className="text-white/90 text-sm leading-relaxed">From company incorporation to trademark registration, we offer end-to-end solutions.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="font-bold text-white mb-2 text-lg">Transparent Pricing</h3>
              <p className="text-white/90 text-sm leading-relaxed">No hidden charges. Clear, upfront pricing for all our services.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="font-bold text-white mb-2 text-lg">Pan-India Support</h3>
              <p className="text-white/90 text-sm leading-relaxed">Serving clients across India with nationwide reach.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="font-bold text-white mb-2 text-lg">Post-Service Support</h3>
              <p className="text-white/90 text-sm leading-relaxed">Ongoing support for all your compliance needs.</p>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600 text-sm mb-3">Send us your queries anytime</p>
            <a href="mailto:info@registrationseva.com" className="text-blue-600 hover:text-blue-700 font-medium text-sm break-all">
              info@registrationseva.com
            </a>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600 text-sm mb-3">Mon-Sat: 9:30 AM - 6:30 PM</p>
            <a href="tel:+919999395031" className="text-green-600 hover:text-green-700 font-medium text-sm">
              +91-9999395031
            </a>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Visit Us</h3>
            <p className="text-gray-600 text-sm mb-3">Corporate Office</p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Second Floor,<br />
              H. No. 293, Saidulajab,<br />
              Near Kher Singh Estate, Western Marg,<br />
              New Delhi – 110030
            </p>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-xl p-8 md:p-10 shadow-md mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How Can We Help You Today?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            At Registration SEVA, we specialize in providing comprehensive business solutions tailored to your specific requirements. Our services include Private Limited Company registration, LLP formation, One Person Company setup, trademark registration and protection, GST registration and compliance, MSME/Udyam registration, FSSAI license, Import Export Code (IEC), ISO certification, digital signature certificates, and ongoing compliance management.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our team of certified professionals brings extensive experience in handling complex registration processes, ensuring accuracy and timely completion of all documentation. We stay updated with the latest regulatory changes and government policies to provide you with the most current and accurate information. Whether you need assistance with initial business setup, annual compliance, or specific regulatory requirements, we are committed to delivering exceptional service and support.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Feel free to reach out to us through the contact form below, call us directly, or send us an email. We are committed to providing prompt responses and personalized solutions to help your business thrive in today&apos;s competitive market. Our customer support team is available Monday through Saturday from 9:30 AM to 6:30 PM IST to answer your questions and provide expert guidance.
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto pb-8">
        <div className="order-2 md:order-1">
          <Image
            src={images.contactUs}
            alt={"Contact Registration SEVA - Business Registration and Compliance Services"}
            className="w-full h-[500px] object-contain md:object-cover rounded-xl"
          />
        </div>
        
        <div className="order-1 md:order-2">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Send Us a Message
            </h2>
            <p className="text-gray-600 mb-6">
              Fill out the form below and we&apos;ll get back to you within 24 hours
            </p>
            
            <form
              className="flex flex-col gap-4"
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <Input
                  name="name"
                  id="name"
                  placeholder="Enter Your Full Name"
                  required
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Enter Your Email"
                  required
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <Input 
                  name="phone" 
                  placeholder="Enter Phone Number" 
                  id="phone"
                />
                <ValidationError
                  prefix="Phone"
                  field="phone"
                  errors={state.errors}
                />
              </div>
              
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Select Service</label>
                <Select
                  name="service"
                  onValueChange={(e) =>
                    setInputItem((prev) => ({ ...prev, subject: e || "" }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((item, index) => {
                      return (
                        <SelectItem key={index} value={item?.title}>
                          {item?.title}
                        </SelectItem>
                      );
                    })}
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <ValidationError
                  prefix="Service"
                  field="service"
                  errors={state.errors}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <Textarea
                  name="message"
                  placeholder="Enter Your Message"
                  rows={4}
                  id="message"
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                />
              </div>
              
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 py-3 font-semibold text-white rounded-lg text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                disabled={state.submitting}
              >
                {state.submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
