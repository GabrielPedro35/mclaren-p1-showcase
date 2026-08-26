import Image from "next/image";

const stats = [
  { value: "3.8L", label: "Twin-Turbo V8" },
  { value: "720", label: "Horsepower" },
  { value: "2.8s", label: "0 - 60 mph" },
  { value: "205", label: "Top Speed mph" },
];

export default function PerformanceSection() {
  return (
    <section
      className="relative py-32 px-8 overflow-hidden"
      style={{ background: "#0b0809" }}
    >
      {/* Subtle top border */}
      <div
        className="absolute top-0 left-8 right-8"
        style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left: car image */}
        <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
          <Image
            src="/design info mclaren.png"
            alt="McLaren 720S performance"
            fill
            className="object-contain"
          />
        </div>

        {/* Right: text + stats */}
        <div>
          <p
            className="text-xs tracking-[0.4em] uppercase mb-6"
            style={{ color: "#00aeef" }}
          >
            Performance
          </p>

          <h2
            className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-none mb-8"
            style={{ fontFamily: "ASpaceBlack, var(--font-geist-sans)" }}
          >
            BORN TO
            <br />
            RACE
          </h2>

          <p
            className="text-base leading-relaxed max-w-md mb-12"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Every McLaren is engineered from a single principle: the relentless
            pursuit of performance. Carbon fibre construction, mid-mounted
            engines, and decades of Formula 1 technology distilled into
            something you can drive every day.
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-px" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            {stats.map((s) => (
              <div
                key={s.label}
                className="p-6"
                style={{ borderRight: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p
                  className="text-4xl font-black text-white mb-1"
                  style={{ fontFamily: "ASpaceBlack, var(--font-geist-sans)" }}
                >
                  {s.value}
                </p>
                <p
                  className="text-xs tracking-widest uppercase"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}