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
    var verdict = edpi < 200 ? "Baja: giros lentos, mucha precisión." :
      edpi <= 400 ? "Dentro del rango habitual en competitivo." :
      "Alta: cuesta controlar los ajustes pequeños.";
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
    var msg = !rate ? "Escribe cuánto tardaste." :
      rate >= COACH ? "Ritmo de Inmortal. Sube la dificultad de los bots." :
      rate >= GOAL ? "Objetivo cumplido. Ahora mantenlo con buena precisión." :
      "Te faltan " + Math.ceil(t - bots / GOAL) + " s para llegar al objetivo.";
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
  document.querySelectorAll("[data-stage]").forEach(function (b) {
    b.addEventListener("click", function () {
      document.querySelector(".xhair-stage").style.setProperty("--stage", b.dataset.stage);
      document.querySelectorAll("[data-stage]").forEach(function (o) { o.setAttribute("aria-pressed", o === b); });
    });
  });
}
