/* =========================================================
   Aaruni Multispeciality Hospital — Interactions
   ========================================================= */
(function () {
  "use strict";

  /* ── Mobile nav ── */
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

  /* ── Sticky header ── */
  var header = document.getElementById("header");
  window.addEventListener("scroll", function () {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }, { passive: true });

  /* ── Animated counters ── */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var duration = 1600, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var v = Math.floor((1 - Math.pow(1 - p, 3)) * target);
      el.textContent = v >= 1000 ? v.toLocaleString("en-IN") + "+" : String(v);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ── Particle canvas ── */
  var canvas = document.getElementById("heroParticles");
  if (canvas) {
    var ctx = canvas.getContext("2d");
    var particles = [];
    var W, H;

    function resize() {
      var hero = canvas.parentElement;
      W = canvas.width = hero.offsetWidth;
      H = canvas.height = hero.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Medical cross shape helper
    function drawCross(x, y, size, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = "rgba(41,231,214,1)";
      ctx.lineWidth = size * .28;
      ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(x - size, y); ctx.lineTo(x + size, y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, y - size); ctx.lineTo(x, y + size); ctx.stroke();
      ctx.restore();
    }

    // Init particles
    for (var i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * (W || 1200),
        y: Math.random() * (H || 600),
        vx: (Math.random() - .5) * .4,
        vy: -Math.random() * .55 - .15,
        size: Math.random() * 1.6 + .5,
        alpha: Math.random() * .35 + .08,
        isCross: Math.random() < .18,
        crossSize: Math.random() * 4 + 3,
        pulse: Math.random() * Math.PI * 2
      });
    }

    var frame = 0;
    function tick() {
      ctx.clearRect(0, 0, W, H);
      frame++;
      particles.forEach(function (p) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += .025;
        var a = p.alpha * (.7 + .3 * Math.sin(p.pulse));
        if (p.y < -20) { p.y = H + 10; p.x = Math.random() * W; }
        if (p.x < -20 || p.x > W + 20) { p.x = Math.random() * W; }
        if (p.isCross) {
          drawCross(p.x, p.y, p.crossSize, a * .7);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = frame % 120 < 60
            ? "rgba(41,231,214," + a + ")"
            : "rgba(58,160,255," + a * .7 + ")";
          ctx.fill();
        }
      });
      requestAnimationFrame(tick);
    }
    tick();
  }

  /* ── Hero orb tilt ── */
  var orb = document.querySelector("[data-tilt]");
  if (orb && window.matchMedia("(pointer:fine)").matches) {
    var stage = orb.closest(".hero__stage") || orb;
    stage.addEventListener("pointermove", function (e) {
      var r = stage.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - .5;
      var y = (e.clientY - r.top) / r.height - .5;
      orb.style.transform = "rotateY(" + (x * 14) + "deg) rotateX(" + (-y * 14) + "deg)";
    });
    stage.addEventListener("pointerleave", function () {
      orb.style.transform = "";
    });
  }

  /* ── Cursor glow on organ + feat cards ── */
  document.querySelectorAll(".organ, .feat").forEach(function (el) {
    el.addEventListener("pointermove", function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
      el.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
    });
  });

  /* ── 3D organ card tilt on hover ── */
  if (window.matchMedia("(pointer:fine)").matches) {
    document.querySelectorAll(".organ[data-key]").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - .5;
        var y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = "translateY(-8px) rotateY(" + (x * 8) + "deg) rotateX(" + (-y * 8) + "deg)";
      });
      card.addEventListener("pointerleave", function () {
        card.style.transform = "";
      });
    });
  }

  /* ── Scroll reveal ── */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entries, o) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); o.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { obs.observe(el); });

    var counted = false;
    var statsGrid = document.querySelector(".stats__grid");
    if (statsGrid) {
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && !counted) {
          counted = true;
          document.querySelectorAll(".stat strong[data-count]").forEach(animateCount);
        }
      }, { threshold: 0.4 }).observe(statsGrid);
    }
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
    document.querySelectorAll(".stat strong[data-count]").forEach(animateCount);
  }

  /* ── Hero parallax on watermark ── */
  var watermark = document.querySelector(".hero__watermark");
  var cityText = document.querySelector(".hero__city");
  if (watermark || cityText) {
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      if (watermark) watermark.style.transform = "translateY(" + (y * .18) + "px)";
      if (cityText) cityText.style.transform = "translateX(-50%) translateY(" + (y * .12) + "px)";
    }, { passive: true });
  }

  /* ── Department / Doctor modal ── */
  var departments = {
    heart: {
      name: "Cardiology", icon: "🫀",
      tagline: "Advanced cardiac care around the clock",
      desc: "Our cardiology unit provides comprehensive diagnosis and management of heart conditions — including arrhythmias, coronary artery disease, heart failure and hypertension — with 24×7 cardiac monitoring.",
      services: ["12-Lead ECG", "Echocardiography", "Holter Monitoring", "Cardiac Stress Test", "Heart Disease Management", "24×7 Cardiac ICU"],
      doctor: { name: "Our Cardiology Specialist", qual: "MBBS, MD (Cardiology)", role: "Senior Cardiologist", note: "Book an appointment to meet our cardiologist and discuss your cardiac health." }
    },
    brain: {
      name: "Neurology", icon: "🧠",
      tagline: "Expert care for the brain & nervous system",
      desc: "Our neurology department handles stroke, epilepsy, migraines, Parkinson's disease and other neurological disorders using advanced diagnostics including MRI and nerve conduction studies.",
      services: ["EEG", "Nerve Conduction Study", "Stroke Care Unit", "Epilepsy Management", "Neuro Imaging (MRI/CT)", "Headache Clinic"],
      doctor: { name: "Our Neurology Specialist", qual: "MBBS, MD (Neurology)", role: "Senior Neurologist", note: "Book an appointment to be assessed by our neurologist." }
    },
    spine: {
      name: "Orthopedics & Joint Replacement", icon: "🦴",
      tagline: "Restoring mobility, rebuilding lives",
      desc: "Founded by eminent orthopaedist Dr. Sunil Poonia, our department specialises in joint replacement, spine surgery, fracture management, sports injuries and reconstructive procedures.",
      services: ["Total Knee Replacement", "Total Hip Replacement", "Spine Surgery", "Fracture Management", "Sports Injury", "Arthroscopy"],
      doctor: { name: "Dr. Sunil Poonia", qual: "MBBS, MS (Orthopedics)", role: "Founder & Chief Orthopedic Surgeon", note: "Specialist in joint replacement, complex spine surgeries and advanced trauma care." }
    },
    kidney: {
      name: "Urology", icon: "🫘",
      tagline: "Complete urological care, medical & surgical",
      desc: "Our urology department treats kidney stones, urinary tract infections, prostate conditions and bladder disorders using minimally invasive and laser-assisted techniques.",
      services: ["Kidney Stone (Laser)", "TURP / Prostate", "Urinary Tract Care", "Bladder Disorders", "Minimally Invasive Surgery", "Nephrology Consultation"],
      doctor: { name: "Our Urology Specialist", qual: "MBBS, MS (Urology)", role: "Senior Urologist", note: "Book an appointment to consult our urologist for a thorough evaluation." }
    },
    embryo: {
      name: "Gynaecology & Obstetrics", icon: "🤰",
      tagline: "Safe, compassionate care for every woman",
      desc: "Our dedicated team provides antenatal care, safe deliveries, laparoscopic gynaecological surgeries and comprehensive women's health services in a warm, private environment.",
      services: ["Antenatal & Postnatal Care", "Safe Normal & C-Section Delivery", "Laparoscopic Gynaecology", "PCOS / PCOD Management", "Infertility Evaluation", "High-Risk Pregnancy"],
      doctor: { name: "Our Gynaecology Specialist", qual: "MBBS, MS (Obstetrics & Gynaecology)", role: "Senior Gynaecologist & Obstetrician", note: "Book an appointment for a private, compassionate consultation." }
    }
  };

  var modal = document.getElementById("deptModal");
  var modalContent = document.getElementById("modalContent");
  var modalClose = document.getElementById("modalClose");
  var modalBackdrop = document.getElementById("modalBackdrop");

  function openModal(key) {
    var d = departments[key]; if (!d || !modal) return;
    var servicesHTML = d.services.map(function (s) { return '<span class="modal__service">' + s + '</span>'; }).join("");
    modalContent.innerHTML =
      '<p class="modal__dept-name">' + d.icon + ' ' + d.name + '</p>' +
      '<span class="modal__tagline">' + d.tagline + '</span>' +
      '<p class="modal__desc">' + d.desc + '</p>' +
      '<div class="modal__services">' + servicesHTML + '</div>' +
      '<div class="modal__divider"></div>' +
      '<div class="modal__doctor">' +
        '<span class="modal__doc-avatar">👨‍⚕️</span>' +
        '<div>' +
          '<p class="modal__doc-name">' + d.doctor.name + '</p>' +
          '<p class="modal__doc-qual">' + d.doctor.qual + '</p>' +
          '<p class="modal__doc-role">' + d.doctor.role + '</p>' +
          '<p class="modal__doc-note">' + d.doctor.note + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="modal__cta">' +
        '<a href="#appointment" class="btn btn--primary">Book Appointment</a>' +
        '<a href="tel:+919587875550" class="btn btn--ghost">Call +91 95878 75550</a>' +
      '</div>';
    modal.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
    // Focus the close button
    setTimeout(function () { if (modalClose) modalClose.focus(); }, 50);
  }

  function closeModal() {
    if (!modal) return;
    modal.setAttribute("hidden", "");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".organ[data-key]").forEach(function (card) {
    card.addEventListener("click", function () { openModal(card.getAttribute("data-key")); });
    card.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(card.getAttribute("data-key")); } });
  });
  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });

  /* ── FAQ accordion ── */
  document.querySelectorAll(".faq__q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      var answer = btn.nextElementSibling;
      // Close all others
      document.querySelectorAll(".faq__q[aria-expanded='true']").forEach(function (other) {
        if (other !== btn) {
          other.setAttribute("aria-expanded", "false");
          other.nextElementSibling.style.height = "0";
        }
      });
      if (expanded) {
        btn.setAttribute("aria-expanded", "false");
        answer.style.height = "0";
      } else {
        btn.setAttribute("aria-expanded", "true");
        answer.style.height = answer.scrollHeight + "px";
      }
    });
  });

  /* ── Appointment form ── */
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
      note.textContent = "Thank you, " + name + "! Our team will call you shortly.";
      note.classList.add("is-success");
      form.reset();
    });
  }

  /* ── Smooth modal anchor close ── */
  document.querySelectorAll('.modal__cta a[href="#appointment"]').forEach(function (a) {
    a.addEventListener("click", closeModal);
  });

  /* ── Year ── */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
