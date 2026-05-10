"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Use replace instead of push for proper 301-like behavior
    // This ensures the 404 page doesn't stay in browser history
    router.replace("/");
  }, [router]);

  return (
    <>
      <Head>
        {/* SEO meta tags for 404 page */}
        <title>Page Not Found - Registration SEVA</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta httpEquiv="refresh" content="0; url=/" />
        <link rel="canonical" href="/" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Redirecting...
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Taking you to the most relevant page
          </p>
          <p className="text-sm text-gray-500">
            Please wait while we redirect you...
          </p>
          <div className="mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
          <div className="mt-6">
            <a
              href="/"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Home Page
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
