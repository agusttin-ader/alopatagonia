/** Datos del sitio — módulo liviano sin Lucide ni arrays grandes. */
export const SITE = {
  name: "Alo Patagonia",
  logo: "/images/logo/logo-alo.png",
  logoOnLight: "/images/logo/logo-alo-black.png",
  /** Variantes con fondo transparente para favicon. */
  faviconOnDark: "/images/logo/logo-alo-favicon-dark.png",
  faviconOnLight: "/images/logo/logo-alo-favicon-light.png",
  /** Cuadrados optimizados para pestañas (generados en prebuild). */
  faviconDark96: "/favicon-dark-96.png",
  faviconLight96: "/favicon-96.png",
  /** Logo sobre verde de marca — ideal para Google y crawlers. */
  faviconBrand96: "/favicon-brand-96.png",
  faviconBrand48: "/favicon-brand-48.png",
  /** Imagen social por defecto (logo sobre fondo de marca). */
  ogImage: "/opengraph-image",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: "Alo Patagonia — agencia de viajes en la Patagonia argentina",
  instagram: "https://www.instagram.com/alo_patagonia",
  instagramHandle: "alo_patagonia",
  email: "alopatagonia.arg@gmail.com",
  phoneDisplay: "+54 9 11 7095 4933",
  location: "Patagonia, Argentina",
  about:
    "Te ayudamos con auto, alojamiento y excursiones en la Patagonia — todo desde un solo WhatsApp.",
  designer: {
    name: "Agustín Ader",
    /** Lockup completo con fondo transparente. */
    logo: "/images/logo/logo-marca-agus.png",
    /** Lockup recortado para footer (sin márgenes). */
    logoLockup: "/images/logo/logo-marca-agus-lockup.png",
    url: "https://www.agustinaderdev.com/",
  },
} as const;
