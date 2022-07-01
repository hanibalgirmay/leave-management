/** @type {import('next').NextConfig} */
require("dotenv").config();

const nextConfig = {
  reactStrictMode: true,

  env: {
    API_ADDRESS: process.env.API_ADDRESS,
    PUBLIC_URL: process.env.PUBLIC_URL,
    PORT: process.env.PORT,
    // NODE_ENV: process.env.NODE_ENV,
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.API_ADDRESS,
      },
    ];
  },
};

module.exports = nextConfig;
