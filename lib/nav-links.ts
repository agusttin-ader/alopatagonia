import { SECTION_IDS, PLANNER_PATH } from "@/lib/constants";

export type NavLink = {
  label: string;
  href: string;
  id: string;
};

export const NAV_EXPLORE_LINKS: NavLink[] = [
  { label: "Destinos", href: "/destinos", id: "destinos" },
  { label: "Alojamientos", href: "/alojamientos", id: "alojamientos" },
  { label: "Excursiones", href: "/excursiones", id: "excursiones" },
];

export const NAV_COMPANY_LINKS: NavLink[] = [
  { label: "Indumentaria", href: "/invierno", id: "invierno" },
];

export const NAV_PLANNER_LINK: NavLink = {
  label: "Planear mi viaje",
  href: PLANNER_PATH,
  id: SECTION_IDS.planner,
};

export const NAV_HOME_LINK: NavLink = {
  label: "Inicio",
  href: "#inicio",
  id: "inicio",
};

export const NAV_DESKTOP_LINKS: NavLink[] = [...NAV_EXPLORE_LINKS, ...NAV_COMPANY_LINKS];

export function getMobileNavLinks(isHome: boolean): NavLink[] {
  if (isHome) {
    return [NAV_HOME_LINK, ...NAV_EXPLORE_LINKS, NAV_PLANNER_LINK, ...NAV_COMPANY_LINKS];
  }

  return [
    { label: "Inicio", href: "/", id: "home" },
    ...NAV_EXPLORE_LINKS,
    NAV_PLANNER_LINK,
    ...NAV_COMPANY_LINKS,
  ];
}
