"use client";

import { FloatingPaths } from "@/components/ui/floating-paths";

interface FooterProps {
  exploded: boolean;
  onExplode: () => void;
  onBack: () => void;
}

export default function Footer({ exploded, onExplode, onBack }: FooterProps) {
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
          transition: exploded
            ? "opacity 0.6s ease 0.6s"
            : "opacity 0.3s ease",
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
        style={{
          position: "absolute",
          top: "24px",
          left: "30px",
          zIndex: 13,
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.5)",
          color: "#ffffff",
          fontFamily: "var(--font-geist-sans)",
          fontSize: "10px",
          fontWeight: 300,
          letterSpacing: "0.1em",
          padding: "5px 12px",
          cursor: "pointer",
          opacity: exploded ? 1 : 0,
          pointerEvents: exploded ? "auto" : "none",
          transition: "opacity 0.4s ease 0.6s",
        }}
      >
        BACK
      </button>

      {/* floating paths background */}
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />

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
        {["P1", "Performance", "Design"].map((link) => (
          <a
            key={link}
            href="#"
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "13px",
              fontWeight: 300,
              letterSpacing: "0.07em",
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
            }}
          >
            {link}
          </a>
        ))}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onExplode(); }}
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "13px",
            fontWeight: 300,
            letterSpacing: "0.07em",
            color: "rgba(255,255,255,0.5)",
            textDecoration: "none",
            cursor: "pointer",
          }}
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
          <a
            key={link}
            href="#"
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "13px",
              fontWeight: 300,
              letterSpacing: "0.07em",
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
            }}
          >
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