// next.config.js
module.exports = {
  distDir: process.env.NODE_ENV === "development" ? ".next/dev" : ".next/build",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
    ],
  },
};
