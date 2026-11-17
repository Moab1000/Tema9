/***** Data om de 6 labs  ****/
/* Ét sted til alt om labs. Bruges af peek-kortet, quizzen og lab.html. */
const labs = {
  tech_story: {
    navn: "Tech & Story Lab",
    campus: "EK Guldbergsgade",
    tagline: "Fra idé til færdig historie",
    beskrivelse: "Podcast-studie, foto- og videostudie, VR og eye tracking. Lån udstyr i færdige pakker – og få hjælp til at komme i gang.",
    tags: ["Podcast", "Foto & video", "VR", "Eye tracking"],
    kanSkabe: ["Optag en podcast", "Lav film og foto", "Test design med eye tracking"],
    billede: "imgs/podcast.jpg",
    galleri: ["imgs/podcast.jpg", "imgs/foto.jpg", "imgs/vr.jpg"],
    logo: "imgs/logo_tech_story.svg",
    url: "tech_story_lab.html",
  },
  maker: {
    navn: "Maker Lab",
    campus: "EK Guldbergsgade",
    tagline: "Byg det, du har tegnet",
    beskrivelse: "3D-printere, laserskærer og CNC-fræser. Gå fra skitse til fysisk prototype – ofte på én dag.",
    tags: ["3D-print", "Laserskæring", "CNC"],
    kanSkabe: ["3D-print en prototype", "Laserskær emballage", "Fræs i træ og plast"],
    billede: "imgs/maker.jpg",
    galleri: ["imgs/maker.jpg", "imgs/maker_skaerm.jpg", "imgs/maker_fraeser.jpg"],
    logo: "imgs/logo_maker.svg",
    url: "lab.html?id=maker",
  },
  media: {
    navn: "Media Lab",
    campus: "EK Firskovvej",
    tagline: "Træd ind i nye verdener",
    beskrivelse: "VR-headsets, store skærme og kraftige maskiner til at teste, bygge og opleve digitale universer.",
    tags: ["VR", "Game", "Digitale medier"],
    kanSkabe: ["Test et VR-spil", "Byg en 360°-oplevelse", "Præsentér på storskærm"],
    billede: "imgs/360.jpg",
    galleri: ["imgs/360.jpg", "imgs/vr_go.jpg", "imgs/vr.jpg"],
    logo: "imgs/logo_media.svg",
    url: "lab.html?id=media",
  },
  circular_material: {
    navn: "Circular Material Lab",
    campus: "EK Guldbergsgade",
    tagline: "Giv materialer et nyt liv",
    beskrivelse: "Symaskiner, mannequiner og restmaterialer. Redesign tekstiler og eksperimentér med cirkulære materialer.",
    tags: ["Redesign", "Tekstil", "Materialer"],
    kanSkabe: ["Redesign en jakke", "Test nye materialer", "Lav en cirkulær prototype"],
    billede: "imgs/circular_material.jpg",
    galleri: ["imgs/circular_material.jpg", "imgs/symaskine.jpg", "imgs/fashion_lab.jpg"],
    logo: "imgs/logo_circular_material.svg",
    url: "lab.html?id=circular_material",
  },
  circular: {
    navn: "Circular Lab",
    campus: "EK Guldbergsgade",
    tagline: "Forretning, der holder for fremtiden",
    beskrivelse: "Et lab for cirkulær økonomi og bæredygtig innovation. Udvikl idéer, der både giver mening og penge.",
    tags: ["Cirkulær økonomi", "Bæredygtighed", "Innovation"],
    kanSkabe: ["Gentænk en forretningsmodel", "Workshop om bæredygtighed", "Pitch en grøn idé"],
    billede: "imgs/circular_lab.jpg",
    galleri: ["imgs/circular_lab.jpg", "imgs/maker_fraeser.jpg", "imgs/fashion_lab.jpg"],
    logo: "imgs/logo_circular.svg",
    url: "lab.html?id=circular",
  },
  lab16: {
    navn: "Lab 16",
    campus: "EK Lygten",
    tagline: "Eksperimentér på Lygten",
    beskrivelse: "Lygtens eget lab – et frirum til at prøve idéer af, bygge, teste og samarbejde på tværs af uddannelser.",
    tags: ["Prototyper", "Samarbejde", "Test"],
    kanSkabe: ["Byg en hurtig prototype", "Test en idé med brugere", "Arbejd på tværs af hold"],
    billede: "imgs/lab16.jpg",
    galleri: ["imgs/lab16.jpg", "imgs/interview.jpg", "imgs/maker_skaerm.jpg"],
    logo: "imgs/logo_lab16.svg",
    url: "lab.html?id=lab16",
  },
};

/***** Menu burger  ****/
const burger = document.querySelector(".burger");
const nav = document.querySelector("nav");

burger.addEventListener("click", burgerClick);
function burgerClick() {
  burger.classList.toggle("active");
  nav.classList.toggle("active");
}

/***** Åbent nu / lukket  ****/
/* man-tor 9-16, fre 9-15, weekend lukket */
const nu = new Date();
const dag = nu.getDay(); // 0 = søndag, 5 = fredag, 6 = lørdag
const time = nu.getHours();

let lukker = 16;
if (dag === 5) {
  lukker = 15;
}

