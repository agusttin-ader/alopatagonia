import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Imágenes en public/; agregar remotePatterns si volvés a usar URLs externas */
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
