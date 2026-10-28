import type { NextConfig } from 'next';

import { BASE_PATH } from './src/lib/base-path.ts';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: BASE_PATH,
  trailingSlash: true,
};

export default nextConfig;
