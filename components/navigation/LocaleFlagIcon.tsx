import type { AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type LocaleFlagIconProps = {
  locale: AppLocale;
  className?: string;
};

/** Banderas circulares — ES usa Argentina, no España. */
export function LocaleFlagIcon({ locale, className }: LocaleFlagIconProps) {
  return (
    <span
      className={cn(
        "inline-flex size-5 shrink-0 overflow-hidden rounded-full ring-1 ring-black/10",
        className,
      )}
      aria-hidden
    >
      {locale === "es" ? <ArgentinaFlag /> : locale === "pt" ? <BrazilFlag /> : <UsFlag />}
    </span>
  );
}

function ArgentinaFlag() {
  return (
    <svg viewBox="0 0 24 24" className="size-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="24" height="24" fill="#74ACDF" />
      <rect y="8" width="24" height="8" fill="#FFFFFF" />
      <circle cx="12" cy="12" r="2.5" fill="#F6B40E" />
      <circle cx="12" cy="12" r="1.45" fill="#85340A" opacity="0.9" />
    </svg>
  );
}

function BrazilFlag() {
  return (
    <svg viewBox="0 0 24 24" className="size-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="24" height="24" fill="#009B3A" />
      <path d="M12 3.5 21.5 12 12 20.5 2.5 12Z" fill="#FEDF00" />
      <circle cx="12" cy="12" r="4" fill="#002776" />
      <path
        d="M8.4 12a3.6 3.6 0 1 1 7.2 0"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="0.65"
        opacity="0.95"
      />
    </svg>
  );
}

/** Proporción 19:10 recortada al círculo — cantón y franjas alineados. */
function UsFlag() {
  const stripes = 13;
  const flagW = 19;
  const flagH = 10;
  const stripeH = flagH / stripes;
  const cantonW = flagW * 0.4;
  const cantonH = stripeH * 7;

  const stars: [number, number][] = [
    [1.4, 0.75],
    [3.8, 0.75],
    [6.2, 0.75],
    [2.6, 1.65],
    [5.0, 1.65],
    [1.4, 2.55],
    [3.8, 2.55],
    [6.2, 2.55],
    [2.6, 3.45],
    [5.0, 3.45],
    [1.4, 4.35],
    [3.8, 4.35],
    [6.2, 4.35],
  ];

  return (
    <svg viewBox={`0 0 ${flagW} ${flagH}`} className="size-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {Array.from({ length: stripes }, (_, index) => (
        <rect
          key={index}
          x="0"
          y={index * stripeH}
          width={flagW}
          height={stripeH + 0.02}
          fill={index % 2 === 0 ? "#B22234" : "#FFFFFF"}
        />
      ))}
      <rect x="0" y="0" width={cantonW} height={cantonH} fill="#3C3B6E" />
      {stars.map(([cx, cy], index) => (
        <circle key={index} cx={cx} cy={cy} r="0.28" fill="#FFFFFF" />
      ))}
    </svg>
  );
}
