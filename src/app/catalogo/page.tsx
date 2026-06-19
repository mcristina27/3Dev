"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, X, ShoppingBag,
  MessageCircle,
  ChevronRight, Clock, Ruler, Package2,
  ArrowRight, Palette,
} from "lucide-react";
import Link from "next/link";
import { Navbar3Dev } from "@/components/ui/navbar-3dev";
import Footer from "@/components/layout/Footer";
import {
  ALL_PRODUCTS,
  ACTIVE_CATEGORIES,
  CATEGORIES,
  type Product,
} from "@/data/products";

/* ── Helpers ─────────────────────────────────────────── */
const FILTER_OPTIONS = [
  { id: "todos", label: "Todos", emoji: "✦" },
  ...ACTIVE_CATEGORIES.map((c) => ({ id: c.id, label: c.label, emoji: c.emoji })),
];

const HOVER_COLORS = [
  "#FFE500", "#FF4F4F", "#3B82F6", "#34D399",
  "#A78BFA", "#FB923C", "#F472B6", "#4ADE80",
  "#FFE500", "#FF4F4F", "#3B82F6", "#34D399",
  "#A78BFA", "#FB923C",
];

const getCategoryLabel = (id: string) =>
  CATEGORIES.find((c) => c.id === id)?.label ?? id;

