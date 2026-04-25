"use client";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { useEffect, useMemo, useRef } from "react";

type DestinationKey =
  | "none"
  | "bariloche"
  | "ushuaia"
  | "calafate"
  | "san-martin-andes"
  | "villa-la-angostura"
  | "puerto-madryn"
  | "el-bolson"
  | "esquel"
  | "mendoza";

type FocusConfig = {
  center: [number, number];
  zoom: number;
};

const MAP_FOCUS: Record<DestinationKey, FocusConfig> = {
  none: { center: [-44.5, -70.2], zoom: 4.6 },
  bariloche: { center: [-41.1335, -71.3103], zoom: 12 },
  ushuaia: { center: [-54.8019, -68.303], zoom: 12.2 },
  calafate: { center: [-50.3379, -72.2648], zoom: 12.2 },
  "san-martin-andes": { center: [-40.1579, -71.3534], zoom: 12.2 },
  "villa-la-angostura": { center: [-40.7617, -71.6463], zoom: 13 },
  "puerto-madryn": { center: [-42.7692, -65.0385], zoom: 12.4 },
  "el-bolson": { center: [-41.9664, -71.5336], zoom: 12.8 },
  esquel: { center: [-42.9115, -71.3195], zoom: 12.8 },
  mendoza: { center: [-32.8895, -68.8458], zoom: 12.2 },
};

export function PlannerMap({ destination }: { destination: DestinationKey }) {
  const mapNodeRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const markerIcon = useMemo(
    () =>
      L.divIcon({
        className: "planner-map-pin-wrapper",
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="28.8" height="38.4" viewBox="0 0 24 36" role="img" aria-hidden="true" style="display:block;filter:drop-shadow(0 2px 3px rgba(0,0,0,.28))">
          <path fill="#C5221F" d="M12 36c-.2 0-.4-.1-.5-.2C11.2 35.2 1 21.9 1 12.5 1 6.4 5.9 1.5 12 1.5S23 6.4 23 12.5c0 9.4-10.2 22.7-10.5 23.3-.1.1-.3.2-.5.2z"/>
          <circle cx="12" cy="12.5" r="4.6" fill="#fff"/>
        </svg>`,
        iconSize: [28.8, 38.4],
        iconAnchor: [14.4, 38.4],
      }),
    [],
  );

  useEffect(() => {
    const focus = MAP_FOCUS[destination];

    if (!mapRef.current && mapNodeRef.current) {
      const map = L.map(mapNodeRef.current, {
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: true,
      }).setView(focus.center, focus.zoom);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      mapRef.current = map;
    }

    const map = mapRef.current;
    if (!map) return;

    map.flyTo(focus.center, focus.zoom, {
      duration: 1.1,
      easeLinearity: 0.35,
      animate: true,
    });

    if (destination === "none") {
      markerRef.current?.remove();
      markerRef.current = null;
      return;
    }

    if (!markerRef.current) {
      markerRef.current = L.marker(focus.center, { icon: markerIcon }).addTo(map);
    } else {
      markerRef.current.setLatLng(focus.center);
    }
  }, [destination, markerIcon]);

  return (
    <div
      ref={mapNodeRef}
      className="h-full min-h-[420px] w-full"
      aria-label="Mapa interactivo de Patagonia Argentina"
    />
  );
}
