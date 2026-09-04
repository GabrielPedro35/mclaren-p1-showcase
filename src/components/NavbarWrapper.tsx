"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useNavState } from "@/hooks/useNavState";
import { getLenis } from "@/lib/lenis";

export default function NavbarWrapper() {
  const { navState } = useNavState();

  useEffect(() => {
    getLenis();
  }, []);

  function handleHeritage() {
    window.dispatchEvent(new CustomEvent("heritage-click"));
  }

  return <Navbar navState={navState} onHeritage={handleHeritage} />;
}
