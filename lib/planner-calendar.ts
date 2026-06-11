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

type TripCalendarEvent = {
  destinationLabel: string;
  fromDate: string;
  toDate: string;
  travelers?: string;
  contactName?: string;
};

export function buildTripCalendarIcs({
  destinationLabel,
  fromDate,
  toDate,
  travelers,
  contactName,
}: TripCalendarEvent) {
  const summary = `Viaje a ${destinationLabel}`;
  const peopleLine = travelers?.trim()
    ? `${travelers.trim()} ${Number(travelers) === 1 ? "persona" : "personas"}`
    : "";
  const descriptionParts = [
    contactName?.trim() ? `Consulta de ${contactName.trim()}` : "Consulta armada con Alo Patagonia",
    peopleLine,
    "Patagonia Argentina — alopatagonia.com.ar",
  ].filter(Boolean);

  const uid = `alo-patagonia-${toIcsDate(fromDate)}-${toIcsDate(toDate)}-${destinationLabel.toLowerCase().replace(/\s+/g, "-")}@alopatagonia.com.ar`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Alo Patagonia//Trip Planner//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${formatIcsStamp(new Date())}`,
    `DTSTART;VALUE=DATE:${toIcsDate(fromDate)}`,
    `DTEND;VALUE=DATE:${toIcsDate(addDaysToIso(toDate, 1))}`,
    `SUMMARY:${escapeIcsText(summary)}`,
    `DESCRIPTION:${escapeIcsText(descriptionParts.join(" · "))}`,
    `LOCATION:${escapeIcsText(`${destinationLabel}, Patagonia Argentina`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadTripCalendarIcs(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

export function tripCalendarFilename(destinationLabel: string) {
  const slug = destinationLabel
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `viaje-${slug || "patagonia"}.ics`;
}
