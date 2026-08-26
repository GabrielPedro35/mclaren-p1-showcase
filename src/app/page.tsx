"use client";

import Navbar from "@/components/Navbar";
import HeroAnimation from "@/components/HeroAnimation";
import LogoSection from "@/components/logo-section";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Home() {
  const { canvasRef, containerRef, heroOpacity, heroBlur, navState } =
    useScrollAnimation();

  return (
    <main
      className="text-white"
      style={{ background: "#0b0809", fontFamily: "var(--font-geist-sans), sans-serif" }}
    >
      <Navbar navState={navState} />

      <HeroAnimation
        heroOpacity={heroOpacity}
        heroBlur={heroBlur}
        containerRef={containerRef}
        canvasRef={canvasRef}
      />

      <LogoSection />

      <section
        className="relative w-full"
        style={{ background: "#0b0809", minHeight: "600px" }}
      />
    </main>
  );
}