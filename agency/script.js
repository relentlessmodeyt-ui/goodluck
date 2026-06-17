/* ============================================================
   yashxdaksh — motion engine
   - Hero staggered reveal (Motion, with CSS fallback)
   - Scroll-triggered reveals (IntersectionObserver)
   - Custom following cursor (lerp) with hover states
   - Lenis smooth scrolling
   All optional & guarded. Honors prefers-reduced-motion.
   ============================================================ */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const easeOutCubic = [0.33, 1, 0.68, 1]; // physics-y, "expensive" easing

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ── 1. Smooth scrolling (Lenis) ─────────────────────────── */
  function initLenis() {
    if (reduceMotion || typeof Lenis === 'undefined') return;
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
    });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);

    // Keep anchor links working with the smooth-scroll instance
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: 0 });
      });
    });
  }

  /* ── 2. Hero staggered entrance ──────────────────────────── */
  function initHero() {
    const words = document.querySelectorAll('.hero-title .word');
    const blocks = ['.hero-eyebrow', '.hero-tagline', '.hero-actions']
      .map((s) => document.querySelector(s)).filter(Boolean);

    if (reduceMotion) {
      words.forEach((w) => (w.style.opacity = 1));
      blocks.forEach((b) => (b.style.opacity = 1));
      return;
    }

    if (typeof Motion !== 'undefined' && Motion.animate) {
      const { animate, stagger } = Motion;
      animate(words, { opacity: [0, 1], y: [44, 0] },
        { duration: 0.45, delay: stagger(0.06), easing: easeOutCubic });
      animate(blocks, { opacity: [0, 1], y: [24, 0] },
        { duration: 0.45, delay: stagger(0.08, { start: 0.4 }), easing: easeOutCubic });
    } else {
      // CSS keyframe fallback if the Motion CDN didn't load
      document.body.classList.add('hero-fallback');
      words.forEach((w, i) => (w.style.animationDelay = `${i * 0.06}s`));
      blocks.forEach((b, i) => (b.style.animationDelay = `${0.4 + i * 0.08}s`));
    }
  }

  /* ── 3. Scroll-triggered reveals ─────────────────────────── */
  function initReveals() {
    const items = document.querySelectorAll('[data-reveal]');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        // gentle stagger for items revealed together
        entry.target.style.transitionDelay = `${Math.min(i * 60, 180)}ms`;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => io.observe(el));
  }

  /* ── 4. Custom cursor ────────────────────────────────────── */
  function initCursor() {
    if (reduceMotion || !canHover) return;
    const cursor = document.querySelector('.cursor');
    if (!cursor) return;
    document.body.classList.add('has-cursor');

    let mx = innerWidth / 2, my = innerHeight / 2; // target
    let cx = mx, cy = my;                           // current (lerped)
    let active = false;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      if (!active) { active = true; cursor.classList.add('is-active'); }
    });
    window.addEventListener('mouseout', (e) => {
      if (!e.relatedTarget) cursor.classList.remove('is-active');
    });

    const render = () => {
      cx += (mx - cx) * 0.18; // smooth follow
      cy += (my - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    // Expand cursor over interactive elements
    document.querySelectorAll('[data-cursor]').forEach((el) => {
      const type = el.getAttribute('data-cursor');
      el.addEventListener('mouseenter', () => {
        cursor.classList.remove('is-hover', 'is-view');
        cursor.classList.add(type === 'view' ? 'is-view' : 'is-hover');
      });
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover', 'is-view'));
    });
  }

  /* ── boot ────────────────────────────────────────────────── */
  const boot = () => { initLenis(); initHero(); initReveals(); initCursor(); };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
