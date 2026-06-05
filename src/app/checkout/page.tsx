"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, ShoppingBag, Check,
  MapPin, User, Phone, Mail, CreditCard,
  Lock, Package2, Truck,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Navbar3Dev } from "@/components/ui/navbar-3dev";
import GridGlowBackground from "@/components/ui/grid-glow-background";

/* ── Tipos ───────────────────────────────────────────────── */
interface ShippingData {
  firstName: string;
  lastName:  string;
  email:     string;
  phone:     string;
  address:   string;
  district:  string;
  city:      string;
  reference: string;
}

/* ── Culqi types (global) ────────────────────────────────── */
declare global {
  interface Window {
    Culqi?: {
      publicKey: string;
      settings:  (opts: Record<string, unknown>) => void;
      open:      () => void;
      close:     () => void;
      token?:    { id: string; email: string };
      error?:    { merchant_message: string };
    };
    culqi?: () => void;
  }
}

const CULQI_PUBLIC_KEY = process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY ?? "pk_test_TU_LLAVE_AQUI";

const STEPS = ["Resumen", "Envío", "Pago"];

const DISTRITOS_LIMA = [
  "Miraflores","San Isidro","Barranco","Surco","San Borja",
  "La Molina","Jesús María","Lince","Magdalena","Pueblo Libre",
  "San Miguel","Breña","Cercado de Lima","La Victoria","San Luis",
  "Ate","El Agustino","Santa Anita","Comas","Los Olivos",
  "San Juan de Lurigancho","Villa El Salvador","Villa María del Triunfo",
  "Chorrillos","Surquillo","Independencia","Callao","Otro",
];

