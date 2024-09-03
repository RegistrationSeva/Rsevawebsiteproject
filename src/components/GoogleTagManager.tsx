"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

function GoogleTagManager() {
  useEffect(() => {
    // Add the external Google Tag Manager script
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=AW-16686633951";
    document.head.appendChild(script);

    // Initialize Google Tag Manager
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args) {
        window.dataLayer.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", "AW-16686633951");
    };
  }, []);

  return null;
}

export default GoogleTagManager;
