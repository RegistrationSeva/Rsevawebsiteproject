import Link from "next/link";
import React from "react";

function HeroSection() {
  return (
    <div>
      <section className="relative h-screen">
        <video
          className="absolute inset-0 w-full h-full object-cover blur"
          src="/hero.mp4"
          autoPlay
          loop
          muted
        ></video>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Welcome to Registration Seva
          </h1>
          {/* <p className="text-xl md:text-3xl font-light mb-6">
            Empowering Insights, Driving Success
          </p> */}
          <p className="text-lg md:text-xl max-w-3xl mb-8">
            Your One-Stop Solution for All Business Needs. Whether you are
            starting a new venture or expanding your existing business, we
            provide a comprehensive range of services to ensure your success.
            From company incorporation and trademark services to compliance and
            legal support, we are here to help you navigate every step of your
            business journey
          </p>
          <Link
            href="/our-services"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            Explore Services
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
