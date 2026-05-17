(() => {
  const root = (window.PhysicsChallenger = window.PhysicsChallenger || {});

  root.config = {
    maxXP: 1000,
    initialXP: 120,
    timerSeconds: 180,
    ranks: [
      { name: "Aprendiz", min: 0 },
      { name: "Explorador", min: 200 },
      { name: "Cientifico", min: 400 },
      { name: "Experto", min: 700 },
      { name: "Maestro Heroe", min: 900 },
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

  root.state = {
    xp: root.config.initialXP,
    timerRemaining: root.config.timerSeconds,
    timerId: null,
  };
})();
