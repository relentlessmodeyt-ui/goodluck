/* =========================================================
   AARUNI MULTISPECIALITY HOSPITAL — interactions + hero motion
   (smooth scroll + cosmic hero animation, all guarded)
   ========================================================= */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(pointer:fine)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---- sticky header shadow + back-to-top ---- */
  var header = $('#header');
  var onScroll = function () {
    var y = window.pageYOffset;
    if (header) header.classList.toggle('scrolled', y > 8);
    var tt = $('#totop');
    if (tt) tt.classList.toggle('show', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Lenis smooth scroll — buttery whole-page feel (optional / guarded) ---- */
  var lenis = null;
  function initLenis() {
    if (lenis || reduce || typeof window.Lenis === 'undefined') return;
    try {
      lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.6 });
      var raf = function (t) { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
      lenis.on('scroll', onScroll);
    } catch (e) { lenis = null; }
  }
  if (typeof window.Lenis !== 'undefined') initLenis();
  else window.addEventListener('load', initLenis);

  /* ---- mobile nav ---- */
  var toggle = $('#navtoggle');
  if (toggle) {
    toggle.addEventListener('click', function () { document.body.classList.toggle('nav-open'); });
    $$('#mainnav a').forEach(function (a) {
      a.addEventListener('click', function () { document.body.classList.remove('nav-open'); });
    });
  }

  /* ---- hero: generate twinkling sparkles ---- */
  (function sparkle() {
    var host = $('#sparkles');
    if (!host || reduce) return;
    var plus = '<svg viewBox="0 0 12 12"><path d="M6 0v12M0 6h12" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>';
    var star = '<svg viewBox="0 0 12 12"><path d="M6 0c.5 3.4 2.1 5 5.5 6-3.4 1-5 2.6-5.5 6-.5-3.4-2.1-5-5.5-6 3.4-1 5-2.6 5.5-6Z"/></svg>';
    var N = window.innerWidth < 640 ? 16 : 30;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < N; i++) {
      var s = document.createElement('span');
      s.className = 'spark';
      var size = 7 + Math.random() * 13;
      s.style.cssText = 'left:' + (Math.random() * 100).toFixed(2) + '%;top:' + (Math.random() * 100).toFixed(2) +
        '%;width:' + size + 'px;height:' + size + 'px;--tw:' + (3 + Math.random() * 4).toFixed(2) +
        's;--dl:' + (Math.random() * 5).toFixed(2) + 's';
      s.innerHTML = Math.random() > 0.5 ? plus : star;
      frag.appendChild(s);
    }
    host.appendChild(frag);
  })();

  /* ---- scroll reveal — hero always animates in on load (any viewport height);
         the rest reveal on scroll ---- */
  var heroReveals = $$('.hero .reveal');
  var scrollReveals = $$('.reveal').filter(function (el) { return !el.closest('.hero'); });
  heroReveals.forEach(function (el, i) { el.style.transitionDelay = (0.1 + i * 0.12) + 's'; });

  if (reduce) {
    $$('.reveal').forEach(function (el) { el.classList.add('in'); });
  } else {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { heroReveals.forEach(function (el) { el.classList.add('in'); }); });
    });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      scrollReveals.forEach(function (el) { io.observe(el); });
    } else {
      scrollReveals.forEach(function (el) { el.classList.add('in'); });
    }
  }

  /* ---- hero parallax: pointer drift + scroll depth (on .par layers, conflict-free) ---- */
  (function () {
    var hero = $('.hero');
    var pars = $$('.par');
    if (reduce || !hero || !pars.length) return;
    var mx = 0, my = 0, cx = 0, cy = 0, vh = window.innerHeight || 1;
    window.addEventListener('resize', function () { vh = window.innerHeight || 1; }, { passive: true });
    if (fine) {
      hero.addEventListener('mousemove', function (e) {
        var r = hero.getBoundingClientRect();
        mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        my = ((e.clientY - r.top) / r.height - 0.5) * 2;
      });
      hero.addEventListener('mouseleave', function () { mx = 0; my = 0; });
    }
    var data = pars.map(function (el) {
      return { el: el, px: +el.getAttribute('data-px') || 0, py: +el.getAttribute('data-py') || 0, ps: +el.getAttribute('data-ps') || 0 };
    });
    function frame() {
      cx += (mx - cx) * 0.07; cy += (my - cy) * 0.07;
      var r = hero.getBoundingClientRect();
      if (r.bottom > -40 && r.top < vh) {           /* only paint while hero is on-screen */
        var sp = -r.top / vh; if (sp < 0) sp = 0; else if (sp > 1.4) sp = 1.4;
        for (var i = 0; i < data.length; i++) {
          var d = data[i];
          d.el.style.transform = 'translate3d(' + (cx * d.px).toFixed(1) + 'px,' + (cy * d.py + sp * d.ps).toFixed(1) + 'px,0)';
        }
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  })();

  /* ---- count-up stats ---- */
  function fmt(n) { return n.toLocaleString('en-IN'); }
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (reduce) { el.textContent = fmt(target); return; }
    var plain = el.getAttribute('data-plain');
    var from = plain ? Math.max(target - 35, 0) : 0;
    var dur = 1500, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var v = Math.floor(from + (target - from) * (1 - Math.pow(1 - p, 3)));
      el.textContent = fmt(v);
      if (p < 1) requestAnimationFrame(step); else el.textContent = fmt(target);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { countUp(en.target); cio.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    $$('[data-count]').forEach(function (el) { cio.observe(el); });
  } else {
    $$('[data-count]').forEach(function (el) { el.textContent = fmt(parseInt(el.getAttribute('data-count'), 10)); });
  }

  /* ---- date input: no past dates ---- */
  var dt = $('#dt');
  if (dt) { dt.min = new Date().toISOString().split('T')[0]; }

  /* ---- appointment form ---- */
  var form = $('#apptForm'), ok = $('#formOk');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      ['#n', '#p', '#d'].forEach(function (sel) {
        var f = $(sel);
        if (!f.value) { f.style.borderColor = '#ff7a59'; valid = false; }
        else { f.style.borderColor = ''; }
      });
      if (!valid) return;
      ok.hidden = false;
      if (lenis) lenis.scrollTo(ok, { offset: -160 });
      else ok.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      form.querySelectorAll('input,select,textarea').forEach(function (f) { f.value = ''; });
      setTimeout(function () { ok.hidden = true; }, 9000);
    });
  }

  /* ---- year + smooth anchors ---- */
  var yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      if (lenis) { lenis.scrollTo(t, { offset: -70 }); }
      else {
        var y = t.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
      }
    });
  });
})();
