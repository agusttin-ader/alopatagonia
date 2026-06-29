import { getExcursionImageFoldersForSlug } from "@/lib/catalog/excursion-image-folders";
import type { ExcursionCategory } from "@/lib/catalog/types";

export type ExcursionContent = {
  name: string;
  category: ExcursionCategory;
  description: string;
  highlights: string[];
};

export const EXCURSION_CONTENT_BY_DESTINATION: Record<string, ExcursionContent[]> = {
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
      name: "Lago Huechulafquen, Paimún y Volcán Lanín",
      category: "aventura",
      description:
        "Salida 09:00 desde San Martín de los Andes. Recorrés Junín de los Andes y la iglesia de Laura Vicuña, la boca del Río Chimehuín y el Lago Huechulafquen con el Volcán Lanín de fondo en todo el trayecto. Bordeando el lago entrás al bosque andino-patagónico, almorzás en un restaurante de campo atendido por la comunidad mapuche y seguís por la Ruta 61 hasta el Lago Paimún, la capilla del lago y un bosque de araucarias milenarias al pie del Lanín. Regreso a las 18:00.",
      highlights: [
        "Día completo · salida 09:00 y regreso 18:00",
        "Junín de los Andes, Río Chimehuín y Lago Huechulafquen",
        "Almuerzo en restaurante mapuche de la zona",
        "Lago Paimún, capilla y araucarias milenarias",
        "No incluye entrada al Parque Nacional Lanín",
      ],
    },
    {
      name: "Navegación por el Lácar a Quila Quina",
      category: "navegacion",
      description:
        "Excursión de medio día desde San Martín bordeando el Lago Lácar, con vistas al Volcán Colorado y al Cerro Sabana. Te internás en tierras de la Comunidad Mapuche Curruhuinca y volvés al lago con una panorámica distinta hacia Villa Quila Quina: un valle entre el agua y la cordillera, con asentamientos de la comunidad, casas de veraneo, confitería, muelle de navegación y playas para almorzar, tomar mate o disfrutar el marco del cerro Abanico.",
      highlights: [
        "Medio día desde San Martín de los Andes",
        "Comunidad Mapuche Curruhuinca y Villa Quila Quina",
        "Vistas al Volcán Colorado y al Cerro Sabana",
        "Muelle, playas y confitería frente al cerro Abanico",
        "No incluye entrada al Parque Nacional Lanín",
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
      name: "Kayak en Villa La Angostura",
      category: "aventura",
      description:
        "Navegá en kayak por rincones del Nahuel Huapi, Correntoso, Espejo y otros lagos del circuito de los Siete Lagos. Salidas con guías que conocen la zona y te llevan a lugares a los que solo se llega con equipo adecuado y experiencia local. Una forma activa de desconectarte e inmersión total en el paisaje.",
      highlights: [
        "Lagos Nahuel Huapi, Correntoso, Espejo y más",
        "Salidas guiadas con profesionales de la zona",
        "Equipos adecuados para cada tramo lacustre",
        "Ideal para quienes buscan aventura a su ritmo",
      ],
    },
    {
      name: "Alquiler de bicicletas",
      category: "aventura",
      description:
        "Bicicletas de montaña para recorrer los principales circuitos y paisajes naturales de Villa La Angostura. Opciones por hora o por día, con accesorios de seguridad. Una forma activa y sustentable de conocer la Patagonia a tu ritmo.",
      highlights: [
        "Mountain bike para circuitos y senderos de la zona",
        "Alquiler por hora o por día",
        "Casco y accesorios de seguridad incluidos",
        "Ideal para combinar con playas y miradores",
      ],
    },
    {
      name: "Navegación al Bosque de Arrayanes",
      category: "navegacion",
      description:
        "Paseo en lancha por el lago hasta el Bosque de Arrayanes, único en el mundo. Senderos entre arrayanes centenarios, paisaje de tonos cobrizos sobre el agua, merienda incluida y regreso al puerto.",
      highlights: [
        "Navegación lacustre con guía local",
        "Bosque de arrayanes en la península de Quetrihué",
        "Senderos y pasarelas entre árboles centenarios",
        "Merienda incluida · regreso al puerto",
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
      name: "Navegación al Bosque Sumergido",
      category: "navegacion",
      description:
        "Una experiencia única para explorar un antiguo bosque sumergido bajo las aguas del Lago Traful, con paisajes naturales y agua cristalina. Ideal para quienes buscan aventura, naturaleza y vistas que no se repiten en otro lugar de la Patagonia.",
      highlights: [
        "Bosque sumergido visible desde el barco o con snorkel",
        "Aguas cristalinas en días de calma",
        "Guías locales explican la geología del valle",
        "Sujeta a clima y temporada",
      ],
    },
    {
      name: "Cabalgata en Traful",
      category: "aventura",
      description:
        "Recorré senderos de montaña y bosques patagónicos a caballo, con paisajes únicos, aire puro y vistas inolvidables del entorno natural de Villa Traful y el Lago Traful.",
      highlights: [
        "Salidas guiadas por senderos de montaña",
        "Bosque patagónico y miradores del lago",
        "Apto para distintos niveles de experiencia",
        "Consultá horarios y cupos según temporada",
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

export function getExcursionContentForItem(
  destinationSlug: string,
  itemSlug: string,
): ExcursionContent | undefined {
  const folders = getExcursionImageFoldersForSlug(destinationSlug);
  const index = folders.findIndex((entry) => entry.folderSlug === itemSlug);
  if (index < 0) return undefined;
  return EXCURSION_CONTENT_BY_DESTINATION[destinationSlug]?.[index];
}
