import type {
  AccommodationType,
  CatalogImage,
  CatalogItem,
  DestinationCatalog,
  ExcursionCategory,
} from "@/lib/catalog/types";
import {
  BARILOCHE_CURATED,
  BARILOCHE_HERO_IMAGE,
} from "@/lib/catalog/bariloche-curated";
import { getDestinationImagePaths } from "@/lib/catalog/destination-images";
import {
  CATALOG_ACCOMMODATION_FOLDERS,
  CATALOG_EXCURSION_FOLDERS,
  CATALOG_NATURE_FOLDERS,
  pathIncludesFolder,
  pathMatchesAnyFolder,
  pathsInAnyFolder,
} from "@/lib/catalog/path-matching";

export const CATALOG_LIMITS = {
  itemsPerAccommodationType: 1,
  imagesPerCatalogItem: 6,
  maxExcursions: 3,
} as const;

export const CATALOG_PLACEHOLDER_IMAGE = "/images/IMG_1506.jpeg";

const ACCOMMODATION_LABELS: Record<AccommodationType, string> = {
  cabana: "Cabaña",
  departamento: "Departamento",
  hostel: "Hotel",
};

const ACCOMMODATION_ITEM_SLUGS: Record<AccommodationType, string> = {
  cabana: "cabana-1",
  departamento: "depto-1",
  hostel: "hotel-1",
};

type ExcursionContent = {
  name: string;
  category: ExcursionCategory;
  description: string;
  highlights: string[];
};

