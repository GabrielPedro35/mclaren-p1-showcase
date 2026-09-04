"use client";

import Image from "next/image";
import { scrollToId, scrollToY } from "@/lib/lenis";

type NavState = "solid" | "hidden" | "frosted";

interface NavbarProps {
  navState: NavState;
  onHeritage?: () => void;
}

export default function Navbar({ navState, onHeritage }: NavbarProps) {
  const navStyles: React.CSSProperties = {
    transition:
      "background 0.4s ease, backdrop-filter 0.4s ease, transform 0.4s ease, border-color 0.4s ease",
    ...(navState === "solid" && {
      background: "#0b0809",
      backdropFilter: "none",
      borderBottom: "1px solid rgba(0,174,239,0.4)",
      transform: "translateY(0)",
    }),
    ...(navState === "hidden" && {
      background: "transparent",
      backdropFilter: "none",
      borderBottom: "1px solid transparent",
      transform: "translateY(-100%)",
    }),
    ...(navState === "frosted" && {
      background: "rgba(11,8,9,0.35)",
      backdropFilter: "blur(18px) saturate(1.4)",
      borderBottom: "1px solid rgba(0,174,239,0.25)",
      transform: "translateY(0)",
    }),
  };

  const linkStyle: React.CSSProperties = {
    color: "rgba(255,255,255,0.72)",
    transition: "color 0.2s ease, text-shadow 0.2s ease",
  };

  function onHover(e: React.MouseEvent<HTMLAnchorElement>) {
    e.currentTarget.style.color = "#fff";
    e.currentTarget.style.textShadow =
      "0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.2)";
  }

  function onLeave(e: React.MouseEvent<HTMLAnchorElement>) {
    e.currentTarget.style.color = "rgba(255,255,255,0.72)";
    e.currentTarget.style.textShadow = "none";
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center px-10 h-10"
      style={navStyles}
    >
      <div
        className="flex items-center"
        style={{ width: "200px", cursor: "pointer" }}
        onClick={() => scrollToY(0)}
      >
        <Image
          src="/mclaren logo.png"
          alt="McLaren"
          width={90}
          height={24}
          className="object-contain"
          style={{ filter: "brightness(0) invert(1)" }}
          priority
        />
      </div>

      <div className="flex-1 flex items-center justify-center gap-14">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("engine");
          }}
          className="text-[11px] tracking-[0.25em] font-medium"
          style={linkStyle}
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
        >
          PERFORMANCE
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("design");
          }}
          className="text-[11px] tracking-[0.25em] font-medium"
          style={linkStyle}
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
        >
          DESIGN
        </a>

        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onHeritage?.(); }}
          className="text-[11px] tracking-[0.25em] font-medium"
          style={linkStyle}
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
        >
          HERITAGE
        </a>
      </div>

      <div style={{ width: "200px" }} />
    </nav>
  );
}