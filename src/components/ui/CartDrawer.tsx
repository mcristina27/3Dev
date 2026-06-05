"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, subtotal, itemCount } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(110,46,52,0.18)", backdropFilter: "blur(4px)" }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed right-0 top-0 bottom-0 z-50 flex flex-col w-full max-w-md"
            style={{
              background:          "rgba(250,240,232,0.97)",
              backdropFilter:      "blur(24px)",
              WebkitBackdropFilter:"blur(24px)",
              borderLeft:          "1px solid rgba(180,108,114,0.22)",
              boxShadow:           "-8px 0 48px rgba(110,46,52,0.12)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: "1px solid rgba(180,108,114,0.15)" }}
            >
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} style={{ color: "#6E2E34" }} />
                <h2 className="font-black text-lg" style={{ color: "#6E2E34" }}>
                  Mi carrito
                </h2>
                {itemCount > 0 && (
                  <span
                    className="text-xs font-black px-2 py-0.5 rounded-full"
                    style={{ background: "#B46C72", color: "white" }}
                  >
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ background: "rgba(110,46,52,0.08)", color: "#B46C72" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(110,46,52,0.16)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(110,46,52,0.08)")}
              >
                <X size={15} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={52} strokeWidth={1.1} style={{ color: "#FFC8CB" }} />
                  <p className="font-bold text-sm" style={{ color: "#B46C72" }}>
                    Tu carrito está vacío
                  </p>
                  <Link
                    href="/catalogo"
                    onClick={closeCart}
                    className="text-xs font-bold underline"
                    style={{ color: "#5E7B9B" }}
                  >
                    Ver catálogo →
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    className="flex gap-3 p-3 rounded-2xl"
                    style={{
                      background: "rgba(255,255,255,0.70)",
                      border:     "1px solid rgba(180,108,114,0.14)",
                    }}
                  >
                    {/* Imagen placeholder */}
                    <div
                      className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, rgba(255,200,203,0.30), rgba(180,108,114,0.15))",
                      }}
                    >
                      {item.product.images[0]
                        ? <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover rounded-xl" />
                        : <ShoppingBag size={22} strokeWidth={1.3} style={{ color: "#FFC8CB" }} />
                      }
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-sm leading-tight truncate" style={{ color: "#6E2E34" }}>
                        {item.product.name}
                      </p>
                      <p className="text-xs font-semibold mt-0.5" style={{ color: "#B46C72" }}>
                        S/ {item.product.price} c/u
                      </p>

                      {/* Qty + remove */}
                      <div className="flex items-center justify-between mt-2">
                        <div
                          className="flex items-center gap-1 rounded-full px-1 py-0.5"
                          style={{ background: "rgba(245,230,209,0.80)", border: "1px solid rgba(180,108,114,0.20)" }}
                        >
                          <button
                            onClick={() => updateQty(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ color: "#6E2E34" }}
                          >
                            <Minus size={11} />
                          </button>
                          <span className="font-black text-xs w-5 text-center" style={{ color: "#6E2E34" }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ color: "#6E2E34" }}
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm" style={{ color: "#5E7B9B" }}>
                            S/ {(item.product.price! * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                            style={{ color: "rgba(110,46,52,0.40)" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#6E2E34")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(110,46,52,0.40)")}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                className="px-6 py-5 flex flex-col gap-3"
                style={{ borderTop: "1px solid rgba(180,108,114,0.15)" }}
              >
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold" style={{ color: "#B46C72" }}>Subtotal</span>
                  <span className="font-black text-xl" style={{ color: "#6E2E34" }}>
                    S/ {subtotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs" style={{ color: "rgba(110,46,52,0.45)" }}>
                  Envío calculado en el checkout · Lima y provincias
                </p>

                {/* CTA */}
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-sm"
                    style={{
                      background: "linear-gradient(135deg, #7B9EBF, #5E7B9B)",
                      color:      "white",
                      boxShadow:  "0 4px 16px rgba(94,123,155,0.30)",
                    }}
                  >
                    Ir al checkout <ArrowRight size={15} />
                  </Link>
                </motion.div>

                <Link
                  href="/catalogo"
                  onClick={closeCart}
                  className="text-center text-xs font-bold"
                  style={{ color: "#B46C72" }}
                >
                  Seguir comprando
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
