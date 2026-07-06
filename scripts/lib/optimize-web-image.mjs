import fs from "node:fs";
import path from "node:path";

import sharp from "sharp";

/** Suficiente para cards y lightbox retina; Next.js sirve AVIF/WebP más liviano. */
export const MAX_DIMENSION = 1920;
export const JPEG_QUALITY = 84;
export const MIN_BYTES_TO_TOUCH = 180 * 1024;
/** JPEG ya liviano y en tamaño web — no re-comprimir en cada build. */
export const MAX_LIGHT_JPEG_BYTES = 900 * 1024;

export const WEB_IMAGE_PATTERN = /\.(jpe?g|png|webp)$/i;

const SKIP_FILE_NAMES = new Set(["SLOT.txt", ".gitkeep", ".DS_Store"]);

export function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}

export function isOptimizableImageFile(name) {
  if (name.startsWith(".")) return false;
  if (SKIP_FILE_NAMES.has(name)) return false;
  return WEB_IMAGE_PATTERN.test(name);
}

export async function optimizeImage(absolutePath) {
  const before = fs.statSync(absolutePath).size;
  const metadata = await sharp(absolutePath).metadata();
  const needsResize =
    (metadata.width ?? 0) > MAX_DIMENSION || (metadata.height ?? 0) > MAX_DIMENSION;
  const isPng = absolutePath.toLowerCase().endsWith(".png");
  const isWebp = absolutePath.toLowerCase().endsWith(".webp");
  const outputPath = absolutePath.replace(/\.(jpe?g|png|webp)$/i, ".jpg");
  const needsExtensionNormalize = outputPath !== absolutePath;

  if (
    !needsResize &&
    !needsExtensionNormalize &&
    !isPng &&
    !isWebp &&
    before <= MAX_LIGHT_JPEG_BYTES
  ) {
    return { changed: false, before, after: before, outputPath: absolutePath };
  }

  let pipeline = sharp(absolutePath).rotate();

  if (needsResize) {
    pipeline = pipeline.resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  const tempPath = `${absolutePath}.opt.tmp`;
  const shouldReplaceExtension = needsExtensionNormalize;

  await pipeline
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
    .toFile(tempPath);

  if (shouldReplaceExtension && fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
  }

  fs.renameSync(tempPath, outputPath);

  const after = fs.statSync(outputPath).size;
  return { changed: true, before, after, outputPath };
}

export function listSubdirectories(directory) {
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "es"));
}

export function listOptimizableImages(directory) {
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && isOptimizableImageFile(entry.name))
    .map((entry) => path.join(directory, entry.name));
}
