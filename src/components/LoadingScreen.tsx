"use client";

import { useEffect, useState } from "react";
import { preloadFrames } from "@/lib/frames";

const SEGMENTS = 10;

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let cancelled = false;

    preloadFrames(1, (loaded, total) => {
      if (cancelled) return;
      setProgress(Math.round((loaded / total) * 100));
    }).then(() => {
      if (cancelled) return;
      setTimeout(() => setDone(true), 300);
      setTimeout(() => {
        setHidden(true);
        preloadFrames(2);
      }, 1200);
    });

    return () => {
      cancelled = true;
    };
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
      <div className="loading-gauge" style={{ width: "min(600px, 85vw)", display: "flex", flexDirection: "column" }}>
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
