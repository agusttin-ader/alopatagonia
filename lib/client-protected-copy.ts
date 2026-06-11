/**
 * Textos aprobados por la clienta de Alo Patagonia.
 * No modificar sin OK explícito de la clienta o del equipo.
 */
export const CLIENT_HERO_COPY = {
  headline: "Organizá con nosotros tu viaje a Patagonia sin complicaciones",
  headlineMobile: "Tu viaje a Patagonia, sin complicaciones",
  subline:
    "Alojamientos + transfers + alquiler de autos y excursiones… todo en un solo lugar.",
  sublineMobile:
    "Alojamientos, transfers, autos y excursiones en un solo lugar.",
} as const;

export const CLIENT_SIGNATURE_COPY = {
  heading:
    "Coordinamos reservas, traslados y actividades para que viajes con todo resuelto.",
  points: [
    "Auto o transfer esperándote en el aeropuerto.",
    "Hotel según tu ruta y presupuesto",
    "Excursiones organizadas según el clima.",
    "WhatsApp activo para acompañarte durante todo tu viaje.",
    "Itinerario sin cargo para que aproveches tu tiempo a full.",
  ],
} as const;

export const CLIENT_ABOUT_US_COPY = {
  title: "Quiénes somos",
  paragraphs: [
    "Alo_patagonia es una empresa dedicada íntegramente al turismo en la Región Patagonia-argentina.",
    "Porque para nosotros cada pasajero es único...diseñamos experiencias pensadas desde la mirada del viajero, cuidando cada detalle, para que disfrutes de un viaje inolvidable!",
    "Nuestro objetivo es que te lleves los mejores recuerdos, que vivas una experiencia perfecta de principio a fin, para que siempre quieras volver!!",
  ],
  closing: "Si estás list@ para tu próxima aventura...contactános!!",
} as const;

export const CLIENT_CATALOG_HUB_COPY = {
  title: "Explorá por categorías",
  description:
    "Navegá entre destinos, alojamientos y excursiones… mirá las fotos y consultá sobre las opciones que más te interesen.",
} as const;

export const CLIENT_ALOJAMIENTOS_HUB_COPY = {
  title: "Alojamientos",
  description:
    "Contamos con Hoteles de diferentes categorías, cabañas y departamentos, con un servicio de excelencia para que te sientas como en casa...pero en Patagonia!",
} as const;

export const CLIENT_HOME_DESTINATIONS_COPY = {
  title: "Destinos",
  lead:
    "Elegí la ciudad que más te guste, descubrí fotos reales y encontrá todas las diferentes opciones para tu próximo viaje.",
  cta: "Si tenés alguna duda… consultanos por WhatsApp.",
} as const;

export const CLIENT_DESTINATIONS_INDEX_COPY = {
  title: "Destinos en la Patagonia Argentina",
  intro:
    "Descubrí los destinos más increíbles de la Patagonia. Alojamiento, excursiones y autos, con asesoramiento personalizado para que viajes sin preocupaciones.",
} as const;

export type ClientFaqItem = {
  question: string;
  answer: string;
};

export const CLIENT_DESTINATIONS_INDEX_FAQ_COPY = [
  {
    question: "Cómo organizamos tu viaje?",
    answer:
      "Completá el Formulario, con localidad, cantidad de pasajeros y fechas de viaje, envianos el Whatsapp. Te organizamos alojamiento, actividades, transfer o auto según tu preferencia, y un itinerario sin cargo para que aproveches tu tiempo a full!",
  },
  {
    question: "Qué destinos abarcamos?",
    answer:
      "Bariloche, San Martin de los Andes, Villa la Angostura, Esquel, Trevelin, Puerto Madryn, El Calafate, El Chalten, Ushuaia",
  },
  {
    question: "Puedo reservar todo por separado?",
    answer:
      "Porsupuesto! Alojamientos, actividades, transfers o alquiler de autos pueden ir por separado...o si preferís, te organizamos todo junto, para que viajes con todo resuelto y sólo te ocupes en disfrutar!!",
  },
] as const satisfies readonly ClientFaqItem[];

export type ClientDestinationPageCopy = {
  title: string;
  paragraphs: readonly string[];
};

