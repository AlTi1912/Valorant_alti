document.documentElement.classList.add("js");

function store(key, value) {
  try {
    if (value === undefined) return JSON.parse(localStorage.getItem(key));
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) { return null; }
}

// Menú móvil
var toggle = document.querySelector(".nav-toggle");
if (toggle) {
  toggle.addEventListener("click", function () {
    var nav = document.querySelector(".nav");
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
}

// Pestañas accesibles: flechas, Inicio/Fin y roving tabindex
document.querySelectorAll("[data-tabs]").forEach(function (group, g) {
  var tabs = Array.prototype.slice.call(group.querySelectorAll(".tab"));
  var select = function (tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", on);
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    if (focus) tab.focus();
  };
  tabs.forEach(function (tab, i) {
    if (!tab.id) tab.id = "tab-" + g + "-" + i;
    var panel = document.getElementById(tab.getAttribute("aria-controls"));
    if (panel) { panel.setAttribute("aria-labelledby", tab.id); panel.tabIndex = 0; }
    tab.tabIndex = tab.getAttribute("aria-selected") === "true" ? 0 : -1;
    tab.addEventListener("click", function () { select(tab); });
    tab.addEventListener("keydown", function (e) {
      var n = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
      if (n === undefined) return;
      e.preventDefault();
      select(tabs[(n + tabs.length) % tabs.length], true);
    });
  });
});

// Checklists: el estado se guarda en el navegador de cada alumno
document.querySelectorAll("[data-checklist]").forEach(function (list) {
  var id = list.dataset.checklist;
  var boxes = list.querySelectorAll("input[type=checkbox]");
  var saved = store("checklist:" + id) || [];

  function update() {
    var state = [], done = 0;
    boxes.forEach(function (b, i) { state[i] = b.checked; if (b.checked) done++; });
    store("checklist:" + id, state);
    document.querySelectorAll('[data-progress="' + id + '"]').forEach(function (el) {
      var fg = el.querySelector(".fg");
      if (fg) {
        var len = 2 * Math.PI * fg.r.baseVal.value;
        fg.style.strokeDasharray = len;
        fg.style.strokeDashoffset = len * (1 - done / boxes.length);
      }
      var label = el.querySelector("b");
      if (label) label.textContent = done + "/" + boxes.length;
    });
  }

  boxes.forEach(function (b, i) { b.checked = !!saved[i]; b.addEventListener("change", update); });
  update();
});

// Índice lateral: resalta la sección visible
var tocLinks = document.querySelectorAll(".toc a");
if (tocLinks.length && "IntersectionObserver" in window) {
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      tocLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id); });
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  tocLinks.forEach(function (a) {
    var target = document.querySelector(a.getAttribute("href"));
    if (target) spy.observe(target);
  });
}

// Animación de entrada
if ("IntersectionObserver" in window) {
  var reveal = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); reveal.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal").forEach(function (el) { reveal.observe(el); });
} else {
  document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
}

// Calculadora de sensibilidad: eDPI y cm por giro de 360°
var sens = document.getElementById("calc-sens");
if (sens) {
  var dpi = document.getElementById("calc-dpi");
  var calcSens = function () {
    var d = parseFloat(dpi.value) || 0;
    var s = parseFloat(sens.value) || 0;
    var edpi = d * s;
    var cm = edpi ? (2.54 * 360) / (0.07 * edpi) : 0;
    document.getElementById("out-edpi").textContent = Math.round(edpi);
    document.getElementById("out-cm").textContent = cm ? cm.toFixed(1) : "–";
    // Escala de 0 a 800 eDPI
    document.getElementById("edpi-mark").style.left = Math.min(100, edpi / 8) + "%";
    var verdict = edpi < 200 ? "Baja: giras lento, pero apuntas fino." :
      edpi <= 400 ? "Normal. Es el rango que usa casi todo el mundo en competitivo." :
      "Alta: te va a costar hacer correcciones pequeñas.";
    document.getElementById("out-verdict").textContent = verdict;
  };
  dpi.addEventListener("input", calcSens);
  sens.addEventListener("input", calcSens);
  calcSens();
}

