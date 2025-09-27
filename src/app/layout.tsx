import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GoogleTagManager from "@/components/GoogleTagManager";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Registration SEVA",
  description: "",
};

// Conditional Analytics component to handle Vercel Analytics errors
function ConditionalAnalytics() {
  try {
    return <Analytics />;
  } catch (error) {
    console.warn("Vercel Analytics not available:", error);
    return null;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleTagManager />
        <meta httpEquiv="Content-Security-Policy" content="frame-ancestors 'self' https://www.google.com;" />
      </head>
      <body className={inter.className}>
        {children}
        <ConditionalAnalytics />
      </body>
    </html>
  );
}
