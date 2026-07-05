export type AccommodationType = "cabana" | "departamento" | "hostel";

export type CatalogImage = { src: string; alt: string };

export type CatalogItemKind = "accommodation" | "excursion";
export type ExcursionCategory = "trekking" | "navegacion" | "fauna" | "aventura";

export type ExcursionContent = {
  name: string;
  category: ExcursionCategory;
  description: string;
  highlights: string[];
};

export type CatalogItem = {
  id: string;
  /** Segmento de URL dentro de `/destinos/[slug]/`. */
  itemSlug: string;
  name: string;
  description?: string;
  type?: AccommodationType;
  category?: ExcursionCategory;
  images: CatalogImage[];
  /** Detalles cortos bajo la galería (capacidad, ubicación, etc.). */
  highlights?: string[];
};

export type CarRentalPartner = {
  operatorName: string;
  description: string;
  images?: CatalogImage[];
};

export type DestinationCatalog = {
  slug: string;
  name: string;
  region: string;
  intro: string;
  heroImage: string;
  accommodations: CatalogItem[];
  excursions: CatalogItem[];
  carRental: CarRentalPartner;
  published: true;
};