let aabent = false;
if (dag >= 1 && dag <= 5 && time >= 9 && time < lukker) {
  aabent = true;
}

const statusTekster = document.querySelectorAll(".aabent_status");

statusTekster.forEach(function (tekst) {
  if (aabent) {
    tekst.textContent = "● Åbent nu · lukker " + lukker + ".00";
  } else {
    tekst.textContent = "● Lukket lige nu";
    tekst.style.color = "#c35f7c";
  }
});

/* de grønne prikker på ringene i orbitten */
document.querySelectorAll(".ring .live").forEach(function (prik) {
  if (!aabent) {
    prik.classList.add("lukket");
  }
});

/***** Fafi – tegningen sættes ind  ****/
/* fafiSvg kommer fra fafi.js. Alle steder med klassen .fafi får tegningen. */
const fafier = document.querySelectorAll(".fafi");

fafier.forEach(function (fafi) {
  fafi.innerHTML = fafiSvg;
});

/***** Fafi – øjet følger musen  ****/
window.addEventListener("pointermove", oejeFoelgerMusen);

function oejeFoelgerMusen(event) {
  const oejne = document.querySelectorAll(".fafi_oeje");

  oejne.forEach(function (oeje) {
    const boks = oeje.getBoundingClientRect();
    if (boks.width === 0) {
      return;
    }
    // afstand fra øjets midte til musen
    const dx = event.clientX - (boks.left + boks.width / 2);
    const dy = event.clientY - (boks.top + boks.height / 2);
    const afstand = Math.sqrt(dx * dx + dy * dy) || 1;
    // øjet må højst flytte sig 7 px
    const kraft = Math.min(1, afstand / 300) * 7;

    oeje.style.setProperty("--ex", (dx / afstand) * kraft + "px");
    oeje.style.setProperty("--ey", (dy / afstand) * kraft * 0.6 + "px");
  });
}

/***** Fafi tager et billede (blitz)  ****/
const blitz = document.querySelector(".blitz");

fafier.forEach(function (fafi) {
  fafi.addEventListener("click", fafiKnipser);
});

function fafiKnipser() {
  const fafi = this;
  fafi.classList.remove("knips");
  void fafi.offsetWidth; // gør at animationen kan starte forfra
  fafi.classList.add("knips");

  blitz.classList.remove("aktiv");
  void blitz.offsetWidth;
  blitz.classList.add("aktiv");
}

/***** Toast – lille besked nederst  ****/
const toast = document.querySelector(".toast");
let toastTimer;

function visToast(tekst) {
  toast.textContent = tekst;
  toast.classList.add("vis");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove("vis");
  }, 2600);
}

/***** Peek-kort på orbit (forside)  ****/
/* Hover på en ring viser kortet med labbets info. På mobil (ingen hover) viser
   første tap kortet, og andet tap går til labbet. */
const orbit = document.querySelector(".orbit");
const peek = document.querySelector(".peek");
let stopKlik = false; // på mobil: første tap viser kortet, andet tap går til labbet

if (orbit) {
  const ringe = orbit.querySelectorAll(".ring, .ring_center");

  ringe.forEach(function (ring) {
    ring.addEventListener("mouseenter", function () {
      visPeek(ring.dataset.lab);
    });
    ring.addEventListener("focus", function () {
      visPeek(ring.dataset.lab);
    });
    // touchstart kommer før click på en telefon
    ring.addEventListener("touchstart", function () {
      if (peek.dataset.lab !== ring.dataset.lab) {
        visPeek(ring.dataset.lab);
        stopKlik = true;
      } else {
        stopKlik = false;
      }
    }, { passive: true });
    ring.addEventListener("click", function (event) {
      if (stopKlik) {
        event.preventDefault();
        stopKlik = false;
      }
    });
  });

  orbit.addEventListener("mouseleave", function () {
    peek.classList.remove("vis");
    peek.dataset.lab = "";
  });
}

function visPeek(id) {
  const lab = labs[id];
  peek.dataset.lab = id;

  peek.querySelector(".peek_campus").textContent = lab.campus.toUpperCase();
  peek.querySelector(".peek_navn").textContent = lab.navn;
  peek.querySelector(".peek_tekst").textContent = lab.beskrivelse;
  peek.querySelector(".peek_link").textContent = "Gå til " + lab.navn + " →";
  peek.querySelector(".peek_link").href = lab.url;

  // kortets farve følger labbet (tema-klassen skifter --lab-color)
  peek.className = "peek vis tema_" + id;
}

/***** Quiz – Hvilket lab er du?  ****/
/* Spørgsmål og svar er de samme som i Figma Make-prototypen.
   Hvert svar giver point til et eller flere labs. */
const quizSpoergsmaal = document.querySelector(".quiz_spoergsmaal");
const quizTekst = document.querySelector(".quiz_tekst");
const svarBoks = document.querySelector(".svar");
const quizSide = document.querySelector(".quiz_side");
const progress = document.querySelectorAll(".progress span");

