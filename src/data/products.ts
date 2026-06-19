/* ═══════════════════════════════════════════════════════════
   📦 CATÁLOGO 3DEV — Archivo de datos centralizado
   ───────────────────────────────────────────────────────────
   Para agregar un producto nuevo, copia cualquiera de los
   objetos de abajo y pégalo en el array ALL_PRODUCTS.

   Para agregar una categoría nueva, agrégala al array
   CATEGORIES y úsala en el campo "category" del producto.
═══════════════════════════════════════════════════════════ */

/* ── Tipos ──────────────────────────────────────────────── */

export interface Category {
  id:          string;   // slug único, ej: "hogar"
  label:       string;   // nombre visible, ej: "Hogar"
  emoji:       string;   // emoji representativo
  description: string;   // descripción corta para la sección de categorías
}

export interface Product {
  id:          number;         // ID único — NO repetir
  name:        string;         // nombre del producto
  category:    string;         // debe coincidir con Category.id
  images:      string[];       // URLs de imágenes (primera = principal)
                               // usa "/products/nombre.jpg" para imágenes propias
                               // o URLs de Unsplash mientras tanto
  price:       number | null;  // precio en soles (S/). null = "cotizar"
  shortDesc:   string;         // descripción corta para la card del home
  description: string;         // descripción completa para la página de detalle
  material:    string;         // material(es) disponibles
  colors:      string[];       // colores disponibles, ej: ["Blanco", "Negro", "Rosa"]
  size:        string;         // dimensiones aproximadas, ej: "10 × 8 cm"
  weight:      string;         // peso aproximado, ej: "45 g"
  time:        string;         // tiempo de producción, ej: "3–5 días hábiles"
  tag:         string;         // badge que aparece en la card: "PLA" | "A medida" | etc.
  featured:    boolean;        // true = aparece en el slider de la home
  inStock:     boolean;        // false = muestra "Sin stock" en vez de precio
  searchTags:  string[];       // palabras clave para el buscador (sin tildes ok)
}

/* ── Categorías ─────────────────────────────────────────── */
/*
   Agrega aquí cada categoría que quieras mostrar en el catálogo.
   El campo "id" debe coincidir exactamente con el campo "category"
   de cada producto.
*/

export const CATEGORIES: Category[] = [
  {
    id:          "decoracion",
    label:       "Decoración",
    emoji:       "🎨",
    description: "Piezas decorativas para darle vida a cualquier espacio.",
  },
  {
    id:          "hogar",
    label:       "Hogar",
    emoji:       "🏠",
    description: "Macetas, organizadores y accesorios para tu hogar.",
  },
  {
    id:          "tech",
    label:       "Tech Lovers",
    emoji:       "💻",
    description: "Soportes, docks y accesorios para tu setup.",
  },
  {
    id:          "accesorios",
    label:       "Accesorios",
    emoji:       "✨",
    description: "Llaveros, porta tarjetas y más.",
  },
  {
    id:          "coleccionable",
    label:       "Coleccionable",
    emoji:       "🎮",
    description: "Miniaturas, dados y piezas de colección.",
  },
  {
    id:          "girly",
    label:       "Girly Devs",
    emoji:       "🌸",
    description: "Figuras kawaii, llaveros y piezas aesthetic.",
  },
  {
    id:          "custom",
    label:       "Custom",
    emoji:       "🛠️",
    description: "Diseñamos y fabricamos lo que tengas en mente.",
  },
  {
    id:          "clickers",
    label:       "Clickers",
    emoji:       "🖱️",
    description: "Figuras fidget con mecanismo clic. Imposible soltarlos.",
  },
];

export const ALL_PRODUCTS: Product[] = [

  /* ── CLICKERS ───────────────────────────────────────── */
  {
    id:          15,
    name:        "Clicker MiniDumpling",
    category:    "clickers",
    images:      ["/assets/products/clicker-minidumpling.png"],
    price:       35,
    shortDesc:   "Clicker fidget con forma de dumpling kawaii. ¡Imposible soltarlo!",
    description: "Clicker articulado con forma de dumpling kawaii. Mecanismo de clic satisfactorio y cesta de vapor incluida. Disponible en versión ojos abiertos o guiñando.",
    material:    "PLA Premium",
    colors:      ["Beige / Marrón"],
    size:        "6 × 6 cm",
    weight:      "40 g",
    time:        "3–5 días hábiles",
    tag:         "Clicker",
    featured:    true,
    inStock:     true,
    searchTags:  ["clicker", "fidget", "dumpling", "kawaii", "gyoza", "cute", "juguete"],
  },

];

/* ── Helpers ────────────────────────────────────────────── */

/** Todos los IDs de categoría que tienen al menos un producto */
export const ACTIVE_CATEGORY_IDS = [
  ...new Set(ALL_PRODUCTS.map((p) => p.category)),
];

/** Solo las categorías que tienen productos */
export const ACTIVE_CATEGORIES = CATEGORIES.filter((c) =>
  ACTIVE_CATEGORY_IDS.includes(c.id)
);

/** Productos destacados para el slider del home */
export const FEATURED_PRODUCTS = ALL_PRODUCTS.filter((p) => p.featured);
