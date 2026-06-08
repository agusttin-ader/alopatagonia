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
      "Organizá tu viaje a la Patagonia: auto, alojamiento y excursiones en Bariloche, San Martín de los Andes, El Chaltén, Puerto Madryn, Ushuaia y más. Consultá por WhatsApp.",
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
      "Bariloche, San Martín de los Andes, El Chaltén, Villa La Angostura, Puerto Madryn, El Calafate, Esquel, Traful y Ushuaia. Alojamientos, excursiones y auto por destino.",
    intro:
      "Elegí la base de tu viaje en la Patagonia argentina. En cada destino encontrás alojamientos, excursiones y opciones de alquiler de auto coordinadas por un mismo equipo.",
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
      "Hoteles, cabañas y departamentos en Bariloche, El Chaltén, San Martín de los Andes, Puerto Madryn, Ushuaia y más destinos patagónicos. Consultá disponibilidad por WhatsApp.",
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
      "Excursiones en Bariloche, El Calafate, Puerto Madryn, Ushuaia y toda la Patagonia: trekking, navegación, glaciares, ballenas y más. Reservá por WhatsApp.",
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
      "Armá tu consulta de viaje a la Patagonia: destino, fechas y cantidad de personas. Te preparamos el mensaje para WhatsApp con alojamiento, auto y excursiones.",
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
      "Escribinos por WhatsApp con destino, fechas y cantidad de personas. Coordinamos auto de alquiler, alojamiento y excursiones en un solo plan según tu ruta y temporada.",
  },
  {
    question: "¿Qué destinos patagónicos cubren?",
    answer:
      "Trabajamos Bariloche, San Martín de los Andes, Villa La Angostura, El Chaltén, Esquel, Puerto Madryn, El Calafate, Traful y Ushuaia, entre otros puntos de la Patagonia argentina.",
  },
  {
    question: "¿Puedo reservar solo alojamiento o solo excursiones?",
    answer:
      "Sí. Podés consultar por alojamiento, excursiones o alquiler de auto por separado, aunque recomendamos armar el viaje completo para optimizar traslados y fechas.",
  },
];

/** Destinos destacados para enlazado interno (footer, hubs). */
export const SEO_POPULAR_DESTINATIONS = [
  { slug: "bariloche", label: "Bariloche" },
  { slug: "san-martin", label: "San Martín de los Andes" },
  { slug: "el-chalten", label: "El Chaltén" },
  { slug: "el-calafate", label: "El Calafate" },
  { slug: "puerto-madryn", label: "Puerto Madryn" },
  { slug: "ushuaia", label: "Ushuaia" },
] as const;

