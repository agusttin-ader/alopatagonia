import { SECTION_IDS, PLANNER_PATH } from "@/lib/constants";

export type NavLabelKey =
  | "home"
  | "destinations"
  | "accommodations"
  | "excursions"
  | "winterShop"
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

export function getMobileNavLinks(isHome: boolean): NavLink[] {
  if (isHome) {
    return [NAV_HOME_LINK, ...NAV_EXPLORE_LINKS, NAV_PLANNER_LINK, ...NAV_COMPANY_LINKS];
  }

  return [
    { labelKey: "home", href: "/", id: "home" },
    ...NAV_EXPLORE_LINKS,
    NAV_PLANNER_LINK,
    ...NAV_COMPANY_LINKS,
  ];
}
