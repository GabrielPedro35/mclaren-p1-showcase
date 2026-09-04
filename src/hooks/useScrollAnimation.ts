"use client";

import { useEffect, useRef, useState } from "react";
import {
  FRAME_SCROLL_HEIGHT_1,
  TOTAL_FRAMES_1,
  getCachedFrame,
  preloadFrames,
} from "@/lib/frames";

export function useScrollAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentFrameRef = useRef(0);
  const lastOpacity = useRef(1);
  const lastBlur = useRef(0);
  const rafRef = useRef(0);

  const [heroOpacity, setHeroOpacity] = useState(1);
  const [heroBlur, setHeroBlur] = useState(0);

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
      const img = getCachedFrame(1, index);
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

      const currentY = window.scrollY;
      const fadeProgress = Math.min(1, currentY / 400);
      const nextOpacity = 1 - fadeProgress;
      const nextBlur = fadeProgress * 20;
      if (Math.abs(nextOpacity - lastOpacity.current) > 0.01) {
        lastOpacity.current = nextOpacity;
        setHeroOpacity(nextOpacity);
      }
      if (Math.abs(nextBlur - lastBlur.current) > 0.3) {
        lastBlur.current = nextBlur;
        setHeroBlur(nextBlur);
      }

      const rect = container.getBoundingClientRect();
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / FRAME_SCROLL_HEIGHT_1));
      const frameIndex = Math.round(progress * (TOTAL_FRAMES_1 - 1));
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex);
      }
    }

    function onScroll() {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(tick);
    }

    function onResize() {
      drawFrame(currentFrameRef.current);
    }

    preloadFrames(1).then(() => drawFrame(0));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { canvasRef, containerRef, heroOpacity, heroBlur };
}
