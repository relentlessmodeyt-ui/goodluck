(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ── Split headings into per-letter spans for a staggered reveal ── */
  $$('[data-split]').forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    [...text].forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'ltr' + (ch === ' ' ? ' sp' : '');
      span.textContent = ch === ' ' ? ' ' : ch;
      span.style.transitionDelay = (i * 0.04) + 's';
      el.appendChild(span);
    });
  });

  /* ── Floating atmosphere motes (drift up through the whole journey) ── */
  const atmos = $('#atmos');
  if (atmos && !reduced) {
    const N = window.innerWidth < 760 ? 14 : 26;
    for (let i = 0; i < N; i++) {
      const m = document.createElement('div');
      m.className = 'mote';
      const size = (Math.random() * 3.5 + 1.3).toFixed(1);
      m.style.width = m.style.height = size + 'px';
      m.style.left = (Math.random() * 100) + '%';
      m.style.top  = (Math.random() * 100) + '%';
      m.style.setProperty('--dur',   (13 + Math.random() * 14).toFixed(1) + 's');
      m.style.setProperty('--delay', (Math.random() * 14).toFixed(1) + 's');
      m.style.setProperty('--dx',    (Math.random() * 80 - 40).toFixed(0) + 'px');
      m.style.setProperty('--dy',    (-80 - Math.random() * 120).toFixed(0) + 'px');
      m.style.setProperty('--peak',  (0.3 + Math.random() * 0.45).toFixed(2));
      atmos.appendChild(m);
    }
  }

  /* ── Elements ── */
  const acts     = $$('.act');
  const contents = $$('.act__content');
  const railDots = $$('.rail__dot');
  const nav      = $('#nav');
  const burger   = $('#burger');
  const navLinks = $('.nav__links');

  let activeRail = -1;
  function setRail(idx) {
    if (idx === activeRail) return;
    activeRail = idx;
    railDots.forEach((d, i) => d.classList.toggle('is-on', i === idx));
  }

  /* ── Per-frame: reveal content, keep the rail in sync ── */
  function frame() {
    const vh  = window.innerHeight;
    const mid = vh / 2;
    let best = 0, bestDist = Infinity;

    acts.forEach((a, i) => {
      const r = a.getBoundingClientRect();
      const center = r.top + r.height / 2;
      const dist = Math.abs(center - mid);
      if (dist < bestDist) { bestDist = dist; best = i; }
      const inView = r.top < vh * 0.78 && r.bottom > vh * 0.22;
      contents[i] && contents[i].classList.toggle('is-in', inView);
    });

    setRail(best);
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
  contents[0] && contents[0].classList.add('is-in');
  railDots[0] && railDots[0].classList.add('is-on');
  if (reduced) contents.forEach(c => c.classList.add('is-in'));
  frame();
})();
