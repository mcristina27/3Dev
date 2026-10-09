"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { HALLOWEEN_STORAGE_KEY, SEASONAL, isSeasonActive } from "@/config/seasonal";
import type { Product } from "@/data/products";

interface SeasonalCtx {
  /** El flag está encendido y estamos dentro de la ventana de fechas */
  halloweenAvailable: boolean;
  /** El visitante tiene el modo Halloween activado */
  halloween: boolean;
  /** Cambia cada vez que se activa, para disparar la animación de explosión */
  burst: number;
  setHalloween: (on: boolean) => void;
  toggleHalloween: () => void;
  /** Llamar en el click de un producto: si desbloquea un tema, lo alterna */
  onProductClick: (p: Pick<Product, "unlocksTheme">) => void;
}

const noop = () => {};
const Ctx = createContext<SeasonalCtx>({
  halloweenAvailable: false,
  halloween: false,
  burst: 0,
  setHalloween: noop,
  toggleHalloween: noop,
  onProductClick: noop,
});

export function SeasonalProvider({ children }: { children: React.ReactNode }) {
  const [available, setAvailable] = useState(false);
  const [halloween, setOn] = useState(false);
  const [burst, setBurst] = useState(0);

  // Al montar: ver si el tema está disponible y si el visitante ya lo tenía activado
  useEffect(() => {
    const ok = isSeasonActive(SEASONAL.halloween);
    setAvailable(ok);
    try {
      setOn(ok && localStorage.getItem(HALLOWEEN_STORAGE_KEY) === "1");
    } catch {
      setOn(false);
    }
  }, []);

  // Reflejar el estado en <html> y guardarlo
  useEffect(() => {
    document.documentElement.classList.toggle("halloween", halloween);
    try {
      if (halloween) localStorage.setItem(HALLOWEEN_STORAGE_KEY, "1");
      else localStorage.removeItem(HALLOWEEN_STORAGE_KEY);
    } catch {}
  }, [halloween]);

  const setHalloween = useCallback(
    (on: boolean) => {
      if (on && !available) return;
      setOn((prev) => {
        if (on && !prev) setBurst((b) => b + 1);
        return on;
      });
    },
    [available]
  );

  const toggleHalloween = useCallback(() => setHalloween(!halloween), [halloween, setHalloween]);

  const onProductClick = useCallback(
    (p: Pick<Product, "unlocksTheme">) => {
      if (p.unlocksTheme === "halloween") toggleHalloween();
    },
    [toggleHalloween]
  );

  return (
    <Ctx.Provider
      value={{ halloweenAvailable: available, halloween, burst, setHalloween, toggleHalloween, onProductClick }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useSeasonal = () => useContext(Ctx);
