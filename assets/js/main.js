/* =========================================================
   AARUNI MULTISPECIALITY HOSPITAL — interactions
   ========================================================= */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- PRELOADER ---------- */
  document.body.classList.add('loading');
  var preloader = $('#preloader'),
      loadCount = $('#loadCount'),
      loadBar = $('#loadBar');

  function finishLoad() {
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
    if (preloader) {
      preloader.classList.add('done');
      setTimeout(function () { preloader.style.display = 'none'; }, 1100);
    }
    revealObserve();
  }

  if (reduce) {
    if (loadCount) loadCount.textContent = '100';
    if (loadBar) loadBar.style.width = '100%';
    finishLoad();
  } else {
    var pct = 0;
    var tick = setInterval(function () {
      pct += Math.floor(Math.random() * 9) + 3;
      if (pct >= 100) { pct = 100; clearInterval(tick); setTimeout(finishLoad, 350); }
      if (loadCount) loadCount.textContent = pct;
      if (loadBar) loadBar.style.width = pct + '%';
    }, 90);
  }

  /* ---------- CUSTOM CURSOR ---------- */
  if (fine) {
    var cursor = $('#cursor'), dot = $('#cursorDot');
    var cx = 0, cy = 0, tx = 0, ty = 0;
    document.addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
      if (dot) { dot.style.left = tx + 'px'; dot.style.top = ty + 'px'; }
    });
    (function loop() {
      cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
      if (cursor) { cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px'; }
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseenter', function () { document.body.classList.remove('cur-hide'); });
    document.addEventListener('mouseleave', function () { document.body.classList.add('cur-hide'); });
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest('[data-cursor]')) cursor.classList.add('grow');
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest('[data-cursor]')) cursor.classList.remove('grow');
    });
  }

  /* ---------- MAGNETIC BUTTONS ---------- */
  if (fine) {
    $$('[data-magnetic]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var mx = e.clientX - r.left - r.width / 2;
        var my = e.clientY - r.top - r.height / 2;
        el.style.transform = 'translate(' + mx * 0.28 + 'px,' + my * 0.4 + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* ---------- HEADER: scroll state + hide/show ---------- */
  var header = $('#header'), lastY = 0;
  window.addEventListener('scroll', function () {
    var y = window.pageYOffset;
    header.classList.toggle('scrolled', y > 40);
    if (y > lastY && y > 400 && !document.body.classList.contains('menu-open')) {
      header.classList.add('hide');
    } else {
      header.classList.remove('hide');
    }
    lastY = y;
  }, { passive: true });

  /* ---------- MOBILE MENU ---------- */
  var toggle = $('#menuToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      document.body.classList.toggle('menu-open');
    });
    $$('#menuOverlay a').forEach(function (a) {
      a.addEventListener('click', function () { document.body.classList.remove('menu-open'); });
    });
  }

  /* ---------- SCROLL REVEAL ---------- */
  var revealed = false;
  function revealObserve() {
    if (revealed) return; revealed = true;
    if (!('IntersectionObserver' in window)) {
      $$('.reveal').forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    $$('.reveal').forEach(function (el) { io.observe(el); });
  }

  /* ---------- COUNTERS ---------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var plain = el.getAttribute('data-plain'); // for year (no commas, no easing weirdness)
    if (reduce) { el.textContent = format(target); return; }
    var dur = 1600, start = null;
    var from = plain ? Math.max(target - 40, 0) : 0;
    function format(n) { return n.toLocaleString('en-IN'); }
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.floor(from + (target - from) * eased);
      el.textContent = format(val);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = format(target);
    }
    requestAnimationFrame(step);
  }
  function format(n) { return n.toLocaleString('en-IN'); }

  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateCount(en.target); cio.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    $$('[data-count]').forEach(function (el) { cio.observe(el); });
  } else {
    $$('[data-count]').forEach(function (el) { el.textContent = format(parseInt(el.getAttribute('data-count'), 10)); });
  }

  /* ---------- HERO TITLE: per-letter hover wobble ---------- */
  if (fine && !reduce) {
    $$('[data-split]').forEach(function (w) {
      w.addEventListener('mouseenter', function () {
        w.animate(
          [{ transform: 'translateY(0)' }, { transform: 'translateY(-10px)' }, { transform: 'translateY(0)' }],
          { duration: 500, easing: 'cubic-bezier(.16,1,.3,1)' }
        );
      });
    });
  }

  /* ---------- MARQUEE SPEED FROM WIDTH (keeps pace consistent) ---------- */
  // Track content is duplicated in markup so a -50% translate loops seamlessly.
  // Pause-on-hover and the keyframes live in CSS; nothing to clone here.

  /* ---------- APPOINTMENT FORM ---------- */
  var form = $('#apptForm'), note = $('#formNote');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = $('#fName'), phone = $('#fPhone'), dept = $('#fDept');
      var ok = true;
      [name, phone, dept].forEach(function (f) {
        if (!f.value) { f.style.borderColor = 'var(--coral)'; ok = false; }
        else { f.style.borderColor = ''; }
      });
      if (!ok) return;
      note.hidden = false;
      note.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      form.querySelectorAll('input,select,textarea').forEach(function (f) { f.value = ''; });
      setTimeout(function () { note.hidden = true; }, 9000);
    });
  }

  /* ---------- FOOTER YEAR + BACK TO TOP ---------- */
  var yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();
  var toTop = $('#toTop');
  if (toTop) toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });

  /* ---------- SMOOTH ANCHOR (respect header offset) ---------- */
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - 10;
      window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
    });
  });
})();
