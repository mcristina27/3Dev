import { NextResponse } from "next/server";
import { ALL_PRODUCTS } from "@/data/products";

/*
  ─────────────────────────────────────────────────────────────
  RUTA: GET /api/productos
  ─────────────────────────────────────────────────────────────
  Devuelve el catálogo público (productos visibles, sin los
  marcados como hidden) en JSON, para que otras apps (como la
  app de finanzas en React Native) puedan leer los productos
  reales sin duplicar la data a mano.

  Solo lectura — no expone nada sensible, es la misma data
  que ya se ve en /catalogo.
  ───────────────────────────────────────────────────────────── */

const SITE_URL = "https://3devlabs.app";

export async function GET() {
  const productos = ALL_PRODUCTS.map((p) => ({
    id:       p.id,
    code:     p.code ?? null,
    name:     p.name,
    category: p.category,
    price:    p.price,
    // URL absoluta: una app (React Native) no tiene "origen" propio para
    // resolver rutas relativas como "/assets/..." — necesita el dominio completo.
    image:    p.images[0] ? `${SITE_URL}${p.images[0]}` : null,
    tag:      p.tag,
    inStock:  p.inStock,
  }));

  return NextResponse.json(
    { productos },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
      },
    }
  );
}
