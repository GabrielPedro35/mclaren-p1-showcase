"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";

let instance: Lenis | null = null;

export function getLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (instance) return instance;

  instance = new Lenis({
    autoRaf: true,
    smoothWheel: true,
    wheelMultiplier: 0.55,
    touchMultiplier: 0.8,
    syncTouch: false,
    lerp: 0.075,
    duration: 1.6,
  });

  instance.on("virtual-scroll", (data) => {
    const event = data.event;
    if (!(event instanceof WheelEvent)) return;
    // Linux Firefox often reports line deltas (deltaMode 1), which feel dead.
    if (event.deltaMode === 1) {
      data.deltaY *= 16;
    }
  });

  return instance;
}

export function scrollToY(top: number, duration = 1.4) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(top, { duration });
    return;
  }
  window.scrollTo({ top, behavior: "smooth" });
}

export function scrollToId(id: string, offset = -120) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  scrollToY(top);
}

export function onLenisScroll(handler: () => void): () => void {
  const lenis = getLenis();
  if (lenis) {
    lenis.on("scroll", handler);
    return () => lenis.off("scroll", handler);
  }
  window.addEventListener("scroll", handler, { passive: true });
  return () => window.removeEventListener("scroll", handler);
}
