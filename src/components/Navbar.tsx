"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="bg-primary shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center h-[70px] px-4">
          <Link href={"/"}>
            <span className="font-bold text-lg text-[white] select-none">
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
          <ul
            className={`${
              isOpen ? "block" : "hidden"
            } lg:flex lg:items-center lg:gap-5 absolute lg:static top-[70px] left-0 w-full lg:w-auto bg-primary lg:bg-transparent shadow-lg lg:shadow-none transition-transform duration-300 z-50 text-[white]`}
          >
            <li>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`block py-2 px-4 font-semibold duration-300 ${
                  pathname === "/" ? "text-secondary" : "hover:text-secondary"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                onClick={() => setIsOpen(false)}
                className={`block py-2 px-4 font-semibold duration-300 ${
                  pathname === "/about-us"
                    ? "text-secondary"
                    : "hover:text-secondary"
                }`}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/our-services"
                onClick={() => setIsOpen(false)}
                className={`block py-2 px-4 font-semibold duration-300 ${
                  pathname === "/our-services"
                    ? "text-secondary"
                    : "hover:text-secondary"
                }`}
              >
                Services
              </Link>
            </li>

            <li>
              <Link
                href="/contact-us"
                onClick={() => setIsOpen(false)}
                className={`block py-2 px-4 font-semibold duration-300 ${
                  pathname === "/privacy-policy"
                    ? "text-secondary"
                    : "hover:text-secondary"
                }`}
              >
                Contact Us
              </Link>
            </li>
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
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
