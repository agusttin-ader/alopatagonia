function escapeIcsText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function toIcsDate(iso: string) {
  return iso.replace(/-/g, "");
}

function addDaysToIso(iso: string, days: number) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatIcsStamp(date: Date) {
  const y = date.getUTCFullYear();
  const m = `${date.getUTCMonth() + 1}`.padStart(2, "0");
  const d = `${date.getUTCDate()}`.padStart(2, "0");
  const h = `${date.getUTCHours()}`.padStart(2, "0");
  const min = `${date.getUTCMinutes()}`.padStart(2, "0");
  const s = `${date.getUTCSeconds()}`.padStart(2, "0");
  return `${y}${m}${d}T${h}${min}${s}Z`;
}

export type TripCalendarEvent = {
  destinationLabel: string;
  fromDate: string;
  toDate: string;
  travelers?: string;
  contactName?: string;
};

function buildTripSummary(destinationLabel: string) {
  return `Viaje a ${destinationLabel}`;
}

function buildTripDescription({
  destinationLabel,
  travelers,
  contactName,
}: TripCalendarEvent) {
  const peopleLine = travelers?.trim()
    ? `${travelers.trim()} ${Number(travelers) === 1 ? "persona" : "personas"}`
    : "";
  return [
    contactName?.trim() ? `Consulta de ${contactName.trim()}` : "Consulta armada con Alo Patagonia",
    peopleLine,
    "Patagonia Argentina — alopatagonia.com.ar",
  ]
    .filter(Boolean)
    .join(" · ");
}

export function buildTripCalendarIcs(event: TripCalendarEvent) {
  const summary = buildTripSummary(event.destinationLabel);
  const description = buildTripDescription(event);
  const uid = `alo-patagonia-${toIcsDate(event.fromDate)}-${toIcsDate(event.toDate)}-${event.destinationLabel.toLowerCase().replace(/\s+/g, "-")}@alopatagonia.com.ar`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Alo Patagonia//Trip Planner//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${formatIcsStamp(new Date())}`,
    `DTSTART;VALUE=DATE:${toIcsDate(event.fromDate)}`,
    `DTEND;VALUE=DATE:${toIcsDate(addDaysToIso(event.toDate, 1))}`,
    `SUMMARY:${escapeIcsText(summary)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    `LOCATION:${escapeIcsText(`${event.destinationLabel}, Patagonia Argentina`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function buildGoogleCalendarUrl(event: TripCalendarEvent) {
  const summary = buildTripSummary(event.destinationLabel);
  const description = buildTripDescription(event);
  const location = `${event.destinationLabel}, Patagonia Argentina`;
  const dates = `${toIcsDate(event.fromDate)}/${toIcsDate(addDaysToIso(event.toDate, 1))}`;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: summary,
    dates,
    details: description,
    location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function isIosDevice() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return (
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

function openAppleCalendar(ics: string) {
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  window.location.assign(url);
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

function openGoogleCalendar(event: TripCalendarEvent) {
  window.location.assign(buildGoogleCalendarUrl(event));
}

/** iPhone/iPad → Calendario de Apple. Android y resto → Google Calendar. */
export function addTripToCalendar(event: TripCalendarEvent) {
  if (typeof window === "undefined") return;

  if (isIosDevice()) {
    openAppleCalendar(buildTripCalendarIcs(event));
    return;
  }

  openGoogleCalendar(event);
}
