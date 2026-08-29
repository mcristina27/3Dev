"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const STARS = [
  { top: "10%", left: "14%", size: 22, color: "#FFE500", duration: 5, delay: 0, reverse: false },
  { bottom: "12%", right: "15%", size: 20, color: "#FFFFFF", duration: 4.5, delay: 0, reverse: true },
  { top: "20%", right: "20%", size: 14, color: "#FFFFFF", duration: 3.8, delay: 0.4, reverse: false },
  { top: "8%", right: "10%", size: 26, color: "#FFE500", duration: 5.4, delay: 0.9, reverse: true },
  { bottom: "8%", left: "10%", size: 24, color: "#FFE500", duration: 4.8, delay: 0.2, reverse: false },
  { bottom: "22%", left: "22%", size: 12, color: "#FFFFFF", duration: 3.5, delay: 1.2, reverse: true },
  { top: "38%", left: "7%", size: 16, color: "#FFFFFF", duration: 4.2, delay: 0.6, reverse: false },
  { top: "44%", right: "7%", size: 18, color: "#FFE500", duration: 4.6, delay: 1.5, reverse: true },
  { top: "65%", left: "16%", size: 14, color: "#FFE500", duration: 3.9, delay: 0.8, reverse: false },
  { top: "70%", right: "24%", size: 20, color: "#FFFFFF", duration: 5.1, delay: 0.3, reverse: true },
  { top: "4%", left: "38%", size: 13, color: "#FFFFFF", duration: 4, delay: 1.1, reverse: false },
  { bottom: "5%", right: "38%", size: 15, color: "#FFE500", duration: 3.6, delay: 0.5, reverse: true },
] as const;

function InstagramIcon({ size = 18, color = "#0A0A0A" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none" />
    </svg>
  );
}

export default function ConocenosPage() {
  const [qrOpen, setQrOpen] = useState(false);

  return (
    <main
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
      style={{ background: "#0A0A0A" }}
    >
      {STARS.map((s, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute select-none"
          style={{
            top: "top" in s ? s.top : undefined,
            bottom: "bottom" in s ? s.bottom : undefined,
            left: "left" in s ? s.left : undefined,
            right: "right" in s ? s.right : undefined,
            fontSize: s.size,
            color: s.color,
          }}
          animate={{
            y: s.reverse ? [0, 10, 0] : [0, -10, 0],
            rotate: s.reverse ? [0, -12, 0] : [0, 12, 0],
          }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          &#10022;
        </motion.span>
      ))}

      <div className="relative w-[360px] max-w-[86vw]">
        {/* White splash peeking from behind */}
        <motion.div
          className="absolute rounded-[36px]"
          style={{ inset: "-18px -12px -22px -12px", background: "#FFFFFF", transformOrigin: "20% 70%" }}
          initial={{ opacity: 0, y: 160, rotate: 4, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, rotate: 6, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.95 }}
        />

        {/* The yellow card itself */}
        <motion.div
          className="relative flex flex-col items-center gap-[22px] rounded-[30px] px-[30px] pb-[30px] pt-[34px]"
          style={{
            background: "#FFE500",
            border: "2px solid #0A0A0A",
            boxShadow: "7px 7px 0px rgba(10,10,10,0.25)",
            transformOrigin: "20% 70%",
          }}
          initial={{ opacity: 0, y: 140, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: -4 }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.9, delay: 0.15 }}
          whileHover={{ rotate: -4, x: -2, y: -2 }}
        >
          <Image
            src="/assets/conocenos/logo-3devlabs-black.png"
            alt="3Dev Labs"
            width={195}
            height={188}
            style={{ width: 195, height: "auto" }}
            priority
          />

          <motion.button
            type="button"
            onClick={() => setQrOpen(true)}
            aria-label="Ampliar código QR de Instagram"
            className="cursor-pointer rounded-[20px] border-none p-4"
            style={{ background: "#FFFFFF", boxShadow: "0 0 0 2px #0A0A0A inset" }}
            animate={{ boxShadow: ["0 0 0 0 rgba(10,10,10,0.14)", "0 0 0 10px rgba(10,10,10,0)", "0 0 0 0 rgba(10,10,10,0.14)"] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/assets/conocenos/qr-instagram.png"
              alt="Código QR hacia Instagram de 3Dev"
              width={222}
              height={222}
              className="block rounded-[12px]"
            />
          </motion.button>

          <div className="flex items-center gap-2 text-[17px] font-bold" style={{ color: "#0A0A0A" }}>
            <InstagramIcon size={18} color="#0A0A0A" />
            @3dev_labs
          </div>
        </motion.div>
      </div>

      {/* Enlarged QR overlay */}
      <AnimatePresence>
        {qrOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(10,10,10,0.72)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setQrOpen(false)}
          >
            <motion.div
              className="flex flex-col items-center gap-5 rounded-[28px] px-11 py-10"
              style={{ background: "#FFFFFF", border: "2px solid #0A0A0A", boxShadow: "8px 8px 0px #FFE500" }}
              initial={{ opacity: 0, scale: 0.82, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.82, y: 14 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src="/assets/conocenos/qr-instagram.png"
                alt="Código QR ampliado hacia Instagram de 3Dev"
                width={420}
                height={420}
                style={{ width: "min(58vw, 420px)", height: "min(58vw, 420px)" }}
                className="rounded-[16px]"
              />
              <div className="flex items-center gap-2 text-lg font-bold" style={{ color: "#0A0A0A" }}>
                <InstagramIcon size={18} color="#0A0A0A" />
                instagram.com/3dev_labs
              </div>
              <button
                type="button"
                onClick={() => setQrOpen(false)}
                className="flex cursor-pointer items-center gap-1.5 rounded-full px-[22px] py-[9px] text-[13px] font-bold text-white"
                style={{ background: "#0A0A0A", border: "2px solid #0A0A0A" }}
              >
                <X size={14} /> Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
