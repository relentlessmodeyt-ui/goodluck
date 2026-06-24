/* =========================================================
   APEX HOSPITALS — doctor directory ("Search a Doctor")
   Data + live name/specialty/location filtering.
   Each entry: [name, designation, qualifications, location]
   ========================================================= */
(function () {
  'use strict';

  var DOCTORS = [
    ["Dr. Aadarsh Kabra","Director — Vascular & Endovascular Surgery","MBBS, DNB - General Surgery, DNB (Peripheral Vascular Surgery), F.V.E.S","Malviya Nagar"],
    ["Dr. Saurabh Jain","Additional Director — Urology & Kidney Transplant","MBBS, MS - General Surgery, DNB Urology","Malviya Nagar"],
    ["Dr. Prithvi Giri","Director & Head of Neuroscience Department","MBBS, MD, DM (Neurology)","Malviya Nagar"],
    ["Dr. Vipin Ola","Director — Neurology","MBBS, MD - Internal Medicine, DM (Neurology)","Malviya Nagar"],
    ["Dr. Lalit Kumar Bhardwaj","Director — Neuro & Spine Surgery","MBBS, MS & MCh - Neuro Surgery, Endoscopic Skull Base Surgery (France)","Malviya Nagar"],
    ["Dr. Ajay Pal Singh","Director — Nephrology & Renal Transplant","MBBS, MD - Internal Medicine, DM - Nephrology","Malviya Nagar"],
    ["Dr. B. M Goyal","Director — Cardiac Science & Interventional Cardiology","MBBS, MD, DM - Cardiology, FACC, FSCAI (USA)","Malviya Nagar"],
    ["Dr. Vipul Khandelwal","Director — Medical Services & Internal Medicine","MBBS, MD - Internal Medicine, IDCCM, FCIP","Malviya Nagar"],
    ["Dr. Aditi Mittal","Consultant — Medical Oncology","MBBS, MD - Medicine, DNB - Medical Oncology, Fellowship in BMT","Malviya Nagar"],
    ["Dr. Ishwar Meena","Consultant — Orthopaedics (Foot, Ankle & Sports Injury)","MBBS, MS - Orthopaedics, Fellowship in Foot & Ankle Surgery","Malviya Nagar"],
    ["Dr. Pulkit Nag","Consultant — Medical Oncology","MBBS, DrNB (Medical Oncology), ESMO","Malviya Nagar"],
    ["Dr. Rahul Kumar Bhukar","Consultant — Cardiothoracic & Vascular Surgery","MBBS, DNB - Cardiothoracic Surgery","Malviya Nagar"],
    ["Dr. Ashish Rana","Senior Consultant — Orthopaedics, Robotic Joint Replacement & Arthroscopy","MBBS, DNB - Orthopaedics, FSES (Japan), Dip. Sports Injury (UK), FIAA","Malviya Nagar"],
    ["Dr. Geetesh Mangal","Director — Critical Care (E-ICU)","MBBS, MD - Anaesthesiology, FNB Critical Care, EDIC","Malviya Nagar"],
    ["Dr. Rajnish","Consultant — Advanced Laparoscopic, Robotic & Bariatric Surgery","MBBS, MS - General Surgery, FMAS, FIAGES, Fellowship in Bariatric Surgery","Malviya Nagar"],
    ["Dr. S.B. Jhawar","Chairperson — Apex Hospitals","MBBS, MD (Medicine & Therapeutics)","Malviya Nagar"],
    ["Dr. Sachin Jhawar","Director — General & Bariatric Surgery","MBBS, MS - General Surgery, MRCS","Malviya Nagar"],
    ["Dr. Sonu Goyal","Consultant — Radiation Oncology","MBBS, MD - Radiotherapy","Malviya Nagar"],
    ["Dr. Shailesh Jhawar","Director — Critical Care & E-ICU","MBBS, FRCA (UK), Fellowship in Critical Care & Cardiothoracic Anaesthesia","Malviya Nagar"],
    ["Dr. Vijayant Solanki","Senior Consultant — Pulmonary Medicine","MBBS, MD (Pulmonary Medicine), SCE Respiratory (FRCP UK), IDCCM, EDIC","Malviya Nagar"],
    ["Dr. Neetu Sidana","Consultant — Dermatology","MBBS, MD - Dermatology","Malviya Nagar"],
    ["Dr. Sunil Kumar Garg","Consultant — ENT","MBBS, DNB - ENT, DLO","Malviya Nagar"],
    ["Dr. Sanjiv Hooja","Senior Consultant — Paediatrics","MBBS, MD - Pediatrics, MIAP","Malviya Nagar"],
    ["Dr. Amit Mehta","Associate Consultant — Critical Care","MBBS, DNB (Anaesthesia), IDCCM","Malviya Nagar"],
    ["Dr. Sandeep Garg","Consultant — Orthopaedics, Joint Replacement & Sports Injury","MBBS, MS - Orthopaedics, Fellowships in Arthroplasty & Arthroscopy","Malviya Nagar"],
    ["Dr. Malika Swaroop","Consultant — Obstetrics & Gynaecology","MBBS, MS - Obstetrics & Gynaecology","Malviya Nagar"],
    ["Dr. Dev Kumar Jain","Additional Director — Internal Medicine","MBBS, MD - Internal Medicine","Malviya Nagar"],
    ["Dr. John Davis","Consultant — Physiotherapy","BPT, MPT, MD in Alternative Medicine","Malviya Nagar"],
    ["Dr. Basant Gupta","Consultant — Dental","BDS, MDS, Advanced Training in Implantology","Malviya Nagar"],
    ["Dr. Bharat Sharma","Senior Consultant — Plastic Surgery","MBBS, MS, MCh (Plastic & Reconstructive Surgery)","Malviya Nagar"],
    ["Dr. Ashish Verma","Consultant — Haemato Oncology","MBBS, MD (Immuno-Haematology), PDF (Clinical Haematology)","Malviya Nagar"],
    ["Dr. Priya Mathur","Director — Critical Care","MBBS, IDCCM, MD (Anaesthesia)","Malviya Nagar"],
    ["Dr. Jai Wade","Additional Director — Pathology","MBBS, DNB - Pathology","Malviya Nagar"],
    ["Dr. Rakesh Khandelwal","Consultant — Psychiatry","MBBS, MD (Psychiatry)","Malviya Nagar"],
    ["Dr. Manish Kheriwal","Consultant — General Surgery","MBBS, MS (General Surgery)","Malviya Nagar"],
    ["Dr. MP Goyal","Consultant — Radiology","MBBS, MD - Radio Diagnosis","Malviya Nagar"],
    ["Dr. Mukul Gupta","Director & Head — Diabetes, Thyroid & Endocrine Sciences","MBBS, MD - General Medicine, DNB (Endocrinology)","Malviya Nagar"],
    ["Dr. Mahesh Kumar Poonia","Consultant — Radiology","Radiologist","Malviya Nagar"],
    ["Dr. Rahul Yadav","Consultant — Surgical Oncology","MBBS, MS - General Surgery, MCh - Surgical Oncology","Malviya Nagar"],
    ["Dr. Amrata Singh Jadoun","Dietician — Dietetics & Nutrition","B.Sc & M.Sc in Food & Nutrition","Malviya Nagar"],
    ["Dr. Geeta Kumari","Dietician — Dietetics & Nutrition","B.Sc (Hons) Food, Nutrition & Dietetics","Malviya Nagar"],
    ["Dr. Kashif Mohammad Madani","Associate Consultant — General Anaesthesia","MBBS, MD (Anaesthesiology)","Malviya Nagar"],
    ["Dr. Ashwani Kumar Kapoor","Senior Consultant — General Anaesthesiology","MBBS, MD (Anaesthesiology)","Malviya Nagar"],
    ["Dr. Apul Mathur","Associate Consultant — Critical Care","MBBS, IDCCM, FICM","Malviya Nagar"],
    ["Dr. Mohammad Rehan","Consultant — Gastroenterology","MBBS, DNB - General Medicine, DrNB (Gastroenterology)","Malviya Nagar"],
    ["Dr. Varun Khanna","Consultant — General Anaesthesia","MBBS, D.A.","Malviya Nagar"],
    ["Dr. Namrata Pradhan","Consultant — Critical Care","MBBS, MD (Anaesthesia), IDCCM","Malviya Nagar"],
    ["Dr. Kanu Sharma","Consultant — Pathology","MBBS, DNB - Pathology","Malviya Nagar"],
    ["Dr. Shravan Singh","Consultant — Interventional Cardiology","MBBS, MD, DM (Cardiology), FISH","Bikaner"],
    ["Dr. G. S Vijay","Director — Orthopaedics & Joint Replacement","Orthopaedics & Joint Replacement","Bikaner"],
    ["Dr. Rajendra Prasad Agrawal","Director — Internal Medicine & Diabetology","MBBS, MD, Commonwealth Fellowship (UK)","Bikaner"],
    ["Dr. Gurjeet Kaur","Consultant — Dental Sciences","BDS","Bikaner"],
    ["Dr. Naveen Kumar Jinger","Consultant — Internal Medicine","MBBS, MD (Internal Medicine)","Bikaner"],
    ["Dr. Tanveer Malawat","Senior Consultant — General & Laparoscopic Surgery","MBBS, MS - General Surgery","Bikaner"],
    ["Dr. Maneesh Bothra","Consultant — Internal Medicine","MBBS, MD - Internal Medicine","Bikaner"],
    ["Dr. Jaikishan Suthar","Consultant — Cardiothoracic & Vascular Surgery","MBBS, MS - General Surgery, MCh (CTVS)","Bikaner"],
    ["Dr. Imran Pathan","Consultant — Plastic Surgery","MBBS, MS, MCh (Plastic Surgery), Fellowship in GI Endoscopy","Bikaner"],
    ["Dr. Smita Soni","Consultant — Obstetrics & Gynaecology","MBBS, MS - Obstetrics & Gynaecology","Jhunjhunu"],
    ["Dr. Hitesh Soni","Consultant — General & Laparoscopic Surgery","MBBS, DNB - General Surgery","Jhunjhunu"],
    ["Dr. Suresh Kumar Rulania","Consultant — Urology","MBBS, MCh - Urology, USI International Fellowship","Jhunjhunu"],
    ["Dr. Kundan Sen","Consultant — Orthopaedics","MBBS, MS - Orthopaedics, Fellowship in Arthroscopy","Jhunjhunu"],
    ["Dr. Amit Bhushan Sharma","Consultant — Internal Medicine & Diabetology","MBBS, MD (Diabetology), PG Diploma in Diabetology, CCEBDM","Mansarovar"],
    ["Dr. Charu Lata Bansal","Consultant — Obstetrics & Gynaecology","MBBS, MS, DNB, FMAS, FICMCH","Mansarovar"],
    ["Dr. Vikas Meena","Consultant — General Surgery","MBBS, MS (General Surgery), FMAS, DMIS","Sawai Madhopur"],
    ["Dr. Saurabh Gupta","Consultant — Cardiology","MBBS, MD, DM - Cardiology","Sawai Madhopur"],
    ["Dr. Kanta Prasad Meena","Consultant — Orthopaedics","MBBS, MS - Orthopaedics","Sawai Madhopur"],
    ["Dr. Vinod Kumar Saini","Consultant — Internal Medicine","MBBS, MD - Internal Medicine, Fellowship in 2D Echo (Apollo, Delhi)","Sawai Madhopur"],
    ["Dr. Manish Sharma","Consultant — Paediatrics","MBBS, DCH, DNB (Paediatrics)","Sawai Madhopur"],
    ["Dr. Balveer Singh","Consultant — Interventional Radiology","MBBS, MD, Fellowship in IR","Bikaner"],
    ["Dr. Nishant Singh Sinsinwar","Consultant — Internal Medicine","MBBS, MD Medicine","Mansarovar"],
    ["Dr. Bhanu Pratap Singh","Consultant — Internal Medicine","MBBS, PGDCC, Fellowship CCEBDM (Diabetes)","Sawai Madhopur"],
    ["Dr. Rakesh Kumar Meena","Consultant — Neurosurgery","MBBS, MS - General Surgery, MCh (Neurosurgery)","Sawai Madhopur"],
    ["Dr. Mehul Agarwal","Consultant — Pulmonology","MBBS, DNB (Respiratory Diseases), FCCS","Mansarovar"],
    ["Dr. Ashok Poonia","Consultant — ENT","MBBS, MS in ENT & Head and Neck Surgery","Bikaner"],
    ["Dr. Girish Tanwar","Consultant — Cardiac Anaesthesia","MBBS, MD","Bikaner"],
    ["Dr. Sanjay Singh","Consultant — Internal Medicine","MBBS, MD - Internal Medicine","Jhunjhunu"],
    ["Dr. Kush Verma","Consultant — Plastic Surgery","MBBS, MS, MCh (Plastic Surgery), Fellowship in Aesthetic Surgery","Mansarovar"],
    ["Dr. Shiv Kumar Saini","Consultant — Neurology","MBBS, MD Medicine, DM Neurology","Mansarovar"],
    ["Dr. Harish Agarwal","Consultant — Urology","MBBS, MS, DNB - Urology","Bikaner"],
    ["Dr. Bhanu Kaushik","Consultant — Urology","MBBS, MS, MCh - Urology, DrNB (Urology)","Mansarovar"],
    ["Dr. Rishabh Kochar","Consultant — Pulmonary, Critical Care & Sleep Medicine","MBBS, MD, DM Pulmonary, Critical Care & Sleep Medicine","Bikaner"],
    ["Dr. Kuljeet Singh","Consultant — Pulmonary Medicine","MBBS, DNB (Respiratory Medicine)","Jhunjhunu"],
    ["Dr. Atul Tiwari","Consultant — Medical Oncology","MBBS, MD Radiation Oncology, DM - Medical Oncology","Bikaner"],
    ["Dr. Rakesh Jain","Consultant — Internal Medicine","MBBS, MD - Medicine","Sri Ganganagar"],
    ["Dr. Ritesh Jindal","Consultant — Radiology","MBBS, DM-RD","Sri Ganganagar"],
    ["Dr. Mudit Sharma","Consultant — Critical Care & Anaesthesiology","MBBS, MD (Anaesthesia & Intensive Care, PGIMER)","Sri Ganganagar"],
    ["Dr. Pulkit Thatai","Consultant — Orthopaedics","MBBS, MS - Orthopaedics","Sri Ganganagar"],
    ["Dr. Sachin Chandak","Consultant — General Surgery","MBBS, MS - General Surgery","Bikaner"],
    ["Dr. Mukesh Singh Bhadouria","Consultant — Neurosurgery","MBBS, MS - General Surgery, MCh (Neurosurgery)","Udaipur"],
    ["Dr. Deepak Singhal","Consultant — ENT & Head and Neck Surgery","MBBS, DNB - ENT, Fellowship in Laryngology","Sawai Madhopur"],
    ["Dr. Nilesh Nama","Consultant — Neurosurgery","MBBS, MS, MCh (Neurosurgery)","Bikaner"],
    ["Dr. Sunita Shyag","Consultant — Obstetrics & Gynaecology","MBBS, DGO, DNB (Obstetrics & Gynaecology)","Sri Ganganagar"],
    ["Dr. Vivek Pandey","Consultant — Gastroenterology","MBBS, MD, DM (Medical Gastroenterology)","Sawai Madhopur"],
    ["Dr. A.K. Sony","Consultant — ICU & Critical Care","ICU & Critical Care","Lucknow"],
    ["Dr. Krishanu Kusum","Consultant — Cardiology","Cardiology","Lucknow"],
    ["Dr. Keshav Sharma","Consultant — Urology","MBBS, MS, MCh - Urology","Sawai Madhopur"],
    ["Dr. Sandeep Shyag","Director — Neurosurgery","MBBS, MS, MCh (Neurosurgery)","Sri Ganganagar"],
    ["Dr. Neha Gupta","Consultant — Ophthalmology","MBBS, DNB - Ophthalmology, FLVPEI","Sawai Madhopur"],
    ["Dr. Lakshya Mittal","Consultant — General, Laparoscopic, Laser & Robotic Surgery","MBBS, MS, FMAS, FALS","Sri Ganganagar"],
    ["Dr. Shreyans Jain","Consultant — Gastroenterology","MBBS, MD - Medicine, DrNB (Gastroenterology)","Bikaner"],
    ["Dr. Tontanga Momoson","Consultant — Anaesthesiology","MBBS, MD - Anaesthesiology","Udaipur"],
    ["Dr. Sanjoli Thatai","Consultant — Anaesthesiology","MBBS, Diploma in Anaesthesiology, DNB","Sri Ganganagar"],
    ["Dr. Anuradha Meena","Consultant — General Anaesthesiology","MBBS, MD (Anaesthesiology & Critical Care)","Sawai Madhopur"],
    ["Dr. Rajkumar Nagar","Consultant — General Anaesthesia","MBBS, Diploma in Anaesthesia, DNB (Anaesthesia)","Mansarovar"],
    ["Dr. R.N. Vijay","Consultant — Anaesthesiology","MBBS, MD (Anaesthesia)","Bikaner"],
    ["Dr. Mohit Kumar Mangal","Consultant — Critical Care","MBBS, DNB (Anaesthesiology), IDCCM","Sawai Madhopur"],
    ["Dr. Saroj Saini","Consultant — Anaesthesiology","MBBS, MD - Anaesthesiology","Sawai Madhopur"],
    ["Dr. Somya Mahalawat","Consultant — Cardiology","MBBS, MD, DM Cardiology","Jhunjhunu"],
    ["Dr. Farooq Farooqui","Consultant — Physiotherapy","BPT, MPT","Jhunjhunu"],
    ["Dr. Abhishek Gahlot","Consultant — Radiology","MBBS, MD - Radio Diagnosis","Bikaner"],
    ["Dr. Dheeraj Kumar Meena","Consultant — Internal Medicine","MBBS, MD - General Medicine","Sawai Madhopur"],
    ["Dr. Praneet Manekar","Associate Consultant — Cardiology","MBBS, MD, DM - Cardiology","Malviya Nagar"],
    ["Dr. Ashok Kumar Dudhwal","Consultant — Gastroenterology","MBBS, MD, DM - Gastroenterology & Hepatology (AIIMS Delhi)","Malviya Nagar"],
    ["Dr. Premalatha Krishnamoorthy","Consultant — Cardiac Anaesthesiology","MBBS, DNB (Anaesthesia)","Malviya Nagar"],
    ["Dr. Himanshu Khichar","Senior Consultant — Orthopaedics, Joint Replacement & Sports Injury","MBBS, MS - Orthopaedics, FJRS (Robotic Joint Replacement)","Malviya Nagar"],
    ["Dr. Ashok Kumar Yadav","Associate Consultant — Neurology","MBBS, MD - General Medicine, DrNB - Neurology","Malviya Nagar"],
    ["Dr. Ayushi Singh","Consultant — Nephrology","MBBS, MD - Internal Medicine, DM - Nephrology","Sawai Madhopur"],
    ["Dr. Ankit Swami","Consultant — Internal Medicine","MBBS, MD & DNB - General Medicine","Bikaner"],
    ["Dr. Manjiri Vijaysingh Patil","Consultant — ENT","MBBS, DLO, DNB - ENT","Mansarovar"]
  ];

  // derive a specialty bucket from the designation text (specific keywords first)
  function specOf(role) {
    var r = role.toLowerCase();
    var pairs = [
      ["cardiothoracic","Cardiothoracic & Vascular Surgery"],["cardiac anaesth","Anaesthesiology"],
      ["interventional cardio","Cardiology"],["cardiolog","Cardiology"],["cardiac","Cardiology"],
      ["neuro & spine","Neurosurgery"],["neurosurg","Neurosurgery"],["neurolog","Neurology"],["neuroscience","Neurology"],
      ["orthopaed","Orthopaedics"],["surgical onco","Oncology"],["radiation onco","Oncology"],["medical onco","Oncology"],
      ["haemato","Oncology"],["onco","Oncology"],
      ["nephro","Nephrology"],["urolog","Urology"],["gastro","Gastroenterology"],
      ["pulmonary","Pulmonology"],["pulmonolog","Pulmonology"],["respiratory","Pulmonology"],
      ["obstet","Gynaecology & Obstetrics"],["gynaec","Gynaecology & Obstetrics"],
      ["paediatr","Paediatrics"],["pediatr","Paediatrics"],
      ["dermat","Dermatology"],[" ent","ENT"],["plastic","Plastic Surgery"],
      ["vascular","Vascular Surgery"],["interventional radio","Radiology"],["radiolog","Radiology"],
      ["patholog","Pathology"],["dental","Dental"],["physio","Physiotherapy"],
      ["diet","Dietetics & Nutrition"],["psychiatry","Psychiatry"],["endocrine","Endocrinology"],["diabet","Diabetology"],
      ["ophthalm","Ophthalmology"],["critical care","Critical Care"],["icu","Critical Care"],["anaesth","Anaesthesiology"],
      ["bariatric","General & Bariatric Surgery"],["laparoscopic","General & Laparoscopic Surgery"],
      ["general surg","General Surgery"],["internal medicine","Internal Medicine"],["medicine","Internal Medicine"]
    ];
    for (var i = 0; i < pairs.length; i++) if (r.indexOf(pairs[i][0]) > -1) return pairs[i][1];
    return "Other";
  }

  function initials(name) {
    var n = name.replace(/^Dr\.?\s*/i, "").replace(/\(.*?\)/g, "").trim().split(/\s+/);
    return ((n[0] || "")[0] || "") + ((n[1] || "")[0] || "");
  }

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  // a single doctor card
  function card(d) {
    return '<article class="doc glass"><div class="doc__photo"><span class="doc__avatar">' + initials(d[0]) +
      '</span></div><h3>' + d[0] + '</h3><span class="doc__role">' + d[1] + '</span>' +
      (d[2] ? '<span class="doc__qual">' + d[2] + '</span>' : '') +
      '<span class="doc__loc"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>' + d[3] + '</span></article>';
  }

  ready(function () {
    // attach derived specialty (used by both the preview loop and the directory)
    DOCTORS.forEach(function (d) { d[4] = specOf(d[1]); });

    // --- homepage preview: a small looping row of doctors ---
    var preview = document.getElementById("docPreview");
    if (preview) {
      var picks = [0, 6, 2, 36, 16, 8, 30, 19]; // varied directors/specialists
      var html = picks.map(function (i) { return card(DOCTORS[i]); }).join("");
      preview.innerHTML = html + html; // duplicate for a seamless marquee
    }

    // --- full directory page (doctors.html) ---
    var grid = document.getElementById("docResults");
    if (!grid) return;
    var nameI = document.getElementById("docSearch");
    var specI = document.getElementById("docSpec");
    var locI = document.getElementById("docLoc");
    var countEl = document.getElementById("docCount");

    function fillSelect(sel, values) {
      values.sort().forEach(function (v) {
        var o = document.createElement("option"); o.value = v; o.textContent = v; sel.appendChild(o);
      });
    }
    fillSelect(specI, DOCTORS.map(function (d) { return d[4]; }).filter(function (v, i, a) { return a.indexOf(v) === i; }));
    fillSelect(locI, DOCTORS.map(function (d) { return d[3]; }).filter(function (v, i, a) { return a.indexOf(v) === i; }));

    function render() {
      var q = (nameI.value || "").toLowerCase().trim();
      var sp = specI.value, lc = locI.value;
      var html = "", n = 0;
      for (var i = 0; i < DOCTORS.length; i++) {
        var d = DOCTORS[i];
        if (q && d[0].toLowerCase().indexOf(q) === -1) continue;
        if (sp && d[4] !== sp) continue;
        if (lc && d[3] !== lc) continue;
        n++;
        html += card(d);
      }
      grid.innerHTML = html || '<p class="doc__empty">No doctors match your search. Try a different name, specialty or location.</p>';
      if (countEl) countEl.textContent = "Showing " + n + " doctor" + (n === 1 ? "" : "s") + " available for consultation";
    }

    [nameI, specI, locI].forEach(function (el) {
      el.addEventListener("input", render); el.addEventListener("change", render);
    });
    render();
  });
})();
