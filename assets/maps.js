// Mapas: imágenes y posiciones de callouts desde valorant-api.com (se carga en el navegador de quien abre la página).
var VAPI_URL = window.VAPI_URL || "https://valorant-api.com/v1/maps";
var VAPI_CACHE = "vapi-maps-v1";
var API = null;
var API_STATE = "loading"; // loading | ok | fail
var TYPE_LABEL = { key: "Clave", atk: "Ataque", def: "Defensa", mech: "Mecánica" };

function loadApiMaps() {
  try {
    var cached = JSON.parse(localStorage.getItem(VAPI_CACHE));
    if (cached && Date.now() - cached.t < 7 * 864e5) return Promise.resolve(cached.data);
  } catch (e) {}
  return fetch(VAPI_URL)
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (json) {
      var data = json.data || [];
      try { localStorage.setItem(VAPI_CACHE, JSON.stringify({ t: Date.now(), data: data })); } catch (e) {}
      return data;
    });
}

function apiMapFor(apiMaps, name) {
  if (!apiMaps) return null;
  var n = name.toLowerCase();
  return apiMaps.find(function (m) { return (m.displayName || "").toLowerCase() === n && m.displayIcon; }) || null;
}

// Posición normalizada (0–1) de un callout sobre el displayIcon del mapa
function calloutPos(apiMap, names) {
  if (!apiMap || !apiMap.callouts || !apiMap.xMultiplier) return null;
  for (var i = 0; i < names.length; i++) {
    var want = names[i].toLowerCase();
    var hits = apiMap.callouts.filter(function (c) {
      return ((c.superRegionName || "") + " " + (c.regionName || "")).toLowerCase() === want;
    });
    if (hits.length) {
      var x = 0, y = 0;
      hits.forEach(function (c) {
        x += c.location.y * apiMap.xMultiplier + apiMap.xScalarToAdd;
        y += c.location.x * apiMap.yMultiplier + apiMap.yScalarToAdd;
      });
      x /= hits.length; y /= hits.length;
      if (x >= 0 && x <= 1 && y >= 0 && y <= 1) return { x: x, y: y };
    }
  }
  return null;
}

function el(tag, attrs, html) {
  var e = document.createElement(tag);
  for (var k in attrs || {}) e.setAttribute(k, attrs[k]);
  if (html != null) e.innerHTML = html;
  return e;
}

// Portada: imágenes de las tarjetas de mapas
function fillMapCards() {
  document.querySelectorAll("[data-map-card]").forEach(function (card) {
    if (card.querySelector("img")) return;
    var m = apiMapFor(API, card.dataset.mapCard);
    if (!m) { card.classList.add("sk-done"); return; }
    var img = el("img", { src: m.listViewIconTall || m.listViewIcon || m.splash, alt: "", loading: "lazy" });
    img.onerror = function () { img.remove(); };
    card.prepend(img);
    if (window.skWatch) window.skWatch(card); else card.classList.add("sk-done");
  });
}

