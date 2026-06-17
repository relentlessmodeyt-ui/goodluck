(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Stars canvas ── */
  const canvas = document.getElementById('starsCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawStars();
    }
    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.75;
        const r = Math.random() * 1.4 + 0.3;
        const a = Math.random() * 0.8 + 0.2;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,250,240,${a})`;
        ctx.fill();
      }
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  }

  /* ── Fireflies ── */
  const ffWrap = document.getElementById('fireflies');
  if (ffWrap) {
    const positions = [
      [18,62],[30,74],[44,55],[58,68],[70,58],[80,70],[25,50],[64,48],
      [12,78],[52,42],[88,65],[35,82],[76,52],[48,72],[92,44],[20,60]
    ];
    positions.forEach(([lp, tp], i) => {
      const el = document.createElement('div');
      el.className = 'firefly';
      el.style.left = lp + '%';
      el.style.top  = tp + '%';
      el.style.setProperty('--dur',   (6 + Math.random() * 5).toFixed(1) + 's');
      el.style.setProperty('--delay', (Math.random() * 6).toFixed(1) + 's');
      el.style.setProperty('--dx',    (Math.random() * 40 - 20).toFixed(0) + 'px');
      el.style.setProperty('--dy',    (Math.random() * -40 - 10).toFixed(0) + 'px');
      ffWrap.appendChild(el);
    });
  }

  /* ── Scene switching ── */
  const scenes  = Array.from(document.querySelectorAll('.scene'));
  const panels  = Array.from(document.querySelectorAll('.panel'));
  const contents= Array.from(document.querySelectorAll('.panel__content'));

  let currentScene = 0;

  function activateScene(idx) {
    if (idx === currentScene) return;
    currentScene = idx;
    scenes.forEach((s, i) => s.classList.toggle('active', i === idx));
  }

  function revealContent(idx) {
    contents.forEach((c, i) => c.classList.toggle('visible', i === idx));
  }

  function onScroll() {
    const mid = window.innerHeight / 2;
    let best = 0, bestDist = Infinity;

    panels.forEach((p, i) => {
      const rect = p.getBoundingClientRect();
      const dist = Math.abs(rect.top + rect.height / 2 - mid);
      if (dist < bestDist) { bestDist = dist; best = i; }
    });

    const sceneIdx = parseInt(panels[best].dataset.scene, 10);
    activateScene(sceneIdx);
    revealContent(best);
  }

  /* ── Smooth scroll via Lenis ── */
  let lenis = null;
  if (window.Lenis && !reduced) {
    lenis = new window.Lenis({ duration: 1.2, smoothWheel: true, lerp: 0.08 });
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    lenis.on('scroll', onScroll);
  } else {
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── Smooth anchor clicks ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { duration: 1.4 });
      else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    });
  });

  /* ── Init ── */
  scenes[0].classList.add('active');
  contents[0].classList.add('visible');
  onScroll();
})();