const EXCURSION_CONTENT_BY_DESTINATION: Record<string, ExcursionContent[]> = {
  bariloche: [
    {
      name: "Circuito Chico + Punto Panorámico",
      category: "aventura",
      description: "Recorrido escénico por lagos, bosque andino y miradores clásicos de Bariloche.",
      highlights: [
        "Paradas en miradores y puntos fotográficos",
        "Ideal para primer día en destino",
        "Salida de medio día con guía local",
      ],
    },
    {
      name: "Navegación Isla Victoria y Arrayanes",
      category: "navegacion",
      description: "Navegación por el Nahuel Huapi con visita a bosques únicos y senderos suaves.",
      highlights: [
        "Embarque según clima y temporada",
        "Tiempo libre para recorrer senderos",
        "Recomendado para familias y parejas",
      ],
    },
    {
      name: "Trekking Refugio Frey",
      category: "trekking",
      description: "Caminata de montaña con vistas al cordón andino y lagunas de altura.",
      highlights: [
        "Nivel medio/alto según ritmo",
        "Sugerimos calzado técnico y abrigo",
        "Coordinamos salida privada o grupal",
      ],
    },
  ],
  "san-martin": [
    {
      name: "Ruta de los 7 Lagos",
      category: "aventura",
      description: "Excursión escénica entre lagos patagónicos y bosques nativos.",
      highlights: [
        "Paradas panorámicas durante todo el día",
        "Ideal para combinar con Villa La Angostura",
        "Salida flexible según clima",
      ],
    },
    {
      name: "Navegación Lago Lácar",
      category: "navegacion",
      description: "Paseo lacustre con vistas de montaña y costa boscosa.",
      highlights: [
        "Recorrido apto para todas las edades",
        "Incluye coordinación de horarios",
        "Recomendable en días de calma",
      ],
    },
    {
      name: "Sendero Arrayán y Miradores",
      category: "trekking",
      description: "Caminata de dificultad moderada con vistas abiertas sobre el lago.",
      highlights: [
        "Trekking de media jornada",
        "Posibilidad de guía local",
        "Opción ideal para viajeros activos",
      ],
    },
  ],
  "el-chalten": [
    {
      name: "Laguna de los Tres",
      category: "trekking",
      description: "Sendero icónico con vistas directas al Fitz Roy en su tramo final.",
      highlights: [
        "Jornada completa de trekking",
        "Salida temprana recomendada",
        "Paisaje de alta montaña",
      ],
    },
    {
      name: "Mirador Cóndores y Águilas",
      category: "fauna",
      description: "Recorrido corto para observar aves y panorámicas del valle.",
      highlights: [
        "Excursión ideal para media tarde",
        "Apta para combinar con otros paseos",
        "Vistas abiertas de cerros y río",
      ],
    },
    {
      name: "Lago del Desierto",
      category: "aventura",
      description: "Salida panorámica hacia el norte del valle con caminatas opcionales.",
      highlights: [
        "Paisajes glaciares y bosque nativo",
        "Opciones de trekking suave o intermedio",
        "Paradas fotográficas incluidas",
      ],
    },
  ],
  esquel: [
    {
      name: "Parque Nacional Los Alerces",
      category: "fauna",
      description: "Jornada entre lagos y bosque antiguo, ideal para contacto pleno con la naturaleza.",
      highlights: [
        "Recorrido por áreas protegidas",
        "Interpretación de flora y fauna local",
        "Salidas durante todo el año",
      ],
    },
    {
      name: "Navegación Lago Futalaufquen",
      category: "navegacion",
      description: "Paseo lacustre por uno de los paisajes más representativos de la comarca andina.",
      highlights: [
        "Navegación tranquila y panorámica",
        "Apta para familias",
        "Sujeta a condiciones de viento",
      ],
    },
    {
      name: "Valle 16 de Octubre",
      category: "aventura",
      description: "Circuito por Trevelin y alrededores con foco en paisaje y cultura local.",
      highlights: [
        "Visita a zonas rurales y miradores",
        "Ideal para combinar con gastronomía local",
        "Opción de día completo",
      ],
    },
  ],
  "villa-la-angostura": [
    {
      name: "Bosque de Arrayanes",
      category: "trekking",
      description: "Sendero costero por bosque nativo con vistas al Nahuel Huapi.",
      highlights: [
        "Trekking de dificultad moderada",
        "Camino entre bosque y costa",
        "Se puede combinar con navegación",
      ],
    },
    {
      name: "Navegación Brazo Machete",
      category: "navegacion",
      description: "Paseo lacustre corto para explorar bahías y playas escondidas.",
      highlights: [
        "Ideal en días de buen tiempo",
        "Paisajes de agua turquesa",
        "Salida relajada de media jornada",
      ],
    },
    {
      name: "Cerro Bayo Panorámico",
      category: "aventura",
      description: "Ascenso escénico con vistas abiertas al cordón de lagos.",
      highlights: [
        "Opciones de ascenso según temporada",
        "Miradores de altura",
        "Apta para viajeros con buen estado físico",
      ],
    },
  ],
  "puerto-madryn": [
    {
      name: "Península Valdés Fauna Marina",
      category: "fauna",
      description: "Recorrido completo para avistaje de fauna en áreas naturales protegidas.",
      highlights: [
        "Posibilidad de ver lobos, elefantes y aves",
        "Temporadas de fauna bien marcadas",
        "Salida de día completo",
      ],
    },
    {
      name: "Avistaje embarcado",
      category: "navegacion",
      description: "Salida en embarcación para observar fauna marina en su hábitat natural.",
      highlights: [
        "Experiencia sujeta a temporada",
        "Navegación corta con guía",
        "Ideal para amantes de la naturaleza",
      ],
    },
    {
      name: "Punta Loma y costa patagónica",
      category: "aventura",
      description: "Circuito costero con paradas en miradores y reservas cercanas.",
      highlights: [
        "Accesible para todo tipo de viajeros",
        "Excelente para fotografía de costa",
        "Combinable con city tour",
      ],
    },
  ],
  "el-calafate": [
    {
      name: "Glaciar Perito Moreno",
      category: "aventura",
      description: "Excursión clásica por pasarelas y miradores frente al glaciar.",
      highlights: [
        "Tiempo libre para recorrer pasarelas",
        "Salidas regulares durante todo el año",
        "Experiencia ideal para primer viaje al destino",
      ],
    },
    {
      name: "Navegación Todo Glaciares",
      category: "navegacion",
      description: "Navegación por el Lago Argentino con vistas de glaciares y témpanos.",
      highlights: [
        "Salida de jornada completa",
        "Paisajes de hielo azul profundo",
        "Recomendable reservar con anticipación",
      ],
    },
    {
      name: "Trekking Laguna Capri",
      category: "trekking",
      description: "Caminata suave entre bosque y miradores con vista al Fitz Roy a la distancia.",
      highlights: [
        "Opción activa de medio día",
        "Ideal para quienes buscan caminar sin gran exigencia",
        "Se adapta según clima",
      ],
    },
  ],
  traful: [
    {
      name: "Miradores del Lago Traful",
      category: "trekking",
      description: "Senderos cortos hacia miradores naturales con vistas del lago.",
      highlights: [
        "Recorridos aptos para media jornada",
        "Bosque nativo y aguas cristalinas",
        "Ideal para fotografía de paisaje",
      ],
    },
    {
      name: "Navegación al Bosque Sumergido",
      category: "navegacion",
      description: "Excursión lacustre para conocer uno de los clásicos de Villa Traful.",
      highlights: [
        "Salida sujeta a condiciones de lago",
        "Guías locales durante el recorrido",
        "Experiencia tranquila y panorámica",
      ],
    },
    {
      name: "Valle Encantado y Ruta escénica",
      category: "aventura",
      description: "Circuito por ruta panorámica con formaciones naturales y miradores.",
      highlights: [
        "Ideal para combinar con traslado en auto",
        "Paradas cortas en puntos destacados",
        "Recomendado en cualquier época del año",
      ],
    },
  ],
  ushuaia: [
    {
      name: "Parque Nacional Tierra del Fuego",
      category: "aventura",
      description: "Recorrido costero y de bosque austral por senderos emblemáticos del parque.",
      highlights: [
        "Excursión de media jornada o completa",
        "Paisajes del fin del mundo",
        "Apta para combinar con navegación",
      ],
    },
    {
      name: "Navegación Canal Beagle",
      category: "navegacion",
      description: "Paseo por el Beagle con faros, islotes y fauna marina.",
      highlights: [
        "Salida clásica en Ushuaia",
        "Vistas del canal y montañas nevadas",
        "Ideal para todas las edades",
      ],
    },
    {
      name: "Trekking Laguna Esmeralda",
      category: "trekking",
      description: "Caminata por turberas y bosque fueguino hacia una laguna de montaña.",
      highlights: [
        "Dificultad moderada según temporada",
        "Requiere calzado impermeable",
        "Paisaje destacado en otoño e invierno",
      ],
    },
  ],
};

