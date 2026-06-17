(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ── Split headings into per-letter spans for staggered reveal ── */
  $$('[data-split]').forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    [...text].forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'ltr' + (ch === ' ' ? ' sp' : '');
      span.textContent = ch === ' ' ? ' ' : ch;
      span.style.transitionDelay = (i * 0.045) + 's';
      el.appendChild(span);
    });
  });

  /* ── Floating atmosphere motes ── */
  const atmos = $('#atmos');
  if (atmos && !reduced) {
    const N = window.innerWidth < 760 ? 14 : 28;
    for (let i = 0; i < N; i++) {
      const m = document.createElement('div');
      m.className = 'mote';
      const size = (Math.random() * 4 + 1.5).toFixed(1);
      m.style.width = m.style.height = size + 'px';
      m.style.left = (Math.random() * 100) + '%';
      m.style.top  = (Math.random() * 100) + '%';
      m.style.setProperty('--dur',   (12 + Math.random() * 14).toFixed(1) + 's');
      m.style.setProperty('--delay', (Math.random() * 14).toFixed(1) + 's');
      m.style.setProperty('--dx',    (Math.random() * 80 - 40).toFixed(0) + 'px');
      m.style.setProperty('--dy',    (-80 - Math.random() * 120).toFixed(0) + 'px');
      m.style.setProperty('--peak',  (0.35 + Math.random() * 0.5).toFixed(2));
      atmos.appendChild(m);
    }
  }

  /* ── Elements ── */
  const scenes   = $$('.scene[data-scene]');
  const plx      = $$('.scene__parallax');
  const panels   = $$('.panel');
  const contents = $$('.panel__content');
  const railDots = $$('.rail__dot');
  const nav      = $('#nav');
  const burger   = $('#burger');
  const navLinks = $('.nav__links');

  let currentScene = -1;

  function activateScene(idx) {
    if (idx === currentScene) return;
    currentScene = idx;
    scenes.forEach((s, i) => s.classList.toggle('is-active', i === idx));
    railDots.forEach((d, i) => d.classList.toggle('is-on', i === idx));
  }

  /* ── Per-frame: choose active scene, reveal text, drive parallax ── */
  let mx = 0, my = 0;   // smoothed mouse offset (-1..1)
  function frame() {
    const vh  = window.innerHeight;
    const mid = vh / 2;
    let best = 0, bestDist = Infinity;

    panels.forEach((p, i) => {
      const r = p.getBoundingClientRect();
      const center = r.top + r.height / 2;
      const dist = Math.abs(center - mid);
      if (dist < bestDist) { bestDist = dist; best = i; }

      // reveal a panel once its center enters the lower 85% of viewport
      const inView = r.top < vh * 0.7 && r.bottom > vh * 0.3;
      contents[i].classList.toggle('is-in', inView);
    });

    const sceneIdx = parseInt(panels[best].dataset.scene, 10);
    activateScene(sceneIdx);

    // scroll parallax on the active photo: shift opposite to its scroll position
    const activePanel = panels[best];
    const r = activePanel.getBoundingClientRect();
    const prog = (mid - (r.top + r.height / 2)) / vh;   // ~ -1..1 through the panel
    const wrap = plx[sceneIdx];
    if (wrap && !reduced) {
      const py = (prog * 7) + (my * 1.6);   // vertical drift (scroll + mouse)
      const px = mx * 2.2;                   // horizontal from mouse only
      wrap.style.transform = `translate(${px.toFixed(2)}%, ${py.toFixed(2)}%)`;
    }

    nav.classList.toggle('is-stuck', window.scrollY > 40);
  }

  /* ── Smooth scroll via Lenis (graceful fallback) ── */
  let lenis = null;
  if (window.Lenis && !reduced) {
    lenis = new window.Lenis({ duration: 1.25, smoothWheel: true, lerp: 0.085, wheelMultiplier: 0.9 });
    function raf(t) { lenis.raf(t); frame(); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  } else {
    let ticking = false;
    const onScroll = () => { if (!ticking) { requestAnimationFrame(() => { frame(); ticking = false; }); ticking = true; } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', frame);
  }

  /* ── Mouse parallax (desktop, pointer:fine) ── */
  if (!reduced && window.matchMedia('(pointer:fine)').matches) {
    let tx = 0, ty = 0;
    window.addEventListener('mousemove', e => {
      tx = (e.clientX / window.innerWidth  - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    (function ease() { mx += (tx - mx) * 0.06; my += (ty - my) * 0.06; requestAnimationFrame(ease); })();
  }

  /* ── Smooth anchor navigation ── */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = $(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      navLinks && navLinks.classList.remove('is-open');
      burger && burger.classList.remove('is-open');
      if (lenis) lenis.scrollTo(target, { duration: 1.5 });
      else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    });
  });

  /* ── Mobile menu ── */
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open);
    });
  }

  /* ── Init ── */
  scenes[0].classList.add('is-active');
  railDots[0] && railDots[0].classList.add('is-on');
  contents[0].classList.add('is-in');
  if (reduced) { contents.forEach(c => c.classList.add('is-in')); }
  frame();
})();
