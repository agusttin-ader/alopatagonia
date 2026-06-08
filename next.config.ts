import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const connectSrc = [
  "'self'",
  "https://www.google-analytics.com",
  "https://*.google-analytics.com",
  "https://analytics.google.com",
  "https://*.googletagmanager.com",
  "https://*.tile.openstreetmap.org",
  "https://tile.openstreetmap.org",
  ...(isDev ? ["ws://localhost:*", "ws://127.0.0.1:*"] : []),
].join(" ");

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https:",
      `connect-src ${connectSrc}`,
      "media-src 'self' blob: data:",
      "object-src 'none'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "form-action 'self' https://wa.me https://api.whatsapp.com mailto:",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

/** Assets estáticos en public/ — no deben empaquetarse en cada función serverless (límite 300 MB Vercel). */
const OUTPUT_TRACE_PUBLIC_EXCLUDES = [
  "./public/images/destinations/**",
  "./public/images/**",
  "./public/videos/**",
] as const;

const nextConfig: NextConfig = {
  poweredByHeader: false,
  outputFileTracingExcludes: {
    "/*": [...OUTPUT_TRACE_PUBLIC_EXCLUDES],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80, 82, 85, 88, 90, 92],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2560],
    imageSizes: [256, 384, 480, 640, 750, 828, 960, 1080, 1200, 1400],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "alopatagonia.com" }],
        destination: "https://www.alopatagonia.com/:path*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: "/favicon.png",
      },
    ];
  },
};

export default nextConfig;
