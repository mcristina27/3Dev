"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ALL_PRODUCTS } from "@/data/products";

const SALE_PRODUCTS = ALL_PRODUCTS.filter((p) => p.salePrice);

export default function LaunchPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("launch_popup_closed")) {
      const t = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const close = () => {
    localStorage.setItem("launch_popup_closed", "1");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={close}
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed z-50 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 top-1/2 -translate-y-1/2 w-full sm:w-[420px] rounded-2xl overflow-hidden"
            style={{ border: "2px solid #0A0A0A" }}
          >
            {/* Header amarillo */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ background: "#FFE500", borderBottom: "2px solid #0A0A0A" }}
            >
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#0A0A0A]/60">
                  3Dev ✦ Evento de lanzamiento
                </p>
                <h2 className="font-black text-xl text-[#0A0A0A] leading-tight mt-0.5">
                  🚀 Precios de lanzamiento
                </h2>
              </div>
              <button
                onClick={close}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors"
                style={{ border: "2px solid #0A0A0A" }}
              >
                <X size={15} />
              </button>
            </div>

            {/* Body */}
            <div className="bg-white px-5 py-4 flex flex-col gap-3">
              <p className="text-sm font-medium text-[#555]">
                Solo por lanzamiento, algunos productos tienen precio especial. ¡Aprovechalo!
              </p>

              <div className="flex flex-col gap-2">
                {SALE_PRODUCTS.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl"
                    style={{ border: "2px solid #0A0A0A", background: "#FAFAFA" }}
                  >
                    <span className="text-sm font-bold text-[#0A0A0A]">{p.name}</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-black text-[#0A0A0A]">S/ {p.salePrice}</span>
                      <span className="text-xs font-medium line-through text-[#999]">S/ {p.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div
              className="bg-white px-5 pb-5 flex gap-2"
            >
              <Link
                href="/catalogo"
                onClick={close}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold text-white bg-[#0A0A0A] hover:bg-[#FFE500] hover:text-[#0A0A0A] transition-all"
                style={{ border: "2px solid #0A0A0A" }}
              >
                Ver catálogo <ArrowRight size={14} />
              </Link>
              <button
                onClick={close}
                className="px-4 py-3 rounded-full text-sm font-bold text-[#0A0A0A] hover:bg-[#F5F5F5] transition-all"
                style={{ border: "2px solid #0A0A0A" }}
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
