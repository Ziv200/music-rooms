import type { NextConfig } from "next";

const repo = "music-rooms";
const isPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isPages ? `/${repo}` : "",
  assetPrefix: isPages ? `/${repo}/` : undefined,
  experimental: {
    // Needed because the app has two root layouts ((he) and (en)) and no single app/layout.tsx
    globalNotFound: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isPages ? `/${repo}` : "",
  },
};

export default nextConfig;
