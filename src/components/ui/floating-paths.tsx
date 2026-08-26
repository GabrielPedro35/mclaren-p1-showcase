"use client";

import { motion } from "framer-motion";

export function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.04,
  }));

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "50%",
        height: "100%",
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <svg
        style={{ width: "100%", height: "100%" }}
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMinYMid meet"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="white"
            strokeWidth={path.width}
            strokeOpacity={0.08 + path.id * 0.012}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0.2, 1, 0.2],
              opacity: [0.4, 0.8, 0.4],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 25 + path.id * 0.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: path.id * 0.1,
            }}
          />
        ))}
      </svg>
    </div>
  );
}