"use client";

import { useEffect, useState } from "react";
import {
  FRAME_SCROLL_HEIGHT_1,
  FRAME_SCROLL_HEIGHT_2,
  TOTAL_FRAMES_1,
  TOTAL_FRAMES_2,
} from "@/lib/frames";

export default function FrameDebugger() {
  const [frame1, setFrame1] = useState(0);
  const [frame2, setFrame2] = useState(0);
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [active, setActive] = useState<"hero" | "second" | "none">("none");

  useEffect(() => {
    function onScroll() {
      const heroContainer = document.querySelector("[data-anim='hero']") as HTMLElement | null;
      const secondContainer = document.querySelector("[data-anim='second']") as HTMLElement | null;

      if (heroContainer) {
        const rect = heroContainer.getBoundingClientRect();
        const scrolled = -rect.top;
        const p = Math.max(0, Math.min(1, scrolled / FRAME_SCROLL_HEIGHT_1));
        setProgress1(Math.round(p * 100));
        setFrame1(Math.round(p * (TOTAL_FRAMES_1 - 1)) + 1);
        if (p > 0 && p < 1) setActive("hero");
      }

      if (secondContainer) {
        const rect = secondContainer.getBoundingClientRect();
        const scrolled = -rect.top;
        const p = Math.max(0, Math.min(1, scrolled / FRAME_SCROLL_HEIGHT_2));
        setProgress2(Math.round(p * 100));
        setFrame2(Math.round(p * (TOTAL_FRAMES_2 - 1)) + 1);
        if (p > 0 && p < 1) setActive("second");
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "8px",
        padding: "8px 20px",
        display: "flex",
        gap: "32px",
        alignItems: "center",
        fontFamily: "var(--font-geist-sans)",
        fontSize: "11px",
        letterSpacing: "0.08em",
        color: "rgba(255,255,255,0.6)",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      <span style={{ color: active === "hero" ? "#00aeef" : "rgba(255,255,255,0.3)" }}>
        CLIP 1
      </span>
      <span style={{ color: active === "hero" ? "#ffffff" : "rgba(255,255,255,0.4)" }}>
        {String(frame1).padStart(4, "0")} / {TOTAL_FRAMES_1}
      </span>
      <span
        style={{
          width: "80px",
          height: "2px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "2px",
          position: "relative",
          display: "inline-block",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${progress1}%`,
            background: "#00aeef",
            borderRadius: "2px",
          }}
        />
      </span>
      <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
      <span style={{ color: active === "second" ? "#970003" : "rgba(255,255,255,0.3)" }}>
        CLIP 2
      </span>
      <span style={{ color: active === "second" ? "#ffffff" : "rgba(255,255,255,0.4)" }}>
        {String(frame2).padStart(4, "0")} / {TOTAL_FRAMES_2}
      </span>
      <span
        style={{
          width: "80px",
          height: "2px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "2px",
          position: "relative",
          display: "inline-block",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${progress2}%`,
            background: "#970003",
            borderRadius: "2px",
          }}
        />
      </span>
    </div>
  );
}
