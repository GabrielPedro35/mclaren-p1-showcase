"use client";

import { useState } from "react";
import { scrollToId } from "@/lib/lenis";

interface FooterProps {
  exploded: boolean;
  onExplode: () => void;
  onBack: () => void;
}

function glowOn(e: React.MouseEvent<HTMLAnchorElement>) {
  e.currentTarget.style.color = "rgba(255,255,255,0.95)";
  e.currentTarget.style.textShadow = "0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.2)";
}
function glowOff(e: React.MouseEvent<HTMLAnchorElement>) {
  e.currentTarget.style.color = "rgba(255,255,255,0.5)";
  e.currentTarget.style.textShadow = "none";
}

const linkStyle: React.CSSProperties = {
  fontFamily: "var(--font-geist-sans)",
  fontSize: "13px",
  fontWeight: 300,
  letterSpacing: "0.07em",
  color: "rgba(255,255,255,0.5)",
  textDecoration: "none",
  cursor: "pointer",
  transition: "color 0.2s ease, text-shadow 0.2s ease",
};

export default function Footer({ exploded, onExplode, onBack }: FooterProps) {
  const [backHover, setBackHover] = useState(false);

  return (
    <footer
      style={{
        width: "100%",
        height: "55vh",
        background: "#0b0809",
        borderTop: "5px solid #970003",
        position: "relative",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gap: "20px",
        padding: "40px 30px 32px",
        gridTemplateRows: "1fr auto",
      }}
    >
      {/* red slide overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#970003",
          transform: exploded ? "translateX(0%)" : "translateX(-100%)",
          transition: "transform 0.9s cubic-bezier(0.76,0,0.24,1)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      {/* heritage text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "0 8%",
          zIndex: 11,
          pointerEvents: "none",
          opacity: exploded ? 1 : 0,
          transition: exploded ? "opacity 0.6s ease 0.6s" : "opacity 0.3s ease",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "18px",
            fontWeight: 300,
            lineHeight: 1.7,
            letterSpacing: "0.03em",
            color: "rgba(255,255,255,0.6)",
            textAlign: "left",
            maxWidth: "calc((100% - 16%) * 9 / 12)",
          }}
        >
          The P1 began as a promise. McLaren revealed the concept at the 2012 Paris Motor Show, chosen
          deliberately to mark the 20th anniversary of the McLaren F1, the car that redefined what a
          road car could be. Production started in October 2013, assembled entirely by hand in Woking,
          Surrey, 375 units, not one more, every car spoken for before the first was delivered. It
          arrived alongside the Ferrari LaFerrari and the Porsche 918 Spyder, three hybrid hypercars,
          three different philosophies, one era-defining moment. Journalists called them the Holy
          Trinity. Production ended in December 2015. The P1 was gone before most people had processed
          that it existed. That is exactly how McLaren intended it.
        </p>
      </div>

      {/* back button */}
      <button
        onClick={onBack}
        onMouseEnter={() => setBackHover(true)}
        onMouseLeave={() => setBackHover(false)}
        style={{
          position: "absolute",
          top: "20px",
          left: "30px",
          zIndex: 13,
          background: "transparent",
          border: `1px solid ${backHover ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)"}`,
          color: "#ffffff",
          fontFamily: "var(--font-geist-sans)",
          fontSize: "9px",
          fontWeight: 300,
          letterSpacing: "0.12em",
          padding: "4px 10px",
          cursor: "pointer",
          opacity: exploded ? 1 : 0,
          pointerEvents: exploded ? "auto" : "none",
          transition: "opacity 0.4s ease 0.6s, border-color 0.25s ease, box-shadow 0.25s ease",
          boxShadow: backHover
            ? "0 0 12px rgba(255,255,255,0.35), 0 0 24px rgba(255,255,255,0.15)"
            : "none",
        }}
      >
        BACK
      </button>

      
      {/* col 1 gap */}
      <div style={{ gridColumn: "1 / 2", position: "relative", zIndex: 1 }} />

      {/* cols 2-4: nav links */}
      <div
        style={{
          gridColumn: "2 / 5",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("engine");
          }}
          style={linkStyle}
          onMouseEnter={glowOn}
          onMouseLeave={glowOff}
        >
          Performance
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("design");
          }}
          style={linkStyle}
          onMouseEnter={glowOn}
          onMouseLeave={glowOff}
        >
          Design
        </a>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onExplode(); }}
          style={linkStyle}
          onMouseEnter={glowOn}
          onMouseLeave={glowOff}
        >
          Heritage
        </a>
      </div>

      {/* cols 5-7: legal */}
      <div
        style={{
          gridColumn: "5 / 8",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {["Privacy Policy", "Terms of Use", "Cookie Settings"].map((link) => (
          <a key={link} href="#" style={linkStyle} onMouseEnter={glowOn} onMouseLeave={glowOff}>
            {link}
          </a>
        ))}
      </div>

      {/* bottom copyright row */}
      <div
        style={{
          gridColumn: "1 / 13",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "end",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "12px",
            fontWeight: 300,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.05em",
          }}
        >
          2026 McLaren Automotive Limited. All rights reserved.
        </span>
      </div>
    </footer>
  );
}