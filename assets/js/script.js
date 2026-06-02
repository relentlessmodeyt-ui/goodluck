'use strict';

/* ═══════════════════════════════════════════════════════════════
   AARUNI MULTISPECIALITY HOSPITAL — CINEMATIC JS
   ═══════════════════════════════════════════════════════════════ */

/* ── DEPTS DATA ── */
const DEPTS = {
  heart: {
    title: 'Cardiology',
    sub: 'Heart Care & Cardiac Monitoring',
    desc: 'Our Cardiology department provides comprehensive heart care with round-the-clock cardiac monitoring, advanced diagnostics and evidence-based treatment for all cardiac conditions.',
    services: ['ECG & Echocardiography', '24×7 Cardiac Monitoring', 'Stress Testing', 'Holter Monitor', 'Angiography Referral', 'Hypertension Management', 'Cardiac Rehabilitation']
  },
  brain: {
    title: 'Neurology',
    sub: 'Brain & Nervous System Care',
    desc: 'Advanced neurological care including MRI and CT neuroimaging, epilepsy management, stroke treatment and headache clinic by experienced neurologists.',
    services: ['MRI & CT Neuroimaging', 'Epilepsy Management', 'Stroke Care & Rehabilitation', 'Headache Clinic', 'EEG', "Parkinson's Management", 'Nerve Conduction Studies']
  },
  spine: {
    title: 'Orthopedics & Joint Replacement',
    sub: 'Bone, Joint & Spine Care',
    desc: 'Founded by Dr. Sunil Poonia (MBBS, MS Orthopedics), our orthopedics department provides the full spectrum of musculoskeletal care from sports injuries to complex joint replacement.',
    services: ['Total Knee & Hip Replacement', 'Spine Surgery', 'Sports Injury Treatment', 'Fracture Management', 'Arthroscopy', 'Trauma & Reconstructive Surgery', 'Physiotherapy']
  },
  kidney: {
    title: 'Urology',
    sub: 'Kidney & Urinary Tract Care',
    desc: 'Expert urology services including kidney stone management, prostate care and minimally invasive laparoscopic procedures.',
    services: ['Kidney Stone Treatment (PCNL/URS)', 'Laparoscopic Urology', 'Prostate Care', 'Bladder Disorders', 'Male Infertility', 'Urinary Tract Infections', 'Cystoscopy']
  },
  embryo: {
    title: 'Gynaecology & Obstetrics',
    sub: "Women's Health & Maternity Care",
    desc: "Comprehensive women's health services from antenatal care to safe delivery with NICU support, and laparoscopic gynaecological procedures.",
    services: ['Antenatal & Postnatal Care', 'Normal & Caesarean Delivery', 'NICU Support', 'Laparoscopic Gynaecology', 'High-Risk Pregnancy', 'Menstrual Disorders', 'Fertility Consultation']
  }
};

/* ── REDUCED MOTION CHECK ── */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ══════════════════════════════════════════════
   SMOOTH SCROLL (lerp RAF)
══════════════════════════════════════════════ */
let currentY   = 0;
let targetY    = 0;
let totalHeight = 0;
const LERP     = 0.075;
const wrap     = document.getElementById('smoothWrap');

function calcHeight() {
  totalHeight = wrap ? wrap.getBoundingClientRect().height - window.innerHeight : document.body.scrollHeight - window.innerHeight;
}

if (!prefersReduced && wrap) {
  calcHeight();
  window.addEventListener('resize', calcHeight);
  window.addEventListener('wheel', e => {
    targetY = Math.max(0, Math.min(totalHeight, targetY + e.deltaY));
  }, { passive: true });
  window.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
  let touchStartY = 0;
  window.addEventListener('touchmove', e => {
    const dy = touchStartY - e.touches[0].clientY;
    targetY = Math.max(0, Math.min(totalHeight, targetY + dy));
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
}

/* ── Nav anchor clicks ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    if (!prefersReduced && wrap) {
      const rect = el.getBoundingClientRect();
      targetY = Math.max(0, Math.min(totalHeight, currentY + rect.top - 80));
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ══════════════════════════════════════════════
   DUAL CURSOR
══════════════════════════════════════════════ */
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = -200, mouseY = -200;
let ringX  = -200, ringY  = -200;

if (!prefersReduced) {
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const hoverTargets = 'a, button, .spec-card, .doc-row, .faq-q, input, select, textarea, .btn, .fab-emergency';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverTargets)) document.body.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverTargets)) document.body.classList.remove('cursor-hover');
  });
}