const quiz = [
  {
    spoergsmaal: "Hvad får dig til at glemme tiden?",
    svar: [
      { tekst: "🎙️  At fortælle historier", point: { tech_story: 2, media: 1 } },
      { tekst: "🧩  At bygge med hænderne", point: { maker: 2, lab16: 1 } },
      { tekst: "🌱  At gøre verden bedre", point: { circular: 2, circular_material: 1 } },
      { tekst: "🎮  Spil og digitale verdener", point: { media: 2, tech_story: 1 } },
    ],
  },
  {
    spoergsmaal: "Hvad vil du gerne stå med bagefter?",
    svar: [
      { tekst: "🎬  En film eller podcast", point: { tech_story: 2 } },
      { tekst: "📦  En fysisk prototype", point: { maker: 2, lab16: 1 } },
      { tekst: "👕  Et redesignet produkt", point: { circular_material: 2 } },
      { tekst: "💡  En forretningsidé", point: { circular: 2, lab16: 1 } },
    ],
  },
  {
    spoergsmaal: "Hvor læser du?",
    svar: [
      { tekst: "🏙️  Guldbergsgade", point: { tech_story: 1, maker: 1, circular: 1, circular_material: 1 } },
      { tekst: "🏭  Lygten", point: { lab16: 2 } },
      { tekst: "🌳  Firskovvej", point: { media: 2 } },
      { tekst: "🤷  Det betyder ikke noget", point: {} },
    ],
  },
];

let nummer = 0;
let point = {};

function visSpoergsmaal() {
  quizSpoergsmaal.textContent = quiz[nummer].spoergsmaal;
  quizTekst.innerHTML = "";
  svarBoks.innerHTML = "";

  quiz[nummer].svar.forEach(function (svar) {
    const knap = document.createElement("button");
    knap.textContent = svar.tekst;
    knap.addEventListener("click", function () {
      vaelgSvar(svar.point);
    });
    svarBoks.appendChild(knap);
  });

  for (let i = 0; i < progress.length; i++) {
    if (i <= nummer) {
      progress[i].classList.add("fyldt");
    } else {
      progress[i].classList.remove("fyldt");
    }
  }

  // Fafi står ved siden af, mens man svarer
  if (nummer === 0) {
    quizSide.innerHTML = '<span class="fafi"></span>';
    quizSide.querySelector(".fafi").innerHTML = fafiSvg;
    quizSide.querySelector(".fafi").addEventListener("click", fafiKnipser);
  }
}

function vaelgSvar(svarPoint) {
  // læg svarets point oven i det, labbet har i forvejen
  for (let lab in svarPoint) {
    if (point[lab]) {
      point[lab] = point[lab] + svarPoint[lab];
    } else {
      point[lab] = svarPoint[lab];
    }
  }

  nummer = nummer + 1;

  if (nummer < quiz.length) {
    visSpoergsmaal();
  } else {
    visResultat();
  }
}

function visResultat() {
  /* find det lab med flest point */
  let vinder = "tech_story";
  for (let lab in point) {
    if (point[lab] > (point[vinder] || 0)) {
      vinder = lab;
    }
  }
  const lab = labs[vinder];

  quizSpoergsmaal.innerHTML = "Du er et <span class='kursiv'>" + lab.navn + "</span>-menneske!";
  quizTekst.innerHTML = lab.beskrivelse + "<br><b>Prøv fx:</b> " + lab.kanSkabe.join(" · ");
  svarBoks.innerHTML = "";

  const seLab = document.createElement("a");
  seLab.href = lab.url;
  seLab.classList.add("knap", "knap_primary");
  seLab.textContent = "Gå til " + lab.navn + " →";

  const igen = document.createElement("button");
  igen.classList.add("knap", "knap_ghost");
  igen.textContent = "Tag quizzen igen";
  igen.addEventListener("click", function () {
    nummer = 0;
    point = {};
    document.querySelectorAll(".lab_kort").forEach(function (kort) {
      kort.classList.remove("markeret");
    });
    visSpoergsmaal();
  });

  svarBoks.appendChild(seLab);
  svarBoks.appendChild(igen);

  // logoet popper op i stedet for Fafi, og kortet nede på siden bliver markeret
  quizSide.innerHTML = '<img class="lab_logo" src="' + lab.logo + '" alt="' + lab.navn + ' logo">';
  document.querySelector("#" + vinder).classList.add("markeret");
}

if (quizSpoergsmaal) {
  visSpoergsmaal();
}

/***** Vælg pakke  ****/
const vaelgKnapper = document.querySelectorAll(".vaelg_pakke");

vaelgKnapper.forEach(function (knap) {
  knap.addEventListener("click", function () {
    const navn = knap.closest(".pakke").dataset.navn;
    visToast(navn + "-pakken er lagt i kurven ✔");
  });
});

/***** Tilpas pakke  ****/
const tilpasKnapper = document.querySelectorAll(".tilpas");

tilpasKnapper.forEach(function (knap) {
  knap.addEventListener("click", function () {
    const liste = knap.closest(".pakke").querySelector(".tilpas_liste");
    liste.classList.toggle("aaben");

    if (liste.classList.contains("aaben")) {
      knap.textContent = "Færdig";
    } else {
      knap.textContent = "Tilpas";
      visToast("Din tilpassede pakke er gemt ✔");
    }
  });
});

const fjernKnapper = document.querySelectorAll(".tilpas_liste button");

