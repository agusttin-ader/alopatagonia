/**
 * Convierte HEIC → JPEG y genera manifest para imágenes del home e Instagram.
 * Ejecutar: npm run home:manifest
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
const PUBLIC_IMAGES = path.join(ROOT, "public/images");
const OUT_FILE = path.join(ROOT, "lib/generated/home-images.json");

const FOLDERS = {
  home: "imagenes-home",
  instagram: "instagram-section",
};

const WEB_IMAGE_PATTERN = /\.(jpe?g|png|webp)$/i;
const HEIC_PATTERN = /\.heic$/i;

function toWebPath(absolutePath) {
  return absolutePath
    .replace(path.join(ROOT, "public"), "")
    .split(path.sep)
    .join("/");
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

async function listWebImages(folderName) {
  const directory = path.join(PUBLIC_IMAGES, folderName);
  if (!fs.existsSync(directory)) {
    return [];
  }

  const entries = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => !name.startsWith(".") && name !== ".DS_Store")
    .sort((a, b) => b.localeCompare(a));

  const webPaths = [];

  for (const name of entries) {
    const absolutePath = path.join(directory, name);
    const webPath = await ensureWebImage(absolutePath);
    if (!webPath || !WEB_IMAGE_PATTERN.test(webPath)) continue;
    const normalized = toWebPath(webPath);
    if (!webPaths.includes(normalized)) {
      webPaths.push(normalized);
    }
  }

  return webPaths.sort((a, b) => b.localeCompare(a));
}

const DEFAULT_IMAGE_FALLBACK = "/images/destinations/bariloche/banner-bariloche.jpg";

function pickHeroAndExperience(homePaths) {
  const hero = homePaths[0] ?? DEFAULT_IMAGE_FALLBACK;
  const experience = homePaths[1] ?? homePaths[0] ?? DEFAULT_IMAGE_FALLBACK;
  return { hero, experience };
}

async function main() {
  const home = await listWebImages(FOLDERS.home);
  const instagram = await listWebImages(FOLDERS.instagram);
  const picks = pickHeroAndExperience(home);

  const manifest = {
    generatedAt: new Date().toISOString(),
    home,
    instagram,
    hero: picks.hero,
    experience: picks.experience,
  };

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Home images: ${home.length}, Instagram: ${instagram.length}`);
  console.log(`Wrote ${OUT_FILE}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