// Calculadora de ritmo en el Range
var paceTime = document.getElementById("pace-time");
if (paceTime) {
  var paceBots = document.getElementById("pace-bots");
  var GOAL = 0.8, COACH = 100 / 115, MAX = 1.2;
  var calcPace = function () {
    var bots = parseFloat(paceBots.value);
    var t = parseFloat(paceTime.value) || 0;
    var rate = t ? bots / t : 0;
    document.getElementById("pace-out").textContent = rate ? rate.toFixed(2) : "–";
    document.getElementById("pace-you").style.width = Math.min(100, rate / MAX * 100) + "%";
    document.getElementById("pace-you-num").textContent = rate ? rate.toFixed(2) : "–";
    document.getElementById("pace-goal-time").textContent = Math.round(bots / GOAL) + " s";
    var msg = !rate ? "Pon cuánto te demoraste." :
      rate >= COACH ? "Ritmo de Inmortal. Pásate a difícil." :
      rate >= GOAL ? "Llegaste a la meta. Ahora mantenla sin fallar tanto." :
      "Te faltan " + Math.ceil(t - bots / GOAL) + " s para llegar a la meta.";
    document.getElementById("pace-msg").textContent = msg;
  };
  document.getElementById("pace-goal").style.width = GOAL / MAX * 100 + "%";
  document.getElementById("pace-coach").style.width = COACH / MAX * 100 + "%";
  paceBots.addEventListener("change", calcPace);
  paceTime.addEventListener("input", calcPace);
  calcPace();
}

// Vista previa de la mira
var xhair = document.getElementById("xhair");
if (xhair) {
  document.querySelectorAll("[data-color]").forEach(function (b) {
    b.addEventListener("click", function () {
      xhair.style.color = b.dataset.color;
      document.querySelectorAll("[data-color]").forEach(function (o) { o.setAttribute("aria-pressed", o === b); });
    });
  });
  document.querySelectorAll("[data-preset]").forEach(function (b) {
    b.addEventListener("click", function () {
      xhair.querySelectorAll("g[id]").forEach(function (g) { g.style.display = g.id === b.dataset.preset ? "" : "none"; });
      if (b.dataset.presetColor) xhair.style.color = b.dataset.presetColor;
      document.querySelectorAll("[data-preset]").forEach(function (o) { o.setAttribute("aria-pressed", o === b); });
    });
  });
  document.querySelectorAll("[data-stage]").forEach(function (b) {
    b.addEventListener("click", function () {
      document.querySelector(".xhair-stage").style.setProperty("--stage", b.dataset.stage);
      document.querySelectorAll("[data-preset]").forEach(function (b) {
    b.addEventListener("click", function () {
      xhair.querySelectorAll("g[id]").forEach(function (g) { g.style.display = g.id === b.dataset.preset ? "" : "none"; });
      if (b.dataset.presetColor) xhair.style.color = b.dataset.presetColor;
      document.querySelectorAll("[data-preset]").forEach(function (o) { o.setAttribute("aria-pressed", o === b); });
    });
  });
  document.querySelectorAll("[data-stage]").forEach(function (o) { o.setAttribute("aria-pressed", o === b); });
    });
  });
}

// Copiar código de mira
document.querySelectorAll("[data-copy]").forEach(function (b) {
  b.addEventListener("click", function () {
    var text = document.getElementById(b.dataset.copy).textContent;
    var done = function () { b.textContent = "Copiado"; setTimeout(function () { b.textContent = "Copiar"; }, 1500); };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () {});
  });
});

// Ver capturas en grande (diálogo accesible)
var box = document.querySelector(".lightbox");
if (box) {
  var big = box.querySelector("img");
  var lastTrigger = null;
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Imagen ampliada");
  box.tabIndex = -1;
  var closeBtn = document.createElement("button");
  closeBtn.className = "lightbox-close";
  closeBtn.setAttribute("aria-label", "Cerrar");
  closeBtn.textContent = "×";
  box.appendChild(closeBtn);
  var closeBox = function () { box.hidden = true; if (lastTrigger) lastTrigger.focus(); };
  document.querySelectorAll(".shot button").forEach(function (b) {
    var img = b.querySelector("img");
    if (img && img.alt) b.setAttribute("aria-label", "Ver en grande: " + img.alt);
    b.addEventListener("click", function () {
      lastTrigger = b;
      big.src = img.src;
      big.alt = img.alt;
      box.hidden = false;
      closeBtn.focus();
    });
  });
  box.addEventListener("click", function (e) { if (e.target !== big) closeBox(); });
  document.addEventListener("keydown", function (e) {
    if (box.hidden) return;
    if (e.key === "Escape") closeBox();
    if (e.key === "Tab") { e.preventDefault(); closeBtn.focus(); }
  });
}

