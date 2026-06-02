/* =========================================================
   AARUNI MULTISPECIALITY HOSPITAL — interactions
   ========================================================= */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---- sticky header shadow ---- */
  var header = $('#header');
  var onScroll = function () {
    if (header) header.classList.toggle('scrolled', window.pageYOffset > 8);
    var tt = $('#totop');
    if (tt) tt.classList.toggle('show', window.pageYOffset > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- mobile nav ---- */
  var toggle = $('#navtoggle');
  if (toggle) {
    toggle.addEventListener('click', function () { document.body.classList.toggle('nav-open'); });
    $$('#mainnav a').forEach(function (a) {
      a.addEventListener('click', function () { document.body.classList.remove('nav-open'); });
    });
  }

  /* ---- scroll reveal ---- */
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    $$('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('in'); });
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
        if (!f.value) { f.style.borderColor = '#ff7a59'; valid = false; }
        else { f.style.borderColor = ''; }
      });
      if (!valid) return;
      ok.hidden = false;
      ok.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
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
      var y = t.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    });
  });
})();
