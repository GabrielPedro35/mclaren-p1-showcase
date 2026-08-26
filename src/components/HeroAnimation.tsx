"use client";

import { useRef } from "react";

const TOTAL_FRAMES = 191;
const FRAME_SCROLL_HEIGHT = 6000;

function getFrameSrc(index: number): string {
  const padded = String(index).padStart(4, "0");
  return `/frames/frame_${padded}.png`;
}

interface HeroAnimationProps {
  heroOpacity: number;
  heroBlur: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function HeroAnimation({
  heroOpacity,
  heroBlur,
  containerRef,
  canvasRef,
}: HeroAnimationProps) {
  return (
    <div
      ref={containerRef}
      data-anim="hero"
      style={{ height: `calc(${FRAME_SCROLL_HEIGHT}px + 100vh)` }}
      className="relative"
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ background: "#0b0809" }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: "block" }}
        />
        <div
          className="absolute top-32 left-0 right-0 flex flex-col items-center pointer-events-none"
          style={{
            opacity: heroOpacity,
            filter: `blur(${heroBlur}px)`,
            transition: "opacity 0.05s linear, filter 0.05s linear",
          }}
        >
          <h1
            className="text-[clamp(3rem,10vw,9rem)] font-black leading-none tracking-tight text-white text-center"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            MCLAREN
          </h1>
          <p
            className="mt-3 text-[clamp(0.7rem,1.5vw,1rem)] tracking-[0.5em] uppercase"
            style={{
              color: "rgba(255,255,255,0.55)",
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            Pure. Lightweight. Exhilarating.
          </p>
        </div>
      </div>
    </div>
  );
}

export { getFrameSrc, TOTAL_FRAMES, FRAME_SCROLL_HEIGHT };