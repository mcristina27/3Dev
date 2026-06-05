"use client";

import React from "react";

interface Logo3DevProps {
  size?       : number;
  showText?   : boolean;
  mainColor?  : string;   // color principal (el "negro" del original)
  accentColor?: string;   // color del panel decorativo (el "teal" del original)
  textAccent? : string;   // color de "Dev" en el texto
}

export function Logo3Dev({
  size        = 48,
  showText    = false,
  mainColor   = "#6E2E34",   // Puce Red — reemplaza el negro
  accentColor = "#5E7B9B",   // Rackley — reemplaza el teal
  textAccent  = "#B46C72",
}: Logo3DevProps) {
  const h = size * (108 / 80);

  return (
    <div className="inline-flex flex-col items-center gap-1.5" style={{ width: size }}>
      <svg
        viewBox="0 0 80 108"
        width={size}
        height={h}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="3Dev logo"
      >
        {/* ══ ANTENA (bloque cuadrado centrado encima de la cabeza) ══ */}
        <rect x="32" y="0" width="16" height="16" rx="4" fill={mainColor} />

        {/* ══ CABEZA — bloque principal redondeado ══ */}
        <rect x="6" y="14" width="68" height="60" rx="16" fill={mainColor} />

        {/* ══ PANEL CARA — blanco inset ══ */}
        <rect x="14" y="21" width="52" height="46" rx="11" fill="white" />

        {/* ══ PANEL ACENTO — esquina inferior-izquierda (como el teal del original) ══ */}
        <rect x="14" y="44" width="30" height="23" rx="9" fill={accentColor} />

        {/* ══ OJO IZQUIERDO ══ */}
        <rect x="22" y="27" width="13" height="18" rx="5" fill={mainColor} />

        {/* ══ OJO DERECHO ══ */}
        <rect x="45" y="27" width="13" height="18" rx="5" fill={mainColor} />

        {/* ══ CUERPO ══ */}
        <rect x="24" y="76" width="32" height="24" rx="8" fill={mainColor} />

        {/* ══ PIERNA IZQUIERDA ══ */}
        <rect x="24" y="96" width="12" height="16" rx="5" fill={mainColor} />

        {/* ══ PIERNA DERECHA ══ */}
        <rect x="44" y="96" width="12" height="16" rx="5" fill={mainColor} />

        {/* ══ BRAZO IZQUIERDO (stubito) ══ */}
        <rect x="8"  y="80" width="14" height="10" rx="4" fill={mainColor} />

        {/* ══ BRAZO DERECHO (stubito) ══ */}
        <rect x="58" y="80" width="14" height="10" rx="4" fill={mainColor} />
      </svg>

      {showText && (
        <p
          className="font-black tracking-tight leading-none select-none"
          style={{
            fontSize:   size * 0.28,
            color:      mainColor,
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          3<span style={{ color: textAccent }}>Dev</span>
        </p>
      )}
    </div>
  );
}
