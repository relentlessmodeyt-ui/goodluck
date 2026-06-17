/* ===== VISITE — scroll engine =====
   Smooth scroll (Lenis) + scene cross-fade + parallax + reveals.
   Everything is guarded so the site still works if a CDN fails
   or the user prefers reduced motion. */
(function () {
  "use strict";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scenes = Array.from(document.querySelectorAll(".scene"));
  const panels = Array.from(document.querySelectorAll(".panel"));
  const layers = Array.from(document.querySelectorAll(".layer"));

  /* ---- 1. Which scene is showing ----
     Driven by whichever panel is closest to the viewport centre. */
  function setScene(index) {
    scenes.forEach((s, i) => s.classList.toggle("is-active", i === index));
  }

  let current = -1;
  function updateScene() {
    const mid = window.innerHeight / 2;
    let best = 0, bestDist = Infinity;
    panels.forEach((p) => {
      const r = p.getBoundingClientRect();
      const dist = Math.abs(r.top + r.height / 2 - mid);
      if (dist < bestDist) { bestDist = dist; best = +p.dataset.scene; }
    });
    if (best !== current) { current = best; setScene(best); }
  }

  /* ---- 2. Parallax: nudge layers by scroll position ---- */
  function parallax(scrollY) {
    if (reduce) return;
    layers.forEach((el, i) => {
      // alternating depth, foreground moves more
      const depth = ((i % 5) + 1) * 6;
      el.style.transform = `translate3d(0, ${(scrollY * depth) / 200}px, 0)`;
    });
  }

  /* ---- 3. Reveal panels on enter ---- */
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        }),
        { threshold: 0.25 }
      )
    : null;
  document.querySelectorAll(".reveal").forEach((el) => {
    if (io) io.observe(el); else el.classList.add("in");
  });

  /* ---- 4. Smooth scroll via Lenis if present ---- */
  let lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new window.Lenis({ duration: 1.1, smoothWheel: true });
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    lenis.on("scroll", ({ scroll }) => { updateScene(); parallax(scroll); });
  } else {
    window.addEventListener("scroll", () => {
      updateScene();
      parallax(window.scrollY);
    }, { passive: true });
  }

  /* ---- 5. Smooth anchor clicks ---- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: 0 });
      else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    });
  });

  /* ---- init ---- */
  updateScene();
  parallax(window.scrollY || 0);
})();
