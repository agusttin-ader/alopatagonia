import {
  CLIENT_ALOJAMIENTOS_HUB_COPY,
  CLIENT_DESTINATIONS_INDEX_COPY,
  CLIENT_DESTINATION_PAGES_COPY,
  mergeClientDestinationFaq,
} from "@/lib/client-protected-copy";

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
      "Armamos tu viaje a la Patagonia: auto, alojamiento y excursiones en Bariloche, Calafate, Ushuaia, Madryn y el Corredor de los Lagos. Escribinos por WhatsApp.",
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
    title: CLIENT_DESTINATIONS_INDEX_COPY.title,
    description: CLIENT_DESTINATIONS_INDEX_COPY.intro,
    intro: CLIENT_DESTINATIONS_INDEX_COPY.intro,
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
    description: CLIENT_ALOJAMIENTOS_HUB_COPY.description,
    keywords: [
      "alojamiento patagonia",
      "hoteles bariloche",
      "cabañas patagonia",
      "departamentos bariloche",
      "hostel patagonia",
    ],
  },
  excursiones: {
    title: "Excursiones en Bariloche y Patagonia — lagos, montaña y nieve",
    description:
      "Más de 25 salidas en Bariloche: Circuito Chico, Isla Victoria, Puerto Blest, Cerro Tronador, ski, raquetas y navegación. Más trekking en El Chaltén, glaciares en Calafate y ballenas en Madryn. Consultá por WhatsApp según temporada.",
    keywords: [
      "excursiones patagonia",
      "excursiones bariloche",
      "circuito chico bariloche",
      "isla victoria arrayanes",
      "puerto blest bariloche",
      "cerro tronador ventisquero negro",
      "cerro catedral ski",
      "raquetas bariloche",
      "excursiones nieve bariloche",
      "ruta siete lagos",
      "trekking el chalten",
      "glaciar perito moreno",
      "ballenas puerto madryn",
      "canal beagle ushuaia",
    ],
  },
  planner: {
    title: "Planear viaje Patagonia — consulta por WhatsApp",
    description:
      "Completá destino, fechas y cuántos son. Te armamos el mensaje para WhatsApp con alojamiento, auto y excursiones.",
    keywords: [
      "planear viaje patagonia",
      "itinerario patagonia",
      "viaje bariloche",
      "consulta viaje patagonia",
    ],
  },
} as const;

