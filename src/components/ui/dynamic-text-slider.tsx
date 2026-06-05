"use client";

import React, { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";

/* ── Constantes ───────────────────────────────────────── */
const MIN_RANGE    = 50;
const ROTATION_DEG = -2.76;
const THETA        = ROTATION_DEG * (Math.PI / 180);
const COS_THETA    = Math.cos(THETA);
const SIN_THETA    = Math.sin(THETA);
const CLOSE_THRESH = 65; // px — cuando se considera "cerrado"

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

/* ── Palabras rotativas ────────────────────────────────── */
export const SLIDER_WORDS = [
  "Developers",
  "Techlovers",
  "Makers",
  "Gamers",
  "Designers",
];

/* ── Props del slider ──────────────────────────────────── */
interface SliderProps {
  width:          number;
  height?:        number;
  handleSize?:    number;
  word:           string;
  onWordChange:   () => void;
}

/* ══════════════════════════════════════════════════════════
   GreenSlider — barra deslizante con colores 3Dev
   ══════════════════════════════════════════════════════════ */
function GreenSlider({
  width: initialWidth,
  height     = 76,
  handleSize = 28,
  word,
  onWordChange,
}: SliderProps) {
  const width = initialWidth > 0 ? initialWidth + 40 : 0;

  const [left,           setLeft]           = useState(0);
  const [right,          setRight]          = useState(width);
  const [dragging,       setDragging]       = useState<"left" | "right" | null>(null);
  const [dynamicRotation, setDynamicRotation] = useState(ROTATION_DEG);

  const leftRef  = useRef(left);
  const rightRef = useRef(right);
  const wasClosedRef = useRef(false);
  const dragRef  = useRef<{
    handle:       "left" | "right";
    startX:       number;
    startY:       number;
    initialLeft:  number;
    initialRight: number;
  } | null>(null);

  /* Sync refs */
  useEffect(() => {
    leftRef.current  = left;
    rightRef.current = right;

    /* Rotación dinámica según posición */
    if (width > 0) {
      const mid    = (left + right) / 2;
      const factor = (mid - width / 2) / (width / 2);
      setDynamicRotation(ROTATION_DEG + factor * 3);
    }

    /* Detectar cierre → cambiar palabra */
    const range = right - left;
    if (range <= CLOSE_THRESH && !wasClosedRef.current) {
      wasClosedRef.current = true;
      onWordChange();
    } else if (range > CLOSE_THRESH + 20 && wasClosedRef.current) {
      wasClosedRef.current = false;
    }
  }, [left, right, width, onWordChange]);

  /* Reset handles cuando cambia el ancho (nueva palabra) */
  useEffect(() => {
    setLeft(0);
    setRight(width);
  }, [width]);

  /* ── Drag ── */
  const startDrag = (
    handle: "left" | "right",
    e: React.PointerEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      handle,
      startX:       e.clientX,
      startY:       e.clientY,
      initialLeft:  leftRef.current,
      initialRight: rightRef.current,
    };
    setDragging(handle);
  };

  const moveDrag = useCallback(
    (e: PointerEvent) => {
      if (!dragRef.current) return;
      const { handle, startX, startY, initialLeft, initialRight } = dragRef.current;
      const projected =
        (e.clientX - startX) * COS_THETA + (e.clientY - startY) * SIN_THETA;

      if (handle === "left") {
        setLeft(clamp(initialLeft + projected, 0, rightRef.current - MIN_RANGE));
      } else {
        setRight(clamp(initialRight + projected, leftRef.current + MIN_RANGE, width));
      }
    },
    [width],
  );

  const endDrag = useCallback(() => {
    dragRef.current = null;
    setDragging(null);
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", moveDrag);
    window.addEventListener("pointerup",   endDrag);
    window.addEventListener("pointercancel", endDrag);
    return () => {
      window.removeEventListener("pointermove", moveDrag);
      window.removeEventListener("pointerup",   endDrag);
      window.removeEventListener("pointercancel", endDrag);
    };
  }, [moveDrag, endDrag]);

  const nudgeHandle =
    (handle: "left" | "right") => (e: React.KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      const delta = e.key === "ArrowLeft" ? -10 : 10;
      if (handle === "left") {
        setLeft((p) => clamp(p + delta, 0, rightRef.current - MIN_RANGE));
      } else {
        setRight((p) => clamp(p + delta, leftRef.current + MIN_RANGE, width));
      }
    };

  if (width === 0) return null;

  return (
    <div
      className="relative select-none transition-transform duration-300 ease-out"
      style={{ width, height, transform: `rotate(${dynamicRotation}deg)` }}
    >
      {/* Borde exterior */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ border: "2px solid #437540" }}
      />

      {/* Handles */}
      {(["left", "right"] as const).map((handle) => {
        const x       = handle === "left" ? left : right - handleSize;
        const isActive = dragging === handle;
        return (
          <button
            key={handle}
            type="button"
            aria-label={handle === "left" ? "Ajustar inicio" : "Ajustar fin"}
            onPointerDown={(e) => startDrag(handle, e)}
            onKeyDown={nudgeHandle(handle)}
            className={`z-20 absolute top-0 h-full w-7 rounded-full flex items-center justify-center
              cursor-ew-resize focus:outline-none focus:ring-2 transition-transform duration-150
              ${isActive ? "scale-125" : "hover:scale-110"}`}
            style={{
              left:        x,
              touchAction: "none",
              background:  "#274633",
              border:      "2px solid #437540",
              boxShadow:   isActive ? "0 0 16px rgba(67,117,64,0.5)" : undefined,
            }}
          >
            <span
              className="w-1 h-8 rounded-full"
              style={{ background: "#6C9968" }}
            />
          </button>
        );
      })}

      {/* Texto recortado */}
      <div
        className="flex z-10 items-center justify-center w-full h-full px-4
          overflow-hidden pointer-events-none font-black tracking-tighter"
        style={{
          clipPath: `inset(0 ${width - right}px 0 ${left}px round 1rem)`,
          fontSize: "inherit",
          color:    "#274633",
        }}
      >
        {word}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   DynamicTextSlider — componente público
   ══════════════════════════════════════════════════════════ */
export function DynamicTextSlider() {
  const measureRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState(350);
  const [wordIndex, setWordIndex] = useState(0);

  const currentWord = SLIDER_WORDS[wordIndex];

  /* Medir el ancho real de la palabra actual */
  useLayoutEffect(() => {
    const measure = () =>
      setTextWidth(measureRef.current?.offsetWidth ?? 350);

    measure();
    // También medir cuando carguen las fuentes
    document.fonts?.ready.then(measure);

    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (measureRef.current) ro.observe(measureRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordIndex]); // re-medir cuando cambia la palabra

  const handleWordChange = useCallback(() => {
    setWordIndex((prev) => (prev + 1) % SLIDER_WORDS.length);
  }, []);

  return (
    <div className="flex flex-col items-center gap-1 w-full">
      {/* Líneas de texto estáticas */}
      <h1
        className="font-black leading-tight tracking-tight text-center"
        style={{ fontSize: "clamp(2.4rem, 7vw, 5.5rem)", color: "#274633" }}
      >
        Impresiones 3D
      </h1>
      <h1
        className="font-black leading-tight tracking-tight text-center"
        style={{ fontSize: "clamp(2.4rem, 7vw, 5.5rem)", color: "#437540" }}
      >
        inspiradas en
      </h1>

      {/* Span oculto para medir el ancho de la palabra */}
      <span
        ref={measureRef}
        className="absolute -left-[9999px] whitespace-nowrap font-black tracking-tighter"
        style={{ fontSize: "clamp(2.4rem, 7vw, 5.5rem)" }}
        aria-hidden
      >
        {currentWord}
      </span>

      {/* Hint de interacción */}
      <p
        className="text-xs font-bold tracking-widest uppercase mb-1 opacity-50"
        style={{ color: "#437540" }}
      >
        ← arrastra los bordes →
      </p>

      {/* Slider */}
      <div className="flex justify-center">
        <GreenSlider
          width={textWidth}
          height={74}
          word={currentWord}
          onWordChange={handleWordChange}
        />
      </div>
    </div>
  );
}

export default DynamicTextSlider;
