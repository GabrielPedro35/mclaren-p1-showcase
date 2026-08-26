"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { getFrameSrc, TOTAL_FRAMES, FRAME_SCROLL_HEIGHT } from "@/components/HeroAnimation";

export type NavState = "solid" | "hidden" | "frosted";

export function useScrollAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const lastScrollY = useRef(0);

  const [heroOpacity, setHeroOpacity] = useState(1);
  const [heroBlur, setHeroBlur] = useState(0);
  const [navState, setNavState] = useState<NavState>("solid");

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function drawFrame(index: number) {
      const img = imagesRef.current[index];
      if (!img || !img.complete) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const scale = Math.max(
        canvas.width / img.naturalWidth,
        canvas.height / img.naturalHeight
      );
      const x = (canvas.width - img.naturalWidth * scale) / 2;
      const y = (canvas.height - img.naturalHeight * scale) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
    }

    function onScroll() {
      const container = containerRef.current;
      if (!container) return;

      const currentY = window.scrollY;
      const prev = lastScrollY.current;

      if (currentY <= 10) {
        setNavState("solid");
      } else if (currentY > prev) {
        setNavState("hidden");
      } else {
        setNavState("frosted");
      }
      lastScrollY.current = currentY;

      const fadeProgress = Math.min(1, currentY / 400);
      setHeroOpacity(1 - fadeProgress);
      setHeroBlur(fadeProgress * 20);

      const rect = container.getBoundingClientRect();
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / FRAME_SCROLL_HEIGHT));
      const frameIndex = Math.round(progress * (TOTAL_FRAMES - 1));
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex);
      }
    }

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = getFrameSrc(i + 1);
      img.onload = () => {
        if (i === 0) drawFrame(0);
      };
      imagesRef.current[i] = img;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => drawFrame(currentFrameRef.current));

    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return { canvasRef, containerRef, heroOpacity, heroBlur, navState };
}