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

const ContactUs: React.FC<ContactUsProps> = () => {
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
    <div className="container py-14">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Image
          src={images.contactUs}
          alt={"Contact Us Image"}
          className="w-full h-[500px] object-cover transition-transform duration-500 ease-in-out transform rounded-lg"
        />
        <div className="flex flex-col justify-center p-6 md:p-10">
          <h1 className="text-3xl md:text-5xl font-semibold text-gray-800 mb-4">
            Contact Us
          </h1>
          <form
            className="flex flex-col gap-5"
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <Input
              name="name"
              id="name"
              placeholder="Enter Your Full Name"
              required
            />
            <ValidationError prefix="Name" field="name" errors={state.errors} />
            <Input
              name="email"
              id="email"
              placeholder="Enter Your Email"
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
            <Textarea
              name="message"
              placeholder="Enter Your Message"
              rows={7}
              id="message"
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
