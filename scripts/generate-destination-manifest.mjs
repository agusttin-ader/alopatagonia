/**
 * Genera rutas de imágenes para el catálogo sin usar fs en el bundle de Next/Vercel.
 * Ejecutar antes del build: npm run catalog:manifest
 */
import fs from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const execFileAsync = promisify(execFile);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DESTINATIONS_ROOT = path.join(ROOT, "public/images/destinations");
const OUT_FILE = path.join(ROOT, "lib/catalog/generated/destination-images.json");
const ACCOMMODATIONS_FILE = path.join(
  ROOT,
  "lib/catalog/generated/destination-accommodations.json",
);

const WEB_IMAGE_PATTERN = /\.(jpe?g|png|webp)$/i;
const HEIC_PATTERN = /\.heic$/i;
const MAX_PATHS_PER_FOLDER = 128;
const MIN_PATHS_PER_SUBFOLDER = 12;
const MAX_IMAGES_PER_PROPERTY = 32;

const DESTINATION_FOLDERS = [
  { folder: "bariloche", slug: "bariloche" },
  { folder: "san-martin", slug: "san-martin" },
  { folder: "chalten", slug: "el-chalten" },
  { folder: "esquel-trevelin ", slug: "esquel" },
  { folder: "la-angostura", slug: "villa-la-angostura" },
  { folder: "madryn", slug: "puerto-madryn" },
  { folder: "calafate", slug: "el-calafate" },
  { folder: "traful", slug: "traful" },
  { folder: "ushuaia", slug: "ushuaia" },
];

function normalizeFolderName(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, "")
    .replace(/⭐️|⭐/g, "")
    .trim()
    .toLowerCase();
}

function inferCategoryType(folderName) {
  const normalized = normalizeFolderName(folderName);

  const exactCabana = new Set(["cabanas", "cabana"]);
  const exactDepto = new Set(["dptos", "depto", "departamentos", "departamento"]);
  const exactHotel = new Set(["hoteles", "hotel", "hostels", "hostel"]);

  if (exactCabana.has(normalized) || normalized.includes("bariloche cabana")) {
    return "cabana";
  }

  if (exactDepto.has(normalized) || normalized.includes("bariloche dpto")) {
    return "departamento";
  }

  if (exactHotel.has(normalized) || normalized.includes("bariloche hotel")) {
    return "hostel";
  }

  return null;
}

function inferTypeFromName(name) {
  const normalized = normalizeFolderName(name);

  if (
    /\bdpto?s?\b|\bdepto\b|\bapart|\bdepartamento/.test(normalized) ||
    normalized.includes("dptos")
  ) {
    return "departamento";
  }

  if (
    /\bhotel|\bhostel|\bhosteria|\bhostal|\bluxury\b/.test(normalized) ||
    normalized.includes("hosteria")
  ) {
    return "hostel";
  }

  if (
    /\bcab\b|\bcabana|\bcasa\b|\bcomplejo/.test(normalized) ||
    normalized.startsWith("cab.")
  ) {
    return "cabana";
  }

  return "hostel";
}

function isCategoryFolder(folderName) {
  return inferCategoryType(folderName) !== null;
}

function toWebPath(absolutePath) {
  return absolutePath
    .replace(path.join(ROOT, "public"), "")
    .split(path.sep)
    .join("/");
}

/** `main.jpg` (o `Main.jpg`) en cada carpeta de alojamiento = foto principal. */
function isMainImagePath(webPath) {
  const base = path.posix.basename(webPath);
  const stem = base.replace(/\.(jpe?g|png|webp)$/i, "");
  return stem.toLowerCase() === "main";
}

function prioritizeMainImage(paths) {
  const unique = [...new Set(paths)];
  const main = unique.filter(isMainImagePath);
  const rest = unique.filter((entry) => !isMainImagePath(entry));
  return [...main, ...rest];
}

async function convertHeicWithSips(absolutePath, jpegPath) {
  if (process.platform !== "darwin") return false;

  try {
    await execFileAsync("sips", ["-s", "format", "jpeg", absolutePath, "--out", jpegPath]);
    return fs.existsSync(jpegPath);
  } catch {
    return false;
  }
}

async function ensureWebImage(absolutePath) {
  if (WEB_IMAGE_PATTERN.test(absolutePath)) {
    return absolutePath;
  }

  if (!HEIC_PATTERN.test(absolutePath)) {
    return null;
  }

  const jpegPath = absolutePath.replace(HEIC_PATTERN, ".jpg");
  const sourceStat = fs.statSync(absolutePath);
  const jpegExists = fs.existsSync(jpegPath);
  const jpegStat = jpegExists ? fs.statSync(jpegPath) : null;

  if (!jpegExists || sourceStat.mtimeMs > jpegStat.mtimeMs) {
    try {
      await sharp(absolutePath).rotate().jpeg({ quality: 88, mozjpeg: true }).toFile(jpegPath);
    } catch (error) {
      const converted = await convertHeicWithSips(absolutePath, jpegPath);
      if (!converted) {
        console.warn(`Skip ${absolutePath}: ${error instanceof Error ? error.message : error}`);
        return null;
      }
    }
  }

  return jpegPath;
}

