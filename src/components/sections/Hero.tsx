"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Model3DViewer } from "@/components/ui/Model3DViewer";

const tags = ["🎨 Personalizable", "⚡ 24h", "📦 Delivery", "♻️ Eco filament"];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen bg-white flex flex-col"
      style={{ borderBottom: "2px solid #0A0A0A" }}
    >
      {/* Top yellow band */}
      <div
        className="w-full flex items-center justify-center gap-8 py-2 overflow-hidden"
        style={{ borderBottom: "2px solid #0A0A0A", background: "#FFE500" }}
      >
        {[...tags, ...tags].map((t, i) => (
          <span key={i} className="text-xs font-bold text-[#0A0A0A] whitespace-nowrap flex items-center gap-2">
            {t} <span className="opacity-40">✦</span>
          </span>
        ))}
      </div>

      {/* Main grid */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">

        {/* Left — Text */}
        <div className="flex flex-col gap-8 py-16 lg:pr-12">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full text-xs font-bold"
            style={{ border: "2px solid #0A0A0A", background: "#FFE500" }}
          >
            <Star size={11} fill="#0A0A0A" />
            Impresión 3D ✦ Perú
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-[#0A0A0A]"
          >
            Tus ideas,
            <br />
            <span
              className="inline-block px-3 -mx-1 rounded-lg"
              style={{ background: "#FFE500" }}
            >
              impresas
            </span>
            <br />
            en 3D. ✦
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-base font-medium text-[#555] max-w-sm leading-relaxed"
          >
            Figuras, decoración y piezas a medida.
            Todo hecho con amor.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex items-center gap-3 flex-wrap"
          >
            <Link
              href="/catalogo"
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-[#0A0A0A] hover:bg-[#FFE500] hover:text-[#0A0A0A] transition-all"
              style={{ border: "2px solid #0A0A0A" }}
            >
              Ver productos <ArrowRight size={15} />
            </Link>
            <Link
              href="/#contacto"
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all"
              style={{ border: "2px solid #0A0A0A" }}
            >
              Cotizar pieza
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-8 pt-2"
          >
            {[["200+", "Piezas"], ["48h", "Entrega"], ["100%", "A medida"]].map(([num, label]) => (
              <div key={label} className="flex flex-col">
                <span className="text-2xl font-bold text-[#0A0A0A]">{num}</span>
                <span className="text-xs font-medium text-[#555]">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — 3D model */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center justify-center py-8 lg:py-0"
          style={{ minHeight: 520 }}
        >
          <Model3DViewer src="/models/obj4.glb" height={520} />
        </motion.div>
      </div>
    </section>
  );
}
