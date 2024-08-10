"use client";
import { services } from "@/app/our-services/servicesData";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import images from "@/assets/images";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [inputItem, setInputItem] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    subject: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputItem);
    setInputItem({
      name: "",
      email: "",
      phone: "",
      message: "",
      subject: "",
    });
  };

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
          <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <Input
              name="name"
              placeholder="Enter Your Full Name"
              value={inputItem.name}
              onChange={handleChange}
              required
            />
            <Input
              name="email"
              placeholder="Enter Your Email"
              value={inputItem.email}
              onChange={handleChange}
              required
            />
            <Input
              name="phone"
              placeholder="Enter Phone Number"
              value={inputItem.phone}
              onChange={handleChange}
            />
            <Select
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
            <Textarea
              name="message"
              placeholder="Enter Your Message"
              rows={7}
              value={inputItem.message}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-blue-700 py-3 font-bold text-white rounded-lg text-lg"
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