// Abrir o cerrar la mira según la situación
var place = document.querySelector("[data-place]");
if (place) {
  var xh = place.querySelector(".xh");
  var foe = place.querySelector(".foe");
  var out = document.getElementById("place-out");
  var modes = document.querySelectorAll(".place-mode");
  var setMode = function (b) {
    xh.style.transform = "translateX(" + b.dataset.x + "px)";
    foe.style.transform = "translateX(" + b.dataset.foe + "px)";
    out.textContent = b.dataset.text;
    modes.forEach(function (o) { o.setAttribute("aria-pressed", o === b); });
  };
  modes.forEach(function (b) { b.addEventListener("click", function () { setMode(b); }); });
  setMode(modes[0]);
}

// ¿Tap, ráfaga o spray?
var picker = document.querySelector("[data-picker]");
if (picker) {
  var state = { dist: "lejos", weapon: "phantom" };
  var SHOT = {
    cerca: ["Spray", "Si no sale el tap, spray rápido al cuerpo y tira la mira hacia abajo."],
    media: ["Ráfaga", "2 o 3 balas, frenas, recolocas la mira y otra ráfaga."],
    lejos: ["Tap", "Un tiro a la vez, a la cabeza, frenando entre tiro y tiro."]
  };
  var GUN = {
    phantom: { cerca: "Aquí la Phantom brilla: su spray es más fácil de controlar.", media: "La Phantom va bien: ráfagas cortas y controladas.", lejos: "Ojo: de lejos la Phantom pierde daño y un tiro a la cabeza ya no mata a alguien con escudo completo. Tapea dos veces o lleva Vandal." },
    vandal: { cerca: "La Vandal también sprayea, pero cuesta más. Si puedes, busca el tap igual.", media: "La Vandal mata de un tiro a la cabeza: prioriza el tap antes que la ráfaga.", lejos: "Para esto es la Vandal: un tiro a la cabeza mata a cualquier distancia." }
  };
  var render = function () {
    document.getElementById("pick-title").textContent = SHOT[state.dist][0];
    document.getElementById("pick-how").textContent = SHOT[state.dist][1];
    document.getElementById("pick-gun").textContent = GUN[state.weapon][state.dist];
    picker.querySelectorAll("[data-set]").forEach(function (b) {
      b.setAttribute("aria-pressed", state[b.dataset.set] === b.dataset.value);
    });
  };
  picker.querySelectorAll("[data-set]").forEach(function (b) {
    b.addEventListener("click", function () { state[b.dataset.set] = b.dataset.value; render(); });
  });
  render();
}

// Tipos de peek: animación vista desde el rival
var peek = document.querySelector("[data-peek]");
if (peek) {
  var stage = peek.querySelector(".peek-stage");
  var peekBtns = peek.querySelectorAll(".place-mode");
  var showPeek = function (b) {
    stage.dataset.mode = b.dataset.mode;
    document.getElementById("peek-out").textContent = b.dataset.text;
    document.getElementById("peek-meta").innerHTML = b.dataset.meta;
    peekBtns.forEach(function (o) { o.setAttribute("aria-pressed", o === b); });
  };
  peekBtns.forEach(function (b) { b.addEventListener("click", function () { showPeek(b); }); });
  showPeek(peekBtns[0]);
}

// Vista desde arriba: peeker's advantage y distancia al ángulo
var angle = document.querySelector("[data-angle]");
if (angle) {
  var aStage = angle.querySelector(".angle-stage");
  var aBtns = angle.querySelectorAll(".place-mode");
  var showAngle = function (b) {
    aStage.dataset.mode = b.dataset.mode;
    document.getElementById("angle-out").textContent = b.dataset.text;
    aBtns.forEach(function (o) { o.setAttribute("aria-pressed", o === b); });
  };
  aBtns.forEach(function (b) { b.addEventListener("click", function () { showAngle(b); }); });
  showAngle(aBtns[0]);
}

