"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, Home, Layers, Heart, Trophy, Cpu, Flower2, Wrench, X } from "lucide-react";
import { Logo3Dev } from "@/components/ui/Logo3Dev";
import { motion, AnimatePresence } from "framer-motion";

const catalogItems = [
  { title: "Decoración",    icon: <Flower2  className="h-4 w-4" />, href: "/catalogo?cat=decoracion"   },
  { title: "Hogar",         icon: <Home     className="h-4 w-4" />, href: "/catalogo?cat=hogar"        },
  { title: "Tech Lovers",   icon: <Cpu      className="h-4 w-4" />, href: "/catalogo?cat=tech"         },
  { title: "Accesorios",    icon: <Layers   className="h-4 w-4" />, href: "/catalogo?cat=accesorios"   },
  { title: "Girly Devs",    icon: <Heart    className="h-4 w-4" />, href: "/catalogo?cat=girly"        },
  { title: "Coleccionable", icon: <Trophy   className="h-4 w-4" />, href: "/catalogo?cat=coleccionable"},
  { title: "A medida",      icon: <Wrench   className="h-4 w-4" />, href: "/catalogo?cat=custom"       },
];

const navLinks = [
  { title: "Productos", href: "/catalogo" },
  { title: "Nosotros",  href: "/#nosotros" },
  { title: "Contacto",  href: "/#contacto" },
];

export function Navbar3Dev() {
  const [visible, setVisible]       = useState(true);
  const [scrolled, setScrolled]     = useState(false);
  const [catOpen, setCatOpen]       = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y    = window.scrollY;
      const diff = y - lastY.current;
      if (Math.abs(diff) < 4) return;
      setScrolled(y > 20);
      if      (y < 60)   setVisible(true);
      else if (diff > 0) setVisible(false);
      else               setVisible(true);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300"
        style={{
          borderBottom:  scrolled ? "2px solid #0A0A0A" : "2px solid transparent",
          transform:     visible ? "translateY(0)" : "translateY(-100%)",
          opacity:       visible ? 1 : 0,
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* ── Desktop ── */}
          <nav className="hidden lg:flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Logo3Dev size={28} showText={false} />
              <span className="font-bold text-lg tracking-tight text-[#0A0A0A]">
                3Dev
              </span>
            </Link>

            {/* Nav links */}
            <div className="flex items-center gap-1">
              {/* Dropdown Catálogo */}
              <div className="relative" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
                <button
                  className="h-9 px-4 text-sm font-semibold rounded-full transition-colors hover:bg-[#FFE500] text-[#0A0A0A]"
                >
                  Productos ▾
                </button>

                <AnimatePresence>
                  {catOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl overflow-hidden"
                      style={{ border: "2px solid #0A0A0A", boxShadow: "4px 4px 0px #0A0A0A" }}
                    >
                      {catalogItems.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[#0A0A0A] hover:bg-[#FFE500] transition-colors"
                        >
                          {item.icon}
                          {item.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.slice(1).map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="h-9 px-4 flex items-center text-sm font-semibold rounded-full text-[#0A0A0A] hover:bg-[#FFE500] transition-colors"
                >
                  {l.title}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/#contacto"
              className="px-5 py-2 rounded-full text-sm font-bold bg-[#0A0A0A] text-white hover:bg-[#FFE500] hover:text-[#0A0A0A] transition-colors"
              style={{ border: "2px solid #0A0A0A" }}
            >
              Cotizar →
            </Link>
          </nav>

          {/* ── Mobile ── */}
          <div className="flex lg:hidden items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2">
              <Logo3Dev size={26} showText={false} />
              <span className="font-bold text-sm text-[#0A0A0A]">3Dev</span>
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-[#0A0A0A] text-white"
              aria-label="Abrir menú"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-white flex flex-col"
              style={{ borderLeft: "2px solid #0A0A0A" }}
            >
              <div className="flex items-center justify-between p-5" style={{ borderBottom: "2px solid #0A0A0A" }}>
                <span className="font-bold text-base text-[#0A0A0A]">Menú</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col p-4 gap-1 flex-1 overflow-y-auto">
                <p className="text-xs font-black uppercase tracking-widest text-[#555] px-3 py-2">Categorías</p>
                {catalogItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-[#0A0A0A] hover:bg-[#FFE500] transition-colors"
                  >
                    {item.icon} {item.title}
                  </Link>
                ))}

                <div className="h-px bg-[#0A0A0A] my-3" />

                {navLinks.slice(1).map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-3 rounded-xl text-sm font-semibold text-[#0A0A0A] hover:bg-[#FFE500] transition-colors"
                  >
                    {l.title}
                  </Link>
                ))}
              </div>

              <div className="p-4" style={{ borderTop: "2px solid #0A0A0A" }}>
                <Link
                  href="/#contacto"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center w-full py-3 rounded-full font-bold text-sm bg-[#0A0A0A] text-white"
                >
                  Cotizar →
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
