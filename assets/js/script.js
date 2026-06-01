/* =========================================================
   Aaruni Multispeciality Hospital — Interactions
   - Mobile navigation
   - Sticky header shadow
   - Animated stat counters
   - Scroll reveal
   - Appointment form (client-side handling)
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

    // Close the menu after choosing a link (mobile)
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
  var onScroll = function () {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var duration = 1600;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      // easeOutCubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.floor(eased * target);
      el.textContent = value >= 1000 ? value.toLocaleString("en-IN") + "+" : String(value);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- Scroll reveal + counters via IntersectionObserver ---------- */
  var revealTargets = document.querySelectorAll(
    ".card, .facility, .why__item, .contact__card, .quick__item, .about__content, .about__media, .section__head"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var revealObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { revealObs.observe(el); });

    var counted = false;
    var statsSection = document.querySelector(".stats");
    if (statsSection) {
      var statObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !counted) {
            counted = true;
            document.querySelectorAll(".stat strong[data-count]").forEach(animateCount);
          }
        });
      }, { threshold: 0.4 });
      statObs.observe(statsSection);
    }
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
    document.querySelectorAll(".stat strong[data-count]").forEach(animateCount);
  }

  /* ---------- Appointment form ---------- */
  var form = document.getElementById("appointmentForm");
  var note = document.getElementById("formNote");

  if (form && note) {
    // Prevent past dates
    var dateInput = form.querySelector('input[name="date"]');
    if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      note.className = "form-note";

      var name = form.name.value.trim();
      var phone = form.phone.value.trim();

      if (!name || !phone) {
        note.textContent = "Please enter your name and phone number.";
        note.classList.add("is-error");
        return;
      }
      if (phone.replace(/\D/g, "").length < 8) {
        note.textContent = "Please enter a valid phone number.";
        note.classList.add("is-error");
        return;
      }

      // No backend wired up — acknowledge and offer a direct call.
      note.textContent = "Thank you, " + name + "! Our team will call you shortly to confirm your appointment.";
      note.classList.add("is-success");
      form.reset();
    });
  }

  /* ---------- Current year in footer ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
