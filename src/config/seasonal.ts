/* ═══════════════════════════════════════════════════════════
   🎃 TEMAS DE TEMPORADA — Feature flags
   ───────────────────────────────────────────────────────────
   Para apagar un tema por completo:  enabled: false
   Para encenderlo:                   enabled: true

   `window` limita las fechas en las que se puede activar
   (formato "MM-DD", se repite todos los años).
   Fuera de esa ventana, el click en el producto no hace nada
   y el sitio vuelve solo a la normalidad.
   Pon `window: null` para saltarte la ventana (útil para probar).

   El visitante activa el tema haciendo click en el producto
   que tenga `unlocksTheme: "halloween"` en src/data/products.ts.
═══════════════════════════════════════════════════════════ */

export interface SeasonalFlag {
  enabled: boolean;
  window: { start: string; end: string } | null;
}

export const SEASONAL: { halloween: SeasonalFlag } = {
  halloween: {
    enabled: true,
    window: { start: "10-01", end: "11-02" },
  },
};

export const HALLOWEEN_STORAGE_KEY = "3dev:halloween";

/** ¿El flag está encendido y estamos dentro de la ventana de fechas? */
export function isSeasonActive(flag: SeasonalFlag, date: Date = new Date()): boolean {
  if (!flag.enabled) return false;
  if (!flag.window) return true;
  const md = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return md >= flag.window.start && md <= flag.window.end;
}
