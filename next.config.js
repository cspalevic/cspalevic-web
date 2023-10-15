/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cedomir.mo.cloudinary.net",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