fjernKnapper.forEach(function (knap) {
  knap.addEventListener("click", function () {
    const punkt = knap.parentElement;
    punkt.classList.toggle("fjernet");

    if (punkt.classList.contains("fjernet")) {
      knap.textContent = "læg tilbage";
    } else {
      knap.textContent = "fjern";
    }
  });
});

/***** Tilmeld workshop  ****/
const tilmeldKnapper = document.querySelectorAll(".tilmeld");

tilmeldKnapper.forEach(function (knap) {
  knap.addEventListener("click", function () {
    const pladser = knap.parentElement.querySelector(".pladser");

    if (knap.classList.contains("tilmeldt")) {
      knap.classList.remove("tilmeldt");
      knap.textContent = "Tilmeld";
      if (pladser) {
        pladser.textContent = Number(pladser.textContent) + 1;
      }
    } else {
      knap.classList.add("tilmeldt");
      knap.textContent = "Tilmeldt ✓";
      if (pladser) {
        pladser.textContent = Number(pladser.textContent) - 1;
      }
      visToast("Du er tilmeldt! 🎉 Vi sender en reminder.");
    }
  });
});

/***** Fafi chat  ****/
/* Ikke rigtig AI: Fafi leder efter nøgleord i det, man skriver, og finder det
   svar, der passer bedst. Svarene og de hurtige svar er fra Make-prototypen. */
const chat = document.querySelector(".chat");
const aabenChat = document.querySelectorAll(".aabenChat");
const lukChat = document.querySelector(".luk_chat");
const nulstilChat = document.querySelector(".nulstil_chat");
const beskeder = document.querySelector(".beskeder");
const hurtige = document.querySelector(".hurtige");
const chatForm = document.querySelector(".chat_form");
const chatInput = document.querySelector(".chat_form input");
let chatStartet = false;

const tsl = "tech_story_lab.html";

