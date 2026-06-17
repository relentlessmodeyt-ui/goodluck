import { create } from 'zustand';

/**
 * Single source of truth that bridges the DOM scroll world (Lenis + GSAP
 * ScrollTrigger) and the render loop (R3F useFrame). We deliberately keep
 * this OUTSIDE React state updates per frame — components read `.getState()`
 * inside useFrame so we never trigger React re-renders at 60fps.
 */
export const useScroll = create(() => ({
  progress: 0,   // 0..1 total page progress
  velocity: 0,   // signed, normalized scroll velocity (smoothed)
  section: 0,    // active section index, for shader transitions
}));

export const scrollApi = {
  set: (partial) => useScroll.setState(partial),
  get: () => useScroll.getState(),
};
