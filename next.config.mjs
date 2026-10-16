/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sas.edu.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.sas.edu.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/society.html",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/vm.html",
        destination: "/about#vision-mission",
        permanent: true,
      },
      {
        source: "/cm.html",
        destination: "/about#chairmans-message",
        permanent: true,
      },
      {
        source: "/admissions.html",
        destination: "/admissions",
        permanent: true,
      },
      {
        source: "/academic.html",
        destination: "/academics",
        permanent: true,
      },
      {
        source: "/campus.html",
        destination: "/school-life",
        permanent: true,
      },
      {
        source: "/affiliation.html",
        destination: "/academics",
        permanent: true,
      },
      {
        source: "/curriculum.html",
        destination: "/academics",
        permanent: true,
      },
      {
        source: "/methodology.html",
        destination: "/academics",
        permanent: true,
      },
      {
        source: "/contact.html",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/gallery.html",
        destination: "/gallery",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
