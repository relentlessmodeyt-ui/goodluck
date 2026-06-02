/* =========================================================
   AARUNI MULTI SPECIALITY HOSPITAL — interactions + motion
   GSAP + ScrollTrigger + Lenis (all optional / guarded)
   ========================================================= */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(pointer:fine)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var hasGSAP = !reduce && typeof window.gsap !== 'undefined';
  var hasST = hasGSAP && typeof window.ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  /* ---- Lenis smooth scroll (premium feel) ---- */
  var lenis = null;
  if (!reduce && typeof window.Lenis !== 'undefined') {
    try {
      lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      if (hasST) {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
        gsap.ticker.lagSmoothing(0);
      } else {
        var raf = function (time) { lenis.raf(time); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);
      }
    } catch (e) { lenis = null; }
  }

  /* ---- sticky nav + back-to-top ---- */
  var nav = $('#nav');
  var onScroll = function () {
    var y = window.pageYOffset;
    if (nav) nav.classList.toggle('scrolled', y > 8);
    var tt = $('#totop');
    if (tt) tt.classList.toggle('show', y > 700);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- mobile nav ---- */
  var toggle = $('#navtoggle');
  if (toggle) {
    toggle.addEventListener('click', function () { document.body.classList.toggle('nav-open'); });
    $$('#navlinks a').forEach(function (a) {
      a.addEventListener('click', function () { document.body.classList.remove('nav-open'); });
    });
  }

  /* ---- generate hero sparkles ---- */
  (function sparkle() {
    var host = $('#sparkles');
    if (!host) return;
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

  /* ---- scroll reveals (hero animates on load; rest on scroll) ---- */
  var allReveals = $$('.reveal');
  var heroReveals = allReveals.filter(function (el) { return !!el.closest('.hero'); });
  var scrollReveals = allReveals.filter(function (el) { return !el.closest('.hero'); });
  heroReveals.forEach(function (el, i) { el.style.transitionDelay = (0.12 + i * 0.1) + 's'; });

  if (reduce) {
    allReveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { heroReveals.forEach(function (el) { el.classList.add('in'); }); });
    });
    if (hasST) {
      scrollReveals.forEach(function (el) {
        ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: function () { el.classList.add('in'); } });
      });
    } else if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      scrollReveals.forEach(function (el) { io.observe(el); });
    } else {
      scrollReveals.forEach(function (el) { el.classList.add('in'); });
    }
  }

  /* ---- hero parallax: scroll depth + mouse 3D (on .par wrappers, conflict-free) ---- */
  (function () {
    var hero = $('.hero');
    var pars = $$('.par');
    if (reduce || !hero || !pars.length) return;
    var mx = 0, my = 0, cx = 0, cy = 0;
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
      var sp = -r.top / (window.innerHeight || 1);
      if (sp < 0) sp = 0; else if (sp > 1.4) sp = 1.4;
      for (var i = 0; i < data.length; i++) {
        var d = data[i];
        d.el.style.transform = 'translate3d(' + (cx * d.px).toFixed(1) + 'px,' + (cy * d.py + sp * d.ps).toFixed(1) + 'px,0)';
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  })();

  /* ---- 3D tilt on cards ---- */
  if (!reduce && fine) {
    $$('[data-tilt]').forEach(function (el) {
      var max = 9;
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = 'perspective(900px) rotateX(' + (-py * max).toFixed(2) +
          'deg) rotateY(' + (px * max).toFixed(2) + 'deg) translateZ(6px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* ---- touch: tap to flip cure cards (hover doesn't exist on touch) ---- */
  if (!fine) {
    $$('.flip').forEach(function (el) {
      el.addEventListener('click', function () { el.classList.toggle('is-flipped'); });
    });
  }

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
        if (!f.value) { f.style.borderColor = '#a64dff'; f.style.boxShadow = '0 0 22px rgba(166,77,255,.45)'; valid = false; }
        else { f.style.borderColor = ''; f.style.boxShadow = ''; }
      });
      if (!valid) return;
      ok.hidden = false;
      if (lenis) lenis.scrollTo(ok, { offset: -200 });
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
