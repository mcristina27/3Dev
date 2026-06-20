"use client";

import Link from "next/link";
import { Logo3Dev } from "@/components/ui/Logo3Dev";
import { MessageCircle, Mail, AtSign } from "lucide-react";

const links = {
  catalogo: [
    { label: "Decoración",    href: "/catalogo?cat=decoracion" },
    { label: "Hogar",         href: "/catalogo?cat=hogar" },
    { label: "Tech Lovers",   href: "/catalogo?cat=tech" },
    { label: "Girly Devs",    href: "/catalogo?cat=girly" },
    { label: "A medida",      href: "/catalogo?cat=custom" },
  ],
  empresa: [
    { label: "Nosotros",  href: "/#nosotros" },
    { label: "Contacto",  href: "/#contacto" },
    { label: "Catálogo",  href: "/catalogo" },
  ],
};

const socials = [
  { icon: <AtSign size={16} />, label: "Instagram", href: "#" },
  { icon: <MessageCircle size={16} />, label: "WhatsApp", href: "https://wa.me/51959297226" },
  { icon: <Mail size={16} />, label: "Email", href: "mailto:hola@3dev.pe" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white">
      {/* CTA band */}
      <div
        className="border-b-2 border-white/10 px-6 py-12 text-center"
      >
        <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-4">¿Tenés una idea?</p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          La imprimimos{" "}
          <span className="px-2 rounded-lg" style={{ background: "#FFE500", color: "#0A0A0A" }}>
            juntos.
          </span>
        </h2>
        <a
          href="https://wa.me/51959297226?text=Hola!+Quiero+cotizar+una+pieza+3D"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold bg-white text-[#0A0A0A] hover:bg-[#FFE500] transition-colors"
          style={{ border: "2px solid white" }}
        >
          <MessageCircle size={16} /> Escribinos por WhatsApp
        </a>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="flex flex-col gap-5 lg:col-span-2">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <Logo3Dev size={28} showText={false} />
            <span className="font-bold text-lg text-white">3Dev</span>
          </Link>
          <p className="text-sm text-white/50 leading-relaxed max-w-xs">
            Impresiones 3D únicas hechas con amor y filamento premium en Lima, Perú.
            Cada pieza, pensada para vos.
          </p>
          <div className="flex items-center gap-2">
            {socials.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:bg-[#FFE500] hover:text-[#0A0A0A] transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.15)" }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Catálogo */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-black uppercase tracking-widest text-white/30">Catálogo</p>
          {links.catalogo.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm font-medium text-white/60 hover:text-[#FFE500] transition-colors w-fit"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Empresa */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-black uppercase tracking-widest text-white/30">Empresa</p>
          {links.empresa.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm font-medium text-white/60 hover:text-[#FFE500] transition-colors w-fit"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <span>© {new Date().getFullYear()} 3Dev. Todos los derechos reservados.</span>
        <span className="flex items-center gap-1">
          Hecho con <span className="text-[#FFE500]">♥</span> en Lima, Perú 🇵🇪
        </span>
      </div>
    </footer>
  );
}
