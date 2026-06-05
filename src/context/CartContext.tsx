"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import type { Product } from "@/data/products";

/* ── Tipos ───────────────────────────────────────────────── */
export interface CartItem {
  product:  Product;
  quantity: number;
}

interface CartState {
  items:  CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM";    product: Product; quantity?: number }
  | { type: "REMOVE_ITEM"; productId: number }
  | { type: "UPDATE_QTY";  productId: number; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "OPEN_CART"  }
  | { type: "CLOSE_CART" }
  | { type: "TOGGLE_CART"}
  | { type: "HYDRATE";     items: CartItem[] };

interface CartContextType {
  items:       CartItem[];
  isOpen:      boolean;
  itemCount:   number;
  subtotal:    number;
  addItem:     (product: Product, quantity?: number) => void;
  removeItem:  (productId: number) => void;
  updateQty:   (productId: number, quantity: number) => void;
  clearCart:   () => void;
  openCart:    () => void;
  closeCart:   () => void;
  toggleCart:  () => void;
}

/* ── Reducer ─────────────────────────────────────────────── */
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {

    case "ADD_ITEM": {
      const qty     = action.quantity ?? 1;
      const existing = state.items.find((i) => i.product.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + qty }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { product: action.product, quantity: qty }] };
    }

    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.product.id !== action.productId) };

    case "UPDATE_QTY":
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.product.id !== action.productId) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      };

    case "CLEAR_CART":   return { ...state, items: [] };
    case "OPEN_CART":    return { ...state, isOpen: true  };
    case "CLOSE_CART":   return { ...state, isOpen: false };
    case "TOGGLE_CART":  return { ...state, isOpen: !state.isOpen };
    case "HYDRATE":      return { ...state, items: action.items };
    default:             return state;
  }
}

/* ── Context ─────────────────────────────────────────────── */
const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "3dev-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  /* Hidratación desde localStorage */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) dispatch({ type: "HYDRATE", items: JSON.parse(saved) });
    } catch { /* ignorar errores de parse */ }
  }, []);

  /* Persistir en localStorage cuando cambian los items */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addItem    = useCallback((product: Product, quantity = 1) =>
    dispatch({ type: "ADD_ITEM", product, quantity }), []);
  const removeItem = useCallback((productId: number) =>
    dispatch({ type: "REMOVE_ITEM", productId }), []);
  const updateQty  = useCallback((productId: number, quantity: number) =>
    dispatch({ type: "UPDATE_QTY", productId, quantity }), []);
  const clearCart  = useCallback(() => dispatch({ type: "CLEAR_CART"  }), []);
  const openCart   = useCallback(() => dispatch({ type: "OPEN_CART"   }), []);
  const closeCart  = useCallback(() => dispatch({ type: "CLOSE_CART"  }), []);
  const toggleCart = useCallback(() => dispatch({ type: "TOGGLE_CART" }), []);

  const itemCount = state.items.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal  = state.items.reduce(
    (acc, i) => acc + (i.product.price ?? 0) * i.quantity, 0
  );

  return (
    <CartContext.Provider value={{
      items:      state.items,
      isOpen:     state.isOpen,
      itemCount,
      subtotal,
      addItem, removeItem, updateQty, clearCart,
      openCart, closeCart, toggleCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
