import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "Alo Patagonia",
    description: SITE.about,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0f0d",
    theme_color: "#717336",
    lang: "es-AR",
    icons: [
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icon-dark",
        sizes: "96x96",
        type: "image/png",
      },
    ],
  };
}
