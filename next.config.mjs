/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.registrationseva.com",
        port: "",
        pathname: "/api/v1/images/**",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      // Global 301 redirects for common 404 scenarios
      // Redirect any non-existent service-related pages to main services page
      {
        source: "/services/:path*",
        destination: "/our-services",
        permanent: true,
        statusCode: 301,
      },
      // Redirect any non-existent blog-related pages to main blog page
      {
        source: "/blogs/:path*",
        destination: "/blog",
        permanent: true,
        statusCode: 301,
      },
      // Redirect any non-existent about-related pages to about page
      {
        source: "/about/:path*",
        destination: "/about-us",
        permanent: true,
        statusCode: 301,
      },
      // Redirect any non-existent contact-related pages to contact page
      {
        source: "/contact/:path*",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      // Redirect any non-existent help/support pages to contact page
      {
        source: "/help/:path*",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/support/:path*",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      // Redirect any non-existent pricing/quote pages to contact page
      {
        source: "/pricing/:path*",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/quote/:path*",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      // Redirect any non-existent company pages to about page
      {
        source: "/company/:path*",
        destination: "/about-us",
        permanent: true,
        statusCode: 301,
      },
      // Redirect any non-existent legal pages to terms page
      {
        source: "/legal/:path*",
        destination: "/terms-condition",
        permanent: true,
        statusCode: 301,
      },
      // 301 redirects for broken contact-us links to most relevant content
      {
        source: "/contact-us/:slug",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      // Additional 301 redirects for common broken service contact links
      {
        source: "/contact-us/annual-compliance-private-limited-company",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/contact-us/change-in-registered-office-address",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/contact-us/change-in-share-capital",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/contact-us/fssai-registration",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/contact-us/functional-certificate-with-noida-authority",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/contact-us/gst-registration-india",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/contact-us/iec-code-registration",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/contact-us/msme-or-udyam-registration",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/contact-us/niti-aayog-registration",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/contact-us/partnership-firm",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/contact-us/private-limited-company",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/contact-us/proprietorship-registration",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/contact-us/response-to-gst-notice",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/contact-us/response-to-income-tax-notices",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/contact-us/section-8-company",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/contact-us/startup-india-registration",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/contact-us/trademark-objection",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/contact-us/trademark-opposition",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/contact-us/trademark-registration",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/contact-us/trademark-renewal",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/contact-us/trademark-transfer",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      // Additional common 404 redirects for better SEO
      // Redirect common misspellings and variations
      {
        source: "/services",
        destination: "/our-services",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/contact",
        destination: "/contact-us",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/about",
        destination: "/about-us",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/blogs",
        destination: "/blog",
        permanent: true,
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
