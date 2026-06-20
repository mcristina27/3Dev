"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Model3DViewer = dynamic(
  () => import("@/components/ui/Model3DViewer").then((m) => m.Model3DViewer),
  { ssr: false, loading: () => <div className="w-full h-[480px] animate-pulse rounded-2xl bg-[#F5F5F5]" /> }
);

const bullets = [
  { emoji: "🎨", text: "Colores a tu gusto" },
  { emoji: "📐", text: "Medidas exactas" },
  { emoji: "⚡", text: "Entrega 24–48h" },
  { emoji: "♻️", text: "PLA ecológico" },
];

export default function Feature3D() {
  return (
    <section
      className="bg-white"
      style={{ borderBottom: "2px solid #0A0A0A" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center">

        {/* Left — 3D model */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center py-12 lg:py-0"
          style={{ borderRight: "2px solid #0A0A0A", minHeight: 520, background: "#FFFFFF" }}
        >
          <Model3DViewer src="/models/obj2.glb" height={480} />
        </motion.div>

        {/* Right — Text */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-8 px-8 lg:px-16 py-16"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-[#999] mb-4">
              Hecho a medida
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0A0A0A] leading-tight">
              Cada detalle,{" "}
              <span className="px-2 rounded-lg" style={{ background: "#FFE500" }}>
                perfecto.
              </span>
            </h2>
          </div>

          <p className="text-base font-medium text-[#555] leading-relaxed max-w-sm">
            Del boceto a tu puerta. Cada pieza, hecha para vos.
          </p>

          <ul className="flex flex-col gap-3">
            {bullets.map(({ emoji, text }) => (
              <li
                key={text}
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-[#0A0A0A]"
                style={{ border: "2px solid #0A0A0A" }}
              >
                <span className="text-lg">{emoji}</span>
                {text}
              </li>
            ))}
          </ul>

          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-[#0A0A0A] hover:bg-[#FFE500] hover:text-[#0A0A0A] transition-all w-fit"
            style={{ border: "2px solid #0A0A0A" }}
          >
            Explorar catálogo <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
