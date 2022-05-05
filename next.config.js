/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MAP_URL : process.env.MAP_URL
  }
}

module.exports = nextConfig
