import { SECTION_IDS, PLANNER_PATH } from "@/lib/constants";
import { getHomeSectionHref } from "@/lib/home-sections";

export type NavLabelKey =
  | "home"
  | "destinations"
  | "accommodations"
  | "excursions"
  | "winterShop"
  | "promos"
  | "planTrip";

export type NavLink = {
  labelKey: NavLabelKey;
  href: string;
  id: string;
};

export const NAV_EXPLORE_LINKS: NavLink[] = [
  { labelKey: "destinations", href: "/destinos", id: "destinos" },
  { labelKey: "accommodations", href: "/alojamientos", id: "alojamientos" },
  { labelKey: "excursions", href: "/excursiones", id: "excursiones" },
];

export const NAV_COMPANY_LINKS: NavLink[] = [
  { labelKey: "winterShop", href: "/invierno", id: "invierno" },
];

export const NAV_PLANNER_LINK: NavLink = {
  labelKey: "planTrip",
  href: PLANNER_PATH,
  id: SECTION_IDS.planner,
};

export const NAV_HOME_LINK: NavLink = {
  labelKey: "home",
  href: "#inicio",
  id: "inicio",
};

export const NAV_DESKTOP_LINKS: NavLink[] = [...NAV_EXPLORE_LINKS, ...NAV_COMPANY_LINKS];

/** Accesos del menú mobile (sin CTA; el planner va aparte como acción principal). */
export function getMobileNavLinks(isHome: boolean): NavLink[] {
  const promosLink: NavLink = {
    labelKey: "promos",
    href: getHomeSectionHref(SECTION_IDS.promosPatagonia, isHome),
    id: SECTION_IDS.promosPatagonia,
  };

  if (isHome) {
    return [NAV_HOME_LINK, ...NAV_EXPLORE_LINKS, promosLink];
  }

  return [
    { labelKey: "home", href: "/", id: "home" },
    ...NAV_EXPLORE_LINKS,
    promosLink,
  ];
}

/** Resalta link de nav cuando la ruta actual coincide (incluye subrutas). */
export function isNavHrefActive(pathname: string, href: string): boolean {
  if (href.startsWith("#") || href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
