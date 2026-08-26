"use client";

import Navbar from "@/components/Navbar";
import HeroAnimation from "@/components/HeroAnimation";
import LogoSection from "@/components/logo-section";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Gabriel() {
  const { canvasRef, containerRef, heroOpacity, heroBlur, navState } =
    useScrollAnimation();

  return (
    <main
      className="text-white"
      style={{ background: "#0b0809", fontFamily: "var(--font-geist-sans), sans-serif" }}
    >
      <h1>gabriel</h1>
    </main>
  );
}