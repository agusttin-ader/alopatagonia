import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Imágenes en public/; agregar remotePatterns si volvés a usar URLs externas */
  images: {
    formats: ["image/avif", "image/webp"],
    /** Permite `quality={100}` en `<Image />` (por defecto Next solo admite [75]). */
    qualities: [75, 100],
    /** Incluye 3840 para pantallas 4K en el srcset (coincide con el default de Next). */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
