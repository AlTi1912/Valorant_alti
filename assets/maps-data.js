// Contenido de cada mapa de la pool (V26 Act 6, parche 13.08).
// Cada zona se ubica en el minimapa buscando su callout en la API (callouts: nombres que se prueban en orden).
// type: key = clave, atk = ataque, def = defensa, mech = mecánica del mapa
window.MAP_POOL_NOTE = "Pool del Act 6 (parche 13.08, octubre 2026)";

window.MAPS = [
  {
    id: "summit",
    name: "Summit",
    siteCount: 2,
    badge: "Nuevo",
    line: "Mapa nuevo de 2 sites y 3 líneas. Lo que lo cambia todo son las 3 paredes que se pueden tirar.",
    special: [
      "Hay 3 paredes que caen cuando rompes su interruptor (tiene 125 de vida): una en A (entre A Art y A Garden), una en mid (entre Mid Window y Mid Bottom) y una en B (entre B Tower y el site).",
      "Cuando una pared baja, se queda así toda la ronda. No se vuelve a abrir.",
      "Si estás debajo cuando cae, te mueres.",
      "Atacando B: si tiras los humos pegados al site para pasar y plantar, te quedas sin espacio. Lo ideal es humear mid y la boca de CT, ganar la caída (B Drop) y jugar cruzado desde varios puntos.",
      "Salió en la 13.00 (junio 2026). Lo vamos a ir aprendiendo juntos, así que esta ficha va a cambiar."
    ],
    zones: [
      { callouts: ["Mid Fountain"], type: "key", title: "Mid Fountain", why: "Mid manda en Summit. Desde Fountain presionas los dos sites, y si el rival la tiene, cada rotación tuya es más larga y más peligrosa." },
      { callouts: ["Mid Bend"], type: "atk", title: "Mid Bend", why: "Conecta con A Link. Es el camino para entrar a A desde mid y partir el site." },
      { callouts: ["Mid Window", "Mid Bottom"], type: "mech", title: "Pared de mid", why: "Entre Mid Window y Mid Bottom está la pared de mid. Si cae, mid queda cortado y las rotaciones cambian para los dos equipos." },
      { callouts: ["A Garden", "A Art"], type: "mech", title: "Pared de A", why: "Está entre A Garden y A Art. Si defiendes, tírala solo si no te corta a ti la rotación." },
      { callouts: ["A Link"], type: "atk", title: "A Link", why: "Por aquí llega la gente que viene de mid. Si nadie lo mira, te entran a A por la espalda." },
      { callouts: ["A Cave", "A Art"], type: "def", title: "A Cave / A Art", why: "Ángulos altos para defender A. Desde arriba ves la entrada sin quedar tan expuesto." },
      { callouts: ["B Tower"], type: "mech", title: "B Tower y pared de B", why: "Posición alta para aguantar B. La pared de B está entre Tower y el site: si cae, cambia por dónde se retakea." },
      { callouts: ["B Gym"], type: "def", title: "B Gym", why: "La otra posición fuerte para defender B junto con Tower." }
    ],
    sites: [
      { name: "A", info: ["Si alguien rompe el interruptor de la pared de A: se ve y se escucha.", "Gente en A Link: viene de mid y te parte el site."], retake: "Si la pared de A ya cayó, piensa por dónde vas a entrar antes de ir. El camino ya no es el mismo que al empezar la ronda." },
      { name: "B", info: ["Quién tiene B Tower.", "Si cayó la pared de B y desde dónde."], retake: "Con la pared abajo hay menos caminos para volver a entrar, y el rival lo sabe. Junten utilidad y entren juntos." }
    ],
    low: "En elo bajo la gente rompe las paredes por romperlas. Antes de tirar una, piensa: ¿le corta la rotación al rival o a mi equipo? Y cuando escuches que cae una pared, mira el minimapa: te dice dónde está la gente."
  },
  {
    id: "corrode",
    name: "Corrode",
    siteCount: 2,
    badge: "Cambiado en 13.08",
    line: "2 sites, 3 líneas y un mid que decide casi todo. Volvió en la 13.08 con cambios importantes.",
    special: [
      "Los defensores ahora llegan más rápido al fondo de A y de B: los retakes son más rápidos que antes.",
      "La media pared de mid ahora es de metal y está un metro más adelante. El atacante puede llegar a A Link sin que lo vean desde Top Mid.",
      "En Lower Mid movieron las cajas hacia B, agregaron un jump-up y subieron la pared: ya no se puede asomar por encima desde las cajas.",
      "Cambió la zona de plante de A: plantar para jugar el post-plant desde A Link ya no rinde igual."
    ],
    zones: [
      { callouts: ["Mid Top"], type: "key", title: "Top Mid", why: "Quien tiene Top y Stairs puede ir a cualquier site sin arriesgar. Si lo pierdes, te pueden partir los dos sites." },
      { callouts: ["Mid Stairs"], type: "key", title: "Mid Stairs", why: "Junto con Top, es lo que te deja pivotar entre A y B." },
      { callouts: ["Mid Bottom"], type: "mech", title: "Lower Mid", why: "Cambió en la 13.08: cajas movidas hacia B, jump-up nuevo y pared más alta. Revisa los ángulos nuevos en una custom." },
      { callouts: ["A Link"], type: "atk", title: "A Link", why: "Camino de mid a A. Con la pared de mid nueva es más fácil llegar sin que te vean, así que en defensa vas a necesitar info aquí." },
      { callouts: ["A Yard"], type: "atk", title: "A Yard", why: "A se entra por Yard o por Elbow. Lo típico es llegar a Yard por Link y por Main al mismo tiempo." },
      { callouts: ["A Elbow", "A Pocket"], type: "def", title: "A Elbow / Pocket", why: "Esquinas cerradas. Buen lugar para frenar la entrada con utilidad." },
      { callouts: ["B Main"], type: "atk", title: "B Main", why: "Entrar directo por B Main te expone a muchos ángulos y alturas. Suele ser mejor entrar a B desde mid por B Link." },
      { callouts: ["B Tower", "B Arch"], type: "def", title: "B Tower / Arch", why: "Las dos posiciones fuertes para aguantar B: altura y off-angles contra la gente que sale de B Main." }
    ],
    sites: [
      { name: "A", info: ["¿Vienen por Yard o por Elbow?", "¿Hay alguien en A Link? Esa gente viene de mid."], retake: "Desde la 13.08 llegas más rápido al fondo del site. Si plantaron y son pocos, el retake es buena opción." },
      { name: "B", info: ["Info de B Link: si la pierdes, te parten el site.", "Cuántos salen de B Main."], retake: "Igual que en A, la rotación de defensa es más corta. Entren juntos por el fondo." }
    ],
    low: "Como mid decide todo, en elo bajo casi nadie lo juega y todos van directo a los sites. Si tu equipo tiene mid, tiene info gratis de las dos rotaciones."
  },
  {
    id: "bind",
    name: "Bind",
    siteCount: 2,
    line: "Mapa sin mid: dos sites y dos teleports. Todo pasa por los lados.",
    special: [
      "No hay mid. La defensa rota por detrás de los sites, y eso tarda.",
      "Hay dos teleports del lado atacante que llevan de un lado del mapa al otro. Hacen ruido al entrar y al salir.",
      "Por el teleport, un site puede pasar de tener 1 atacante a tener 5 en segundos."
    ],
    zones: [
      { callouts: ["A Short"], type: "atk", title: "A Short", why: "Una de las dos entradas a A. Es corta y cerrada: con utilidad se defiende bien." },
      { callouts: ["A Bath", "A Lamps"], type: "atk", title: "A Bath", why: "La otra entrada a A. Con Short, A se ataca por dos lados a la vez." },
      { callouts: ["A Heaven", "A Tower"], type: "def", title: "A Heaven", why: "La altura de A. Desde aquí ves casi todo el site." },
      { callouts: ["B Long"], type: "atk", title: "B Long", why: "Pasillo largo hacia B. Si escuchas mucha gente aquí, B viene fuerte." },
      { callouts: ["B Garden", "B Hookah"], type: "key", title: "B Garden (Hookah)", why: "La otra entrada a B, con la ventana. Si la pierdes, B se ataca por dos lados." },
      { callouts: ["B Elbow"], type: "def", title: "B Elbow", why: "Para aguantar B mirando la salida de Long." }
    ],
    sites: [
      { name: "A", info: ["Ruido de teleport cerca de A: alguien llegó desde el otro lado.", "¿Vienen por Short, por Bath o por los dos?"], retake: "Las rotaciones de defensa son largas. Si te plantan y están 4 o 5 en el site, muchas veces conviene salvar el arma." },
      { name: "B", info: ["Gente en Long vs. gente en Garden.", "Ruido de teleport en el lado de B."], retake: "Retakea juntando a los que vienen de A. Si entras solo por detrás, te esperan." }
    ],
    low: "El clásico de Bind en elo bajo: tus compas escuchan un teleport y rotan todos corriendo. Si no viste salir a nadie, puede ser un fake. Rota en silencio y mira el mapa."
  },
  {
    id: "haven",
    name: "Haven",
    siteCount: 3,
    line: "3 sites (A, B y C). Al defensor le toca cubrir más terreno, y eso es lo que hay que aprovechar.",
    special: [
      "Con 3 sites, la defensa siempre está repartida: casi siempre hay un site con poca gente.",
      "B está en el centro: es el site desde donde más rápido se rota a A o a C.",
      "Garage conecta mid con C."
    ],
    zones: [
      { callouts: ["Mid Courtyard", "Mid Doors"], type: "key", title: "Mid (Courtyard)", why: "Desde mid el atacante puede ir a B o a Garage (C). Si nadie lo mira, la defensa no sabe qué viene." },
      { callouts: ["C Garage", "Mid Garage", "Garage"], type: "key", title: "Garage", why: "Conecta mid con C. Si el rival tiene Garage, C se cae fácil porque lo atacan por dos lados." },
      { callouts: ["A Long"], type: "atk", title: "A Long", why: "La entrada larga a A." },
      { callouts: ["A Sewer", "A Short"], type: "atk", title: "A Sewer", why: "La entrada corta a A. Partir A entre Long y Sewer es lo típico." },
      { callouts: ["B Site"], type: "def", title: "B", why: "El site puente: quien está en B puede ayudar a A o a C." },
      { callouts: ["C Long"], type: "atk", title: "C Long", why: "La entrada principal a C." }
    ],
    sites: [
      { name: "A", info: ["¿Cuánta gente en Long y cuánta en Sewer?"], retake: "Ayudan B y quien venga de mid. No entres solo." },
      { name: "B", info: ["B es pequeño y se cae rápido si nadie avisa."], retake: "Llega gente de A y de C: es el retake más fácil de juntar." },
      { name: "C", info: ["Garage: si lo pierdes, C queda partido."], retake: "Es el site más lejos para los de A. Espera a juntar 2 o 3." }
    ],
    low: "En Haven, el que defiende solo A o C muere y no avisa. Si estás solo en un site, tu trabajo es dar info y sobrevivir, no ganar el 1v5."
  },
  {
    id: "lotus",
    name: "Lotus",
    siteCount: 3,
    line: "3 sites, puertas giratorias y una pared que se rompe. Hay mucho ruido: úsalo como info.",
    special: [
      "Hay puertas giratorias que se activan con un botón y hacen ruido.",
      "Hay una pared que se puede romper y abre un camino nuevo.",
      "B es el site del medio: el más rápido para rotar.",
      "En la 12.05 cambiaron la penetración de paredes y la zona de plante de A."
    ],
    zones: [
      { callouts: ["B Main", "B Site"], type: "key", title: "B", why: "Site del medio. Los atacantes lo usan para cortar rotaciones, y los defensores para llegar rápido a A o a C." },
      { callouts: ["A Main"], type: "atk", title: "A Main", why: "La entrada principal a A." },
      { callouts: ["A Rubble"], type: "atk", title: "A Rubble", why: "Otra entrada a A. Con Main, A se ataca por dos lados." },
      { callouts: ["A Tree"], type: "def", title: "A Tree", why: "Posición para aguantar A mirando las entradas." },
      { callouts: ["C Mound"], type: "def", title: "C Mound", why: "La altura de C." },
      { callouts: ["C Main", "C Waterfall"], type: "atk", title: "C Main", why: "La entrada principal a C." }
    ],
    sites: [
      { name: "A", info: ["Ruido de puerta: alguien rota o está haciendo un fake.", "Si rompieron la pared: ya hay un camino más."], retake: "Los retakes salen desde B. Usa la puerta solo si sabes que nadie te espera del otro lado." },
      { name: "B", info: ["B se cae rápido: avisa apenas veas gente."], retake: "Llegan los de A y los de C. Junten y entren a la vez." },
      { name: "C", info: ["Gente en C Main vs. gente en Waterfall."], retake: "Igual que A: desde B, y sin cruzar la puerta a ciegas." }
    ],
    low: "Todos rotan por la puerta corriendo y avisan a todo el mapa. Usa el ruido de las puertas del rival como info y no hagas lo mismo."
  },
  {
    id: "sunset",
    name: "Sunset",
    siteCount: 2,
    line: "2 sites y un mid muy importante. Mid y Market deciden B.",
    special: [
      "Market conecta mid con B: si el rival lo tiene, B se ataca por dos lados.",
      "Volvió en la 13.00 sin cambios en el mapa."
    ],
    zones: [
      { callouts: ["Mid Top", "Mid Courtyard"], type: "key", title: "Mid", why: "Desde mid se llega a Market (B) y al lado de A. Si lo tienes, eliges qué site atacar." },
      { callouts: ["B Market"], type: "key", title: "B Market", why: "La conexión mid–B. Perderlo en defensa es perder B." },
      { callouts: ["B Main"], type: "atk", title: "B Main", why: "Entrada directa a B." },
      { callouts: ["A Main"], type: "atk", title: "A Main", why: "La entrada principal a A." },
      { callouts: ["A Elbow"], type: "def", title: "A Elbow", why: "Para aguantar la salida de A Main." },
      { callouts: ["A Alley", "A Link"], type: "atk", title: "A Alley / Link", why: "El camino desde mid a A. Si nadie lo mira, te entran por el costado." }
    ],
    sites: [
      { name: "A", info: ["¿Vienen por Main o desde mid?"], retake: "Entra junto a los que vienen de mid; si mid es del rival, la rotación es más larga." },
      { name: "B", info: ["Market: quién lo tiene.", "Cuántos salen de B Main."], retake: "Si tienes Market, retakear B es mucho más fácil: entras por dos lados." }
    ],
    low: "En elo bajo nadie juega Market y todos se quedan en los sites. Un compa en Market te da la info de B y de mid sin tener que pelear."
  },
  {
    id: "abyss",
    name: "Abyss",
    siteCount: 2,
    line: "Los bordes no tienen pared: si te caes, te mueres. Mucha altura y líneas largas.",
    special: [
      "Los bordes del mapa no tienen pared. Puedes caerte y morir, y también tirar al rival con habilidades.",
      "Hay muchas líneas largas: bueno para Operator.",
      "Volvió en la 13.04 (agosto 2026)."
    ],
    zones: [
      { callouts: ["Mid Top", "Mid Bottom"], type: "key", title: "Mid", why: "Conecta los dos sites y tiene varias alturas. Quien lo controla decide por dónde ataca." },
      { callouts: ["A Main"], type: "atk", title: "A Main", why: "La entrada principal a A." },
      { callouts: ["A Site"], type: "def", title: "A", why: "Cuidado con los bordes al moverte con habilidades." },
      { callouts: ["B Main"], type: "atk", title: "B Main", why: "La entrada principal a B." },
      { callouts: ["B Site"], type: "def", title: "B", why: "Juega cerca de cobertura: las líneas largas castigan quedarse en abierto." }
    ],
    sites: [
      { name: "A", info: ["¿Vienen por Main o desde mid?"], retake: "No te muevas pegado a los bordes con prisa. Muchos retakes se pierden por caídas." },
      { name: "B", info: ["¿Vienen por Main o desde mid?"], retake: "Igual que en A: entren juntos y con cuidado con los bordes." }
    ],
    low: "En Abyss se muere mucha gente cayéndose sola. Antes de usar un dash o una habilidad de movimiento, mira dónde vas a caer."
  }
];
