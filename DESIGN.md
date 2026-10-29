# Guía Alti — Sistema de diseño

> Oscuro, moderno y con el azul noche y el rojo de Valorant como protagonistas.

**Tema:** oscuro. **Colores principales:** azul noche `#0f1923` y rojo Valorant `#ff4655`.
**Influencias:** la estructura editorial moderna (titulares livianos, mucho aire, bordes finos, tarjetas de cristal sobre imágenes, nada de sombras) aplicada a la identidad de Valorant: sus imágenes de mapas y agentes, el hueso `#ece8e1` como texto, y etiquetas técnicas en mayúsculas.

Todo vive en `assets/style.css`. Esta guía manda: cualquier página o componente nuevo sale de aquí.

---

## 1. Principios

1. **Azul y rojo mandan.** El azul noche es el lienzo; el rojo es la marca y la acción. El resto de colores son de estado y se usan poco.
2. **La imagen hace el trabajo emocional.** Los heros llevan splash de mapas, retratos de agentes o capturas del juego, con un degradado noche encima. Encima de la imagen flotan tarjetas de cristal oscuro.
3. **Profundidad por capas, no por sombras.** Las tarjetas se separan del lienzo por un tono más claro y un borde de 1px.
4. **Titulares que susurran, etiquetas que suenan a juego.** Los titulares van en Inter 460. Las etiquetas, números e índices van en Oswald mayúsculas.
5. **Pocas decisiones por pantalla (ley de Hick).** Una acción principal por bloque, opciones agrupadas y lo secundario escondido hasta que hace falta.
6. **Accesible por defecto.** Contraste AA, foco visible, teclado completo y movimiento reducido.

---

## 2. Tokens de color

Hay tres capas. Los componentes **solo** usan la capa semántica, nunca los primitivos.

### 2.1 Primitivos (la paleta)

| Token | Valor | Nota |
|---|---|---|
| `--navy-950` | `#0a1118` | El más oscuro: bandas, footer, escenas de juego |
| `--navy-900` | `#0f1923` | **Azul noche Valorant**: lienzo |
| `--navy-850` | `#132030` | Sección alternada, cristal |
| `--navy-800` | `#16222e` | Tarjetas |
| `--navy-700` | `#1d2b39` | Relleno sutil |
| `--navy-600` | `#2a3a4a` | Bordes |
| `--navy-500` | `#3a4c5e` | Bordes fuertes |
| `--bone-50` | `#ece8e1` | **Hueso Valorant**: texto |
| `--slate-400` | `#95a3b0` | Texto secundario |
| `--red-400` | `#ff6b78` | Rojo para texto chico sobre tarjetas |
| `--red-500` | `#ff4655` | **Rojo Valorant**: marca |
| `--red-600` | `#d92f3e` | Relleno del botón principal |
| `--red-700` | `#b9283a` | Hover del botón |
| `--teal-400` | `#3fe0c5` | Aliado, OK, foco |
| `--gold-400` | `#f0b232` | Ojo, ataque |
| `--violet-400` | `#b18cff` | Mecánica de mapa |

### 2.2 Semánticos (lo que usan los componentes)

| Token | Apunta a | Uso |
|---|---|---|
| `--bg` | navy-900 | Lienzo de la página |
| `--bg-2` | navy-950 | Hundido: inputs, código |
| `--surface` | navy-800 | Tarjetas, paneles, tablas |
| `--surface-2` | navy-700 | Relleno sutil, cabeceras de tabla, skeletons |
| `--line` / `--line-strong` | navy-600 / 500 | Bordes de 1px |
| `--text` | bone-50 | Texto principal |
| `--muted` | slate-400 | Texto secundario |
| `--accent` | red-500 | Marca: eyebrows, índices, palabras destacadas, enlaces |
| `--accent-text` | red-400 | Texto rojo chico dentro de tarjetas y chips |
| `--accent-fill` / `-hover` | red-600 / 700 | **Único botón con relleno** |
| `--ok` | teal-400 | Disponible, checklist, meta cumplida, tips |
| `--warn` | gold-400 | Avisos de "ojo", categoría Ataque |
| `--mech` | violet-400 | Categoría Mecánica |
| `--focus` | teal-400 | Anillo de foco |

### 2.3 Alias (compatibilidad)

`--red`, `--red-bright`, `--teal`, `--gold`, `--violet`, `--night`, `--night-2`, `--on-dark` siguen existiendo y apuntan a los semánticos de arriba. Para código nuevo, usar los semánticos.

### 2.4 Contraste comprobado (WCAG AA)

| Par | Ratio |
|---|---|
| texto / lienzo | 14.5 |
| secundario / tarjeta | 6.3 |
| rojo marca / lienzo | 5.3 |
| rojo marca / tarjeta | 4.8 |
| rojo texto / relleno sutil | 5.2 |
| blanco / botón rojo | 4.7 |
| teal / tarjeta | 9.7 |
| número oscuro / marcador rojo | 5.3 |

