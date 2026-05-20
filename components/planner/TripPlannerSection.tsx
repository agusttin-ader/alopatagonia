"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight, Mail } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import {
  PLANNER_DESTINATION_LABELS,
  PLANNER_DESTINATION_OPTIONS,
  SECTION_IDS,
  SITE,
  getWhatsAppUrl,
  type PlannerDestinationValue,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

const PlannerMap = dynamic(
  () => import("@/components/planner/PlannerMap").then((mod) => mod.PlannerMap),
  { ssr: false },
);

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

const fieldClassName =
  "h-12 w-full rounded-xl border border-[#d9d2c5]/80 bg-[linear-gradient(160deg,rgba(255,255,255,0.97),rgba(251,248,242,0.93))] px-3.5 text-base sm:text-[0.98rem] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_12px_26px_-24px_rgba(48,40,28,0.32)] outline-none transition duration-200 placeholder:text-muted-foreground/75 hover:border-[#cabfae] hover:bg-[linear-gradient(160deg,rgba(255,255,255,0.99),rgba(252,248,241,0.96))] focus-visible:border-primary/40 focus-visible:ring-4 focus-visible:ring-primary/14";
const MAX_NAME_LENGTH = 70;
const MAX_TRAVELERS_LENGTH = 2;

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
  const triggerId = useId();
  const panelId = useId();
  const fieldRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [openUpward, setOpenUpward] = useState(false);

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

  useEffect(() => {
    if (!open) return;

    const triggerRect = triggerRef.current?.getBoundingClientRect();
    const panelHeight = 320;
    if (triggerRect) {
      const spaceBelow = window.innerHeight - triggerRect.bottom;
      setOpenUpward(spaceBelow < panelHeight);
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!fieldRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={fieldRef} className="relative space-y-1.5">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <button
        id={triggerId}
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          fieldClassName,
          "flex min-h-11 items-center justify-between focus-visible:ring-primary/30",
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {value ? formatDate(value) : "dd/mm/aaaa"}
        </span>
        <CalendarDays className="size-4 text-muted-foreground" />
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={triggerId}
          className={cn(
            "absolute left-0 z-30 w-full max-w-[290px] rounded-2xl border border-[#d9d2c5]/90 bg-[linear-gradient(150deg,rgba(255,255,255,0.99),rgba(249,245,237,0.96))] p-3 shadow-[0_20px_36px_-28px_rgba(44,36,25,0.3)] ring-1 ring-white/85 backdrop-blur-sm sm:w-[290px]",
            openUpward ? "bottom-[calc(100%+8px)]" : "top-[calc(100%+8px)]",
          )}
        >
          <div className="mb-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                setViewDate(
                  new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1),
                )
              }
              className="inline-flex size-11 items-center justify-center rounded-lg text-foreground transition hover:bg-[#f2ede3]"
              aria-label="Mes anterior"
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
              className="inline-flex size-11 items-center justify-center rounded-lg text-foreground transition hover:bg-[#f2ede3]"
              aria-label="Mes siguiente"
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
                    "h-11 rounded-lg text-xs font-medium transition",
                    day
                      ? "text-foreground hover:bg-[#f2ede3]"
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
  const [destination, setDestination] = useState<PlannerDestinationValue>("none");
  const [travelers, setTravelers] = useState("");
  const [website, setWebsite] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [showDesktopMap, setShowDesktopMap] = useState(false);
  const destinationButtonId = useId();
  const destinationPanelId = useId();
  const destinationContainerRef = useRef<HTMLDivElement>(null);
  const destinationButtonRef = useRef<HTMLButtonElement>(null);

  const message = useMemo(() => {
    const personName = name.trim().slice(0, MAX_NAME_LENGTH) || "sin nombre";
    const destinationText = PLANNER_DESTINATION_LABELS[destination];
    const people = travelers.trim().slice(0, MAX_TRAVELERS_LENGTH) || "sin definir";
    const from = formatDate(fromDate);
    const to = formatDate(toDate);

    return `Hola, vengo desde la web de Alo Patagonia. Mi nombre es ${personName}, viajo a ${destinationText}, somos ${people} personas, desde ${from} hasta ${to}. ¿Planeamos mi viaje?`;
  }, [name, destination, travelers, fromDate, toDate]);

  const completionCount = useMemo(() => {
    const checks = [
      name.trim().length > 1,
      destination !== "none",
      travelers.trim().length > 0,
      Boolean(fromDate),
      Boolean(toDate),
    ];
    return checks.filter(Boolean).length;
  }, [name, destination, travelers, fromDate, toDate]);

  const invalidDateRange = Boolean(fromDate && toDate && fromDate > toDate);
  const plannerReady = completionCount >= 4 && !invalidDateRange;
  const honeypotTriggered = website.trim().length > 0;
  const canSubmit = plannerReady && !honeypotTriggered;

  const whatsappUrl = getWhatsAppUrl(message);
  const mailUrl = `mailto:${SITE.email}?subject=${encodeURIComponent("Consulta viaje Patagonia")}&body=${encodeURIComponent(message)}`;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setShowDesktopMap(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!destinationOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!destinationContainerRef.current?.contains(event.target as Node)) {
        setDestinationOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDestinationOpen(false);
        destinationButtonRef.current?.focus();
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [destinationOpen]);

  const selectDestination = (value: PlannerDestinationValue) => {
    setDestination(value);
    setDestinationOpen(false);
  };

  return (
    <section
      id={SECTION_IDS.planner}
      className="scroll-mt-24 bg-background px-4 py-12 sm:px-8 sm:py-20 lg:px-14 2xl:px-20"
      aria-labelledby="planner-heading"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <Reveal className="max-w-2xl 2xl:max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-footer-lake">
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

        <div className="mt-7 grid gap-6 lg:mt-10 lg:grid-cols-[1fr_1.05fr] 2xl:gap-8">
          <Reveal className="rounded-[2rem] border border-[#ddd5c8]/80 bg-[linear-gradient(160deg,rgba(255,255,255,0.98),rgba(247,242,233,0.9))] p-5 shadow-[0_28px_52px_-36px_rgba(48,40,28,0.34)] sm:p-7 2xl:p-8">
            <div
              className="mb-6 h-px w-28 bg-[linear-gradient(to_right,rgba(13,148,136,0.72),rgba(13,148,136,0.08))]"
              aria-hidden
            />
            <form className="space-y-4">
              <label className="block space-y-1.5">
                <span className="text-sm font-semibold text-foreground">Nombre</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value.slice(0, MAX_NAME_LENGTH))}
                  placeholder="Tu nombre"
                  required
                  maxLength={MAX_NAME_LENGTH}
                  autoComplete="name"
                  className={fieldClassName}
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm font-semibold text-foreground">Destino</span>
                <div ref={destinationContainerRef} className="relative">
                  <button
                    id={destinationButtonId}
                    ref={destinationButtonRef}
                    type="button"
                    onClick={() => setDestinationOpen((prev) => !prev)}
                    className={cn(
                      fieldClassName,
                      "flex min-h-11 items-center justify-between focus-visible:ring-primary/30",
                      destinationOpen &&
                        "border-primary/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_18px_36px_-28px_rgba(13,148,136,0.45)]",
                    )}
                    aria-haspopup="listbox"
                    aria-expanded={destinationOpen}
                    aria-controls={destinationPanelId}
                  >
                    <span>
                      {
                        PLANNER_DESTINATION_OPTIONS.find((option) => option.value === destination)
                          ?.label
                      }
                    </span>
                    <ChevronDown
                      className={cn(
                        "size-4 text-muted-foreground transition-transform duration-300",
                        destinationOpen && "rotate-180",
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {destinationOpen && (
                      <motion.div
                        id={destinationPanelId}
                        role="listbox"
                        aria-labelledby={destinationButtonId}
                        className="absolute left-0 top-[calc(100%+8px)] z-30 w-full rounded-2xl border border-[#d9d2c5]/90 bg-[linear-gradient(150deg,rgba(255,255,255,0.99),rgba(249,245,237,0.96))] p-2 shadow-[0_20px_36px_-28px_rgba(44,36,25,0.3)] ring-1 ring-white/85 backdrop-blur-sm"
                        initial={{ opacity: 0, y: -8, scale: 0.985 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.99 }}
                        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="max-h-64 overflow-auto">
                          {PLANNER_DESTINATION_OPTIONS.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onPointerDown={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                selectDestination(option.value);
                              }}
                              onClick={() => selectDestination(option.value)}
                              className={cn(
                                "w-full rounded-xl px-3 py-2.5 text-left text-sm transition",
                                destination === option.value
                                  ? "bg-primary text-primary-foreground"
                                  : "text-foreground hover:bg-[#f2ede3]",
                              )}
                              role="option"
                              aria-selected={destination === option.value}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm font-semibold text-foreground">
                  Cuantas personas viajan
                </span>
                <input
                  value={travelers}
                  onChange={(e) =>
                    setTravelers(e.target.value.replace(/[^\d]/g, "").slice(0, MAX_TRAVELERS_LENGTH))
                  }
                  placeholder="Ej: 2"
                  inputMode="numeric"
                  required
                  maxLength={MAX_TRAVELERS_LENGTH}
                  className={fieldClassName}
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <DateField label="Desde" value={fromDate} onChange={setFromDate} />
                <DateField label="Hasta" value={toDate} onChange={setToDate} />
              </div>

              <label className="hidden" aria-hidden>
                Sitio web
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                />
              </label>

              <div className="pt-2">
                <p className="text-xs text-muted-foreground">
                  Armamos el mensaje automaticamente para que consultes en un clic.
                </p>
                {invalidDateRange ? (
                  <p className="mt-2 text-xs font-semibold text-destructive">
                    Revisá las fechas: la fecha de regreso debe ser posterior al inicio.
                  </p>
                ) : null}
                <p
                  className={cn(
                    "mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                    plannerReady
                      ? "bg-primary/15 text-primary"
                      : "bg-secondary text-muted-foreground",
                  )}
                >
                  {plannerReady
                    ? "Mensaje listo para enviar"
                    : `Completá ${5 - completionCount} dato${5 - completionCount === 1 ? "" : "s"} para enviar más completo`}
                </p>
              </div>
            </form>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 2xl:gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => {
                  if (canSubmit) return;
                  event.preventDefault();
                }}
                aria-disabled={!canSubmit}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 whitespace-normal rounded-full bg-whatsapp text-center leading-tight text-white hover:bg-whatsapp-hover 2xl:h-14 2xl:text-lg",
                  !canSubmit && "pointer-events-none opacity-60",
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
                {plannerReady ? "Enviar por WhatsApp" : "Completar y enviar por WhatsApp"}
              </a>
              <a
                href={mailUrl}
                onClick={(event) => {
                  if (canSubmit) return;
                  event.preventDefault();
                }}
                aria-disabled={!canSubmit}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 rounded-full border-[#cfc5b4] bg-[#faf6ef] text-foreground hover:bg-white 2xl:h-14 2xl:text-lg",
                  !canSubmit && "pointer-events-none opacity-60",
                )}
              >
                <Mail className="mr-1 size-4" />
                Consultar por mail
              </a>
            </div>
          </Reveal>

          <Reveal className="hidden h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-secondary/30 p-4 sm:p-6 md:flex 2xl:p-7">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-footer-lake">
                Mapa Patagonia Argentina
              </p>
              <p className="text-xs text-muted-foreground">
                Foco: {PLANNER_DESTINATION_LABELS[destination]}
              </p>
            </div>

            <div className="relative min-h-[360px] flex-1 overflow-hidden rounded-2xl border border-border/60 bg-background sm:min-h-[420px] 2xl:min-h-[500px]">
              {showDesktopMap ? <PlannerMap destination={destination} /> : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
