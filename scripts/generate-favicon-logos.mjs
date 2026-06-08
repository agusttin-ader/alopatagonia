import { mkdir } from "node:fs/promises";
import { join } from "node:path";

import sharp from "sharp";

const OUT_DIR = join(process.cwd(), "public/images/logo");
const PUBLIC_DIR = join(process.cwd(), "public");
const APP_DIR = join(process.cwd(), "app");

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

async function writeSquareIcon(input, output, size, logoScale = 0.88) {
  const logoSize = Math.round(size * logoScale);
  const logoBuffer = await sharp(input)
    .resize(logoSize, logoSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: logoBuffer, gravity: "centre" }])
    .png()
    .toFile(output);
}

await mkdir(OUT_DIR, { recursive: true });
await mkdir(PUBLIC_DIR, { recursive: true });
await mkdir(APP_DIR, { recursive: true });

const darkFavicon = join(OUT_DIR, "logo-alo-favicon-dark.png");
const lightFavicon = join(OUT_DIR, "logo-alo-favicon-light.png");

await makeTransparent(
  join(OUT_DIR, "logo-alo.png"),
  darkFavicon,
  [0, 0, 0],
);

// Versión oscura para pestañas claras: invertir el logo blanco transparente.
await sharp(darkFavicon).negate({ alpha: false }).png().toFile(lightFavicon);

// Favicon estático para Google, pestañas y crawlers (rutas dinámicas /icon-* no siempre se indexan).
await writeSquareIcon(lightFavicon, join(PUBLIC_DIR, "favicon.png"), 48);
await writeSquareIcon(lightFavicon, join(PUBLIC_DIR, "favicon-96.png"), 96);
await writeSquareIcon(lightFavicon, join(PUBLIC_DIR, "apple-touch-icon.png"), 180, 0.82);
await writeSquareIcon(lightFavicon, join(APP_DIR, "icon.png"), 96);
await writeSquareIcon(darkFavicon, join(APP_DIR, "icon-dark.png"), 96);

console.log("Wrote favicon logo variants in public/images/logo/ and public/favicon*.png");
