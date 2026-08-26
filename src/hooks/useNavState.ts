"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

export type NavState = "solid" | "hidden" | "frosted";

export function useNavState() {
  const [navState, setNavState] = useState<NavState>("solid");
  const lastScrollY = useRef(0);

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

    function onScroll() {
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
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return { navState };
}