export function buildCatalogWhatsAppMessage(itemName: string, destinationName: string) {
  return `Hola! Me interesa ${itemName} en ${destinationName}. ¿Me ayudan?`;
}

export function buildCarRentalWhatsAppMessage(destinationName: string) {
  return `Hola! Quiero consultar por alquiler de auto en ${destinationName}. ¿Me ayudan?`;
}

function toCatalogImage(src: string, alt: string): CatalogImage {
  return { src, alt };
}

function withFallbackImages(paths: string[]): string[] {
  return paths.length > 0 ? paths : [CATALOG_PLACEHOLDER_IMAGE];
}

function defaultHighlights(type: AccommodationType, destinationName: string): string[] {
  const base = destinationName;
  if (type === "departamento") {
    return [
      `Ubicación céntrica o residencial en ${base}`,
      "Ideal para parejas o familias chicas",
      "Cocina equipada y espacio para descansar",
      "Coordinamos fechas y check-in por WhatsApp",
    ];
  }
  if (type === "cabana") {
    return [
      `Entorno natural cerca de ${base}`,
      "Más privacidad y espacio que un hotel",
      "Buena opción para varios días de estadía",
      "Consultá capacidad y servicios incluidos",
    ];
  }
  return [
    `Opción cómoda en ${base}`,
    "Servicios de hotel según categoría",
    "Buena base para salidas diarias",
    "Disponibilidad según temporada",
  ];
}

function accommodationDisplayName(type: AccommodationType, destinationName: string): string {
  if (type === "cabana") return `Cabaña en ${destinationName}`;
  if (type === "departamento") return `Departamento en ${destinationName}`;
  return `Hotel en ${destinationName}`;
}

function buildAccommodationItems(
  slugPrefix: string,
  type: AccommodationType,
  paths: string[],
  destinationName: string,
): CatalogItem[] {
  const label = ACCOMMODATION_LABELS[type];
  const group = withFallbackImages(paths).slice(0, CATALOG_LIMITS.imagesPerCatalogItem);
  const name = accommodationDisplayName(type, destinationName);

  return [
    {
      id: `${slugPrefix}-${type}-1`,
      itemSlug: ACCOMMODATION_ITEM_SLUGS[type],
      name,
      type,
      description: `Alojamiento tipo ${label.toLowerCase()} en ${destinationName}, pensado para usar como base de viaje.`,
      highlights: defaultHighlights(type, destinationName),
      images: group.map((src, i) => toCatalogImage(src, `${name} — foto ${i + 1}`)),
    },
  ];
}

