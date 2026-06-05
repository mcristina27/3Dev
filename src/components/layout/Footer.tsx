"use client";

import { Camera, AtSign, Mail, Globe } from "lucide-react";
import { Logo3Dev } from "@/components/ui/Logo3Dev";

const socials = [
  { icon: Camera, label: "Instagram", href: "#" },
  { icon: AtSign, label: "TikTok",    href: "#" },
  { icon: Mail,   label: "Email",     href: "#" },
  { icon: Globe,  label: "Web",       href: "#" },
];

export default function Footer() {
  return (
    <footer
      className="w-full"
      style={{
        background:  "linear-gradient(to bottom, #F2D8DA, #EBC8CC)",
        borderTop:   "1px solid rgba(110,46,52,0.12)",
      }}
    >
      {/* ── Sección principal centrada ── */}
      <div className="max-w-3xl mx-auto px-6 py-14 flex flex-col items-center gap-5">

        {/* Logo + nombre */}
        <div className="flex flex-col items-center gap-2">
          <Logo3Dev size={24} showText={false} />
          <span
            className="font-black text-2xl tracking-tight"
            style={{ color: "#6E2E34", fontFamily: "var(--font-dm-sans)" }}
          >
            3<span style={{ color: "#B46C72" }}>Dev</span>
          </span>
        </div>

        {/* Tagline */}
        <p className="text-center text-sm leading-relaxed max-w-xs font-medium"
          style={{ color: "rgba(110,46,52,0.58)" }}>
          Estudio de impresión 3D en Lima. Figuras, decoración y piezas a medida.
        </p>

        {/* Redes sociales */}
        <div className="flex items-center gap-3 mt-1">
          {socials.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "rgba(110,46,52,0.08)", color: "#B46C72" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(110,46,52,0.16)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#6E2E34";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(110,46,52,0.08)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#B46C72";
              }}
            >
              <Icon size={16} strokeWidth={1.75} />
            </a>
          ))}
        </div>
      </div>

      {/* ── Barra inferior copyright ── */}
      <div style={{ borderTop: "1px solid rgba(110,46,52,0.10)" }}>
        <div className="max-w-3xl mx-auto px-6 py-4 text-center">
          <p className="text-xs font-medium" style={{ color: "rgba(110,46,52,0.45)" }}>
            © {new Date().getFullYear()} 3Dev · Lima, Perú · Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