/* ─────────────────────────────────────────────────────────
   CARD
───────────────────────────────────────────────────────── */
function ProductCard({
  product,
  selected,
  onClick,
  index,
}: {
  product: Product;
  selected: boolean;
  onClick: () => void;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const color = HOVER_COLORS[index % HOVER_COLORS.length];
  const isActive = selected || hovered;

  return (
    <button className="text-left w-full h-full" onClick={onClick}>
      <div
        className="flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 h-full"
        style={{
          border: selected ? `3px solid #0A0A0A` : "2px solid #0A0A0A",
          background: isActive ? color : "#FFFFFF",
          boxShadow: isActive ? "4px 4px 0px #0A0A0A" : "2px 2px 0px transparent",
          transform: isActive ? "translateY(-4px)" : "translateY(0)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Imagen */}
        <div
          className="w-full aspect-square relative overflow-hidden flex items-center justify-center"
          style={{
            background: "#F5F5F5",
            borderBottom: "2px solid #0A0A0A",
          }}
        >
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <ShoppingBag
              size={46}
              strokeWidth={1.3}
              style={{ color: isActive ? "#0A0A0A" : "#D0D0D0" }}
            />
          )}

          {/* Badge precio */}
          {product.price ? (
            <span
              className="absolute top-3 left-3 text-xs font-black px-2.5 py-1 rounded-full"
              style={{
                background: isActive ? "#0A0A0A" : "#FFE500",
                color: isActive ? color : "#0A0A0A",
                border: "1.5px solid #0A0A0A",
              }}
            >
              S/ {product.price}
            </span>
          ) : (
            <span
              className="absolute top-3 left-3 text-xs font-black px-2.5 py-1 rounded-full"
              style={{
                background: "#0A0A0A",
                color: isActive ? color : "#FFE500",
                border: "1.5px solid #0A0A0A",
              }}
            >
              Cotizar
            </span>
          )}

          {/* Indicador seleccionado */}
          {selected && (
            <div
              className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: "#0A0A0A" }}
            >
              <ChevronRight size={14} color={color} />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1 p-4 flex-1">
          <span
            className="text-[10px] font-black tracking-widest uppercase"
            style={{ color: isActive ? "rgba(0,0,0,0.5)" : "#999" }}
          >
            {getCategoryLabel(product.category)}
          </span>
          <h3 className="font-bold text-[15px] leading-tight text-[#0A0A0A]">
            {product.name}
          </h3>
          <p
            className="text-xs font-medium leading-relaxed line-clamp-2 mt-0.5"
            style={{ color: isActive ? "rgba(0,0,0,0.65)" : "#777" }}
          >
            {product.shortDesc}
          </p>
        </div>

        {/* Footer */}
        <div
          className="px-4 py-3 flex items-center justify-between"
          style={{ borderTop: "2px solid #0A0A0A" }}
        >
          <span className="text-xs font-bold text-[#0A0A0A]">
            {selected ? "Ver menos ↑" : "Ver detalle →"}
          </span>
          <span
            className="text-[10px] font-black px-2.5 py-1 rounded-full"
            style={{ background: "#0A0A0A", color: isActive ? color : "#FFE500" }}
          >
            {product.tag}
          </span>
        </div>
      </div>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────
   PANEL DE DETALLE
───────────────────────────────────────────────────────── */
function DetailPanel({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const waMessage = encodeURIComponent(
    `Hola! Me interesa el producto: *${product.name}*${product.price ? ` (S/ ${product.price})` : ""}. ¿Podría darme más información? 😊`
  );
  const waUrl = `https://wa.me/51999999999?text=${waMessage}`;

  const specs = [
    { icon: Package2, label: "Material", value: product.material },
    { icon: Ruler, label: "Tamaño", value: product.size },
    { icon: Clock, label: "Entrega", value: product.time },
    { icon: Palette, label: "Peso", value: product.weight },
  ];

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "2px solid #0A0A0A", background: "#FFFFFF" }}
    >
      {/* Barra superior con cierre */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: "2px solid #0A0A0A", background: "#F5F5F5" }}
      >
        <span className="text-xs font-black uppercase tracking-widest text-[#999]">
          ✦
        </span>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[#0A0A0A] hover:bg-[#FFE500] transition-colors"
          style={{ border: "2px solid #0A0A0A" }}
        >
          <X size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Imagen */}
        <div
          className="flex items-center justify-center min-h-[240px] md:min-h-[320px]"
          style={{
            background: "#FAFAFA",
            borderRight: "2px solid #0A0A0A",
          }}
        >
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain p-2"
            />
          ) : (
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <ShoppingBag size={80} strokeWidth={1.1} style={{ color: "#D0D0D0" }} />
            </motion.div>
          )}
        </div>

        {/* Información */}
        <div className="flex flex-col gap-5 p-7">
          {/* Encabezado */}
          <div>
            <span className="text-[10px] font-black tracking-widest uppercase text-[#999]">
              {getCategoryLabel(product.category)}
            </span>
            <h2 className="font-bold text-2xl sm:text-3xl mt-1 leading-tight text-[#0A0A0A]">
              {product.name}
            </h2>
            <p className="text-sm leading-relaxed mt-2 text-[#555]">
              {product.description}
            </p>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-2">
            {specs.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex flex-col gap-1 p-3 rounded-xl"
                style={{ border: "2px solid #0A0A0A", background: "#FAFAFA" }}
              >
                <Icon size={13} className="text-[#0A0A0A]" />
                <span className="text-[10px] font-black tracking-wide uppercase text-[#999]">
                  {label}
                </span>
                <span className="text-xs font-bold leading-tight text-[#0A0A0A]">
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Colores */}
          {product.colors.length > 0 &&
            product.colors[0] !== "A consultar" &&
            product.colors[0] !== "A elegir" && (
              <div>
                <p className="text-[10px] font-black tracking-wide uppercase text-[#999] mb-2">
                  Colores disponibles
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {product.colors.map((color) => (
                    <span
                      key={color}
                      className="text-xs font-semibold px-2.5 py-1 rounded-full text-[#0A0A0A]"
                      style={{ border: "1.5px solid #0A0A0A", background: "#FAFAFA" }}
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}

          {/* Precio */}
          <div
            className="rounded-xl p-4 flex items-center justify-between"
            style={{ border: "2px solid #0A0A0A", background: "#FFE500" }}
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#0A0A0A]/60">
                Precio por unidad
              </p>
              <p className="font-bold text-3xl text-[#0A0A0A]">
                {product.price ? `S/ ${product.price}` : "A cotizar"}
              </p>
            </div>
            <span className="text-2xl">✦</span>
          </div>

          {/* WhatsApp CTA */}
          <motion.a
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.01 }}
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 py-4 rounded-full font-black text-sm text-white"
            style={{
              background: "linear-gradient(135deg, #25D366, #1DA851)",
              boxShadow: "0 4px 20px rgba(37,211,102,0.30)",
            }}
          >
            <MessageCircle size={18} />
            {product.price
              ? `Consultar por WhatsApp · S/ ${product.price}`
              : "Cotizar por WhatsApp"}
          </motion.a>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   HOOK — columnas según viewport
───────────────────────────────────────────────────────── */
function useColumns() {
  const [cols, setCols] = useState(4);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setCols(4);
      else if (window.innerWidth >= 640) setCols(3);
      else setCols(2);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return cols;
}

/* ─────────────────────────────────────────────────────────
   PÁGINA
───────────────────────────────────────────────────────── */
export default function CatalogoPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("todos");
  const [selected, setSelected] = useState<Product | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const cols = useColumns();

  /* Filtrado */
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return ALL_PRODUCTS.filter((p) => {
      const matchCat = category === "todos" || p.category === category;
      const matchName =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.searchTags.some((t) => t.includes(q));
      return matchCat && matchName;
    });
  }, [search, category]);

  /* Filas para el panel inline */
  const rows = useMemo(() => {
    const result: Product[][] = [];
    for (let i = 0; i < filtered.length; i += cols) {
      result.push(filtered.slice(i, i + cols));
    }
    return result;
  }, [filtered, cols]);

  function handleSelect(p: Product) {
    setSelected((prev) => (prev?.id === p.id ? null : p));
  }

  useEffect(() => {
    if (!selected) return;
    const timer = setTimeout(() => {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 120);
    return () => clearTimeout(timer);
  }, [selected?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selected && !filtered.find((p) => p.id === selected.id)) {
      setSelected(null);
    }
  }, [filtered, selected]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar3Dev />

      {/* ── Hero editorial ── */}
      <div
        className="pt-28 pb-12 px-6 max-w-6xl mx-auto"
        style={{ borderBottom: "2px solid #0A0A0A" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-black uppercase tracking-widest text-[#999] mb-4">
            3Dev ✦ Lima, Perú
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#0A0A0A] leading-[1.05]">
              Nuestro{" "}
              <span
                className="inline-block px-3 -mx-1 rounded-xl"
                style={{ background: "#FFE500" }}
              >
                catálogo.
              </span>
            </h1>
            <p className="text-sm font-medium text-[#555] leading-relaxed sm:text-right">
              A medida. Entrega en Lima.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Buscador + filtros ── */}
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-6 flex flex-col gap-5">

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white"
          style={{ border: "2px solid #0A0A0A" }}
        >
          <Search size={17} className="text-[#0A0A0A] shrink-0" />
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm font-semibold text-[#0A0A0A] placeholder:text-[#BBB] placeholder:font-normal"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-[#0A0A0A] hover:text-[#FF4F4F] transition-colors"
            >
              <X size={15} />
            </button>
          )}
        </motion.div>

        {/* Chips de categoría */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap gap-2"
        >
          {FILTER_OPTIONS.map((opt) => {
            const active = category === opt.id;
            return (
              <motion.button
                key={opt.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setCategory(opt.id); setSelected(null); }}
                className="px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-150"
                style={{
                  background: active ? "#FFE500" : "#FFFFFF",
                  color: "#0A0A0A",
                  border: "2px solid #0A0A0A",
                  boxShadow: active ? "2px 2px 0px #0A0A0A" : "none",
                  transform: active ? "translateY(-1px)" : "none",
                }}
              >
                {opt.emoji} {opt.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Contador */}
        <p className="text-xs font-semibold text-[#999]">
          {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
        </p>
      </div>

      {/* ── Grid de productos ── */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ border: "2px solid #0A0A0A", background: "#F5F5F5" }}
            >
              <ShoppingBag size={36} strokeWidth={1.3} className="text-[#CCC]" />
            </div>
            <p className="font-bold text-base text-[#0A0A0A]">
              No encontramos &ldquo;{search}&rdquo;
            </p>
            <p className="text-sm text-[#999] mt-1">
              Probá con otro término o limpiá los filtros.
            </p>
            <button
              onClick={() => { setSearch(""); setCategory("todos"); }}
              className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold text-[#0A0A0A] hover:bg-[#FFE500] transition-colors"
              style={{ border: "2px solid #0A0A0A" }}
            >
              Limpiar filtros <ArrowRight size={12} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rows.map((row, rowIdx) => {
              const rowHasSelected =
                selected !== null && row.some((p) => p.id === selected.id);
              return (
                <React.Fragment key={rowIdx}>
                  {row.map((p) => (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.22 }}
                      className="h-full"
                    >
                      <ProductCard
                        product={p}
                        selected={selected?.id === p.id}
                        onClick={() => handleSelect(p)}
                        index={ALL_PRODUCTS.findIndex((x) => x.id === p.id)}
                      />
                    </motion.div>
                  ))}

                  {/* Panel inline debajo de la fila */}
                  <AnimatePresence>
                    {rowHasSelected && (
                      <motion.div
                        ref={panelRef}
                        key={`panel-row-${rowIdx}`}
                        className="col-span-full overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <div className="pt-3 pb-1">
                          <AnimatePresence mode="wait">
                            <DetailPanel
                              key={selected!.id}
                              product={selected!}
                              onClose={() => setSelected(null)}
                            />
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>

      {/* ── CTA band antes del footer ── */}
      <div
        className="bg-[#FFE500] px-6 py-12 text-center"
        style={{ borderTop: "2px solid #0A0A0A", borderBottom: "2px solid #0A0A0A" }}
      >
        <p className="text-xs font-black uppercase tracking-widest text-[#0A0A0A]/50 mb-3">
          ¿No lo encontrás?
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#0A0A0A] mb-6">
          Lo hacemos. ✦
        </h2>
        <a
          href="https://wa.me/51999999999?text=Hola!+Quiero+cotizar+una+pieza+3D+personalizada"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold bg-[#0A0A0A] text-[#FFE500] hover:bg-white hover:text-[#0A0A0A] transition-colors"
          style={{ border: "2px solid #0A0A0A" }}
        >
          <MessageCircle size={16} /> Consultar por WhatsApp
        </a>
      </div>

      <Footer />
    </div>
  );
}
