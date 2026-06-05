import { ImageResponse } from "next/og";

import {
  BRAND_APPLE_ICON_SIZE,
  BRAND_APPLE_LOGO_SIZE,
  getLogoOnLightDataUrl,
  renderBrandIconMarkup,
} from "@/lib/brand-image";

export const runtime = "nodejs";

export async function GET() {
  const logoSrc = await getLogoOnLightDataUrl();

  return new ImageResponse(renderBrandIconMarkup(logoSrc, BRAND_APPLE_LOGO_SIZE), {
    width: BRAND_APPLE_ICON_SIZE,
    height: BRAND_APPLE_ICON_SIZE,
  });
}
