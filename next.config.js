/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  compiler: {
    styledComponents: true, // Habilita o styled-components no SWC
  },
}

module.exports = nextConfig
