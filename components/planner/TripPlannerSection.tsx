"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, Mail } from "lucide-react";
import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useMemo, useRef, useState, type RefObject } from "react";

import { Reveal } from "@/components/motion/reveal";
import {
  PLANNER_PHONE_VIDEO,
  resolvePlannerDestinationKey,
  SECTION_IDS,
  SITE,
  getWhatsAppUrl,
  type PlannerDestinationKey,
  type PlannerDestinationValue,
} from "@/lib/constants";
import {
  buildLocalizedPlannerMessage,
  getLocalizedPlannerDestinationHook,
  getLocalizedPlannerDestinationLabel,
  getLocalizedPlannerDestinationOptions,
} from "@/lib/i18n/localized-planner";
import { cn } from "@/lib/utils";

const PhoneVideoMockup = dynamic(
  () => import("@/components/media/PhoneVideoMockup").then((mod) => mod.PhoneVideoMockup),
  { ssr: false },
);

const fieldClassName =
  "h-12 w-full min-w-0 rounded-xl border border-[#d9d2c5]/80 bg-[linear-gradient(160deg,rgba(248,242,232,0.97),rgba(241,234,220,0.93))] px-3.5 text-base text-foreground shadow-[inset_0_1px_0_rgba(252,246,236,0.9),0_12px_26px_-24px_rgba(48,40,28,0.32)] outline-none transition duration-200 placeholder:text-muted-foreground/75 hover:border-[#cabfae] hover:bg-[linear-gradient(160deg,rgba(250,244,234,0.99),rgba(244,237,224,0.96))] focus-visible:border-primary/40 focus-visible:ring-4 focus-visible:ring-primary/14 md:text-[0.98rem]";

const textareaClassName =
  "min-h-[6.5rem] w-full min-w-0 resize-y rounded-xl border border-[#d9d2c5]/80 bg-[linear-gradient(160deg,rgba(248,242,232,0.97),rgba(241,234,220,0.93))] px-3.5 py-3 text-base text-foreground shadow-[inset_0_1px_0_rgba(252,246,236,0.9),0_12px_26px_-24px_rgba(48,40,28,0.32)] outline-none transition duration-200 placeholder:text-muted-foreground/75 hover:border-[#cabfae] hover:bg-[linear-gradient(160deg,rgba(250,244,234,0.99),rgba(244,237,224,0.96))] focus-visible:border-primary/40 focus-visible:ring-4 focus-visible:ring-primary/14 md:text-[0.98rem]";

const MAX_NAME_LENGTH = 70;
const MAX_TRAVELERS_LENGTH = 2;
const MAX_USER_NOTE_LENGTH = 280;

const PLANNER_CTA =
  "inline-flex min-h-11 w-full items-center justify-center gap-2.5 rounded-full px-5 text-[0.8125rem] font-semibold leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-55";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="currentColor" aria-hidden>
      <path d="M19.11 4.93A9.88 9.88 0 0 0 12.03 2C6.58 2 2.14 6.43 2.14 11.89c0 1.74.46 3.44 1.33 4.94L2 22l5.29-1.39a9.85 9.85 0 0 0 4.72 1.2h.01c5.45 0 9.89-4.43 9.89-9.9a9.81 9.81 0 0 0-2.8-6.98ZM12.02 20.1h-.01a8.14 8.14 0 0 1-4.15-1.14l-.3-.18-3.14.82.84-3.06-.2-.31a8.2 8.2 0 0 1-1.27-4.33c0-4.51 3.68-8.18 8.22-8.18a8.15 8.15 0 0 1 5.8 2.39 8.08 8.08 0 0 1 2.4 5.8c0 4.51-3.69 8.19-8.19 8.19Zm4.48-6.14c-.25-.13-1.46-.72-1.68-.8-.22-.08-.38-.12-.54.13-.16.25-.62.8-.76.96-.14.16-.28.18-.53.06-.25-.13-1.04-.38-1.99-1.22-.74-.65-1.24-1.45-1.38-1.7-.14-.25-.01-.39.11-.51.11-.11.25-.28.37-.42.12-.14.16-.25.24-.41.08-.16.04-.31-.02-.44-.06-.13-.54-1.3-.74-1.78-.2-.48-.4-.4-.54-.4h-.46c-.16 0-.41.06-.63.31-.22.25-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.46-.6 1.67-1.17.21-.57.21-1.05.15-1.17-.06-.12-.22-.19-.47-.32Z" />
    </svg>
  );
}

function useDismissOnEscapeAndOutside(
  open: boolean,
  containerRef: RefObject<HTMLElement | null>,
  onClose: () => void,
  returnFocusRef?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        onClose();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        returnFocusRef?.current?.focus();
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [containerRef, onClose, open, returnFocusRef]);
}

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

