"use client";

const items = [
  "Impresión 3D",
  "✦",
  "Figuras · Decoración · Piezas",
  "✦",
  "A medida",
  "✦",
  "Lima, Perú",
  "✦",
  "PLA Premium",
  "✦",
  "0.1 mm",
  "✦",
];

export default function Ticker() {
  const track = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden py-3"
      style={{
        background: "#0A0A0A",
        borderTop: "2px solid #0A0A0A",
        borderBottom: "2px solid #0A0A0A",
      }}
    >
      <div
        className="flex whitespace-nowrap"
        style={{ width: "max-content", animation: "ticker-scroll 35s linear infinite" }}
      >
        {track.map((item, i) => (
          <span
            key={i}
            className="inline-block px-5 text-sm font-bold tracking-wide"
            style={{ color: item === "✦" ? "#FFE500" : "white" }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
