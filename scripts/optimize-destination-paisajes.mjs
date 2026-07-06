/**
 * Optimiza fotos de paisajes del home: redimensiona y recomprime sin perder nitidez en pantalla.
 * Ejecutar: npm run catalog:optimize-paisajes
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
const DESTINATIONS_ROOT = path.join(ROOT, "public/images/destinations");
const PLAN_FILE = path.join(ROOT, "lib/catalog/destination-paisajes-folders.json");

/** @type {{ folder: string }[]} */
const plan = JSON.parse(fs.readFileSync(PLAN_FILE, "utf8"));

async function main() {
  let optimized = 0;
  let skipped = 0;
  let saved = 0;

  for (const { folder } of plan) {
    const paisajesDir = path.join(DESTINATIONS_ROOT, folder, "paisajes");
    if (!fs.existsSync(paisajesDir)) continue;

    for (const entry of fs.readdirSync(paisajesDir, { withFileTypes: true })) {
      if (!entry.isFile() || !isOptimizableImageFile(entry.name)) continue;

      const absolutePath = path.join(paisajesDir, entry.name);
      const result = await optimizeImage(absolutePath);

      if (result.changed) {
        optimized += 1;
        saved += result.before - result.after;
        console.log(
          `  ✓ ${folder}/paisajes/${path.basename(result.outputPath)}: ${formatBytes(result.before)} → ${formatBytes(result.after)}`,
        );
      } else {
        skipped += 1;
      }
    }
  }

  console.log(
    `\nPaisajes: ${optimized} optimizadas, ${skipped} ya livianas (${formatBytes(saved)} ahorrados).`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