/* ══════════════════════════════════════════════
   MAGNETIC BUTTONS
══════════════════════════════════════════════ */
function initMagnetic() {
  document.querySelectorAll('.btn--magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r   = btn.getBoundingClientRect();
      const dx  = e.clientX - (r.left + r.width  / 2);
      const dy  = e.clientY - (r.top  + r.height / 2);
      btn.style.transform = `translate(${dx * 0.28}px, ${dy * 0.28}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}
initMagnetic();

/* ══════════════════════════════════════════════
   PARTICLE CANVAS
══════════════════════════════════════════════ */
const canvas  = document.getElementById('particles');
const ctx     = canvas.getContext('2d');
let W, H;
let mouseParticleX = -999, mouseParticleY = -999;

function resizeCanvas() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

if (!prefersReduced) {
  document.addEventListener('mousemove', e => {
    mouseParticleX = e.clientX;
    mouseParticleY = e.clientY;
  });
}

/* Particles */
const CYAN_C   = 'rgba(0,212,255,';
const VIOLET_C = 'rgba(108,0,255,';

const particles = Array.from({ length: 60 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  vx: (Math.random() - .5) * .4,
  vy: (Math.random() - .5) * .4,
  r: Math.random() * 2 + 1,
  color: Math.random() > .5 ? CYAN_C : VIOLET_C,
  alpha: Math.random() * .5 + .2
}));

/* Medical crosses */
const crosses = Array.from({ length: 12 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  vx: (Math.random() - .5) * .25,
  vy: (Math.random() - .5) * .25,
  size: Math.random() * 8 + 6,
  alpha: Math.random() * .18 + .06,
  rot: Math.random() * Math.PI * 2,
  rotV: (Math.random() - .5) * .004
}));

function drawCross(x, y, size, alpha, rot) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = CYAN_C + '1)';
  ctx.lineWidth   = 1.5;
  ctx.lineCap     = 'round';
  ctx.beginPath();
  ctx.moveTo(-size / 2, 0);
  ctx.lineTo(size / 2, 0);
  ctx.moveTo(0, -size / 2);
  ctx.lineTo(0, size / 2);
  ctx.stroke();
  ctx.restore();
}

function updateParticles() {
  const REPULSE_R = 90;
  const CONNECT_R = 110;

  particles.forEach(p => {
    /* repulsion */
    const dx = p.x - mouseParticleX;
    const dy = p.y - mouseParticleY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < REPULSE_R) {
      const force = (REPULSE_R - dist) / REPULSE_R;
      p.vx += dx / dist * force * 0.6;
      p.vy += dy / dist * force * 0.6;
    }
    /* damping */
    p.vx *= 0.97;
    p.vy *= 0.97;
    /* move */
    p.x += p.vx;
    p.y += p.vy;
    /* wrap */
    if (p.x < 0)  p.x = W;
    if (p.x > W)  p.x = 0;
    if (p.y < 0)  p.y = H;
    if (p.y > H)  p.y = 0;
  });

  /* draw connecting lines */
  ctx.globalAlpha = 1;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONNECT_R) {
        ctx.beginPath();
        ctx.strokeStyle = CYAN_C + (0.1 * (1 - dist / CONNECT_R)) + ')';
        ctx.lineWidth   = 0.6;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  /* draw particles */
  particles.forEach(p => {
    ctx.beginPath();
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle   = p.color + '1)';
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  /* update & draw crosses */
  crosses.forEach(c => {
    c.x   += c.vx;
    c.y   += c.vy;
    c.rot += c.rotV;
    if (c.x < -20)  c.x = W + 20;
    if (c.x > W+20) c.x = -20;
    if (c.y < -20)  c.y = H + 20;
    if (c.y > H+20) c.y = -20;
    drawCross(c.x, c.y, c.size, c.alpha, c.rot);
  });

  ctx.globalAlpha = 1;
}

/* ══════════════════════════════════════════════
   TEXT SCRAMBLE
══════════════════════════════════════════════ */
const SCRAMBLE_CHARS = '!@#$%^&*ABCDEFabcdef0123456789';

function scrambleText(el, finalText, duration) {
  if (prefersReduced) { el.textContent = finalText; return; }
  const startTime = performance.now();
  let frame;

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const revealedLen = Math.floor(progress * finalText.length);

    let result = '';
    for (let i = 0; i < finalText.length; i++) {
      if (finalText[i] === ' ' || finalText[i] === '\n') {
        result += finalText[i];
      } else if (i < revealedLen) {
        result += finalText[i];
      } else {
        result += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
    }
    el.textContent = result;

    if (progress < 1) {
      frame = requestAnimationFrame(update);
    } else {
      el.textContent = finalText;
    }
  }
  frame = requestAnimationFrame(update);
}

/* ══════════════════════════════════════════════
   COUNTERS
══════════════════════════════════════════════ */
const countedSet = new Set();

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  if (isNaN(target) || countedSet.has(el)) return;
  countedSet.add(el);
  if (prefersReduced) { el.textContent = target.toLocaleString(); return; }

  const dur  = 2000;
  const start = performance.now();
  const startVal = 0;

  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    const val = Math.floor(startVal + (target - startVal) * ease);
    el.textContent = val >= 1000 ? (val / 1000).toFixed(val >= 10000 ? 0 : 0) + 'K' : val.toString();
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target >= 1000 ? Math.round(target / 1000) + 'K' : target.toString();
  }
  requestAnimationFrame(step);
}

/* ══════════════════════════════════════════════
   MODAL
══════════════════════════════════════════════ */
const backdrop  = document.getElementById('modalBackdrop');
const modalBox  = document.getElementById('modalBox');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

function openModal(key) {
  const d = DEPTS[key];
  if (!d) return;
  modalBody.innerHTML = `
    <h2>${d.title}</h2>
    <p class="modal-sub">${d.sub}</p>
    <p>${d.desc}</p>
    <h4>Services &amp; Treatments</h4>
    <ul class="modal-services">${d.services.map(s => `<li>${s}</li>`).join('')}</ul>
  `;
  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
}

if (modalClose) modalClose.addEventListener('click', closeModal);
if (backdrop)   backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

document.querySelectorAll('.spec-card[data-key]').forEach(card => {
  card.addEventListener('click', () => openModal(card.dataset.key));
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openModal(card.dataset.key); });
});

/* ══════════════════════════════════════════════
   FAQ ACCORDION
══════════════════════════════════════════════ */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ══════════════════════════════════════════════
   APPOINTMENT FORM
══════════════════════════════════════════════ */
const apptForm = document.getElementById('apptForm');
if (apptForm) {
  apptForm.addEventListener('submit', e => {
    e.preventDefault();
    const nameEl  = document.getElementById('apptName');
    const phoneEl = document.getElementById('apptPhone');
    let valid = true;

    const nameGrp  = nameEl.closest('.form-group');
    const phoneGrp = phoneEl.closest('.form-group');

    nameGrp.classList.remove('error');
    phoneGrp.classList.remove('error');

    if (!nameEl.value.trim() || nameEl.value.trim().length < 2) {
      nameGrp.classList.add('error');
      valid = false;
    }
    const phoneVal = phoneEl.value.replace(/\D/g, '');
    if (phoneVal.length < 10) {
      phoneGrp.classList.add('error');
      valid = false;
    }

    if (valid) {
      const success = document.getElementById('formSuccess');
      if (success) success.classList.add('show');
      apptForm.reset();
      setTimeout(() => success.classList.remove('show'), 6000);
    }
  });
}

/* ══════════════════════════════════════════════
   3D TILT on spec cards
══════════════════════════════════════════════ */
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', e => {
    if (prefersReduced) return;
    const r  = card.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    const dx = (e.clientX - cx) / (r.width  / 2);
    const dy = (e.clientY - cy) / (r.height / 2);
    const tiltX =  dy * 15;
    const tiltY = -dx * 15;
    card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03,1.03,1.03)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ══════════════════════════════════════════════
   MAIN RAF LOOP
══════════════════════════════════════════════ */
let navEl = document.getElementById('nav');
const progressBar = document.getElementById('scrollProgress');
const heroWatermark = document.getElementById('heroWatermark');
const heroGlows = document.querySelectorAll('.hero__glow');
const heroOrb   = document.getElementById('heroOrb');

// Scramble hero title on first load
const heroTitleEl = document.getElementById('heroTitle');
let titleScrambled = false;

function getScrollFraction() {
  return totalHeight > 0 ? currentY / totalHeight : 0;
}

function rafLoop(time) {
  /* ── Lerp smooth scroll ── */
  if (!prefersReduced && wrap) {
    currentY += (targetY - currentY) * LERP;
    if (Math.abs(currentY - targetY) < 0.1) currentY = targetY;
    wrap.style.transform = `translateY(${-currentY}px)`;
  }

  /* ── Dual cursor ── */
  if (!prefersReduced) {
    if (cursorDot) {
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top  = mouseY + 'px';
    }
    if (cursorRing) {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top  = ringY + 'px';
    }
  }

  /* ── Scroll progress bar ── */
  if (progressBar) {
    progressBar.style.width = (getScrollFraction() * 100) + '%';
  }

  /* ── Nav frosted glass ── */
  if (navEl) {
    if (currentY > 60) navEl.classList.add('scrolled');
    else               navEl.classList.remove('scrolled');
  }

  /* ── Parallax ── */
  if (!prefersReduced) {
    if (heroWatermark) {
      heroWatermark.style.transform = `translate(-50%, calc(-50% + ${currentY * 0.3}px))`;
    }
    if (heroOrb) {
      heroOrb.style.transform = `translateY(calc(-50% + ${currentY * 0.18}px))`;
    }
    heroGlows.forEach((g, i) => {
      const factor = i === 0 ? 0.5 : i === 1 ? 0.35 : 0.25;
      g.style.transform = `translateY(${currentY * factor}px)`;
    });
  }

  /* ── Reveal elements ── */
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    const rect = el.getBoundingClientRect();
    const adjustedTop = rect.top + (prefersReduced ? 0 : 0); // already relative to viewport via fixed layout
    if (adjustedTop < window.innerHeight * 0.88) {
      el.classList.add('visible');
      /* Trigger counter if stat-item */
      const counter = el.querySelector('[data-count]');
      if (counter) animateCounter(counter);
    }
  });

  /* ── Scramble hero title (once) ── */
  if (!titleScrambled && heroTitleEl) {
    const rect = heroTitleEl.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      titleScrambled = true;
      const plain = 'We live in the\nheart of Jhunjhunu';
      scrambleText({ set textContent(v) { heroTitleEl.childNodes[0].textContent = v.split('\n')[0]; const em = heroTitleEl.querySelector('em'); if (em) em.textContent = v.split('\n')[1] || ''; } }, plain, 1500);
    }
  }

  /* ── Particles ── */
  if (!prefersReduced) {
    ctx.clearRect(0, 0, W, H);
    updateParticles();
  }

  requestAnimationFrame(rafLoop);
}

/* ── Fallback: force-reveal after 1500ms ── */
setTimeout(() => {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    el.classList.add('visible');
    const counter = el.querySelector('[data-count]');
    if (counter) animateCounter(counter);
  });
}, 1500);

/* ── Start ── */
requestAnimationFrame(rafLoop);

/* ── Recalculate height on image/font load ── */
window.addEventListener('load', () => {
  calcHeight();
  /* Hero stat counters animate immediately */
  document.querySelectorAll('.stat-item.visible [data-count]').forEach(animateCounter);
});
window.addEventListener('resize', calcHeight);
