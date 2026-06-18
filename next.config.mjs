/** @type {import('next').NextConfig} */

// When building for GitHub Pages we produce a fully static export served from
// the /goodluck project path. Local dev and Vercel builds are unaffected.
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? "/goodluck" : "";

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ["three"],
  ...(isPages ? { output: "export", basePath, assetPrefix: `${basePath}/` } : {}),
  images: {
    unoptimized: isPages,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
