"use client";

import React, { useRef, useCallback, ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

const GlowCard: React.FC<GlowCardProps> = ({ children, className = "" }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const spotRef    = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = wrapperRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // ── borde luminoso: el background del wrapper (con padding 2px) se vuelve
    //    un gradiente radial brillante centrado en el cursor ──
    el.style.background = `radial-gradient(
      380px circle at ${x}px ${y}px,
      rgba(255, 200, 203, 1.0)  0%,
      rgba(180, 108, 114, 0.85) 20%,
      rgba(110, 46,  52,  0.40) 50%,
      rgba(110, 46,  52,  0.10) 75%,
      rgba(180, 108, 114, 0.08) 100%
    )`;

    // ── spotlight interior ──
    if (spotRef.current) {
      spotRef.current.style.opacity = "1";
      spotRef.current.style.background = `radial-gradient(
        420px circle at ${x}px ${y}px,
        rgba(255, 200, 203, 0.14) 0%,
        rgba(180, 108, 114, 0.07) 50%,
        transparent               80%
      )`;
    }
  }, []);

  const onLeave = useCallback(() => {
    if (wrapperRef.current) {
      wrapperRef.current.style.background = "rgba(180, 108, 114, 0.18)";
    }
    if (spotRef.current) {
      spotRef.current.style.opacity  = "0";
      spotRef.current.style.background = "transparent";
    }
  }, []);

  return (
    /* ── wrapper: gradient-border trick ─────────────────────────────
       padding 2px → el hueco entre wrapper y card = el "borde"
       border-radius 25px wrapper / 23px card para que coincidan      */
    <div
      ref={wrapperRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        padding:         "2px",
        borderRadius:    "25px",
        background:      "rgba(180, 108, 114, 0.18)", /* borde base cuando no hay hover */
        transition:      "background 0.15s ease",
      }}
    >
      {/* ── card real ── */}
      <div
        className={`relative overflow-hidden ${className}`}
        style={{
          borderRadius:        "23px",
          background:          "rgba(255, 255, 255, 0.68)",
          backdropFilter:      "blur(18px)",
          WebkitBackdropFilter:"blur(18px)",
          boxShadow:           "0 4px 30px rgba(110,46,52,0.07)",
        }}
      >
        {/* spotlight interior */}
        <div
          ref={spotRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity:      0,
            transition:   "opacity 0.2s ease",
            borderRadius: "23px",
            zIndex:       0,
          }}
        />

        {/* contenido */}
        <div className="relative flex flex-col h-full" style={{ zIndex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export { GlowCard };
