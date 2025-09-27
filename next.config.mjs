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
    ];
  },
};

export default nextConfig;
