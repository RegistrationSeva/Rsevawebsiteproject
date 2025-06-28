"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { APIProvider } from "@/api/common/api-provider";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <APIProvider>
      <Navbar />
      {children}
      <Footer />
      <Toaster />
    </APIProvider>
  );
}
