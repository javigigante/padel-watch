
/*
 * PADEL WATCH
 * Lógica del marcador de pádel.
 *
 * Reglas:
 * - Puntuación tradicional: 0, 15, 30, 40 y ventaja.
 * - Los juegos se ganan con cuatro puntos y dos de diferencia.
 * - Los sets se ganan con seis juegos y dos de diferencia.
 * - Con 6-6 se juega un tie-break a siete puntos, con dos de diferencia.
 * - El partido termina cuando una pareja gana dos sets.
 */

// Referencias a los elementos del HTML.
const elements = {
  scoreUs: document.querySelector("#score-us"),
  scoreThem: document.querySelector("#score-them"),
  minusUs: document.querySelector("#minus-us"),
  minusThem: document.querySelector("#minus-them"),
  pointsUs: document.querySelector("#points-us"),
  pointsThem: document.querySelector("#points-them"),
  gamesUs: document.querySelector("#games-us"),
  gamesThem: document.querySelector("#games-them"),
  setsUs: document.querySelector("#sets-us"),
  setsThem: document.querySelector("#sets-them"),
  setNumber: document.querySelector("#set-number"),
  teamUs: document.querySelector("#team-us"),
  teamThem: document.querySelector("#team-them"),
  reset: document.querySelector("#reset"),
};

// Comprueba que los botones necesarios existan en el HTML.
if (
  !elements.minusUs ||
  !elements.minusThem ||
  !elements.scoreUs ||
  !elements.scoreThem ||
  !elements.reset
) {
  throw new Error(
    "No se encuentran los botones del marcador. Revisa los ID de index.html."
  );
}

const POINT_LABELS = ["0", "15", "30", "40", "AD"];
const MAX_SETS = 3;
const SETS_TO_WIN = 2;

// Historial de puntos: 0 = nosotros; 1 = rivales.
let history = [];

/* Estado inicial de un partido. */
function createState() {
  return {
    points: [0, 0],
    games: [0, 0],
    sets: [0, 0],
    finished: false,
  };
}

/* Registra un set y reinicia los juegos y los puntos. */
function winSet(state, team) {
  state.sets[team] += 1;
  state.games = [0, 0];
  state.points = [0, 0];

  if (state.sets[team] >= SETS_TO_WIN) {
    state.finished = true;
  }
}

/* Registra un juego y comprueba si se ha ganado el set. */
function winGame(state, team) {
  state.games[team] += 1;
  state.points = [0, 0];

  const opponent = 1 - team;

  if (
    state.games[team] >= 6 &&
    state.games[team] - state.games[opponent] >= 2
  ) {
    winSet(state, team);
  }
}

/* Aplica un punto siguiendo las reglas de pádel. */
function awardPoint(state, team) {
  if (state.finished) return;

  const opponent = 1 - team;

  // Tie-break al llegar a 6-6.
  if (state.games[0] === 6 && state.games[1] === 6) {
    state.points[team] += 1;

    if (
      state.points[team] >= 7 &&
      state.points[team] - state.points[opponent] >= 2
    ) {
      winSet(state, team);
    }

    return;
  }

  const own = state.points[team];
  const other = state.points[opponent];

  // La pareja que ya tenía ventaja gana el juego.
  if (own === 4) {
    winGame(state, team);
    return;
  }

  // Si el rival tenía ventaja, se vuelve a iguales.
  if (other === 4) {
    state.points = [3, 3];
    return;
  }

  // A 40-40, el siguiente punto concede ventaja.
  if (own === 3 && other === 3) {
    state.points[team] = 4;
    return;
  }

  // Con 40 y el rival por debajo, se gana el juego.
  if (own === 3) {
    winGame(state, team);
    return;
  }

  // Avanza la puntuación normal.
  state.points[team] += 1;
}

/*
 * Reconstruye el marcador reproduciendo el historial.
 * Así, al deshacer un punto, se recalculan juegos y sets.
 */
function calculateState() {
  const state = createState();

  for (const team of history) {
    awardPoint(state, team);
  }

  return state;
}

/* Actualiza todos los marcadores y el estado de los botones. */
function render() {
  const state = calculateState();

  const isTieBreak =
    state.games[0] === 6 &&
    state.games[1] === 6;

  elements.pointsUs.textContent = isTieBreak
    ? state.points[0]
    : POINT_LABELS[state.points[0]];

  elements.pointsThem.textContent = isTieBreak
    ? state.points[1]
    : POINT_LABELS[state.points[1]];

  elements.gamesUs.textContent = state.games[0];
  elements.gamesThem.textContent = state.games[1];

  elements.setsUs.textContent = `(${state.sets[0]})`;
  elements.setsThem.textContent = `(${state.sets[1]})`;

  const currentSet = Math.min(
    state.sets[0] + state.sets[1] + 1,
    MAX_SETS
  );

  elements.setNumber.textContent = state.finished
    ? "FIN."
    : `${currentSet}.`;

  // No se pueden sumar puntos cuando el partido ha terminado.
  elements.scoreUs.disabled = state.finished;
  elements.scoreThem.disabled = state.finished;

  // El botón menos solo se desactiva si no hay puntos
  // de ese equipo en el historial.
  elements.minusUs.disabled = !history.includes(0);
  elements.minusThem.disabled = !history.includes(1);
}

/* Destello amarillo al anotar. */
function flashTeam(teamElement) {
  teamElement.classList.remove("flash");

  // Reinicia la animación incluso con pulsaciones seguidas.
  void teamElement.offsetWidth;

  teamElement.classList.add("flash");
}

/* Añade un punto al equipo elegido. */
function addPoint(team) {
  if (calculateState().finished) return;

  history.push(team);

  flashTeam(team === 0 ? elements.teamUs : elements.teamThem);
  render();
}

/*
 * Elimina el punto más reciente del equipo elegido.
 * Devuelve el marcador a su estado recalculado.
 */
function removeLastPoint(team) {
  const index = history.lastIndexOf(team);

  // No hace nada si no hay puntos que quitar.
  if (index === -1) {
    render();
    return;
  }

  history.splice(index, 1);
  render();
}

/*
 * Registra los eventos de los botones.
 * preventDefault evita acciones predeterminadas del botón.
 */

// Sumar puntos.
elements.scoreUs.addEventListener("click", () => {
  addPoint(0);
});

elements.scoreThem.addEventListener("click", () => {
  addPoint(1);
});

// Restar puntos.
elements.minusUs.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  removeLastPoint(0);
});

elements.minusThem.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  removeLastPoint(1);
});

// Reiniciar el partido.
elements.reset.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();

  history = [];
  render();
});

// Mostrar el marcador inicial.
render();