// Guarda el estado de los checklists en el navegador de cada alumno.
document.querySelectorAll("[data-checklist]").forEach(function (list) {
  var key = "checklist:" + list.dataset.checklist;
  var boxes = list.querySelectorAll("input[type=checkbox]");
  var progress = document.querySelector('[data-progress="' + list.dataset.checklist + '"]');
  var saved = [];

  try { saved = JSON.parse(localStorage.getItem(key)) || []; } catch (e) {}

  function update() {
    var done = 0;
    var state = [];
    boxes.forEach(function (b, i) { state[i] = b.checked; if (b.checked) done++; });
    if (progress) progress.textContent = done + " de " + boxes.length + " completados";
    try { localStorage.setItem(key, JSON.stringify(state)); } catch (e) {}
  }

  boxes.forEach(function (b, i) {
    b.checked = !!saved[i];
    b.addEventListener("change", update);
  });
  update();
});
