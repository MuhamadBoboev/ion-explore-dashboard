/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  fastRefresh: true,
  swcMinify: true,
  images: {
    domains: ['api.promebel.local', 'api.promebel.tj', '192.168.0.100:8000', '192.168.0.100:8000'],
    remotePatterns: [
      // {
      //   protocol: 'http',
      //   hostname: 'api.promebel.local',
      //   port: '',
      //   pathname: '/storage/**',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'api.promebel.tj',
      //   port: '',
      //   pathname: '/storage/**',
      // },
      {
        protocol: 'http',
        hostname: '192.168.0.100',
        port: '8000',
        pathname: '/storage/**',
      },
    ],
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