// Página de mapas
function initMapsPage() {
  var select = document.getElementById("map-select");
  var detail = document.getElementById("map-detail");
  var MAPS = window.MAPS;

  // Selección
  var grid = document.getElementById("map-grid");
  grid.innerHTML = "";
  MAPS.forEach(function (m) {
    var a = el("a", { class: "map map-pick", href: "#" + m.id, "data-map-card": m.name });
    a.innerHTML = '<div class="info"><h4>' + m.name + '</h4><span>' + m.siteCount + ' sites' + (m.badge ? ' · ' + m.badge : '') + '</span></div>';
    grid.appendChild(a);
  });

  // Barra de mapas
  var bar = document.getElementById("map-bar");
  bar.innerHTML = "";
  MAPS.forEach(function (m) { bar.appendChild(el("a", { class: "map-chip", href: "#" + m.id, "data-id": m.id }, m.name)); });

  function renderDetail(m) {
    var idx = MAPS.indexOf(m);
    var prev = MAPS[(idx - 1 + MAPS.length) % MAPS.length];
    var next = MAPS[(idx + 1) % MAPS.length];
    var api = apiMapFor(API, m.name);

    bar.querySelectorAll(".map-chip").forEach(function (c) { c.classList.toggle("on", c.dataset.id === m.id); });
    document.title = m.name + " · Mapas";

    var hero = document.getElementById("map-hero");
    hero.style.setProperty("--hero-img", api && api.splash ? "url('" + api.splash + "')" : "none");
    document.getElementById("map-name").textContent = m.name;
    document.getElementById("map-line").textContent = m.line;
    document.getElementById("map-chips").innerHTML =
      '<span class="chip red">' + m.siteCount + ' sites</span>' + (m.badge ? '<span class="chip gold">' + m.badge + '</span>' : '');

    // Minimapa con marcadores
    var stage = document.getElementById("map-stage");
    stage.innerHTML = "";
    stage.classList.remove("sk-done");
    stage.classList.add("sk");
    if (api) {
      var img = el("img", { src: api.displayIcon, alt: "Minimapa de " + m.name });
      img.onerror = function () { stage.innerHTML = '<p class="stage-msg">No cargó el minimapa. Las zonas están igual en la lista.</p>'; };
      stage.appendChild(img);
      if (window.skWatch) window.skWatch(stage);
      [["Attacker Side Spawn", "ATK", "spawn-atk"], ["Defender Side Spawn", "DEF", "spawn-def"]].forEach(function (s) {
        var p = calloutPos(api, [s[0]]);
        if (p) stage.appendChild(el("span", { class: "spawn " + s[2], style: "left:" + p.x * 100 + "%;top:" + p.y * 100 + "%" }, s[1]));
      });
    } else if (API_STATE === "loading") {
      stage.innerHTML = '<span class="sk-label" role="status">Cargando minimapa…</span>';
    } else {
      stage.classList.add("sk-done");
      stage.innerHTML = '<p class="stage-msg">No pude cargar el minimapa (revisa tu conexión). Las zonas están igual en la lista.</p>';
    }

    var list = document.getElementById("map-zones");
    list.innerHTML = "";
    m.zones.forEach(function (z, i) {
      var n = i + 1;
      var pos = calloutPos(api, z.callouts);
      var item = el("details", { class: "zone t-" + z.type, "data-zone": n });
      item.innerHTML = '<summary><span class="dot">' + n + '</span><span class="zt">' + z.title + '</span><span class="chip">' + TYPE_LABEL[z.type] + '</span></summary><p>' + z.why + (pos || !api ? '' : ' <span class="muted">(sin marcador en el minimapa)</span>') + '</p>';
      list.appendChild(item);
      if (pos) {
        var mk = el("button", { type: "button", class: "marker t-" + z.type, "data-zone": n, "aria-label": n + ". " + z.title, style: "left:" + pos.x * 100 + "%;top:" + pos.y * 100 + "%" }, "<b>" + n + "</b><span>" + z.title + "</span>");
        mk.addEventListener("click", function () {
          item.open = true;
          highlight(n);
          if (window.innerWidth < 1000) item.scrollIntoView({ behavior: "smooth", block: "center" });
        });
        stage.appendChild(mk);
      }
      item.addEventListener("toggle", function () { if (item.open) highlight(n); });
    });

    document.getElementById("map-special").innerHTML = m.special.map(function (s) { return "<li>" + s + "</li>"; }).join("");

    var sites = document.getElementById("map-sites");
    sites.innerHTML = "";
    m.sites.forEach(function (s, i) {
      var d = el("details", { class: "site-acc" });
      if (i === 0) d.open = true;
      d.innerHTML = '<summary><span class="site-letter">' + s.name + '</span>Site ' + s.name + '</summary>' +
        '<div class="site-body"><h4>Info que no puedes perder</h4><ul>' + s.info.map(function (x) { return "<li>" + x + "</li>"; }).join("") + '</ul>' +
        '<h4>Retake</h4><p>' + s.retake + '</p></div>';
      sites.appendChild(d);
    });

    document.getElementById("map-low").textContent = m.low;

    var pn = document.getElementById("map-pager");
    pn.innerHTML = '<a href="#' + prev.id + '"><small>Anterior</small>' + prev.name + '</a><a class="next" href="#' + next.id + '"><small>Siguiente</small>' + next.name + '</a>';
  }

  function highlight(n) {
    document.querySelectorAll("#map-stage .marker").forEach(function (mk) { mk.classList.toggle("active", +mk.dataset.zone === n); });
  }

  function route(keepScroll) {
    var id = location.hash.slice(1);
    var m = MAPS.find(function (x) { return x.id === id; });
    select.hidden = !!m;
    detail.hidden = !m;
    if (m) {
      detail.classList.remove("swap");
      void detail.offsetWidth;
      detail.classList.add("swap");
      renderDetail(m);
      if (!keepScroll) window.scrollTo(0, 0);
    } else {
      document.title = "Mapas · Guía Alti";
    }
  }

  window.addEventListener("hashchange", function () { route(false); });
  document.addEventListener("keydown", function (e) {
    if (detail.hidden || /INPUT|SELECT|TEXTAREA/.test(e.target.tagName)) return;
    var idx = MAPS.findIndex(function (x) { return "#" + x.id === location.hash; });
    if (e.key === "ArrowRight") location.hash = MAPS[(idx + 1) % MAPS.length].id;
    if (e.key === "ArrowLeft") location.hash = MAPS[(idx - 1 + MAPS.length) % MAPS.length].id;
  });
  route();
  return { route: route };
}

var mapsPage = document.getElementById("map-select") ? initMapsPage() : null;
document.querySelectorAll("[data-map-card]").forEach(function (c) { c.classList.add("sk"); });
loadApiMaps().then(function (data) {
  API = data;
  API_STATE = "ok";
  fillMapCards();
  if (mapsPage && location.hash) mapsPage.route(true);
}, function () {
  API_STATE = "fail";
  document.querySelectorAll("[data-map-card]").forEach(function (c) { c.classList.add("sk-done"); });
  if (mapsPage && location.hash) mapsPage.route(true);
});
