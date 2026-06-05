"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Typewriter } from "@/components/ui/typewriter";
import { GlassFilter, GlassButton } from "@/components/ui/liquid-glass";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

/* ── Entrada suave ── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fade = (delay = 0): any => ({
  initial:    { opacity: 0, y: 22 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.7, delay, ease: "easeOut" },
});

/* Palabras que rotan en el typewriter */
const WORDS = [
  "developers",
  "makers",
  "diseñadoras",
  "techlovers",
  "builders",
  "creators",
  "gamers",
];

export default function Hero() {
  return (
    <BackgroundGradientAnimation
      containerClassName="min-h-screen"
      firstColor   ="255, 225, 227"   /* pink muy claro         */
      secondColor  ="225, 170, 174"   /* rose gold aclarado     */
      thirdColor   ="200, 140, 148"   /* puce suavizado         */
      fourthColor  ="252, 243, 234"   /* champagne casi blanco  */
      fifthColor   ="255, 218, 221"   /* pink suave             */
      pointerColor ="220, 158, 165"   /* rose gold suave        */
      blendingValue="soft-light"
      size="60%"
      interactive={true}
    >
      <section
        className="relative flex flex-col items-center justify-center min-h-screen px-6"
        style={{ paddingTop: "120px", paddingBottom: "80px" }}
      >
        <GlassFilter />

        <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center gap-8">

          {/* ── Headline con Typewriter ── */}
          <motion.div {...fade(0.2)} className="flex flex-col items-center gap-0 w-full">

            {/* Línea 1 */}
            <p
              className="leading-none tracking-tight font-light"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(3rem, 8.5vw, 7rem)",
                color: "#6E2E34",
                opacity: 0.9,
              }}
            >
              Impresiones 3D
            </p>

            {/* Línea 2 */}
            <p
              className="leading-none tracking-tight font-extralight"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(3rem, 8.5vw, 7rem)",
                color: "#B46C72",
                opacity: 0.80,
              }}
            >
              inspiradas en
            </p>

            {/* Línea 3 — typewriter */}
            <div
              className="leading-none tracking-tight font-light"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(3rem, 8.5vw, 7rem)",
              }}
            >
              <Typewriter
                text={WORDS}
                speed={65}
                deleteSpeed={35}
                waitTime={1800}
                cursorChar="_"
                cursorClassName="ml-0.5"
                className="font-light"
                style={{ color: "#6E2E34" }}
              />
            </div>
          </motion.div>

          {/* Subtítulo */}
          <motion.p {...fade(0.4)}
            className="max-w-md text-base md:text-lg leading-relaxed"
            style={{
              color: "#B46C72",
              fontFamily: "var(--font-nunito)",
              fontWeight: 500,
            }}
          >
            Figuras decorativas, piezas funcionales y diseños a medida.{" "}
            <span style={{ fontWeight: 700, color: "#6E2E34" }}>Precisión de 0.1 mm</span>,
            materiales premium, envíos a todo el país.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fade(0.52)} className="flex flex-col sm:flex-row items-center gap-4">
            <LiquidButton size="lg">
              Ver catálogo
            </LiquidButton>
            <LiquidButton size="lg">
              Cotizar mi pieza
            </LiquidButton>
          </motion.div>
        </div>
      </section>
    </BackgroundGradientAnimation>
  );
}
