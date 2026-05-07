"use client";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { useEffect, useMemo, useRef } from "react";

import {
  PLANNER_DEFAULT_FOCUS,
  PLANNER_DESTINATION_FOCUS,
  type PlannerDestinationValue,
} from "@/lib/constants";

export function PlannerMap({ destination }: { destination: PlannerDestinationValue }) {
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
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const focus =
      destination === "none"
        ? PLANNER_DEFAULT_FOCUS
        : PLANNER_DESTINATION_FOCUS[destination];

    if (!mapRef.current && mapNodeRef.current) {
      const map = L.map(mapNodeRef.current, {
        zoomControl: true,
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

    if (prefersReducedMotion) {
      map.setView(focus.center, focus.zoom);
    } else {
      map.flyTo(focus.center, focus.zoom, {
        duration: 1.1,
        easeLinearity: 0.35,
        animate: true,
      });
    }

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
      className="h-full min-h-[360px] w-full"
      aria-label="Mapa interactivo de Patagonia Argentina"
    />
  );
}
