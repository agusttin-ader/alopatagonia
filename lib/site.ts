/** Datos del sitio — módulo liviano sin Lucide ni arrays grandes. */
export const SITE = {
  name: "Alo Patagonia",
  logo: "/images/logo/logo-alo.png",
  logoOnLight: "/images/logo/logo-alo-black.png",
  /** Variantes con fondo transparente para favicon. */
  faviconOnDark: "/images/logo/logo-alo-favicon-dark.png",
  faviconOnLight: "/images/logo/logo-alo-favicon-light.png",
  /** Imagen social por defecto (logo sobre fondo de marca). */
  ogImage: "/opengraph-image",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: "Alo Patagonia — viajes por la Patagonia Argentina",
  instagram: "https://www.instagram.com/alo_patagonia",
  instagramHandle: "alo_patagonia",
  email: "alopatagonia.arg@gmail.com",
  phoneDisplay: "+54 9 11 7095 4933",
  location: "Patagonia, Argentina",
  about:
    "Coordinamos auto, alojamiento y excursiones en un mismo plan por la Patagonia Argentina.",
} as const;
