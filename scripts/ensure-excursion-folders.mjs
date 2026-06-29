/**
 * Crea carpetas de excursiones con nombre descriptivo (ej. bosque-sumergido).
 * Ejecutar: npm run catalog:excursion-folders
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DESTINATIONS_ROOT = path.join(ROOT, "public/images/destinations");
const PLAN_FILE = path.join(ROOT, "lib/catalog/excursion-image-folders.json");

const LEGACY_NUMBERED = new Set(["excursion-1", "excursion-2", "excursion-3"]);

/** @type {import("../lib/catalog/excursion-image-folders.ts").DestinationExcursionFolderConfig[]} */
const plan = JSON.parse(fs.readFileSync(PLAN_FILE, "utf8"));

const GUIDE_LINES = [
  "Dónde poner las fotos de excursiones — Alo Patagonia",
  "",
  "Una imagen por excursión, dentro de la carpeta con el nombre de la excursión.",
  "Nombre sugerido del archivo: main.jpg (también sirve .jpeg, .png o .webp).",
  "Después de subir fotos: npm run catalog:manifest",
  "",
];

function isRemovableLegacyDir(dirPath) {
  if (!fs.existsSync(dirPath)) return false;
  const entries = fs.readdirSync(dirPath);
  return entries.every((name) => name === ".gitkeep" || name === "SLOT.txt");
}

function moveLegacyFolder(excursionesRoot, legacyName, targetDir) {
  const legacyDir = path.join(excursionesRoot, legacyName);
  if (!fs.existsSync(legacyDir) || fs.existsSync(targetDir)) return;

  fs.renameSync(legacyDir, targetDir);
  console.log(`  moved ${legacyName}/ → ${path.basename(targetDir)}/`);
}

for (const { folder, excursions } of plan) {
  const excursionesRoot = path.join(DESTINATIONS_ROOT, folder, "excursiones");
  fs.mkdirSync(excursionesRoot, { recursive: true });

  GUIDE_LINES.push(`── ${folder} ──`);

  for (const { folderSlug, name, legacyFolders = [] } of excursions) {
    const targetDir = path.join(excursionesRoot, folderSlug);
    fs.mkdirSync(targetDir, { recursive: true });

    for (const legacyName of legacyFolders) {
      moveLegacyFolder(excursionesRoot, legacyName, targetDir);
    }

    const slotText = [
      `Excursión: ${name}`,
      `Carpeta: ${folderSlug}`,
      "",
      "Colocá acá una sola imagen (ideal: main.jpg).",
      "Formatos: .jpg, .jpeg, .png, .webp",
    ].join("\n");

    fs.writeFileSync(path.join(targetDir, "SLOT.txt"), `${slotText}\n`, "utf8");

    const gitkeep = path.join(targetDir, ".gitkeep");
    if (!fs.existsSync(gitkeep)) {
      fs.writeFileSync(gitkeep, "", "utf8");
    }

    GUIDE_LINES.push(`  excursiones/${folderSlug}/ → ${name}`);
  }

  if (fs.existsSync(excursionesRoot)) {
    for (const entry of fs.readdirSync(excursionesRoot, { withFileTypes: true })) {
      if (!entry.isDirectory() || !LEGACY_NUMBERED.has(entry.name)) continue;
      const legacyDir = path.join(excursionesRoot, entry.name);
      if (isRemovableLegacyDir(legacyDir)) {
        fs.rmSync(legacyDir, { recursive: true, force: true });
        console.log(`  removed legacy ${folder}/excursiones/${entry.name}/`);
      }
    }
  }

  GUIDE_LINES.push("");
}

fs.writeFileSync(
  path.join(DESTINATIONS_ROOT, "_donde-poner-excursiones.txt"),
  `${GUIDE_LINES.join("\n")}\n`,
  "utf8",
);

console.log(`Excursion folders ready under ${DESTINATIONS_ROOT}`);