/* ── Indicador de pasos ──────────────────────────────────── */
function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {STEPS.map((label, i) => {
        const done   = i < current;
        const active = i === current;
        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-black text-xs transition-all duration-300"
                style={{
                  background: done   ? "#B46C72"
                            : active ? "linear-gradient(135deg,#7B9EBF,#5E7B9B)"
                            : "rgba(255,255,255,0.60)",
                  color:  done || active ? "white" : "rgba(110,46,52,0.40)",
                  border: done || active ? "none" : "1px solid rgba(180,108,114,0.25)",
                  boxShadow: active ? "0 4px 12px rgba(94,123,155,0.30)" : "none",
                }}
              >
                {done ? <Check size={13} /> : i + 1}
              </div>
              <span
                className="text-[10px] font-bold"
                style={{ color: active ? "#5E7B9B" : done ? "#B46C72" : "rgba(110,46,52,0.40)" }}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="h-px w-12 mb-4 transition-all duration-500"
                style={{ background: i < current ? "#B46C72" : "rgba(180,108,114,0.22)" }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ── Campo de formulario ─────────────────────────────────── */
function Field({
  label, icon: Icon, type = "text", value, onChange, required, placeholder, children,
}: {
  label: string;
  icon?: React.ElementType;
  type?: string;
  value?: string;
  onChange?: (v: string) => void;
  required?: boolean;
  placeholder?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-black tracking-wide" style={{ color: "#6E2E34" }}>
        {label} {required && <span style={{ color: "#B46C72" }}>*</span>}
      </label>
      <div
        className="flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all"
        style={{
          background: "rgba(255,255,255,0.75)",
          border:     "1px solid rgba(180,108,114,0.25)",
        }}
      >
        {Icon && <Icon size={15} style={{ color: "#B46C72", flexShrink: 0 }} />}
        {children ?? (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            required={required}
            className="flex-1 bg-transparent outline-none text-sm font-medium"
            style={{ color: "#6E2E34" }}
          />
        )}
      </div>
    </div>
  );
}

/* ── Paso 1: Resumen ─────────────────────────────────────── */
function StepResumen({ onNext }: { onNext: () => void }) {
  const { items, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag size={52} strokeWidth={1.1} className="mx-auto mb-4" style={{ color: "#FFC8CB" }} />
        <p className="font-bold" style={{ color: "#B46C72" }}>Tu carrito está vacío</p>
        <Link href="/catalogo" className="text-sm font-bold underline mt-2 block" style={{ color: "#5E7B9B" }}>
          Ver catálogo →
        </Link>
      </div>
    );
  }

  const shipping = subtotal >= 150 ? 0 : 15;

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <div
          key={item.product.id}
          className="flex gap-3 p-4 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(180,108,114,0.14)" }}
        >
          <div
            className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,rgba(255,200,203,0.30),rgba(180,108,114,0.15))" }}
          >
            {item.product.images[0]
              ? <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover rounded-xl" />
              : <ShoppingBag size={22} strokeWidth={1.3} style={{ color: "#FFC8CB" }} />
            }
          </div>
          <div className="flex-1">
            <p className="font-black text-sm" style={{ color: "#6E2E34" }}>{item.product.name}</p>
            <p className="text-xs font-semibold mt-0.5" style={{ color: "#B46C72" }}>
              {item.product.material} · {item.product.size}
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs font-semibold" style={{ color: "rgba(110,46,52,0.50)" }}>
                {item.quantity} × S/ {item.product.price}
              </span>
              <span className="font-black text-sm" style={{ color: "#5E7B9B" }}>
                S/ {(item.product.price! * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Totales */}
      <div
        className="rounded-2xl p-4 flex flex-col gap-2"
        style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(180,108,114,0.14)" }}
      >
        <div className="flex justify-between text-sm">
          <span className="font-semibold" style={{ color: "#B46C72" }}>Subtotal</span>
          <span className="font-bold" style={{ color: "#6E2E34" }}>S/ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-semibold flex items-center gap-1" style={{ color: "#B46C72" }}>
            <Truck size={12} /> Envío
          </span>
          <span className="font-bold" style={{ color: shipping === 0 ? "#4CAF50" : "#6E2E34" }}>
            {shipping === 0 ? "GRATIS 🎉" : `S/ ${shipping}`}
          </span>
        </div>
        {subtotal < 150 && (
          <p className="text-xs" style={{ color: "rgba(110,46,52,0.45)" }}>
            Agrega S/ {(150 - subtotal).toFixed(2)} más para envío gratis
          </p>
        )}
        <div
          className="flex justify-between pt-2 mt-1"
          style={{ borderTop: "1px solid rgba(180,108,114,0.15)" }}
        >
          <span className="font-black" style={{ color: "#6E2E34" }}>Total</span>
          <span className="font-black text-xl" style={{ color: "#6E2E34" }}>
            S/ {(subtotal + shipping).toFixed(2)}
          </span>
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-sm"
        style={{
          background: "linear-gradient(135deg,#7B9EBF,#5E7B9B)",
          color:      "white",
          boxShadow:  "0 4px 16px rgba(94,123,155,0.30)",
        }}
      >
        Continuar <ArrowRight size={15} />
      </motion.button>
    </div>
  );
}

