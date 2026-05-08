"use client";

import { useReducedMotion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const COMPASS_NEEDLE_D =
  "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z";
const COMPASS_CX = 12;
const COMPASS_CY = 12;
const COMPASS_MARKER_SCALE = 0.62;

export function CtaTrailMap() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const desktopDotMotionRef = useRef<SVGAnimateMotionElement | null>(null);
  const hasStartedRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(svgRef, { once: true, amount: 0.28 });

  const durSec = 4.6;

  useEffect(() => {
    if (!isInView || hasStartedRef.current || reduceMotion) return;
    const desktopEl = desktopDotMotionRef.current;
    if (!desktopEl) return;
    hasStartedRef.current = true;
    desktopEl?.beginElement();
  }, [isInView, reduceMotion]);

  return (
    <>
      <svg
        ref={svgRef}
        className="pointer-events-none absolute inset-0 z-[1] hidden h-full w-full -translate-y-10 text-brand-forest md:block"
        viewBox="0 0 1000 320"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <path
          id="cta-trail-route-desktop"
          d="M118 280 C162 258 192 204 240 175 S360 145 440 165 S520 195 600 155 S700 115 780 135 S846 162 906 141"
          fill="none"
          stroke="none"
        />
        <path
          d="M118 280 C162 258 192 204 240 175 S360 145 440 165 S520 195 600 155 S700 115 780 135 S846 162 906 141"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.26}
          strokeDasharray="10 14"
        />

        <path
          d="M118 280 C162 258 192 204 240 175 S360 145 440 165 S520 195 600 155 S700 115 780 135 S846 162 906 141"
          fill="none"
          stroke="currentColor"
          strokeWidth={0.9}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.14}
        />

        <g>
          <g>
            <animateMotion
              ref={desktopDotMotionRef}
              dur={`${durSec}s`}
              repeatCount={1}
              fill="freeze"
              begin="indefinite"
              rotate="none"
              calcMode="spline"
              keySplines="0.42 0 0.58 1"
              keyPoints="0;1"
              keyTimes="0;1"
            >
              <mpath href="#cta-trail-route-desktop" />
            </animateMotion>
            <g
              transform={`scale(${COMPASS_MARKER_SCALE}) translate(${-COMPASS_CX} ${-COMPASS_CY})`}
            >
              <circle
                cx={COMPASS_CX}
                cy={COMPASS_CY}
                r={10}
                fill="currentColor"
                fillOpacity={0.2}
                stroke="currentColor"
                strokeOpacity={0.45}
                strokeWidth={2}
              />
              <path
                d={COMPASS_NEEDLE_D}
                fill="currentColor"
                fillOpacity={0.92}
                stroke="currentColor"
                strokeOpacity={0.36}
                strokeWidth={1.25}
                strokeLinejoin="round"
              />
            </g>
          </g>
        </g>

        <g
          transform="translate(90, 236)"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            fill="currentColor"
            fillOpacity={0.26}
            strokeWidth={1}
            strokeOpacity={0.48}
            d="M2 34 L16 14 L30 34 V46 H2z"
          />
          <path
            fill="currentColor"
            fillOpacity={0.38}
            stroke="none"
            d="M2 34 L16 14 L30 34"
          />
          <rect
            x={20}
            y={14}
            width={4}
            height={8}
            rx={0.5}
            fill="currentColor"
            fillOpacity={0.32}
            stroke="currentColor"
            strokeWidth={0.85}
            strokeOpacity={0.45}
          />
          <rect
            x={11}
            y={36}
            width={6}
            height={10}
            rx={0.5}
            fill="none"
            strokeWidth={1}
            strokeOpacity={0.52}
          />
          <path
            fill="none"
            strokeWidth={0.75}
            strokeOpacity={0.4}
            d="M5.5 38h5v5h-5z M8 38v5 M5.5 40.5h5"
          />
        </g>

        <g fill="currentColor" fillOpacity={0.45}>
          <circle cx={240} cy={175} r={3.5} />
          <circle cx={440} cy={165} r={3} />
          <circle cx={600} cy={155} r={3.5} />
          <circle cx={780} cy={135} r={3} />
          <circle cx={906} cy={141} r={2.8} />
        </g>
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          strokeOpacity={0.5}
        >
          <circle cx={240} cy={175} r={6} />
          <circle cx={600} cy={155} r={6} />
        </g>

        <g
          transform="translate(838, 72)"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
        <path
          fill="currentColor"
          fillOpacity={0.14}
          strokeWidth={1.05}
          strokeOpacity={0.4}
          d="M6 62 L26 38 L42 50 L58 24 L74 46 L88 30 L104 52 L118 34 L132 58 H6z"
        />
        <g transform="translate(68, 12) scale(0.4) translate(-68, -12)">
          <g fill="currentColor" stroke="none" fillOpacity={0.4}>
            <animateTransform
              attributeName="transform"
              type="translate"
              additive="sum"
              values="0 0; 5 -2; -4 1; 2 -1; 0 0"
              keyTimes="0; 0.28; 0.52; 0.78; 1"
              dur="16s"
              repeatCount="indefinite"
            />
            <path d="M68 9.5 C52 2.5 38 4.5 30 10.5 C26 12.5 27 15.5 33 15.5 C44 13.5 55 14.5 68 15.5 C81 14.5 92 13.5 103 15.5 C109.5 16 110 12.5 106 10.5 C98 4.5 84 2.5 68 9.5 Z" />
            <path
              fillOpacity={0.95}
              d="M68 15.5 L64.5 21 L66.5 18.5 L68 19.8 L69.5 18.5 L71.5 21 Z"
            />
            <path
              fillOpacity={0.55}
              d="M38 10.5 L34 12.5 L36 11.2 L40 10.2 Z M98 10.5 L102 12.5 L100 11.2 L96 10.2 Z"
            />
          </g>
        </g>
        <path
          fill="none"
          strokeWidth={1.15}
          strokeOpacity={0.48}
          d="M6 62 L26 38 L42 50 L58 24 L74 46 L88 30 L104 52 L118 34 L132 58"
        />
        <path
          fill="none"
          strokeWidth={0.85}
          strokeOpacity={0.35}
          d="M34 44 L42 50 M96 40 L104 52"
        />
        <g fill="currentColor" fillOpacity={0.34} stroke="none">
          <path d="M16 61.5 L20 47 L24 61.5z" />
          <path d="M34 60.8 L38 46 L42 60.8z M36 60.8 L40 48 L44 60.8z" />
          <path d="M56 59.9 L60 45 L64 59.9z" />
          <path d="M78 59 L82 46 L86 59z" />
          <path d="M98 58.2 L102 45 L106 58.2z M100 58.2 L104 47 L108 58.2z" />
          <path d="M118 57.3 L122 46 L126 57.3z" />
        </g>
        </g>
      </svg>

      <svg
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full -translate-y-12 text-brand-forest md:hidden"
        viewBox="0 0 390 520"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <path
          id="cta-trail-route-mobile"
          d="M42 428 C74 398 102 360 142 336 S222 292 248 252 S278 190 320 166"
          fill="none"
          stroke="none"
        />
        <path
          d="M42 428 C74 398 102 360 142 336 S222 292 248 252 S278 190 320 166"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.28}
          strokeDasharray="8 12"
        />
        <path
          d="M42 428 C74 398 102 360 142 336 S222 292 248 252 S278 190 320 166"
          fill="none"
          stroke="currentColor"
          strokeWidth={0.9}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.16}
        />

        <g>
          <g
            transform={`scale(${COMPASS_MARKER_SCALE}) translate(${-COMPASS_CX} ${-COMPASS_CY})`}
          >
            <circle
              cx={COMPASS_CX}
              cy={COMPASS_CY}
              r={10}
              fill="currentColor"
              fillOpacity={0.2}
              stroke="currentColor"
              strokeOpacity={0.45}
              strokeWidth={2}
            />
            <path
              d={COMPASS_NEEDLE_D}
              fill="currentColor"
              fillOpacity={0.92}
              stroke="currentColor"
              strokeOpacity={0.36}
              strokeWidth={1.25}
              strokeLinejoin="round"
            />
          </g>
        </g>

        <g
          transform="translate(24, 392)"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            fill="currentColor"
            fillOpacity={0.26}
            strokeWidth={1}
            strokeOpacity={0.48}
            d="M2 34 L16 14 L30 34 V46 H2z"
          />
          <path
            fill="currentColor"
            fillOpacity={0.38}
            stroke="none"
            d="M2 34 L16 14 L30 34"
          />
          <rect
            x={20}
            y={14}
            width={4}
            height={8}
            rx={0.5}
            fill="currentColor"
            fillOpacity={0.32}
            stroke="currentColor"
            strokeWidth={0.85}
            strokeOpacity={0.45}
          />
          <rect
            x={11}
            y={36}
            width={6}
            height={10}
            rx={0.5}
            fill="none"
            strokeWidth={1}
            strokeOpacity={0.52}
          />
        </g>

        <g
          transform="translate(252, 102)"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            fill="currentColor"
            fillOpacity={0.14}
            strokeWidth={1}
            strokeOpacity={0.4}
            d="M6 62 L26 38 L42 50 L58 24 L74 46 L88 30 L104 52 L118 34 L132 58 H6z"
          />
          <path
            fill="none"
            strokeWidth={1.1}
            strokeOpacity={0.5}
            d="M6 62 L26 38 L42 50 L58 24 L74 46 L88 30 L104 52 L118 34 L132 58"
          />
        </g>
      </svg>
    </>
  );
}
