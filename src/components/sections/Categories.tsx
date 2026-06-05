"use client";

import { motion } from "framer-motion";
import {
  Home, Flower2, Layers,
  Cpu, Monitor, Zap,
  Heart, Star, Sparkles,
  Trophy, Shield, Puzzle,
  ArrowRight,
} from "lucide-react";
import { EmptyState } from "@/components/ui/interactive-empty-state";

/* ── Datos de categorías ── */
const categories = [
  {
    id:          "hogar",
    title:       "Hogar",
    description: "Macetas geométricas, portavelas, organizadores y decoración que le dan personalidad a tu espacio.",
    icons:       [<Home key="h1" className="h-7 w-7" />, <Flower2 key="h2" className="h-7 w-7" />, <Layers key="h3" className="h-7 w-7" />],
    actionLabel: "Ver piezas para hogar",
    /* clases extra para darle el toque de marca */
    border:      "!border-[rgba(180,108,114,0.35)] hover:!border-[rgba(180,108,114,0.65)]",
    accent:      "#B46C72",
  },
  {
    id:          "tech",
    title:       "Tech Lovers",
    description: "Soportes para laptop, docks de celular, portaauriculares y todo lo que tu setup necesita.",
    icons:       [<Cpu key="t1" className="h-7 w-7" />, <Monitor key="t2" className="h-7 w-7" />, <Zap key="t3" className="h-7 w-7" />],
    actionLabel: "Ver accesorios tech",
    border:      "!border-[rgba(94,123,155,0.35)] hover:!border-[rgba(94,123,155,0.65)]",
    accent:      "#5E7B9B",
  },
  {
    id:          "girly",
    title:       "Girly Devs",
    description: "Figuras kawaii, llaveros personalizados y piezas aesthetic que hacen tu escritorio único.",
    icons:       [<Heart key="g1" className="h-7 w-7" />, <Sparkles key="g2" className="h-7 w-7" />, <Star key="g3" className="h-7 w-7" />],
    actionLabel: "Ver colección girly",
    border:      "!border-[rgba(255,200,203,0.55)] hover:!border-[rgba(255,200,203,0.90)]",
    accent:      "#E8909A",
  },
  {
    id:          "gamers",
    title:       "Gamers",
    description: "Miniaturas de personajes, dados poliédricos, fichas y coleccionables para llevar tu pasión al siguiente nivel.",
    icons:       [<Trophy key="ga1" className="h-7 w-7" />, <Shield key="ga2" className="h-7 w-7" />, <Puzzle key="ga3" className="h-7 w-7" />],
    actionLabel: "Ver colección gamer",
    border:      "!border-[rgba(110,46,52,0.25)] hover:!border-[rgba(110,46,52,0.50)]",
    accent:      "#6E2E34",
  },
];

/* ── Animaciones de entrada ── */
const fadeUp = (delay: number) => ({
  initial:    { opacity: 0, y: 24 },
  whileInView:{ opacity: 1, y: 0  },
  viewport:   { once: true        },
  transition: { duration: 0.55, delay },
});

/* ── Section ── */
export default function Categories() {
  return (
    <section
      className="relative py-28 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #FAF0E8 0%, #F5E6D1 60%, #FAF0E8 100%)",
      }}
    >
      {/* Blob central */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "#FFC8CB", opacity: 0.18, filter: "blur(120px)", top: "-80px" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          {...fadeUp(0)}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="flex flex-col gap-3">
            <h2
              className="font-black leading-tight tracking-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "#6E2E34" }}
            >
              Para cada estilo,{" "}
              <span style={{ color: "#5E7B9B" }}>una pieza.</span>
            </h2>
            <p
              className="max-w-sm text-sm leading-relaxed font-semibold"
              style={{ color: "#B46C72" }}
            >
              Explorá nuestras colecciones — o diseñemos algo completamente a tu medida.
            </p>
          </div>

          <motion.a
            href="/catalogo"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="self-start md:self-auto inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full"
            style={{
              background: "linear-gradient(135deg, #7B9EBF, #5E7B9B)",
              color:      "white",
              boxShadow:  "0 4px 16px rgba(94,123,155,0.30)",
            }}
          >
            Ver catálogo completo <ArrowRight size={14} />
          </motion.a>
        </motion.div>

        {/* Grid 2×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {categories.map((cat, i) => (
            <motion.div key={cat.id} {...fadeUp(0.1 + i * 0.08)}>
              <EmptyState
                theme="light"
                size="default"
                variant="default"
                title={
                  <span className="font-black text-xl" style={{ color: "#6E2E34" }}>
                    {cat.title}
                  </span>
                }
                description={cat.description}
                icons={cat.icons}
                action={{
                  label:   cat.actionLabel,
                  onClick: () => console.log(`Ver ${cat.id}`),
                }}
                /* Override border al color de marca de cada categoría */
                className={`w-full min-h-[260px] ${cat.border}
                  !bg-[rgba(255,255,255,0.68)] hover:!bg-[rgba(255,255,255,0.85)]
                  backdrop-blur-md`}
                style={{
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  boxShadow: "0 4px 24px rgba(110,46,52,0.06)",
                } as React.CSSProperties}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
