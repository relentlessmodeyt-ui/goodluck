'use strict';

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
    services: ['MRI & CT Neuroimaging', 'Epilepsy Management', 'Stroke Care & Rehabilitation', 'Headache Clinic', 'EEG', 'Parkinson\'s Management', 'Nerve Conduction Studies']
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
    sub: 'Women\'s Health & Maternity Care',
    desc: 'Comprehensive women\'s health services from antenatal care to safe delivery with NICU support, and laparoscopic gynaecological procedures.',
    services: ['Antenatal & Postnatal Care', 'Normal & Caesarean Delivery', 'NICU Support', 'Laparoscopic Gynaecology', 'High-Risk Pregnancy', 'Menstrual Disorders', 'Fertility Consultation']
  }
};

/* ── SMOOTH SCROLL ── */
let targetY = 0, currentY = 0;
const smoothWrap = document.getElementById('smoothWrap');

function setDocHeight() {
  if (smoothWrap) document.body.style.height = smoothWrap.scrollHeight + 'px';
}
setDocHeight();
window.addEventListener('resize', setDocHeight);

window.addEventListener('scroll', () => {
  targetY = window.scrollY;
});

/* ── CURSOR ── */
const dot = document.getElementById('cursorDot');
const trail = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('pointermove', e => {
  mx = e.clientX;
  my = e.clientY;
  if (dot) {
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  }
});

document.querySelectorAll('a, button, [data-tilt], .spec-card, .doctor-item, .faq__btn').forEach(el => {
  el.addEventListener('pointerenter', () => { if (trail) trail.classList.add('hovering'); });
  el.addEventListener('pointerleave', () => { if (trail) trail.classList.remove('hovering'); });
});

/* ── PARTICLES ── */
const canvas = document.getElementById('particles');
const ctx = canvas ? canvas.getContext('2d') : null;
let W = 0, H = 0, particles = [], crosses = [];

function resizeCanvas() {
  if (!canvas) return;
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - .5) * .4;
    this.vy = (Math.random() - .5) * .4;
    this.r = Math.random() * 1.5 + .5;
    this.color = Math.random() > .5 ? 'rgba(0,212,255,' : 'rgba(112,0,255,';
    this.alpha = Math.random() * .5 + .2;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    const dx = this.x - mx;
    const dy = this.y - my;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 80) {
      this.x += dx / dist * 1.5;
      this.y += dy / dist * 1.5;
    }
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;
  }
  draw() {
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color + this.alpha + ')';
    ctx.fill();
  }
}

class Cross {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - .5) * .2;
    this.vy = (Math.random() - .5) * .2;
    this.size = Math.random() * 6 + 4;
    this.alpha = Math.random() * .3 + .05;
    this.rotation = Math.random() * Math.PI;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += .005;
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;
  }
  draw() {
    if (!ctx) return;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.strokeStyle = 'rgba(0,212,255,' + this.alpha + ')';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-this.size, 0); ctx.lineTo(this.size, 0);
    ctx.moveTo(0, -this.size); ctx.lineTo(0, this.size);
    ctx.stroke();
    ctx.restore();
  }
}

if (ctx) {
  for (let i = 0; i < 80; i++) particles.push(new Particle());
  for (let i = 0; i < 15; i++) crosses.push(new Cross());
}

function drawConnections() {
  if (!ctx) return;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 100) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0,212,255,' + (.08 * (1 - d / 100)) + ')';
        ctx.lineWidth = .5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

/* ── 3D TILT ── */
function initTilt() {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(600px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.02)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = 'perspective(600px) rotateY(0) rotateX(0) scale(1)';
    });
  });
}
initTilt();

/* ── MAGNETIC BUTTONS ── */
function initMagnetic() {
  document.querySelectorAll('.btn--magnetic').forEach(btn => {
    btn.addEventListener('pointermove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * .25;
      const y = (e.clientY - (r.top + r.height / 2)) * .25;
      btn.style.transform = `translate(${x}px,${y}px)`;
    });
    btn.addEventListener('pointerleave', () => {
      btn.style.transform = '';
    });
  });
}
initMagnetic();

/* ── NAV SCROLL STATE ── */
const nav = document.getElementById('nav');
const scrollBar = document.getElementById('scrollBar');

/* ── MODAL ── */
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');

