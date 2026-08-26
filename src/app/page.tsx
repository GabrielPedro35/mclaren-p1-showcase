"use client";

import { useRef, useState } from "react";
import HeroAnimation from "@/components/HeroAnimation";
import LogoSection from "@/components/logo-section";
import InformationSection from "@/components/InformationSection";
import SecondAnimation from "@/components/SecondAnimation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Home() {
  const { canvasRef, containerRef, heroOpacity, heroBlur, navState } =
    useScrollAnimation();

  const [exploded, setExploded] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  function handleHeritageNav() {
    setExploded(true);
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main
      className="text-white"
      style={{ background: "#0b0809", fontFamily: "var(--font-geist-sans), sans-serif" }}
    >
      <HeroAnimation
        heroOpacity={heroOpacity}
        heroBlur={heroBlur}
        containerRef={containerRef}
        canvasRef={canvasRef}
      />

      <LogoSection />

      <InformationSection />

      <SecondAnimation
        exploded={exploded}
        onExplode={() => setExploded(true)}
        onBack={() => setExploded(false)}
        footerRef={footerRef}
      />
    </main>
  );
}