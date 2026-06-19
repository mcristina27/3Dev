"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { ALL_PRODUCTS, CATEGORIES } from "@/data/products";
import { useState } from "react";

/* 8 productos = 2 filas × 4 cols en desktop */
const GRID_PRODUCTS = ALL_PRODUCTS.slice(0, 8);

const getCategoryLabel = (id: string) =>
  CATEGORIES.find((c) => c.id === id)?.label ?? id;

const HOVER_COLORS = [
  "#FFE500", "#FF4F4F", "#3B82F6", "#34D399",
  "#A78BFA", "#FB923C", "#F472B6", "#4ADE80",
];

function ProductCard({ p, index }: { p: typeof ALL_PRODUCTS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const color = HOVER_COLORS[index % HOVER_COLORS.length];

  return (
    <Link href="/catalogo" className="block h-full">
      <div
        className="flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 h-full"
        style={{
          border: "2px solid #0A0A0A",
          background: hovered ? color : "#FFFFFF",
          boxShadow: hovered ? "4px 4px 0px #0A0A0A" : "2px 2px 0px transparent",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Imagen */}
        <div
          className="w-full flex items-center justify-center relative overflow-hidden"
          style={{
            height: 200,
            background: "#F5F5F5",
            borderBottom: "2px solid #0A0A0A",
          }}
        >
          {p.images[0] ? (
            <img
              src={p.images[0]}
              alt={p.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <ShoppingBag
              size={46}
              strokeWidth={1.3}
              style={{ color: hovered ? "#0A0A0A" : "#D0D0D0" }}
            />
          )}
          {/* Price badge */}
          {p.price && (
            <span
              className="absolute top-3 left-3 text-xs font-black px-2.5 py-1 rounded-full"
              style={{
                background: hovered ? "#0A0A0A" : "#FFE500",
                color: hovered ? color : "#0A0A0A",
                border: "1.5px solid #0A0A0A",
              }}
            >
              S/ {p.price}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1.5 p-4 flex-1">
          <span
            className="text-[10px] font-black tracking-widest uppercase"
            style={{ color: hovered ? "rgba(0,0,0,0.5)" : "#999" }}
          >
            {getCategoryLabel(p.category)}
          </span>
          <h3 className="font-bold text-[15px] leading-tight text-[#0A0A0A]">
            {p.name}
          </h3>
          <p
            className="text-xs font-medium leading-relaxed line-clamp-2 mt-0.5"
            style={{ color: hovered ? "rgba(0,0,0,0.65)" : "#777" }}
          >
            {p.shortDesc}
          </p>
        </div>

        {/* Footer */}
        <div
          className="px-4 py-3 flex items-center justify-between"
          style={{ borderTop: "2px solid #0A0A0A" }}
        >
          <span className="text-xs font-bold text-[#0A0A0A]">Ver detalle →</span>
          <span
            className="text-[10px] font-black px-2.5 py-1 rounded-full"
            style={{
              background: "#0A0A0A",
              color: hovered ? color : "#FFE500",
            }}
          >
            {p.tag}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Catalog() {
  return (
    <section
      id="catalogo"
      className="relative py-24 bg-white"
      style={{ borderBottom: "2px solid #0A0A0A" }}
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-[#999] mb-3">
              Productos destacados
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0A0A0A] leading-tight">
              Cada pieza,{" "}
              <span className="px-2 rounded-lg" style={{ background: "#FFE500" }}>
                única.
              </span>
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all self-start sm:self-auto"
            style={{ border: "2px solid #0A0A0A" }}
          >
            Ver todo <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>

      {/* Grid estático — 2 filas × 4 columnas */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {GRID_PRODUCTS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.07 }}
              className="h-full"
            >
              <ProductCard p={p} index={i} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA centrado al final */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex justify-center mt-12"
      >
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-[#0A0A0A] hover:bg-[#FFE500] hover:text-[#0A0A0A] transition-all"
          style={{ border: "2px solid #0A0A0A" }}
        >
          Ver catálogo completo <ArrowRight size={15} />
        </Link>
      </motion.div>
    </section>
  );
}