function openModal(key) {
  const d = DEPTS[key];
  if (!d || !modal || !modalBody) return;
  modalBody.innerHTML = `
    <h2 class="modal-title">${d.title}</h2>
    <p class="modal-sub">${d.sub}</p>
    <p class="modal-desc">${d.desc}</p>
    <div class="modal-services">
      <h4>Services</h4>
      <ul>${d.services.map(s => `<li>${s}</li>`).join('')}</ul>
    </div>
    <a href="#appointment" class="btn btn--cyan btn--magnetic" style="margin-top:2rem;display:inline-flex" onclick="closeModal()">Book Appointment →</a>
  `;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (modal) modal.hidden = true;
  document.body.style.overflow = '';
}

if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
if (modalClose) modalClose.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

document.querySelectorAll('[data-key]').forEach(el => {
  el.addEventListener('click', () => openModal(el.dataset.key));
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(el.dataset.key);
    }
  });
});

/* ── FAQ ── */
document.querySelectorAll('.faq__btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq__btn').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      const body = b.nextElementSibling;
      if (body) body.style.maxHeight = '0';
    });
    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      const body = btn.nextElementSibling;
      if (body) body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
});

/* ── FORM ── */
const apptForm = document.getElementById('apptForm');
const formNote = document.getElementById('formNote');

if (apptForm) {
  apptForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = apptForm.name.value.trim();
    const phone = apptForm.phone.value.trim();
    if (!name) { showNote('Please enter your full name.', 'error'); return; }
    if (!phone || !/^[\d\s\+\-]{7,15}$/.test(phone)) {
      showNote('Please enter a valid phone number.', 'error');
      return;
    }
    showNote('Thank you! We will call you shortly to confirm your appointment.', 'success');
    apptForm.reset();
  });
}

function showNote(msg, type) {
  if (!formNote) return;
  formNote.textContent = msg;
  formNote.className = 'form-note ' + type;
  setTimeout(() => {
    formNote.textContent = '';
    formNote.className = 'form-note';
  }, 5000);
}

/* ── COUNTERS ── */
function animateCounter(el) {
  if (el.dataset.counted) return;
  el.dataset.counted = '1';
  const target = +el.dataset.count;
  if (!target) return;
  const dur = 2000;
  const step = 16;
  let current = 0;
  const inc = target / (dur / step);
  const id = setInterval(() => {
    current = Math.min(current + inc, target);
    if (target >= 1000) {
      el.textContent = (current / 1000).toFixed(1).replace(/\.0$/, '') + 'K+';
    } else {
      el.textContent = Math.floor(current) + '+';
    }
    if (current >= target) clearInterval(id);
  }, step);
}

/* ── YEAR ── */
const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();

/* ── REVEAL ── */
function checkReveals() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * .9 && rect.bottom > 0) {
      el.classList.add('visible');
    }
  });
}

function checkCounters() {
  document.querySelectorAll('.visible [data-count]:not([data-counted])').forEach(el => {
    animateCounter(el);
  });
}

/* ── RAF MAIN LOOP ── */
let prevScrollY = -1;

function raf() {
  // smooth scroll lerp
  currentY += (targetY - currentY) * 0.08;
  if (smoothWrap) smoothWrap.style.transform = `translateY(${-currentY}px)`;

  // scroll progress bar
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const prog = docHeight > 0 ? (targetY / docHeight) * 100 : 0;
  if (scrollBar) scrollBar.style.width = prog + '%';

  // nav state
  if (nav) {
    if (currentY > 60) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }

  // cursor trail lerp
  tx += (mx - tx) * 0.12;
  ty += (my - ty) * 0.12;
  if (trail) {
    trail.style.left = tx + 'px';
    trail.style.top = ty + 'px';
  }

  // particles
  if (ctx) {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    crosses.forEach(c => { c.update(); c.draw(); });
    drawConnections();
  }

  // reveals (check when scroll position changes)
  if (Math.abs(currentY - prevScrollY) > 0.5) {
    checkReveals();
    checkCounters();
    prevScrollY = currentY;
  }

  requestAnimationFrame(raf);
}

// Initial reveal check
setTimeout(() => {
  checkReveals();
  checkCounters();
  // Recalculate doc height after fonts load
  setDocHeight();
}, 200);

// Fallback: ensure nothing stays hidden after 1.5s
setTimeout(() => {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    el.classList.add('visible');
  });
  checkCounters();
}, 1500);

requestAnimationFrame(raf);

/* ── SMOOTH ANCHOR SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    // Calculate target position relative to smoothWrap
    const targetTop = target.getBoundingClientRect().top + currentY - 80;
    targetY = Math.max(0, targetTop);
    window.scrollTo(0, targetY);
  });
});
