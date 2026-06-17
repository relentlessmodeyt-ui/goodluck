import { create } from "zustand";
import type { CursorVariant } from "@/types";

interface AppState {
  // Custom cursor
  cursorVariant: CursorVariant;
  cursorLabel: string;
  setCursor: (variant: CursorVariant, label?: string) => void;
  // Intro loading sequence
  introComplete: boolean;
  completeIntro: () => void;
  // Mobile nav
  menuOpen: boolean;
  toggleMenu: (open?: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  cursorVariant: "default",
  cursorLabel: "",
  setCursor: (cursorVariant, cursorLabel = "") =>
    set({ cursorVariant, cursorLabel }),
  introComplete: false,
  completeIntro: () => set({ introComplete: true }),
  menuOpen: false,
  toggleMenu: (open) =>
    set((state) => ({ menuOpen: open ?? !state.menuOpen })),
}));