const fafiSvar = [
  {
    ord: ["hej", "hey", "hallo", "goddag", "yo", "hejsa", "davs"],
    svar: "<p>Hej hej! 👋 Hvad drømmer du om at skabe i dag – en <strong>podcast</strong>, en <strong>kortfilm</strong>, et <strong>fotoshoot</strong> eller noget helt andet?</p>",
    chips: ["Hvad kan jeg bruge labbet til?", "Hvordan låner jeg?", "Giv mig en idé"],
  },
  {
    ord: ["hvad er", "hvad kan jeg", "bruge labbet", "hvad laver", "hvad tilbyder", "tech & story", "tech and story", "om labbet", "hvad er labbet"],
    svar: "<p><strong>Tech & Story Lab</strong> er stedet, hvor du går fra idé til færdig historie. Du kan:</p><ul><li>🎙️ optage podcasts i vores lydstudie</li><li>📸 lave foto og video i studiet med lys og baggrunde</li><li>🥽 prøve VR og 360°</li><li>👁️ teste dit design med eye tracking</li><li>🎒 låne kamera, lyd og lys med hjem</li></ul><p>Du behøver ikke kunne noget i forvejen – vi hjælper dig i gang. <a href='" + tsl + "'>Gå til Tech & Story Lab →</a></p>",
    chips: ["Hvad kan jeg som multimediedesigner?", "Vis pakkerne", "Ny i labbet"],
  },
  {
    ord: ["multimedie", "mmd", "markedsføring", "entreprenør", "design", "datamatiker", "økonomi", "finans", "fag", "uddannelse", "studerer", "webudvikling"],
    svar: "<p>Godt spørgsmål – 52 % af de studerende, vi spurgte, vidste ikke, hvad de kunne bruge labbet til. Her er 3 idéer til dit fag:</p><ol><li>Lav en <strong>brand-film</strong> til din case-virksomhed</li><li>Optag <strong>produktfotos</strong> i fotostudiet til din webshop-prototype</li><li>Test din prototype med <strong>eye tracking</strong> – se præcis hvor brugerne kigger</li></ol><p>Hvilken af dem giver dig lyst til at gå i gang? ✨</p>",
    chips: ["Guide: min første podcast", "Guide: min første film", "Hvordan låner jeg?"],
  },
  {
    ord: ["pakke", "pakker", "interview", "kit", "sæt", "hvad skal jeg bruge", "hvilket udstyr"],
    svar: "<p>Du tænker i opgaver – det gør vi også. Vælg en <strong>pakke</strong>, så får du alt med (også SD-kortet 😉):</p><ul><li>🎤 <strong>Interview</strong> – kamera, 2 trådløse mikrofoner, stativ</li><li>🎬 <strong>Lille film</strong> – kamera, gimbal, lys, shotgun-mikrofon</li><li>🎙️ <strong>Podcast</strong> – studie + 2–4 mikrofoner og optager</li><li>📸 <strong>Foto</strong> – kamera, 2 objektiver, studielys</li></ul><p>Du kan <strong>tilpasse</strong> hver pakke – tage noget ud eller lægge noget til. <a href='" + tsl + "#pakker'>Se alle pakker →</a></p>",
    chips: ["Hvad er ledigt nu?", "Hvad er i film-pakken?", "Hvordan låner jeg?"],
  },
  {
    ord: ["film", "video", "kortfilm", "filme", "gimbal"],
    svar: "<p>🎬 <strong>Film-pakken</strong> indeholder:</p><ul><li>Spejlløst kamera + 24–70 mm objektiv</li><li>Gimbal til rolige skud</li><li>Shotgun-mikrofon + vindbeskytter</li><li>LED-lys med batteri</li><li>2 batterier, lader og 128 GB SD-kort</li></ul><p><strong>Ikke med:</strong> trådløse mikrofoner (læg dem til, hvis du skal interviewe).</p><div class='tip'>💡 Fafi-tip: Optag 5 sek. stilhed på location – så er det nemt at fjerne baggrundsstøj bagefter.</div>",
    chips: ["Guide: min første film", "Book film-pakken", "Hvad er ledigt nu?"],
  },
  {
    ord: ["podcast", "lyd", "mikrofon", "optage", "studie", "podcaststudie"],
    svar: "<p>🎙️ Vores <strong>podcaststudie</strong> har plads til 4 personer, mikrofoner på arme, mixer og akustik, der lyder professionelt fra første optagelse.</p><p>Du booker studiet i tidsrum på 2 timer – og vi viser dig, hvordan det hele virker første gang. <a href='" + tsl + "#pakker'>Se podcast-pakken →</a></p>",
    chips: ["Guide: min første podcast", "Hvordan booker jeg?", "Åbningstider"],
  },
  {
    ord: ["foto", "billede", "billeder", "fotograf", "portræt", "objektiv", "fotostudie", "lys"],
    svar: "<p>📸 I <strong>fotostudiet</strong> har vi baggrundsruller, softboxe og blitz – perfekt til portrætter, produktbilleder og mode.</p><p>Usikker på objektivet? Kort fortalt:</p><ul><li><strong>50 mm</strong> – portrætter og blød baggrund</li><li><strong>24–70 mm</strong> – alt-mulig-mand, også video</li><li><strong>Makro</strong> – små produkter tæt på</li></ul>",
    chips: ["Book fotostudiet", "Giv mig en idé", "Hvordan låner jeg?"],
  },
  {
    ord: ["låne", "låner", "lån", "booke", "book", "booking", "reservere", "topdesk", "hente", "aflevere", "afhente", "trin"],
    svar: "<p>Det er nemt – <strong>lån i 3 trin</strong>:</p><ol><li><strong>Vælg pakke eller udstyr</strong> og se, hvad der er ledigt (2 min)</li><li><strong>Book tidsrum</strong> i bookingsystemet med dit EK-login (3 min)</li><li><strong>Hent i A025</strong> – husk dit studiekort. Udlevering tager ca. 5–10 min, aflevering ca. 5 min.</li></ol><p>Første gang? Kig forbi – så viser vi dig, hvordan udstyret virker. 🙌</p>",
    chips: ["Hvad er ledigt nu?", "Studiekort?", "Åbningstider"],
  },
  {
    ord: ["ledig", "ledigt", "tilgængelig", "på lager", "nu", "fri"],
    svar: "<p>Lige nu (demo-data):</p><ul><li>🟢 Interview-pakke – <strong>3 ledige</strong></li><li>🟡 Film-pakke – <strong>1 ledig</strong></li><li>🟢 Podcaststudie – ledigt fra <strong>kl. 13</strong></li><li>🔴 Foto-pakke – udlånt til torsdag</li></ul>",
    chips: ["Book interview-pakken", "Hvordan låner jeg?"],
  },
  {
    ord: ["åbningstid", "åbent", "åben", "lukket", "hvornår", "tid", "adresse", "hvor ligger", "find vej", "lokale"],
    svar: "<p>📍 <strong>EK Guldbergsgade, bygning A, lokale A025</strong> (lokalet bag receptionen)</p><p>🕘 Mandag–torsdag kl. 9.00–16.00<br>Fredag kl. 9.00–15.00</p><p>Du er altid velkommen til at kigge forbi – også bare for at snuse. ☕</p>",
    chips: ["Kontakt labbet", "Hvordan låner jeg?"],
  },
  {
    ord: ["kontakt", "telefon", "mail", "email", "ringe", "skrive", "personale", "hvem", "lab-manager", "manager"],
    svar: "<p>Du kan altid fange os her:</p><ul><li>☎️ <a href='tel:+4546460442'>46 46 04 42</a></li><li>✉️ <a href='mailto:techandstorylab@ek.dk'>techandstorylab@ek.dk</a></li></ul><p>Lab-manager er <strong>Frederick Lehmann Rosling</strong>, og labspecialist <strong>Luke Julius Frost</strong> og lab-assistenterne hjælper dig gerne med alt fra mikrofoner til VR.</p>",
    chips: ["Åbningstider", "Workshops"],
  },
  {
    ord: ["studiekort", "kort", "id", "legitimation"],
    svar: "<p>🪪 Ja, du skal have dit <strong>gyldige studiekort</strong> med, når du henter udstyr eller bruger studierne. Det er personligt – det må kun bruges af dig.</p>",
    chips: ["Hvordan låner jeg?", "Åbningstider"],
  },
  {
    ord: ["tilbehør", "sd", "sd-kort", "kabel", "kabler", "batteri", "lader", "sender", "modtager", "hører til", "mangler", "glemt"],
    svar: "<p>Godt du spørger – det er præcis det, de fleste glemmer! 🙈 Alle pakker indeholder nu:</p><ul><li>SD-kort (128 GB)</li><li>Ekstra batterier + lader</li><li>De kabler, der passer</li><li>Sender <em>og</em> modtager til trådløse mikrofoner</li></ul><p>Og hver pakke har en liste over <strong>\"hvad er ikke med\"</strong>, så du ikke får overraskelser ude på location.</p>",
    chips: ["Vis pakkerne", "Se video-guides"],
  },
  {
    ord: ["workshop", "kursus", "intro", "lære", "event", "arrangement", "undervisning", "underviser", "hold", "ny i labbet", "nybegynder", "begynder", "første gang"],
    svar: "<p>Ny i labbet? <strong>Start her!</strong> 🚀 Vi holder gratis intro-workshops hver uge:</p><ul><li>🎙️ <strong>Podcast på 60 min</strong> – tirsdag kl. 14</li><li>🎬 <strong>Film med mobil og gimbal</strong> – onsdag kl. 13</li><li>👁️ <strong>Eye tracking til UX-opgaven</strong> – tirsdag kl. 10</li></ul><p>Er du underviser? Du kan booke en workshop til hele dit hold. 👩‍🏫 <a href='" + tsl + "#workshops'>Se workshops →</a></p>",
    chips: ["Tilmeld intro-workshop", "Giv mig en idé"],
  },
  {
    ord: ["guide: min første podcast", "første podcast", "starte en podcast", "lave en podcast"],
    svar: "<p>🎙️ <strong>Din første podcast i 5 trin</strong></p><ol><li><strong>Find din vinkel</strong> – hvad ved du noget om, som andre gerne vil høre?</li><li><strong>Skriv 5 spørgsmål</strong>, ikke et manuskript. Det gør samtalen levende.</li><li><strong>Book studiet</strong> i 2 timer – 1 time til test, 1 til optagelse.</li><li><strong>Optag 10 sek. stilhed</strong> først, og sæt mikrofonen en knytnæve fra munden.</li><li><strong>Klip i Audacity eller Descript</strong> og udgiv på Spotify.</li></ol><div class='tip'>✨ \"Den bedste podcast er den, der bliver optaget.\" – start i dag.</div>",
    chips: ["Book podcaststudiet", "Podcast-workshop"],
  },
  {
    ord: ["guide: min første film", "første film", "lave en film", "kortfilm guide"],
    svar: "<p>🎬 <strong>Din første kortfilm i 5 trin</strong></p><ol><li><strong>Én sætning</strong>: hvad handler filmen om? Skriv den på en post-it.</li><li><strong>Storyboard</strong> 6–8 billeder – stregtegninger er fine.</li><li><strong>Lån film-pakken</strong> – alt er med, også SD-kort og lys.</li><li><strong>Film hvert skud 3 gange</strong>: total, halvnær, close-up.</li><li><strong>Lyd før billede</strong>: dårlig lyd ødelægger mere end dårligt billede.</li></ol><div class='tip'>💡 Fafi-tip: Gimbal + gå langsomt = biograf-følelse på 5 minutter.</div>",
    chips: ["Hvad er i film-pakken?", "Book film-pakken"],
  },
  {
    ord: ["idé", "ide", "ideer", "idéer", "inspiration", "inspirer", "kedelig", "keder", "hvad skal jeg lave", "giv mig"],
    svar: "IDE", // tilfældig idé – se fafiIde()
    chips: ["Giv mig en ny idé", "Hvordan låner jeg?", "Vis pakkerne"],
  },
  {
    ord: ["vr", "virtual", "xr", "360", "headset", "oculus", "quest", "ar"],
    svar: "<p>🥽 Vi har VR-headsets og 360°-kameraer i Tech & Story Lab – og <strong>Media Lab</strong> på Firskovvej er bygget til større VR- og game-projekter.</p><p><a href='lab.html?id=media'>Gå til Media Lab →</a></p>",
    chips: ["Workshops", "Andre labs"],
  },
  {
    ord: ["eye tracking", "eyetracking", "øjne", "brugertest", "test", "ux"],
    svar: "<p>👁️ Med <strong>eye tracking</strong> kan du se præcis, hvor brugerne kigger på dit website, din reklame eller emballage – som heatmaps. Det er guld til UX-opgaven og eksamen.</p><p>Vi sætter det op sammen med dig første gang.</p>",
    chips: ["Book eye tracking", "Kontakt labbet"],
  },
  {
    ord: ["andre labs", "labs", "maker", "3d", "printer", "laser", "cnc", "tekstil", "sy", "symaskine", "circular", "cirkulær", "bæredygtig", "genbrug", "redesign", "materiale", "lab 16", "lygten", "firskovvej", "media lab", "hvilket lab"],
    svar: "LABS", // liste over alle labs – se fafiLabs()
    chips: ["Hvad kan jeg bruge labbet til?", "Åbningstider"],
  },
  {
    ord: ["pris", "koster", "gratis", "betale", "penge"],
    svar: "<p>💸 Det er <strong>gratis</strong> at låne udstyr og bruge studierne, når du er studerende på EK. Det eneste, vi beder om, er at du passer godt på tingene og afleverer til tiden.</p>",
    chips: ["Hvordan låner jeg?"],
  },
  {
    ord: ["tak", "super", "fedt", "nice", "sejt", "perfekt", "cool"],
    svar: "<p>Så lidt! 🙌 Fafi vinker farvel – og glæder sig til at se, hvad du skaber. Skriv bare igen, hvis du får brug for hjælp.</p>",
    chips: ["Giv mig en idé", "Vis pakkerne"],
  },
];

