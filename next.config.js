/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    runtime: 'experimental-edge',
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: 'https://www.lostark.party',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
