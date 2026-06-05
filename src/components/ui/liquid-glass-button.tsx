"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ── SVG filter — liquid glass distortion ── */
function GlassFilter() {
  return (
    <svg className="hidden" aria-hidden>
      <defs>
        <filter
          id="liquid-glass-btn"
          x="0%" y="0%" width="100%" height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

/* ── LiquidButton variants ── */
const liquidButtonVariants = cva(
  "inline-flex items-center transition-all justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full text-sm font-semibold disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:scale-105 duration-300 text-[#6E2E34]",
        ghost:   "bg-transparent text-[#6E2E34]",
      },
      size: {
        sm:  "h-9  px-5",
        md:  "h-10 px-6",
        lg:  "h-12 px-8 text-base",
        xl:  "h-14 px-10 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size:    "lg",
    },
  }
);

export interface LiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidButtonVariants> {
  asChild?: boolean;
}

const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <>
        <Comp
          ref={ref}
          data-slot="button"
          className={cn(
            "relative",
            liquidButtonVariants({ variant, size, className })
          )}
          {...props}
        >
          {/* Capa glass con backdrop filter */}
          <div
            className="absolute inset-0 -z-10 overflow-hidden rounded-full"
            style={{ backdropFilter: 'url("#liquid-glass-btn")' }}
          />

          {/* Sombras internas — efecto liquid glass */}
          <div
            className="absolute inset-0 z-0 rounded-full transition-all"
            style={{
              boxShadow: [
                "0 0 6px rgba(0,0,0,0.03)",
                "0 2px 6px rgba(0,0,0,0.08)",
                "inset 3px 3px 0.5px -3px rgba(0,0,0,0.9)",
                "inset -3px -3px 0.5px -3px rgba(0,0,0,0.85)",
                "inset 1px 1px 1px -0.5px rgba(0,0,0,0.6)",
                "inset -1px -1px 1px -0.5px rgba(0,0,0,0.6)",
                "inset 0 0 6px 6px rgba(110,46,52,0.06)",
                "inset 0 0 2px 2px rgba(180,108,114,0.08)",
                "0 0 12px rgba(255,200,203,0.20)",
              ].join(","),
            }}
          />

          {/* Tinte rosado suave */}
          <div
            className="absolute inset-0 z-0 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,200,203,0.18) 0%, rgba(180,108,114,0.10) 50%, rgba(245,230,209,0.15) 100%)",
            }}
          />

          {/* Borde luminoso interior */}
          <div
            className="absolute inset-0 z-0 rounded-full"
            style={{
              boxShadow:
                "inset 1px 1px 1px rgba(255,255,255,0.55), inset -1px -1px 1px rgba(255,255,255,0.30)",
            }}
          />

          {/* Contenido */}
          <span className="relative z-10 pointer-events-none">{children}</span>

          <GlassFilter />
        </Comp>
      </>
    );
  }
);

LiquidButton.displayName = "LiquidButton";

export { LiquidButton, liquidButtonVariants };
