# Guía Alti — Sistema de diseño

> Editorial moderno con alma de Valorant.

**Tema:** claro, con bandas oscuras.
**Base:** la referencia editorial de Superhuman (lienzo cálido, titulares livianos, bordes finos, cristal sobre imagen), pasada por la identidad de Valorant: el blanco hueso, el azul noche y el rojo de su web, sus imágenes de mapas y agentes, y etiquetas técnicas en mayúsculas.

Todo vive en `assets/style.css`, con tokens en `:root`. Esta guía manda: cualquier página o componente nuevo tiene que salir de aquí.

---

## 1. Principios

1. **Calma editorial, punch gamer.** La mayor parte de la página es tranquila: lienzo hueso, texto noche, mucho aire. El color aparece solo como puntuación: un botón rojo, una etiqueta, un número.
2. **La imagen hace el trabajo emocional.** Los heros llevan splash de mapas, retratos de agentes o capturas del juego, con un degradado noche encima. Encima de la imagen flotan tarjetas de cristal.
3. **Profundidad por capas, no por sombras.** Sin drop shadows. Las tarjetas se separan del lienzo por el contraste blanco/hueso y un borde de 1px.
4. **Titulares que susurran.** Peso 460 y tracking negativo. La fuerza la dan el tamaño y el espacio, no la negrita.
5. **Lo técnico va en Oswald.** Etiquetas, números, índices y cabeceras de tabla: Oswald en mayúsculas con letter-spacing. Es el guiño a Valorant.

---

## 2. Color

### Superficies

| Nombre | Valor | Token | Uso |
|---|---|---|---|
| Bone | `#ece8e1` | `--bg` | Lienzo de todas las páginas (el blanco hueso de Valorant). Nunca blanco puro de fondo. |
| Bone hundido | `#e4dfd6` | `--bg-2` | Cajas internas que van "hacia dentro" (código). |
| Paper | `#ffffff` | `--surface` | Tarjetas, paneles, tablas, inputs: lo que se levanta del lienzo. |
| Paper sutil | `#f5f2ed` | `--surface-2` | Cabeceras de tabla, chips neutros, sección alternada, cajas de resultado. |
| Hairline | `#dcd6cc` | `--line` | Bordes de 1px y divisores. |
| Night | `#0f1923` | `--night` | Banda oscura, footer, escenas de juego (minimapa, diagramas, iconos de ejercicio). |
| Night 2 | `#16222e` | `--night-2` | Tarjetas dentro de una banda oscura. |

### Texto

| Nombre | Valor | Token | Uso |
|---|---|---|---|
| Ink | `#0f1923` | `--text` | Texto principal y titulares. Nunca `#000`. |
| Stone | `#5f6873` | `--muted` | Texto secundario y descripciones. |
| Sobre oscuro | `#ece8e1` / 70% | `--on-dark`, `--on-dark-muted` | Texto en bandas oscuras y footer. |

### Acentos (con moderación)

| Nombre | Valor | Token | Uso |
|---|---|---|---|
| Rojo | `#d12f3f` | `--red` | **Único color de botón lleno.** También para eyebrows, índices, enlaces y palabras destacadas. |
| Rojo Valorant | `#ff4655` | `--red-bright` | Solo sobre fondos oscuros (hero, bandas, logo en el footer). Sobre claro no cumple contraste. |
| Teal | `#0b7c6c` | `--teal` | Estado OK: "Disponible", checklist, meta cumplida, avisos positivos. |
| Teal claro | `#3fe0c5` | `--teal-bright` | Teal sobre fondos oscuros (diagramas, minimapa). |
| Mint | `#d3f1ea` | `--mint` | Superficie de selección: tab activa. |
| Oro | `#9a6a08` | `--gold` | Avisos de "ojo" y la categoría Ataque. |
| Violeta | `#714cb6` | `--violet` | Solo la categoría Mecánica en mapas. |

