"use client";

import Navbar from "@/components/Navbar";
import { useNavState } from "@/hooks/useNavState";

export default function NavbarWrapper() {
  const { navState } = useNavState();

  function handleHeritage() {
    window.dispatchEvent(new CustomEvent("heritage-click"));
  }

  return <Navbar navState={navState} onHeritage={handleHeritage} />;
}