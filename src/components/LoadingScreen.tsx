"use client";

import { useEffect, useState } from "react";

const TOTAL_FRAMES_1 = 191;
const TOTAL_FRAMES_2 = 188;
const TOTAL = TOTAL_FRAMES_1 + TOTAL_FRAMES_2;
const SEGMENTS = 10;

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let loaded = 0;

    function onLoad() {
      loaded++;
      setProgress(Math.round((loaded / TOTAL) * 100));
      if (loaded >= TOTAL) {
        setTimeout(() => setDone(true), 300);
        setTimeout(() => setHidden(true), 1200);
      }
    }

    for (let i = 1; i <= TOTAL_FRAMES_1; i++) {
      const img = new window.Image();
      img.src = `/frames/frame_${String(i).padStart(5, "0")}.jpg`;
      img.onload = onLoad;
      img.onerror = onLoad;
    }

    for (let i = 1; i <= TOTAL_FRAMES_2; i++) {
      const img = new window.Image();
      img.src = `/frames2/frame_${String(i).padStart(5, "0")}.jpg`;
      img.onload = onLoad;
      img.onerror = onLoad;
    }
  }, []);

  if (hidden) return null;

  const litCount = Math.floor((progress / 100) * SEGMENTS);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0b0809",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: done ? 0 : 1,
        transition: "opacity 0.9s ease",
        pointerEvents: done ? "none" : "all",
      }}
    >
      <div style={{ width: "min(600px, 85vw)", display: "flex", flexDirection: "column", gap: "0" }}>

        {/* numbers row */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", paddingLeft: "2px", paddingRight: "2px" }}>
          {Array.from({ length: SEGMENTS + 1 }, (_, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "13px",
                fontWeight: 300,
                letterSpacing: "0.05em",
                color: i <= litCount ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
                transition: "color 1.2s cubic-bezier(0.4,0,0.2,1)",
                width: "20px",
                textAlign: "center",
              }}
            >
              {i}
            </span>
          ))}
        </div>

        {/* tick marks row */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", paddingLeft: "2px", paddingRight: "2px" }}>
          {Array.from({ length: SEGMENTS + 1 }, (_, i) => (
            <div
              key={i}
              style={{
                width: "2px",
                height: i % 5 === 0 ? "12px" : "7px",
                background: i <= litCount ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
                borderRadius: "1px",
                transition: "background 1.2s cubic-bezier(0.4,0,0.2,1)",
              }}
            />
          ))}
        </div>

        {/* continuous bar */}
        <div
          style={{
            width: "100%",
            height: "8px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "2px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(to right, #970003, #c83000)",
              boxShadow: "0 0 10px rgba(151,0,3,0.7)",
              borderRadius: "2px",
              transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        </div>

        {/* bottom row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "20px" }}>
          <span
            style={{
              fontFamily: "ASpaceBlack, sans-serif",
              fontSize: "clamp(18px, 2.5vw, 28px)",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "0.15em",
              userSelect: "none",
            }}
          >
            MCLAREN
          </span>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
            <span
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "28px",
                fontWeight: 300,
                color: "#ffffff",
                letterSpacing: "0.1em",
                lineHeight: 1,
              }}
            >
              {String(Math.round((progress / 100) * 350)).padStart(3, "0")}
            </span>
            <span
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "10px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.2em",
              }}
            >
              KPH
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}