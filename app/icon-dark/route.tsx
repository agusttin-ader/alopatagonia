import { ImageResponse } from "next/og";

import {
  BRAND_ICON_LOGO_SIZE,
  BRAND_ICON_SIZE,
  getLogoOnDarkDataUrl,
  renderBrandIconMarkup,
} from "@/lib/brand-image";

export const runtime = "nodejs";

export async function GET() {
  const logoSrc = await getLogoOnDarkDataUrl();

  return new ImageResponse(renderBrandIconMarkup(logoSrc, BRAND_ICON_LOGO_SIZE), {
    width: BRAND_ICON_SIZE,
    height: BRAND_ICON_SIZE,
  });
}
