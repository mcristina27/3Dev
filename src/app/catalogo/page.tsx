"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, X, ShoppingBag,
  MessageCircle,
  ChevronDown, Clock, Ruler, Package2,
  ArrowLeft, Palette,
} from "lucide-react";
import Link from "next/link";
import { Navbar3Dev } from "@/components/ui/navbar-3dev";
import { GlowCard } from "@/components/ui/spotlight-card";
import Footer from "@/components/layout/Footer";
import {
  ALL_PRODUCTS,
  ACTIVE_CATEGORIES,
  type Product,
} from "@/data/products";

/* Chips de categoría: "Todos" + las categorías activas */
const FILTER_OPTIONS = [
  { id: "todos", label: "Todos" },
  ...ACTIVE_CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
];

/* ─────────────────────────────────────────────
   COMPONENTE CARD
───────────────────────────────────────────── */
function ProductCard({
  product,
  selected,
  onClick,
}: {
  product: Product;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button className="text-left w-full" onClick={onClick}>
      <GlowCard
        className={`w-full flex flex-col cursor-pointer transition-all duration-200 ${
          selected ? "ring-2 ring-offset-2" : ""
        }`}
      >
        {/* Imagen placeholder */}
        <div
          className="w-full flex items-center justify-center relative overflow-hidden"
          style={{
            height: "160px",
            background: selected
              ? "linear-gradient(135deg, rgba(255,200,203,0.35), rgba(180,108,114,0.20))"
              : "linear-gradient(135deg, rgba(255,200,203,0.18), rgba(180,108,114,0.08))",
            borderBottom: "1px solid rgba(180,108,114,0.12)",
            transition: "background 0.3s",
          }}
        >
          <motion.div animate={{ y: selected ? -3 : 0 }} transition={{ duration: 0.3 }}>
            <ShoppingBag
              size={40}
              strokeWidth={1.3}
              style={{ color: selected ? "#B46C72" : "#FFC8CB" }}
            />
          </motion.div>
          {selected && (
            <div
              className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: "#B46C72" }}
            >
              <ChevronDown size={14} color="white" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1.5 p-4 flex-1">
          <span className="text-[10px] font-black tracking-widest uppercase" style={{ color: "#FFC8CB" }}>
            {product.category}
          </span>
          <h3 className="font-black text-sm leading-tight" style={{ color: "#6E2E34" }}>
            {product.name}
          </h3>
        </div>

        {/* Footer */}
        <div
          className="px-4 py-3 flex items-center justify-between"
          style={{ borderTop: "1px solid rgba(110,46,52,0.08)" }}
        >
          <span className="text-xs font-bold" style={{ color: "#5E7B9B" }}>
            {product.price ? `S/ ${product.price}` : "Cotizar"}
          </span>
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{ background: "rgba(255,200,203,0.22)", color: "#5E7B9B" }}
          >
            {product.tag}
          </span>
        </div>
      </GlowCard>
    </button>
  );
}

