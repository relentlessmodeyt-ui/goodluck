import { create } from "zustand";

type UIState = {
  /** True until the cinematic preloader has finished. */
  loading: boolean;
  setLoading: (v: boolean) => void;
  /** Normalised scroll progress for the whole page, 0..1. */
  scrollProgress: number;
  setScrollProgress: (v: number) => void;
  /** Mobile menu open state. */
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  /** Cursor "active" state — set true when hovering interactive elements. */
  cursorActive: boolean;
  setCursorActive: (v: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
  loading: true,
  setLoading: (v) => set({ loading: v }),
  scrollProgress: 0,
  setScrollProgress: (v) => set({ scrollProgress: v }),
  menuOpen: false,
  setMenuOpen: (v) => set({ menuOpen: v }),
  cursorActive: false,
  setCursorActive: (v) => set({ cursorActive: v }),
}));
