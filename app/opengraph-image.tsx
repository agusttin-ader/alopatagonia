import { ImageResponse } from "next/og";

import {
  BRAND_OG_ALT,
  BRAND_OG_SIZE,
  BRAND_SURFACE_GRADIENT,
  getLogoOnDarkDataUrl,
} from "@/lib/brand-image";

export const alt = BRAND_OG_ALT;
export const size = BRAND_OG_SIZE;
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoSrc = await getLogoOnDarkDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND_SURFACE_GRADIENT,
        }}
      >
        <img src={logoSrc} alt="" width={420} height={416} />
      </div>
    ),
    { ...size },
  );
}
