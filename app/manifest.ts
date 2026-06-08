import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "Alo Patagonia",
    description: SITE.about,
    start_url: "/",
    display: "standalone",
    background_color: "#1a2f26",
    theme_color: "#717336",
    lang: "es-AR",
    icons: [
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/favicon-96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/favicon.png",
        sizes: "48x48",
        type: "image/png",
      },
    ],
  };
}
