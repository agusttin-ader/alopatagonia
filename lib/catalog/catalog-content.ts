import type {
  AccommodationType,
  CatalogImage,
  CatalogItem,
  DestinationCatalog,
  ExcursionCategory,
} from "@/lib/catalog/types";
import { buildDestinationAccommodationItems } from "@/lib/catalog/accommodation-items";
import { BARILOCHE_HERO_IMAGE } from "@/lib/catalog/bariloche-curated";
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
      name: "Circuito Chico y miradores del Llao Llao",
      category: "aventura",
      description:
        "Unos 60 km por la costa oeste del Nahuel Huapi: bosque de coihues, Bahía López y el clásico mirador del Llao Llao. Ideal para el primer día, en auto propio o con guía.",
      highlights: [
        "Paradas en Punto Panorámico y Colonia Suiza",
        "Vistas al Lago Moreno y al Cerro López",
        "Medio día; se combina bien con una tarde libre en el centro",
      ],
    },
    {
      name: "Navegación Isla Victoria y Bosque de Arrayanes",
      category: "navegacion",
      description:
        "Salida desde Puerto Pañuelo hacia el Parque Nacional Nahuel Huapi. Caminata entre arrayanes centenarios en la península de Quetrihué (acceso según nivel del lago).",
      highlights: [
        "Bosque único de arrayanes en la costa del lago",
        "Isla Victoria con senderos cortos entre cipreses",
        "Opera en temporada alta; conviene reservar con anticipación",
      ],
    },
    {
      name: "Trekking al Refugio Frey",
      category: "trekking",
      description:
        "Subida por el Cerro Catedral hasta el refugio a orillas de la laguna Toncek, con vista directa a las agujas del macizo. Uno de los trekkings más elegidos de Bariloche.",
      highlights: [
        "Unos 10 km ida (4–5 h) desde la base del Catedral",
        "Dificultad media; llevar abrigo aunque sea verano",
        "Se puede hacer por cuenta propia o con guía de montaña",
      ],
    },
  ],
  "san-martin": [
    {
      name: "Ruta de los Siete Lagos",
      category: "aventura",
      description:
        "Tramo escénico entre San Martín y Villa La Angostura (Ruta 40 / 234): Correntoso, Espejo, Lácar y otros lagos con playas de arena volcánica y bosque andino.",
      highlights: [
        "Día completo con paradas en miradores y pueblos",
        "Mejor con auto; también hay salidas organizadas",
        "En invierno puede haber nieve en tramos altos — consultá antes",
      ],
    },
    {
      name: "Navegación Lago Lácar",
      category: "navegacion",
      description:
        "Paseo lacustre desde el muelle de San Martín con vistas al Volcán Lanín y la costa boscosa. Algunas temporadas extienden hasta Quila Quina.",
      highlights: [
        "Aguas más calmas que en el Nahuel Huapi",
        "Apto para familias y adultos mayores",
        "Horarios según viento y nivel del lago",
      ],
    },
    {
      name: "Cascada Chachín y playas del Lácar",
      category: "trekking",
      description:
        "Caminata corta hasta la cascada Chachín (acceso desde ruta hacia Hua Hum) o paseo por playas como Yuco y Catritre, a minutos del centro.",
      highlights: [
        "Opciones de 1 h a medio día según el sendero",
        "Bosque nativo y sonido del río Bonito",
        "Buen plan si no querés una jornada exigente",
      ],
    },
  ],
  "el-chalten": [
    {
      name: "Laguna de los Tres",
      category: "trekking",
      description:
        "El trekking emblema del pueblo: subida al mirador frente al Fitz Roy. Último tramo con pendiente fuerte; la recompensa es la vista al glaciar y las agujas.",
      highlights: [
        "Jornada completa (8–10 h ida y vuelta desde el pueblo)",
        "Salir temprano; llevar comida, agua y capas de abrigo",
        "Si hay viento fuerte en la laguna, conviene reprogramar",
      ],
    },
    {
      name: "Miradores Cóndores y Águilas",
      category: "fauna",
      description:
        "Senderos cortos sobre el pueblo con vista al Fitz Roy, al Cerro Torre y al valle del Río de las Vueltas. Cóndores suele verse al atardecer.",
      highlights: [
        "Menos de 2 h ida y vuelta; dificultad baja",
        "Perfecto el día de llegada para aclimatarse",
        "Atardeceres muy fotogénicos en Águilas",
      ],
    },
    {
      name: "Lago del Desierto y Glaciar Huemul",
      category: "aventura",
      description:
        "Excursión al norte del valle, cerca de la frontera con Chile. Lago turquesa, glaciar colgante y bosque húmedo; requiere más tiempo que los senderos del pueblo.",
      highlights: [
        "Medio o día completo según si cruzás en lancha",
        "Paisaje distinto al circuito clásico del Fitz Roy",
        "Conviene chequear estado de la ruta según la época",
      ],
    },
  ],
  esquel: [
    {
      name: "Parque Nacional Los Alerces",
      category: "fauna",
      description:
        "Patrimonio UNESCO: lagos verde esmeralda y alerces de más de 2.600 años en el bosque templado lluvioso. Entrada por Villa Futalaufquen o Lago Verde.",
      highlights: [
        "Lago Menéndez y mirador del Glaciar Torrecillas",
        "Caminatas guiadas de medio día o jornada completa",
        "Reserva con tiempo en temporada (cupos limitados)",
      ],
    },
    {
      name: "Navegación Lago Futalaufquen",
      category: "navegacion",
      description:
        "Recorrido por el brazo principal del lago dentro del parque, con guías que explican la formación glaciar y la flora del bosque.",
      highlights: [
        "Agua color turquesa entre montañas",
        "Apto para quienes prefieren ir sin mucho esfuerzo físico",
        "Sujeta a viento; en días calmos es espectacular",
      ],
    },
    {
      name: "Valle 16 de Octubre y Trevelin",
      category: "aventura",
      description:
        "Ruta por la colonia galesa de Trevelin: molinos, té casero, cascadas y estepa patagónica. Muy común combinarlo con un día en Los Alerces.",
      highlights: [
        "Cultura galesa viva (panaderías, museos)",
        "Cascada Nant y Fall y miradores de la cordillera",
        "Se hace en auto con paradas; también hay tours de día",
      ],
    },
  ],
  "villa-la-angostura": [
    {
      name: "Bosque de Arrayanes",
      category: "trekking",
      description:
        "Arrayanes naranjas sobre el agua en la península de Quetrihué. Se llega en lancha desde Bahía Brava o por sendero desde el Parque Nacional (según apertura).",
      highlights: [
        "Pasarelas sobre el lago entre árboles centenarios",
        "Combinable con playa Bahía Mansa o centro del pueblo",
        "En invierno el acceso puede variar — preguntanos fechas",
      ],
    },
    {
      name: "Navegación Brazo Machete",
      category: "navegacion",
      description:
        "Salida corta por aguas más protegidas del Nahuel Huapi, con bahías poco concurridas y vista al Volcán Batea Mahuida.",
      highlights: [
        "Ideal con chicos o si es tu primer día en la zona",
        "Posibilidad de ver aves lacustres y bosque costero",
        "Mejor en mañanas de poco viento",
      ],
    },
    {
      name: "Cerro Bayo y miradores invernales",
      category: "aventura",
      description:
        "Centro de ski a 15 km del pueblo; en verano hay chairlift panorámico y rutas de mountain bike. Vistas al Nahuel Huapi y al Corredor de los Lagos.",
      highlights: [
        "Nieve de junio a octubre; pistas para varios niveles",
        "En verano, cumbre accesible sin trekking largo",
        "Atardeceres muy lindos desde la confitería de la cima",
      ],
    },
  ],
  "puerto-madryn": [
    {
      name: "Península Valdés",
      category: "fauna",
      description:
        "Reserva UNESCO: elefantes marinos en Punta Delgada, pingüinos de magallanes en Punta Tombo (temporada) y ballenas en el golfo desde el acantilado.",
      highlights: [
        "Día completo en vehículo con paradas interpretativas",
        "Orcas en Caleta Valdés (feb–abr, sujeto a marea)",
        "Llevar binoculares y abrigo — hace viento todo el año",
      ],
    },
    {
      name: "Avistaje de ballenas en embarcación",
      category: "navegacion",
      description:
        "Salidas desde Puerto Pirámides (Península Valdés) para ver ballenas franca austral a pocos metros del barco. Temporada principal: septiembre a diciembre.",
      highlights: [
        "Regulación estricta para no molestar a los animales",
        "Reservar con semanas de anticipación en temporada alta",
        "Si hay mar gruesa, la salida se reprograma",
      ],
    },
    {
      name: "Punta Loma y reservas costeras",
      category: "aventura",
      description:
        "Lobo marino de un pelo en la reserva de Punta Loma, a 17 km de Madryn. Complemento ideal si no tenés un día entero para la península.",
      highlights: [
        "Medio día desde el centro de Madryn",
        "Mirador sobre el Golfo Nuevo",
        "Se suma bien a un city tour o tarde libre",
      ],
    },
  ],
  "el-calafate": [
    {
      name: "Glaciar Perito Moreno",
      category: "aventura",
      description:
        "Pasarelas frente a una pared de hielo de casi 80 m sobre el Brazo Rico. Desprendimientos y colores azules que cambian con la luz del día.",
      highlights: [
        "Acceso todo el año al Parque Nacional Los Glaciares",
        "Tiempo libre en los miradores + opción navegación sur del glaciar",
        "Conviene llegar temprano en enero y febrero",
      ],
    },
    {
      name: "Navegación Todo Glaciares",
      category: "navegacion",
      description:
        "Día entero por el Brazo Norte del Lago Argentino: Upsala, Spegazzini y témpanos gigantes. Una de las navegaciones más completas del sur.",
      highlights: [
        "Barco hasta el frente de glaciares poco visitados",
        "Incluye traslado desde Calafate y tiempo en cubierta",
        "Reservar con anticipación en verano austral",
      ],
    },
    {
      name: "Reserva Laguna Nimez",
      category: "trekking",
      description:
        "Sendero interpretativo junto al Lago Argentino, a pocos minutos del centro. Flamencos, cisnes de cuello negro y aves migratorias según la estación.",
      highlights: [
        "1–2 h de caminata fácil; buen plan de llegada o de despedida",
        "Atardecer con vista al Lago Argentino",
        "Entrada aparte del parque de glaciares",
      ],
    },
  ],
  traful: [
    {
      name: "Miradores del Lago Traful",
      category: "trekking",
      description:
        "Senderos cortos desde Villa Traful y la Villa Índica con vistas al lago turquesa y al bosque de lengas. Poco tránsito comparado con Bariloche.",
      highlights: [
        "Mirador del Traful y playas de piedra",
        "Caminatas de 1 a 3 h según el circuito",
        "Mejor con calzado cómodo y abrigo por el viento",
      ],
    },
    {
      name: "Navegación al Bosque Sumergido",
      category: "navegacion",
      description:
        "Restos de un bosque sumergido por una erupción volcánica en los años 60. Snorkel o vista desde el barco según operador y condiciones del lago.",
      highlights: [
        "Agua muy clara en días de calma",
        "Guías locales explican la geología del valle",
        "Sujeta a clima; en invierno hay menos frecuencia",
      ],
    },
    {
      name: "Valle Encantado y Ruta 65",
      category: "aventura",
      description:
        "Formaciones rocosas erosionadas por el viento en la Ruta 65, camino a Confluencia. Paisaje lunar a minutos del pueblo.",
      highlights: [
        "Paradas cortas en auto; no hace falta 4x4",
        "Muy fotogénico al atardecer",
        "Combinable con almuerzo en Villa Traful",
      ],
    },
  ],
  ushuaia: [
    {
      name: "Parque Nacional Tierra del Fuego",
      category: "aventura",
      description:
        "Bosque fueguino, turberas y costa del Canal Beagle. Clásicos: Senda Costera, Lapataia (fin de la Ruta 3) y tren del fin del mundo (opcional).",
      highlights: [
        "Medio día o jornada completa según senderos",
        "Vistas a montañas chilenas desde la costa",
        "Viento fuerte frecuente — capa impermeable obligatoria",
      ],
    },
    {
      name: "Navegación Canal Beagle",
      category: "navegacion",
      description:
        "Recorrido por el canal que separa Argentina de Chile: Faro Les Éclaireurs, Isla de los Pájaros y lobos marinos en Isla de los Lobos.",
      highlights: [
        "Salidas de 4–6 h desde el puerto de Ushuaia",
        "Posibilidad de pisar Estancia Harberton (según tour)",
        "Hace frío en cubierta aunque sea verano",
      ],
    },
    {
      name: "Trekking Laguna Esmeralda",
      category: "trekking",
      description:
        "Bosque de lengas y turberas hasta una laguna glaciar color esmeralda, con vista al Valle de Tierra Mayor. Uno de los treks más populares de la ciudad.",
      highlights: [
        "Unas 4–5 h ida y vuelta; barro en tramos finales",
        "Botas impermeables casi obligatorias",
        "En invierno puede requerir raquetas o crampones",
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
  if (type === "departamento") {
    return [
      `Ubicación en ${destinationName} según la unidad que elijas`,
      "Cocina y espacio para varios días sin depender del restaurante",
      "Buena opción para parejas o familias chicas",
      "Fechas y check-in los vemos por WhatsApp",
    ];
  }
  if (type === "cabana") {
    return [
      `Entorno natural en ${destinationName}`,
      "Más espacio y privacidad que un hotel",
      "Ideal si vas a cocinar o quedarte varios días",
      "Preguntanos capacidad, camas y qué incluye la estadía",
    ];
  }
  return [
    `Hotel en ${destinationName}, cerca de las salidas del día`,
    "Desayuno y servicios según categoría del establecimiento",
    "Disponibilidad según temporada — escribinos con tus fechas",
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
      description: `${label} en ${destinationName} para quedarte varios días y salir a recorrer la zona.`,
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
        `Excursión en ${destinationName}. Fechas y salidas según temporada.`,
      highlights: content?.highlights ?? [
        `Salidas desde ${destinationName} con guías locales`,
        "Horarios y cupos según temporada y clima",
        "Te pasamos qué llevar y cómo vestirte",
        "Reservá con tiempo en enero, febrero y julio",
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

function buildDestinationAccommodations(
  slug: string,
  name: string,
  imagePaths: string[],
): CatalogItem[] {
  const fromFolders = buildDestinationAccommodationItems(slug, name);
  if (fromFolders.length > 0) return fromFolders;

  const accommodationPools = splitAccommodationPools(imagePaths);
  return buildStandardAccommodations(slug, name, accommodationPools);
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

  return {
    slug: config.slug,
    name: config.name,
    region: config.region,
    intro: config.intro,
    heroImage: hero,
    accommodations: buildDestinationAccommodations(
      config.slug,
      config.name,
      config.imagePaths,
    ),
    excursions: buildExcursions(
      config.slug,
      buildExcursionImageGroups(config.imagePaths),
      config.name,
    ),
    carRental: {
      operatorName: "Operador local",
      description: `Auto en ${config.name} para recorrer rutas largas con libertad. Te pasamos el contacto del operador que usamos en la zona.`,
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
      description: `Auto en ${config.name} para recorrer rutas largas con libertad. Te pasamos el contacto del operador que usamos en la zona.`,
      images: [toCatalogImage(hero, `Auto en ${config.name}`)],
    },
    published: true,
  };
}

export function buildBarilocheCatalog(): DestinationCatalog {
  const all = getDestinationImagePaths("bariloche");
  const per = CATALOG_LIMITS.imagesPerCatalogItem;
  const excursionPool = pathsInAnyFolder(all, CATALOG_EXCURSION_FOLDERS);

  return {
    slug: "bariloche",
    name: "Bariloche",
    region: "San Carlos de Bariloche · Río Negro",
    intro:
      "Capital del Nahuel Huapi: Circuito Chico, Cerro Catedral y navegaciones que salen desde Puerto Pañuelo.",
    heroImage: BARILOCHE_HERO_IMAGE,
    accommodations: buildDestinationAccommodations("bariloche", "Bariloche", all),
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
      description:
        "Auto en Bariloche para Circuito Chico, Siete Lagos o ir a San Martín. Te pasamos el contacto del operador local.",
      images: [toCatalogImage(BARILOCHE_HERO_IMAGE, "Auto en Bariloche")],
    },
    published: true,
  };
}