Regla: el rojo `--red-500` no se usa para texto chico sobre `--surface-2`; ahí va `--accent-text`.

---

## 3. Tipografía

| Rol | Fuente | Peso | Tamaño | Interlineado | Tracking |
|---|---|---|---|---|---|
| Display (h1) | Inter | 460 | 40–64px | 0.98 | −0.028em |
| Sección (h2) | Inter | 460 | 30–48px | 1.02 | −0.024em |
| Bloque de tema (h2) | Inter | 460 | 28–40px | 1.02 | −0.024em |
| h3 | Inter | 620 | 19px | 1.3 | −0.008em |
| h4 | Inter | 620 | 16px | 1.35 | 0 |
| Cuerpo | Inter | 460 | 16px | 1.6 | 0 |
| Lead | Inter | 460 | 17–20px | 1.5 | 0 |
| Eyebrow / labels | Oswald | 500 | 12–13px MAYÚS | 1 | 0.14–0.16em |
| Números | Oswald | 500 | 22–44px | 1 | 0 |

Las fuentes van alojadas en `assets/fonts/` (subset latino de Google Fonts): Inter variable 400–700 y Oswald variable 500–600. No se cargan desde Google: si un navegador bloquea Google Fonts, la página cae a una fuente del sistema y pierde la identidad. Los titulares van en mayúsculas y minúsculas.

---

## 4. Espacio y forma

- **Escala** (`--space-*`): 4, 8, 12, 16, 24, 32, 48, 64, 96.
- **Ancho máximo:** 1200px, con un margen lateral de 16px.
- **Separación entre secciones:** 96px. Entre bloques de un tema: 56–64px.
- **Radios:** 16px en tarjetas, botones e imágenes; 10px en inputs y opciones; 8px en tabs y swatches; 999px en chips, presets, nav e índices.
- **Sombras:** ninguna. Los estados se marcan con un borde o con `inset 0 0 0 1px`.

---

## 5. Jerarquía visual y ley de Hick

- **Una acción principal por pantalla:** el botón rojo. Todo lo demás es secundario (botón con borde, cristal o enlace).
- **Portada:** hero con una acción principal y una secundaria. El botón principal recuerda dónde quedaste ("Seguir: 1.4 Peeks y ángulos"), así no tienes que elegir. Las tarjetas de cristal son 2, una informativa y un solo enlace.
- **Agrupar en vez de listar:** los temas van en tabs por nivel (8 por vista, no 24); los mapas, en un grid de 7 y después su ficha.
- **Revelar de a poco:** pestañas en los ajustes, acordeones en las zonas y sites de mapas, la ficha rápida plegada en móvil y la respuesta del quiz solo al elegir.
- **Orden de lectura en cada tema:** Lo primero (meta), contenido, práctica, errores, juntada, para esta semana, checklist. La ficha lateral resume lo esencial.
- **Escala clara:** h1 > h2 > h3 por tamaño, peso y color. El texto secundario siempre en `--muted`.

---

## 6. Componentes

- **Header.** Sticky de 64px, azul noche al 82% con desenfoque de 12px y borde de 1px. Links en pastilla; el activo va con fondo de tarjeta.
- **Hero.** Imagen a ancho completo con degradado noche (94% a la izquierda, 35% a la derecha). Texto hueso, eyebrow en rojo, chips y botón secundario en cristal.
- **Tarjetas de cristal (`.glass`).** Azul noche al 72% con desenfoque de 14px, borde blanco al 12% y radio de 16px. Se ocultan por debajo de 1000px.
- **Botón principal.** Relleno `--accent-fill`, texto blanco, Inter 560, 16px, radio 16px, 48px de alto y flecha "→" al final.
- **Botón secundario.** Tarjeta con borde; sobre imagen pasa a cristal.
- **Chips.** Neutro, `.red`, `.teal` (Disponible) y `.gold` (Borrador).
- **Panel.** `--surface`, borde de 1px, radio 16px y padding de 24px.
- **Banda (`.band`).** El azul más oscuro, con un brillo rojo radial arriba a la derecha. Una o dos por página.
- **Tabs.** Contenedor de tarjeta; la tab activa va con fondo teal tenue. Se manejan con flechas.
- **Escenas de juego** (minimapa, diagramas, iconos de ejercicio y fondos de arma). Siempre sobre `--night`.
- **Marcadores del minimapa.** Círculo con número oscuro y color por categoría: rojo para clave, oro para ataque, teal para defensa y violeta para mecánica.
- **Tablas.** Contenedor de tarjeta con cabeceras en Oswald mayúsculas.
- **Avisos.** Oro para "ojo" y teal para tips, ambos con fondo tenue.
- **Footer.** `--night` con borde superior.