function formatDate(value: string, locale: string, noDateLabel: string) {
  const date = fromISODate(value);
  if (!date) return noDateLabel;
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function formatDateCompact(value: string, locale: string) {
  const date = fromISODate(value);
  if (!date) return "";
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" }).format(date);
}

function getSeasonLabel(month: number, t: ReturnType<typeof useTranslations<"planner">>) {
  if (month === 11 || month <= 1) return t("seasons.summer");
  if (month <= 4) return t("seasons.autumn");
  if (month <= 7) return t("seasons.winter");
  return t("seasons.spring");
}

function isPastDay(date: Date) {
  return toISODate(date) < toISODate(new Date());
}

function isBeforeMonth(year: number, month: number) {
  const today = new Date();
  return year < today.getFullYear() || (year === today.getFullYear() && month < today.getMonth());
}


function getTripNightCount(fromDate: string, toDate: string) {
  const from = fromISODate(fromDate);
  const to = fromISODate(toDate);
  if (!from || !to || fromDate > toDate) return null;
  const diffMs = to.getTime() - from.getTime();
  return Math.max(0, Math.round(diffMs / (1000 * 60 * 60 * 24)));
}

type PlannerProgressStep = {
  id: string;
  label: string;
  done: boolean;
};

function PlannerProgressBar({
  steps,
  progressAria,
  stepDone,
  stepPending,
}: {
  steps: PlannerProgressStep[];
  progressAria: string;
  stepDone: string;
  stepPending: string;
}) {
  const completedSteps = steps.filter((step) => step.done).length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <div
      className="mb-4 space-y-2.5"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      aria-label={progressAria}
    >
      <div className="h-1 overflow-hidden rounded-full bg-[#e8e0d2]">
        <motion.div
          className="h-full rounded-full bg-[linear-gradient(90deg,rgba(13,148,136,0.85),rgba(13,148,136,0.55))]"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-medium">
        {steps.map((step, index) => (
          <span key={step.id} className="inline-flex items-center gap-1.5">
            {index > 0 ? (
              <span className="text-muted-foreground/45" aria-hidden>
                ·
              </span>
            ) : null}
            <span
              className={cn(
                "inline-flex items-center gap-1 transition-colors",
                step.done ? "text-primary" : "text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "inline-flex size-4 items-center justify-center rounded-full border transition-colors",
                  step.done
                    ? "border-primary/30 bg-primary/12 text-primary"
                    : "border-border bg-card text-muted-foreground/70",
                )}
                aria-hidden
              >
                {step.done ? <Check className="size-2.5" strokeWidth={3} /> : null}
              </span>
              {step.label}
              {step.done ? (
                <span className="sr-only"> {stepDone}</span>
              ) : (
                <span className="sr-only"> {stepPending}</span>
              )}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

function PlannerTripPreview({
  destination,
  fromDate,
  toDate,
  travelers,
  locale,
  t,
}: {
  destination: PlannerDestinationValue;
  fromDate: string;
  toDate: string;
  travelers: string;
  locale: string;
  t: ReturnType<typeof useTranslations<"planner">>;
}) {
  const destinationLabel = getLocalizedPlannerDestinationLabel(t, destination);
  const hook =
    destination !== "none"
      ? getLocalizedPlannerDestinationHook(t, destination as PlannerDestinationKey)
      : null;
  const nights = getTripNightCount(fromDate, toDate);
  const fromParsed = fromISODate(fromDate);
  const season = fromParsed ? getSeasonLabel(fromParsed.getMonth(), t) : null;
  const peopleCount = travelers.trim();
  const hasDestination = destination !== "none";
  const hasDates = Boolean(fromDate && toDate && nights !== null);
  const hasAnyPreview = hasDestination || hasDates || peopleCount.length > 0;

  const metaLine = useMemo(() => {
    const parts: string[] = [];

    if (fromDate && toDate) {
      parts.push(`${formatDateCompact(fromDate, locale)} – ${formatDateCompact(toDate, locale)}`);
    }
    if (peopleCount) {
      parts.push(
        `${peopleCount} ${Number(peopleCount) === 1 ? t("preview.personOne") : t("preview.personMany")}`,
      );
    }
    if (season) {
      parts.push(season);
    }

    return parts.join(" · ");
  }, [fromDate, locale, peopleCount, season, t, toDate]);

  const title = hasDestination ? destinationLabel : hasDates ? t("preview.patagonia") : null;

  return (
    <div
      className={cn(
        "relative mb-4 overflow-hidden rounded-xl border border-[#d9d2c5]/70 bg-[#faf6ef]/55 px-3 py-2.5 sm:px-3.5 sm:py-3",
        !hasAnyPreview && "border-dashed bg-transparent py-3",
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        className="pointer-events-none absolute inset-y-2.5 left-0 w-px bg-primary/35"
        aria-hidden
      />

      <AnimatePresence mode="wait">
        {!hasAnyPreview ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="pl-2.5 text-[0.72rem] leading-relaxed text-muted-foreground/85 sm:text-xs"
          >
            {t("preview.empty")}
          </motion.p>
        ) : (
          <div className="space-y-1 pl-2.5">
            <div className="flex items-baseline gap-2.5">
              {hasDates ? (
                <span className="font-heading text-[1.35rem] font-medium tabular-nums leading-none tracking-tight text-brand-forest">
                  {nights}
                </span>
              ) : null}
              {title ? (
                <p className="min-w-0 font-heading text-[0.98rem] font-semibold leading-tight text-brand-forest sm:text-base">
                  {title}
                </p>
              ) : null}
            </div>

            {metaLine ? (
              <p className="text-xs leading-relaxed text-muted-foreground">{metaLine}</p>
            ) : null}

            {hook ? (
              <p className="pt-0.5 font-heading text-xs italic leading-snug text-foreground/62">
                {hook}
              </p>
            ) : null}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DateField({
  label,
  value,
  onChange,
  locale,
  t,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  locale: string;
  t: ReturnType<typeof useTranslations<"planner">>;
}) {
  const today = new Date();
  const selectedDate = fromISODate(value);
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => {
    const initial = selectedDate ?? today;
    if (isBeforeMonth(initial.getFullYear(), initial.getMonth())) {
      return new Date(today.getFullYear(), today.getMonth(), 1);
    }
    return initial;
  });
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

  useDismissOnEscapeAndOutside(open, fieldRef, () => setOpen(false), triggerRef);

  useEffect(() => {
    if (!open) return;

    const triggerRect = triggerRef.current?.getBoundingClientRect();
    const panelHeight = 320;
    if (triggerRect) {
      const spaceBelow = window.innerHeight - triggerRect.bottom;
      setOpenUpward(spaceBelow < panelHeight);
    }
  }, [open]);

  useEffect(() => {
    const parsed = fromISODate(value);
    if (parsed && isPastDay(parsed)) {
      onChange("");
    }
  }, [onChange, value]);

  const viewingPastMonth = isBeforeMonth(viewDate.getFullYear(), viewDate.getMonth());
  const weekdays = t.raw("calendar.weekdaysShort") as string[];
  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(viewDate);

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
          {value ? formatDate(value, locale, t("form.noDate")) : t("form.datePlaceholder")}
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
            "absolute left-0 z-30 w-full max-w-[290px] rounded-2xl border border-[#d9d2c5]/90 bg-[linear-gradient(150deg,rgba(250,244,234,0.99),rgba(243,236,222,0.96))] p-3 shadow-[0_20px_36px_-28px_rgba(44,36,25,0.3)] ring-1 ring-[#faf6ef]/85 backdrop-blur-sm sm:w-[290px]",
            openUpward ? "bottom-[calc(100%+8px)]" : "top-[calc(100%+8px)]",
          )}
        >
          <div className="mb-2 flex items-center justify-between">
            <button
              type="button"
              disabled={viewingPastMonth}
              onClick={() =>
                setViewDate(
                  new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1),
                )
              }
              className="inline-flex size-11 items-center justify-center rounded-lg text-foreground transition hover:bg-[#f2ede3] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={t("calendar.prevMonth")}
            >
              <ChevronLeft className="size-4" />
            </button>
            <p className="text-sm font-semibold text-foreground">{monthLabel}</p>
            <button
              type="button"
              onClick={() =>
                setViewDate(
                  new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1),
                )
              }
              className="inline-flex size-11 items-center justify-center rounded-lg text-foreground transition hover:bg-[#f2ede3]"
              aria-label={t("calendar.nextMonth")}
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          <div className="mb-1 grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
            {weekdays.map((d, idx) => (
              <span key={`${d}-${idx}`}>{d}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, idx) => {
              const iso = day ? toISODate(day) : "";
              const isSelected = day && iso === value;
              const isDisabled = !day || isPastDay(day);

              return (
                <button
                  key={`${iso}-${idx}`}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => {
                    if (!day || isPastDay(day)) return;
                    onChange(iso);
                    setOpen(false);
                  }}
                  className={cn(
                    "h-11 rounded-lg text-xs font-medium transition",
                    !day && "cursor-default opacity-0",
                    day &&
                      !isPastDay(day) &&
                      "text-foreground hover:bg-[#f2ede3]",
                    day &&
                      isPastDay(day) &&
                      "cursor-not-allowed text-muted-foreground/45 hover:bg-transparent",
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

export function TripPlannerSection({ showHeading = true }: { showHeading?: boolean }) {
  const t = useTranslations("planner");
  const locale = useLocale();
  const destinationOptions = useMemo(() => getLocalizedPlannerDestinationOptions(t), [t]);
  const [name, setName] = useState("");
  const [destination, setDestination] = useState<PlannerDestinationValue>("none");
  const [travelers, setTravelers] = useState("");
  const [website, setWebsite] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [userNote, setUserNote] = useState("");
  const [destinationOpen, setDestinationOpen] = useState(false);
  const destinationButtonId = useId();
  const destinationPanelId = useId();
  const destinationContainerRef = useRef<HTMLDivElement>(null);
  const destinationButtonRef = useRef<HTMLButtonElement>(null);

  const resolvedDestination = resolvePlannerDestinationKey(destination);

  const message = useMemo(() => {
    const personName = name.trim().slice(0, MAX_NAME_LENGTH) || t("message.noName");

    return buildLocalizedPlannerMessage(t, {
      name: personName,
      destination: resolvedDestination,
      travelers,
      fromDate,
      toDate,
      userNote,
      formatDate: (value) => formatDate(value, locale, t("form.noDate")),
    });
  }, [name, resolvedDestination, travelers, fromDate, toDate, userNote, t, locale]);

  const completionCount = useMemo(() => {
    const checks = [
      name.trim().length > 1,
      resolvedDestination !== "none",
      travelers.trim().length > 0,
      Boolean(fromDate),
      Boolean(toDate),
    ];
    return checks.filter(Boolean).length;
  }, [name, resolvedDestination, travelers, fromDate, toDate]);

  const invalidDateRange = Boolean(fromDate && toDate && fromDate > toDate);
  const plannerReady = completionCount >= 4 && !invalidDateRange;
  const honeypotTriggered = website.trim().length > 0;
  const canSubmit = plannerReady && !honeypotTriggered;

  const progressSteps = useMemo<PlannerProgressStep[]>(
    () => [
      {
        id: "destination",
        label: t("steps.destination"),
        done: resolvedDestination !== "none",
      },
      {
        id: "dates",
        label: t("steps.dates"),
        done: Boolean(fromDate && toDate && !invalidDateRange),
      },
      {
        id: "contact",
        label: t("steps.contact"),
        done: name.trim().length > 1 && travelers.trim().length > 0,
      },
    ],
    [resolvedDestination, fromDate, invalidDateRange, name, toDate, travelers, t],
  );

  const whatsappUrl = getWhatsAppUrl(message);
  const mailUrl = `mailto:${SITE.email}?subject=${encodeURIComponent(t("mailSubject"))}&body=${encodeURIComponent(message)}`;

  useEffect(() => {
    if (destination === "none") return;
    const normalized = resolvePlannerDestinationKey(destination);
    if (normalized !== destination) {
      setDestination(normalized);
    }
  }, [destination]);

  useDismissOnEscapeAndOutside(
    destinationOpen,
    destinationContainerRef,
    () => setDestinationOpen(false),
    destinationButtonRef,
  );

  const selectDestination = (value: PlannerDestinationValue) => {
    setDestination(value);
    setDestinationOpen(false);
  };

  return (
    <section
      id={showHeading ? SECTION_IDS.planner : undefined}
      className={cn(
        "scroll-mt-24 bg-background px-4 py-12 sm:px-8 sm:py-20 lg:px-14 2xl:px-20",
        !showHeading && "pt-8 sm:pt-10",
      )}
      aria-labelledby={showHeading ? "planner-heading" : undefined}
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        {showHeading ? (
          <Reveal className="max-w-2xl 2xl:max-w-3xl">
            <h2
              id="planner-heading"
              className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl 2xl:text-5xl"
            >
              {t("page.title")}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground 2xl:text-xl">
              {t("page.intro")}
            </p>
          </Reveal>
        ) : null}

        <div className={cn("grid gap-6 lg:grid-cols-[1fr_1.05fr] 2xl:gap-8", showHeading ? "mt-7 lg:mt-10" : "mt-0")}>
          <Reveal className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm sm:p-7 2xl:p-8">
            <PlannerProgressBar
              steps={progressSteps}
              progressAria={t("progressAria")}
              stepDone={t("stepDone")}
              stepPending={t("stepPending")}
            />
            <PlannerTripPreview
              destination={resolvedDestination}
              fromDate={fromDate}
              toDate={toDate}
              travelers={travelers}
              locale={locale}
              t={t}
            />
            <div
              className="mb-6 h-px w-28 bg-[linear-gradient(to_right,rgba(13,148,136,0.72),rgba(13,148,136,0.08))]"
              aria-hidden
            />
            <form className="space-y-4">
              <label className="block space-y-1.5">
                <span className="text-sm font-semibold text-foreground">{t("form.name")}</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value.slice(0, MAX_NAME_LENGTH))}
                  placeholder={t("form.namePlaceholder")}
                  required
                  maxLength={MAX_NAME_LENGTH}
                  autoComplete="name"
                  className={fieldClassName}
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm font-semibold text-foreground">{t("form.destination")}</span>
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
                        destinationOptions.find((option) => option.value === destination)
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
                        className="absolute left-0 top-[calc(100%+8px)] z-30 w-full rounded-2xl border border-[#d9d2c5]/90 bg-[linear-gradient(150deg,rgba(250,244,234,0.99),rgba(243,236,222,0.96))] p-2 shadow-[0_20px_36px_-28px_rgba(44,36,25,0.3)] ring-1 ring-[#faf6ef]/85 sm:backdrop-blur-sm"
                        initial={{ opacity: 0, y: -8, scale: 0.985 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.99 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="max-h-64 overflow-auto">
                          {destinationOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onPointerDown={(event) => {
                                event.preventDefault();
                                selectDestination(option.value);
                              }}
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
                  {t("form.travelers")}
                </span>
                <input
                  value={travelers}
                  onChange={(e) =>
                    setTravelers(e.target.value.replace(/[^\d]/g, "").slice(0, MAX_TRAVELERS_LENGTH))
                  }
                  placeholder={t("form.travelersPlaceholder")}
                  inputMode="numeric"
                  required
                  maxLength={MAX_TRAVELERS_LENGTH}
                  className={fieldClassName}
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <DateField label={t("form.from")} value={fromDate} onChange={setFromDate} locale={locale} t={t} />
                <DateField label={t("form.to")} value={toDate} onChange={setToDate} locale={locale} t={t} />
              </div>

              <label className="block space-y-1.5">
                <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="text-sm font-semibold text-foreground">{t("form.userNote")}</span>
                  <span className="text-xs font-medium text-muted-foreground">{t("form.optional")}</span>
                </span>
                <textarea
                  value={userNote}
                  onChange={(e) => setUserNote(e.target.value.slice(0, MAX_USER_NOTE_LENGTH))}
                  placeholder={t("form.userNotePlaceholder")}
                  maxLength={MAX_USER_NOTE_LENGTH}
                  rows={3}
                  className={textareaClassName}
                />
              </label>

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
                <p className="text-xs text-muted-foreground">{t("form.whatsappHint")}</p>
                {invalidDateRange ? (
                  <p className="mt-2 text-xs font-semibold text-destructive">
                    {t("form.invalidDates")}
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
                    ? t("form.ready")
                    : t(
                        5 - completionCount === 1 ? "form.incompleteOne" : "form.incompleteMany",
                        { count: 5 - completionCount },
                      )}
                </p>
              </div>
            </form>

            <div className="mt-6 flex flex-col gap-2.5 lg:grid lg:grid-cols-2 lg:gap-3">
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
                  PLANNER_CTA,
                  "bg-whatsapp text-white hover:bg-whatsapp-hover focus-visible:ring-whatsapp/35",
                  !canSubmit && "pointer-events-none opacity-55",
                )}
              >
                <WhatsAppIcon />
                {plannerReady ? t("form.sendWhatsApp") : t("form.completeWhatsApp")}
              </a>
              <a
                href={mailUrl}
                onClick={(event) => {
                  if (canSubmit) return;
                  event.preventDefault();
                }}
                aria-disabled={!canSubmit}
                className={cn(
                  PLANNER_CTA,
                  "border border-border bg-card text-foreground hover:bg-muted focus-visible:ring-ring/30",
                  !canSubmit && "pointer-events-none opacity-55",
                )}
              >
                <Mail className="size-4 shrink-0" />
                {t("form.sendMail")}
              </a>
            </div>
          </Reveal>

          <Reveal className="hidden min-h-[360px] items-center justify-center md:flex sm:min-h-[420px] 2xl:min-h-[500px]">
            <PhoneVideoMockup
              src={PLANNER_PHONE_VIDEO.src}
              poster={PLANNER_PHONE_VIDEO.poster}
              label={t("phoneVideoLabel")}
              size="lg"
              variant="plain"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
