import type { ExcursionContent } from "@/lib/catalog/types";

/** Catálogo Bariloche — alineado al servicio del operador local (sin precios). */
export const BARILOCHE_EXCURSIONS: ExcursionContent[] = [
  // ── Terrestres ──
  {
    name: "Circuito Chico Bariloche",
    category: "aventura",
    description:
      "El Circuito Chico es ideal para comenzar a conocer Bariloche. Medio día bordeando el lago Nahuel Huapi, con paradas en Cerro Campanario, Punto Panorámico y el Hotel Llao Llao. La excursión más popular de la ciudad.",
    highlights: [
      "Medio día · aprox. 4 horas",
      "Salida 14:00 hs · retiro en tu alojamiento",
      "Transporte en van o minibús",
      "Guía bilingüe y paradas fotográficas",
    ],
  },
  {
    name: "Cerro Catedral Bariloche",
    category: "aventura",
    description:
      "Principal centro de deportes invernales de Sudamérica, a 25 km de Bariloche. En invierno es el gran centro de ski de la región; en verano, senderismo y vistas de la cordillera y el lago Nahuel Huapi. Traslado desde tu alojamiento.",
    highlights: [
      "Duración variable según temporada y actividad",
      "Salida 09:00 hs · retiro en tu alojamiento",
      "Transporte incluido",
      "Guía opcional — consultá al reservar",
    ],
  },
  {
    name: "Cerro Tronador y Ventisquero Negro",
    category: "aventura",
    description:
      "Lagos Gutiérrez y Mascardi, Pampa Linda y el imponente Ventisquero Negro del Cerro Tronador (3.554 m). Paisaje único de la Patagonia: el volcán activo más alto de la región.",
    highlights: [
      "Día completo · aprox. 10 horas",
      "Salida 08:00 hs · retiro en tu alojamiento",
      "Transporte especializado y guía de montaña",
      "Entrada al Parque Nacional incluida",
    ],
  },
  {
    name: "San Martín de los Andes por los 7 Lagos",
    category: "aventura",
    description:
      "Excursión de día completo por la legendaria ruta de los siete lagos: Villa La Angostura, miradores y llegada a San Martín de los Andes. Una de las rutas más bellas de la Patagonia. Opera lunes, miércoles y viernes.",
    highlights: [
      "Día completo · aprox. 10 horas",
      "Salida 08:00 hs · lun, mié y vie",
      "Transporte en van y guía bilingüe",
      "Tiempo libre en San Martín de los Andes",
    ],
  },
  {
    name: "El Bolsón y Lago Puelo",
    category: "aventura",
    description:
      "El Bolsón y Lago Puelo: feria artesanal regional, playas de guijarros y el encanto del valle del río Azul. La capital de la artesanía y la ecología de la Patagonia. Sale jueves y sábados.",
    highlights: [
      "Día completo · aprox. 10 horas",
      "Salida 08:00 hs · jueves y sábados",
      "Transporte en van y guía",
      "Entrada al Parque Nacional incluida",
    ],
  },
  // ── Lacustres ──
  {
    name: "Isla Victoria y Bosque de Arrayanes",
    category: "navegacion",
    description:
      "Navegación de unos 30 minutos por el Nahuel Huapi hasta la Isla Victoria: vivero de coníferas, miradores y playa volcánica. Luego, el Bosque de Arrayanes en la península de Quetrihué — el único accesible al público en el mundo.",
    highlights: [
      "Día completo · aprox. 8 horas",
      "Salida 10:00 hs desde Puerto Pañuelo (km 25,5 Av. Bustillo)",
      "Navegación, guía bilingüe y entradas incluidas",
      "Isla Victoria y Bosque de Arrayanes",
    ],
  },
  {
    name: "Puerto Blest y Cascada de los Cántaros",
    category: "navegacion",
    description:
      "Navegación por el brazo Blest del Nahuel Huapi, el rincón más exuberante y lluvioso del lago. Visita a la Cascada de los Cántaros y Puerto Blest. Opcional: extensión al Lago Frías (se contrata aparte).",
    highlights: [
      "Día completo · aprox. 9 horas",
      "Salida 09:00 hs desde Puerto Pañuelo",
      "Navegación ida y vuelta y guía",
      "Senderismo a la Cascada de los Cántaros",
    ],
  },
  {
    name: "Extensión Lago Frías",
    category: "navegacion",
    description:
      "Extensión dentro de la excursión a Puerto Blest: traslado interno entre puertos, navegación por las aguas verdes del Lago Frías — producto del sedimento volcánico del glaciar Frías — y caminata corta por selva valdiviana en Puerto Frías. Regreso a Puerto Blest.",
    highlights: [
      "Día completo · aprox. 8 horas",
      "Se contrata como add-on a Puerto Blest",
      "Traslado interno entre puertos y navegación",
      "Guía bilingüe y caminata en Puerto Frías",
    ],
  },
  {
    name: "Traslado Puerto Pañuelo",
    category: "navegacion",
    description:
      "Transfer ida y vuelta al Puerto Pañuelo, punto de partida de las principales excursiones lacustres de Bariloche. Pensado para que llegues a tiempo a tu navegación sin preocuparte por el estacionamiento.",
    highlights: [
      "Aprox. 30 minutos cada tramo",
      "Salida 09:00 hs · retiro en tu alojamiento",
      "Transporte puerta a muelle",
      "Coordinado con las salidas de los catamaranes",
    ],
  },
  // ── Aventura ──
  {
    name: "Cabalgata de medio día",
    category: "aventura",
    description:
      "Cabalgata de medio día por bosques y paisajes de la Patagonia andina, con guías gauchos expertos. Apto para todos los niveles. Turno mañana (09:30–15:30) o tarde (12:00–18:00).",
    highlights: [
      "Medio día · aprox. 6 horas",
      "Turno mañana 09:30 hs o tarde 12:00 hs",
      "Caballo, equipo y guía gaucho",
      "Desayuno o almuerzo incluido según el turno",
    ],
  },
  {
    name: "Kayaks en Lago Gutiérrez",
    category: "aventura",
    description:
      "Traslado al Lago Gutiérrez y dos horas de kayak con guías certificados en aguas cristalinas rodeadas de montañas. Incluye instrucción; apto para principiantes.",
    highlights: [
      "Medio día · aprox. 3 horas",
      "Salida 10:00 hs · Camping Lago Gutiérrez",
      "Kayak, remo, chaleco salvavidas y guía",
      "Instrucción incluida para principiantes",
    ],
  },
  {
    name: "Travesía 4x4 Estepa con almuerzo",
    category: "fauna",
    description:
      "Recorrido off-road en vehículos 4x4 por la estepa patagónica: Cañón de la Luna, fauna autóctona y paisajes abiertos muy distintos al circuito de lagos. Almuerzo típico incluido. Regreso aprox. 18:00 hs.",
    highlights: [
      "Día completo · aprox. 9 horas",
      "Salida 09:00 hs · retiro en tu alojamiento",
      "Vehículo 4x4 y guía especializado",
      "Almuerzo típico incluido",
    ],
  },
  {
    name: "Promo Aventura — Cabalgata + Raquetas + Fondue",
    category: "aventura",
    description:
      "Paquete combinado: cabalgata de medio día con asado, caminata con raquetas en Roca Negra y fondue de queso y chocolate. La combinación de aventura y gastronomía patagónica en una sola contratación.",
    highlights: [
      "Paquete combinado · consultá itinerario al reservar",
      "Salida 09:00 hs · punto de encuentro en Bariloche",
      "Cabalgata con asado y raquetas en nieve",
      "Fondue de queso y chocolate · traslados incluidos",
    ],
  },
  // ── Nieve ──
  {
    name: "Raquetas en Cerro López Roca Negra",
    category: "aventura",
    description:
      "Traslado hasta la base del Cerro López y caminata con raquetas de nieve hasta el refugio Roca Negra, con vistas únicas de la Patagonia andina nevada. Pizza y bebidas calientes incluidas al llegar.",
    highlights: [
      "Día completo · aprox. 8 horas",
      "Salida 09:00 hs · punto de encuentro en Bariloche",
      "Raquetas, bastones y guía de montaña",
      "Pizza y bebidas calientes en Roca Negra",
    ],
  },
  {
    name: "Traslado Ski Cerro Catedral",
    category: "aventura",
    description:
      "Traslado ida y vuelta al Cerro Catedral, principal centro de ski de Sudamérica, a 25 km de Bariloche. Transfer directo desde tu alojamiento. Múltiples horarios disponibles.",
    highlights: [
      "Aprox. 30 minutos cada tramo",
      "Salida 08:30 hs · retiro en tu alojamiento",
      "Transfer ida y vuelta",
      "Horarios flexibles según temporada",
    ],
  },
  {
    name: "Villa La Angostura y Cerro Bayo",
    category: "aventura",
    description:
      "Excursión de día completo al centro de ski Cerro Bayo en Villa La Angostura, con vistas al lago Correntoso. Ambiente más íntimo y familiar que el Catedral.",
    highlights: [
      "Día completo · aprox. 10 horas",
      "Salida 08:30 hs · retiro en alojamiento zona céntrica",
      "Transporte, guía y entrada a Cerro Bayo",
    ],
  },
  {
    name: "Caminata Laguna Congelada — Refugio Neumeyer",
    category: "trekking",
    description:
      "Caminata invernal hasta la laguna congelada del Refugio Neumeyer. Paisaje de montaña en estado puro, con nieve y naturaleza patagónica. Sopa y chocolate en el refugio.",
    highlights: [
      "Día completo · aprox. 8 horas",
      "Salida 09:00 hs · retiro en tu alojamiento",
      "Guía de montaña y bastones de trekking",
      "Sopa y chocolate en el refugio",
    ],
  },
  {
    name: "Ski Nórdico en Cerro Otto",
    category: "aventura",
    description:
      "Traslado al centro de ski nórdico en Cerro Otto. Actividad guiada de esquí de fondo en un entorno natural espectacular, con instrucción completa para principiantes.",
    highlights: [
      "Medio día · aprox. 4 horas",
      "Salida 09:30 hs · retiro en tu alojamiento",
      "Esquíes nórdicos, bastones e instructor",
      "Bebidas calientes incluidas",
    ],
  },
  {
    name: "Extremo Encantado",
    category: "aventura",
    description:
      "Experiencia de nieve en los rincones más mágicos de la Patagonia nevada, con guías especializados en alta montaña. Cascadas congeladas y formaciones de hielo.",
    highlights: [
      "Medio día · aprox. 5 horas",
      "Salida 09:00 hs · retiro en tu alojamiento",
      "Guía experto y equipo de nieve",
      "Snacks incluidos",
    ],
  },
  {
    name: "Cerro Perito Moreno — Deportes de nieve",
    category: "aventura",
    description:
      "Excursión al Cerro Perito Moreno, centro de deportes invernales de gran belleza escénica. Incluye traslado ida y vuelta. Apto para toda la familia.",
    highlights: [
      "Día completo · aprox. 10 horas",
      "Salida 09:00 hs · retiro en tu alojamiento",
      "Traslado ida y vuelta",
      "Guía de montaña",
    ],
  },
  {
    name: "Noche Nórdica Cerro Otto",
    category: "aventura",
    description:
      "Experiencia nocturna: traslado al Cerro Otto, cena a la luz de las velas en el restaurante giratorio con vista panorámica nocturna de Bariloche. Plan romántico e irrepetible en invierno.",
    highlights: [
      "Noche · aprox. 4 horas",
      "Salida 18:30 hs · retiro en tu alojamiento",
      "Cena en refugio, bebidas y guía nocturno",
      "Esquíes y bastones incluidos",
    ],
  },
  {
    name: "Ski Fun Day — Cerro Perito Moreno",
    category: "aventura",
    description:
      "Día completo de ski y actividades en la nieve en el Cerro Perito Moreno. Ideal para toda la familia. Incluye traslado ida y vuelta y guía especializado.",
    highlights: [
      "Día completo · aprox. 10 horas",
      "Salida 09:00 hs · retiro en tu alojamiento",
      "Traslado ida y vuelta y guía",
      "Día completo de actividades en la nieve",
    ],
  },
  {
    name: "El Refugio de Arelauquen",
    category: "aventura",
    description:
      "Recorrido por los lagos Gutiérrez y Mascardi, cruzando el puente del río Manso hasta el refugio privado de Arelauquen en el bosque nevado. Experiencia íntima y exclusiva.",
    highlights: [
      "Día completo · aprox. 10 horas",
      "Salida 09:00 hs · retiro en tu alojamiento",
      "Traslado y guía especializado",
      "Bebidas calientes incluidas",
    ],
  },
  {
    name: "Parque Invernal Piedras Blancas — Culipatín y trineo",
    category: "aventura",
    description:
      "Complejo invernal en las laderas del Cerro Otto: 5 pistas de trineo-culipatín, aerosilla panorámica, snowtubing y zipline. Incluye traslado, entrada y 6 ascensos en aerosilla. Ideal para toda la familia.",
    highlights: [
      "Medio día · aprox. 4 horas",
      "Salida 08:30 hs o 10:00 hs · punto de encuentro en Bariloche",
      "Traslado, entrada y 6 ascensos en aerosilla",
      "Snowtubing y zipline incluidos",
    ],
  },
  {
    name: "Snowcat — Cerro Perito Moreno",
    category: "aventura",
    description:
      "Viaje al Cerro Perito Moreno por Ruta 40. Subida en aerosilla a 1.800 m y recorrido en Snowcat — vehículo con orugas — por el planalto nevado. Visita a un iglú y bebida caliente incluida.",
    highlights: [
      "Día completo · aprox. 12 horas",
      "Salida 08:00 hs · punto de encuentro en Bariloche",
      "Traslado, aerosilla y Snowcat",
      "Visita al iglú y bebida caliente",
    ],
  },
  {
    name: "Nieve al Límite — Frontera Argentina-Chile",
    category: "aventura",
    description:
      "Excursión hasta el hito en el Paso Cardenal Antonio Samoré, en la frontera con Chile. Bosques nevados, mini trekking, skibunda, empanadas y bebida caliente. Llevar documento de identidad vigente.",
    highlights: [
      "Día completo · aprox. 8 horas",
      "Salida 10:00 hs · punto de encuentro en Bariloche",
      "Traslado, mini trekking y skibunda",
      "Empanadas y bebida caliente · documento vigente obligatorio",
    ],
  },
];
