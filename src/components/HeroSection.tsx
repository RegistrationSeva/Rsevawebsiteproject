"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import {
  FaBuilding,
  FaPercent,
  FaBalanceScale,
  FaFileAlt,
  FaStore,
  FaArrowRight,
} from "react-icons/fa";

// Navbar: 48px top bar + 70px nav
const NAVBAR_H = 118;

const popularServices = [
  { tag: "Pvt Ltd", label: "Private Limited Company",   slug: "private-limited-company"    },
  { tag: "GST",    label: "GST Registration",            slug: "gst-registration-india"     },
  { tag: "TM",     label: "Trademark Registration",      slug: "trademark-registration"     },
  { tag: "ITR",    label: "Income Tax Return",            slug: "income-tax-return"          },
  { tag: "MSME",   label: "MSME / Udyam Registration",   slug: "msme-or-udyam-registration" },
];

const stats = [
  { number: "1000+", label: "Businesses Registered" },
  { number: "10+",   label: "Years of Experience"   },
  { number: "99%",   label: "Success Rate"          },
  { number: "24/7",  label: "Customer Support"      },
];

export default function HeroSection() {
  const router = useRouter();

  return (
    <div
      className="flex flex-col"
      style={{ minHeight: `calc(100dvh - ${NAVBAR_H}px)` }}
    >
      {/* ── Hero: same gradient the page already uses in the Process section ── */}
      <section className="flex-1 flex items-center bg-gradient-to-br from-primary to-blue-800 relative overflow-hidden">

        {/* Decorative blobs — consistent with the circular decorations on the site */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5 pointer-events-none" />

        <div className="container mx-auto px-4 py-8 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14">

            {/* ── Left: Copy ── */}
            <div className="flex-1 min-w-0 text-center lg:text-left text-white">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5 text-xs font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                India&apos;s Trusted Business Registration Platform
              </div>

              {/* H1 */}
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight">
                Register Your Business,
                <br />
                <span className="text-secondary">the Right Way.</span>
              </h1>

              {/* Lead */}
              <p className="text-white/80 text-base lg:text-lg mb-7 max-w-md mx-auto lg:mx-0 leading-relaxed">
                Company registration, GST, trademark, and compliance — all
                handled by certified professionals so you can focus on growing.
              </p>

              {/* CTAs — matching existing button patterns on the site */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-7">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary font-bold rounded-lg px-6 py-3 hover:-translate-y-0.5 transition-transform shadow-lg text-sm"
                >
                  Get Free Consultation
                  <FaArrowRight className="text-xs" />
                </Link>
                <Link
                  href="/our-services"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white font-bold rounded-lg px-6 py-3 hover:-translate-y-0.5 hover:border-white transition-all text-sm"
                >
                  Explore Services
                </Link>
              </div>

              {/* Trust — green dots matching ServiceBannerCard's green theme */}
              <div className="flex flex-wrap items-center gap-5 justify-center lg:justify-start">
                {[
                  "1000+ Companies Registered",
                  "Since 2016",
                  "Pan India Service",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                    <span className="text-sm font-semibold text-white/90">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Glass card — bg-white/10 matches the process section's bg-white/20 circles ── */}
            <div className="w-full lg:w-[360px] flex-shrink-0 rounded-xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm">

              {/* Amber accent bar — using secondary color token */}
              <div className="h-1 w-full bg-secondary" />

              <div className="p-5">
                <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-1">
                  Most Popular
                </p>
                <h2 className="text-white text-lg font-bold mb-4">
                  Quick Start Services
                </h2>

                {/* Service rows */}
                <div className="flex flex-col gap-2">
                  {popularServices.map((s) => (
                    <button
                      key={s.slug}
                      onClick={() => router.push(`/our-services/${s.slug}`)}
                      className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg px-3 py-2.5 text-left w-full group transition-colors duration-150"
                    >
                      <span className="flex-shrink-0 text-xs font-extrabold bg-white/20 text-white rounded-md text-center"
                        style={{ minWidth: "44px", padding: "4px 6px" }}>
                        {s.tag}
                      </span>
                      <span className="flex-1 text-sm font-medium text-white/90">
                        {s.label}
                      </span>
                      <FaArrowRight className="text-[10px] text-white/40 group-hover:text-white/80 transition-colors flex-shrink-0" />
                    </button>
                  ))}
                </div>

                <Link
                  href="/our-services"
                  className="flex items-center justify-center gap-2 mt-4 text-secondary text-sm font-bold hover:gap-3 transition-all duration-150"
                >
                  View all services
                  <FaArrowRight className="text-xs" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar — bg-gray-50 + text-primary matching the track record section on page.tsx ── */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center text-center py-3 lg:py-0 lg:px-6"
              >
                <span className="text-3xl font-bold text-primary mb-1">
                  {s.number}
                </span>
                <span className="text-sm text-gray-600">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