Los rojos, teals y oros suaves de fondo (`--red-dim`, `--teal-dim`) se usan en chips y en estados seleccionados.

---

## 3. Tipografía

| Rol | Fuente | Peso | Tamaño | Interlineado | Tracking |
|---|---|---|---|---|---|
| Display (h1) | Inter | 460 | 40–64px (`clamp`) | 0.98 | −0.028em |
| Título de sección (h2) | Inter | 460 | 30–48px | 1.02 | −0.024em |
| Título de bloque en temas | Inter | 460 | 28–40px | 1.02 | −0.024em |
| Subtítulo (h3) | Inter | 620 | 19px | 1.3 | −0.008em |
| Etiqueta (h4) | Inter | 620 | 16px | 1.35 | 0 |
| Cuerpo | Inter | 460 | 16px | 1.6 | 0 |
| Lead | Inter | 460 | 17–20px | 1.5 | 0 |
| Cita grande | Inter | 460 | 24–56px | 1–1.18 | −0.02/−0.03em |
| Eyebrow / labels técnicos | Oswald | 500 | 12–13px, MAYÚSCULAS | 1 | 0.14–0.16em |
| Números (stats, resultados, índices) | Oswald | 500 | 22–44px | 1 | 0 |

- Carga: `Inter:wght@400..700` (variable, permite 460, 560, 620) y `Oswald:wght@500;600` desde Google Fonts.
- Los titulares van en mayúsculas y minúsculas (nada de `text-transform: uppercase` en h1–h3).
- Negritas del cuerpo a 640, no a 700+.

---

## 4. Forma y espacio

- **Base:** 4px. **Densidad:** cómoda.
- **Ancho máximo:** 1200px (`--maxw`), con un margen lateral de 16px.
- **Separación entre secciones:** 96px (`.section`). Entre bloques dentro de un tema: 56–64px.
- **Padding de tarjetas:** 20–24px. Separación entre elementos: 8–16px.

| Elemento | Radio |
|---|---|
| Tarjetas, paneles, tablas, imágenes, botones grandes | 16px (`--radius`) |
| Inputs, opciones de diagrama, cajas internas | 10px (`--radius-sm`) |
| Tabs, swatches, letras de site | 8px (`--radius-xs`) |
| Chips, presets, nav, pasos, índices | 999px |

- **Sombras:** ninguna. Para marcar un borde o un estado se usa `box-shadow: inset 0 0 0 1px` o un borde de 1px.
- **Cortes en diagonal:** ya no se usan en paneles ni botones. La forma angular de Valorant queda solo en el logo.

---

## 5. Componentes

**Header.** Sticky, 64px de alto, fondo hueso al 78% con `backdrop-filter: blur(12px)` y borde de 1px. Logo a la izquierda (Oswald). Links en Inter 500, 15px, en pastilla: el activo va en blanco con borde.

**Hero (banda con imagen).** Ancho completo. Splash o captura de fondo, con un degradado noche de izquierda (94%) a derecha (35%) y otro de abajo hacia arriba. Texto blanco. Eyebrow en `--red-bright`. Chips y botón secundario en cristal (blanco al 12% con blur). Opcional: retrato de agente a la derecha (`.hero-art`) con máscara.

**Tarjetas de cristal (`.glass`).** Firma del sistema. Blanco al 86% con `blur(14px)`, radio 16px, sin sombra, flotando sobre la imagen del hero. Contienen una etiqueta técnica en rojo (`.k`), un título y una línea gris. Se ocultan por debajo de 1000px.

**Botón principal (`.btn-primary`).** Fondo `--red`, texto blanco, Inter 560, 16px, radio 16px, 48px de alto, flecha "→" al final. Es el único botón con color de relleno.

**Botón secundario (`.btn-ghost`).** Blanco con borde de 1px. Sobre imagen pasa a cristal.

