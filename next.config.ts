import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Imágenes en public/; agregar remotePatterns si volvés a usar URLs externas */
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
