"use client";

import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight, Mail } from "lucide-react";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { SECTION_IDS, SITE, getWhatsAppUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";

const PlannerMap = dynamic(
  () => import("@/components/planner/PlannerMap").then((mod) => mod.PlannerMap),
  { ssr: false },
);

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

const destinationLabel: Record<DestinationKey, string> = {
  none: "sin destino definido",
  bariloche: "Bariloche",
  ushuaia: "Ushuaia",
  calafate: "El Calafate",
  "san-martin-andes": "San Martin de los Andes",
  "villa-la-angostura": "Villa La Angostura",
  "puerto-madryn": "Puerto Madryn",
  "el-bolson": "El Bolson",
  esquel: "Esquel",
  mendoza: "Mendoza",
};

const DESTINATION_OPTIONS: Array<{ value: DestinationKey; label: string }> = [
  { value: "none", label: "Sin destino definido" },
  { value: "bariloche", label: "Bariloche" },
  { value: "ushuaia", label: "Ushuaia" },
  { value: "calafate", label: "El Calafate" },
  { value: "san-martin-andes", label: "San Martin de los Andes" },
  { value: "villa-la-angostura", label: "Villa La Angostura" },
  { value: "puerto-madryn", label: "Puerto Madryn" },
  { value: "el-bolson", label: "El Bolson" },
  { value: "esquel", label: "Esquel" },
  { value: "mendoza", label: "Mendoza" },
];

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

function toISODate(date: Date) {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function fromISODate(value: string) {
  if (!value) return null;
  const parsed = new Date(`${value}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatDate(value: string) {
  const date = fromISODate(value);
  if (!date) return "sin fecha";
  const d = `${date.getDate()}`.padStart(2, "0");
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  return `${d}/${m}/${date.getFullYear()}`;
}

function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const today = new Date();
  const selectedDate = fromISODate(value);
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(selectedDate ?? today);

  const monthStart = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const startWeekDay = (monthStart.getDay() + 6) % 7;
  const daysInMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    0,
  ).getDate();

  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - startWeekDay + 1;
    if (dayNumber < 1 || dayNumber > daysInMonth) return null;
    return new Date(viewDate.getFullYear(), viewDate.getMonth(), dayNumber);
  });

  return (
    <div className="relative space-y-1.5">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-11 w-full items-center justify-between rounded-xl border border-input bg-background px-3.5 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {value ? formatDate(value) : "dd/mm/aaaa"}
        </span>
        <CalendarDays className="size-4 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-30 w-[290px] rounded-2xl border border-border bg-card p-3 shadow-xl">
          <div className="mb-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                setViewDate(
                  new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1),
                )
              }
              className="rounded-md p-1.5 text-foreground hover:bg-secondary"
            >
              <ChevronLeft className="size-4" />
            </button>
            <p className="text-sm font-semibold text-foreground">
              {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
            </p>
            <button
              type="button"
              onClick={() =>
                setViewDate(
                  new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1),
                )
              }
              className="rounded-md p-1.5 text-foreground hover:bg-secondary"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          <div className="mb-1 grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
            {["L", "M", "M", "J", "V", "S", "D"].map((d, idx) => (
              <span key={`${d}-${idx}`}>{d}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, idx) => {
              const iso = day ? toISODate(day) : "";
              const isSelected = day && iso === value;

              return (
                <button
                  key={`${iso}-${idx}`}
                  type="button"
                  disabled={!day}
                  onClick={() => {
                    if (!day) return;
                    onChange(iso);
                    setOpen(false);
                  }}
                  className={cn(
                    "h-8 rounded-md text-xs font-medium",
                    day
                      ? "text-foreground hover:bg-secondary"
                      : "cursor-default opacity-0",
                    isSelected && "bg-primary text-primary-foreground hover:bg-primary",
                  )}
                >
                  {day ? day.getDate() : "."}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function TripPlannerSection() {
  const [name, setName] = useState("");
  const [destination, setDestination] = useState<DestinationKey>("none");
  const [travelers, setTravelers] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [destinationOpen, setDestinationOpen] = useState(false);

  const message = useMemo(() => {
    const personName = name.trim() || "sin nombre";
    const destinationText = destinationLabel[destination];
    const people = travelers.trim() || "sin definir";
    const from = formatDate(fromDate);
    const to = formatDate(toDate);

    return `Hola, vengo desde la web de Alo Patagonia. Mi nombre es ${personName}, viajo a ${destinationText}, somos ${people} personas, desde ${from} hasta ${to}. ¿Planeamos mi viaje?`;
  }, [name, destination, travelers, fromDate, toDate]);

  const whatsappUrl = getWhatsAppUrl(message);
  const mailUrl = `mailto:${SITE.email}?subject=${encodeURIComponent("Consulta viaje Patagonia")}&body=${encodeURIComponent(message)}`;

  return (
    <section
      id={SECTION_IDS.planner}
      className="scroll-mt-8 bg-background px-4 py-20 sm:px-8 lg:px-14 2xl:px-20"
      aria-labelledby="planner-heading"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <Reveal className="max-w-2xl 2xl:max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Planificacion personalizada
          </p>
          <h2
            id="planner-heading"
            className="font-heading mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl 2xl:text-5xl"
          >
            Planear mi viaje
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground 2xl:text-xl">
            Completá estos datos y te enviamos una propuesta concreta para
            organizar tu viaje por Patagonia.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.05fr] 2xl:gap-8">
          <Reveal className="rounded-3xl border border-border/80 bg-card p-5 shadow-sm sm:p-7 2xl:p-8">
            <form className="space-y-4">
              <label className="block space-y-1.5">
                <span className="text-sm font-semibold text-foreground">Nombre</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className="h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm font-semibold text-foreground">Destino</span>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setDestinationOpen((prev) => !prev)}
                    className="flex h-11 w-full items-center justify-between rounded-xl border border-input bg-background px-3.5 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
                  >
                    <span>{DESTINATION_OPTIONS.find((o) => o.value === destination)?.label}</span>
                    <ChevronDown
                      className={cn(
                        "size-4 text-muted-foreground transition-transform",
                        destinationOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {destinationOpen && (
                    <div className="absolute left-0 top-[calc(100%+8px)] z-30 w-full rounded-2xl border border-border bg-card p-2 shadow-xl">
                      <div className="max-h-64 overflow-auto">
                        {DESTINATION_OPTIONS.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setDestination(option.value);
                              setDestinationOpen(false);
                            }}
                            className={cn(
                              "w-full rounded-xl px-3 py-2 text-left text-sm transition",
                              destination === option.value
                                ? "bg-primary text-primary-foreground"
                                : "text-foreground hover:bg-secondary",
                            )}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm font-semibold text-foreground">
                  Cuantas personas viajan
                </span>
                <input
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  placeholder="Ej: 2"
                  inputMode="numeric"
                  className="h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <DateField label="Desde" value={fromDate} onChange={setFromDate} />
                <DateField label="Hasta" value={toDate} onChange={setToDate} />
              </div>

              <div className="pt-2">
                <p className="text-xs text-muted-foreground">
                  Armamos el mensaje automaticamente para que consultes en un clic.
                </p>
              </div>
            </form>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 2xl:gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 rounded-full bg-[#25d366] text-white hover:bg-[#1fb85a] 2xl:h-14 2xl:text-lg",
                )}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="mr-1 size-4"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M19.11 4.93A9.88 9.88 0 0 0 12.03 2C6.58 2 2.14 6.43 2.14 11.89c0 1.74.46 3.44 1.33 4.94L2 22l5.29-1.39a9.85 9.85 0 0 0 4.72 1.2h.01c5.45 0 9.89-4.43 9.89-9.9a9.81 9.81 0 0 0-2.8-6.98ZM12.02 20.1h-.01a8.14 8.14 0 0 1-4.15-1.14l-.3-.18-3.14.82.84-3.06-.2-.31a8.2 8.2 0 0 1-1.27-4.33c0-4.51 3.68-8.18 8.22-8.18a8.15 8.15 0 0 1 5.8 2.39 8.08 8.08 0 0 1 2.4 5.8c0 4.51-3.69 8.19-8.19 8.19Zm4.48-6.14c-.25-.13-1.46-.72-1.68-.8-.22-.08-.38-.12-.54.13-.16.25-.62.8-.76.96-.14.16-.28.18-.53.06-.25-.13-1.04-.38-1.99-1.22-.74-.65-1.24-1.45-1.38-1.7-.14-.25-.01-.39.11-.51.11-.11.25-.28.37-.42.12-.14.16-.25.24-.41.08-.16.04-.31-.02-.44-.06-.13-.54-1.3-.74-1.78-.2-.48-.4-.4-.54-.4h-.46c-.16 0-.41.06-.63.31-.22.25-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.46-.6 1.67-1.17.21-.57.21-1.05.15-1.17-.06-.12-.22-.19-.47-.32Z" />
                </svg>
                Consultar por WhatsApp
              </a>
              <a
                href={mailUrl}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 rounded-full border-foreground/20 bg-background 2xl:h-14 2xl:text-lg",
                )}
              >
                <Mail className="mr-1 size-4" />
                Consultar por mail
              </a>
            </div>
          </Reveal>

          <Reveal className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-secondary/30 p-4 sm:p-6 2xl:p-7">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                Mapa Patagonia Argentina
              </p>
              <p className="text-xs text-muted-foreground">
                Foco: {destinationLabel[destination]}
              </p>
            </div>

            <div className="relative min-h-[360px] flex-1 overflow-hidden rounded-2xl border border-border/60 bg-background sm:min-h-[420px] 2xl:min-h-[500px]">
              <PlannerMap destination={destination} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