export const CLIENT_DESTINATION_PAGES_COPY = {
  bariloche: {
    title: "Bariloche",
    paragraphs: [
      "La puerta de ingreso a la Patagonia argentina.",
      "Lagos, bosques, montaña...chocolate del mejor!",
      "Tenemos los mejores alojamientos, experiencias, traslados y autos de alquiler para ofrecerte.",
    ],
  },
  "san-martin": {
    title: "San Martin de los Andes",
    paragraphs: [
      "Una de las ciudades más lindas de Neuquén.",
      "Lago Lacar, Cerro Chapelco, Volcán Lanín...cantidad de ríos, lagos, cascadas y senderos...",
      "Entrá y mirá todos los alojamientos, actividades y autos disponibles para que recorras éste lugar mágico de la Patagonia.",
    ],
  },
  traful: {
    title: "Villa Traful",
    paragraphs: [
      "Éste hermoso pueblo ubicado entre San Martin de los Andes y Villa la Angostura, no dejará de maravillarte en cada tramo de su ruta de ingreso, sus playas y el lago azul profundo, el bosque verde y el sumergido...",
      "Contamos con cabañas y las más lindas actividades para que lo disfrutes y guardes los mejores recuerdos!",
    ],
  },
  "villa-la-angostura": {
    title: "Villa La Angostura",
    paragraphs: [
      "es un encantador pueblo de montaña a orillas del lago Nahuel Huapi, rodeado de bosques y paisajes únicos. Es la puerta de entrada al Parque Nacional Nahuel Huapi y uno de los destinos más elegidos de la Patagonia por su naturaleza, tranquilidad y actividades al aire libre durante todo el año.",
      "En este destino contamos con cabañas, hoteles y las actividades tipicas de una localidad que se vive al aire libre!",
    ],
  },
  "el-calafate": {
    title: "El Calafate",
    paragraphs: [
      "Tierra de glaciares y estepa patagónica propiamente dicha.",
      "Pasarelas, navegaciones, esquila de ovejas y una gastronomía típica de nuestra Patagonia.",
      "Recorré nuestros alojamientos, actividades, transfers y autos disponibles!",
    ],
  },
  "el-chalten": {
    title: "El Chalten",
    paragraphs: [
      "Capital Nacional del trekking, senderos, montañas, ríos y lagos de una belleza indescriptible.",
      "Entrá al catalogo para ver los diferentes alojamientos y actividades disponibles para disfrutarlo a full",
    ],
  },
} as const satisfies Record<string, ClientDestinationPageCopy>;

export function getClientDestinationPageCopy(
  slug: string,
): ClientDestinationPageCopy | undefined {
  return CLIENT_DESTINATION_PAGES_COPY[slug as keyof typeof CLIENT_DESTINATION_PAGES_COPY];
}

export type ClientDestinationZoneCopy = ClientDestinationPageCopy;

export const CLIENT_DESTINATION_ZONES_COPY = {
  chubut: {
    title: "Chubut: Cordillera y costa",
    paragraphs: [
      "Los 2 extremos de la provincia, separados por 670 km. entre sí.",
      "Parque Nacional los Alerces en Esquel con sus montañas, lagos y bosques milenarios y el Planeta Madryn, con la fauna marina más alucinante del mundo!",
      "Entrá a ver nuestros alojamientos, y también gestioná tus actividades y alquiler de autos en ambas localidades!",
    ],
  },
  "santa-cruz": {
    title: "Santa Cruz: Tierra de glaciares",
    paragraphs: [
      "El Calafate y El Chalten se encuentran a 220 km uno del otro...",
      "El Calafate, con sus campos de hielo, sus estancias pioneras y su historia originaria....El Chalten, nuestra Capital Nacional del Trekking, reconocida mundialmente por tener los senderos más lindos y desafiantes como son Laguna de los 3...o Laguna Capri, el más simple y apto para toda la familia.",
      "Entrá a nuestro catálogo y conocé todos los alojamientos que tenemos para ofrecerte en cada localidad, las actividades, transfers y autos disponibles para que lo distrutes y recorras de punta a punta!",
    ],
  },
  "tierra-del-fuego": {
    title: "Tierra del fuego:",
    paragraphs: [
      "Ushuaia, Canal Beagle y Parque Nacional Tierra del Fuego.",
      "El fin del Mundo te espera entre faros, turbales, pingüinos...y la experiencia de estar en el extremo más austral del Continente.",
      "Entrá al catálogo a ver nuestros alojamientos, excursiones, contratá tus tralados o alquilá un auto y recorrela sin límites!",
    ],
  },
} as const satisfies Record<string, ClientDestinationZoneCopy>;

export function getClientDestinationZoneCopy(
  zoneId: string,
): ClientDestinationZoneCopy | undefined {
  return CLIENT_DESTINATION_ZONES_COPY[zoneId as keyof typeof CLIENT_DESTINATION_ZONES_COPY];
}

export const CLIENT_DESTINATION_FAQ_COPY = {
  ushuaia: [
    {
      question: "¿Cuántos días necesito para conocer Ushuaia?",
      answer:
        "Te recomendamos entre 3 y 4 días para disfrutar del Parque Nacional, el Canal Beagle y los principales atractivos de la ciudad. Si querés sumar navegaciones, trekking o actividades de temporada, lo ideal es disponer de algunos días más y reservar con anticipación. Escribinos por WhatsApp y te ayudamos a planificarlo.",
    },
  ],
} as const satisfies Partial<Record<string, readonly ClientFaqItem[]>>;

export function mergeClientDestinationFaq(
  slug: string,
  fallback: readonly ClientFaqItem[],
): ClientFaqItem[] {
  const clientItems = CLIENT_DESTINATION_FAQ_COPY[slug as keyof typeof CLIENT_DESTINATION_FAQ_COPY];
  if (!clientItems) return [...fallback];

  return fallback.map((item, index) => clientItems[index] ?? item);
}
