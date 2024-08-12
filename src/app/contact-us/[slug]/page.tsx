"use client";
import { services } from "@/app/our-services/servicesData";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, ValidationError } from "@formspree/react";
import { toast } from "sonner";

interface Service {
  slug: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string[];
  conclusion: string;
}

interface ContactUsProps {
  params: {
    slug: string;
  };
}

const ContactUs: React.FC<ContactUsProps> = ({ params }) => {
  const [serviceItem, setServiceItem] = useState<Service | null>(null);
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
    if (params && services) {
      const item = services.find((service) => service.slug === params.slug);
      setServiceItem(item ?? null);
      setInputItem((prev) => ({ ...prev, subject: item?.title || "" }));
    }
  }, [params]);

  if (!serviceItem) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-4xl">Not Found..</p>
      </div>
    );
  }

  // useEffect(() => {
  if (state.succeeded) {
    toast("Message Send Successfully", {
      description: "Thank you for your message. We'll get back to you shortly.",
      action: {
        label: "Close",
        onClick: () => console.log("Close"),
      },
    });
    formRef.current?.reset();
  }
  // }, [state.succeeded]);

  return (
    <div className="container py-14">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Image
          src={serviceItem.image}
          alt={serviceItem.title}
          className="w-full h-[500px] object-cover transition-transform duration-500 ease-in-out transform rounded-lg"
        />
        <div className="flex flex-col justify-center p-6 md:p-10">
          <h1 className="text-3xl md:text-5xl font-semibold text-gray-800 mb-4">
            Contact Us
          </h1>
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <Input
              name="name"
              placeholder="Enter Your Full Name"
              id="name"
              required
            />
            <ValidationError prefix="Name" field="name" errors={state.errors} />
            <Input
              name="email"
              placeholder="Enter Your Email"
              id="email"
              required
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <Input name="phone" placeholder="Enter Phone Number" id="phone" />
            <ValidationError
              prefix="Phone"
              field="phone"
              errors={state.errors}
            />
            <Input
              name="service"
              placeholder="Enter Phone Number"
              id="services"
              value={serviceItem?.title}
              className="hidden"
            />
            <ValidationError
              prefix="Service"
              field="service"
              errors={state.errors}
            />
            <Textarea
              name="message"
              placeholder="Enter Your Message"
              id="message"
              rows={7}
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
            <button
              type="submit"
              className="bg-blue-700 py-3 font-bold text-white rounded-lg text-lg"
              disabled={state.submitting}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