/* hvis Fafi ikke forstår spørgsmålet */
const fafiVedIkke = {
  svar: "<p>Hmm, det er jeg ikke helt sikker på 🤔 – men labbets mennesker ved det helt sikkert. Ring på <a href='tel:+4546460442'>46 46 04 42</a> eller skriv til <a href='mailto:techandstorylab@ek.dk'>techandstorylab@ek.dk</a>.</p><p>Eller prøv et af disse:</p>",
  chips: ["Hvad kan jeg bruge labbet til?", "Vis pakkerne", "Hvordan låner jeg?", "Giv mig en idé"],
};

/* korte knap-tekster, der skal give et bestemt svar */
const fafiGenveje = {
  "vis pakkerne": "pakke",
  "book film-pakken": "lån",
  "book interview-pakken": "lån",
  "book fotostudiet": "lån",
  "book podcaststudiet": "lån",
  "hvordan booker jeg?": "lån",
  "book eye tracking": "lån",
  "hvad er i film-pakken?": "film",
  "giv mig en ny idé": "giv mig en idé",
  "tilmeld intro-workshop": "workshop",
  "podcast-workshop": "workshop",
  "workshops": "workshop",
  "kontakt labbet": "kontakt",
  "se video-guides": "workshop",
  "ny i labbet": "workshop",
  "andre labs": "andre labs",
  "hvad kan jeg som multimediedesigner?": "multimedie",
  "hvilket lab passer til mig?": "hvilket lab",
  "studiekort?": "studiekort",
  "åbningstider": "åbningstid",
};

