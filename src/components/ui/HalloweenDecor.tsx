"use client";

import { useSeasonal } from "@/context/SeasonalContext";

/* Dibujitos en public/assets/halloween/ */
const IMG = (name: string) => `/assets/halloween/${name}.png`;

const BURST_IMGS = ["ghost", "skull", "bomb", "sparkle", "bolt", "rip", "spider"];
const BURST = Array.from({ length: 16 }, (_, i) => ({
  dx: Math.round(Math.cos((i / 16) * Math.PI * 2) * (90 + (i % 3) * 40)),
  dy: Math.round(Math.sin((i / 16) * Math.PI * 2) * (90 + (i % 3) * 40)) - 60,
  rot: (i * 47) % 360,
  img: BURST_IMGS[i % BURST_IMGS.length],
}));

/** Decoración del modo Halloween: telarañas, arañita, explosión y botón para salir. */
export default function HalloweenDecor() {
  const { halloween, burst, setHalloween } = useSeasonal();
  if (!halloween) return null;

  return (
    <>
      <div className="hw-layer" aria-hidden="true">
        <img src={IMG("web")} alt="" className="hw-web hw-web-l" />
        <img src={IMG("web")} alt="" className="hw-web hw-web-r" />

        {/* Arañita colgando de un hilo */}
        <div className="hw-dangler">
          <span className="hw-thread" />
          <img src={IMG("spider")} alt="" />
        </div>
      </div>

      {/* Explosión al activar */}
      <div key={burst} className="hw-burst" aria-hidden="true">
        {BURST.map((s, i) => (
          <img
            key={i}
            src={IMG(s.img)}
            alt=""
            style={{ ["--dx" as string]: `${s.dx}px`, ["--dy" as string]: `${s.dy}px`, ["--rot" as string]: `${s.rot}deg` }}
          />
        ))}
      </div>

      <button type="button" className="hw-exit" onClick={() => setHalloween(false)}>
        <img src={IMG("skull")} alt="" width={16} height={16} />
        Modo Halloween · Salir
      </button>
    </>
  );
}
