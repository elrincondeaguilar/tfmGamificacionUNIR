export const gameConfig = {
  appTitle: "PHYSICS CHALLENGER",
  appSubtitle: "La Academia del Heroe - Fisica Mecanica Grado Decimo",
  rankTrack: "Aprendiz -> Explorador -> Cientifico -> Experto -> Maestro Heroe",
  ranks: [
    { name: "Aprendiz", min: 0 },
    { name: "Explorador", min: 200 },
    { name: "Cientifico", min: 400 },
    { name: "Experto", min: 700 },
    { name: "Maestro Heroe", min: 900 },
  ],
  navigation: [
    { id: "act0", label: "⚔️ Actividad 0" },
    { id: "act1", label: "🌲 Actividad 1" },
    { id: "act2", label: "🏁 Actividad 2" },
    { id: "act3", label: "🛠️ Actividad 3" },
    { id: "act4", label: "🌱 Actividad 4" },
    { id: "act5", label: "🏆 Actividad 5" },
  ],
  teams: [
    { name: "Alfa", score: 88 },
    { name: "Beta", score: 76 },
    { name: "Gamma", score: 69 },
    { name: "Delta", score: 63 },
  ],
  charts: {
    xt: [10, 20, 35, 50, 72, 92],
    vt: [14, 26, 40, 38, 62, 70],
  },
};

export const introAccordions = [
  {
    title: "¿Como llego hoy a la mision?",
    content: "Selecciona tu energia: Alta, Media o Enfocado en mejorar.",
  },
  {
    title: "Fortaleza personal",
    content:
      "Analisis de problemas, trabajo en equipo, creatividad experimental.",
  },
  {
    title: "Meta del dia",
    content:
      "Ganar la insignia inicial con participacion y razonamiento fisico.",
  },
];

export const squadRoles = [
  "🧑‍✈️ Capitan",
  "⏱️ Cronometrador",
  "📝 Escriba",
  "🎤 Portavoz",
];

export const motionLevels = [
  {
    title: "Nivel 1",
    text: "Posicion y referencia espacial",
  },
  {
    title: "Nivel 2",
    text: "Desplazamiento y direccion",
  },
  {
    title: "Nivel 3",
    text: "Velocidad media y analisis",
  },
];

export const engineeringItems = [
  "DCL correcto",
  "Sistema funcional",
  "Sustentacion",
];

export const finalRanking = [
  { name: "Alfa", score: 980 },
  { name: "Beta", score: 910 },
  { name: "Gamma", score: 870 },
];

export const finalPodium = [
  { name: "Escuadron Beta", height: 90, background: "#cdd8ef", place: "🥈" },
  {
    name: "Escuadron Alfa",
    height: 120,
    background: "linear-gradient(180deg, #ffe8aa, #f4c86c)",
    place: "🥇",
  },
  { name: "Escuadron Gamma", height: 70, background: "#d9a775", place: "🥉" },
];

export const initialReflection = [
  {
    hice: "Analice el problema con mi equipo.",
    mal: "No justificamos una variable con claridad.",
    mejorar: "Voy a ordenar mejor los pasos antes de responder.",
  },
];