/* ── Paso 2: Datos de envío ──────────────────────────────── */
function StepEnvio({
  data, setData, onNext, onBack,
}: {
  data:    ShippingData;
  setData: React.Dispatch<React.SetStateAction<ShippingData>>;
  onNext:  () => void;
  onBack:  () => void;
}) {
  const field = (key: keyof ShippingData) => ({
    value:    data[key],
    onChange: (v: string) => setData((d) => ({ ...d, [key]: v })),
  });

  const valid = data.firstName && data.lastName && data.email
             && data.phone && data.address && data.district && data.city;

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (valid) onNext(); }}
      className="flex flex-col gap-4"
    >
      <div className="grid grid-cols-2 gap-3">
        <Field label="Nombre" icon={User} required placeholder="Ana" {...field("firstName")} />
        <Field label="Apellido" required placeholder="García" {...field("lastName")} />
      </div>
      <Field label="Correo electrónico" icon={Mail} type="email" required placeholder="ana@email.com" {...field("email")} />
      <Field label="Teléfono / WhatsApp" icon={Phone} type="tel" required placeholder="+51 999 999 999" {...field("phone")} />
      <Field label="Dirección" icon={MapPin} required placeholder="Jr. Las Flores 123, Dpto 4B" {...field("address")} />

      <div className="grid grid-cols-2 gap-3">
        {/* Distrito */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-black tracking-wide" style={{ color: "#6E2E34" }}>
            Distrito <span style={{ color: "#B46C72" }}>*</span>
          </label>
          <div
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
            style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(180,108,114,0.25)" }}
          >
            <MapPin size={15} style={{ color: "#B46C72", flexShrink: 0 }} />
            <select
              value={data.district}
              onChange={(e) => setData((d) => ({ ...d, district: e.target.value }))}
              required
              className="flex-1 bg-transparent outline-none text-sm font-medium"
              style={{ color: data.district ? "#FFD5D8" : "rgba(110,46,52,0.40)" }}
            >
              <option value="">Seleccionar</option>
              {DISTRITOS_LIMA.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        <Field label="Ciudad" required placeholder="Lima" {...field("city")} />
      </div>

      <Field label="Referencia" placeholder="Frente al parque, color azul..." {...field("reference")} />

      <div className="flex gap-3 mt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-3 rounded-full text-sm font-bold border transition-colors"
          style={{ borderColor: "rgba(180,108,114,0.30)", color: "#B46C72" }}
        >
          <ArrowLeft size={14} /> Volver
        </button>
        <motion.button
          type="submit"
          whileTap={{ scale: 0.98 }}
          disabled={!valid}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-bold text-sm transition-opacity"
          style={{
            background: "linear-gradient(135deg,#7B9EBF,#5E7B9B)",
            color:      "white",
            opacity:    valid ? 1 : 0.5,
          }}
        >
          Ir al pago <ArrowRight size={15} />
        </motion.button>
      </div>
    </form>
  );
}

