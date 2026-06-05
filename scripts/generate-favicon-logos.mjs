import { mkdir } from "node:fs/promises";
import { join } from "node:path";

import sharp from "sharp";

const OUT_DIR = join(process.cwd(), "public/images/logo");

/** Convierte un color de fondo plano en transparencia. */
async function makeTransparent(input, output, background) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const threshold = 24;
  const [bgR, bgG, bgB] = background;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (
      Math.abs(r - bgR) <= threshold &&
      Math.abs(g - bgG) <= threshold &&
      Math.abs(b - bgB) <= threshold
    ) {
      data[i + 3] = 0;
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(output);
}

await mkdir(OUT_DIR, { recursive: true });

const darkFavicon = join(OUT_DIR, "logo-alo-favicon-dark.png");
const lightFavicon = join(OUT_DIR, "logo-alo-favicon-light.png");

await makeTransparent(
  join(OUT_DIR, "logo-alo.png"),
  darkFavicon,
  [0, 0, 0],
);

// Versión oscura para pestañas claras: invertir el logo blanco transparente.
await sharp(darkFavicon).negate({ alpha: false }).png().toFile(lightFavicon);

console.log("Wrote favicon logo variants in public/images/logo/");
