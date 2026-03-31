/** @type {import('next').NextConfig} */
const isPagesDeployment = process.env.GITHUB_PAGES === 'true'

const nextConfig = {
  output: 'export',
  transpilePackages: ['@ds/ui', '@ds/tokens'],
  basePath: isPagesDeployment ? '/design-system-lab' : '',
  assetPrefix: isPagesDeployment ? '/design-system-lab/' : '',
}

export default nextConfig
