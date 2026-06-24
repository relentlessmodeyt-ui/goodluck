/* =========================================================
   APEX HOSPITALS — per-city homepage switcher
   Reads ?city=<slug> from the URL and swaps the hero image + contact
   details. Default (no/unknown city) = Jhunjhunu. Pure static, no build.
   ========================================================= */
(function () {
  'use strict';

  var EMAIL = 'care@apexhospitals.com';

  // slug -> city data. (Some branch addresses/phones are placeholders and
  // marked toConfirm:true until verified — easy to update here.)
  var CITIES = {
    'main': {
      label: 'Jaipur', title: 'Apex Hospitals · Jaipur — Precision, Speed, Intelligence',
      hero: 'assets/img/hero-jaipur.webp', heroMobile: 'assets/img/hero-jaipur-mobile.webp',
      address: 'Apex Hospitals, SP-4 & 6, Malviya Nagar Industrial Area, Jaipur, Rajasthan – 302017',
      emergency: '+91 98290 30011', enquiry: '0141-2700888', email: EMAIL,
      map: 'Apex Hospitals, Malviya Nagar, Jaipur, Rajasthan'
    },
    'jhunjhunu': {
      label: 'Jhunjhunu', title: 'Apex Skyline Hospital · Jhunjhunu — Precision, Speed, Intelligence',
      hero: 'assets/img/hero.webp', heroMobile: 'assets/img/hero-mobile.webp',
      address: 'Apex Skyline Hospital, Road No. 3, Near Piru Singh Circle, Milap Nagar, Jhunjhunu, Rajasthan – 333001',
      emergency: '+91 96722 09136', enquiry: '01592-230444', email: EMAIL,
      map: 'Apex Skyline Hospital, Milap Nagar, Jhunjhunu, Rajasthan'
    },
    'udaipur': {
      label: 'Udaipur', title: 'Apex Hospitals · Udaipur — Precision, Speed, Intelligence',
      hero: 'assets/img/hero-udaipur.webp', heroMobile: 'assets/img/hero-udaipur-mobile.webp',
      address: 'Apex Hospitals, Bhuwana By-Pass, Udaipur, Rajasthan', emergency: '0141-4101111', enquiry: '0141-4101111', email: EMAIL,
      map: 'Apex Hospitals, Bhuwana, Udaipur, Rajasthan', toConfirm: true
    },
    'bikaner': {
      label: 'Bikaner', title: 'Apex Hospitals · Bikaner — Precision, Speed, Intelligence',
      hero: 'assets/img/hero-bikaner.webp', heroMobile: 'assets/img/hero-bikaner-mobile.webp',
      address: 'Apex Hospitals, NH 89, Rani Bazar, Bikaner, Rajasthan – 334001',
      emergency: '0151-2222052', enquiry: '0151-2222052', email: EMAIL,
      map: 'Apex Hospitals, Rani Bazar, Bikaner, Rajasthan'
    },
    'lucknow': {
      label: 'Lucknow', title: 'Apex Goel Super Speciality Hospital · Lucknow — Precision, Speed, Intelligence',
      hero: 'assets/img/hero-lucknow.webp', heroMobile: 'assets/img/hero-lucknow-mobile.webp',
      address: 'Apex Goel Super Speciality Hospital, 697, Anaura Kala, Chinhat, Lucknow, Uttar Pradesh – 226028',
      emergency: '+91 91510 14001', enquiry: '+91 91510 14003', email: EMAIL,
      map: 'Apex Goel Super Speciality Hospital, Anaura Kala, Lucknow'
    },
    'sri-ganganagar': {
      label: 'Sri Ganganagar', title: 'Apex PMG Hospitals · Sri Ganganagar — Precision, Speed, Intelligence',
      hero: 'assets/img/hero-sri-ganganagar.webp', heroMobile: 'assets/img/hero-sri-ganganagar-mobile.webp',
      address: 'Apex PMG Hospitals, Shiv Circle, Sri Ganganagar, Rajasthan – 335001',
      emergency: '+91 99283 65484', enquiry: '+91 93766 66110', email: EMAIL,
      map: 'Apex PMG Hospitals, Sri Ganganagar, Rajasthan'
    },
    'sawai-madhopur': {
      label: 'Sawai Madhopur', title: 'Apex Hospitals · Sawai Madhopur — Precision, Speed, Intelligence',
      hero: 'assets/img/hero-sawai-madhopur.webp',
      address: 'Apex Ranthambore Sevika Hospital, Vinayak Nagar, Housing Board, Sawai Madhopur, Rajasthan – 322021',
      emergency: '+91 74622 34364', enquiry: '+91 74622 34364', email: EMAIL,
      map: 'Apex Ranthambore Sevika Hospital, Sawai Madhopur, Rajasthan'
    }
  };

  // search aliases -> slug (matched as substrings of the typed text)
  var ALIASES = [
    ['jhunjhunu', 'jhunjhunu'], ['skyline', 'jhunjhunu'],
    ['udaipur', 'udaipur'],
    ['bikaner', 'bikaner'],
    ['lucknow', 'lucknow'], ['goel', 'lucknow'],
    ['sri ganganagar', 'sri-ganganagar'], ['ganganagar', 'sri-ganganagar'], ['sriganganagar', 'sri-ganganagar'], ['pmg', 'sri-ganganagar'],
    ['sawai madhopur', 'sawai-madhopur'], ['sawai', 'sawai-madhopur'], ['ranthambore', 'sawai-madhopur'], ['ranthambhore', 'sawai-madhopur'],
    ['jaipur', 'main'], ['mansarovar', 'main'], ['malviya', 'main']
  ];

  function digits(s) { return 'tel:' + s.replace(/[^0-9+]/g, ''); }
  function mapUrl(q) { return 'https://www.google.com/maps?q=' + encodeURIComponent(q); }

  function currentSlug() {
    var p = new URLSearchParams(window.location.search).get('city');
    if (p) { p = p.toLowerCase(); if (CITIES[p]) return p; }
    return 'main';
  }

  function setText(key, val) {
    document.querySelectorAll('[data-city="' + key + '"]').forEach(function (el) { el.textContent = val; });
  }
  function setHref(key, val) {
    document.querySelectorAll('[data-city-href="' + key + '"]').forEach(function (el) { el.setAttribute('href', val); });
  }

  function apply(slug) {
    var c = CITIES[slug];
    document.title = c.title;
    var hero = document.getElementById('heroImg');
    if (hero) {
      var mobile = window.matchMedia('(max-width: 768px)').matches;
      var src = (mobile && c.heroMobile) ? c.heroMobile : c.hero;
      hero.onerror = function () { this.onerror = null; this.src = c.hero; }; // fall back to desktop hero
      hero.src = src;
      hero.alt = 'Apex Hospitals — we are in the heart of ' + c.label;
    }

    setText('navloc', c.label.replace(/ · .*/, '')); // short label in nav
    setText('emergency', c.emergency);
    setText('enquiry', c.enquiry);
    setText('email', c.email);
    setText('address', c.address);

    setHref('telEmergency', digits(c.emergency));
    setHref('telEnquiry', digits(c.enquiry));
    setHref('mailtoEmail', 'mailto:' + c.email);
    setHref('mapLink', mapUrl(c.map));

    document.querySelectorAll('[data-city-src="mapSrc"]').forEach(function (el) {
      el.setAttribute('src', mapUrl(c.map) + '&output=embed');
    });
  }

  function resolve(text) {
    var t = text.toLowerCase().replace(/apex|hospitals?|skyline/g, '').replace(/[^a-z ]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!t) return null;
    for (var i = 0; i < ALIASES.length; i++) {
      if (t.indexOf(ALIASES[i][0]) !== -1) return ALIASES[i][1];
    }
    return null;
  }

  // populate the search datalist
  function fillDatalist() {
    var dl = document.getElementById('cityList');
    if (!dl) return;
    Object.keys(CITIES).forEach(function (slug) {
      var o = document.createElement('option');
      o.value = CITIES[slug].label;
      dl.appendChild(o);
    });
  }

  function wireSearch() {
    var form = document.getElementById('citySearch');
    var input = document.getElementById('cityInput');
    if (!form || !input) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var slug = resolve(input.value);
      if (slug) {
        window.location.search = '?city=' + slug;
      } else if (input.value.trim()) {
        input.value = '';
        input.placeholder = 'No Apex branch there yet — try another city';
      }
    });
  }

  // hanging speciality cards: tap to enlarge + stop swaying (one at a time)
  function wireHangCards() {
    var hangs = Array.prototype.slice.call(document.querySelectorAll('.hang'));
    if (!hangs.length) return;
    hangs.forEach(function (h) {
      h.addEventListener('click', function () {
        var on = h.classList.contains('tapped');
        hangs.forEach(function (x) { x.classList.remove('tapped'); });
        if (!on) h.classList.add('tapped');
      });
    });
  }

  // FAQ locations map: pressing a place re-centres the embedded map
  function wireFaqMap() {
    var places = document.getElementById('faqPlaces');
    var map = document.getElementById('faqMap');
    if (!places || !map) return;
    places.addEventListener('click', function (e) {
      var b = e.target.closest('.faq__place');
      if (!b) return;
      places.querySelectorAll('.faq__place').forEach(function (x) { x.classList.remove('is-active'); });
      b.classList.add('is-active');
      map.src = 'https://www.google.com/maps?q=' + encodeURIComponent(b.getAttribute('data-q')) + '&output=embed';
    });
  }

  // duplicate each loop track so the marquee loops seamlessly (-50%)
  function wireLoops() {
    document.querySelectorAll('.loop__track').forEach(function (t) { t.innerHTML += t.innerHTML; });
  }

  apply(currentSlug());
  fillDatalist();
  wireSearch();
  wireHangCards();
  wireFaqMap();
  wireLoops();

  // swap hero between desktop / mobile image when the breakpoint changes
  var mq = window.matchMedia('(max-width: 768px)');
  var onBP = function () {
    var c = CITIES[currentSlug()], hero = document.getElementById('heroImg');
    if (!c || !hero) return;
    hero.src = (mq.matches && c.heroMobile) ? c.heroMobile : c.hero;
  };
  if (mq.addEventListener) mq.addEventListener('change', onBP); else if (mq.addListener) mq.addListener(onBP);
})();