// Quiz: ¿la usas o la guardas?
document.querySelectorAll("[data-quiz] .q").forEach(function (q) {
  var btns = q.querySelectorAll("[data-choice]");
  btns.forEach(function (b) {
    b.addEventListener("click", function () {
      var ok = b.dataset.choice === q.dataset.answer;
      q.classList.add("done", ok ? "ok" : "bad");
      btns.forEach(function (o) {
        o.disabled = true;
        if (o.dataset.choice === q.dataset.answer) o.classList.add("right");
      });
      var score = document.getElementById("quiz-score");
      if (score) {
        var all = document.querySelectorAll("[data-quiz] .q");
        var done = document.querySelectorAll("[data-quiz] .q.done").length;
        var good = document.querySelectorAll("[data-quiz] .q.ok").length;
        score.textContent = good + " de " + done + " bien" + (done === all.length ? " · ¡terminaste!" : "");
      }
    });
  });
});

// Arma el call
var callBox = document.querySelector("[data-call]");
if (callBox) {
  var parts = { agent: "Jett", place: "corta", extra: "con Vandal" };
  var renderCall = function () {
    var txt = parts.agent + ", " + parts.place + (parts.extra ? ", " + parts.extra : "") + ".";
    document.getElementById("call-out").textContent = txt;
    callBox.querySelectorAll("[data-part]").forEach(function (b) {
      b.setAttribute("aria-pressed", parts[b.dataset.part] === b.dataset.value);
    });
  };
  callBox.querySelectorAll("[data-part]").forEach(function (b) {
    b.addEventListener("click", function () { parts[b.dataset.part] = b.dataset.value; renderCall(); });
  });
  renderCall();
}

// Calculadora de economía: ¿llego a full buy la próxima?
var eco = document.querySelector("[data-eco]");
if (eco) {
  var FULL = 3900, MAX = 9000;
  var lossPay = function (n) { return n <= 1 ? 1900 : n === 2 ? 2400 : 2900; };
  var ecoCalc = function () {
    var credits = parseInt(document.getElementById("eco-credits").value, 10) || 0;
    var streak = parseInt(document.getElementById("eco-streak").value, 10);
    var buy = parseInt(document.getElementById("eco-buy").value, 10);
    var after = credits - buy;
    var win = Math.min(MAX, after + 3000);
    var lose = Math.min(MAX, after + lossPay(streak + 1));
    var msg;
    if (after < 0) msg = "No te alcanza para esa compra. Pide drop o compra menos.";
    else if (buy >= FULL) msg = lose >= FULL ? "Full buy, y si pierden igual llegas a full la próxima." : "Full buy, pero si pierden no llegas a full la próxima. Coordínalo con el equipo.";
    else if (buy === 0) msg = lose >= FULL ? "Ahorrando, la próxima llegas a full buy aunque pierdan." : "Ni ahorrando llegas a full la próxima. Habla con el equipo: media compra o drop.";
    else msg = lose >= FULL ? "Puedes forzar y, aunque pierdan, llegas a full la próxima." : "Si fuerzas y pierden, la próxima tampoco llegas a full. Fuerza solo si fuerza todo el equipo.";
    document.getElementById("eco-after").textContent = after < 0 ? "–" : after;
    document.getElementById("eco-win").textContent = after < 0 ? "–" : win;
    document.getElementById("eco-lose").textContent = after < 0 ? "–" : lose;
    document.getElementById("eco-lose").style.color = after >= 0 && lose < FULL ? "var(--red)" : "var(--teal)";
    document.getElementById("eco-msg").textContent = msg;
  };
  eco.querySelectorAll("input, select").forEach(function (i) { i.addEventListener("input", ecoCalc); });
  ecoCalc();
}

