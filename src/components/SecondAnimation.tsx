"use client";

import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";

const TOTAL_FRAMES_2 = 188;
const FRAME_SCROLL_HEIGHT_2 = 6000;

function getFrame2Src(index: number): string {
  const padded = String(index).padStart(5, "0");
  return `/frames2/frame_${padded}.jpg`;
}

export default function SecondAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const [blur, setBlur] = useState(0);
  const [footerY, setFooterY] = useState(100);
  const [textOpacity, setTextOpacity] = useState(0);
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    function onHeritageClick() {
      setExploded(true);
      footerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    window.addEventListener("heritage-click", onHeritageClick);
    return () => window.removeEventListener("heritage-click", onHeritageClick);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function drawFrame(index: number) {
      const img = imagesRef.current[index];
      if (!img || !img.complete) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const scale = Math.max(
        canvas.width / img.naturalWidth,
        canvas.height / img.naturalHeight
      );
      const x = (canvas.width - img.naturalWidth * scale) / 2;
      const y = (canvas.height - img.naturalHeight * scale) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
    }

    function onScroll() {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / FRAME_SCROLL_HEIGHT_2));
      const frameIndex = Math.round(progress * (TOTAL_FRAMES_2 - 1));
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex);
      }

      const endProgress = Math.max(0, Math.min(1, (progress - 0.85) / 0.15));
      const eased = endProgress * endProgress;
      setBlur(eased * 8);
      setFooterY((1 - endProgress) * 100);

      const textProgress = Math.max(0, Math.min(1, (progress - 0.9) / 0.1));
      setTextOpacity(textProgress);
    }

    for (let i = 0; i < TOTAL_FRAMES_2; i++) {
      const img = new window.Image();
      img.src = getFrame2Src(i + 1);
      img.onload = () => {
        if (i === 0) drawFrame(0);
      };
      imagesRef.current[i] = img;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => drawFrame(currentFrameRef.current));

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const canvasBlur = exploded ? blur + 20 : blur;

  return (
    <div
      ref={containerRef}
      style={{ height: `calc(${FRAME_SCROLL_HEIGHT_2}px + 100vh)` }}
      className="relative"
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ background: "#0b0809" }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{
            display: "block",
            filter: `blur(${canvasBlur}px)`,
            transition: exploded ? "filter 0.8s ease" : "filter 0.3s ease-out",
          }}
        />

        {/* MCLAREN / HERITAGE text above footer */}
        <div
          style={{
            position: "absolute",
            bottom: "55vh",
            left: 0,
            right: 0,
            transform: `translateY(${footerY}%)`,
            transition: "transform 0.05s linear",
            zIndex: 2,
            pointerEvents: "none",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            height: "45vh",
            opacity: textOpacity,
          }}
        >
          <span
            style={{
              position: "absolute",
              fontFamily: "ASpaceBlack, sans-serif",
              fontSize: "13.5vw",
              fontWeight: 900,
              color: "#970003",
              letterSpacing: "0.04em",
              lineHeight: 1,
              userSelect: "none",
              whiteSpace: "nowrap",
              opacity: exploded ? 0 : 1,
              filter: exploded ? "blur(20px)" : "blur(0px)",
              transition: "opacity 0.6s ease, filter 0.6s ease",
            }}
          >
            MCLAREN
          </span>

          <span
            style={{
              position: "absolute",
              fontFamily: "ASpaceBlack, sans-serif",
              fontSize: "13.5vw",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "0.04em",
              lineHeight: 1,
              userSelect: "none",
              whiteSpace: "nowrap",
              opacity: exploded ? 1 : 0,
              filter: exploded ? "blur(0px)" : "blur(20px)",
              transition: exploded
                ? "opacity 0.6s ease 0.4s, filter 0.6s ease 0.4s"
                : "opacity 0.4s ease, filter 0.4s ease",
            }}
          >
            HERITAGE
          </span>
        </div>

        {/* footer slides up from bottom */}
        <div
          ref={footerRef}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            transform: `translateY(${footerY}%)`,
            transition: "transform 0.05s linear",
          }}
        >
          <Footer
            exploded={exploded}
            onExplode={() => setExploded(true)}
            onBack={() => setExploded(false)}
          />
        </div>
      </div>
    </div>
  );
}