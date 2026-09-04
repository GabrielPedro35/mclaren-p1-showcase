"use client";

import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";
import {
  FRAME_SCROLL_HEIGHT_2,
  TOTAL_FRAMES_2,
  getCachedFrame,
  preloadFrames,
} from "@/lib/frames";

export default function SecondAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const currentFrameRef = useRef(0);
  const rafRef = useRef(0);
  const lastBlur = useRef(0);
  const lastFooterY = useRef(100);
  const lastTextOpacity = useRef(0);
  const lastFooterBlur = useRef(16);
  const lastFooterOpacity = useRef(0);

  const [blur, setBlur] = useState(0);
  const [footerY, setFooterY] = useState(100);
  const [textOpacity, setTextOpacity] = useState(0);
  const [exploded, setExploded] = useState(false);
  const [footerBlur, setFooterBlur] = useState(16);
  const [footerOpacity, setFooterOpacity] = useState(0);

  useEffect(() => {
    function onHeritageClick() {
      const container = containerRef.current;
      if (container) {
        const top = container.offsetTop + container.offsetHeight - window.innerHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
      setTimeout(() => setExploded(true), 800);
    }
    window.addEventListener("heritage-click", onHeritageClick);
    return () => window.removeEventListener("heritage-click", onHeritageClick);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const context = ctx;

    function sizeCanvas() {
      if (!canvas) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;
    }

    function drawFrame(index: number) {
      const img = getCachedFrame(2, index);
      if (!img || !canvas) return;
      sizeCanvas();
      const scale = Math.max(
        canvas.width / img.naturalWidth,
        canvas.height / img.naturalHeight
      );
      const x = (canvas.width - img.naturalWidth * scale) / 2;
      const y = (canvas.height - img.naturalHeight * scale) / 2;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
    }

    function tick() {
      rafRef.current = 0;
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / FRAME_SCROLL_HEIGHT_2));
      const frameIndex = Math.round(progress * (TOTAL_FRAMES_2 - 1));
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex);
      }

      const endProgress = Math.max(0, Math.min(1, (progress - 0.85) / 0.15));
      const eased = endProgress * endProgress;
      const nextBlur = eased * 8;
      const nextFooterY = (1 - endProgress) * 100;
      const nextFooterBlur = (1 - endProgress) * 16;
      const nextFooterOpacity = endProgress;
      const textProgress = Math.max(0, Math.min(1, (progress - 0.9) / 0.1));

      if (Math.abs(nextBlur - lastBlur.current) > 0.2) {
        lastBlur.current = nextBlur;
        setBlur(nextBlur);
      }
      if (Math.abs(nextFooterY - lastFooterY.current) > 0.4) {
        lastFooterY.current = nextFooterY;
        setFooterY(nextFooterY);
      }
      if (Math.abs(textProgress - lastTextOpacity.current) > 0.02) {
        lastTextOpacity.current = textProgress;
        setTextOpacity(textProgress);
      }
      if (Math.abs(nextFooterBlur - lastFooterBlur.current) > 0.3) {
        lastFooterBlur.current = nextFooterBlur;
        setFooterBlur(nextFooterBlur);
      }
      if (Math.abs(nextFooterOpacity - lastFooterOpacity.current) > 0.02) {
        lastFooterOpacity.current = nextFooterOpacity;
        setFooterOpacity(nextFooterOpacity);
      }
    }

    function onScroll() {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(tick);
    }

    function onResize() {
      drawFrame(currentFrameRef.current);
    }

    preloadFrames(1).then(() => {
      preloadFrames(2, (loaded) => {
        if (currentFrameRef.current < loaded) drawFrame(currentFrameRef.current);
      }).then(() => drawFrame(currentFrameRef.current));
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const canvasBlur = exploded ? blur + 20 : blur;

  return (
    <div
      ref={containerRef}
      data-anim="second"
      style={{ height: `calc(${FRAME_SCROLL_HEIGHT_2}px + 100vh)` }}
      className="relative"
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ background: "#0b0809" }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{
            display: "block",
            filter: `blur(${canvasBlur}px)`,
            transition: exploded ? "filter 0.8s ease" : "filter 0.3s ease-out",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "55vh",
            left: 0,
            right: 0,
            transform: `translateY(${footerY}%)`,
            transition: "transform 0.05s linear",
            zIndex: 2,
            pointerEvents: "none",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            height: "45vh",
            opacity: textOpacity,
          }}
        >
          <span
            style={{
              position: "absolute",
              fontFamily: "ASpaceBlack, sans-serif",
              fontSize: "13.5vw",
              fontWeight: 900,
              color: "#970003",
              letterSpacing: "0.04em",
              lineHeight: 1,
              userSelect: "none",
              whiteSpace: "nowrap",
              opacity: exploded ? 0 : 1,
              filter: exploded ? "blur(20px)" : "blur(0px)",
              transition: "opacity 0.6s ease, filter 0.6s ease",
            }}
          >
            MCLAREN
          </span>

          <span
            style={{
              position: "absolute",
              fontFamily: "ASpaceBlack, sans-serif",
              fontSize: "13.5vw",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "0.04em",
              lineHeight: 1,
              userSelect: "none",
              whiteSpace: "nowrap",
              opacity: exploded ? 1 : 0,
              filter: exploded ? "blur(0px)" : "blur(20px)",
              transition: exploded
                ? "opacity 0.6s ease 0.4s, filter 0.6s ease 0.4s"
                : "opacity 0.4s ease, filter 0.4s ease",
            }}
          >
            HERITAGE
          </span>
        </div>

        <div
          ref={footerRef}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            transform: `translateY(${footerY}%)`,
            transition: "transform 0.05s linear",
            filter: `blur(${footerBlur}px)`,
            opacity: footerOpacity,
          }}
        >
          <Footer
            exploded={exploded}
            onExplode={() => setExploded(true)}
            onBack={() => setExploded(false)}
          />
        </div>
      </div>
    </div>
  );
}