function buildExcursions(
  slug: string,
  pools: string[][],
  destinationName: string,
): CatalogItem[] {
  const excursionContent = EXCURSION_CONTENT_BY_DESTINATION[slug] ?? [];

  return pools.slice(0, CATALOG_LIMITS.maxExcursions).map((pool, index) => {
    const num = index + 1;
    const group = withFallbackImages(pool).slice(0, CATALOG_LIMITS.imagesPerCatalogItem);
    const content = excursionContent[index];
    const name = content?.name ?? `Excursión en ${destinationName}`;

    return {
      id: `${slug}-excursion-${num}`,
      itemSlug: `excursion-${num}`,
      name,
      category: content?.category,
      description:
        content?.description ??
        `Excursión en ${destinationName}. Duración y salidas coordinadas según temporada.`,
      highlights: content?.highlights ?? [
        `Salidas desde ${destinationName}`,
        "Grupos reducidos o salida privada según opción",
        "Incluye coordinación y recomendaciones locales",
        "Reservá con anticipación en temporada alta",
      ],
      images: group.map((src, i) => toCatalogImage(src, `${name} — foto ${i + 1}`)),
    };
  });
}

export function pathsInSubfolder(imagePaths: string[], subfolder: string): string[] {
  return imagePaths.filter((path) => pathIncludesFolder(path, subfolder));
}

function splitAccommodationPools(imagePaths: string[]) {
  const per = CATALOG_LIMITS.imagesPerCatalogItem;
  const all = pathsInAnyFolder(imagePaths, CATALOG_ACCOMMODATION_FOLDERS);
  const cabana = all.filter((path) =>
    pathMatchesAnyFolder(path, ["cabanas", "cabana", "Bariloche cabañas"]),
  );
  const departamento = all.filter((path) =>
    pathMatchesAnyFolder(path, ["dptos", "departamento", "Bariloche dptos"]),
  );
  const hostel = all.filter((path) =>
    pathMatchesAnyFolder(path, ["hoteles", "hostel", "Bariloche Hoteles"]),
  );

  if (cabana.length || departamento.length || hostel.length) {
    return {
      cabana: (cabana.length ? cabana : all).slice(0, per),
      departamento: (departamento.length ? departamento : all).slice(0, per),
      hostel: (hostel.length ? hostel : all).slice(0, per),
    };
  }

  return {
    cabana: all.slice(0, per),
    departamento: all.slice(per, per * 2),
    hostel: all.slice(per * 2, per * 3),
  };
}

function buildExcursionImageGroups(imagePaths: string[]) {
  const per = CATALOG_LIMITS.imagesPerCatalogItem;
  const namedGroups = [
    pathsInSubfolder(imagePaths, "excursion-1"),
    pathsInSubfolder(imagePaths, "excursion-2"),
    pathsInSubfolder(imagePaths, "excursion-3"),
  ];

  if (namedGroups.some((group) => group.length > 0)) {
    return namedGroups;
  }

  const pool = pathsInAnyFolder(imagePaths, CATALOG_EXCURSION_FOLDERS);
  return [
    pool.slice(0, per),
    pool.slice(per, per * 2),
    pool.slice(per * 2, per * 3),
  ];
}

function pickCatalogHeroImage(
  imagePaths: string[],
  heroImage?: string,
): string {
  return (
    heroImage ??
    pathsInAnyFolder(imagePaths, CATALOG_NATURE_FOLDERS)[0] ??
    pathsInAnyFolder(imagePaths, CATALOG_ACCOMMODATION_FOLDERS)[0] ??
    imagePaths[0] ??
    CATALOG_PLACEHOLDER_IMAGE
  );
}

