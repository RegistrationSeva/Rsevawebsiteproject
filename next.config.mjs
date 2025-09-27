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
      // Handle common 4xx redirects
      {
        source: "/contact-us/:slug",
        destination: "/contact-us",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
