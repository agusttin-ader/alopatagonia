import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { SITE } from "@/lib/site";

export const BRAND_OG_SIZE = { width: 1200, height: 630 } as const;
export const BRAND_OG_ALT = `${SITE.name} — viajes por la Patagonia Argentina`;

export const BRAND_ICON_SIZE = 96;
export const BRAND_ICON_LOGO_SIZE = 92;
export const BRAND_APPLE_ICON_SIZE = 180;
export const BRAND_APPLE_LOGO_SIZE = 164;

/** Fondo de marca para Open Graph al compartir links. */
export const BRAND_SURFACE_GRADIENT =
  "linear-gradient(135deg, #0a0f0d 0%, #1a2620 48%, #4d5230 100%)";

const logoDataUrlCache = new Map<string, Promise<string>>();

function getLogoDataUrl(path: string): Promise<string> {
  const cached = logoDataUrlCache.get(path);
  if (cached) return cached;

  const filePath = join(process.cwd(), "public", path.replace(/^\//, ""));
  const promise = readFile(filePath).then(
    (buffer) => `data:image/png;base64,${buffer.toString("base64")}`,
  );
  logoDataUrlCache.set(path, promise);
  return promise;
}

/** Logo claro — para fondos oscuros (pestaña en dark mode). */
export function getLogoOnDarkDataUrl(): Promise<string> {
  return getLogoDataUrl(SITE.faviconOnDark);
}

/** Logo oscuro — para fondos claros (pestaña en light mode). */
export function getLogoOnLightDataUrl(): Promise<string> {
  return getLogoDataUrl(SITE.faviconOnLight);
}

export function renderBrandIconMarkup(logoSrc: string, logoSize: number) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
      }}
    >
      <img src={logoSrc} alt="" width={logoSize} height={logoSize} />
    </div>
  );
}
