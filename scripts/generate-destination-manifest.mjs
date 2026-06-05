/**
 * Genera rutas de imágenes para el catálogo sin usar fs en el bundle de Next/Vercel.
 * Ejecutar antes del build: npm run catalog:manifest
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DESTINATIONS_ROOT = path.join(ROOT, "public/images/destinations");
const OUT_FILE = path.join(ROOT, "lib/catalog/generated/destination-images.json");

const WEB_IMAGE_PATTERN = /\.(jpe?g|png|webp)$/i;
const MAX_PATHS_PER_FOLDER = 64;
const MIN_PATHS_PER_SUBFOLDER = 12;

const FOLDERS = [
  "bariloche",
  "san-martin",
  "chalten",
  "esquel-trevelin ",
  "la-angostura",
  "madryn",
  "calafate",
  "traful",
  "ushuaia",
];

function toWebPath(absolutePath) {
  return absolutePath
    .replace(path.join(ROOT, "public"), "")
    .split(path.sep)
    .join("/");
}

function listImagesInDirectory(directory) {
  const results = [];
  const walk = (currentDirectory) => {
    for (const entry of fs.readdirSync(currentDirectory, { withFileTypes: true })) {
      const absolutePath = path.join(currentDirectory, entry.name);
      if (entry.isDirectory()) walk(absolutePath);
      else if (WEB_IMAGE_PATTERN.test(entry.name)) {
        results.push(toWebPath(absolutePath));
      }
    }
  };
  walk(directory);
  return results.sort((a, b) => a.localeCompare(b, "es"));
}

function listWebImages(relativeFolder) {
  const absoluteFolder = path.join(DESTINATIONS_ROOT, relativeFolder);
  if (!fs.existsSync(absoluteFolder)) return [];

  const subfolders = fs
    .readdirSync(absoluteFolder, { withFileTypes: true })
    .filter((entry) => entry.isDirectory());

  if (subfolders.length === 0) {
    return listImagesInDirectory(absoluteFolder).slice(0, MAX_PATHS_PER_FOLDER);
  }

  const perSubfolder = Math.max(
    MIN_PATHS_PER_SUBFOLDER,
    Math.ceil(MAX_PATHS_PER_FOLDER / subfolders.length),
  );

  const results = [];
  for (const subfolder of subfolders.sort((a, b) => a.name.localeCompare(b.name, "es"))) {
    const subfolderPath = path.join(absoluteFolder, subfolder.name);
    results.push(...listImagesInDirectory(subfolderPath).slice(0, perSubfolder));
  }

  return results.sort((a, b) => a.localeCompare(b, "es")).slice(0, MAX_PATHS_PER_FOLDER);
}

const manifest = {};
for (const folder of FOLDERS) {
  manifest[folder] = listWebImages(folder);
}

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(`Wrote ${OUT_FILE} (${FOLDERS.length} folders)`);
