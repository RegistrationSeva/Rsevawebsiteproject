"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { TfiEmail } from "react-icons/tfi";
import { BiPhoneCall } from "react-icons/bi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const route = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const CustomMenuItem = ({
    title,
    navigation,
    disabled,
  }: {
    title: string;
    navigation: string;
    disabled: boolean;
  }) => {
    return (
      <MenubarItem
        disabled={!!disabled}
        onClick={() => route.push(`/our-services/${navigation}`)}
      >
        {title}
      </MenubarItem>
    );
  };

  return (
    <div className="sticky top-0 z-50">
      <div className="bg-primary">
        <div className="items-center flex flex-row justify-between flex-1 container h-12">
          <div className="flex flex-row items-center gap-2">
            <TfiEmail className="text-secondary text-sm md:text-xl" />
            <Link
              href="mailto:info@registrationseva.com"
              className="text-white text-[11px] md:text-sm hover:text-secondary"
            >
              info@registrationseva.com
            </Link>
          </div>
          <div className="flex flex-row items-center gap-2">
            <BiPhoneCall className="text-secondary text-sm md:text-xl" />
            <Link
              href="tel:+919999395031"
              className="text-white text-[11px] md:text-sm hover:text-secondary"
            >
              +91-9999395031
            </Link>
          </div>
        </div>
      </div>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center h-[70px] px-4">
          <Link href={"/"}>
            <span className="font-extrabold text-lg text-primary select-none">
              REGISTRATION <span className="text-secondary"> SEVA </span>
            </span>
          </Link>
          <div className="lg:hidden" onClick={toggleMenu}>
            {isOpen ? (
              <FaTimes className="text-2xl text-gray-700" />
            ) : (
              <FaBars className="text-2xl text-gray-700" />
            )}
          </div>
          {/* Desktop Menu */}
          <ul
            className={`hidden lg:flex lg:items-center lg:gap-5 absolute lg:static top-[70px] left-0 w-full lg:w-auto bg-primary lg:bg-transparent shadow-lg lg:shadow-none transition-transform duration-300 z-50 text-[white] text-sm`}
          >
            <Menubar className="bg-transparent border-0 shadow-none text-primary">
              {/* Start a business */}
              <MenubarMenu>
                <MenubarTrigger>Start a Business</MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>Firm</MenubarSubTrigger>
                    <MenubarSubContent>
                      <CustomMenuItem
                        title="Partnership Firm"
                        navigation="partnership-firm"
                        disabled={false}
                      />

                      <CustomMenuItem
                        title="Proprietorship Registration"
                        navigation="proprietorship-registration"
                        disabled={false}
                      />
                    </MenubarSubContent>
                  </MenubarSub>

                  <MenubarSub>
                    <MenubarSubTrigger>Company</MenubarSubTrigger>
                    <MenubarSubContent>
                      <CustomMenuItem
                        title="Private Limited Company"
                        navigation="private-limited-company"
                        disabled={false}
                      />
                      <CustomMenuItem
                        title="One Person Company (OPC)"
                        navigation="one-person-company"
                        disabled={true}
                      />

                      <CustomMenuItem
                        title="Section 8 Company"
                        navigation="section-8-company"
                        disabled={false}
                      />

                      <CustomMenuItem
                        title="Limited Liability Partnership (LLP)"
                        navigation="limited-liability-partnership"
                        disabled={true}
                      />
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>

              {/* Taxation */}
              <MenubarMenu>
                <MenubarTrigger>Taxation</MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>GST</MenubarSubTrigger>
                    <MenubarSubContent>
                      <CustomMenuItem
                        title="GST Registration"
                        navigation="gst-registration-india"
                        disabled={false}
                      />

                      <CustomMenuItem
                        title="GST Cancellation"
                        navigation="gst-cancellation"
                        disabled={true}
                      />

                      <CustomMenuItem
                        title="Response to GST Notices"
                        navigation="response-to-gst-notice"
                        disabled={false}
                      />
                    </MenubarSubContent>
                  </MenubarSub>

                  <MenubarSub>
                    <MenubarSubTrigger>Income Tax</MenubarSubTrigger>
                    <MenubarSubContent>
                      <CustomMenuItem
                        title="IT Return"
                        navigation="it-return"
                        disabled={true}
                      />
                      <CustomMenuItem
                        title="Response to Income Tax Notices"
                        navigation="response-to-income-tax-notices"
                        disabled={false}
                      />
                      <CustomMenuItem
                        title="80G and 12A Provisional Registration"
                        navigation="80g-and-12a-provisional-registration"
                        disabled={true}
                      />
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSub>
                    <MenubarSubTrigger>TDS Filing</MenubarSubTrigger>
                    <MenubarSubContent>
                      <CustomMenuItem
                        title="IT Return"
                        navigation="it-return"
                        disabled={true}
                      />
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>

              {/* Registration */}
              <MenubarMenu>
                <MenubarTrigger>Registration</MenubarTrigger>
                <MenubarContent>
                  <CustomMenuItem
                    title="MSME/UDYAM Registration"
                    navigation="msme-or-udyam-registration"
                    disabled={false}
                  />
                  <CustomMenuItem
                    title="Import Export Code (IEC)"
                    navigation="iec-code-registration"
                    disabled={false}
                  />
                  <CustomMenuItem
                    title="Startup India Registration"
                    navigation="startup-india-registration"
                    disabled={false}
                  />
                  <CustomMenuItem
                    title="FSSAI Registration"
                    navigation="fssai-registration"
                    disabled={false}
                  />

                  <CustomMenuItem
                    title="FSSAI Renewal"
                    navigation="fssai-renewal"
                    disabled={true}
                  />
                  <CustomMenuItem
                    title="NGO Darpan/Niti Aayog Registration"
                    navigation="niti-aayog-registration"
                    disabled={false}
                  />

                  <CustomMenuItem
                    title="LEI Registration in India"
                    navigation="lei-registration-in-india"
                    disabled={true}
                  />

                  <CustomMenuItem
                    title="Functional Certificate with Noida Authority"
                    navigation="functional-certificate-with-noida-authority"
                    disabled={false}
                  />

                  <CustomMenuItem
                    title="Shop and Establishment Delhi"
                    navigation="shop-and-establishment-delhi"
                    disabled={true}
                  />

                  <CustomMenuItem
                    title="Shop and Establishment Uttar Pradesh"
                    navigation="shop-and-establishment-uttar-pradesh"
                    disabled={true}
                  />
                </MenubarContent>
              </MenubarMenu>

              {/* Trademark */}
              <MenubarMenu>
                <MenubarTrigger>Trademark</MenubarTrigger>
                <MenubarContent>
                  <CustomMenuItem
                    title="Trademark Registration"
                    navigation="trademark-registration"
                    disabled={false}
                  />

                  <CustomMenuItem
                    title="Trademark Objection"
                    navigation="trademark-objection"
                    disabled={false}
                  />

                  <CustomMenuItem
                    title="Trademark Opposition"
                    navigation="trademark-opposition"
                    disabled={false}
                  />

                  <MenubarItem
                    onClick={() =>
                      route.push("/our-services/trademark-transfer")
                    }
                  >
                    Trademark Transfer
                  </MenubarItem>
                  <MenubarItem
                    onClick={() =>
                      route.push("/our-services/trademark-renewal")
                    }
                  >
                    Trademark Renewal
                  </MenubarItem>
                  <MenubarItem disabled>Trademark Hearing</MenubarItem>

                  <MenubarItem disabled>Trademark Rectification</MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              {/* Manage Business */}
              <MenubarMenu>
                <MenubarTrigger>Manage Business</MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>Annual Compliance</MenubarSubTrigger>
                    <MenubarSubContent>
                      <CustomMenuItem
                        title="Private Limited Company"
                        navigation="annual-compliance-private-limited-company"
                        disabled={false}
                      />
                      <CustomMenuItem
                        title="One Person Company"
                        navigation="annual-compliance-one-person-company"
                        disabled={true}
                      />

                      <CustomMenuItem
                        title="Limited Liability Partnership"
                        navigation="limited-liability-partnership"
                        disabled={true}
                      />
                    </MenubarSubContent>
                  </MenubarSub>

                  <MenubarSub>
                    <MenubarSubTrigger>
                      Event Based Compliances
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <CustomMenuItem
                        title="Change in Director"
                        navigation="change-in-director"
                        disabled={true}
                      />
                      <CustomMenuItem
                        title="Change in Share Capital"
                        navigation="change-in-share-capital"
                        disabled={false}
                      />
                      <CustomMenuItem
                        title="Change in Name"
                        navigation="change-in-name"
                        disabled={true}
                      />
                      <CustomMenuItem
                        title="Change in Registered Office Address"
                        navigation="change-in-registered-office-address"
                        disabled={true}
                      />
                      <CustomMenuItem
                        title="Alteration in Objects of Company"
                        navigation="alteration-in-objects-of-company"
                        disabled={true}
                      />
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger onClick={() => route.push("/about-us")}>
                  About Us
                </MenubarTrigger>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger onClick={() => route.push("/contact-us")}>
                  Contact Us
                </MenubarTrigger>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger onClick={() => route.push("/blog")}>
                  Blog
                </MenubarTrigger>
              </MenubarMenu>
            </Menubar>

            <li>
              <Link
                href={"https://pages.razorpay.com/registrationsevacom"}
                target="_blank"
                className="bg-secondary px-4 py-2 rounded-lg hover:bg-secondary/80 text-[#202020]"
              >
                Pay Now
              </Link>
            </li>
          </ul>

          {/* Mobile View */}
          <div
            className={`${
              isOpen ? "fixed inset-0 bg-black bg-opacity-50" : "hidden"
            } lg:hidden z-40`}
            onClick={toggleMenu}
          ></div>
          <div
            className={`${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden`}
          >
            <ul className="flex flex-col mt-10 space-y-4 p-4 text-gray-700">
              <li>
                <Link
                  href="/"
                  className="hover:text-secondary"
                  onClick={toggleMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-secondary"
                  onClick={toggleMenu}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/our-services"
                  className="hover:text-secondary"
                  onClick={toggleMenu}
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-secondary"
                  onClick={toggleMenu}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-secondary"
                  onClick={toggleMenu}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href={"https://pages.razorpay.com/registrationsevacom"}
                  target="_blank"
                  className="bg-secondary hover:bg-primary text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out inline-block"
                  onClick={toggleMenu}
                >
                  Pay Now
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
