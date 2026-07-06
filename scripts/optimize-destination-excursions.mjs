/**
 * Optimiza fotos de excursiones: redimensiona y recomprime sin perder nitidez en pantalla.
 * Ejecutar: npm run catalog:optimize-excursions
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  formatBytes,
  listOptimizableImages,
  listSubdirectories,
  optimizeImage,
} from "./lib/optimize-web-image.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DESTINATIONS_ROOT = path.join(ROOT, "public/images/destinations");
const PLAN_FILE = path.join(ROOT, "lib/catalog/excursion-image-folders.json");

/** @type {{ folder: string }[]} */
const plan = JSON.parse(fs.readFileSync(PLAN_FILE, "utf8"));

async function main() {
  let optimized = 0;
  let skipped = 0;
  let saved = 0;

  for (const { folder } of plan) {
    const excursionesRoot = path.join(DESTINATIONS_ROOT, folder, "excursiones");
    if (!fs.existsSync(excursionesRoot)) continue;

    for (const excursionFolder of listSubdirectories(excursionesRoot)) {
      const excursionDir = path.join(excursionesRoot, excursionFolder);

      for (const absolutePath of listOptimizableImages(excursionDir)) {
        const result = await optimizeImage(absolutePath);

        if (result.changed) {
          optimized += 1;
          saved += result.before - result.after;
          console.log(
            `  ✓ ${folder}/excursiones/${excursionFolder}/${path.basename(result.outputPath)}: ${formatBytes(result.before)} → ${formatBytes(result.after)}`,
          );
        } else {
          skipped += 1;
        }
      }
    }
  }

  console.log(
    `\nExcursiones: ${optimized} optimizadas, ${skipped} ya livianas (${formatBytes(saved)} ahorrados).`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
