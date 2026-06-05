"use client";

import React, { useState, useEffect, useRef } from "react";
import { ShoppingBag } from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { Logo3Dev } from "@/components/ui/Logo3Dev";
import { useCart } from "@/context/CartContext";

/* ── Link animado con slide vertical al hover ── */
const AnimatedNavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <a
    href={href}
    onClick={onClick}
    className="group relative block overflow-hidden text-sm"
    style={{ height: "1.25rem", lineHeight: "1.25rem" }}
  >
    <div
      className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2"
      style={{ height: "2.5rem" }}
    >
      <span className="block" style={{ height: "1.25rem", color: "rgba(110,46,52,0.55)" }}>{children}</span>
      <span className="block font-semibold" style={{ height: "1.25rem", color: "#6E2E34" }}>{children}</span>
    </div>
  </a>
);

const navLinks = [
  { label: "Catálogo", href: "#catalogo" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export function MiniNavbar() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [shape,    setShape]    = useState("rounded-full");
  const [visible,  setVisible]  = useState(true);
  const { itemCount, toggleCart } = useCart();

  const lastScrollY  = useRef(0);
  const timerRef     = useRef<NodeJS.Timeout | null>(null);

  /* ── Forma del navbar (pill ↔ rounded) según menú mobile ── */
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (isOpen) {
      setShape("rounded-2xl");
    } else {
      timerRef.current = setTimeout(() => setShape("rounded-full"), 300);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [isOpen]);

  /* ── Ocultar al bajar, mostrar al subir ── */
  useEffect(() => {
    const THRESHOLD = 60; // px mínimos para activar el efecto

    const onScroll = () => {
      const currentY = window.scrollY;
      const diff     = currentY - lastScrollY.current;

      if (Math.abs(diff) < 4) return; // ignora micro-movimientos

      if (currentY < THRESHOLD) {
        // cerca del top → siempre visible
        setVisible(true);
      } else if (diff > 0) {
        // bajando → ocultar (y cerrar menú mobile si estaba abierto)
        setVisible(false);
        setIsOpen(false);
      } else {
        // subiendo → mostrar
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed z-50
        flex flex-col items-center
        px-5 py-2.5
        border backdrop-blur-md
        w-[calc(100%-2rem)] sm:w-auto sm:min-w-[560px]
        ${shape}
        transition-[border-radius,transform,opacity] duration-300 ease-in-out`}
      style={{
        top:         "20px",
        left:        "50%",
        background:  "rgba(245,230,209,0.72)",
        borderColor: "rgba(180,108,114,0.28)",
        boxShadow:   "0 4px 24px rgba(110,46,52,0.10), inset 0 1px 0 rgba(255,255,255,0.60)",
        transform:   visible
          ? "translateX(-50%) translateY(0)"
          : "translateX(-50%) translateY(calc(-100% - 32px))",
        opacity: visible ? 1 : 0,
      }}
    >
      {/* ── fila principal ── */}
      <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <Logo3Dev size={32} showText={false} />
          <span className="font-black text-base tracking-tight" style={{ color: "#6E2E34" }}>
            3<span style={{ color: "#B46C72" }}>Dev</span>
          </span>
        </a>

        {/* Links — desktop */}
        <nav className="hidden sm:flex items-center gap-6">
          {navLinks.map((l) => (
            <AnimatedNavLink key={l.href} href={l.href}>
              {l.label}
            </AnimatedNavLink>
          ))}
        </nav>

        {/* CTA — desktop */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Carrito */}
          <button
            onClick={toggleCart}
            className="relative flex items-center justify-center w-8 h-8 rounded-full transition-colors"
            style={{ color: "#B46C72" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(110,46,52,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            aria-label="Abrir carrito"
          >
            <ShoppingBag size={18} />
            {itemCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black"
                style={{ background: "#B46C72", color: "white" }}
              >
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </button>
          <LiquidButton size="sm">Contacto</LiquidButton>
        </div>

        {/* Hamburger — mobile */}
        <button
          className="sm:hidden flex items-center justify-center w-8 h-8 focus:outline-none"
          style={{ color: "#B46C72" }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* ── menú mobile expandible ── */}
      <div
        className={`sm:hidden flex flex-col items-center w-full overflow-hidden
          transition-[max-height,opacity,padding] duration-300 ease-in-out
          ${isOpen ? "max-h-64 opacity-100 pt-4" : "max-h-0 opacity-0 pt-0 pointer-events-none"}`}
      >
        <nav className="flex flex-col items-center gap-3 w-full">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setIsOpen(false)}
              className="text-sm font-semibold w-full text-center py-1"
              style={{ color: "#6E2E34" }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="mt-4 w-full">
          <LiquidButton size="md" className="w-full justify-center">
            Contacto
          </LiquidButton>
        </div>
      </div>
    </header>
  );
}
