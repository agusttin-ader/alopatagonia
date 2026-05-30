export type AccommodationType = "cabana" | "departamento" | "hostel";

export type CatalogImage = { src: string; alt: string };

export type CatalogItem = {
  id: string;
  name: string;
  description?: string;
  type?: AccommodationType;
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
