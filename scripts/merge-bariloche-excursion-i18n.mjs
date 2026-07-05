/**
 * Fusiona traducciones de excursiones Bariloche en messages/excursions/{en,pt}.json
 * Uso: node scripts/merge-bariloche-excursion-i18n.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const barilocheEn = JSON.parse(
  fs.readFileSync(path.join(ROOT, "messages/excursions/bariloche.en.json"), "utf8"),
);
const barilochePt = JSON.parse(
  fs.readFileSync(path.join(ROOT, "messages/excursions/bariloche.pt.json"), "utf8"),
);

for (const [locale, bariloche] of [
  ["en", barilocheEn],
  ["pt", barilochePt],
]) {
  const filePath = path.join(ROOT, `messages/excursions/${locale}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  data.items.bariloche = bariloche;
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log(`Updated ${filePath}`);
}
