(() => {
  const root = (window.PhysicsChallenger = window.PhysicsChallenger || {});

  function bootstrap() {
    root.ui.initUi();
    root.charts.initCharts();
    root.particles.initParticlesSystem();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap, { once: true });
  } else {
    bootstrap();
  }
})();
