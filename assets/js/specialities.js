/* =========================================================
   APEX HOSPITALS — specialities directory ("All Specialities")
   Data + live search (speciality / condition) + location filter.
   Each entry: [name, slug, short description]
   To add a detail page: create the HTML, then register it in BUILT
   as "slug@Location": "relative/url.html".
   ========================================================= */
(function () {
  'use strict';

  var SPECIALITIES = [
    ["Cardiology", "cardiology", "Heart &amp; vascular care, from ECG to cardiac emergencies."],
    ["Neurosurgery", "neurosurgery", "Advanced surgical care for the brain &amp; spine."],
    ["Orthopaedics", "orthopaedics", "Bones, joints &amp; movement disorders."],
    ["General Surgery", "general-surgery", "Routine &amp; complex surgical procedures."],
    ["Urology", "urology", "Kidney, urinary &amp; prostate conditions."],
    ["Obstetrics And Gynaecology", "obstetrics-and-gynaecology", "Complete women's health &amp; safe deliveries."],
    ["Physiotherapy", "physiotherapy", "Rehab to rebuild strength &amp; mobility."],
    ["Oncology", "oncology", "Comprehensive cancer diagnosis &amp; treatment."],
    ["Internal Medicine", "internal-medicine", "Diagnosis &amp; care for adult illnesses."],
    ["ENT", "ent", "Ear, nose &amp; throat care."],
    ["Radiology", "radiology", "Advanced imaging &amp; diagnostics."],
    ["Plastic And Cosmetic Surgery", "plastic-and-cosmetic-surgery", "Reconstructive &amp; aesthetic procedures."],
    ["Dental Sciences", "dental-sciences", "We understand the importance of oral health in maintaining overall well-being."],
    ["Cardiothoracic Surgery", "cardiothoracic-surgery", "Heart, lung &amp; chest surgical care."],
    ["Rheumatology", "rheumatology", "Care for joints &amp; autoimmune conditions."],
    ["Anaesthesiology", "anaesthesiology", "Safe anaesthesia &amp; perioperative care."],
    ["Ophthalmology", "ophthalmology", "Complete eye &amp; vision care."],
    ["Pediatrics And Child Care", "pediatrics-and-child-care", "Gentle, expert care for newborns &amp; children."],
    ["Orthopaedics Robotic Surgery", "orthopaedics-robotic-surgery", "Robotic-assisted joint replacement precision."],
    ["Gastroenterology", "gastroenterology", "Comprehensive care for digestive and liver disorders."],
    ["Bariatric Surgery", "bariatric-surgery", "Surgical weight-loss &amp; metabolic care."],
    ["Dermatology", "dermatology", "Skin based treatments."],
    ["Dietetics And Nutrition", "dietetics-and-nutrition", "Personalised diet &amp; nutrition plans."],
    ["Gastrointestinal Surgery", "gastrointestinal-surgery", "Surgical care for the digestive tract."],
    ["Haemato Oncology", "haemato-oncology", "Specialized care for blood disorders and cancer."],
    ["ICU And Critical Care", "icu-and-critical-care", "Advanced ICU care with 24/7 monitoring."],
    ["Nephrology", "nephrology", "Comprehensive care for kidney health and disorders."],
    ["Neurology", "neurology", "Expert care for brain, spine, and nerve disorders."],
    ["Pain And Intervention", "pain-and-intervention", "Interventional care for chronic pain."],
    ["Pathology", "pathology", "Accurate lab diagnostics &amp; testing."],
    ["Physiotherapy And Rehabilitation", "physiotherapy-and-rehabilitation", "Structured rehab to restore function."],
    ["Psychiatry", "psychiatry", "Compassionate mental health care."],
    ["Department Of Pulmonary Medicine", "pulmonary-medicine", "Care for lungs &amp; respiratory disorders."],
    ["Vascular Surgery", "vascular-surgery", "Expert management of vascular disorders."],
    ["Department Of Diabetes Thyroid And Endocrine Sciences", "diabetes-thyroid-endocrine", "Expert management of endocrine and metabolic conditions."],
    ["Robotic Surgery", "robotic-surgery", "Minimally invasive surgery with robotic precision."],
    ["Kidney Transplant", "kidney-transplant", "Specialised kidney transplant programme."],
    ["Extracorporeal Membrane Oxygenation (ECMO)", "ecmo", "Advanced life support for heart &amp; lungs."],
    ["Emergency and Trauma", "emergency-and-trauma", "24/7 emergency &amp; trauma response."],
    ["Bone Marrow Transplant", "bone-marrow-transplant", "Specialised transplant for blood disorders."],
    ["Gynaecology &amp; Obstetrics", "gynaecology-and-obstetrics", "Complete women's health &amp; maternity care."]
  ];

  // Hospitals / locations (kept in sync with the doctor directory)
  var LOCATIONS = ["Bikaner", "Jhunjhunu", "Lucknow", "Malviya Nagar", "Mansarovar", "Sawai Madhopur", "Sri Ganganagar", "Udaipur"];

  // Detail pages that already exist: "slug@Location" -> relative URL
  var BUILT = {
    "cardiology@Malviya Nagar": "specialities/cardiology-malviya-nagar.html"
  };

  var ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>';

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  // resolve the detail page for a speciality given the chosen location
  function pageFor(slug, loc) {
    if (loc) return BUILT[slug + "@" + loc] || null;
    for (var i = 0; i < LOCATIONS.length; i++) {
      if (BUILT[slug + "@" + LOCATIONS[i]]) return BUILT[slug + "@" + LOCATIONS[i]];
    }
    return null;
  }

  ready(function () {
    var grid = document.getElementById("specResults");
    if (!grid) return;
    var searchI = document.getElementById("specSearch");
    var locI = document.getElementById("specLoc");
    var countEl = document.getElementById("specCount");

    LOCATIONS.forEach(function (v) {
      var o = document.createElement("option"); o.value = v; o.textContent = v; locI.appendChild(o);
    });

    function card(s) {
      var url = pageFor(s[1], locI.value);
      var inner = '<span class="specitem__ic">' + ICON + '</span><h3>' + s[0] + '</h3><p>' + s[2] + '</p>';
      if (url) {
        return '<a class="specitem glass" href="' + url + '">' + inner +
          '<span class="specitem__go">View details <i>→</i></span></a>';
      }
      return '<div class="specitem glass specitem--soon">' + inner +
        '<span class="specitem__soon">Details coming soon</span></div>';
    }

    function render() {
      var q = (searchI.value || "").toLowerCase().trim();
      var html = "", n = 0;
      for (var i = 0; i < SPECIALITIES.length; i++) {
        var s = SPECIALITIES[i];
        if (q && s[0].toLowerCase().indexOf(q) === -1 && s[2].toLowerCase().indexOf(q) === -1) continue;
        n++; html += card(s);
      }
      grid.innerHTML = html || '<p class="doc__empty">No specialities match your search. Try a different speciality or condition.</p>';
      if (countEl) {
        var loc = locI.value;
        countEl.textContent = "Showing " + n + " specialit" + (n === 1 ? "y" : "ies") +
          (loc ? " at Apex Hospital, " + loc : " across Apex Hospitals");
      }
    }

    [searchI, locI].forEach(function (el) {
      el.addEventListener("input", render); el.addEventListener("change", render);
    });
    render();
  });
})();
