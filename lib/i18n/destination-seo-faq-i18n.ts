import type { SeoFaqItem } from "@/lib/seo-destinations";

type SupportedLocale = "en" | "pt";

const DESTINATION_SEO_FAQ_EN: Record<string, SeoFaqItem[]> = {
  bariloche: [
    {
      question: "How many days should I spend in Bariloche?",
      answer:
        "For a first visit, 4 to 7 days is ideal: enough for Circuito Chico, a lake excursion, Cerro Tronador or Catedral, and a free day. With more time you can add the Seven Lakes route, El Bolsón or winter activities depending on the season.",
    },
    {
      question: "What excursions are available in Bariloche?",
      answer:
        "More than 25 organised outings: land, lake, adventure and snow. From Victoria Island and Puerto Blest to skiing, snowshoeing, kayaking and 4x4 steppe tours. Each listing shows duration, schedule and what's included.",
    },
    {
      question: "Should I book excursions in advance?",
      answer:
        "In January, February and winter holidays it's worth booking boat trips, ski and snow outings ahead. Message us on WhatsApp with your dates and we'll arrange accommodation, transfers and excursions in one contact.",
    },
  ],
  "san-martin": [
    {
      question: "Can San Martín de los Andes be combined with Bariloche?",
      answer:
        "Yes, it's one of the Lake District classics: many travellers do Bariloche → Villa La Angostura → San Martín by car (around 200 km between Bariloche and San Martín, with stops along the way). Plan at least 2–3 nights at each base.",
    },
    {
      question: "When is the best time to visit San Martín de los Andes?",
      answer:
        "From October to April more excursions and routes are open. Winter is quieter with snow on nearby peaks; some mountain roads may be closed.",
    },
  ],
  "el-chalten": [
    {
      question: "When is the best time to visit El Chaltén?",
      answer:
        "From October to April there are more services and accessible trails. January and February are the busiest months. In winter there is less accommodation and experience with cold and snow is required.",
    },
    {
      question: "Do I need a guide for Laguna de los Tres?",
      answer:
        "It is not compulsory: the trail is marked and many people hike it independently. We do recommend leaving early, bringing warm layers and food. If you'd prefer to go with a guide, we can pass on local options.",
    },
  ],
  esquel: [
    {
      question: "What is there to do in Esquel and Trevelin?",
      answer:
        "Los Alerces National Park and the boat trip on Lake Futalaufquen are must-dos. Add a day in Trevelin (Valle 16 de Octubre, Welsh tea) and, in winter, skiing at La Hoya. We'll arrange accommodation and excursions based on how many days you have.",
    },
    {
      question: "Is Esquel far from the Madryn coast?",
      answer:
        "Yes — around 650 km between Esquel and Puerto Madryn. They are two distinct poles of Chubut (mountains vs. coast). It's best to choose one as the focus of your trip or plan a domestic flight or several days on the road.",
    },
  ],
  "villa-la-angostura": [
    {
      question: "Is Villa La Angostura good for families?",
      answer:
        "Yes. There are short walks, lake beaches, calm boat trips and a quieter pace than Bariloche. We'll recommend accommodation and outings based on ages and whether you're travelling in summer or winter.",
    },
    {
      question: "How do you get to the Arrayán Forest?",
      answer:
        "In high season boats run from Bahía Brava, or you can walk in from the National Park (subject to access). Lake levels and weather determine which option works best — we'll let you know when you enquire about dates.",
    },
  ],
  "puerto-madryn": [
    {
      question: "When can you see whales in Puerto Madryn?",
      answer:
        "The southern right whale arrives at Golfo San José between June and December, with peak activity from September to November. Boat trips depart from Puerto Pirámides; if the weather is bad, they are rescheduled.",
    },
    {
      question: "How many days are enough in Madryn?",
      answer:
        "3 to 4 days allows you to do Península Valdés, a whale watching boat trip and Punta Loma. If you want to add penguins at Punta Tombo (season Sep–Mar), plan an extra day.",
    },
  ],
  "el-calafate": [
    {
      question: "Can El Calafate be combined with El Chaltén?",
      answer:
        "Yes, it's the classic Santa Cruz combo: 220 km along Route 40 (about 3 hours). Many travellers spend 2–3 nights in Calafate (glaciers) and 2–3 in Chaltén (trekking). We can help with transfers, hotels and excursions at each base.",
    },
    {
      question: "Is it necessary to book Perito Moreno in advance?",
      answer:
        "The walkways don't require a booking, but in January and February it's worth arriving early. Boat trips and the mini-trekking on the ice do sell out — message us with your dates and we'll take care of it.",
    },
  ],
  traful: [
    {
      question: "How do you get to Villa Traful?",
      answer:
        "Via Route 65 from San Martín de los Andes (about 80 km) or along the Seven Lakes Route from Bariloche / Villa La Angostura. Without a car there are seasonal minibuses — ask us based on your travel dates.",
    },
    {
      question: "What is the submerged forest?",
      answer:
        "The remains of a forest flooded by volcanic activity in the 1960s, visible from the water when conditions are very clear. Boat trips are available and, in calm water, snorkelling. It depends on lake conditions.",
    },
  ],
  // Q1 = translated CLIENT_DESTINATION_FAQ_COPY.ushuaia[0]; Q2 = translated DESTINATION_SEO.ushuaia.faq[1]
  ushuaia: [
    {
      question: "How many days do I need to see Ushuaia?",
      answer:
        "We recommend 3 to 4 days to enjoy the National Park, the Beagle Channel and the main highlights of the city. If you want to add extended boat trips, trekking or seasonal activities, having a few extra days and booking in advance is ideal. Message us on WhatsApp and we'll help you plan it.",
    },
    {
      question: "Can Ushuaia be combined with El Calafate?",
      answer:
        "Yes, but they are approximately 880 km apart by road or a 1-hour direct flight. The usual approach is to fly Calafate–Ushuaia and combine glaciers with the end of the world in the same 10–12 day trip.",
    },
  ],
};