/* ─────────────────────────────────────────────
   PANEL DE DETALLE
───────────────────────────────────────────── */
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

  return (
    <div
      className="relative rounded-3xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.78)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(180,108,114,0.22)",
        boxShadow: "0 8px 48px rgba(110,46,52,0.10)",
      }}
    >
      {/* Cerrar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
        style={{ background: "rgba(110,46,52,0.08)", color: "#B46C72" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(110,46,52,0.16)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(110,46,52,0.08)")}
      >
        <X size={15} />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Imagen */}
        <div
          className="flex items-center justify-center min-h-[220px] md:min-h-[320px]"
          style={{
            background: "linear-gradient(135deg, rgba(255,200,203,0.25), rgba(180,108,114,0.12))",
            borderRight: "1px solid rgba(180,108,114,0.10)",
          }}
        >
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ShoppingBag size={72} strokeWidth={1.1} style={{ color: "#FFC8CB" }} />
          </motion.div>
          {/* TODO: <Image src={product.image} ... /> */}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5 p-7">
          {/* Encabezado */}
          <div>
            <span
              className="text-[10px] font-black tracking-widest uppercase"
              style={{ color: "#FFC8CB" }}
            >
              {product.category}
            </span>
            <h2 className="font-black text-2xl mt-1 leading-tight" style={{ color: "#6E2E34" }}>
              {product.name}
            </h2>
            <p className="text-sm leading-relaxed mt-2 font-medium" style={{ color: "#B46C72" }}>
              {product.description}
            </p>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { icon: Package2, label: "Material", value: product.material },
              { icon: Ruler,    label: "Tamaño",   value: product.size     },
              { icon: Clock,    label: "Entrega",  value: product.time     },
              { icon: Palette,  label: "Peso",     value: product.weight   },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex flex-col gap-1 p-3 rounded-xl"
                style={{
                  background: "rgba(245,230,209,0.60)",
                  border: "1px solid rgba(180,108,114,0.15)",
                }}
              >
                <Icon size={13} style={{ color: "#B46C72" }} />
                <span className="text-[10px] font-black tracking-wide uppercase" style={{ color: "#B46C72" }}>
                  {label}
                </span>
                <span className="text-xs font-bold leading-tight" style={{ color: "#6E2E34" }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Colores disponibles */}
          {product.colors.length > 0 && product.colors[0] !== "A consultar" && product.colors[0] !== "A elegir" && (
            <div>
              <p className="text-[10px] font-black tracking-wide uppercase mb-2" style={{ color: "#B46C72" }}>
                Colores disponibles
              </p>
              <div className="flex flex-wrap gap-1.5">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(245,230,209,0.80)",
                      border: "1px solid rgba(180,108,114,0.20)",
                      color: "#6E2E34",
                    }}
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Precio + cantidad */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold" style={{ color: "rgba(110,46,52,0.50)" }}>
                Precio por unidad
              </p>
              <p className="font-black text-3xl mt-0.5" style={{ color: "#6E2E34" }}>
                {product.price ? `S/ ${product.price}` : "A cotizar"}
              </p>
            </div>

          </div>

          {/* CTA WhatsApp */}
          <motion.a
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.01 }}
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 py-3.5 rounded-full font-black text-sm"
            style={{
              background: "linear-gradient(135deg, #25D366, #1DA851)",
              color: "white",
              boxShadow: "0 4px 20px rgba(37,211,102,0.35)",
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

/* ─────────────────────────────────────────────
   HOOK — columnas según viewport
   Debe coincidir con grid-cols-2 sm:grid-cols-3 lg:grid-cols-4
───────────────────────────────────────────── */
function useColumns() {
  const [cols, setCols] = useState(4);
  useEffect(() => {
    const update = () => {
      if      (window.innerWidth >= 1024) setCols(4);
      else if (window.innerWidth >= 640)  setCols(3);
      else                                setCols(2);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return cols;
}

/* ─────────────────────────────────────────────
   PÁGINA PRINCIPAL
───────────────────────────────────────────── */
export default function CatalogoPage() {
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("todos");
  const [selected, setSelected] = useState<Product | null>(null);
  const panelRef  = useRef<HTMLDivElement>(null);
  const cols      = useColumns();

  /* Filtrado */
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return ALL_PRODUCTS.filter((p) => {
      const matchCat  = category === "todos" || p.category === category;
      const matchName = !q
        || p.name.toLowerCase().includes(q)
        || p.category.toLowerCase().includes(q)
        || p.searchTags.some((t) => t.includes(q));
      return matchCat && matchName;
    });
  }, [search, category]);

  /* Filas para insertar el panel inline */
  const rows = useMemo(() => {
    const result: Product[][] = [];
    for (let i = 0; i < filtered.length; i += cols) {
      result.push(filtered.slice(i, i + cols));
    }
    return result;
  }, [filtered, cols]);

  /* Seleccionar / deseleccionar */
  function handleSelect(p: Product) {
    setSelected((prev) => (prev?.id === p.id ? null : p));
  }

  /* Scroll al panel cuando se abre */
  useEffect(() => {
    if (!selected) return;
    const timer = setTimeout(() => {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 120);
    return () => clearTimeout(timer);
  }, [selected?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Si el seleccionado desaparece por filtro, cerrar */
  useEffect(() => {
    if (selected && !filtered.find((p) => p.id === selected.id)) {
      setSelected(null);
    }
  }, [filtered, selected]);

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(180deg, #FAF0E8 0%, #F5E6D1 100%)" }}
    >
      <Navbar3Dev />

      {/* ── Hero de la página ── */}
      <div className="pt-32 pb-10 px-6 text-center">
      </div>

      {/* ── Buscador + filtros ── */}
      <div className="max-w-6xl mx-auto px-6 mb-10 flex flex-col gap-5">

        {/* Search */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.70)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(180,108,114,0.22)",
            boxShadow: "0 2px 16px rgba(110,46,52,0.06)",
          }}
        >
          <Search size={17} style={{ color: "#B46C72", flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm font-semibold placeholder:font-normal"
            style={{ color: "#6E2E34" }}
          />
          {search && (
            <button onClick={() => setSearch("")} style={{ color: "#B46C72" }}>
              <X size={15} />
            </button>
          )}
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2">
          {FILTER_OPTIONS.map((opt) => {
            const active = category === opt.id;
            return (
              <motion.button
                key={opt.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategory(opt.id)}
                className="px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200"
                style={{
                  background: active
                    ? "linear-gradient(135deg, #7B9EBF, #5E7B9B)"
                    : "rgba(255,255,255,0.65)",
                  color:      active ? "white" : "#6E2E34",
                  border:     active ? "none" : "1px solid rgba(180,108,114,0.28)",
                  boxShadow:  active ? "0 4px 12px rgba(94,123,155,0.25)" : "none",
                }}
              >
                {opt.label}
              </motion.button>
            );
          })}
        </div>

        {/* Contador */}
        <p className="text-xs font-semibold" style={{ color: "rgba(110,46,52,0.45)" }}>
          {filtered.length} {filtered.length === 1 ? "producto" : "productos"} encontrados
        </p>
      </div>

      {/* ── Grid de productos ── */}
      <div className="max-w-6xl mx-auto px-6 pb-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag size={48} strokeWidth={1.2} className="mx-auto mb-4" style={{ color: "#FFC8CB" }} />
            <p className="font-bold text-sm" style={{ color: "#B46C72" }}>
              No encontramos resultados para &ldquo;{search}&rdquo;
            </p>
            <button
              onClick={() => { setSearch(""); setCategory("Todos"); }}
              className="mt-3 text-xs font-bold underline"
              style={{ color: "#5E7B9B" }}
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {rows.map((row, rowIdx) => {
              const rowHasSelected = selected !== null && row.some((p) => p.id === selected.id);
              return (
                <React.Fragment key={rowIdx}>
                  {/* Cards de esta fila */}
                  {row.map((p) => (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.22 }}
                    >
                      <ProductCard
                        product={p}
                        selected={selected?.id === p.id}
                        onClick={() => handleSelect(p)}
                      />
                    </motion.div>
                  ))}

                  {/* Panel de detalle — se abre justo debajo de la fila */}
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

      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}
