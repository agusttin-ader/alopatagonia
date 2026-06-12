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

export type ClientAccommodationCopy = {
  name?: string;
  description: string;
  highlights: readonly string[];
};

const BARILOCHE_DPTO_MONOAMBIENTE_CENTRICO_COPY = {
  description: "Departamento monoambiente céntrico con capacidad para 2 pax.",
  highlights: [
    "Cocina completa, heladera frigobar y ropa de blanco para dormitorio y baño",
    "TV smart, Internet y calefacción central",
    "Ubicación estratégica frente al Centro Cívico y excelentes vistas al lago",
  ],
} as const satisfies ClientAccommodationCopy;

const BARILOCHE_DPTO_MONOAMBIENTE_2_4_PAX_COPY = {
  description: "Departamento monoambiente céntrico con capacidad para 2 a 4 pax.",
  highlights: [
    "Cocina completa y ropa de blanco para dormitorio y baño",
    "TV smart, Internet y calefacción central",
    "Ubicación estratégica frente al Centro Cívico y excelentes vistas",
  ],
} as const satisfies ClientAccommodationCopy;

export const CLIENT_ACCOMMODATION_COPY = {
  "bariloche/arelauquen": {
    description:
      "Casa ubicada en Villa Arelauquen, dentro de barrio privado. Con capacidad para hasta 5 pax.",
    highlights: [
      "Cocina completa, horno a gas, heladera con freezer, lavarropas, cafetera expreso y ropa de blanco para dormitorio y baño",
      "TV smart en ambas habitaciones e Internet por fibra óptica",
      "Calefacción smart por caldera y parrilla en el deck de la cabaña",
      "Estacionamiento interno, amplias áreas de parque y fogonero",
      "A 150 m de Lago Gutiérrez",
    ],
  },
  "bariloche/cab-2-pax": {
    description:
      "Ubicada a la altura de km 7 de Av. Pioneros. Con capacidad para 2 pax.",
    highlights: [
      "Cocina completa, heladera con freezer, lavarropas, cafetera y ropa de blanco para dormitorio y baño",
      "TV smart e Internet",
      "Calefacción smart por caldera y parrilla en el deck de la cabaña",
      "Estacionamiento, amplia área de parque y fogonero",
    ],
  },
  "bariloche/cab-sauco-grande": {
    description:
      "Casa ubicada a la altura de km 7 de Av. Pioneros. Con capacidad para hasta 9 pax.",
    highlights: [
      "Cocina completa, horno a gas, heladera con freezer, cafetera, microondas, tostadora y ropa de blanco para dormitorio y baño",
      "3 habitaciones, una en suite con jacuzzi, 2 baños",
      "TV smart en ambas habitaciones y en el living e Internet",
      "Calefacción a gas y parrilla en el deck de la cabaña",
      "Estacionamiento en nivel superior y amplias áreas de parque",
      "Vista a la bahía de Playa Bonita",
    ],
  },
  "bariloche/cabana-otto": {
    description:
      "Casa ubicada a la altura de km 5 de Av. Pioneros. Con capacidad para hasta 5 pax.",
    highlights: [
      "Cocina completa, horno a gas, heladera con freezer, cafetera, microondas, tostadora, lavarropas y ropa de blanco para dormitorio y baño",
      "2 habitaciones, 1 baño",
      "TV en habitación y en el living e Internet",
      "Calefacción a gas y parrilla",
      "Estacionamiento y amplias áreas de parque",
    ],
  },
  "bariloche/cabanas-sauco": {
    description:
      "Casa ubicada a la altura de km 7 de Av. Pioneros. Con capacidad para hasta 6 pax.",
    highlights: [
      "Cocina completa, horno a gas, heladera frigobar, cafetera, microondas, tostadora y ropa de blanco para dormitorio y baño",
      "2 habitaciones, 1 baño",
      "TV en habitación y en el living e Internet",
      "Calefacción a gas y parrilla en el deck de la cabaña tipo chulengo",
      "Estacionamiento en nivel superior y amplias áreas de parque",
      "Vista a la bahía de Playa Bonita",
    ],
  },
  "bariloche/casa-calma": {
    description:
      "Casa ubicada a la altura de km 7 de Av. Pioneros. Con capacidad para hasta 3 pax.",
    highlights: [
      "Cocina completa, horno a gas, heladera con freezer, cafetera, microondas, tostadora, lavarropas y ropa de blanco para dormitorio y baño",
      "2 habitaciones, 2 baños",
      "TV en habitación y en el living e Internet",
      "Calefacción a gas y a leña, parrilla en parque",
      "Estacionamiento y amplias áreas de exterior",
    ],
  },
  "bariloche/dpto-1": BARILOCHE_DPTO_MONOAMBIENTE_CENTRICO_COPY,
  "bariloche/dpto-2": BARILOCHE_DPTO_MONOAMBIENTE_CENTRICO_COPY,
  "bariloche/dpto-3": BARILOCHE_DPTO_MONOAMBIENTE_CENTRICO_COPY,
  "bariloche/dpto-4": BARILOCHE_DPTO_MONOAMBIENTE_CENTRICO_COPY,
  "bariloche/dpto-5": BARILOCHE_DPTO_MONOAMBIENTE_CENTRICO_COPY,
  "bariloche/dpto-6": BARILOCHE_DPTO_MONOAMBIENTE_CENTRICO_COPY,
  "bariloche/dpto-4-pax": BARILOCHE_DPTO_MONOAMBIENTE_2_4_PAX_COPY,
  "bariloche/dpto-cerros": BARILOCHE_DPTO_MONOAMBIENTE_2_4_PAX_COPY,
  "bariloche/dpto-lago": BARILOCHE_DPTO_MONOAMBIENTE_2_4_PAX_COPY,
  "bariloche/dpto-huapi": BARILOCHE_DPTO_MONOAMBIENTE_2_4_PAX_COPY,
  "bariloche/dpto-luxury": {
    description: "Departamento céntrico con capacidad para 2 a 5 pax.",
    highlights: [
      "Cocina completa, horno a gas, heladera con freezer y ropa de blanco para dormitorio y baño",
      "TV smart, Internet y calefacción central",
      "Ubicación estratégica frente al Centro Cívico y excelentes vistas de 360°",
      "Detalles de categoría 4 estrellas",
    ],
  },
  "bariloche/dpto-espana": {
    description: "Departamento céntrico, con capacidad para hasta 4 pax.",
    highlights: [
      "Cocina completa, horno a gas, heladera con freezer, cafetera, microondas, tostadora y ropa de blanco para dormitorio y baño",
      "2 habitaciones, 2 baños",
      "TV en habitación y en el living e Internet",
      "Calefacción a gas",
      "Balcón terraza con vista al lago",
    ],
  },
  "bariloche/hotel-1": {
    description:
      "Hotel de ubicación céntrica, a una cuadra del lago y 3 de la zona comercial peatonal del Centro de Bariloche.",
    highlights: [
      "Habitaciones para 2 a 5 pax con baño privado",
      "Desayuno y acceso a piscina incluidos en la tarifa",
    ],
  },
  "bariloche/hotel-4": {
    description:
      "Hotel de ubicación céntrica de categoría 4 estrellas, con playa y acceso al lago, a 3 cuadras de la zona comercial peatonal del Centro Cívico de Bariloche.",
    highlights: [
      "Habitaciones para 2 a 4 pax con baño privado e hidromasaje",
      "Nivel de juegos y entretenimiento cerrado",
      "Sala de lectura y cafetería con vista al lago",
      "Desayuno buffet y acceso a piscina incluidos en la tarifa",
      "Estacionamiento",
    ],
  },
  "san-martin/apart-rotui": {
    description:
      "Rotuí Apart Hotel los invita a disfrutar de una cálida estadía a 200 m de la avenida principal de la ciudad. Una zona estratégica donde la calidez y el murmullo de sus 120 m de costa de arroyo se mezclan para brindarle un descanso único.",
    highlights: [
      "Departamentos para 2 pax con servicio de limpieza y desayuno",
    ],
  },
  "san-martin/viejo-esquiador": {
    description:
      "Los invitamos a conocer uno de los hoteles icónicos más emblemáticos en San Martín de los Andes. El Viejo Esquiador es un hotel alpino ubicado en el corazón de nuestra localidad, en una zona privilegiada sobre la avenida principal y a metros del centro cívico.",
    highlights: [
      "Habitaciones para 2 a 4 pax",
      "Desayuno incluido en la tarifa",
    ],
  },
  "san-martin/hosteria-y-cabanas": {
    name: "La Fontaine Apart y hotel",
    description:
      "Nuestro hotel está ubicado a 400 m de la avenida principal de San Martín de los Andes. Un lugar ideal, céntrico y en conexión con la naturaleza para una estadía inolvidable.",
    highlights: [
      "Amplio parque con costa de arroyo y juegos para niños",
      "Piscina climatizada y quincho cerrado con parrilla y cocina industrial",
      "Habitaciones y departamentos para 2 a 4 pax",
    ],
  },
  "san-martin/rotui-luxury": {
    name: "Rotui Luxury Village",
    description:
      "En San Martín de los Andes, preciosa aldea de montaña, Rotuí ofrece glamorosas mansiones de ensueño, cabañas y apartamentos exclusivos para visitantes que gustan de finos detalles en la decoración, comodidad, tranquilidad y privacidad.",
    highlights: [
      "Cabañas con equipamiento de excelencia, capacidad para 2 a 12 pax",
      "Piscinas, saunas y cascadas",
      "Parque y vistas únicas de San Martín de los Andes, a solo 5 minutos del centro de la ciudad",
    ],
  },
  "san-martin/dptos-lago": {
    name: "Dptos. Lago",
    description: "Departamentos con capacidad para 2 a 6 pax.",
    highlights: [
      "Cocina completa, horno a gas, heladera con freezer, 2 habitaciones y 2 baños",
      "Ropa de blanco para dormitorio y baño",
      "Ubicación privilegiada frente al Lago Lácar",
    ],
  },
  "villa-la-angostura/cab-4-pax": {
    description: "Cabaña con capacidad para 4 pax.",
    highlights: [
      "Cocina completa, horno a gas, heladera con freezer, lavarropas y ropa de blanco para dormitorio y baño",
      "TV smart, Internet, 2 habitaciones y 1 baño",
      "Calefacción a gas, amplio parque con solarium y fogonero, estacionamiento interno",
      "Ubicada en la zona de los puertos de Bahía Mansa y Brava",
    ],
  },
  "villa-la-angostura/cab-6-pax": {
    description: "Cabaña con capacidad para 6 pax.",
    highlights: [
      "Cocina completa, horno a gas, heladera con freezer, lavarropas y ropa de blanco para dormitorio y baño",
      "TV smart, Internet, 2 habitaciones, bohardilla y 2 baños",
      "Calefacción a gas y hogar a leña, amplio parque con solarium y fogonero",
      "Parrilla, mesa de exterior y sillas, estacionamiento interno",
      "Ubicada en la zona de los puertos de Bahía Mansa y Brava",
    ],
  },
  "el-calafate/casa-grande": {
    name: "Casa 6 pax",
    description: "Casa con capacidad para 6 pax.",
    highlights: [
      "Cocina completa, horno a gas, heladera con freezer y ropa de blanco para dormitorio y baño",
      "TV smart, Internet, 2 habitaciones y 2 baños",
      "Calefacción a gas, parque con parrilla, mesa de exterior y sillas",
    ],
  },
  "el-calafate/dpto-4-pax": {
    name: "Dpto 4 pax",
    description: "Departamento con capacidad para hasta 4 pax.",
    highlights: [
      "Cocina completa, horno a gas, heladera con freezer, cafetera, microondas, tostadora y ropa de blanco para dormitorio y baño",
      "2 habitaciones, 1 baño, TV e Internet",
      "Calefacción a gas",
    ],
  },
  "el-calafate/hosteria": {
    name: "Hostería de montaña",
    description: "Hostería y cabañas de montaña en Calafate.",
    highlights: [
      "Habitaciones con vista al lago e hidromasaje — Standard, Superiores o Suites",
      "Cabañas con capacidad hasta 7 pax, hogar y parrilla, equipamiento full",
      "Servicio personalizado y de alta calidad",
    ],
  },
  "el-calafate/hotel-1": {
    name: "Hotel 1",
    description: "Hotel céntrico con habitaciones equipadas para 2 a 4 pax.",
    highlights: [
      "Desayuno incluido en la tarifa",
      "Excelente ubicación a metros de la Av. del Libertador y en zona gastronómica de El Calafate",
    ],
  },
  "el-calafate/hotel-4": {
    name: "Hotel 4",
    description:
      "Hotel de categoría 4 estrellas, con habitaciones dobles, triples y conectadas.",
    highlights: [
      "Área de Spa, restaurante gourmet, cafetería y desayuno buffet incluido en la tarifa",
      "Ubicado en las periferias de El Calafate, bicicletas para recorrer la zona y pet friendly",
      "Transfers sin cargo al centro en diferentes horarios",
      "Increíble vista al Lago Argentino",
    ],
  },
  "puerto-madryn/madryn-hotel-4": {
    name: "Hotel 4",
    description:
      "Hotel de categoría 4 estrellas, con habitaciones dobles, triples y conectadas.",
    highlights: [
      "Área de Spa, restaurante gourmet, cafetería y piscina climatizada",
      "Desayuno buffet incluido en la tarifa",
      "Ubicado frente al mar, con increíble vista al Mar Argentino",
    ],
  },
  "el-chalten/cabanas": {
    name: "Cabañas",
    description: "Cabañas para 2 a 6 pax.",
    highlights: [
      "Equipamiento full, cocina completa y ropa de blanco para dormitorio y baño",
      "TV e Internet, calefacción por sistema de caldera",
      "Excelente ubicación, a metros de Av. Principal y a 100 m del inicio al sendero a Laguna Torre",
    ],
  },
  "el-chalten/complejo": {
    name: "Complejo de cabañas",
    description: "Cabañas para 2 a 6 pax.",
    highlights: [
      "Equipamiento full, cocina completa y ropa de blanco para dormitorio y baño",
      "TV e Internet, calefacción por sistema de caldera",
      "Excelente ubicación, a metros de Av. Principal y a 200 m del inicio al sendero a Laguna Torre",
      "Quincho cerrado, parrilla y parque",
    ],
  },
  "ushuaia/dpto-3-amb": {
    name: "Dptos. 5 pax",
    description: "Departamento con capacidad para 2 a 5 pax.",
    highlights: [
      "Cocina completa, horno a gas, heladera con freezer y lavarropas",
      "2 habitaciones, 1 baño, ropa de blanco para dormitorio y baño",
      "Ubicación a pocos minutos del centro comercial de Ushuaia",
    ],
  },
  "ushuaia/dpto-2-amb": {
    name: "Dptos. 2/3 pax",
    description: "Departamento con capacidad para 2 a 3 pax.",
    highlights: [
      "Cocina completa, horno a gas, heladera con freezer y lavarropas",
      "1 habitación, 1 baño, ropa de blanco para dormitorio y baño",
      "Ubicación a pocos minutos del centro comercial de Ushuaia",
    ],
  },
  "ushuaia/hotel-3": {
    name: "Hotel 3",
    description:
      "Hotel de categoría 3 estrellas, con habitaciones dobles, triples y conectadas.",
    highlights: [
      "Área de Spa, restaurante gourmet, cafetería y piscina climatizada",
      "Desayuno buffet incluido en la tarifa",
      "Ubicado frente al mar, con increíble vista al Canal Beagle",
    ],
  },
  "ushuaia/hotel-4": {
    name: "Hotel 4",
    description:
      "Hotel de categoría 4 estrellas, con habitaciones dobles, triples y conectadas.",
    highlights: [
      "Área de Spa, restaurante gourmet y cafetería",
      "Desayuno buffet incluido en la tarifa",
      "Excelente ubicación céntrica, con increíble vista al Canal Beagle desde el desayunador",
    ],
  },
  "esquel/hosteria-esquel": {
    name: "Hostería de montaña Esquel",
    description: "Hostería con habitaciones para 2 a 5 pax.",
    highlights: [
      "Desayuno artesanal y media pensión incluidos en la tarifa",
      "Actividades como avistamientos, trekking, cabalgatas y tirolesa",
      "Ubicada a 5 minutos del ingreso al portal Norte del Parque Nacional Los Alerces",
    ],
  },
  "esquel/hosteria-trevelin": {
    name: "Hostería de montaña Trevelin",
    description: "Hostería con habitaciones para 2 a 5 pax.",
    highlights: [
      "Desayuno artesanal incluido en la tarifa",
      "Piscina cubierta climatizada y jacuzzi",
      "Amplio parque verde con zona de lectura, descanso, parrillas y mesas",
      "Actividades como avistamientos, trekking y cabalgatas",
      "Ubicada a 5 minutos de Trevelín centro y del ingreso al portal Norte del Parque Nacional Los Alerces",
    ],
  },
  "traful/cab-costa": {
    name: "Cabañas Costa",
    description: "Cabañas con capacidad para 2 a 3 pax.",
    highlights: [
      "Equipadas con cocina completa, heladera frigobar con freezer, anafe y microondas; baño",
      "Ropa de blanco para dormitorio y baño; deck con solarium",
      "Ubicadas sobre la costa, con playa, amplio parque y vista increíble al Lago Traful",
      "En el predio hay restaurante y cafetería con amplia carta",
    ],
  },
} as const satisfies Record<string, ClientAccommodationCopy>;

export function getClientAccommodationCopy(
  destinationSlug: string,
  itemSlug: string,
): ClientAccommodationCopy | undefined {
  return CLIENT_ACCOMMODATION_COPY[
    `${destinationSlug}/${itemSlug}` as keyof typeof CLIENT_ACCOMMODATION_COPY
  ];
}
