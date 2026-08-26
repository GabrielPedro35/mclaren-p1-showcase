"use client";

import Image from "next/image";

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

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center px-10 h-10"
      style={navStyles}
    >
      <div className="flex items-center" style={{ width: "200px" }}>
        <Image
          src="/mclaren logo.png"
          alt="McLaren"
          width={90}
          height={24}
          className="object-contain"
          priority
        />
      </div>

      <div className="flex-1 flex items-center justify-center gap-14">
        {["P1", "PERFORMANCE", "DESIGN"].map((link) => (
          <a
            key={link}
            href="#"
            className="text-[11px] tracking-[0.25em] font-medium transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.72)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.72)")
            }
          >
            {link}
          </a>
        ))}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onHeritage?.(); }}
          className="text-[11px] tracking-[0.25em] font-medium transition-colors duration-200"
          style={{ color: "rgba(255,255,255,0.72)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.72)")
          }
        >
          HERITAGE
        </a>
      </div>

      <div style={{ width: "200px" }} />
    </nav>
  );
}