**Chips.** Pastilla de 12px. Neutro (paper sutil + borde), `.red`, `.teal` (Disponible) y `.gold` (Borrador / aviso).

**Panel (`.panel`).** Blanco, borde de 1px, radio 16px, padding 24px. Dentro de una banda oscura se vuelve Night 2.

**Banda oscura (`.band`).** Sección a ancho completo en Night, con texto hueso. Se usa como mucho una o dos veces por página (en la portada: mapas; en mapas: "Así se juega en elo bajo"). Rompe el ritmo claro.

**Tabs.** Contenedor blanco redondeado (12px, padding 4px). Tab activa con relleno Mint.

**Tarjeta de tema (`.lesson`).** Blanca, radio 16px, número en Oswald. Disponible: número rojo y hover con borde rojo. Próximamente: transparente al 55%.

**Escenas de juego.** Minimapa, diagramas SVG (pared/enemigo, vista desde arriba), iconos de ejercicio y fondos de arma van siempre sobre Night, como si fueran la pantalla del juego. Ahí se usan `--red-bright` y `--teal-bright`.

**Marcadores del minimapa.** Círculo de 28px con número blanco y color por categoría: Clave `--red`, Ataque `#b07a0c`, Defensa `--teal`, Mecánica `--violet`.

**Tablas.** Dentro de un contenedor blanco con radio 16px. Cabeceras en Oswald mayúsculas sobre paper sutil. Valores "No" en rojo y "Sí" en teal.

**Avisos (`.note`).** Fondo tenue y borde del mismo tono, radio 16px. Oro para "ojo", teal (`.note.teal`) para tips.

**Footer.** Night a ancho completo, padding de 64px, texto hueso al 70% y logo con el "ALTI" en `--red-bright`.

---

## 6. Imágenes

- Fuentes: splash, minimapas, retratos de agentes, iconos de habilidades y de armas de valorant-api.com (se cargan en el navegador), más capturas del juego del profe en `assets/img/`.
- Siempre con plan B: si una imagen no carga, se quita (`onerror`) y queda el degradado noche, o un SVG propio en el caso de las armas.
- Capturas en `.webp`, a 1280px de ancho como máximo y calidad ~80.
- Nada de ilustraciones de stock ni 3D.

---

## 7. Sí y no

**Sí**
- Lienzo hueso, tarjetas blancas, texto noche.
- Titulares a 460 con tracking negativo.
- Un solo botón rojo por bloque.
- Imágenes del juego con degradado noche y cristal encima.
- Etiquetas y números en Oswald mayúsculas.
- Revisar escritorio y móvil (390px) sin scroll horizontal.

**No**
- No usar fondo blanco puro en la página ni negro puro en el texto.
- No poner titulares en negrita (700+) ni en mayúsculas.
- No usar sombras de elevación.
- No inventar nuevos colores de botón: el relleno es solo rojo.
- No usar `--red-bright` para texto sobre fondo claro (no cumple contraste).
- No llenar la página de bandas oscuras: una o dos por página.
- No centrar párrafos largos.

---

## 8. Tokens (resumen)

```css
:root {
  --bg: #ece8e1;  --bg-2: #e4dfd6;  --surface: #ffffff;  --surface-2: #f5f2ed;
  --line: #dcd6cc;  --night: #0f1923;  --night-2: #16222e;
  --text: #0f1923;  --muted: #5f6873;  --on-dark: #ece8e1;
  --red: #d12f3f;  --red-bright: #ff4655;  --teal: #0b7c6c;  --teal-bright: #3fe0c5;
  --mint: #d3f1ea;  --gold: #9a6a08;  --violet: #714cb6;
  --radius: 16px;  --radius-sm: 10px;  --radius-xs: 8px;
  --maxw: 1200px;  --header: 64px;
  --font: "Inter", system-ui, sans-serif;
  --font-tech: "Oswald", "Inter", sans-serif;
}
```
