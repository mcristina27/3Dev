"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary:   "text-white hover:brightness-110",
  secondary: "text-white hover:brightness-110",
  outline:   "border-2 text-[#B46C72] hover:text-white",
  ghost:     "text-[#6E2E34] hover:bg-black/5",
};

const variantStyles: Record<Variant, React.CSSProperties> = {
  primary:   { background: "linear-gradient(135deg, #7B9EBF, #5E7B9B, #3D5A7A)" },
  secondary: { background: "#5E7B9B" },
  outline:   { borderColor: "#B46C72" },
  ghost:     {},
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-2.5 text-sm gap-2",
  lg: "px-8 py-3.5 text-base gap-2.5",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={[
          "inline-flex items-center justify-center font-bold rounded-full transition-all duration-200 cursor-pointer select-none",
          variants[variant],
          sizes[size],
          className,
        ].join(" ")}
        style={variantStyles[variant]}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
