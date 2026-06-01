/* =========================================================
   Aaruni Multispeciality Hospital — Interactions
   Mobile nav · sticky header · scroll reveal · counters
   · organ cursor-glow + draw · hero orb tilt · appointment form
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        navToggle.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Sticky header shadow ---------- */
  var header = document.getElementById("header");
  var onScroll = function () { if (header) header.classList.toggle("is-scrolled", window.scrollY > 8); };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var duration = 1600, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var v = Math.floor(eased * target);
      el.textContent = v >= 1000 ? v.toLocaleString("en-IN") + "+" : String(v);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- Cursor-follow glow (organs + feature cards) ---------- */
  document.querySelectorAll(".organ, .feat").forEach(function (el) {
    el.addEventListener("pointermove", function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
      el.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
    });
  });

  /* ---------- Hero orb subtle tilt on pointer ---------- */
  var orb = document.querySelector("[data-tilt]");
  if (orb && window.matchMedia("(pointer:fine)").matches) {
    var stage = orb.closest(".hero__stage") || orb;
    stage.addEventListener("pointermove", function (e) {
      var r = stage.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      orb.style.transform = "rotateY(" + (x * 12) + "deg) rotateX(" + (-y * 12) + "deg)";
    });
    stage.addEventListener("pointerleave", function () { orb.style.transform = ""; });
  }

  /* ---------- Scroll reveal + counters ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entries, o) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); o.unobserve(entry.target); }
      });
    }, { threshold: 0.14 });
    reveals.forEach(function (el) { obs.observe(el); });

    var counted = false;
    var statsGrid = document.querySelector(".stats__grid");
    if (statsGrid) {
      var sObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !counted) {
            counted = true;
            document.querySelectorAll(".stat strong[data-count]").forEach(animateCount);
          }
        });
      }, { threshold: 0.4 });
      sObs.observe(statsGrid);
    }
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
    document.querySelectorAll(".stat strong[data-count]").forEach(animateCount);
  }

  /* ---------- Appointment form ---------- */
  var form = document.getElementById("appointmentForm");
  var note = document.getElementById("formNote");
  if (form && note) {
    var dateInput = form.querySelector('input[name="date"]');
    if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      note.className = "form-note";
      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      if (!name || !phone) { note.textContent = "Please enter your name and phone number."; note.classList.add("is-error"); return; }
      if (phone.replace(/\D/g, "").length < 8) { note.textContent = "Please enter a valid phone number."; note.classList.add("is-error"); return; }
      note.textContent = "Thank you, " + name + "! Our team will call you shortly to confirm your appointment.";
      note.classList.add("is-success");
      form.reset();
    });
  }

  /* ---------- Year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