const DESTINATION_SEO: Record<string, DestinationSeoConfig> = {
  bariloche: {
    seoTitle: "Viajes a Bariloche — alojamiento, excursiones y auto",
    seoDescription:
      "Organizá tu viaje a Bariloche: hoteles, cabañas, Circuito Chico, Cerro Catedral y alquiler de auto. Coordinamos alojamiento y excursiones por WhatsApp.",
    seoIntro:
      "Bariloche es la puerta clásica a la Patagonia andina: lagos, bosques y montaña en el Parque Nacional Nahuel Huapi. Te ayudamos a elegir alojamiento, armar excursiones y coordinar el auto para recorrer la región sin complicaciones.",
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
          "Coordinamos alojamiento, alquiler de auto y excursiones según temporada. Todo se arma por WhatsApp con fechas claras y opciones reales del catálogo.",
      },
    ],
  },
  "san-martin": {
    seoTitle: "Viajes a San Martín de los Andes — alojamiento y excursiones",
    seoDescription:
      "Viajá a San Martín de los Andes: hoteles, cabañas, Ruta de los 7 Lagos y excursiones en el Parque Nacional Lanín. Organizamos tu viaje por WhatsApp.",
    seoIntro:
      "San Martín de los Andes combina bosque nativo, el Lago Lácar y acceso al Parque Nacional Lanín. Es ideal para quienes buscan un destino patagónico más tranquilo, con buenas bases para trekking y la clásica ruta de los Siete Lagos.",
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
      "Organizá tu viaje a El Chaltén, capital del trekking: alojamiento, Laguna de los Tres, Fitz Roy y excursiones de montaña. Consultá por WhatsApp.",
    seoIntro:
      "El Chaltén es el destino patagónico por excelencia para trekking y montaña, al pie del Fitz Roy. Te ayudamos con alojamiento base, excursiones guiadas y logística para aprovechar los senderos según clima y temporada.",
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
          "La temporada alta va de octubre a abril, con más servicios abiertos. En invierno hay menos opciones, pero el paisaje es espectacular para viajeros experimentados.",
      },
    ],
  },
  esquel: {
    seoTitle: "Viajes a Esquel y Trevelin — Patagonia andina",
    seoDescription:
      "Viajá a Esquel y Trevelin: alojamiento, Parque Nacional Los Alerces, La Hoya y excursiones en la Patagonia chubutense. Coordinamos tu plan por WhatsApp.",
    seoIntro:
      "Esquel y Trevelin ofrecen estepa, bosque de alerces y paisaje cordillerano en el sur de Chubut. Es una base excelente para combinar naturaleza, esquí en temporada y rutas escénicas hacia el resto de la Patagonia.",
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
      "Organizá tu viaje a Villa La Angostura: hoteles, cabañas, Bosque de Arrayanes y excursiones en el Nahuel Huapi. Consultá disponibilidad por WhatsApp.",
    seoIntro:
      "Villa La Angostura es una aldea de montaña dentro del Parque Nacional Nahuel Huapi, famosa por el Bosque de Arrayanes y su entorno lacustre. Funciona muy bien como base exclusiva o en combinación con Bariloche y San Martín.",
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
      "Viajá a Puerto Madryn y Península Valdés: alojamiento, avistaje de ballenas, pingüinos y excursiones en la costa patagónica. Organizamos tu viaje por WhatsApp.",
    seoIntro:
      "Puerto Madryn es la base ideal para la fauna marina patagónica: ballenas, pingüinos y Península Valdés. Coordinamos alojamiento, excursiones estacionales y traslados para que no pierdas las ventanas de avistaje.",
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
          "La temporada de ballenas franca austral suele concentrarse entre junio y diciembre, con picos variables. Consultanos fechas y armamos alojamiento más excursiones acordes.",
      },
    ],
  },
  "el-calafate": {
    seoTitle: "Viajes a El Calafate — glaciares, alojamiento y excursiones",
    seoDescription:
      "Organizá tu viaje a El Calafate: Perito Moreno, navegación por glaciares, hoteles y alquiler de auto. Coordinamos tu estadía en la Patagonia austral.",
    seoIntro:
      "El Calafate es la puerta al Glaciar Perito Moreno y al Lago Argentino. Te ayudamos con alojamiento, navegaciones, excursiones a glaciares y conexión con El Chaltén si querés sumar trekking al mismo viaje.",
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
      "Descubrí Traful y Villa Traful: alojamiento, lago Traful, bosque sumergido y rutas escénicas. Organizamos tu viaje por la Patagonia neuquina.",
    seoIntro:
      "Traful y Villa Traful son un desvío espectacular del Camino de los Siete Lagos: aguas turquesas, bosque y tranquilidad. Ideal para quienes quieren sumar naturaleza exclusiva a un circuito por Bariloche o San Martín.",
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
          "Se accede por rutas escénicas desde San Martín de los Andes o Bariloche. Te ayudamos a integrarlo en tu itinerario con alojamiento y excursiones.",
      },
    ],
  },
  ushuaia: {
    seoTitle: "Viajes a Ushuaia — fin del mundo, alojamiento y excursiones",
    seoDescription:
      "Organizá tu viaje a Ushuaia: hoteles, Canal Beagle, Parque Nacional Tierra del Fuego y excursiones en el fin del mundo. Consultá por WhatsApp.",
    seoIntro:
      "Ushuaia es la ciudad más austral del mundo y una base única para navegar el Canal Beagle, recorrer Tierra del Fuego y vivir la Patagonia extrema. Coordinamos alojamiento, excursiones y logística de viaje.",
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
