"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type TouchEvent,
} from "react";

import { cn } from "@/lib/utils";

const LOCK_THRESHOLD = 8;
const SWIPE_OFFSET_THRESHOLD = 48;

type MobileSnapCarouselProps = {
  children: ReactNode[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  className?: string;
  trackClassName?: string;
  slideClassName?: string;
  "aria-label"?: string;
};

type GestureState = {
  startX: number;
  startY: number;
  startOffset: number;
  axis: "x" | "y" | null;
};

export function MobileSnapCarousel({
  children,
  activeIndex,
  onActiveIndexChange,
  className,
  trackClassName,
  slideClassName,
  "aria-label": ariaLabel,
}: MobileSnapCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const gestureRef = useRef<GestureState>({
    startX: 0,
    startY: 0,
    startOffset: 0,
    axis: null,
  });
  const [stride, setStride] = useState(0);
  const [dragOffset, setDragOffset] = useState<number | null>(null);

  const count = children.length;
  const maxOffset = Math.max(0, (count - 1) * stride);
  const restingOffset = -activeIndex * stride;
  const translateX = dragOffset ?? restingOffset;

  const measureStride = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const track = viewport.querySelector<HTMLElement>("[data-carousel-track]");
    const slide = viewport.querySelector<HTMLElement>("[data-carousel-slide]");
    if (!track || !slide) return;

    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
    setStride(slide.offsetWidth + gap);
  }, []);

  useLayoutEffect(() => {
    measureStride();
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new ResizeObserver(measureStride);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [children.length, measureStride]);

  useLayoutEffect(() => {
    setDragOffset(null);
  }, [activeIndex, stride]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1 || count <= 1) return;

    gestureRef.current = {
      startX: event.touches[0].clientX,
      startY: event.touches[0].clientY,
      startOffset: restingOffset,
      axis: null,
    };
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1 || count <= 1 || stride === 0) return;

    const touch = event.touches[0];
    const gesture = gestureRef.current;
    const dx = touch.clientX - gesture.startX;
    const dy = touch.clientY - gesture.startY;

    if (!gesture.axis) {
      if (Math.abs(dx) < LOCK_THRESHOLD && Math.abs(dy) < LOCK_THRESHOLD) return;
      gesture.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }

    if (gesture.axis === "y") return;

    const nextOffset = Math.min(0, Math.max(-maxOffset, gesture.startOffset + dx));
    setDragOffset(nextOffset);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const gesture = gestureRef.current;

    if (gesture.axis === "x" && stride > 0) {
      const dx = event.changedTouches[0]?.clientX - gesture.startX;
      let nextIndex = activeIndex;

      if (dx <= -SWIPE_OFFSET_THRESHOLD) {
        nextIndex = Math.min(count - 1, activeIndex + 1);
      } else if (dx >= SWIPE_OFFSET_THRESHOLD) {
        nextIndex = Math.max(0, activeIndex - 1);
      }

      onActiveIndexChange(nextIndex);
    }

    gestureRef.current.axis = null;
    setDragOffset(null);
  };

  const handleTouchCancel = () => {
    gestureRef.current.axis = null;
    setDragOffset(null);
  };

  if (count === 0) return null;

  return (
    <div
      ref={viewportRef}
      className={cn("w-full min-w-0 overflow-hidden", className)}
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      <div
        data-carousel-track
        className={cn(
          "flex w-max max-w-none will-change-transform",
          dragOffset === null && "transition-transform duration-300 ease-out motion-reduce:transition-none",
          trackClassName,
        )}
        style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            data-carousel-slide
            className={cn("relative shrink-0", slideClassName)}
            aria-hidden={index !== activeIndex ? true : undefined}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
