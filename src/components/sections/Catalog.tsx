"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";
import { FEATURED_PRODUCTS, CATEGORIES } from "@/data/products";

// Slider: productos featured duplicados para loop infinito
const track = [...FEATURED_PRODUCTS, ...FEATURED_PRODUCTS];

// Label de categoría para mostrar en la card
const getCategoryLabel = (id: string) =>
  CATEGORIES.find((c) => c.id === id)?.label ?? id;

export default function Catalog() {
  return (
    <section
      id="catalogo"
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F5E6D1 0%, #FAF0E8 100%)" }}
    >
      {/* Blobs decorativos */}
      <div
        className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "#FFC8CB", opacity: 0.35, filter: "blur(90px)" }}
      />
      <div
        className="absolute -bottom-10 -left-10 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "#B46C72", opacity: 0.18, filter: "blur(80px)" }}
      />

      {/* ── Header ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div className="flex flex-col gap-3">
            <h2
              className="font-black leading-tight tracking-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "#6E2E34" }}
            >
              Cada pieza,{" "}
              <span style={{ color: "#5E7B9B" }}>pensada para ti.</span>
            </h2>
            <p
              className="max-w-sm text-sm leading-relaxed font-semibold"
              style={{ color: "#B46C72" }}
            >
              Impresiones en PLA de alta resolución. Acabados limpios y envío
              seguro a todo el país.
            </p>
          </div>

          <Link
            href="/catalogo"
            className="inline-flex items-center gap-1.5 text-sm font-bold hover:underline self-start sm:self-auto"
            style={{ color: "#5E7B9B" }}
          >
            Ver catálogo completo <ArrowUpRight size={14} />
          </Link>
        </motion.div>
      </div>

      {/* ── Slider infinito ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="catalog-slider-wrapper relative w-full overflow-hidden"
        style={{
          /* Fade suave en los bordes */
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%)",
        }}
      >
        <div
          className="catalog-slider-track flex gap-5 w-max px-4"
          style={{ animation: "slider-scroll 50s linear infinite" }}
        >
          {track.map((p, i) => (
            <div key={i} className="flex-shrink-0 w-[270px]">
              <GlowCard className="w-full flex flex-col cursor-pointer group">
                {/* Imagen placeholder */}
                <div
                  className="w-full flex items-center justify-center relative overflow-hidden"
                  style={{
                    height: "180px",
                    background:
                      "linear-gradient(135deg, rgba(255,200,203,0.20), rgba(180,108,114,0.10))",
                    borderBottom: "1px solid rgba(180,108,114,0.12)",
                  }}
                >
                  <motion.div
                    animate={{ y: [-4, 4, -4] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: (i % FEATURED_PRODUCTS.length) * 0.3,
                    }}
                  >
                    <ShoppingBag
                      size={44}
                      strokeWidth={1.4}
                      style={{ color: "#FFC8CB" }}
                    />
                  </motion.div>
                  {/* TODO: <Image src={p.image} alt={p.name} fill className="object-cover" /> */}
                </div>

                {/* Info */}
                <div className="flex flex-col gap-2 p-5 flex-1">
                  <span
                    className="text-[10px] font-black tracking-widest uppercase"
                    style={{ color: "#FFC8CB" }}
                  >
                    {getCategoryLabel(p.category)}
                  </span>
                  <h3
                    className="font-black text-base leading-tight"
                    style={{ color: "#6E2E34" }}
                  >
                    {p.name}
                  </h3>
                </div>

                {/* Footer card */}
                <div
                  className="px-5 py-3.5 flex items-center justify-between"
                  style={{ borderTop: "1px solid rgba(110,46,52,0.08)" }}
                >
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "rgba(110,46,52,0.45)" }}
                  >
                    Solicitar cotización →
                  </span>
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(255,200,203,0.22)",
                      color: "#5E7B9B",
                    }}
                  >
                    {p.tag}
                  </span>
                </div>
              </GlowCard>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
