/**
 * Carpetas paisajes/ por destino — 4 fotos para la sección Destinos del home.
 * Ejecutar: npm run catalog:paisajes-folders
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DESTINATIONS_ROOT = path.join(ROOT, "public/images/destinations");
const PLAN_FILE = path.join(ROOT, "lib/catalog/destination-paisajes-folders.json");

const PAISAJES_COUNT = 4;

/** @type {{ folder: string; slug: string; name: string }[]} */
const plan = JSON.parse(fs.readFileSync(PLAN_FILE, "utf8"));

const GUIDE_LINES = [
  "Dónde poner paisajes del home — Alo Patagonia",
  "",
  "Cuatro imágenes de paisaje por destino, en:",
  "  public/images/destinations/[destino]/paisajes/",
  "",
  "Nombres sugeridos: 01.jpg, 02.jpg, 03.jpg, 04.jpg (también sirve main.jpg, .png, .webp).",
  "Al build se redimensionan (máx. 1920px) y recomprimen automáticamente.",
  "Después de subir fotos nuevas: npm run catalog:optimize-paisajes && npm run catalog:manifest",
  "",
];

for (const { folder, name } of plan) {
  const paisajesDir = path.join(DESTINATIONS_ROOT, folder, "paisajes");
  fs.mkdirSync(paisajesDir, { recursive: true });

  GUIDE_LINES.push(`── ${folder} (${name}) ──`);
  GUIDE_LINES.push(`  paisajes/ → 4 fotos de paisaje para el home`);

  const slotText = [
    `Destino: ${name}`,
    `Carpeta: paisajes`,
    "",
    `Colocá acá ${PAISAJES_COUNT} imágenes de paisaje (lagos, montaña, naturaleza).`,
    "Sugerencia: 01.jpg, 02.jpg, 03.jpg, 04.jpg",
    "Formatos: .jpg, .jpeg, .png, .webp",
  ].join("\n");

  fs.writeFileSync(path.join(paisajesDir, "SLOT.txt"), `${slotText}\n`, "utf8");

  const gitkeep = path.join(paisajesDir, ".gitkeep");
  if (!fs.existsSync(gitkeep)) {
    fs.writeFileSync(gitkeep, "", "utf8");
  }

  GUIDE_LINES.push("");
}

fs.writeFileSync(
  path.join(DESTINATIONS_ROOT, "_donde-poner-paisajes.txt"),
  `${GUIDE_LINES.join("\n")}\n`,
  "utf8",
);

console.log(`Paisajes folders ready under ${DESTINATIONS_ROOT}`);
