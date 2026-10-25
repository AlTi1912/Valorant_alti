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

// Pestañas
document.querySelectorAll("[data-tabs]").forEach(function (group) {
  var tabs = group.querySelectorAll(".tab");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on);
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
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

// Ver capturas en grande
var box = document.querySelector(".lightbox");
if (box) {
  var big = box.querySelector("img");
  document.querySelectorAll(".shot button").forEach(function (b) {
    b.addEventListener("click", function () {
      var img = b.querySelector("img");
      big.src = img.src;
      big.alt = img.alt;
      box.hidden = false;
    });
  });
  box.addEventListener("click", function () { box.hidden = true; });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") box.hidden = true; });
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
    else if (left < 3100) { out.textContent = "Te sobran menos de 3100: no dropees, quédate con tu plata."; out.style.borderLeftColor = "var(--red)"; }
    else { out.textContent = "Puedes dropear si un compa no llega. La idea es que todos queden parejos."; out.style.borderLeftColor = "var(--gold)"; }
  };
  drop.querySelectorAll("input, select").forEach(function (i) { i.addEventListener("input", dropCalc); });
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
