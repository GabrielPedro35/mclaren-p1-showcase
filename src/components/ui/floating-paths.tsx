export function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.08,
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
          <path
            key={path.id}
            d={path.d}
            stroke="white"
            strokeWidth={path.width}
            strokeOpacity={0.12 + path.id * 0.02}
            pathLength={1}
            style={{
              strokeDasharray: 1,
              animation: `mclaren-path ${18 + path.id * 1.2}s linear infinite`,
              animationDelay: `${path.id * 0.15}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