// Precios del parche actual desde valorant-api.com (si no carga, quedan los de la página)
var priceCells = document.querySelectorAll("[data-price]");
if (priceCells.length && window.fetch) {
  var setPrices = function (items) {
    items.forEach(function (it) {
      var cost = it.shopData && it.shopData.cost;
      if (!cost) return;
      document.querySelectorAll('[data-price="' + it.displayName + '"]').forEach(function (c) { c.textContent = cost; });
    });
  };
  ["https://valorant-api.com/v1/weapons", "https://valorant-api.com/v1/gear"].forEach(function (url) {
    fetch(url).then(function (r) { return r.json(); }).then(function (j) { setPrices(j.data || []); }).catch(function () {});
  });
}

// ¿Dropeo?
var drop = document.querySelector("[data-drop]");
if (drop) {
  var dropCalc = function () {
    var total = parseInt(document.getElementById("drop-total").value, 10) || 0;
    var mine = parseInt(document.getElementById("drop-mine").value, 10) || 0;
    var left = total - mine;
    var out = document.getElementById("drop-out");
    document.getElementById("drop-left").textContent = left < 0 ? "–" : left;
    if (left < 0) { out.textContent = "No te alcanza ni para tu compra: pide drop."; out.style.borderLeftColor = "var(--red)"; }
    else if (total > 7100) { out.textContent = "Tienes más de 7100: tienes que dropear a los que no llegan."; out.style.borderLeftColor = "var(--teal)"; }
    else if (total > 3100 && document.getElementById("drop-rich").checked) { out.textContent = "Eres el que más plata tiene: cómprale al compa que menos tiene."; out.style.borderLeftColor = "var(--teal)"; }
    else if (left < 3100) { out.textContent = "Te sobran menos de 3100: no dropees, quédate con tu plata."; out.style.borderLeftColor = "var(--red)"; }
    else { out.textContent = "Puedes dropear si un compa no llega. La idea es que todos queden parejos."; out.style.borderLeftColor = "var(--gold)"; }
  };
  drop.querySelectorAll("input, select").forEach(function (i) { i.addEventListener("input", dropCalc); i.addEventListener("change", dropCalc); });
  dropCalc();
}

// ¿Sigo jugando?
var stop = document.querySelector("[data-stop]");
if (stop) {
  var stopCalc = function () {
    var on = function (k) { var el = stop.querySelector('[data-k="' + k + '"]'); return el && el.checked; };
    var box = document.getElementById("stop-out");
    var title, text, c;
    if (on("auto") || on("ganas") || on("tilt") || on("derrotas")) {
      title = "Para"; c = "var(--red)";
      text = on("derrotas") ? "Ya llegaste a tu límite de derrotas. Mañana sigues, con la cabeza fresca." : "Así no vas a jugar bien. Cierra el juego, desconéctate y vuelve otro rato.";
    } else if (on("aim")) {
      title = "Primero un DM"; c = "var(--gold)";
      text = "Antes de la siguiente partida, mándate un DM o un TDM. Si después el aim sigue sin salir, para.";
    } else {
      title = "Sigue"; c = "var(--teal)";
      text = "Estás bien para seguir. Recuerda: la cabeza en la partida, una ronda a la vez.";
    }
    box.style.setProperty("--c", c);
    box.innerHTML = "<b>" + title + "</b><p>" + text + "</p>";
  };
  stop.querySelectorAll("input").forEach(function (i) { i.addEventListener("change", stopCalc); });
  stopCalc();
}

// Skeletons: brillo mientras cargan las imágenes
window.skWatch = function (el) {
  el.classList.add("sk");
  var imgs = el.querySelectorAll("img");
  var left = imgs.length;
  var done = function () { el.classList.add("sk-done"); };
  if (!left) return;
  var step = function () { if (--left <= 0) done(); };
  imgs.forEach(function (img) {
    if (img.complete) step();
    else { img.addEventListener("load", step, { once: true }); img.addEventListener("error", step, { once: true }); }
  });
  setTimeout(done, 8000);
};
document.querySelectorAll(".shot button, .weapon .art, .drill-icon").forEach(function (el) {
  if (el.querySelector("img")) window.skWatch(el);
});

// Resultados que cambian: avisar a lectores de pantalla
["out-verdict", "pace-msg", "eco-msg", "drop-out", "stop-out", "pick-title", "call-out", "angle-out", "peek-out", "place-out", "quiz-score"].forEach(function (id) {
  var el = document.getElementById(id);
  if (el) el.setAttribute("aria-live", "polite");
});

