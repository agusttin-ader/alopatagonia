"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState, type ReactNode } from "react";

import { useCoarseMobile } from "@/lib/use-coarse-mobile";
import { cn } from "@/lib/utils";

const MOBILE_INITIAL_COUNT = 4;

type MobileCatalogLoadMoreProps = {
  total: number;
  children: (visibleCount: number) => ReactNode;
  className?: string;
};

/** Limita ítems visibles en mobile y ofrece “Ver más”; en desktop muestra todo. */
export function MobileCatalogLoadMore({
  total,
  children,
  className,
}: MobileCatalogLoadMoreProps) {
  const t = useTranslations("catalog");
  const isMobile = useCoarseMobile();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [total]);

  const visibleCount =
    !isMobile || expanded || total <= MOBILE_INITIAL_COUNT
      ? total
      : MOBILE_INITIAL_COUNT;
  const canExpand = isMobile && !expanded && total > MOBILE_INITIAL_COUNT;
  const remaining = total - MOBILE_INITIAL_COUNT;

  return (
    <div className={className}>
      {children(visibleCount)}
      {canExpand ? (
        <div className="mt-6 flex justify-center md:hidden">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className={cn(
              "inline-flex min-h-11 w-full max-w-sm items-center justify-center rounded-full",
              "border border-border/80 bg-card px-5 text-sm font-semibold text-foreground",
              "transition-colors hover:border-cta/40 hover:text-cta",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2",
            )}
          >
            {t("showMore", { count: remaining })}
          </button>
        </div>
      ) : null}
    </div>
  );
}
