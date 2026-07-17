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
  code?:       string;         // código interno de trazabilidad (viene impreso en la foto del asset, ej: "001")
  name:        string;         // nombre del producto
  category:    string;         // debe coincidir con Category.id
  images:      string[];       // URLs de imágenes (primera = principal)
                               // usa "/products/nombre.jpg" para imágenes propias
                               // o URLs de Unsplash mientras tanto
  price:       number | null;  // precio en soles (S/). null = "cotizar"
  salePrice?:  number;         // precio de oferta (tachado el original)
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
  hidden?:     boolean;        // true = no se muestra en la tienda (pero queda en el código)
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

const RAW_PRODUCTS: Product[] = [

  /* ── CLICKERS ───────────────────────────────────────── */
  {
    id:          16,
    name:        "Clicker MiniCoffee",
    category:    "clickers",
    images:      ["/assets/products/clicker-coffe.png"],
    price:       8,
    salePrice:   7,
    shortDesc:   "Clicker con forma de taza de café. También disponible como llavero.",
    description: "Clicker articulado en forma de taza de café con espuma. Viene en versión clicker de escritorio o como llavero para llevar a todos lados.",
    material:    "PLA Premium",
    colors:      ["Crema / Marrón", "Rosa"],
    size:        "5 × 5 cm",
    weight:      "35 g",
    time:        "3–5 días hábiles",
    tag:         "Clicker",
    featured:    true,
    inStock:     true,
    searchTags:  ["clicker", "fidget", "cafe", "coffee", "taza", "llavero", "kawaii"],
    hidden:      true,
  },
  {
    id:          17,
    name:        "Clicker Teclas",
    category:    "clickers",
    images:      ["/assets/products/clicker-teclas.png"],
    price:       8,
    shortDesc:   "Clicker de teclas mecánicas apilables. Para los amantes del teclado.",
    description: "Clicker con forma de teclas mecánicas que encajan entre sí. Súper satisfactorio de usar. Disponible en rosa y naranja.",
    material:    "PLA Premium",
    colors:      ["Rosa", "Naranja"],
    size:        "8 × 4 cm",
    weight:      "45 g",
    time:        "3–5 días hábiles",
    tag:         "Clicker",
    featured:    true,
    inStock:     true,
    searchTags:  ["clicker", "fidget", "teclas", "keyboard", "mecanico", "tech"],
    hidden:      true,
  },
  {
    id:          18,
    code:        "001",
    name:        "Clicker MiniClaudio",
    category:    "clickers",
    images:      ["/assets/products/cicker-claudio.png"],
    price:       8,
    shortDesc:   "Clicker con forma del mascot Claudio. También viene como llavero.",
    description: "Clicker articulado con forma del mascot pixel-art Claudio. Disponible como clicker de escritorio o llavero. El regalo perfecto para devs.",
    material:    "PLA Premium",
    colors:      ["Naranja"],
    size:        "4 × 4 cm",
    weight:      "25 g",
    time:        "3–5 días hábiles",
    tag:         "Clicker",
    featured:    true,
    inStock:     true,
    searchTags:  ["clicker", "fidget", "claudio", "claude", "anthropic", "ai", "dev", "llavero", "tech"],
  },

  {
    id:          26,
    code:        "009",
    name:        "Llavero Clickers IA",
    category:    "clickers",
    images:      ["/assets/products/clicker-ia.png"],
    price:       8,
    shortDesc:   "Llavero clicker con los íconos de Gemini, Claude y Codex.",
    description: "Set de llaveros clicker con los íconos de tus IAs favoritas: Gemini, Claude y Codex. Cada uno con su propio color y grabado. Ideal para devs que las usan todas.",
    material:    "PLA",
    colors:      ["Negro", "Beige"],
    size:        "3 × 3 cm",
    weight:      "15 g",
    time:        "3–5 días hábiles",
    tag:         "Clicker",
    featured:    true,
    inStock:     true,
    searchTags:  ["clicker", "llavero", "ia", "ai", "gemini", "claude", "codex", "dev"],
  },

  {
    id:          22,
    code:        "006",
    name:        "Clicker Cursor",
    category:    "clickers",
    images:      ["/assets/products/clicker-cursor.png"],
    price:       8,
    shortDesc:   "Llavero clicker con forma de tecla cursor. Para los devs más estilosos.",
    description: "Llavero clicker con diseño de tecla cursor pixel-art. Marco en marrón oscuro, panel blanco con el ícono del cursor. Perfecto para llevar en las llaves o mochila.",
    material:    "PLA",
    colors:      ["Marrón / Blanco"],
    size:        "4 × 4 cm",
    weight:      "20 g",
    time:        "3–5 días hábiles",
    tag:         "Clicker",
    featured:    true,
    inStock:     true,
    searchTags:  ["clicker", "cursor", "llavero", "tecla", "dev", "programador", "pixel"],
  },

  /* ── ACCESORIOS ─────────────────────────────────────── */
  {
    id:          19,
    code:        "003",
    name:        "Llavero GitHub",
    category:    "accesorios",
    images:      ["/assets/products/keychain-github.png"],
    price:       3,
    shortDesc:   "Llavero con el Octocat de GitHub. Blanco y negro, edición dev.",
    description: "Llavero con el icónico Octocat de GitHub en negro y blanco. Hecho en PLA bicolor. El accesorio indispensable para cualquier dev.",
    material:    "PLA bicolor",
    colors:      ["Negro / Blanco"],
    size:        "4 cm diámetro",
    weight:      "12 g",
    time:        "2–3 días hábiles",
    tag:         "Llavero",
    featured:    true,
    inStock:     true,
    searchTags:  ["llavero", "github", "octocat", "dev", "programador", "accesorio"],
  },

  {
    id:          24,
    code:        "008",
    name:        "Llavero Claudio",
    category:    "accesorios",
    images:      ["/assets/products/keychain-claudio.png"],
    price:       3,
    shortDesc:   "Llavero con el mascot Claudio. El accesorio perfecto para devs.",
    description: "Llavero con el icónico mascot Claudio en 3D. Hecho en PLA, compacto y resistente. El accesorio indispensable para cualquier dev fan de la IA.",
    material:    "PLA",
    colors:      ["A elegir"],
    size:        "4 cm",
    weight:      "12 g",
    time:        "2–3 días hábiles",
    tag:         "Llavero",
    featured:    true,
    inStock:     true,
    searchTags:  ["llavero", "claudio", "claude", "anthropic", "ai", "dev", "accesorio"],
  },
  {
    id:          25,
    code:        "007",
    name:        "Llavero DinoChrome",
    category:    "accesorios",
    images:      ["/assets/products/keychain-dino.png"],
    price:       3,
    shortDesc:   "Llavero con dinosaurio kawaii. Ideal para llevar a todos lados.",
    description: "Llavero con dinosaurio kawaii impreso en 3D. Pequeño, resistente y adorable. Disponible en varios colores.",
    material:    "PLA",
    colors:      ["A elegir"],
    size:        "4 cm",
    weight:      "12 g",
    time:        "2–3 días hábiles",
    tag:         "Llavero",
    featured:    true,
    inStock:     true,
    searchTags:  ["llavero", "dino", "dinochrome", "dinosaurio", "kawaii", "cute", "accesorio"],
  },

  {
    id:          27,
    code:        "010",
    name:        "Llavero AudiClaud",
    category:    "accesorios",
    images:      ["/assets/products/keychain-audiclaud.png"],
    price:       3,
    shortDesc:   "Llavero de Claudio con audífonos. Para los devs que programan con música.",
    description: "Llavero con el mascot Claudio usando audífonos grandes en azul. Impreso en PLA naranja, compacto y resistente. Perfecto para los devs que no programan sin música.",
    material:    "PLA",
    colors:      ["Naranja / Azul"],
    size:        "4 cm",
    weight:      "12 g",
    time:        "2–3 días hábiles",
    tag:         "Llavero",
    featured:    true,
    inStock:     true,
    searchTags:  ["llavero", "audiclaud", "claudio", "claude", "audifonos", "musica", "dev", "accesorio"],
  },
  {
    id:          28,
    code:        "011",
    name:        "Llavero HeartClaud",
    category:    "accesorios",
    images:      ["/assets/products/keychain-heartclaud.png"],
    price:       3,
    shortDesc:   "Llavero de Claudio con un corazón. El regalo tierno para cualquier dev.",
    description: "Llavero con el mascot Claudio y un corazón rosa pixel-art. Impreso en PLA naranja, compacto y resistente. Ideal como detalle o regalo.",
    material:    "PLA",
    colors:      ["Naranja / Rosa"],
    size:        "4 cm",
    weight:      "12 g",
    time:        "2–3 días hábiles",
    tag:         "Llavero",
    featured:    true,
    inStock:     true,
    searchTags:  ["llavero", "heartclaud", "claudio", "claude", "corazon", "regalo", "accesorio"],
  },
  {
    id:          29,
    code:        "012",
    name:        "Llavero GPT",
    category:    "accesorios",
    images:      ["/assets/products/keychain-gpt.png"],
    price:       3,
    shortDesc:   "Llavero con el ícono de ChatGPT. Para los devs multi-IA.",
    description: "Llavero con el ícono de ChatGPT en relieve sobre placa blanca y marco negro, con cadena metálica. Hecho en PLA, compacto y resistente.",
    material:    "PLA",
    colors:      ["Negro / Blanco"],
    size:        "3 × 3 cm",
    weight:      "12 g",
    time:        "2–3 días hábiles",
    tag:         "Llavero",
    featured:    true,
    inStock:     true,
    searchTags:  ["llavero", "gpt", "chatgpt", "openai", "ai", "dev", "accesorio"],
  },

  /* ── HOGAR ───────────────────────────────────────────── */
  {
    id:          23,
    code:        "005",
    name:        "Posavasos 3Dev",
    category:    "hogar",
    images:      ["/assets/products/posavasos.png"],
    price:       50,
    shortDesc:   "Posavasos impreso en 3D. Diseño único para tu escritorio.",
    description: "Posavasos impreso en 3D con diseño exclusivo 3Dev. Perfecto para proteger tu escritorio con estilo. Disponible en distintos colores.",
    material:    "PLA",
    colors:      ["A elegir"],
    size:        "10 × 10 cm",
    weight:      "60 g",
    time:        "3–5 días hábiles",
    tag:         "Hogar",
    featured:    true,
    inStock:     true,
    searchTags:  ["posavasos", "coaster", "hogar", "escritorio", "setup", "deco"],
  },


  {
    id:          20,
    code:        "002",
    name:        "Organizador Claudia",
    category:    "hogar",
    images:      ["/assets/products/organizer-claudio.png"],
    price:       30,
    shortDesc:   "Organizador de escritorio con forma del mascot Claudia. ¡Para tu setup!",
    description: "Organizador de escritorio con diseño pixel-art del mascot Claudia. Tiene compartimentos para lapiceros, notas y accesorios. Naranja brillante para un setup con personalidad.",
    material:    "PLA",
    colors:      ["Naranja"],
    size:        "12 × 8 cm",
    weight:      "90 g",
    time:        "4–6 días hábiles",
    tag:         "Hogar",
    featured:    true,
    inStock:     true,
    searchTags:  ["organizador", "escritorio", "claudia", "claude", "anthropic", "setup", "dev", "hogar"],
  },

  /* ── DECORACIÓN ──────────────────────────────────────── */
  {
    id:          21,
    code:        "004",
    name:        "Pieza Claudio Sentado",
    category:    "decoracion",
    images:      ["/assets/products/piece-claudio.png"],
    price:       10,
    shortDesc:   "Figura decorativa de Claudio en su silla gamer. Pixel-art 3D.",
    description: "Figura decorativa de Claudio sentado en su silla frente al teclado. Diseño pixel-art en azul y naranja. Perfecta para repisas y escritorios dev.",
    material:    "PLA bicolor",
    colors:      ["Azul / Naranja"],
    size:        "8 × 7 cm",
    weight:      "60 g",
    time:        "4–6 días hábiles",
    tag:         "Deco",
    featured:    true,
    inStock:     true,
    searchTags:  ["figura", "decoracion", "claudio", "claude", "anthropic", "pixel", "dev", "gamer"],
  },

];

/** Productos visibles en la tienda (excluye los marcados como hidden: true) */
export const ALL_PRODUCTS: Product[] = RAW_PRODUCTS.filter((p) => !p.hidden);

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
