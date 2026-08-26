import Image from "next/image";

export default function InformationSection() {
  return (
    <section
      className="relative w-full"
      style={{
        background: "#0b0809",
        minHeight: "170.5vw",
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gap: "20px",
        padding: "120px 30px",
        alignContent: "start",
      }}
    >
      {/* col 1: gap */}
      <div style={{ gridColumn: "1 / 2" }} />

      {/* cols 2-13: DESIGN title + body text */}
      <div style={{ gridColumn: "2 / 13", display: "flex", flexDirection: "column", gap: "32px" }}>
        <h2
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "175px",
            fontWeight: 300,
            lineHeight: 1,
            letterSpacing: "0.03em",
            color: "#ffffff",
          }}
        >
          DESIGN
        </h2>

        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "16px",
            fontWeight: 300,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)",
            maxWidth: "640px",
          }}
        >
          The McLaren P1 is not styled, it is solved. Every surface exists because aerodynamics
          demanded it. The MonoCage carbon chassis integrates the roof as a structural air intake,
          feeding a twin-turbocharged V8 directly. Dihedral doors sweep upward. Flying buttresses
          sculpt airflow to an active rear wing that generates over 600 kg of downforce at 160 mph,
          five times what its predecessor could produce. One button flattens that wing and cuts drag by
          23%, borrowed straight from Formula 1. 903 horsepower. 1,395 kg. 0 to 100 km/h in under 2.8
          seconds. Only 375 were ever built, and every single one was sold before the first was
          delivered.
        </p>
      </div>

      {/* col 1: gap */}
      <div style={{ gridColumn: "1 / 2" }} />

      {/* cols 1.3-11: engine image, starts 0.3 into col 1 */}
      <div style={{ gridColumn: "1 / 12", marginTop: "80px", paddingLeft: "calc((100% - 60px - 11 * 20px) / 12 * 0.3)" }}>
        <Image
          src="/engine img.png"
          alt="McLaren P1 Engine"
          width={1200}
          height={800}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </div>

      {/* col 1: gap */}
      <div style={{ gridColumn: "1 / 2" }} />

      {/* cols 2-11: Engine title + line */}
      <div style={{ gridColumn: "2 / 12", marginTop: "48px", display: "flex", alignItems: "center", gap: "32px" }}>
        <h2
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "70px",
            fontWeight: 300,
            lineHeight: 1,
            letterSpacing: "0.03em",
            color: "#ffffff",
            flexShrink: 0,
          }}
        >
          ENGINE
        </h2>
        <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.4)" }} />
      </div>

      {/* col 1: gap */}
      <div style={{ gridColumn: "1 / 2" }} />

      {/* cols 2-8: Engine body text */}
      <div style={{ gridColumn: "2 / 12", marginTop: "80px" }}>
        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "18px",
            fontWeight: 300,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          A 3.8-litre twin-turbocharged V8, designated M838TQ, producing 727 bhp at 7,500 rpm. Paired
          with a 7-speed Seamless Shift Gearbox and rear-wheel drive, it delivers 720 Nm of torque with
          the mechanical ferocity you expect from a car built on racing DNA.
        </p>
        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "18px",
            fontWeight: 300,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)",
            marginTop: "32px",
          }}
        >
          0 to 100 km/h in under 2.8 seconds. 0 to 200 km/h in under 6.8 seconds. 0 to 300 km/h in under 16.5 seconds. Top speed governed at 350 km/h, not because the car could not go faster, but because the tires could not. It lapped the Nürburgring in 6 minutes and 47 seconds during development.
        </p>
      </div>

      {/* col 1: gap */}
      <div style={{ gridColumn: "1 / 2" }} />

      {/* cols 2-12: HYBRID SYSTEM title + line */}
      <div style={{ gridColumn: "2 / 12", marginTop: "200px", display: "flex", alignItems: "center", gap: "32px" }}>
        <h2
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "70px",
            fontWeight: 300,
            lineHeight: 1,
            letterSpacing: "0.03em",
            color: "#ffffff",
            flexShrink: 0,
          }}
        >
          HYBRID SYSTEM
        </h2>
        <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.4)" }} />
      </div>
    </section>
  );
}