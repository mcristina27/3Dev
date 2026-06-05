"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, Home, Layers, Heart, Trophy, Cpu, Flower2, Wrench, ArrowRight } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo3Dev } from "@/components/ui/Logo3Dev";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

/* ── Categorías con icono para el dropdown ── */
const catalogItems = [
  { title: "Decoración",   description: "Figuras y piezas decorativas",           icon: <Flower2  className="h-4 w-4" />, href: "/catalogo?cat=decoracion"   },
  { title: "Hogar",        description: "Macetas, organizadores y más",            icon: <Home     className="h-4 w-4" />, href: "/catalogo?cat=hogar"        },
  { title: "Tech Lovers",  description: "Soportes, docks y accesorios para setup", icon: <Cpu      className="h-4 w-4" />, href: "/catalogo?cat=tech"         },
  { title: "Accesorios",   description: "Llaveros, porta tarjetas y más",          icon: <Layers   className="h-4 w-4" />, href: "/catalogo?cat=accesorios"   },
  { title: "Girly Devs",   description: "Kawaii, aesthetic y personalizado",       icon: <Heart    className="h-4 w-4" />, href: "/catalogo?cat=girly"        },
  { title: "Coleccionable",description: "Miniaturas, dados y colecciones",         icon: <Trophy   className="h-4 w-4" />, href: "/catalogo?cat=coleccionable"},
  { title: "A medida",     description: "Tu diseño, impreso en 3D",                icon: <Wrench   className="h-4 w-4" />, href: "/catalogo?cat=custom"       },
];

const navLinks = [
  { title: "Inicio",    href: "/"          },
  { title: "Nosotros",  href: "/#nosotros" },
  { title: "Contacto",  href: "/#contacto" },
];

/* ── Sub-item del dropdown ── */
function CatalogItem({ title, description, icon, href }: {
  title: string; description: string; icon: React.ReactNode; href: string;
}) {
  return (
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className="flex items-start gap-3 rounded-xl p-3 transition-colors group"
        style={{ color: "#6E2E34" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(180,108,114,0.10)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <div
          className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(255,200,203,0.30)", color: "#B46C72" }}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm font-bold leading-none mb-1">{title}</p>
          <p className="text-xs font-medium" style={{ color: "#B46C72" }}>{description}</p>
        </div>
      </Link>
    </NavigationMenuLink>
  );
}

/* ── Navbar principal ── */
export function Navbar3Dev() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y    = window.scrollY;
      const diff = y - lastY.current;
      if (Math.abs(diff) < 4) return;
      setScrolled(y > 20);
      if      (y < 60)  setVisible(true);
      else if (diff > 0) setVisible(false);
      else               setVisible(true);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background:          scrolled ? "rgba(245,230,209,0.88)" : "rgba(245,230,209,0.72)",
        backdropFilter:      "blur(20px)",
        WebkitBackdropFilter:"blur(20px)",
        borderBottom:        scrolled ? "1px solid rgba(180,108,114,0.22)" : "1px solid transparent",
        boxShadow:           scrolled ? "0 4px 32px rgba(110,46,52,0.08)" : "none",
        transform:           visible ? "translateY(0)" : "translateY(-100%)",
        opacity:             visible ? 1 : 0,
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* ── Desktop ──────────────────────────────────────── */}
        <nav className="hidden lg:flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Logo3Dev size={30} showText={false} />
            <span className="font-black text-base tracking-tight" style={{ color: "#6E2E34" }}>
              3<span style={{ color: "#B46C72" }}>Dev</span>
            </span>
          </Link>

          {/* Links + dropdown catálogo */}
          <div className="flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>

                {/* Catálogo con dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="h-9 px-4 text-sm font-semibold rounded-full transition-colors"
                    style={{ color: "#6E2E34", background: "transparent" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(180,108,114,0.10)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    Catálogo
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-3 w-[520px]">
                      <div className="grid grid-cols-2 gap-1 mb-3">
                        {catalogItems.map((item) => (
                          <CatalogItem key={item.title} {...item} />
                        ))}
                      </div>
                      <div
                        className="rounded-xl p-3 flex items-center justify-between"
                        style={{ background: "linear-gradient(135deg, rgba(255,200,203,0.25), rgba(180,108,114,0.12))" }}
                      >
                        <div>
                          <p className="text-sm font-black" style={{ color: "#6E2E34" }}>¿No encontrás lo que buscás?</p>
                          <p className="text-xs font-semibold" style={{ color: "#B46C72" }}>Diseñamos piezas 100% a medida</p>
                        </div>
                        <Link
                          href="/catalogo?cat=custom"
                          className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full"
                          style={{ background: "linear-gradient(135deg,#7B9EBF,#5E7B9B)", color: "white" }}
                        >
                          Cotizar <ArrowRight size={11} />
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Links simples */}
                {navLinks.map((l) => (
                  <NavigationMenuItem key={l.href}>
                    <Link
                      href={l.href}
                      className="inline-flex h-9 items-center px-4 text-sm font-semibold rounded-full transition-colors"
                      style={{ color: "#6E2E34" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(180,108,114,0.10)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      {l.title}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Derecha: CTA */}
          <LiquidButton size="sm">Contacto</LiquidButton>
        </nav>

        {/* ── Mobile ───────────────────────────────────────── */}
        <div className="flex lg:hidden items-center justify-between h-14">

          <Link href="/" className="flex items-center gap-2">
            <Logo3Dev size={28} showText={false} />
            <span className="font-black text-sm tracking-tight" style={{ color: "#6E2E34" }}>
              3<span style={{ color: "#B46C72" }}>Dev</span>
            </span>
          </Link>

          {/* Hamburger */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "rgba(110,46,52,0.06)", color: "#B46C72" }}
                aria-label="Abrir menú"
              >
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="overflow-y-auto w-[300px]">
              <SheetHeader className="mb-6">
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <Logo3Dev size={28} showText={false} />
                    <span className="font-black text-base" style={{ color: "#6E2E34" }}>
                      3<span style={{ color: "#B46C72" }}>Dev</span>
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-4">
                <Accordion type="single" collapsible className="w-full">

                  {/* Catálogo con acordeón */}
                  <AccordionItem value="catalogo">
                    <AccordionTrigger className="text-sm font-bold" style={{ color: "#6E2E34" }}>
                      Catálogo
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-1 pl-1">
                        {catalogItems.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="flex items-center gap-3 p-2.5 rounded-xl transition-colors text-sm font-semibold"
                            style={{ color: "#6E2E34" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(180,108,114,0.10)")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                          >
                            <span style={{ color: "#B46C72" }}>{item.icon}</span>
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Links simples mobile */}
                <div className="flex flex-col gap-1" style={{ borderTop: "1px solid rgba(180,108,114,0.15)", paddingTop: "1rem" }}>
                  {navLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                      style={{ color: "#6E2E34" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(180,108,114,0.10)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      {l.title}
                    </Link>
                  ))}
                </div>

                {/* CTA mobile */}
                <div style={{ borderTop: "1px solid rgba(180,108,114,0.15)", paddingTop: "1rem" }}>
                  <LiquidButton size="md" className="w-full justify-center">
                    Contacto
                  </LiquidButton>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