/** FAQ del hub /excursiones (contenido indexable + JSON-LD). */
export const EXCURSIONES_HUB_FAQ: SeoFaqItem[] = [
  {
    question: "¿Cómo reservo una excursión con Alo Patagonia?",
    answer:
      "Elegí la actividad en el catálogo, mirá fotos y qué incluye cada salida, y escribinos por WhatsApp con fechas y cantidad de personas. Coordinamos traslado, horario y reserva según temporada.",
  },
  {
    question: "¿Qué excursiones hay en Bariloche?",
    answer:
      "Terrestres (Circuito Chico, Cerro Tronador, Siete Lagos, El Bolsón), lacustres (Isla Victoria y Arrayanes, Puerto Blest, Lago Frías), aventura (kayak, cabalgata, 4x4 en estepa) y nieve (ski, raquetas, Snowcat, Piedras Blancas, Noche Nórdica y más). Cada ficha detalla duración e inclusiones.",
  },
  {
    question: "¿Hay excursiones de invierno y de verano?",
    answer:
      "Sí. En verano predominan las terrestres y lacustres; en invierno sumamos ski, raquetas, trineo y experiencias en Cerro Catedral, Otto y Perito Moreno. No todas operan todo el año — consultanos con tus fechas.",
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
    seoTitle: "Viajes a Bariloche — excursiones, alojamiento y auto",
    seoDescription: CLIENT_DESTINATION_PAGES_COPY.bariloche.paragraphs.join(" "),
    seoIntro: CLIENT_DESTINATION_PAGES_COPY.bariloche.paragraphs.join(" "),
    keywords: [
      "bariloche",
      "viajes bariloche",
      "turismo bariloche",
      "alojamiento bariloche",
      "excursiones bariloche",
      "circuito chico bariloche",
      "isla victoria arrayanes",
      "puerto blest",
      "cerro tronador",
      "cerro catedral",
      "excursiones nieve bariloche",
      "vacaciones bariloche",
      "auto bariloche",
    ],
    faq: [
      {
        question: "¿Cuántos días conviene estar en Bariloche?",
        answer:
          "Para una primera visita, entre 4 y 7 días: alcanza para Circuito Chico, una navegación lacustre, Cerro Tronador o Catedral y un día libre. Con más tiempo podés sumar Siete Lagos, El Bolsón o actividades de invierno según la época.",
      },
      {
        question: "¿Qué excursiones ofrecen en Bariloche?",
        answer:
          "Más de 25 salidas organizadas: terrestres, lacustres, aventura y nieve. Desde Isla Victoria y Puerto Blest hasta ski, raquetas, kayak y 4x4 en estepa. Cada actividad en el catálogo indica duración, horario y qué incluye.",
      },
      {
        question: "¿Conviene reservar las excursiones con anticipación?",
        answer:
          "En enero, febrero y vacaciones de invierno conviene reservar navegaciones, ski y salidas de nieve con anticipación. Escribinos por WhatsApp con tus fechas y armamos alojamiento, traslados y excursiones en un solo contacto.",
      },
    ],
  },
  "san-martin": {
    seoTitle: "Viajes a San Martín de los Andes — alojamiento y excursiones",
    seoDescription: CLIENT_DESTINATION_PAGES_COPY["san-martin"].paragraphs.join(" "),
    seoIntro: CLIENT_DESTINATION_PAGES_COPY["san-martin"].paragraphs.join(" "),
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
          "Sí, es uno de los clásicos del Corredor de los Lagos: muchos viajeros hacen Bariloche → Villa La Angostura → San Martín en auto (unos 200 km entre Bariloche y San Martín, con paradas). Conviene 2–3 noches mínimo en cada base.",
      },
      {
        question: "¿Cuándo es mejor ir a San Martín?",
        answer:
          "De octubre a abril hay más excursiones y rutas abiertas. En invierno es más íntimo y hay nieve en cerros cercanos; algunos caminos de montaña pueden estar cortados.",
      },
    ],
  },
  "el-chalten": {
    seoTitle: "Viajes a El Chaltén — trekking, alojamiento y excursiones",
    seoDescription: CLIENT_DESTINATION_PAGES_COPY["el-chalten"].paragraphs.join(" "),
    seoIntro: CLIENT_DESTINATION_PAGES_COPY["el-chalten"].paragraphs.join(" "),
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
          "De octubre a abril hay más servicios y senderos transitables. Enero y febrero son los meses más concurridos. En invierno hay menos opciones de alojamiento y hace falta experiencia en frío y nieve.",
      },
      {
        question: "¿Hace falta guía para Laguna de los Tres?",
        answer:
          "No es obligatorio: el sendero está marcado y muchos lo hacen por cuenta propia. Sí recomendamos salir temprano, llevar abrigo y comida. Si preferís ir acompañado, te pasamos opciones de guías locales.",
      },
    ],
  },
  esquel: {
    seoTitle: "Viajes a Esquel y Trevelin — Patagonia andina",
    seoDescription:
      "Esquel y Trevelin: Los Alerces, La Hoya, Trevelin gales y alojamiento. Escribinos por WhatsApp.",
    seoIntro:
      "Esquel y Trevelin combinan estepa y cordillera: el Parque Nacional Los Alerces (Patrimonio UNESCO), el cerro La Hoya en invierno y la colonia galesa con sus panaderías y cascadas.",
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
          "Los Alerces y la navegación en Futalaufquen son imprescindibles. Sumá un día en Trevelin (Valle 16 de Octubre, té galés) y, en invierno, esquí en La Hoya. Te armamos alojamiento y excursiones según cuántos días tengas.",
      },
      {
        question: "¿Esquel está lejos de la costa de Madryn?",
        answer:
          "Sí — son unos 650 km entre Esquel y Puerto Madryn. Son dos polos distintos de Chubut (montaña vs. mar). Conviene elegir uno como eje del viaje o planificar vuelo interno / varios días de ruta.",
      },
    ],
  },
  "villa-la-angostura": {
    seoTitle: "Viajes a Villa La Angostura — alojamiento y excursiones",
    seoDescription: CLIENT_DESTINATION_PAGES_COPY["villa-la-angostura"].paragraphs.join(" "),
    seoIntro: CLIENT_DESTINATION_PAGES_COPY["villa-la-angostura"].paragraphs.join(" "),
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
          "Sí. Hay paseos cortos, playas en el lago, navegaciones tranquilas y menos movimiento que Bariloche. Te recomendamos alojamiento y salidas según edades y si viajan en verano o invierno.",
      },
      {
        question: "¿Cómo se llega al Bosque de Arrayanes?",
        answer:
          "En temporada alta hay lanchas desde Bahía Brava o acceso por sendero desde el Parque Nacional (según apertura). El nivel del lago y el clima definen qué opción conviene — te avisamos al consultar fechas.",
      },
    ],
  },
  "puerto-madryn": {
    seoTitle: "Viajes a Puerto Madryn — ballenas, fauna y excursiones",
    seoDescription:
      "Puerto Madryn: ballenas, Península Valdés, pingüinos y alojamiento. Escribinos por WhatsApp.",
    seoIntro:
      "Madryn es la base para Península Valdés: ballenas franca austral, elefantes marinos, orcas en Caleta Valdés (feb–abr) y pingüinos según la época. Cada mes tiene un protagonista distinto.",
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
          "La ballena franca austral llega al Golfo San José entre junio y diciembre, con más actividad de septiembre a noviembre. Las salidas en barco salen desde Puerto Pirámides; si hay mal tiempo, se reprograman.",
      },
      {
        question: "¿Cuántos días alcanzan en Madryn?",
        answer:
          "Con 3–4 días podés hacer Península Valdés, avistaje embarcado y Punta Loma. Si querés sumar pingüinos en Punta Tombo (temporada sep–mar), planificá un día extra.",
      },
    ],
  },
  "el-calafate": {
    seoTitle: "Viajes a El Calafate — glaciares, alojamiento y excursiones",
    seoDescription: CLIENT_DESTINATION_PAGES_COPY["el-calafate"].paragraphs.join(" "),
    seoIntro: CLIENT_DESTINATION_PAGES_COPY["el-calafate"].paragraphs.join(" "),
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
          "Sí, es el combo clásico de Santa Cruz: 220 km por Ruta 40 (unas 3 h). Muchos hacen 2–3 noches en Calafate (glaciares) y 2–3 en Chaltén (trekking). Te ayudamos con traslado, hotel y excursiones en cada base.",
      },
      {
        question: "¿Hace falta reservar el Perito Moreno con anticipación?",
        answer:
          "Las pasarelas no requieren reserva, pero en enero/febrero conviene ir temprano. Las navegaciones y el mini-trekking sobre hielo sí se agotan — escribinos con fechas y los gestionamos.",
      },
    ],
  },
  traful: {
    seoTitle: "Viajes a Villa Traful — lagos y bosque en la Patagonia",
    seoDescription: CLIENT_DESTINATION_PAGES_COPY.traful.paragraphs.join(" "),
    seoIntro: CLIENT_DESTINATION_PAGES_COPY.traful.paragraphs.join(" "),
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
          "Por Ruta 65 desde San Martín de los Andes (unos 80 km) o por la Ruta de los Siete Lagos desde Bariloche/Villa La Angostura. Sin auto propio, hay combis estacionales — consultanos según tu fecha.",
      },
      {
        question: "¿Qué es el bosque sumergido?",
        answer:
          "Restos de un bosque anegado por actividad volcánica en los años 60, visibles desde el agua con muy buena claridad. Hay salidas en barco y, con calma, snorkel. Depende del clima del lago.",
      },
    ],
  },
  ushuaia: {
    seoTitle: "Viajes a Ushuaia — fin del mundo, alojamiento y excursiones",
    seoDescription:
      "Ushuaia: Canal Beagle, Tierra del Fuego, alojamiento y excursiones. Escribinos por WhatsApp.",
    seoIntro:
      "Ushuaia es el sur en serio: Canal Beagle, Parque Nacional Tierra del Fuego y viento casi todo el año. Te ayudamos con hotel, abrigo acorde y excursiones que no dependan solo de un día bueno.",
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
          "Mínimo 3–4 días: un día Parque Nacional, uno Canal Beagle, uno Laguna Esmeralda o Tren del Fin del Mundo, y margen por clima. Si querés navegación extendida o Antártida, planificá más.",
      },
      {
        question: "¿Ushuaia se combina con El Calafate?",
        answer:
          "Sí, pero son ~880 km por tierra o vuelo directo (1 h). Lo habitual es volar Calafate–Ushuaia y armar glaciares + fin del mundo en el mismo viaje de 10–12 días.",
      },
    ],
  },
};

export function getDestinationSeo(slug: string): DestinationSeoConfig | undefined {
  const seo = DESTINATION_SEO[slug];
  if (!seo) return undefined;

  return {
    ...seo,
    faq: mergeClientDestinationFaq(slug, seo.faq),
  };
}

export function getDestinationSeoKeywords(slug: string): string[] {
  return getDestinationSeo(slug)?.keywords ?? [];
}
