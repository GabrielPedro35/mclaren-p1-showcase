import Image from "next/image";

export default function HeaderSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: "#f8ece8",
        backgroundImage: "url('/slogan%20header%20mclaren%201.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        aspectRatio: "2880 / 1230",
        width: "100%",
        borderTopLeftRadius: "36px",
        borderTopRightRadius: "36px",
        marginTop: "-48px",
        zIndex: 10,
        display: "flex",
        alignItems: "stretch",
      }}
    >
      {/* left side: text */}
      <div className="flex-1 flex items-center" style={{ padding: "0 6%" }}>
        <h2
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "clamp(2.5rem, 6vw, 7rem)",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: "#0b0809",
          }}
        >
          Fearlessly<br />Forward
        </h2>
      </div>

      {/* right side: image filled #970003 */}
      <div className="flex items-end justify-end" style={{ flexShrink: 0, position: "relative" }}>
        <Image
          src="/white-section-fearlesslly-forward.png"
          alt="Fearlessly Forward"
          width={600}
          height={1230}
          style={{
            height: "100%",
            width: "auto",
            objectFit: "contain",
            objectPosition: "bottom right",
            display: "block",
            filter: "brightness(0)",
          }}
          priority
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#970003",
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />
      </div>
    </section>
  );
}