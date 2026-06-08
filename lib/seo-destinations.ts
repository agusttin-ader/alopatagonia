export type SeoFaqItem = {
  question: string;
  answer: string;
};

export type DestinationSeoConfig = {
  seoTitle: string;
  seoDescription: string;
  /** Párrafo visible en la página del destino (contenido indexable). */
  seoIntro: string;
  keywords: string[];
  faq: SeoFaqItem[];
};

export const SITE_SEO = {
  home: {
    title: "Viajes Patagonia Argentina — Bariloche, Ushuaia y El Calafate",
    description:
      "Viajes a la Patagonia con auto, hotel y excursiones. Bariloche, Calafate, Ushuaia, Madryn y más. Escribinos por WhatsApp.",
    keywords: [
      "viajes patagonia",
      "patagonia argentina",
      "turismo patagonia",
      "vacaciones patagonia",
      "organizar viaje patagonia",
      "bariloche",
      "ushuaia",
      "el calafate",
    ],
  },
  destinos: {
    title: "Destinos en la Patagonia Argentina",
    description:
      "Nueve destinos en la Patagonia argentina: alojamiento, excursiones y auto en cada uno.",
    intro:
      "Elegí por dónde empezar. En cada destino tenemos alojamientos, excursiones y auto — todo lo vemos desde acá.",
    keywords: [
      "destinos patagonia",
      "turismo patagonia argentina",
      "viajes bariloche",
      "viajes el calafate",
      "viajes ushuaia",
      "san martin de los andes",
      "puerto madryn",
      "el chalten",
    ],
  },
  alojamientos: {
    title: "Alojamientos en la Patagonia — hoteles, cabañas y departamentos",
    description:
      "Cabañas, deptos y hoteles en Bariloche, Chaltén, Madryn, Ushuaia y más. Preguntanos qué hay libre.",
    keywords: [
      "alojamiento patagonia",
      "hoteles bariloche",
      "cabañas patagonia",
      "departamentos bariloche",
      "hostel patagonia",
    ],
  },
  excursiones: {
    title: "Excursiones en la Patagonia — trekking, navegación y fauna",
    description:
      "Trekking, navegación, glaciares y fauna en la Patagonia. Reservá por WhatsApp.",
    keywords: [
      "excursiones patagonia",
      "excursiones bariloche",
      "trekking el chalten",
      "glaciar perito moreno",
      "ballenas puerto madryn",
    ],
  },
  planner: {
    title: "Planear viaje Patagonia — consulta por WhatsApp",
    description:
      "Completá destino y fechas. Te dejamos el mensaje listo para WhatsApp con alojamiento, auto y excursiones.",
    keywords: [
      "planear viaje patagonia",
      "itinerario patagonia",
      "viaje bariloche",
      "consulta viaje patagonia",
    ],
  },
} as const;

export const SITE_FAQ: SeoFaqItem[] = [
  {
    question: "¿Cómo organizo un viaje completo por la Patagonia?",
    answer:
      "Escribinos por WhatsApp con destino, fechas y cuántos son. Te armamos auto, alojamiento y excursiones en un mismo itinerario.",
  },
  {
    question: "¿Qué destinos patagónicos cubren?",
    answer:
      "Trabajamos Bariloche, San Martín de los Andes, Villa La Angostura, El Chaltén, Esquel, Puerto Madryn, El Calafate, Traful y Ushuaia, entre otros puntos de la Patagonia argentina.",
  },
  {
    question: "¿Puedo reservar solo alojamiento o solo excursiones?",
    answer:
      "Sí. Podés consultar por alojamiento, excursiones o alquiler de auto por separado, aunque te conviene armar todo junto para no perder tiempo en traslados.",
  },
];

/** Destinos destacados para enlazado interno (footer, hubs). */
export const SEO_POPULAR_DESTINATIONS = [
  { slug: "bariloche", label: "Bariloche" },
  { slug: "san-martin", label: "San Martín de los Andes" },
  { slug: "traful", label: "Villa Traful" },
  { slug: "villa-la-angostura", label: "Villa La Angostura" },
  { slug: "esquel", label: "Esquel / Trevelin" },
  { slug: "puerto-madryn", label: "Puerto Madryn" },
  { slug: "el-calafate", label: "El Calafate" },
  { slug: "el-chalten", label: "El Chaltén" },
  { slug: "ushuaia", label: "Ushuaia" },
] as const;

