/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/index',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