// Seguir donde quedaste (menos decisiones en la portada)
var lessonId = document.body.dataset.lesson;
if (lessonId) {
  try {
    localStorage.setItem("ultimo-tema", JSON.stringify({ id: lessonId, title: document.body.dataset.title, file: location.pathname.split("/").pop() }));
  } catch (e) {}
}
var cta = document.getElementById("cta-start");
if (cta) {
  var last = store("ultimo-tema");
  if (last && last.file) {
    cta.textContent = "Seguir: " + last.id + " " + last.title;
    cta.href = "temas/" + last.file;
  }
}

// Lee tu tracker: criterio del profe (KAST + % de rondas ganadas; ACS alto con KAST pobre = solo matar)
var trk = document.querySelector("[data-tracker]");
if (trk) {
  var rate = function (v, cuts) { return v < cuts[0] ? 0 : v < cuts[1] ? 1 : v < cuts[2] ? 2 : 3; };
  var LABEL = ["Bajo", "Normal", "Bien", "Muy bien"];
  var TONE = ["var(--accent-text)", "var(--muted)", "var(--ok)", "var(--ok)"];
  var TIPS = {
    hs: ["Disparas al cuerpo o al piso. Repasa el tema 1.2.", "Vas bien, pero la mira todavía baja. Fíjate en la altura de la cabeza.", "Buena altura de mira.", "Altura de mira de rango alto."],
    kast: ["En muchas rondas mueres sin aportar: entras solo o nadie te tradea.", "Aportas en la mayoría de rondas, pero hay margen.", "Aportas casi todas las rondas.", "Casi siempre haces algo útil."],
    adr: ["Haces poco daño por ronda: quizá te escondes o mueres temprano.", "Daño normal.", "Buen daño por ronda.", "Mucho daño por ronda."],
    kd: ["Mueres bastante más de lo que matas.", "Parejo.", "Matas más de lo que mueres.", "Matas mucho más de lo que mueres."],
    rw: ["Tu equipo pierde más rondas de las que gana: en tracker.gg sale en rojo.", "Parejo, cerca del 50%.", "Ganan más rondas de las que pierden.", "Ganan muchas más rondas de las que pierden."]
  };
  var trkCalc = function () {
    var v = {};
    ["hs", "kast", "adr", "kd", "fb", "fd", "rw", "acs"].forEach(function (k) { v[k] = parseFloat(document.getElementById("trk-" + k).value) || 0; });
    var r = { hs: rate(v.hs, [18, 25, 30]), kast: rate(v.kast, [63, 70, 76]), adr: rate(v.adr, [110, 135, 160]), kd: rate(v.kd, [0.8, 1.1, 1.4]), rw: rate(v.rw, [47, 50, 55]) };
    Object.keys(r).forEach(function (k) {
      var row = document.getElementById("out-" + k);
      row.querySelector("b").textContent = LABEL[r[k]];
      row.querySelector("b").style.color = TONE[r[k]];
      row.querySelector("span").textContent = TIPS[k][r[k]];
    });
    var notes = [];
    if (v.acs >= 230 && v.kast < 63 && v.rw < 50) notes.push("ACS alto, KAST pobre y rondas en rojo: solo vas a matar. Matas mucho, pero esas kills no ganan rondas.");
    else if (v.kd >= 1.1 && v.kast < 65) notes.push("Tu K/D es bueno pero tu KAST bajo: tus kills no están ganando rondas. Revisa si son kills de salida o peleas lejos de tu equipo.");
    if (v.fd > v.fb * 1.5 && v.fd >= 3) notes.push("Mueres primero mucho más de lo que matas primero. Si no eres duelista, no abras tú la ronda: juega con trade.");
    if (v.hs >= 25 && v.adr < 115) notes.push("Buena puntería, pero poco daño: busca más duelos con ventaja, con utilidad y trade.");
    if (v.kast >= 70 && v.rw >= 50) notes.push("Buen KAST con rondas ganadas por encima del 50%: así se ve un buen tracker. Aportas y eso gana rondas.");
    if (!notes.length) notes.push("Nada raro. Sigue fijándote en el KAST junto al % de rondas ganadas: es lo que más dice si aportas a ganar.");
    document.getElementById("trk-notes").innerHTML = notes.map(function (n) { return "<li>" + n + "</li>"; }).join("");
  };
  trk.querySelectorAll("input").forEach(function (i) { i.addEventListener("input", trkCalc); });
  trkCalc();
}

