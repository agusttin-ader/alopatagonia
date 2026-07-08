/**
 * Optimiza fotos de imagenes-home e instagram-section: redimensiona y recomprime
 * para reducir peso y evitar fallos del optimizador de imágenes en producción.
 * Ejecutar: npm run home:optimize
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  formatBytes,
  isOptimizableImageFile,
  optimizeImage,
} from "./lib/optimize-web-image.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC_IMAGES = path.join(ROOT, "public/images");

const FOLDERS = ["imagenes-home", "instagram-section"];

async function optimizeFolder(folderName) {
  const directory = path.join(PUBLIC_IMAGES, folderName);
  if (!fs.existsSync(directory)) return { optimized: 0, skipped: 0, saved: 0 };

  let optimized = 0;
  let skipped = 0;
  let saved = 0;

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isFile() || !isOptimizableImageFile(entry.name)) continue;

    const absolutePath = path.join(directory, entry.name);
    const result = await optimizeImage(absolutePath);

    if (result.changed) {
      optimized += 1;
      saved += result.before - result.after;
      console.log(
        `  ✓ ${folderName}/${path.basename(result.outputPath)}: ${formatBytes(result.before)} → ${formatBytes(result.after)}`,
      );
    } else {
      skipped += 1;
    }
  }

  return { optimized, skipped, saved };
}

async function main() {
  let totalOptimized = 0;
  let totalSkipped = 0;
  let totalSaved = 0;

  for (const folder of FOLDERS) {
    const result = await optimizeFolder(folder);
    totalOptimized += result.optimized;
    totalSkipped += result.skipped;
    totalSaved += result.saved;
  }

  console.log(
    `\nHome images: ${totalOptimized} optimizadas, ${totalSkipped} ya livianas (${formatBytes(totalSaved)} ahorrados).`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