/* ── Paso 3: Pago con Culqi ──────────────────────────────── */
function StepPago({
  shipping, onBack, onSuccess,
}: {
  shipping:  ShippingData;
  onBack:    () => void;
  onSuccess: () => void;
}) {
  const { subtotal, clearCart } = useCart();
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const shippingFee = subtotal >= 150 ? 0 : 15;
  const total       = subtotal + shippingFee;

  /* Registrar el callback global que Culqi llama cuando el usuario paga */
  useEffect(() => {
    window.culqi = async () => {
      setError("");
      if (window.Culqi?.token) {
        const token = window.Culqi.token.id;
        setLoading(true);
        try {
          /* Enviar token al backend para procesar el cobro */
          const res = await fetch("/api/payment", {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify({
              token,
              amount:   Math.round(total * 100), // en céntimos
              email:    shipping.email,
              shipping,
            }),
          });
          const data = await res.json();
          if (data.success) {
            clearCart();
            onSuccess();
          } else {
            setError(data.message ?? "Hubo un problema procesando el pago.");
          }
        } catch {
          setError("Error de conexión. Intenta nuevamente.");
        } finally {
          setLoading(false);
          window.Culqi?.close();
        }
      } else if (window.Culqi?.error) {
        setError(window.Culqi.error.merchant_message);
      }
    };
    return () => { window.culqi = undefined; };
  }, [total, shipping, clearCart, onSuccess]);

  function handlePagar() {
    if (!window.Culqi) {
      setError("El sistema de pago no está listo. Recarga la página.");
      return;
    }
    setError("");
    window.Culqi.publicKey = CULQI_PUBLIC_KEY;
    window.Culqi.settings({
      title:       "3Dev",
      currency:    "PEN",
      description: `Pedido 3Dev — ${Math.round(total)} soles`,
      amount:      Math.round(total * 100),
      order:       `order-${Date.now()}`,
    });
    window.Culqi.open();
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Resumen de envío */}
      <div
        className="p-4 rounded-2xl flex flex-col gap-2"
        style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(180,108,114,0.14)" }}
      >
        <p className="font-black text-xs tracking-wide uppercase" style={{ color: "#B46C72" }}>
          Enviar a
        </p>
        <p className="font-bold text-sm" style={{ color: "#6E2E34" }}>
          {shipping.firstName} {shipping.lastName}
        </p>
        <p className="text-sm" style={{ color: "#B46C72" }}>
          {shipping.address}, {shipping.district}, {shipping.city}
        </p>
        <p className="text-xs" style={{ color: "rgba(110,46,52,0.50)" }}>
          {shipping.phone} · {shipping.email}
        </p>
      </div>

      {/* Total */}
      <div
        className="p-4 rounded-2xl"
        style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(180,108,114,0.14)" }}
      >
        <div className="flex justify-between items-center">
          <span className="font-black text-lg" style={{ color: "#6E2E34" }}>Total a pagar</span>
          <span className="font-black text-2xl" style={{ color: "#5E7B9B" }}>
            S/ {total.toFixed(2)}
          </span>
        </div>
        <p className="text-xs mt-1" style={{ color: "rgba(110,46,52,0.45)" }}>
          Incluye envío S/ {shippingFee === 0 ? "0 (gratis)" : shippingFee}
        </p>
      </div>

      {/* Seguridad */}
      <div
        className="flex items-center gap-3 p-3 rounded-xl"
        style={{ background: "rgba(94,123,155,0.08)", border: "1px solid rgba(94,123,155,0.20)" }}
      >
        <Lock size={16} style={{ color: "#5E7B9B", flexShrink: 0 }} />
        <p className="text-xs font-semibold" style={{ color: "#5E7B9B" }}>
          Pago seguro procesado por <strong>Culqi</strong>. Tus datos están protegidos con cifrado SSL.
        </p>
      </div>

      {/* Métodos aceptados */}
      <div className="flex items-center gap-2 flex-wrap">
        {["Visa", "Mastercard", "Amex", "Diners"].map((m) => (
          <span
            key={m}
            className="text-xs font-bold px-3 py-1 rounded-lg"
            style={{ background: "rgba(255,255,255,0.70)", border: "1px solid rgba(180,108,114,0.18)", color: "#6E2E34" }}
          >
            {m}
          </span>
        ))}
      </div>

      {error && (
        <p className="text-sm font-bold text-center rounded-xl px-4 py-3"
          style={{ background: "rgba(255,80,80,0.08)", border: "1px solid rgba(255,80,80,0.20)", color: "#c0392b" }}>
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-3 rounded-full text-sm font-bold border"
          style={{ borderColor: "rgba(180,108,114,0.30)", color: "#B46C72" }}
        >
          <ArrowLeft size={14} /> Volver
        </button>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handlePagar}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-bold text-sm"
          style={{
            background: loading ? "rgba(94,123,155,0.50)" : "linear-gradient(135deg,#7B9EBF,#5E7B9B)",
            color:      "white",
            boxShadow:  "0 4px 16px rgba(94,123,155,0.30)",
          }}
        >
          <CreditCard size={16} />
          {loading ? "Procesando..." : `Pagar S/ ${total.toFixed(2)}`}
        </motion.button>
      </div>
    </div>
  );
}