export function buildStandardAccommodations(
  slug: string,
  name: string,
  pools: { cabana: string[]; departamento: string[]; hostel: string[] },
): CatalogItem[] {
  const per = CATALOG_LIMITS.imagesPerCatalogItem;
  return [
    ...buildAccommodationItems(slug, "cabana", pools.cabana.slice(0, per), name),
    ...buildAccommodationItems(slug, "departamento", pools.departamento.slice(0, per), name),
    ...buildAccommodationItems(slug, "hostel", pools.hostel.slice(0, per), name),
  ];
}

export function buildFlatCatalog(config: {
  slug: string;
  name: string;
  region: string;
  intro: string;
  imagePaths: string[];
  heroImage?: string;
}): DestinationCatalog {
  const hero = pickCatalogHeroImage(config.imagePaths, config.heroImage);
  const accommodationPools = splitAccommodationPools(config.imagePaths);

  return {
    slug: config.slug,
    name: config.name,
    region: config.region,
    intro: config.intro,
    heroImage: hero,
    accommodations: buildStandardAccommodations(config.slug, config.name, accommodationPools),
    excursions: buildExcursions(
      config.slug,
      buildExcursionImageGroups(config.imagePaths),
      config.name,
    ),
    carRental: {
      operatorName: "Operador local",
      description: `Alquiler de auto en ${config.name} con operador local.`,
      images: [toCatalogImage(hero, `Auto en ${config.name}`)],
    },
    published: true,
  };
}

export function buildStructuredCatalog(config: {
  slug: string;
  name: string;
  region: string;
  intro: string;
  imagePaths: string[];
  heroImage?: string;
}): DestinationCatalog {
  const hero = pickCatalogHeroImage(config.imagePaths, config.heroImage);
  const accommodationPools = splitAccommodationPools(config.imagePaths);

  return {
    slug: config.slug,
    name: config.name,
    region: config.region,
    intro: config.intro,
    heroImage: hero,
    accommodations: buildStandardAccommodations(config.slug, config.name, accommodationPools),
    excursions: buildExcursions(
      config.slug,
      buildExcursionImageGroups(config.imagePaths),
      config.name,
    ),
    carRental: {
      operatorName: "Operador local",
      description: `Alquiler de auto en ${config.name} con operador local.`,
      images: [toCatalogImage(hero, `Auto en ${config.name}`)],
    },
    published: true,
  };
}

export function buildBarilocheCatalog(): DestinationCatalog {
  const { cabana, departamento, hotel3, hotel4 } = BARILOCHE_CURATED;
  const all = getDestinationImagePaths("bariloche");
  const per = CATALOG_LIMITS.imagesPerCatalogItem;

  const cabanaPaths = all.filter((src) =>
    pathMatchesAnyFolder(src, ["Bariloche cabañas", "cabanas"]),
  );
  const deptoPaths = all.filter((src) =>
    pathMatchesAnyFolder(src, ["Bariloche dptos", "dptos"]),
  );
  const hotelPaths = all.filter((src) =>
    pathMatchesAnyFolder(src, ["Bariloche Hoteles", "hoteles"]),
  );
  const excursionPool = pathsInAnyFolder(all, CATALOG_EXCURSION_FOLDERS);

  return {
    slug: "bariloche",
    name: "Bariloche",
    region: "San Carlos de Bariloche · Río Negro",
    intro:
      "A orillas del Nahuel Huapi: capital nacional del turismo aventura y puerta a los lagos andinos.",
    heroImage: BARILOCHE_HERO_IMAGE,
    accommodations: buildStandardAccommodations("bariloche", "Bariloche", {
      cabana: cabanaPaths.length > 0 ? cabanaPaths.slice(0, per) : [cabana],
      departamento: deptoPaths.length > 0 ? deptoPaths.slice(0, per) : [departamento],
      hostel: hotelPaths.length > 0 ? hotelPaths.slice(0, per) : [hotel3, hotel4],
    }),
    excursions: buildExcursions(
      "bariloche",
      [
        excursionPool.slice(0, per),
        excursionPool.slice(per, per * 2),
        excursionPool.slice(per * 2, per * 3),
      ],
      "Bariloche",
    ),
    carRental: {
      operatorName: "Operador local",
      description: "Alquiler de auto en Bariloche con operador local.",
      images: [toCatalogImage(BARILOCHE_HERO_IMAGE, "Auto en Bariloche")],
    },
    published: true,
  };
}
