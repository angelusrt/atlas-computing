/** @type {import('next').NextConfig} */

require("dotenv").config()

const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    'NEXT_PUBLIC_HOST': process.env.NEXT_PUBLIC_HOST
  }
}

module.exports = nextConfig
