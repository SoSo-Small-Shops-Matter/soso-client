import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async headers() {
    if (process.env.VERCEL_ENV === 'preview') {
      return [
        {
          source: '/(.*)',
          headers: [{ key: 'Cache-Control', value: 'no-store' }],
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
