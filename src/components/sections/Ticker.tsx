"use client";

const items = [
  "Impresión 3D de Precisión",
  "✦",
  "Figuras · Decoración · Piezas Funcionales",
  "✦",
  "Impresiones en PLA",
  "✦",
  "Pedidos 100% a Medida",
  "✦",
  "Envíos a Todo el País",
  "✦",
  "Capas de 0.1 mm",
  "✦",
  "Personalizados",
  "✦",
];

export default function Ticker() {
  const track = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden py-3.5"
      style={{
        background: "linear-gradient(90deg, #6E2E34 0%, #B46C72 50%, #C4848A 100%)",
        borderTop: "1px solid rgba(110,46,52,0.20)",
        borderBottom: "1px solid rgba(110,46,52,0.20)",
      }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, rgba(110,46,52,0.9), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(-90deg, rgba(196,132,138,0.9), transparent)" }} />

      <div
        className="flex whitespace-nowrap"
        style={{ width: "max-content", animation: "ticker-scroll 35s linear infinite" }}
      >
        {track.map((item, i) => (
          <span key={i} className="inline-block px-4 text-sm font-bold tracking-wide" style={{ color: "rgba(245,230,209,0.92)" }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
