"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { BiCheckShield } from "react-icons/bi";

const popularServices = [
  { tag: "Pvt Ltd", label: "Private Limited Company",    slug: "private-limited-company" },
  { tag: "GST",    label: "GST Registration",             slug: "gst-registration-india" },
  { tag: "TM",     label: "Trademark Registration",       slug: "trademark-registration" },
  { tag: "ITR",    label: "Income Tax Return",             slug: "income-tax-return" },
  { tag: "MSME",   label: "MSME / Udyam Registration",    slug: "msme-or-udyam-registration" },
];

const quickActions = [
  { label: "Register a Company",  slug: "private-limited-company" },
  { label: "GST Registration",    slug: "gst-registration-india" },
  { label: "Trademark Filing",    slug: "trademark-registration" },
  { label: "ITR Filing",          slug: "income-tax-return" },
];

// Navbar: 48px top bar + 70px nav = 118px total
const NAVBAR_H = 118;

function HeroSection() {
  const router = useRouter();

  return (
    <div
      className="flex flex-col"
      style={{
        minHeight: `calc(100dvh - ${NAVBAR_H}px)`,
        background:
          "radial-gradient(circle at 92% 8%, rgba(15,74,137,0.07), transparent 36rem), linear-gradient(180deg, #F6F9FF 0%, #FFFFFF 55%, #F4F8FF 100%)",
      }}
    >
      {/* ── Main Hero ── */}
      <section className="flex-1 flex items-center relative overflow-hidden">
        <div className="container mx-auto px-4 py-6 lg:py-8 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">

            {/* ── Left: Copy ── */}
            <div className="flex-1 min-w-0 text-center lg:text-left">

              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4 text-[11px] font-bold uppercase tracking-widest"
                style={{ background: "#EBF2FF", borderColor: "#C8DEFF", color: "#0F4A89" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block flex-shrink-0" />
                India&apos;s Trusted Business Registration Platform
              </div>

              {/* H1 */}
              <h1
                className="font-bold mb-4 leading-none"
                style={{
                  fontSize: "clamp(32px, 4.5vw, 58px)",
                  letterSpacing: "-0.03em",
                  color: "#0F4A89",
                  lineHeight: "1.08",
                }}
              >
                Register Your Business,{" "}
                <span style={{ color: "#F3A404" }}>the Right Way.</span>
              </h1>

              {/* Lead */}
              <p
                className="mb-6 font-light leading-relaxed"
                style={{
                  fontSize: "clamp(14px, 1.6vw, 17px)",
                  color: "#4A607D",
                  maxWidth: "500px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                End-to-end company formation, GST registration, trademark
                protection, and compliance management — handled by certified
                experts so you can focus on your business.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-5">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 font-bold transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, #0F4A89, #0a3a6e)",
                    color: "#fff",
                    borderRadius: "999px",
                    padding: "11px 24px",
                    fontSize: "14px",
                    boxShadow: "0 10px 24px rgba(15,74,137,0.26)",
                  }}
                >
                  Get Free Consultation
                  <FaArrowRight className="text-xs" />
                </Link>
                <Link
                  href="/our-services"
                  className="inline-flex items-center justify-center gap-2 font-bold transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "#fff",
                    color: "#0F4A89",
                    border: "1.5px solid #C8DEFF",
                    borderRadius: "999px",
                    padding: "11px 24px",
                    fontSize: "14px",
                    boxShadow: "0 4px 12px rgba(15,74,137,0.08)",
                  }}
                >
                  Explore Services
                </Link>
              </div>

              {/* Trust line */}
              <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                {["1000+ Companies Registered", "Since 2016", "Pan India Service"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "#16a34a", boxShadow: "0 0 0 3px rgba(22,163,74,0.12)" }}
                    />
                    <span className="text-xs font-semibold" style={{ color: "#4A607D" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Popular Services Card ── */}
            <div
              className="w-full lg:w-[360px] flex-shrink-0 rounded-3xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.97)",
                border: "1px solid #D5E6FF",
                boxShadow: "0 16px 48px rgba(15,74,137,0.11)",
              }}
            >
              {/* Gradient top accent bar */}
              <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, #0F4A89, #F3A404)" }} />

              <div className="p-5">
                {/* Card header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "#F3A404" }}>
                      Most Popular
                    </p>
                    <h2 className="text-base font-extrabold" style={{ color: "#0F4A89" }}>
                      Quick Start Services
                    </h2>
                  </div>
                  <div
                    className="flex items-center justify-center w-9 h-9 rounded-xl"
                    style={{ background: "#EBF2FF" }}
                  >
                    <BiCheckShield className="text-lg" style={{ color: "#0F4A89" }} />
                  </div>
                </div>

                {/* Service list */}
                <div className="flex flex-col gap-1.5">
                  {popularServices.map((service) => (
                    <button
                      key={service.slug}
                      onClick={() => router.push(`/our-services/${service.slug}`)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-left w-full group transition-all duration-150"
                      style={{ background: "#F5F9FF", border: "1px solid #E2EDFF" }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLButtonElement;
                        el.style.background = "#FFFFFF";
                        el.style.borderColor = "#C8DEFF";
                        el.style.transform = "translateY(-1px)";
                        el.style.boxShadow = "0 4px 12px rgba(15,74,137,0.10)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLButtonElement;
                        el.style.background = "#F5F9FF";
                        el.style.borderColor = "#E2EDFF";
                        el.style.transform = "translateY(0)";
                        el.style.boxShadow = "none";
                      }}
                    >
                      <span
                        className="flex-shrink-0 text-[11px] font-extrabold flex items-center justify-center rounded-lg"
                        style={{ background: "#EBF2FF", color: "#0F4A89", minWidth: "44px", height: "30px", padding: "0 6px" }}
                      >
                        {service.tag}
                      </span>
                      <span className="flex-1 text-xs font-semibold" style={{ color: "#1E3A5F" }}>
                        {service.label}
                      </span>
                      <FaArrowRight
                        className="text-[10px] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: "#0F4A89" }}
                      />
                    </button>
                  ))}
                </div>

                {/* Footer link */}
                <Link
                  href="/our-services"
                  className="flex items-center justify-center gap-2 mt-4 text-xs font-bold transition-all duration-150 hover:gap-3"
                  style={{ color: "#0F4A89" }}
                >
                  View all services
                  <FaArrowRight className="text-[10px]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Actions Bar ── */}
      <div className="container mx-auto px-4 pb-4">
        <div
          className="rounded-2xl px-4 py-3 flex flex-col md:flex-row items-start md:items-center gap-3"
          style={{
            background: "#FFFFFF",
            border: "1px solid #DDE9FF",
            boxShadow: "0 4px 16px rgba(15,74,137,0.06)",
          }}
        >
          {/* Label */}
          <div
            className="flex-shrink-0 md:border-r md:pr-4"
            style={{ borderColor: "#E2EDFF" }}
          >
            <p className="text-[10px] font-semibold mb-0.5" style={{ color: "#7A93B5" }}>
              What do you need today?
            </p>
            <p className="text-xs font-extrabold whitespace-nowrap" style={{ color: "#0F4A89" }}>
              Choose a service
            </p>
          </div>

          {/* Action pills */}
          <div className="flex flex-wrap gap-2 flex-1">
            {quickActions.map((action) => (
              <button
                key={action.slug}
                onClick={() => router.push(`/our-services/${action.slug}`)}
                className="text-xs font-bold transition-all duration-150 hover:-translate-y-0.5"
                style={{
                  background: "#F5F9FF",
                  border: "1px solid #DDE9FF",
                  borderRadius: "999px",
                  padding: "7px 14px",
                  color: "#1E3A5F",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.color = "#0F4A89";
                  el.style.background = "#FFFFFF";
                  el.style.borderColor = "#C8DEFF";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.color = "#1E3A5F";
                  el.style.background = "#F5F9FF";
                  el.style.borderColor = "#DDE9FF";
                }}
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/contact-us"
            className="flex-shrink-0 flex items-center gap-2 text-xs font-bold transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg, #0F4A89, #0a3a6e)",
              color: "#fff",
              borderRadius: "999px",
              padding: "8px 18px",
              boxShadow: "0 6px 14px rgba(15,74,137,0.22)",
            }}
          >
            Talk to an Expert
            <FaArrowRight className="text-[10px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
