import { HERO_POSTER_SRC, HERO_VIDEO_PRELOADS } from "@/lib/home-media-preload";

/** Preloads SSR del hero (video + poster) — Next.js los mueve al `<head>`. */
export function HomeCriticalMediaPreload() {
  return (
    <>
      {HERO_VIDEO_PRELOADS.map((item) => (
        <link
          key={item.href}
          rel="preload"
          href={item.href}
          as="fetch"
          type="video/mp4"
          media={item.media}
          fetchPriority="high"
        />
      ))}
      <link rel="preload" href={HERO_POSTER_SRC} as="image" fetchPriority="high" />
    </>
  );
}
