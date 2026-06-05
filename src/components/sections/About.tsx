"use client";

import { motion } from "framer-motion";
import { Heart, Layers, Zap, Package } from "lucide-react";
import Button from "@/components/ui/Button";

const values = [
  { icon: Heart,   title: "Atención personalizada", desc: "Cada pedido es revisado y preparado de forma individual. Sin automatizaciones.",   color: "#B46C72" },
  { icon: Layers,  title: "PLA de primera línea",    desc: "Trabajamos exclusivamente con PLA premium. Resistente, preciso y con excelente acabado.", color: "#5E7B9B" },
  { icon: Zap,     title: "Alta resolución",         desc: "Impresión a 0.1 mm por capa. Detalles definidos y superficies limpias.",            color: "#6E2E34" },
  { icon: Package, title: "Empaque y envío",         desc: "Embalaje protegido para cada pieza. Despachos a todo el país con seguimiento.",     color: "#FFC8CB" },
];

export default function About() {
  return (
    <section
      id="nosotros"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FAF0E8 0%, #F5E6D1 60%, #F7E8D6 100%)" }}
    >
      {/* Blobs decorativos */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{ background: "#FFC8CB", opacity: 0.30, filter: "blur(100px)", transform: "translate(30%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background: "#B46C72", opacity: 0.18, filter: "blur(90px)", transform: "translate(-20%, 20%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Izquierda */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-7"
        >
          <h2 className="font-black leading-tight tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#6E2E34" }}>
            Impresión 3D de precisión,{" "}
            <span style={{ color: "#B46C72" }}>desde Lima.</span>
          </h2>
          <p className="leading-relaxed font-semibold" style={{ color: "#B46C72" }}>
            3Dev es un estudio especializado en figuras decorativas, piezas funcionales
            y proyectos a medida. Trabajamos con materiales certificados y capas de 0.1 mm.
          </p>
          <p className="leading-relaxed font-semibold" style={{ color: "#B46C72" }}>
            Sin producciones en masa. Cada pedido es individual — tu diseño,
            impreso con cuidado y enviado donde estés.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: "500+", label: "Piezas entregadas",     color: "#B46C72" },
              { n: "50+",  label: "Clientes satisfechos", color: "#5E7B9B" },
              { n: "12",   label: "Materiales",            color: "#6E2E34" },
              { n: "100%", label: "Pedidos a medida",      color: "#FFC8CB" },
            ].map(({ n, label, color }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-1 p-5 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.55)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: `1px solid ${color}30`,
                  boxShadow: "0 2px 16px rgba(110,46,52,0.06)",
                }}
              >
                <span className="font-black text-3xl" style={{ color }}>{n}</span>
                <span className="text-sm font-bold" style={{ color: "#B46C72" }}>{label}</span>
              </motion.div>
            ))}
          </div>

          <Button variant="primary" size="lg" className="self-start">
            Conócenos más
          </Button>
        </motion.div>

        {/* Derecha: valores */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col gap-4"
        >
          {values.map(({ icon: Icon, title, desc, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="flex items-start gap-4 p-5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.60)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: "0 4px 24px rgba(110,46,52,0.06)",
              }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}20`, color }}>
                <Icon size={20} />
              </div>
              <div>
                <h3 className="font-black text-sm mb-1" style={{ color: "#6E2E34" }}>{title}</h3>
                <p className="text-xs leading-relaxed font-semibold" style={{ color: "#B46C72" }}>{desc}</p>
              </div>
            </motion.div>
          ))}

          {/* Proceso */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-2 p-6 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.9)",
              boxShadow: "0 4px 24px rgba(110,46,52,0.06)",
            }}
          >
            <p className="font-black text-sm mb-5" style={{ color: "#6E2E34" }}>Nuestro proceso</p>
            <div className="grid grid-cols-5 gap-2">
              {[
                { label: "Diseño",    emoji: "✏️" },
                { label: "Slicing",   emoji: "⚙️" },
                { label: "Impresión", emoji: "🖨️" },
                { label: "Control",   emoji: "🔍" },
                { label: "Entrega",   emoji: "📦" },
              ].map(({ label, emoji }, i, arr) => (
                <div key={label} className="flex flex-col items-center gap-1.5 relative">
                  {i < arr.length - 1 && (
                    <div className="absolute top-4 h-px pointer-events-none"
                      style={{
                        left: "calc(50% + 14px)",
                        width: "calc(100% - 4px)",
                        background: "linear-gradient(90deg, #B46C72, #FFC8CB)",
                        opacity: 0.5,
                      }} />
                  )}
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-xs text-white z-10 relative"
                    style={{ background: `linear-gradient(135deg, #6E2E34 ${i * 20}%, #B46C72)` }}>
                    {i + 1}
                  </div>
                  <span className="text-base leading-none">{emoji}</span>
                  <span className="text-[10px] font-bold text-center leading-tight" style={{ color: "#B46C72" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Placeholder foto */}
          <div className="h-44 rounded-3xl border-2 border-dashed flex items-center justify-center"
            style={{ background: "rgba(255,200,203,0.08)", borderColor: "rgba(180,108,114,0.30)" }}>
            <span className="text-sm font-bold" style={{ color: "#FFC8CB" }}>📸 Foto del proceso / taller aquí</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
