/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/2015',
        destination: '/2015/index.html',
        permanent: true,
      },
      {
        source: '/2016',
        destination: '/2016/index.html',
        permanent: true,
      },
      {
        source: '/2017',
        destination: '/2017/index.html',
        permanent: true,
      },
      {
        source: '/2023',
        destination: '/2023/index.html',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
