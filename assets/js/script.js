/* =========================================================
   Aaruni Multispeciality Hospital — Interactions
   ========================================================= */
(function () {
  "use strict";

  /* ── Year ──────────────────────────────────────────────── */
  const yrEl = document.getElementById("yr");
  if (yrEl) yrEl.textContent = new Date().getFullYear();

  /* ── Sticky header ─────────────────────────────────────── */
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    header && header.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  /* ── Burger / mobile nav ────────────────────────────────── */
  const burger = document.getElementById("burger");
  const nav    = document.getElementById("nav");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = burger.classList.toggle("open");
      nav.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open);
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

  /* ── Particle canvas ────────────────────────────────────── */
  (function initParticles() {
    const canvas = document.getElementById("particles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, particles = [];

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const PARTICLE_COUNT = 80;
    const CROSS_COUNT    = 12;

    function randomParticle(isCross) {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - .5) * .4,
        vy: (Math.random() - .5) * .4,
        size: isCross ? (Math.random() * 6 + 4) : (Math.random() * 1.8 + .6),
        alpha: Math.random() * .4 + .1,
        isCross,
        pulse: Math.random() * Math.PI * 2,
      };
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(randomParticle(false));
    for (let i = 0; i < CROSS_COUNT; i++)    particles.push(randomParticle(true));

    function drawCross(x, y, size, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = "rgba(0,229,212,1)";
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x - size, y); ctx.lineTo(x + size, y);
      ctx.moveTo(x, y - size); ctx.lineTo(x, y + size);
      ctx.stroke();
      ctx.restore();
    }

    let raf;
    function tick() {
      ctx.clearRect(0, 0, W, H);
      const t = Date.now() / 1000;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += .012;
        const a = p.alpha * (.7 + .3 * Math.sin(p.pulse));
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        if (p.isCross) {
          drawCross(p.x, p.y, p.size, a * .5);
        } else {
          ctx.save();
          ctx.globalAlpha = a;
          ctx.fillStyle = Math.random() > .3 ? "#00e5d4" : "#4f8eff";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      // draw connecting lines between close particles
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.save();
            ctx.globalAlpha = (.12 * (1 - dist / 100));
            ctx.strokeStyle = "#00e5d4";
            ctx.lineWidth = .6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      raf = requestAnimationFrame(tick);
    }
    tick();
  })();

  /* ── Hero orb 3D tilt ───────────────────────────────────── */
  (function initOrbTilt() {
    const wrap = document.getElementById("orbWrap");
    const orb  = document.getElementById("heroOrb");
    if (!wrap || !orb) return;
    wrap.addEventListener("pointermove", e => {
      const r   = wrap.getBoundingClientRect();
      const cx  = r.left + r.width  / 2;
      const cy  = r.top  + r.height / 2;
      const rx  =  ((e.clientY - cy) / (r.height / 2)) * -12;
      const ry  =  ((e.clientX - cx) / (r.width  / 2)) *  12;
      orb.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    wrap.addEventListener("pointerleave", () => {
      orb.style.transform = "";
    });
  })();

  /* ── Generic 3D card tilt ───────────────────────────────── */
  function add3DTilt(selector, strength = 8) {
    document.querySelectorAll(selector).forEach(card => {
      card.addEventListener("pointermove", e => {
        const r  = card.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
        const rx =  ((e.clientY - cy) / (r.height / 2)) * -strength;
        const ry =  ((e.clientX - cx) / (r.width  / 2)) *  strength;
        card.style.transform = `translateY(-8px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }
  add3DTilt(".doc-card:not(.doc-card--cta)", 6);
  add3DTilt(".feat", 5);

  /* ── Scroll reveal ──────────────────────────────────────── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
    });
  }, { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  /* ── Animated counters ──────────────────────────────────── */
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el  = e.target;
      const end = parseInt(el.dataset.count, 10);
      let start = 0;
      const dur = 1800;
      const step = dur / 60;
      const inc  = end / (dur / (1000 / 60));
      const timer = setInterval(() => {
        start += inc;
        if (start >= end) { start = end; clearInterval(timer); }
        const suffix = end >= 1000 ? "+" : (end === 24 ? "×7" : "+");
        el.textContent = end >= 1000
          ? Math.round(start / 1000) + "K" + "+"
          : Math.round(start) + (end === 24 ? "×7" : "+");
      }, 1000 / 60);
      counterIO.unobserve(el);
    });
  }, { threshold: .3 });
  document.querySelectorAll("[data-count]").forEach(el => counterIO.observe(el));

  /* ── FAQ accordion ──────────────────────────────────────── */
  document.querySelectorAll(".faq__btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const item   = btn.closest(".faq__item");
      const body   = item.querySelector(".faq__body");
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      // close all others
      document.querySelectorAll(".faq__btn[aria-expanded='true']").forEach(other => {
        if (other !== btn) {
          other.setAttribute("aria-expanded", "false");
          other.closest(".faq__item").querySelector(".faq__body").style.maxHeight = "0";
        }
      });

      btn.setAttribute("aria-expanded", !isOpen);
      body.style.maxHeight = isOpen ? "0" : body.scrollHeight + "px";
    });
  });

  /* ── Dept / organ modal ─────────────────────────────────── */
  const DEPTS = {
    heart: {
      title: "Cardiology",
      sub: "Heart Care & Cardiac Monitoring",
      icon: `<svg viewBox="0 0 24 24" style="color:#00e5d4"><path d="M12 21s-7-4.35-9.5-8.5C.9 9.6 2.4 6 6 6c2 0 3.2 1.1 4 2.3C10.8 7.1 12 6 14 6c3.6 0 5.1 3.6 3.5 6.5C19 16.65 12 21 12 21z"/></svg>`,
      services: ["ECG & Echo", "24×7 Cardiac Monitoring", "Stress Testing", "Holter Monitor", "Angiography Referral", "Hypertension Management"],
      doctors: [
        { name: "Senior Cardiologist", qual: "MBBS, MD (Cardiology)", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80" }
      ],
      desc: "Our Cardiology department provides comprehensive cardiac care from basic ECG and echocardiography to management of complex heart conditions. Our team is available 24×7 for emergencies."
    },
    brain: {
      title: "Neurology",
      sub: "Brain, Spine & Nervous System",
      icon: `<svg viewBox="0 0 24 24" style="color:#00e5d4"><path d="M12 2a6 6 0 0 0-6 6c0 2 1 3.5 2 5 .8 1.2 1 2 1 4h6c0-2 .2-2.8 1-4 1-1.5 2-3 2-5a6 6 0 0 0-6-6z"/></svg>`,
      services: ["MRI & CT Neuroimaging", "EEG", "Epilepsy Management", "Stroke Care", "Headache Clinic", "Nerve Conduction Studies"],
      doctors: [
        { name: "Senior Neurologist", qual: "MBBS, MD (Neurology)", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80" }
      ],
      desc: "Advanced care for neurological conditions including stroke, epilepsy, Parkinson's disease, migraines and spinal disorders backed by on-site MRI and CT neuroimaging."
    },
    spine: {
      title: "Orthopedics & Joint Replacement",
      sub: "Bones, Joints & Spine Surgery",
      icon: `<svg viewBox="0 0 24 24" style="color:#00e5d4"><path d="M9 2v3H6a1 1 0 0 0-1 1v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a1 1 0 0 0-1-1h-3V2z"/></svg>`,
      services: ["Joint Replacement (Knee/Hip)", "Spine Surgery", "Fracture Management", "Sports Injuries", "Arthroscopy", "Reconstructive Surgery"],
      doctors: [
        { name: "Dr. Sunil Poonia", qual: "MBBS, MS (Orthopedics) — Founder", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80" }
      ],
      desc: "Founded by Dr. Sunil Poonia, our Orthopedics department specialises in advanced joint replacement surgeries, spine care, sports injury management and reconstructive procedures."
    },
    kidney: {
      title: "Urology",
      sub: "Kidney, Bladder & Urinary Tract",
      icon: `<svg viewBox="0 0 24 24" style="color:#00e5d4"><path d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8zm0 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/></svg>`,
      services: ["Kidney Stone Treatment", "Prostate Care", "Cystoscopy", "TURP", "Laparoscopic Urology", "Bladder Disorders"],
      doctors: [
        { name: "Senior Urologist", qual: "MBBS, MS (Urology)", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=300&q=80" }
      ],
      desc: "Comprehensive urological services covering kidney stone management, prostate conditions, urinary tract disorders and minimally invasive laparoscopic procedures."
    },
    embryo: {
      title: "Gynaecology & Obstetrics",
      sub: "Women's Health & Maternity Care",
      icon: `<svg viewBox="0 0 24 24" style="color:#c084fc"><path d="M12 2C8.1 2 5 5.1 5 9c0 3.5 2.4 6.4 5.6 7.2V22h2.8v-5.8C16.6 15.4 19 12.5 19 9c0-3.9-3.1-7-7-7z"/></svg>`,
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
        <div class="modal__doctor-info">
          <h3>${doc.name}</h3>
          <p>${doc.qual}</p>
        </div>
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
      <p style="color:var(--muted);font-size:.9rem;line-height:1.7;margin-bottom:8px">${d.desc}</p>
      <div class="modal__section-title">Our Doctors</div>
      <div class="modal__doctor-grid">${doctorsHtml}</div>
      <div class="modal__section-title">Services We Offer</div>
      <div class="modal__services">${servicesHtml}</div>
      <div style="margin-top:24px">
        <a href="#appointment" class="btn btn--primary" onclick="closeModal()">Book Appointment in ${d.title}</a>
      </div>`;

    modal.removeAttribute("hidden");
    requestAnimationFrame(() => modal.classList.add("open"));
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    setTimeout(() => { modal.setAttribute("hidden", ""); document.body.style.overflow = ""; }, 420);
  }

  // expose for inline onclick
  window.closeModal = closeModal;

  document.querySelectorAll(".organ[data-key]").forEach(el => {
    el.addEventListener("click", () => openModal(el.dataset.key));
    el.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(el.dataset.key); } });
  });

  // doc cards clicking to matching modal
  document.querySelectorAll(".doc-card[data-key]").forEach(el => {
    el.addEventListener("click", () => openModal(el.dataset.key));
  });

  if (modalOverlay) modalOverlay.addEventListener("click", closeModal);
  if (modalClose)   modalClose.addEventListener("click",   closeModal);
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
        btn.textContent = "Request Appointment";
        btn.disabled    = false;
      }, 1200);
    });
  }

  /* ── Parallax: hero bg word + city text on scroll ───────── */
  const bgWord  = document.querySelector(".hero__bg-word");
  const cityWrap = document.querySelector(".hero__city-wrap");
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (bgWord)   bgWord.style.transform   = `translate(-50%, calc(-50% + ${y * .25}px))`;
    if (cityWrap) cityWrap.style.transform = `translateY(${y * .15}px)`;
  }, { passive: true });

})();