const fafiIdeer = [
  "Lav en <strong>3-minutters dokumentar</strong> om den person på din årgang, der har den vildeste hobby.",
  "Start en <strong>podcast-serie</strong>, hvor du interviewer én underviser om dagen om deres første job.",
  "Tag <strong>portrætter af 10 medstuderende</strong> og lav en udstilling i kantinen.",
  "Lav en <strong>VR-rundvisning</strong> på din campus til nye studerende.",
  "Brug <strong>eye tracking</strong> til at teste, om folk faktisk ser din CTA-knap.",
  "Lav en <strong>stop-motion-film</strong> med din telefon og studielyset.",
  "Optag en <strong>lydvandring</strong> rundt i København – med lyde du aldrig lægger mærke til.",
];

function fafiIde() {
  const ide = fafiIdeer[Math.floor(Math.random() * fafiIdeer.length)];
  return "<p>✨ Her er en idé, du kan starte på i dag:</p><p class='kursiv' style='font-size: 18px; line-height: 1.4;'>" + ide + "</p><p>Det kræver ingen erfaring – kun lyst. Vi har udstyret, og vi hjælper dig i gang.</p>";
}

function fafiLabs() {
  let html = "<p>EK har 6 tværgående labs – for alle studerende, hver med sin superkraft:</p><ul>";
  for (let id in labs) {
    html = html + "<li><a href='" + labs[id].url + "'>" + labs[id].navn + "</a> – " + labs[id].campus + " · " + labs[id].tagline + "</li>";
  }
  html = html + "</ul><div class='tip'>🧭 Usikker? Tag quizzen <a href='index.html#quiz'>\"Hvilket lab er du?\"</a> – den tager 20 sekunder.</div>";
  return html;
}

/* find det svar, der passer bedst til teksten */
function findSvar(tekst) {
  let t = tekst.toLowerCase().trim();

  // genveje: knap-tekster oversættes til et nøgleord
  if (fafiGenveje[t]) {
    t = fafiGenveje[t];
  }

  let bedste = fafiVedIkke;
  let bedstePoint = 0;

  fafiSvar.forEach(function (emne) {
    let p = 0;
    emne.ord.forEach(function (ord) {
      let ramt = false;
      if (ord.length <= 3) {
        // korte ord skal stå som hele ord, fx "vr" eller "sd"
        const dele = t.split(/[^\p{L}\p{N}]+/u);
        ramt = dele.includes(ord);
      } else {
        ramt = t.includes(ord);
      }
      if (ramt) {
        if (ord.length > 4) {
          p = p + 2 + ord.length / 10;
        } else {
          p = p + 1;
        }
      }
    });
    if (p > bedstePoint) {
      bedstePoint = p;
      bedste = emne;
    }
  });

  return bedste;
}

function visBesked(html, fraHvem) {
  const besked = document.createElement("div");
  besked.classList.add("besked");
  besked.classList.add(fraHvem);
  besked.innerHTML = html;
  beskeder.appendChild(besked);
  beskeder.scrollTop = beskeder.scrollHeight;
  return besked;
}