const DESTINATION_SEO: Record<string, DestinationSeoConfig> = {
  bariloche: {
    seoTitle: "Viajes a Bariloche — alojamiento, excursiones y auto",
    seoDescription:
      "Bariloche: hotel, cabañas, Circuito Chico y auto. Escribinos por WhatsApp.",
    seoIntro:
      "Bariloche es el clásico del sur: lagos, bosque y montaña en el Nahuel Huapi. Te ayudamos con hotel, excursiones y el auto para recorrer la zona.",
    keywords: [
      "bariloche",
      "viajes bariloche",
      "turismo bariloche",
      "alojamiento bariloche",
      "excursiones bariloche",
      "vacaciones bariloche",
      "auto bariloche",
    ],
    faq: [
      {
        question: "¿Cuántos días conviene estar en Bariloche?",
        answer:
          "Para una primera visita recomendamos entre 4 y 7 días, según si querés sumar Circuito Chico, Cerro Catedral, navegaciones y alguna salida a San Martín o Villa La Angostura.",
      },
      {
        question: "¿Qué incluye un viaje organizado a Bariloche?",
        answer:
          "Hotel, auto y excursiones según la temporada. Todo lo charlamos por WhatsApp con fechas claras.",
      },
    ],
  },
  "san-martin": {
    seoTitle: "Viajes a San Martín de los Andes — alojamiento y excursiones",
    seoDescription:
      "San Martín de los Andes: hoteles, cabañas, Ruta de los 7 Lagos y excursiones. Escribinos por WhatsApp.",
    seoIntro:
      "Más tranquilo que Bariloche: bosque, Lácar y la ruta de los Siete Lagos. Buena base para trekking y para ir sin apuro.",
    keywords: [
      "san martin de los andes",
      "viajes san martin de los andes",
      "turismo san martin de los andes",
      "alojamiento san martin de los andes",
      "ruta de los 7 lagos",
    ],
    faq: [
      {
        question: "¿San Martín de los Andes se combina con Bariloche?",
        answer:
          "Sí. Es uno de los circuitos más elegidos en la Patagonia norte: muchos viajeros enlazan Bariloche, Villa La Angostura y San Martín en una misma ruta en auto.",
      },
    ],
  },
  "el-chalten": {
    seoTitle: "Viajes a El Chaltén — trekking, alojamiento y excursiones",
    seoDescription:
      "El Chaltén: alojamiento, Laguna de los Tres, Fitz Roy y senderos. Escribinos por WhatsApp.",
    seoIntro:
      "El Chaltén es trekking puro, al pie del Fitz Roy. Te ayudamos con el hotel y las salidas según el clima.",
    keywords: [
      "el chalten",
      "viajes el chalten",
      "trekking el chalten",
      "fitz roy",
      "laguna de los tres",
      "alojamiento el chalten",
    ],
    faq: [
      {
        question: "¿Cuándo es la mejor época para ir a El Chaltén?",
        answer:
          "La temporada alta va de octubre a abril, con más servicios abiertos. En invierno hay menos opciones, pero el paisaje vale la pena si ya conocés trekking en frío.",
      },
    ],
  },
  esquel: {
    seoTitle: "Viajes a Esquel y Trevelin — Patagonia andina",
    seoDescription:
      "Esquel y Trevelin: alojamiento, Los Alerces, La Hoya y excursiones. Escribinos por WhatsApp.",
    seoIntro:
      "Esquel y Trevelin: alerces, La Hoya en invierno y el Tren La Trochita. Estepa y cordillera en el sur de Chubut.",
    keywords: [
      "esquel",
      "trevelin",
      "viajes esquel",
      "turismo esquel",
      "parque nacional los alerces",
      "alojamiento esquel",
    ],
    faq: [
      {
        question: "¿Qué hacer en Esquel y Trevelin?",
        answer:
          "Los Alerces, La Hoya en invierno, el Tren La Trochita y paseos por la estepa y los bosques son clásicos. Podemos armar alojamiento y excursiones según fechas.",
      },
    ],
  },
  "villa-la-angostura": {
    seoTitle: "Viajes a Villa La Angostura — alojamiento y excursiones",
    seoDescription:
      "Villa La Angostura: hoteles, cabañas, Bosque de Arrayanes y excursiones. Escribinos por WhatsApp.",
    seoIntro:
      "Pueblo chico en el Nahuel Huapi, a pasos del Bosque de Arrayanes. Funciona solo o en combo con Bariloche y San Martín.",
    keywords: [
      "villa la angostura",
      "viajes villa la angostura",
      "turismo villa la angostura",
      "bosque de arrayanes",
      "alojamiento villa la angostura",
    ],
    faq: [
      {
        question: "¿Villa La Angostura conviene para familias?",
        answer:
          "Sí. Tiene paseos accesibles, navegaciones y un ritmo más pausado que otros destinos. Podemos recomendar alojamiento y salidas según edades y fechas.",
      },
    ],
  },
  "puerto-madryn": {
    seoTitle: "Viajes a Puerto Madryn — ballenas, fauna y excursiones",
    seoDescription:
      "Puerto Madryn y Península Valdés: alojamiento, ballenas, pingüinos y excursiones. Escribinos por WhatsApp.",
    seoIntro:
      "Desde Madryn salís a ver ballenas y pingüinos. Te avisamos qué fechas convienen y armamos hotel + excursiones.",
    keywords: [
      "puerto madryn",
      "viajes puerto madryn",
      "ballenas puerto madryn",
      "peninsula valdes",
      "turismo puerto madryn",
      "alojamiento puerto madryn",
    ],
    faq: [
      {
        question: "¿Cuándo se ven ballenas en Puerto Madryn?",
        answer:
          "La temporada de ballenas franca austral suele concentrarse entre junio y diciembre, con picos variables. Escribinos fechas y armamos alojamiento más excursiones acordes.",
      },
    ],
  },
  "el-calafate": {
    seoTitle: "Viajes a El Calafate — glaciares, alojamiento y excursiones",
    seoDescription:
      "El Calafate: Perito Moreno, navegación por glaciares, hoteles y auto. Escribinos por WhatsApp.",
    seoIntro:
      "Desde Calafate salís al Perito Moreno y al Lago Argentino. Te ayudamos con hotel, navegaciones y la conexión con El Chaltén si querés sumar trekking.",
    keywords: [
      "el calafate",
      "viajes el calafate",
      "turismo el calafate",
      "glaciar perito moreno",
      "alojamiento el calafate",
      "excursiones el calafate",
    ],
    faq: [
      {
        question: "¿Se puede combinar El Calafate con El Chaltén?",
        answer:
          "Sí, es uno de los clásicos de la Patagonia austral. Podemos armar fechas, traslados, alojamiento en ambos destinos y excursiones en cada base.",
      },
    ],
  },
  traful: {
    seoTitle: "Viajes a Villa Traful — lagos y bosque en la Patagonia",
    seoDescription:
      "Traful y Villa Traful: alojamiento, lago Traful y bosque sumergido. Escribinos por WhatsApp.",
    seoIntro:
      "Un desvío del Camino de los Siete Lagos: agua turquesa, bosque y poco turismo. Sumalo a Bariloche o San Martín.",
    keywords: [
      "villa traful",
      "traful",
      "lago traful",
      "viajes traful",
      "turismo traful",
      "bosque sumergido",
    ],
    faq: [
      {
        question: "¿Cómo llegar a Villa Traful?",
        answer:
          "Se accede por rutas desde San Martín de los Andes o Bariloche. Te ayudamos a integrarlo en tu itinerario con alojamiento y excursiones.",
      },
    ],
  },
  ushuaia: {
    seoTitle: "Viajes a Ushuaia — fin del mundo, alojamiento y excursiones",
    seoDescription:
      "Ushuaia: hoteles, Canal Beagle, Tierra del Fuego y excursiones. Escribinos por WhatsApp.",
    seoIntro:
      "Ushuaia es el sur en serio: Beagle, Tierra del Fuego y frío. Te ayudamos con hotel y excursiones.",
    keywords: [
      "ushuaia",
      "viajes ushuaia",
      "turismo ushuaia",
      "fin del mundo",
      "canal beagle",
      "alojamiento ushuaia",
      "excursiones ushuaia",
    ],
    faq: [
      {
        question: "¿Cuántos días alcanzan en Ushuaia?",
        answer:
          "Recomendamos mínimo 3 a 4 días para Parque Nacional, Canal Beagle y la ciudad. Si sumás navegaciones especiales o temporada alta, conviene planificar con más anticipación.",
      },
    ],
  },
};

export function getDestinationSeo(slug: string): DestinationSeoConfig | undefined {
  return DESTINATION_SEO[slug];
}

export function getDestinationSeoKeywords(slug: string): string[] {
  return getDestinationSeo(slug)?.keywords ?? [];
}
