"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type LazyInViewProps = {
  children: ReactNode;
  className?: string;
  /** Margen antes del viewport para empezar a cargar. */
  rootMargin?: string;
  placeholderClassName?: string;
};

/** Monta el contenido solo cuando la sección entra (cerca) del viewport. */
export function LazyInView({
  children,
  className,
  rootMargin = "280px 0px",
  placeholderClassName,
}: LazyInViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, visible]);

  return (
    <div ref={ref} className={cn(className, !visible && placeholderClassName)}>
      {visible ? children : null}
    </div>
  );
}