function visHurtige(liste) {
  hurtige.innerHTML = "";
  liste.forEach(function (tekst) {
    const knap = document.createElement("button");
    knap.type = "button";
    knap.textContent = tekst;
    knap.addEventListener("click", function () {
      sendTilFafi(tekst);
    });
    hurtige.appendChild(knap);
  });
}

function sendTilFafi(tekst) {
  if (tekst.trim() === "") {
    return;
  }
  // brugerens besked (uden html)
  const bruger = visBesked("", "fra_bruger");
  bruger.textContent = tekst;
  visHurtige([]);

  const emne = findSvar(tekst);

  // "Fafi skriver..." i et halvt sekund, så kommer svaret
  const skriver = visBesked("<div class='skriver'><i></i><i></i><i></i></div>", "fra_fafi");
  skriver.style.padding = "0";

  setTimeout(function () {
    skriver.remove();
    let svar = emne.svar;
    if (svar === "IDE") {
      svar = fafiIde();
    } else if (svar === "LABS") {
      svar = fafiLabs();
    }
    visBesked(svar, "fra_fafi");
    visHurtige(emne.chips);
  }, 500 + Math.random() * 500);
}

function hilsFraFafi() {
  beskeder.innerHTML = "";
  visBesked(
    "<p>Hej! Jeg er <strong>Fafi</strong> 👋 – EK Labs' lille kamera-væsen og AI-guide. (Klik på mig, så tager jeg et billede 📸)</p><p>Vi hjælper dig fra <span class='kursiv'>idé til færdig historie</span>. Spørg om udstyr, pakker, lån – eller bed om en idé!</p>",
    "fra_fafi"
  );
  visHurtige(["Hvad kan jeg bruge labbet til?", "Vis pakkerne", "Hvordan låner jeg?", "Giv mig en idé", "Åbningstider"]);
}

function aabnChat(spoergsmaal) {
  chat.classList.add("aaben");
  if (!chatStartet) {
    hilsFraFafi();
    chatStartet = true;
  }
  if (spoergsmaal) {
    setTimeout(function () {
      sendTilFafi(spoergsmaal);
    }, 400);
  }
  setTimeout(function () {
    chatInput.focus({ preventScroll: true });
  }, 350);
}

function lukChatVindue() {
  chat.classList.remove("aaben");
}

aabenChat.forEach(function (knap) {
  knap.addEventListener("click", function () {
    aabnChat("");
  });
});

lukChat.addEventListener("click", lukChatVindue);
nulstilChat.addEventListener("click", hilsFraFafi);

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    lukChatVindue();
  }
});

/* alle knapper med et spørgsmål til Fafi (på siden) */
const spoergKnapper = document.querySelectorAll(".spoerg");

spoergKnapper.forEach(function (knap) {
  knap.addEventListener("click", function () {
    aabnChat(knap.dataset.spoergsmaal);
  });
});

/* når man selv skriver noget */
chatForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const tekst = chatInput.value;
  chatInput.value = "";
  sendTilFafi(tekst);
});

/***** Lab-side (lab.html) – udfyld skabelonen  ****/
/* Adressen er fx lab.html?id=maker. Vi læser id'et og henter labbet i "labs". */
const labNavne = document.querySelectorAll(".lab_navn");

if (labNavne.length > 0) {
  let id = new URLSearchParams(window.location.search).get("id");
  if (!labs[id]) {
    id = "maker";
  }
  if (id === "tech_story") {
    window.location.replace("tech_story_lab.html");
  }
  const lab = labs[id];

  document.body.classList.add("tema_" + id);
  document.title = lab.navn + " · EK Labs";

  labNavne.forEach(function (sted) {
    sted.textContent = lab.navn;
  });
  document.querySelector(".lab_campus").textContent = lab.campus;
  document.querySelector(".lab_tagline").textContent = lab.tagline;
  document.querySelector(".lab_beskrivelse").textContent = lab.beskrivelse;
  document.querySelector(".logo_stor .lab_logo").src = lab.logo;
  document.querySelector(".logo_stor .lab_logo").alt = lab.navn + " logo";
  document.querySelector(".lab_foto").src = lab.billede;

  const tagBoks = document.querySelector(".lab_tags");
  lab.tags.forEach(function (tekst) {
    const tag = document.createElement("span");
    tag.classList.add("tag");
    tag.textContent = tekst;
    tagBoks.appendChild(tag);
  });

  const skabeBoks = document.querySelector(".lab_kan_skabe");
  lab.kanSkabe.forEach(function (tekst) {
    const kort = document.createElement("div");
    kort.classList.add("kan_skabe");
    kort.textContent = tekst;
    skabeBoks.appendChild(kort);
  });

  const galleriBoks = document.querySelector(".lab_galleri");
  lab.galleri.forEach(function (sti) {
    const billede = document.createElement("img");
    billede.src = sti;
    billede.alt = "Stemning fra " + lab.navn;
    galleriBoks.appendChild(billede);
  });

  const andreBoks = document.querySelector(".lab_andre");
  for (let andetId in labs) {
    if (andetId !== id) {
      const link = document.createElement("a");
      link.href = labs[andetId].url;
      link.innerHTML = '<img src="' + labs[andetId].logo + '" alt=""><span>' + labs[andetId].navn + "</span>";
      andreBoks.appendChild(link);
    }
  }

}
