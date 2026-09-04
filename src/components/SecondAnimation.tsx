"use client";

import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";
import {
  FRAME_SCROLL_HEIGHT_2,
  TOTAL_FRAMES_2,
  getCachedFrame,
  preloadFrames,
} from "@/lib/frames";
import { onLenisScroll, scrollToY } from "@/lib/lenis";

export default function SecondAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const currentFrameRef = useRef(0);
  const rafRef = useRef(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    function onHeritageClick() {
      const container = containerRef.current;
      if (container) {
        const top = container.offsetTop + container.offsetHeight - window.innerHeight;
        scrollToY(top, 1.6);
      }
      setTimeout(() => setExploded(true), 900);
    }
    window.addEventListener("heritage-click", onHeritageClick);
    return () => window.removeEventListener("heritage-click", onHeritageClick);
  }, []);

  useEffect(() => {
    const canvasNode = canvasRef.current;
    if (!canvasNode) return;
    const maybeCtx = canvasNode.getContext("2d");
    if (!maybeCtx) return;
    const context: CanvasRenderingContext2D = maybeCtx;
    const canvas: HTMLCanvasElement = canvasNode;

    function sizeCanvas() {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;
    }

    function drawFrame(index: number) {
      const img = getCachedFrame(2, index);
      if (!img) return;
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
      const footerY = (1 - endProgress) * 100;
      const textProgress = Math.max(0, Math.min(1, (progress - 0.9) / 0.1));

      const footerEl = footerRef.current;
      if (footerEl) {
        footerEl.style.transform = `translate3d(0, ${footerY}%, 0)`;
        footerEl.style.opacity = String(endProgress);
      }
      const titleEl = titleRef.current;
      if (titleEl) {
        titleEl.style.transform = `translate3d(0, ${footerY}%, 0)`;
        titleEl.style.opacity = String(textProgress);
      }
      const overlayEl = overlayRef.current;
      if (overlayEl) {
        overlayEl.style.opacity = String(endProgress * 0.55);
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
    const stopScroll = onLenisScroll(onScroll);
    window.addEventListener("resize", onResize);

    return () => {
      stopScroll();
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

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
          style={{ display: "block" }}
        />
        <div
          ref={overlayRef}
          style={{
            position: "absolute",
            inset: 0,
            background: exploded ? "rgba(11,8,9,0.72)" : "rgba(11,8,9,0.55)",
            opacity: 0,
            pointerEvents: "none",
            transition: exploded ? "background 0.8s ease" : "background 0.3s ease-out",
          }}
        />

        <div
          ref={titleRef}
          style={{
            position: "absolute",
            bottom: "55vh",
            left: 0,
            right: 0,
            transform: "translate3d(0, 100%, 0)",
            zIndex: 2,
            pointerEvents: "none",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            height: "45vh",
            opacity: 0,
            willChange: "transform, opacity",
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
            transform: "translate3d(0, 100%, 0)",
            opacity: 0,
            willChange: "transform, opacity",
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