const DESTINATION_SEO_FAQ_PT: Record<string, SeoFaqItem[]> = {
  bariloche: [
    {
      question: "Quantos dias vale a pena ficar em Bariloche?",
      answer:
        "Para uma primeira visita, entre 4 e 7 dias é o ideal: tempo para o Circuito Chico, um passeio lacustre, Cerro Tronador ou Catedral e um dia livre. Com mais tempo dá para somar Rota dos Sete Lagos, El Bolsón ou atividades de inverno conforme a época.",
    },
    {
      question: "Quais excursões há em Bariloche?",
      answer:
        "Mais de 25 saídas organizadas: terrestres, lacustres, aventura e neve. Da Ilha Victoria e Puerto Blest ao ski, raquetas, caiaque e 4x4 na estepa. Cada ficha indica duração, horário e o que está incluído.",
    },
    {
      question: "Conviém reservar as excursões com antecedência?",
      answer:
        "Em janeiro, fevereiro e férias de inverno vale reservar navegações, ski e saídas de neve com antecedência. Fale conosco no WhatsApp com suas datas e montamos hospedagem, transfers e excursões em um só contato.",
    },
  ],
  "san-martin": [
    {
      question: "San Martín de los Andes pode ser combinado com Bariloche?",
      answer:
        "Sim, é um dos clássicos do Corredor dos Lagos: muitos viajantes fazem Bariloche → Villa La Angostura → San Martín de carro (cerca de 200 km entre Bariloche e San Martín, com paradas pelo caminho). Planeje pelo menos 2–3 noites em cada base.",
    },
    {
      question: "Qual é a melhor época para visitar San Martín de los Andes?",
      answer:
        "De outubro a abril há mais excursões e estradas abertas. No inverno, o destino fica mais intimista e há neve nos picos próximos; algumas estradas de montanha podem estar fechadas.",
    },
  ],
  "el-chalten": [
    {
      question: "Qual é a melhor época para visitar El Chaltén?",
      answer:
        "De outubro a abril há mais serviços e trilhas acessíveis. Janeiro e fevereiro são os meses de maior movimento. No inverno, a oferta de hospedagem é menor e é preciso experiência com frio e neve.",
    },
    {
      question: "Preciso de guia para a Laguna de los Tres?",
      answer:
        "Não é obrigatório: a trilha é sinalizada e muitas pessoas a percorrem de forma independente. Recomendamos sair cedo, levar agasalho e comida. Se preferir ir com guia, podemos indicar opções locais.",
    },
  ],
  esquel: [
    {
      question: "O que fazer em Esquel e Trevelin?",
      answer:
        "O Parque Nacional Los Alerces e o passeio de barco no Lago Futalaufquen são imperdíveis. Vale acrescentar um dia em Trevelin (Valle 16 de Octubre, chá galês) e, no inverno, esqui em La Hoya. Organizamos hospedagem e excursões de acordo com quantos dias você tiver.",
    },
    {
      question: "Esquel fica longe do litoral de Madryn?",
      answer:
        "Sim — são cerca de 650 km entre Esquel e Puerto Madryn. São dois polos distintos de Chubut (montanha vs. mar). O ideal é escolher um como eixo da viagem ou planejar um voo doméstico ou vários dias de estrada.",
    },
  ],
  "villa-la-angostura": [
    {
      question: "Villa La Angostura é boa para famílias?",
      answer:
        "Sim. Há passeios curtos, praias no lago, passeios de barco tranquilos e um ritmo mais calmo do que Bariloche. Indicamos hospedagem e atividades conforme as idades e a temporada — verão ou inverno.",
    },
    {
      question: "Como chegar à Floresta de Arrayanes?",
      answer:
        "Na alta temporada há lanchas saindo da Bahía Brava ou acesso a pé pelo Parque Nacional (conforme abertura). O nível do lago e o clima definem a melhor opção — avisamos quando você consultar as datas.",
    },
  ],
  "puerto-madryn": [
    {
      question: "Quando se pode ver baleias em Puerto Madryn?",
      answer:
        "A baleia-franca-austral chega ao Golfo San José entre junho e dezembro, com pico de atividade de setembro a novembro. Os passeios de barco partem de Puerto Pirámides; em caso de mau tempo, são remarcados.",
    },
    {
      question: "Quantos dias são suficientes em Madryn?",
      answer:
        "Com 3 a 4 dias dá para fazer a Península Valdés, o passeio de avistamento de baleias e Punta Loma. Se quiser acrescentar os pinguins em Punta Tombo (temporada set–mar), planeje um dia a mais.",
    },
  ],
  "el-calafate": [
    {
      question: "El Calafate pode ser combinado com El Chaltén?",
      answer:
        "Sim, é o combo clássico de Santa Cruz: 220 km pela Rota 40 (cerca de 3 horas). Muitos viajantes ficam 2–3 noites em Calafate (geleiras) e 2–3 em Chaltén (trilhas). Ajudamos com transfers, hotéis e excursões em cada base.",
    },
    {
      question: "É necessário reservar o Perito Moreno com antecedência?",
      answer:
        "As passarelas não exigem reserva, mas em janeiro e fevereiro vale a pena chegar cedo. Os passeios de barco e o mini-trekking sobre o gelo esgotam rápido — mande-nos as datas pelo WhatsApp e cuidamos de tudo.",
    },
  ],
  traful: [
    {
      question: "Como chegar a Villa Traful?",
      answer:
        "Pela Rota 65 a partir de San Martín de los Andes (cerca de 80 km) ou pela Rota dos Sete Lagos, saindo de Bariloche / Villa La Angostura. Sem carro próprio, há vans sazonais — consulte-nos conforme sua data de viagem.",
    },
    {
      question: "O que é a floresta submersa?",
      answer:
        "São os restos de uma floresta inundada por atividade vulcânica nos anos 1960, visíveis pela água quando a visibilidade está muito boa. Há passeios de barco e, com o lago calmo, snorkeling. Depende das condições do lago.",
    },
  ],
  // Q1 = translated CLIENT_DESTINATION_FAQ_COPY.ushuaia[0]; Q2 = translated DESTINATION_SEO.ushuaia.faq[1]
  ushuaia: [
    {
      question: "Quantos dias preciso para conhecer Ushuaia?",
      answer:
        "Recomendamos entre 3 e 4 dias para aproveitar o Parque Nacional, o Canal Beagle e os principais atrativos da cidade. Se quiser acrescentar passeios de barco mais longos, trekking ou atividades de temporada, o ideal é ter alguns dias a mais e reservar com antecedência. Fale com a gente pelo WhatsApp e te ajudamos a planejar.",
    },
    {
      question: "Ushuaia pode ser combinada com El Calafate?",
      answer:
        "Sim, mas são cerca de 880 km por estrada ou 1 hora de voo direto. O mais comum é voar Calafate–Ushuaia e combinar geleiras com o fim do mundo na mesma viagem de 10–12 dias.",
    },
  ],
};

const FAQ_BY_LOCALE: Record<SupportedLocale, Record<string, SeoFaqItem[]>> = {
  en: DESTINATION_SEO_FAQ_EN,
  pt: DESTINATION_SEO_FAQ_PT,
};

export function getDestinationSeoFaqI18n(
  locale: SupportedLocale,
  slug: string,
): SeoFaqItem[] | undefined {
  return FAQ_BY_LOCALE[locale][slug];
}