---

## 7. Skeletons

Mientras cargan imágenes o datos, se muestra un bloque en `--surface-2` con un brillo que pasa de izquierda a derecha. Cuando todo carga, aparece la imagen con un fundido.

- **Clase:** `.sk` en el contenedor y `.sk-done` cuando terminó. `window.skWatch(el)` marca el final cuando cargan (o fallan) todas sus imágenes, con un tope de 8 segundos.
- **Dónde se usan:**
  - tarjetas de mapas (portada y página de mapas), mientras llega la API;
  - minimapa, con el texto "Cargando minimapa…" (con `role="status"`);
  - fondos de armas, iconos de habilidades y capturas.
- **Si falla:** el skeleton se apaga y queda el degradado o el mensaje de error. Nunca queda brillando para siempre.
- **Movimiento reducido:** con `prefers-reduced-motion` el brillo se queda quieto.

---

## 7b. Efectos (portados de React Bits, sin React ni gsap)

Solo efectos que enseñan algo o ayudan a ubicarse. Todos respetan "reducir movimiento" y pasan axe.

- **Transición entre páginas:** `@view-transition` nativo; el header no se mueve. Donde no hay soporte, la página carga normal.
- **Brillo al pasar el mouse:** solo en `.lesson` y `.tema-card`, solo con mouse.
- **Términos del glosario:** el primer uso de cada término en un tema es un link punteado que abre su definición (`assets/glossary-data.js`, generado junto con `glosario.html`).
- **Flashcards:** modo "Practicar" del glosario.
- **Defuse (2.6):** botón que se mantiene apretado, con la mitad guardada.
- **Números que cuentan:** anillos de nivel y créditos del 3.5; la compra entra girando.
- **Acordeón con imágenes (3.1, comp base)** y **carrusel con profundidad (3.1, por mapa)**. El carrusel siempre deja la tabla completa en "Ver todo en una tabla".
- **Pase que se arranca (tear ticket):** en `nivel-1/2/3.html`, se libera con el checklist final completo.
- No van: texto que se descifra, fondos 3D, cursores custom, scroll secuestrado, bordes eléctricos.

## 8. Accesibilidad (WCAG 2.2 AA)

- **Contraste:** todos los pares de color pasan AA (tabla 2.4). Auditado con axe-core en todas las páginas, sin violaciones.
- **Teclado:**
  - enlace "Saltar al contenido" al principio de cada página;
  - foco visible con un anillo teal de 2px (`:focus-visible`);
  - tabs con flechas, Inicio y Fin;
  - lightbox como diálogo: Esc cierra, el foco va al botón de cerrar y vuelve después a la imagen.
- **Estructura:**
  - `<main id="contenido">` en todas las páginas;
  - nav con `aria-label`;
  - botón de menú con `aria-expanded` y `aria-controls`;
  - tabs con `role`, `aria-selected` y `aria-labelledby`.
- **Lectores de pantalla:**
  - los resultados de calculadoras, quiz y diagramas se anuncian con `aria-live="polite"`;
  - los marcadores del minimapa tienen `aria-label`;
  - los SVG decorativos llevan `aria-hidden`;
  - las imágenes decorativas tienen `alt=""`.
- **No solo color:** los estados llevan texto ("Disponible", "No", "Sí"), y los marcadores llevan número y leyenda.
- **Movimiento:** con `prefers-reduced-motion` no hay animaciones de entrada, brillo ni loops.
- **Táctil:** los objetivos interactivos miden al menos 24px (swatches 34px, botones 44–48px).

---

## 9. Imágenes

- **Fuentes:** splash, minimapas, retratos, habilidades y armas de valorant-api.com (se cargan en el navegador), y las capturas del profe en `assets/img/` (`.webp`, máximo 1280px, calidad ~80).
- **Siempre con plan B:** skeleton mientras carga; si falla, degradado, SVG propio (armas) o letra (habilidades).

---

## 10. Sí y no

**Sí**
- Azul noche de lienzo, tarjetas un tono más claro, texto hueso.
- Rojo para la marca y para un solo botón por bloque.
- Imágenes del juego con degradado y cristal encima.
- Skeleton en todo lo que carga desde afuera.
- Revisar escritorio y móvil (390px) y pasar axe antes de publicar.

**No**
- No usar tema claro ni fondos blancos.
- No usar sombras de elevación.
- No usar otro color de botón lleno.
- No usar rojo chico sobre `--surface-2` (usar `--accent-text`).
- No poner titulares en negrita ni en mayúsculas.
- No mostrar más de una acción principal por bloque.
- No hacer animaciones que ignoren el movimiento reducido.
