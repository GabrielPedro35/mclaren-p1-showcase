"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useNavState } from "@/hooks/useNavState";
import { getScroller } from "@/lib/smooth-scroll";

export default function NavbarWrapper() {
  const { navState } = useNavState();

  useEffect(() => {
    getScroller();
  }, []);

  function handleHeritage() {
    window.dispatchEvent(new CustomEvent("heritage-click"));
  }

  return <Navbar navState={navState} onHeritage={handleHeritage} />;
}