/* ── Pantalla de éxito ───────────────────────────────────── */
function SuccessScreen({ shipping }: { shipping: ShippingData }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center gap-5 py-10"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{ background: "linear-gradient(135deg,#B46C72,#6E2E34)" }}
      >
        <Check size={36} color="white" strokeWidth={2.5} />
      </motion.div>
      <div>
        <h2 className="font-black text-2xl" style={{ color: "#6E2E34" }}>¡Pedido confirmado!</h2>
        <p className="text-sm font-semibold mt-2" style={{ color: "#B46C72" }}>
          Gracias, {shipping.firstName}. Te enviamos la confirmación a {shipping.email}
        </p>
      </div>
      <div
        className="w-full p-4 rounded-2xl flex flex-col gap-2 text-left"
        style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(180,108,114,0.15)" }}
      >
        <div className="flex items-center gap-2">
          <Package2 size={15} style={{ color: "#B46C72" }} />
          <p className="text-sm font-bold" style={{ color: "#6E2E34" }}>¿Qué sigue?</p>
        </div>
        <ul className="flex flex-col gap-1.5 pl-1">
          {[
            "Recibirás un correo con el resumen de tu pedido",
            "Empezamos la impresión dentro de las próximas 24 h",
            "Te avisamos cuando tu pedido salga hacia ti 🚀",
          ].map((step) => (
            <li key={step} className="text-xs font-semibold flex items-start gap-2" style={{ color: "#B46C72" }}>
              <span style={{ color: "#FFC8CB" }}>✦</span> {step}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-3 w-full">
        <Link
          href="/"
          className="flex-1 text-center py-3 rounded-full text-sm font-bold border"
          style={{ borderColor: "rgba(180,108,114,0.30)", color: "#B46C72" }}
        >
          Inicio
        </Link>
        <Link
          href="/catalogo"
          className="flex-1 text-center py-3 rounded-full text-sm font-bold"
          style={{ background: "linear-gradient(135deg,#7B9EBF,#5E7B9B)", color: "white" }}
        >
          Seguir comprando
        </Link>
      </div>
    </motion.div>
  );
}

/* ── Página principal ────────────────────────────────────── */
export default function CheckoutPage() {
  const [step,    setStep]    = useState(0);
  const [success, setSuccess] = useState(false);
  const [shipping, setShipping] = useState<ShippingData>({
    firstName: "", lastName: "", email: "",
    phone: "", address: "", district: "", city: "Lima", reference: "",
  });

  return (
    <>
      {/* Culqi script — carga una sola vez */}
      <Script src="https://checkout.culqi.com/js/v4" strategy="afterInteractive" />

      <GridGlowBackground
        backgroundColor="#F5E6D1"
        gridColor="rgba(180,108,114,0.12)"
        gridSize={50}
        glowColors={["#B46C72", "#8E4A52", "#C97E87", "#6E2E34"]}
        glowCount={10}
        centerContent={false}
      >
        <Navbar3Dev />

        <div className="pt-28 pb-16 px-4">
          <div className="max-w-lg mx-auto">

            {/* Back */}
            {!success && (
              <Link
                href={step === 0 ? "/catalogo" : "#"}
                onClick={step > 0 ? (e) => { e.preventDefault(); setStep((s) => s - 1); } : undefined}
                className="inline-flex items-center gap-1.5 text-xs font-bold mb-6 transition-colors"
                style={{ color: "#B46C72" }}
              >
                <ArrowLeft size={13} /> {step === 0 ? "Volver al catálogo" : "Paso anterior"}
              </Link>
            )}

            {/* Card principal */}
            <div
              className="rounded-3xl p-6 sm:p-8"
              style={{
                background:          "rgba(255,255,255,0.72)",
                backdropFilter:      "blur(24px)",
                WebkitBackdropFilter:"blur(24px)",
                border:              "1px solid rgba(180,108,114,0.20)",
                boxShadow:           "0 8px 48px rgba(110,46,52,0.08)",
              }}
            >
              {success ? (
                <SuccessScreen shipping={shipping} />
              ) : (
                <>
                  <StepIndicator current={step} />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0  }}
                      exit={{ opacity: 0,   x: -20 }}
                      transition={{ duration: 0.25 }}
                    >
                      {step === 0 && <StepResumen onNext={() => setStep(1)} />}
                      {step === 1 && (
                        <StepEnvio
                          data={shipping} setData={setShipping}
                          onNext={() => setStep(2)} onBack={() => setStep(0)}
                        />
                      )}
                      {step === 2 && (
                        <StepPago
                          shipping={shipping}
                          onBack={() => setStep(1)}
                          onSuccess={() => setSuccess(true)}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </>
              )}
            </div>
          </div>
        </div>
      </GridGlowBackground>
    </>
  );
}
