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
];

/* ── Productos ──────────────────────────────────────────── */
/*
   ┌─────────────────────────────────────────────────────┐
   │  CÓMO AGREGAR UN PRODUCTO NUEVO                     │
   │                                                     │
   │  1. Copia uno de los objetos de abajo               │
   │  2. Cámbialo con la info de tu producto             │
   │  3. Dale un id único (el siguiente número)          │
   │  4. Pon el category id que corresponda              │
   │  5. Si tenés foto: pon la ruta en images[]          │
   │     Si no: deja el array vacío [] o usa Unsplash    │
   │  6. featured: true → aparece en el slider del home  │
   └─────────────────────────────────────────────────────┘
*/

export const ALL_PRODUCTS: Product[] = [

  /* ── DECORACIÓN ─────────────────────────────────────── */
  {
    id:          1,
    name:        "Figura decorativa abstracta",
    category:    "decoracion",
    images:      [],   // TODO: agregar foto
    price:       35,
    shortDesc:   "Pieza abstracta ideal para repisas y escritorios.",
    description: "Pieza decorativa de diseño abstracto, ideal para repisas, escritorios y mesitas de noche. Acabado liso con capas de 0.1 mm y excelente definición de bordes.",
    material:    "PLA Premium",
    colors:      ["Blanco", "Negro", "Rosa", "Beige"],
    size:        "10 × 8 cm",
    weight:      "45 g",
    time:        "3–5 días hábiles",
    tag:         "PLA",
    featured:    true,
    inStock:     true,
    searchTags:  ["figura", "decoracion", "abstracto", "repisa", "escritorio"],
  },
  {
    id:          2,
    name:        "Portavelas geométrico",
    category:    "decoracion",
    images:      [],
    price:       28,
    shortDesc:   "Portavelas minimalista para velas tealight.",
    description: "Portavelas con diseño geométrico minimalista. Compatible con velas tipo tealight. Acabado mate elegante.",
    material:    "PLA Premium",
    colors:      ["Blanco", "Negro", "Terracota"],
    size:        "8 × 8 cm",
    weight:      "30 g",
    time:        "2–4 días hábiles",
    tag:         "PLA",
    featured:    false,
    inStock:     true,
    searchTags:  ["vela", "portavelas", "geometrico", "decoracion"],
  },

  /* ── HOGAR ──────────────────────────────────────────── */
  {
    id:          3,
    name:        "Maceta geométrica",
    category:    "hogar",
    images:      [],
    price:       42,
    shortDesc:   "Maceta geométrica para suculentas y cactus.",
    description: "Maceta con diseño geométrico para suculentas y cactus. Incluye bandeja. Superficie lisa, sin bordes ásperos.",
    material:    "PLA Premium",
    colors:      ["Blanco", "Verde Sage", "Terracota", "Negro"],
    size:        "12 × 12 cm",
    weight:      "80 g",
    time:        "4–6 días hábiles",
    tag:         "PLA",
    featured:    true,
    inStock:     true,
    searchTags:  ["maceta", "planta", "suculenta", "cactus", "geometrica", "hogar"],
  },
  {
    id:          4,
    name:        "Organizador de escritorio",
    category:    "hogar",
    images:      [],
    price:       55,
    shortDesc:   "Organizador modular para lápices y accesorios.",
    description: "Organizador modular con compartimentos para lápices, clips y accesorios de escritorio. Ideal para mantener el orden con estilo.",
    material:    "PLA Premium",
    colors:      ["Blanco", "Negro", "Rosa"],
    size:        "20 × 10 cm",
    weight:      "110 g",
    time:        "3–5 días hábiles",
    tag:         "PLA",
    featured:    true,
    inStock:     true,
    searchTags:  ["organizador", "escritorio", "lapicero", "oficina", "hogar"],
  },

  /* ── TECH ───────────────────────────────────────────── */
  {
    id:          5,
    name:        "Soporte para laptop",
    category:    "tech",
    images:      [],
    price:       65,
    shortDesc:   "Soporte ergonómico para laptops 13\"–17\".",
    description: "Soporte ergonómico que mejora postura y ventilación. Compatible con laptops de 13\" a 17\". Diseño estable con base antideslizante.",
    material:    "PLA Premium",
    colors:      ["Negro", "Blanco", "Gris"],
    size:        "28 × 22 cm",
    weight:      "220 g",
    time:        "5–7 días hábiles",
    tag:         "PLA",
    featured:    true,
    inStock:     true,
    searchTags:  ["soporte", "laptop", "notebook", "ergonomico", "setup", "tech"],
  },
  {
    id:          6,
    name:        "Porta auriculares",
    category:    "tech",
    images:      [],
    price:       48,
    shortDesc:   "Soporte de escritorio para auriculares.",
    description: "Soporte para auriculares de escritorio o pared. Diseño minimalista que complementa cualquier setup.",
    material:    "PLA Premium",
    colors:      ["Negro", "Blanco"],
    size:        "15 × 12 cm",
    weight:      "75 g",
    time:        "3–5 días hábiles",
    tag:         "PLA",
    featured:    false,
    inStock:     true,
    searchTags:  ["auricular", "headset", "soporte", "setup", "tech"],
  },
  {
    id:          7,
    name:        "Dock para celular",
    category:    "tech",
    images:      [],
    price:       38,
    shortDesc:   "Base para celular, compatible con la mayoría de smartphones.",
    description: "Base para celular con diseño limpio. Compatible con la mayoría de smartphones. Mantiene el teléfono a la vista mientras carga.",
    material:    "PLA Premium",
    colors:      ["Negro", "Blanco", "Rosa"],
    size:        "10 × 8 cm",
    weight:      "50 g",
    time:        "2–4 días hábiles",
    tag:         "PLA",
    featured:    false,
    inStock:     true,
    searchTags:  ["celular", "dock", "base", "smartphone", "cargador", "setup"],
  },

  /* ── ACCESORIOS ─────────────────────────────────────── */
  {
    id:          8,
    name:        "Llavero personalizado",
    category:    "accesorios",
    images:      [],
    price:       18,
    shortDesc:   "Llavero con tu diseño o texto favorito.",
    description: "Llavero con tu diseño, nombre o texto favorito. Incluye argolla metálica de alta calidad. Perfecto como regalo.",
    material:    "PLA Premium",
    colors:      ["Blanco", "Negro", "Rosa", "Azul", "Rojo", "Amarillo"],
    size:        "5 × 3 cm",
    weight:      "8 g",
    time:        "1–2 días hábiles",
    tag:         "PLA",
    featured:    true,
    inStock:     true,
    searchTags:  ["llavero", "personalizado", "regalo", "nombre", "custom"],
  },
  {
    id:          9,
    name:        "Porta tarjetas",
    category:    "accesorios",
    images:      [],
    price:       25,
    shortDesc:   "Porta tarjetas de presentación, elegante y funcional.",
    description: "Porta tarjetas de presentación elegante y funcional. Capacidad para 10–15 tarjetas. Ideal para reuniones y eventos.",
    material:    "PLA Premium",
    colors:      ["Negro", "Blanco", "Gris"],
    size:        "9 × 6 cm",
    weight:      "20 g",
    time:        "2–3 días hábiles",
    tag:         "PLA",
    featured:    false,
    inStock:     true,
    searchTags:  ["tarjeta", "negocios", "profesional", "accesorio"],
  },

  /* ── COLECCIONABLE ──────────────────────────────────── */
  {
    id:          10,
    name:        "Miniatura de personaje",
    category:    "coleccionable",
    images:      [],
    price:       80,
    shortDesc:   "Miniatura detallada de 15 cm, capas de 0.1 mm.",
    description: "Miniatura detallada de 15 cm de alto. Alta resolución con capas de 0.1 mm. Ideal para colecciones, juegos de rol y regalos únicos.",
    material:    "PLA Premium",
    colors:      ["A consultar"],
    size:        "15 cm de alto",
    weight:      "95 g",
    time:        "7–10 días hábiles",
    tag:         "PLA",
    featured:    true,
    inStock:     true,
    searchTags:  ["miniatura", "figura", "personaje", "coleccion", "rol", "dnd"],
  },
  {
    id:          11,
    name:        "Dado poliédrico D20",
    category:    "coleccionable",
    images:      [],
    price:       22,
    shortDesc:   "Dado D20 de alta precisión dimensional.",
    description: "Dado D20 con diseño personalizado y alta precisión dimensional. Perfecto para juegos de rol y como pieza de colección.",
    material:    "PLA Premium",
    colors:      ["Blanco", "Negro", "Rojo", "Azul"],
    size:        "3 × 3 cm",
    weight:      "15 g",
    time:        "2–3 días hábiles",
    tag:         "PLA",
    featured:    false,
    inStock:     true,
    searchTags:  ["dado", "d20", "rol", "dnd", "gamer", "coleccionable"],
  },

  /* ── GIRLY DEVS ─────────────────────────────────────── */
  {
    id:          12,
    name:        "Figura kawaii personalizada",
    category:    "girly",
    images:      [],
    price:       45,
    shortDesc:   "Figura kawaii con tu personaje favorito.",
    description: "Figura estilo kawaii personalizada. Podés elegir el personaje, colores y accesorios. Perfecta para escritorios aesthetic.",
    material:    "PLA Premium",
    colors:      ["Rosa", "Lavanda", "Blanco", "Menta"],
    size:        "8 cm de alto",
    weight:      "35 g",
    time:        "5–7 días hábiles",
    tag:         "PLA",
    featured:    true,
    inStock:     true,
    searchTags:  ["kawaii", "figura", "anime", "aesthetic", "girly", "cute"],
  },

  /* ── CUSTOM ─────────────────────────────────────────── */
  {
    id:          13,
    name:        "Pieza a medida",
    category:    "custom",
    images:      [],
    price:       null,
    shortDesc:   "Tu diseño, impreso. Envianos tu archivo STL.",
    description: "¿Tenés un diseño en mente? Lo hacemos realidad. Envianos tu archivo STL o una descripción detallada y te cotizamos sin compromiso. Sin mínimos de cantidad.",
    material:    "PLA Premium / A consultar",
    colors:      ["A elegir"],
    size:        "A medida",
    weight:      "A consultar",
    time:        "A consultar",
    tag:         "A medida",
    featured:    false,
    inStock:     true,
    searchTags:  ["custom", "medida", "personalizado", "stl", "diseño", "encargo"],
  },
  {
    id:          14,
    name:        "Logo 3D empresarial",
    category:    "custom",
    images:      [],
    price:       null,
    shortDesc:   "Tu marca en 3D para oficinas y eventos.",
    description: "Tu logo o marca en 3D, ideal para oficinas, stands y regalos corporativos. Cotización sin compromiso.",
    material:    "PLA Premium / A consultar",
    colors:      ["A elegir"],
    size:        "A medida",
    weight:      "A consultar",
    time:        "A consultar",
    tag:         "A medida",
    featured:    false,
    inStock:     true,
    searchTags:  ["logo", "empresa", "corporativo", "regalo", "evento", "custom"],
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