// Progreso del nivel: lee los checklists de cada tema
document.querySelectorAll("[data-level-progress] [data-tema]").forEach(function (card) {
  var saved = store("checklist:" + card.dataset.tema) || [];
  var total = parseInt(card.dataset.total, 10) || 5;
  var done = saved.filter(Boolean).length;
  var fg = card.querySelector(".fg");
  if (fg) {
    var len = 2 * Math.PI * fg.r.baseVal.value;
    fg.style.strokeDasharray = len;
    fg.style.strokeDashoffset = len * (1 - done / total);
  }
  card.querySelector("b").textContent = done + "/" + total;
  if (done >= total) card.classList.add("is-done");
});

// Diagramas con modos (genérico): botones .place-mode con data-mode y data-text
document.querySelectorAll("[data-diagram]").forEach(function (box) {
  var stage = box.querySelector(".diagram-stage");
  var out = box.querySelector("[data-out]");
  var meta = box.querySelector("[data-meta-out]");
  var btns = box.querySelectorAll(".place-mode");
  var show = function (b) {
    stage.dataset.mode = b.dataset.mode;
    if (out) out.textContent = b.dataset.text;
    if (meta) meta.innerHTML = b.dataset.meta || "";
    btns.forEach(function (o) { o.setAttribute("aria-pressed", o === b); });
  };
  if (out) out.setAttribute("aria-live", "polite");
  btns.forEach(function (b) { b.addEventListener("click", function () { show(b); }); });
  if (btns.length) show(btns[0]);
});

// Comparar tracker: día 1 vs un mes después (se guarda en el navegador)
var cmp = document.querySelector("[data-compare]");
if (cmp) {
  var saved = store("tracker-comparar") || {};
  var fields = cmp.querySelectorAll("input");
  fields.forEach(function (f, i) { if (saved[i] !== undefined) f.value = saved[i]; });
  var cmpCalc = function () {
    var data = {};
    fields.forEach(function (f, i) { data[i] = f.value; });
    store("tracker-comparar", data);
    var up = 0, down = 0, done = 0;
    cmp.querySelectorAll(".cmp-row").forEach(function (row) {
      var ins = row.querySelectorAll("input"), out = row.querySelector("b");
      var a = parseFloat(ins[0].value), b = parseFloat(ins[1].value);
      if (isNaN(a) || isNaN(b)) { out.textContent = "—"; out.style.color = "var(--muted)"; return; }
      var d = Math.round((b - a) * 10) / 10;
      done++;
      if (d > 0) up++; else if (d < 0) down++;
      out.textContent = (d > 0 ? "+" : "") + d + (row.dataset.k === "adr" ? "" : " pts");
      out.style.color = d > 0 ? "var(--ok)" : d < 0 ? "var(--accent-text)" : "var(--muted)";
    });
    var kast = cmp.querySelector('[data-k="kast"] b').textContent, hs = cmp.querySelector('[data-k="hs"] b').textContent;
    var note = document.getElementById("cmp-note");
    if (!done) note.textContent = "Llena el día 1 hoy. En un mes vuelves y llenas la otra columna.";
    else if (kast.charAt(0) === "+" && hs.charAt(0) === "+") note.textContent = "Subieron tu KAST y tu HS%: lo que estás aplicando se nota. Ahora fíjate que también tengas menos partidas malas.";
    else if (down) note.textContent = "Algo bajó. Revisa en qué partidas: ¿decisiones, duelos sin ventaja o jugaste sin calentar? Tráelo a la juntada.";
    else note.textContent = "Sin cambios todavía. Sigue con la rutina y vuelve a compararlo.";
  };
  fields.forEach(function (f) { f.addEventListener("input", cmpCalc); });
  cmpCalc();
}
