"use client";

import { useEffect, useRef, useState } from "react";
import { onLenisScroll } from "@/lib/lenis";

export type NavState = "solid" | "hidden" | "frosted";

export function useNavState() {
  const [navState, setNavState] = useState<NavState>("solid");
  const lastScrollY = useRef(0);

  useEffect(() => {
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

    return onLenisScroll(onScroll);
  }, []);

  return { navState };
}
