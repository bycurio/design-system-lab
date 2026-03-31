/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  transpilePackages: ['@ds/ui', '@ds/tokens'],
}

export default nextConfig
