import { BARILOCHE_EXCURSIONS } from "@/lib/catalog/bariloche-excursions";
import { getExcursionImageFoldersForSlug } from "@/lib/catalog/excursion-image-folders";
import type { ExcursionContent } from "@/lib/catalog/types";

export type { ExcursionContent } from "@/lib/catalog/types";

export const EXCURSION_CONTENT_BY_DESTINATION: Record<string, ExcursionContent[]> = {
  bariloche: BARILOCHE_EXCURSIONS,
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
    {
      name: "Navegación Lago Viedma",
      category: "navegacion",
      description:
        "Navegación por el Lago Viedma hasta el frente del glaciar homónimo, con vistas a la Cordillera Patagónica y el Cerro Torre al fondo. Una forma distinta de ver el hielo sin hacer el trekking clásico del pueblo.",
      highlights: [
        "Salida desde El Chaltén o Puerto Bahía Túnel según temporada",
        "Vistas al Glaciar Viedma y cordillera patagónica",
        "Menor exigencia física que los trekkings del Fitz Roy",
        "Sujeta a clima y nivel del lago",
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
      name: "Navegación al Alerzal Milenario",
      category: "navegacion",
      description:
        "Navegación por el Lago Menéndez hasta un alerce milenario de más de 2.600 años, en el corazón del Parque Nacional Los Alerces. Recorrido interpretativo por el bosque templado lluvioso con guías que explican la historia y ecología del parque.",
      highlights: [
        "Alerce milenario — uno de los árboles más antiguos del planeta",
        "Lago Menéndez y bosque patagónico UNESCO",
        "Cupos limitados — reservar con anticipación",
        "Combinable con un día en Trevelin",
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
      name: "Campo de Tulipanes",
      category: "aventura",
      description:
        "Visita a un campo de tulipanes en plena estepa patagónica, con más de un millón de flores en temporada. Paseo por los sembrados, fotos entre colores y paisaje de cordillera al fondo — una postal distinta de la Patagonia andina.",
      highlights: [
        "Temporada primaveral (octubre–diciembre aprox.)",
        "Ideal para familias y fotografía",
        "Combinable con Esquel o Trevelin en el mismo viaje",
        "Consultar fechas de floración según el clima del año",
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
      name: "Buceo con lobos marinos",
      category: "fauna",
      description:
        "Inmersión guiada con lobos marinos de un pelo en el Golfo Nuevo o Punta Loma. Los animales se acercan con curiosidad en aguas frías y cristalinas — una de las experiencias de fauna más intensas de la costa patagónica.",
      highlights: [
        "No requiere experiencia previa en buceo (opción baptism)",
        "Temporada y condiciones del mar según el mes",
        "Equipo y guía instructor incluidos",
        "Reservar con anticipación en temporada de ballenas",
      ],
    },
    {
      name: "Punta Tombo — Pingüinera",
      category: "fauna",
      description:
        "Reserva de más de 500.000 pingüinos de Magallanes en temporada de cría (septiembre a marzo). Pasarelas entre nidos y colonias a metros de los animales, con guías que explican su ciclo reproductivo.",
      highlights: [
        "Mayor pingüinera continental del mundo",
        "Temporada septiembre–marzo (pico en verano)",
        "Día completo desde Puerto Madryn (~170 km)",
        "Llevar abrigo — hace mucho viento en la costa",
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
      name: "Glaciar Perito Moreno — Pasarelas",
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
      name: "Navegación corta con pasarelas",
      category: "navegacion",
      description:
        "Acercate a la zona de ruptura del glaciar desde el agua. Navegación de 1 hora frente a la pared norte del Glaciar Perito Moreno, exactamente donde ocurren los famosos desprendimientos. El embarque es en Puerto Moreno, al pie de las pasarelas y junto al Canal de los Témpanos, con guía bilingüe que explica la formación del glaciar y sus fenómenos únicos.",
      highlights: [
        "~1 h de navegación frente a la pared norte del glaciar",
        "Embarque en Puerto Moreno, junto a las pasarelas",
        "Zona de ruptura y Canal de los Témpanos",
        "Combinable con tiempo libre en los miradores",
      ],
    },
    {
      name: "Parque Nacional Los Glaciares",
      category: "aventura",
      description:
        "Visita guiada al Parque Nacional Los Glaciares con ingreso, traslado y tiempo en los principales miradores del Glaciar Perito Moreno. Una forma organizada de conocer el parque sin preocuparte por logística ni entradas.",
      highlights: [
        "Incluye entrada al parque y traslado desde El Calafate",
        "Tiempo libre en pasarelas y miradores",
        "Guía bilingüe según la salida",
        "Opera todo el año",
      ],
    },
    {
      name: "Minitrekking — Glaciar Perito Moreno",
      category: "aventura",
      description:
        "Caminata guiada sobre el hielo del Glaciar Perito Moreno con crampones. Cruzás el Brazo Rico del Lago Argentino en barco, recorrés bosque andino hasta la base del glaciar y explorás grietas azules, sumideros y lagunas de deshielo durante una hora y media sobre hielo firme.",
      highlights: [
        "Navegación frente a la pared sur del glaciar",
        "Incluye crampones, casco y guía bilingüe",
        "Aptitud moderada, de 8 a 65 años; jornada completa",
        "Se agota rápido en enero y febrero — reservar con anticipación",
      ],
    },
    {
      name: "Navegación Todo Glaciares",
      category: "navegacion",
      description:
        "Jornada completa por el Brazo Norte del Lago Argentino: atravesás la Boca del Diablo, navegás entre témpanos del glaciar Upsala y llegás al frente del Spegazzini —el más alto del parque— con vistas a los glaciares Seco, Heim Sur y Peineta. Incluye desembarco en Base Spegazzini con sendero interpretativo por el bosque patagónico.",
      highlights: [
        "Cinco glaciares en una sola navegación",
        "Desembarco de ~2 h en refugio con miradores a la Bahía de los Glaciares",
        "Opción con traslado desde El Calafate (47 km hasta Punta Bandera)",
        "Reservar con tiempo en verano austral",
      ],
    },
    {
      name: "Nativo Experience — Lagos y Cavernas",
      category: "aventura",
      description:
        "Excursión de medio día en 4×4 por la costa del Lago Argentino, en la Reserva Natural Punta Walichu. Recorrido antropológico con miradores sobre los acantilados, pinturas rupestres de más de 2.000 años y almuerzo o cena en una cueva con vista al lago y la cordillera.",
      highlights: [
        "Ideal para el día de llegada o de partida (~3 h)",
        "Sitio arqueológico con arte rupestre y guía interpretativo",
        "Comida regional incluida en cueva frente al Lago Argentino",
        "Salidas diarias AM y PM; dificultad baja",
      ],
    },
    {
      name: "Estancia 25 de Mayo — Tarde de Campo",
      category: "aventura",
      description:
        "Tarde de campo en una estancia pionera a pasos del centro de El Calafate, con 17.000 hectáreas al pie del Cerro Calafate. Fogón con tortas fritas, arreo de ovejas, demostración de esquila, recorrido por la huerta orgánica y cena de cordero patagónico con show folclórico.",
      highlights: [
        "Tradiciones rurales: corrales, esquila e hilanderas",
        "Degustación de cordero confitado en mirador del arroyo",
        "Cena regional en el quincho con música y danzas típicas",
        "Opera de septiembre a abril; salidas por la tarde",
      ],
    },
    {
      name: "Día de Campo en Estancia — Parque Nacional",
      category: "aventura",
      description:
        "Día de campo en una estancia pionera dentro del Parque Nacional Los Glaciares, sobre el brazo sur del Lago Argentino. Más de cien años de historia familiar, demostraciones gauchas de esquila y arreo, caminata hacia La Angostura —donde confluyen el Lago Roca y el Argentino— y asado de cordero patagónico con vista a la cordillera.",
      highlights: [
        "~5 h en la estancia + traslado desde El Calafate (~56 km)",
        "Recepción con bebidas calientes y pastelería casera",
        "Ordeñe, esquila, prueba de riendas y casco histórico",
        "Cabalgata opcional; opera del 15 de septiembre al 15 de mayo",
      ],
    },
    {
      name: "Kayak en Río Santa Cruz",
      category: "aventura",
      description:
        "Aventura en kayak doble por el Río Santa Cruz, siguiendo la ruta histórica de exploración por la Patagonia. Traslado en 4×4 por la Ruta 40, remada guiada de ~15 km con trajes secos y equipamiento completo, y almuerzo en una estancia a orillas del río.",
      highlights: [
        "Sin experiencia previa; instructores certificados",
        "Incluye traje seco Gore-Tex, chaleco, botas y guantes",
        "~90 min de remada entre estepa, fauna y formaciones geológicas",
        "Sujeto a clima — se cancela con vientos fuertes",
      ],
    },
    {
      name: "Full Day El Chaltén desde Calafate",
      category: "aventura",
      description:
        "Excursión de día completo desde El Calafate a El Chaltén: traslado por la Ruta 40 con vistas al Lago Argentino, Viedma y el Fitz Roy, y tiempo libre en el pueblo para caminatas cortas a miradores como Cóndores o Chorrillo del Salto.",
      highlights: [
        "220 km por Ruta 40 (~3 h de viaje cada tramo)",
        "Tiempo libre en El Chaltén para senderos cortos",
        "Ideal para quienes no se alojan en Chaltén",
        "Consultar clima — puede afectar visibilidad del Fitz Roy",
      ],
    },
    {
      name: "Transfer Aeropuerto — El Calafate",
      category: "aventura",
      description:
        "Traslado privado o compartido entre el Aeropuerto Comandante Armando Tola y tu alojamiento en El Calafate. Servicio puerta a puerta para llegadas y salidas, sin preocuparte por taxis ni horarios.",
      highlights: [
        "Aeropuerto ↔ hotel en El Calafate",
        "Opción privada o compartida según disponibilidad",
        "Coordinamos horarios con tu vuelo",
        "Combinable con otras excursiones del viaje",
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
      name: "Tren del Fin del Mundo y Parque Nacional Tierra del Fuego",
      category: "aventura",
      description:
        "Combiná el histórico Tren del Fin del Mundo con la visita al Parque Nacional Tierra del Fuego: bosque fueguino, turberas, costa del Canal Beagle y el icónico tren a vapor que recorre el valle del Río Pipo.",
      highlights: [
        "Incluye traslado desde Ushuaia",
        "Tren del Fin del Mundo + tiempo en el parque",
        "Senda Costera y Lapataia (fin de la Ruta 3)",
        "Viento fuerte frecuente — capa impermeable obligatoria",
      ],
    },
    {
      name: "Navegación al Faro Les Éclaireurs",
      category: "navegacion",
      description:
        "Navegación por el Canal Beagle hasta el Faro Les Éclaireurs, con avistaje de lobos marinos, cormoranes y, según la salida, Isla de los Pájaros. Incluye traslado desde tu alojamiento en Ushuaia.",
      highlights: [
        "Traslado hotel ↔ puerto incluido",
        "Faro Les Éclaireurs y fauna marina",
        "Salidas de 4–6 h según el circuito",
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
    {
      name: "Cerro Castor — Ski y snowboard",
      category: "aventura",
      description:
        "Centro de ski y snowboard a 26 km de Ushuaia, con pistas para todos los niveles y vistas al Canal Beagle. La temporada va de junio a octubre, con la mejor nieve en julio y agosto.",
      highlights: [
        "Pistas para principiantes, intermedios y avanzados",
        "Traslado desde Ushuaia incluido en la mayoría de las salidas",
        "Alquiler de equipo disponible en el centro",
        "Temporada invierno: junio–octubre",
      ],
    },
    {
      name: "Trineos en la nieve",
      category: "aventura",
      description:
        "Diversión en trineo sobre la nieve del Valle de Tierra Mayor o cerros cercanos a Ushuaia. Actividad apta para familias, con paseos cortos o descensos guiados según la salida y la temporada.",
      highlights: [
        "Apto para familias y sin experiencia previa",
        "Temporada de nieve: junio–septiembre aprox.",
        "Incluye equipo y guía según la excursión",
        "Combinable con otras actividades de invierno",
      ],
    },
    {
      name: "Noche Nórdica",
      category: "aventura",
      description:
        "Caminata nocturna con raquetas de nieve bajo las estrellas en los bosques de Tierra del Fuego. Una experiencia íntima con el silencio de la nieve, linternas frontales y, si el cielo despeja, una de las mejores bóvedas celestes del hemisferio sur.",
      highlights: [
        "Raquetas y guía incluidos",
        "Temporada invernal (junio–agosto)",
        "Grupos reducidos para mejor experiencia",
        "Abrigo térmico y calzado impermeable indispensables",
      ],
    },
    {
      name: "Motos de nieve",
      category: "aventura",
      description:
        "Recorrido en moto de nieve por lagos congelados y bosques nevados de Tierra del Fuego. Adrenalina y paisajes blancos con guías que conocen la zona y adaptan la ruta según condiciones del terreno.",
      highlights: [
        "No requiere experiencia previa (salidas guiadas)",
        "Temporada invernal con nieve acumulada",
        "Equipo de abrigo y casco incluidos",
        "Edad mínima según el operador",
      ],
    },
    {
      name: "Glaciar Martial",
      category: "trekking",
      description:
        "Trekking desde Ushuaia hasta el Glaciar Martial, con vistas panorámicas de la ciudad, el Canal Beagle y las montañas chilenas. Sendero de dificultad media que asciende por bosque de lengas hasta el frente del glaciar.",
      highlights: [
        "3–4 h ida y vuelta desde el teleférico o la base",
        "Vistas de Ushuaia y el Canal Beagle",
        "En invierno puede requerir crampones o raquetas",
        "Consultar estado del sendero según temporada",
      ],
    },
    {
      name: "Puerto Almanza",
      category: "navegacion",
      description:
        "Excursión en catamarán o lancha al sur del Canal Beagle hasta Puerto Almanza, un rincón pesquero rodeado de montañas y bosque. Degustación de centolla y mariscos patagónicos en un entorno remoto y tranquilo.",
      highlights: [
        "Navegación por el Canal Beagle sur",
        "Gastronomía de centolla y productos del mar",
        "Paisaje remoto con montañas y bosque nativo",
        "Día completo con traslado desde Ushuaia",
      ],
    },
    {
      name: "Estancia Harberton",
      category: "aventura",
      description:
        "Visita a la primera estancia de Tierra del Fuego, fundada en 1886 por el misionero anglicano Thomas Bridges. Recorrido por el casco histórico, el museo acuarológico y los jardines a orillas del Canal Beagle.",
      highlights: [
        "Historia pionera de Tierra del Fuego",
        "Museo acuarológico y casco histórico",
        "Acceso en navegación por el Canal Beagle",
        "Combinable con avistaje de fauna marina",
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
