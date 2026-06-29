/* =========================================================
   APEX HOSPITALS — shared site footer
   Injected into <div id="siteFooter" data-base="..."></div>.
   data-base: "" for root pages, "../" for pages in a subfolder.
   On the homepage, cities.js fills the [data-city] brand bits per city.
   ========================================================= */
(function () {
  var mount = document.getElementById('siteFooter');
  if (!mount) return;
  var b = mount.getAttribute('data-base') || '';

  function P(t) { return b + 'page.html?t=' + encodeURIComponent(t).replace(/%20/g, '+'); }

  var quick = [
    ['Find a doctor', b + 'doctors.html'],
    ['About us', b + 'index.html#about'],
    ['Blogs', P('Blogs')],
    ['Specialities', b + 'specialities.html'],
    ['Careers', P('Careers')],
    ['Contact us', b + 'index.html#contact'],
    ['Privacy Policy', P('Privacy Policy')],
    ['Disclaimer', P('Disclaimer')],
    ['Terms and Conditions', P('Terms and Conditions')],
    ['Academics', P('Academics')],
    ['Apex Samwad', P('Apex Samwad')]
  ];
  var resources = [
    ['Events', P('Events')], ['News', P('News')], ['Diseases', P('Diseases')],
    ['Health Checkup', P('Health Checkup')], ['Bio Medical Waste', P('Bio Medical Waste')],
    ['EHSS Policy', P('EHSS Policy')], ['NABH & NABL Certificates', P('NABH & NABL Certificates')],
    ['Internal Grievance', P('Internal Grievance')], ['External Grievance', P('External Grievance')],
    ['CSR Policy', P('CSR Policy')]
  ];
  function col(title, items) {
    return '<div class="footer__col"><h4>' + title + '</h4>' +
      items.map(function (i) { return '<a href="' + i[1] + '">' + i[0] + '</a>'; }).join('') + '</div>';
  }

  var playSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.6 2.3 13.5 12 3.6 21.7a1.5 1.5 0 0 1-.6-1.2V3.5c0-.5.2-.9.6-1.2Z" fill="#34d399"/><path d="m16.3 9.2 3 1.7c1 .6 1 1.8 0 2.4l-3 1.7L13 12l3.3-2.8Z" fill="#fbbf24"/><path d="M4.6 2 15 8.1 12.5 10.6 4.6 2Z" fill="#60a5fa"/><path d="M4.6 22 12.5 13.4 15 15.9 4.6 22Z" fill="#f87171"/></svg>';
  var appleSvg = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M16.5 1.6c.1 1-.3 2-1 2.8-.7.8-1.8 1.4-2.8 1.3-.1-1 .4-2 1-2.7.8-.8 2-1.4 2.8-1.4ZM19 17c-.5 1.1-.8 1.6-1.4 2.6-.9 1.3-2.1 3-3.6 3-1.3 0-1.7-.9-3.5-.9s-2.2.8-3.5.9c-1.5.1-2.6-1.5-3.5-2.8C1 18.6.8 14 2.4 11.7c.9-1.3 2.2-2.1 3.6-2.1 1.4 0 2.3.9 3.5.9 1.1 0 1.8-.9 3.5-.9 1.2 0 2.5.7 3.4 1.8-3 1.6-2.5 5.9.1 6.6Z"/></svg>';

  var html = '<footer class="footer"><div class="wrap footer__grid">'
    + '<div class="footer__brand">'
    + '<a href="' + b + 'index.html" class="brand brand--footer">APEX<small data-city="footerName">Hospitals · Jhunjhunu</small></a>'
    + '<p data-city="footerDesc">Compassionate, NABH &amp; NABL-accredited 70+ bedded super-speciality care in the heart of Jhunjhunu — since 2021.</p>'
    + '<div class="appstores">'
    + '<a class="appstore" href="https://play.google.com/store/apps/details?id=com.apexhospital" target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play">' + playSvg + '<span><small>GET IT ON</small>Google Play</span></a>'
    + '<a class="appstore" href="https://apps.apple.com/in/app/apex-hospitals/id1566699843" target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store">' + appleSvg + '<span><small>Download on the</small>App Store</span></a>'
    + '</div></div>'
    + col('Quick Links', quick)
    + col('Resources', resources)
    + '</div>'
    + '<div class="wrap footer__bar"><span>© <span id="yr"></span> Apex Hospitals. All rights reserved.</span>'
    + '<span class="footer__badge">NABH &amp; NABL Accredited · Est. 2021</span></div>'
    + '</footer>';

  mount.outerHTML = html;
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
