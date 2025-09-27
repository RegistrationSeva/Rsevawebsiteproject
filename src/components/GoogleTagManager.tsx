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
    // Initialize dataLayer even if script fails to load
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args) {
      window.dataLayer.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", "AW-16686633951");

    // Try to load Google Tag Manager script with error handling
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=AW-16686633951";
    
    // Add error handling for blocked scripts
    script.onerror = () => {
      console.warn("Google Tag Manager script blocked by ad blocker or failed to load");
    };
    
    script.onload = () => {
      console.log("Google Tag Manager script loaded successfully");
    };
    
    document.head.appendChild(script);
  }, []);

  return null;
}

export default GoogleTagManager;