function listSubdirectories(directory) {
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== ".DS_Store")
    .sort((a, b) => a.name.localeCompare(b.name, "es"));
}

async function listWebImagesInDirectory(directory) {
  const results = [];

  const walk = async (currentDirectory) => {
    for (const entry of fs.readdirSync(currentDirectory, { withFileTypes: true })) {
      if (entry.name.startsWith(".") || entry.name === ".DS_Store") continue;

      const absolutePath = path.join(currentDirectory, entry.name);
      if (entry.isDirectory()) {
        await walk(absolutePath);
        continue;
      }

      const webPath = await ensureWebImage(absolutePath);
      if (!webPath || !WEB_IMAGE_PATTERN.test(webPath)) continue;
      results.push(toWebPath(webPath));
    }
  };

  await walk(directory);
  return prioritizeMainImage(results.sort((a, b) => a.localeCompare(b, "es")));
}

async function listWebImages(relativeFolder) {
  const absoluteFolder = path.join(DESTINATIONS_ROOT, relativeFolder);
  if (!fs.existsSync(absoluteFolder)) return [];

  const subfolders = listSubdirectories(absoluteFolder);

  if (subfolders.length === 0) {
    return (await listWebImagesInDirectory(absoluteFolder)).slice(0, MAX_PATHS_PER_FOLDER);
  }

  const perSubfolder = Math.max(
    MIN_PATHS_PER_SUBFOLDER,
    Math.ceil(MAX_PATHS_PER_FOLDER / subfolders.length),
  );

  const results = [];
  for (const subfolder of subfolders) {
    const subfolderPath = path.join(absoluteFolder, subfolder.name);

    // Una imagen por carpeta de excursión (p. ej. 26 en Bariloche).
    if (subfolder.name === "excursiones") {
      for (const excursionFolder of listSubdirectories(subfolderPath)) {
        const excursionPath = path.join(subfolderPath, excursionFolder.name);
        const images = (await listWebImagesInDirectory(excursionPath)).slice(0, 1);
        results.push(...images);
      }
      continue;
    }

    results.push(
      ...(await listWebImagesInDirectory(subfolderPath)).slice(0, perSubfolder),
    );
  }

  return results.sort((a, b) => a.localeCompare(b, "es")).slice(0, MAX_PATHS_PER_FOLDER);
}

function slugifyPropertyName(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, "")
    .replace(/⭐️|⭐/g, "")
    .trim()
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function pushPropertyEntry(entries, { name, type, categoryFolder, propertyPath }) {
  const images = (await listWebImagesInDirectory(propertyPath)).slice(0, MAX_IMAGES_PER_PROPERTY);
  if (images.length === 0) return;

  entries.push({
    name: name.trim(),
    itemSlug: slugifyPropertyName(name),
    type,
    categoryFolder,
    images,
  });
}

async function scanAlojamientos(relativeFolder) {
  const alojamientosRoot = path.join(DESTINATIONS_ROOT, relativeFolder, "alojamientos");
  if (!fs.existsSync(alojamientosRoot)) return [];

  const entries = [];

  for (const child of listSubdirectories(alojamientosRoot)) {
    const childPath = path.join(alojamientosRoot, child.name);
    const childSubdirs = listSubdirectories(childPath);

    if (isCategoryFolder(child.name)) {
      const type = inferCategoryType(child.name);

      if (childSubdirs.length > 0) {
        for (const property of childSubdirs) {
          await pushPropertyEntry(entries, {
            name: property.name,
            type,
            categoryFolder: child.name,
            propertyPath: path.join(childPath, property.name),
          });
        }
      } else {
        await pushPropertyEntry(entries, {
          name: child.name,
          type,
          categoryFolder: child.name,
          propertyPath: childPath,
        });
      }
      continue;
    }

    if (childSubdirs.length > 0) {
      for (const property of childSubdirs) {
        await pushPropertyEntry(entries, {
          name: property.name,
          type: inferTypeFromName(property.name),
          categoryFolder: child.name,
          propertyPath: path.join(childPath, property.name),
        });
      }
      continue;
    }

    await pushPropertyEntry(entries, {
      name: child.name,
      type: inferTypeFromName(child.name),
      propertyPath: childPath,
    });
  }

  return entries;
}

async function buildAllAccommodations() {
  const manifest = {};

  for (const { folder, slug } of DESTINATION_FOLDERS) {
    const entries = await scanAlojamientos(folder);
    if (entries.length > 0) {
      manifest[slug] = entries;
    }
  }

  return manifest;
}

async function main() {
  const manifest = {};
  for (const { folder } of DESTINATION_FOLDERS) {
    manifest[folder] = await listWebImages(folder);
  }

  const accommodations = await buildAllAccommodations();
  const propertyCount = Object.values(accommodations).reduce(
    (total, entries) => total + entries.length,
    0,
  );

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  fs.writeFileSync(
    ACCOMMODATIONS_FILE,
    `${JSON.stringify(accommodations, null, 2)}\n`,
    "utf8",
  );

  console.log(`Wrote ${OUT_FILE} (${DESTINATION_FOLDERS.length} folders)`);
  console.log(
    `Wrote ${ACCOMMODATIONS_FILE} (${Object.keys(accommodations).length} destinations, ${propertyCount} properties)`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
