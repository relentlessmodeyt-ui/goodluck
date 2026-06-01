/* =========================================================
   Aaruni Multispeciality Hospital — Kinetic Light Build
   Cursor dot + glow, scroll bar, clip-path reveals,
   counter animation, [data-tilt], magnetic buttons,
   FAQ accordion, modal, appointment form, sticky nav,
   hero watermark parallax, spec chips, service card modal.
   ========================================================= */
(function () {
  "use strict";

  /* ── Reduced motion check ──────────────────────────────── */
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Year ──────────────────────────────────────────────── */
  const yrEl = document.getElementById("yr");
  if (yrEl) yrEl.textContent = new Date().getFullYear();

  /* ── Cursor — dot (instant) + glow (lagging) ───────────── */
  const dot  = document.getElementById("cursorDot");
  const glow = document.getElementById("cursorGlow");
  let glowX = -300, glowY = -300;
  let targetX = -300, targetY = -300;

  if (dot && glow && !prefersReduced) {
    document.addEventListener("pointermove", e => {
      dot.style.left = e.clientX + "px";
      dot.style.top  = e.clientY + "px";
      targetX = e.clientX;
      targetY = e.clientY;
    }, { passive: true });

    function animateGlow() {
      glowX += (targetX - glowX) * 0.08;
      glowY += (targetY - glowY) * 0.08;
      glow.style.left = glowX + "px";
      glow.style.top  = glowY + "px";
      requestAnimationFrame(animateGlow);
    }
    animateGlow();

    document.addEventListener("mouseleave", () => { dot.style.opacity = "0"; });
    document.addEventListener("mouseenter", () => { dot.style.opacity = "1"; });
  }

  /* ── Scroll progress bar ────────────────────────────────── */
  const scrollBar = document.createElement("div");
  scrollBar.className = "scroll-bar";
  document.body.prepend(scrollBar);
  window.addEventListener("scroll", () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
    scrollBar.style.width = pct + "%";
  }, { passive: true });

  /* ── Sticky header ─────────────────────────────────────── */
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    header && header.classList.toggle("scrolled", window.scrollY > 60);
  }, { passive: true });

  /* ── Burger / mobile nav ────────────────────────────────── */
  const burger = document.getElementById("burger");
  const nav    = document.getElementById("nav");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = burger.classList.toggle("open");
      nav.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        burger.classList.remove("open");
        nav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ── Clip-path scroll reveal (IntersectionObserver) ────── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.01, rootMargin: "0px 0px 0px 0px" });
  document.querySelectorAll(".clip-reveal").forEach(el => io.observe(el));
  /* Fallback: reveal everything after 800ms in case observer misfires */
  setTimeout(() => {
    document.querySelectorAll(".clip-reveal:not(.visible)").forEach(el => el.classList.add("visible"));
  }, 800);

  /* ── Animated counters ──────────────────────────────────── */
  const counterIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el  = e.target;
      const end = parseInt(el.dataset.count, 10);
      let start = 0;
      const dur = 1800;
      const fps = 1000 / 60;
      const inc = end / (dur / fps);
      const timer = setInterval(() => {
        start += inc;
        if (start >= end) { start = end; clearInterval(timer); }
        if (end >= 1000) {
          el.textContent = Math.round(start / 1000) + "K+";
        } else {
          el.textContent = Math.round(start) + "+";
        }
      }, fps);
      counterIO.unobserve(el);
    });
  }, { threshold: .3 });
  document.querySelectorAll("[data-count]").forEach(el => counterIO.observe(el));

  /* ── 3D Tilt on [data-tilt] ─────────────────────────────── */
  if (!prefersReduced) {
    document.querySelectorAll("[data-tilt]").forEach(el => {
      el.style.willChange = "transform";
      el.addEventListener("pointermove", e => {
        const r  = el.getBoundingClientRect();
        const rx = ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -5;
        const ry = ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  5;
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
  }

  /* ── Magnetic buttons ───────────────────────────────────── */
  if (!prefersReduced) {
    document.querySelectorAll(".btn--magnetic").forEach(btn => {
      btn.addEventListener("pointermove", e => {
        const r  = btn.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width  / 2) * .20;
        const dy = (e.clientY - r.top  - r.height / 2) * .20;
        btn.style.transform = `translate(${dx}px,${dy}px)`;
      });
      btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
    });
  }

  /* ── FAQ accordion ──────────────────────────────────────── */
  document.querySelectorAll(".faq__btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const item   = btn.closest(".faq__item");
      const body   = item.querySelector(".faq__body");
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      document.querySelectorAll(".faq__btn[aria-expanded='true']").forEach(other => {
        if (other !== btn) {
          other.setAttribute("aria-expanded", "false");
          other.closest(".faq__item").querySelector(".faq__body").style.maxHeight = "0";
        }
      });

      btn.setAttribute("aria-expanded", String(!isOpen));
      body.style.maxHeight = isOpen ? "0" : body.scrollHeight + "px";
    });
  });

  /* ── Hero watermark parallax ────────────────────────────── */
  if (!prefersReduced) {
    const watermark = document.querySelector(".hero__watermark");
    window.addEventListener("scroll", () => {
      if (watermark) {
        watermark.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    }, { passive: true });
  }

  /* ── Dept / speciality modal ────────────────────────────── */
  const DEPTS = {
    heart: {
      title: "Cardiology",
      sub: "Heart Care & Cardiac Monitoring",
      icon: `<svg viewBox="0 0 24 24"><path d="M12 21s-7-4.35-9.5-8.5C.9 9.6 2.4 6 6 6c2 0 3.2 1.1 4 2.3C10.8 7.1 12 6 14 6c3.6 0 5.1 3.6 3.5 6.5C19 16.65 12 21 12 21z"/></svg>`,
      services: ["ECG & Echo", "24×7 Cardiac Monitoring", "Stress Testing", "Holter Monitor", "Angiography Referral", "Hypertension Management"],
      doctors: [
        { name: "Senior Cardiologist", qual: "MBBS, MD (Cardiology)", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80" }
      ],
      desc: "Our Cardiology department provides comprehensive cardiac care from basic ECG and echocardiography to management of complex heart conditions. Our team is available 24×7 for emergencies."
    },
    brain: {
      title: "Neurology",
      sub: "Brain, Spine & Nervous System",
      icon: `<svg viewBox="0 0 24 24"><path d="M12 2a6 6 0 0 0-6 6c0 2 1 3.5 2 5 .8 1.2 1 2 1 4h6c0-2 .2-2.8 1-4 1-1.5 2-3 2-5a6 6 0 0 0-6-6z"/></svg>`,
      services: ["MRI & CT Neuroimaging", "EEG", "Epilepsy Management", "Stroke Care", "Headache Clinic", "Nerve Conduction Studies"],
      doctors: [
        { name: "Senior Neurologist", qual: "MBBS, MD (Neurology)", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80" }
      ],
      desc: "Advanced care for neurological conditions including stroke, epilepsy, Parkinson's disease, migraines and spinal disorders backed by on-site MRI and CT neuroimaging."
    },
    spine: {
      title: "Orthopedics & Joint Replacement",
      sub: "Bones, Joints & Spine Surgery",
      icon: `<svg viewBox="0 0 24 24"><path d="M9 2v3H6a1 1 0 0 0-1 1v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a1 1 0 0 0-1-1h-3V2z"/></svg>`,
      services: ["Joint Replacement (Knee/Hip)", "Spine Surgery", "Fracture Management", "Sports Injuries", "Arthroscopy", "Reconstructive Surgery"],
      doctors: [
        { name: "Dr. Sunil Poonia", qual: "MBBS, MS (Orthopedics) — Founder", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80" }
      ],
      desc: "Founded by Dr. Sunil Poonia, our Orthopedics department specialises in advanced joint replacement surgeries, spine care, sports injury management and reconstructive procedures."
    },
    kidney: {
      title: "Urology",
      sub: "Kidney, Bladder & Urinary Tract",
      icon: `<svg viewBox="0 0 24 24"><path d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8zm0 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/></svg>`,
      services: ["Kidney Stone Treatment", "Prostate Care", "Cystoscopy", "TURP", "Laparoscopic Urology", "Bladder Disorders"],
      doctors: [
        { name: "Senior Urologist", qual: "MBBS, MS (Urology)", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=300&q=80" }
      ],
      desc: "Comprehensive urological services covering kidney stone management, prostate conditions, urinary tract disorders and minimally invasive laparoscopic procedures."
    },
    embryo: {
      title: "Gynaecology & Obstetrics",
      sub: "Women's Health & Maternity Care",
      icon: `<svg viewBox="0 0 24 24"><path d="M12 2C8.1 2 5 5.1 5 9c0 3.5 2.4 6.4 5.6 7.2V22h2.8v-5.8C16.6 15.4 19 12.5 19 9c0-3.9-3.1-7-7-7z"/></svg>`,
      services: ["Antenatal Care", "Safe Delivery", "High-Risk Pregnancy", "Laparoscopic Gynaecology", "NICU", "Fertility Counselling"],
      doctors: [
        { name: "Senior Gynaecologist", qual: "MBBS, MS (Obs & Gynae)", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=300&q=80" }
      ],
      desc: "Complete women's healthcare from routine gynaecology to high-risk pregnancy management, safe delivery, newborn care in our NICU, and laparoscopic procedures."
    },
  };

  const modal        = document.getElementById("modal");
  const modalOverlay = document.getElementById("modalOverlay");
  const modalClose   = document.getElementById("modalClose");
  const modalBody    = document.getElementById("modalBody");

  function openModal(key) {
    const d = DEPTS[key];
    if (!d || !modal) return;

    const doctorsHtml = d.doctors.map(doc => `
      <div class="modal__doctor-card">
        <img src="${doc.img}" alt="${doc.name}" loading="lazy"/>
        <div class="modal__doctor-info"><h3>${doc.name}</h3><p>${doc.qual}</p></div>
      </div>`).join("");

    const servicesHtml = d.services.map(s => `<span class="modal__service-tag">${s}</span>`).join("");

    modalBody.innerHTML = `
      <div class="modal__dept-header">
        <div class="modal__dept-icon">${d.icon}</div>
        <div class="modal__dept-title">
          <h2 id="modalTitle">${d.title}</h2>
          <p>${d.sub}</p>
        </div>
      </div>
      <p style="color:#666;font-size:.88rem;line-height:1.75;margin-bottom:8px">${d.desc}</p>
      <div class="modal__section-title">Our Doctors</div>
      <div class="modal__doctor-grid">${doctorsHtml}</div>
      <div class="modal__section-title">Services We Offer</div>
      <div class="modal__services">${servicesHtml}</div>
      <div style="margin-top:24px">
        <a href="#appointment" class="btn btn--dark" onclick="closeModal()">Book Appointment in ${d.title} →</a>
      </div>`;

    modal.removeAttribute("hidden");
    requestAnimationFrame(() => modal.classList.add("open"));
    document.body.style.overflow = "hidden";
    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    setTimeout(() => {
      modal.setAttribute("hidden", "");
      document.body.style.overflow = "";
    }, 430);
  }
  window.closeModal = closeModal;

  /* Service cards open modal */
  document.querySelectorAll(".scard[data-key]").forEach(el => {
    el.addEventListener("click", () => openModal(el.dataset.key));
    el.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(el.dataset.key); }
    });
  });

  /* Spec chips open modal */
  document.querySelectorAll(".spec-chip[data-key]").forEach(el => {
    el.addEventListener("click", () => openModal(el.dataset.key));
    el.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(el.dataset.key); }
    });
  });

  /* Doctor cards open modal */
  document.querySelectorAll(".doc-card[data-key]").forEach(el => {
    el.addEventListener("click", () => openModal(el.dataset.key));
  });

  if (modalOverlay) modalOverlay.addEventListener("click", closeModal);
  if (modalClose)   modalClose.addEventListener("click", closeModal);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  /* ── Appointment form ───────────────────────────────────── */
  const form     = document.getElementById("apptForm");
  const formNote = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name  = form.name.value.trim();
      const phone = form.phone.value.trim();
      if (!name || !phone) {
        formNote.textContent = "Please fill in your name and phone number.";
        formNote.className   = "form-note error";
        return;
      }
      const btn = form.querySelector("[type=submit]");
      btn.textContent = "Sending…";
      btn.disabled    = true;
      setTimeout(() => {
        formNote.textContent = "Thank you! Our team will call you back shortly.";
        formNote.className   = "form-note";
        form.reset();
        btn.textContent = "Request Appointment →";
        btn.disabled    = false;
      }, 1200);
    });
  }

})();
