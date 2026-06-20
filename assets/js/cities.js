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
    'jhunjhunu': {
      label: 'Jhunjhunu', title: 'Apex Skyline Hospital · Jhunjhunu — Precision, Speed, Intelligence',
      hero: 'assets/img/hero.webp',
      address: 'Apex Skyline Hospital, Road No. 3, Near Piru Singh Circle, Milap Nagar, Jhunjhunu, Rajasthan – 333001',
      emergency: '+91 96722 09136', enquiry: '01592-230444', email: EMAIL,
      map: 'Apex Skyline Hospital, Milap Nagar, Jhunjhunu, Rajasthan'
    },
    'udaipur': {
      label: 'Udaipur', title: 'Apex Hospitals · Udaipur — Precision, Speed, Intelligence',
      hero: 'assets/img/hero-udaipur.webp',
      address: 'Apex Hospitals — Udaipur, Rajasthan', emergency: '0141-4101111', enquiry: '0141-4101111', email: EMAIL,
      map: 'Apex Hospitals, Udaipur, Rajasthan', toConfirm: true
    },
    'bikaner': {
      label: 'Bikaner', title: 'Apex Hospitals · Bikaner — Precision, Speed, Intelligence',
      hero: 'assets/img/hero-bikaner.webp',
      address: 'Apex Hospitals, NH 89, Rani Bazar, Bikaner, Rajasthan – 334001',
      emergency: '0151-2222052', enquiry: '0151-2222052', email: EMAIL,
      map: 'Apex Hospitals, Rani Bazar, Bikaner, Rajasthan'
    },
    'lucknow': {
      label: 'Lucknow', title: 'Apex Hospitals · Lucknow — Precision, Speed, Intelligence',
      hero: 'assets/img/hero-lucknow.webp',
      address: 'Apex Goel Super Speciality Hospital — Lucknow, Uttar Pradesh', emergency: '0141-4101111', enquiry: '0141-4101111', email: EMAIL,
      map: 'Apex Goel Super Speciality Hospital, Lucknow', toConfirm: true
    },
    'sri-ganganagar': {
      label: 'Sri Ganganagar', title: 'Apex Hospitals · Sri Ganganagar — Precision, Speed, Intelligence',
      hero: 'assets/img/hero-sri-ganganagar.webp',
      address: 'Apex PMG Hospitals — Sri Ganganagar, Rajasthan', emergency: '0141-4101111', enquiry: '0141-4101111', email: EMAIL,
      map: 'Apex PMG Hospitals, Sri Ganganagar, Rajasthan', toConfirm: true
    },
    'sawai-madhopur': {
      label: 'Sawai Madhopur', title: 'Apex Hospitals · Sawai Madhopur — Precision, Speed, Intelligence',
      hero: 'assets/img/hero-sawai-madhopur.webp',
      address: 'Apex Ranthambore Sevika Hospital, Vinayak Nagar, Housing Board, Sawai Madhopur, Rajasthan – 322021',
      emergency: '+91 74622 34364', enquiry: '+91 74622 34364', email: EMAIL,
      map: 'Apex Ranthambore Sevika Hospital, Sawai Madhopur, Rajasthan'
    },
    'mansarovar-jaipur': {
      label: 'Jaipur · Mansarovar', title: 'Apex Hospitals · Mansarovar, Jaipur — Precision, Speed, Intelligence',
      hero: 'assets/img/hero-jaipur.webp',
      address: 'Apex Hospitals, 55, Rajat Path, Sector 5, Mansarovar, Jaipur, Rajasthan – 302020',
      emergency: '0141-2700888', enquiry: '1800-180-5025', email: EMAIL,
      map: 'Apex Hospitals, Mansarovar, Jaipur, Rajasthan'
    },
    'malviya-nagar-jaipur': {
      label: 'Jaipur · Malviya Nagar', title: 'Apex Hospitals · Malviya Nagar, Jaipur — Precision, Speed, Intelligence',
      hero: 'assets/img/hero-jaipur.webp',
      address: 'Apex Hospitals, SP-4 & 6, Malviya Nagar Industrial Area, Malviya Nagar, Jaipur, Rajasthan – 302017',
      emergency: '+91 98290 30011', enquiry: '+91 98290 30011', email: EMAIL,
      map: 'Apex Hospitals, Malviya Nagar, Jaipur, Rajasthan'
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
    ['malviya', 'malviya-nagar-jaipur'],
    ['mansarovar', 'mansarovar-jaipur'],
    ['jaipur', 'mansarovar-jaipur'] // generic "jaipur" -> Mansarovar
  ];

  function digits(s) { return 'tel:' + s.replace(/[^0-9+]/g, ''); }
  function mapUrl(q) { return 'https://www.google.com/maps?q=' + encodeURIComponent(q); }

  function currentSlug() {
    var p = new URLSearchParams(window.location.search).get('city');
    if (p) { p = p.toLowerCase(); if (CITIES[p]) return p; }
    return 'jhunjhunu';
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
    if (hero) { hero.src = c.hero; hero.alt = 'Apex Hospitals — we are in the heart of ' + c.label; }

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

  apply(currentSlug());
  fillDatalist();
  wireSearch();
})();
