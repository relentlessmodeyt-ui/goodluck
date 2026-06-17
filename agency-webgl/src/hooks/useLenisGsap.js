import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollApi } from '../state/useScroll.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * Wires Lenis (smooth scroll) -> GSAP ScrollTrigger -> our scroll store.
 *
 * Why this shape:
 *  - Lenis owns the scroll position and gives us inertial smoothing.
 *  - GSAP's ticker drives Lenis.raf so there's ONE rAF loop, not two
 *    fighting each other (the classic cause of jitter).
 *  - ScrollTrigger.update runs on every Lenis scroll so triggers stay in sync.
 *  - We push progress + velocity into a zustand store that R3F reads in
 *    useFrame, decoupling DOM scroll from the WebGL render loop.
 */
export function useLenisGsap() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
    });

    // One rAF to rule them all.
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', ScrollTrigger.update);

    // Master timeline mapped to the whole document height.
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        // self.getVelocity() is px/s; normalize + clamp to a friendly -1..1.
        const raw = self.getVelocity() / 2000;
        const v = gsap.utils.clamp(-1, 1, raw);
        const prev = scrollApi.get().velocity;
        scrollApi.set({
          progress: self.progress,
          // light smoothing so the shader doesn't twitch on micro-scrolls
          velocity: prev + (v - prev) * 0.2,
          section: Math.round(self.progress * (SECTIONS - 1)),
        });
      },
    });

    return () => {
      st.kill();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}

const SECTIONS = 4;
