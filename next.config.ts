import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Core configuration */
  reactStrictMode: true,
  
  /* Middleware configuration */
  skipMiddlewareUrlNormalize: false,
  skipTrailingSlashRedirect: false,
  
  /* Authentication and security configuration */
  images: {
    domains: ['lh3.googleusercontent.com'], // Allow Google profile images
  },
  
  /* Experimental features */
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'localhost:3001'],
    },
  },
  
  /* Webpack customization if needed */
  webpack: (config, { isServer }) => {
    // Custom webpack configuration if needed for auth libraries
    return config;
  },
};

export default nextConfig;
