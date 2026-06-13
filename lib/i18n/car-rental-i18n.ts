type SupportedLocale = "en" | "pt";

type CarRentalI18n = {
  operatorName: string;
  description: string;
  imageAlt: string;
};

const CAR_RENTAL_EN = {
  operatorName: "Alo Patagonia Car Rental",
  defaultDescription: (destination: string) =>
    `Explore ${destination} at your own pace with a rental car arranged through Alo Patagonia. We coordinate pick-up, dates and return so your road trip starts the moment you land.`,
  imageAlt: (destination: string) => `Car rental in ${destination} — Alo Patagonia`,
  overrides: {
    bariloche: (destination: string) =>
      `Explore the lakes, mountain passes and scenic routes around ${destination} with a rental car. From Circuito Chico to the Seven Lakes Road — we coordinate pick-up, dates and return so your trip starts the moment you land.`,
  } as Record<string, (destination: string) => string>,
};

const CAR_RENTAL_PT = {
  operatorName: "Alo Patagonia Aluguel de Carros",
  defaultDescription: (destination: string) =>
    `Explore ${destination} no seu ritmo com um carro alugado pela Alo Patagonia. Coordenamos retirada, datas e devolução para que sua viagem de estrada comece assim que você pousar.`,
  imageAlt: (destination: string) => `Aluguel de carro em ${destination} — Alo Patagonia`,
  overrides: {
    bariloche: (destination: string) =>
      `Explore os lagos, passes de montanha e as rotas cênicas ao redor de ${destination} com um carro alugado. Do Circuito Chico à Rota dos Sete Lagos — coordenamos retirada, datas e devolução para que sua viagem comece assim que você pousar.`,
  } as Record<string, (destination: string) => string>,
};

const CAR_RENTAL_BY_LOCALE = { en: CAR_RENTAL_EN, pt: CAR_RENTAL_PT };

export function getCarRentalI18n(
  locale: SupportedLocale,
  destinationSlug: string,
  destinationName: string,
): CarRentalI18n {
  const copy = CAR_RENTAL_BY_LOCALE[locale];
  const descriptionFn = copy.overrides[destinationSlug] ?? copy.defaultDescription;
  return {
    operatorName: copy.operatorName,
    description: descriptionFn(destinationName),
    imageAlt: copy.imageAlt(destinationName),
  };
}
