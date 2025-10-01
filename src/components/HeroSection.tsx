"use client";
import Link from "next/link";
import React from "react";
import {
  FaAngleDown,
  FaCheckCircle,
  FaBuilding,
  FaFileContract,
  FaHandshake,
  FaShieldAlt,
  FaUsers,
  FaAward,
} from "react-icons/fa";

function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Dark theme with dotted texture */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-primary to-slate-800">
        {/* Dotted texture pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="w-full h-full bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
          </div>
          {/* Subtle geometric elements */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center text-white container mx-auto px-8 py-24">
          <div className="max-w-6xl mx-auto">
            {/* Legal badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-16">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span className="text-sm font-medium text-white/90 tracking-wide uppercase">
                Certified Legal Consultants
              </span>
            </div>

            {/* Dark theme heading */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl mb-12 leading-[0.8] tracking-tight text-white font-semibold">
              <span className="block mb-4">Registration</span>
              <span className="block bg-gradient-to-r from-secondary via-secondary to-yellow-300 bg-clip-text text-transparent font-normal">
                Seva
              </span>
            </h1>

            {/* Professional subtitle */}
            <div className="max-w-4xl mx-auto mb-20">
              <p className="text-2xl md:text-3xl font-light mb-6 text-white/95 leading-relaxed">
                Professional Business Registration & Legal Compliance
              </p>
              <p className="text-lg text-white/80 font-light">
                Expert legal guidance for seamless company formation and
                regulatory compliance
              </p>
            </div>

            {/* Dark theme service grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:bg-white/15 hover:shadow-lg hover:border-secondary/30 transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-yellow-400 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-secondary/20">
                  <FaBuilding className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Company Formation
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Complete incorporation services for Private Limited, LLP, and
                  Proprietorship companies with comprehensive legal
                  documentation.
                </p>
              </div>

              <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:bg-white/15 hover:shadow-lg hover:border-secondary/30 transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-yellow-400 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-secondary/20">
                  <FaFileContract className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Legal Compliance
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Comprehensive compliance management including GST
                  registration, MSME certification, and trademark protection.
                </p>
              </div>

              <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:bg-white/15 hover:shadow-lg hover:border-secondary/30 transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-yellow-400 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-secondary/20">
                  <FaHandshake className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Expert Consultation
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Dedicated legal consultants providing personalized assistance
                  and strategic guidance for your business.
                </p>
              </div>
            </div>

            {/* Dark theme description */}
            <div className="max-w-5xl mx-auto mb-20">
              <div className="bg-white/10 backdrop-blur-sm border-l-4 border-secondary rounded-r-3xl p-12 shadow-lg">
                <p className="text-white/90 text-center leading-relaxed text-lg">
                  Registration Seva is India's leading business registration
                  consultancy, specializing in comprehensive company formation
                  and compliance solutions. Our experienced team of legal
                  experts and certified business consultants provides end-to-end
                  support ensuring seamless compliance with Indian regulatory
                  requirements.
                </p>
              </div>
            </div>

            {/* Dark theme CTA section */}
            <div className="mb-2">
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <Link
                  href={"/contact-us"}
                  className="bg-gradient-to-r from-secondary to-yellow-400 hover:from-secondary/90 hover:to-yellow-400/90 text-white font-semibold px-12 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-3"
                >
                  <FaCheckCircle className="text-lg" />
                  Get Started
                </Link>
                <Link
                  href={"/about-us"}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold px-12 py-4 rounded-xl transition-all duration-300 hover:shadow-lg flex items-center gap-3"
                >
                  Learn More
                </Link>
              </div>

              {/* Dark theme trust indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white/80">
                <div className="flex flex-col items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:border-secondary/30 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-yellow-400 rounded-xl flex items-center justify-center shadow-lg shadow-secondary/20">
                    <FaShieldAlt className="text-white text-lg" />
                  </div>
                  <span className="text-sm font-semibold">100% Compliant</span>
                </div>
                <div className="flex flex-col items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:border-secondary/30 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-yellow-400 rounded-xl flex items-center justify-center shadow-lg shadow-secondary/20">
                    <FaUsers className="text-white text-lg" />
                  </div>
                  <span className="text-sm font-semibold">1000+ Companies</span>
                </div>
                <div className="flex flex-col items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:border-secondary/30 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-yellow-400 rounded-xl flex items-center justify-center shadow-lg shadow-secondary/20">
                    <FaAward className="text-white text-lg" />
                  </div>
                  <span className="text-sm font-semibold">
                    Certified Experts
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:border-secondary/30 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-yellow-400 rounded-xl flex items-center justify-center shadow-lg shadow-secondary/20">
                    <FaFileContract className="text-white text-lg" />
                  </div>
                  <span className="text-sm font-semibold">Legal Assurance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
