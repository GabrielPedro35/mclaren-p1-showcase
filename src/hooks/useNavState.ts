"use client";

import { useEffect, useRef, useState } from "react";
import { onScroll } from "@/lib/smooth-scroll";

export type NavState = "solid" | "hidden" | "frosted";

export function useNavState() {
  const [navState, setNavState] = useState<NavState>("solid");
  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
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

    return onScroll(handleScroll);
  }, []);

  return { navState };
}
