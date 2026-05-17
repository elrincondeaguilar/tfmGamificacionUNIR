(() => {
  const root = (window.PhysicsChallenger = window.PhysicsChallenger || {});
  const { dom } = root;

  const particles = [];
  let canvas;
  let context;

  function resizeParticles() {
    if (!canvas) {
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function initParticles() {
    if (!canvas || !context) {
      return;
    }

    particles.length = 0;
    const count = Math.min(90, Math.floor(window.innerWidth / 18));

    for (let index = 0; index < count; index += 1) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.6,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
      });
    }
  }

  function animateParticles() {
    if (!canvas || !context) {
      return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (const particle of particles) {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > canvas.width) {
        particle.vx *= -1;
      }

      if (particle.y < 0 || particle.y > canvas.height) {
        particle.vy *= -1;
      }

      context.beginPath();
      context.fillStyle = "rgba(49,231,255,.55)";
      context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
      context.fill();
    }

    window.requestAnimationFrame(animateParticles);
  }

  function initParticlesSystem() {
    canvas = dom.byId("particles");
    if (!canvas) {
      return;
    }

    context = canvas.getContext("2d");
    resizeParticles();
    initParticles();
    animateParticles();

    window.addEventListener("resize", () => {
      resizeParticles();
      initParticles();
    });
  }

  root.particles = {
    initParticlesSystem,
    resizeParticles,
    initParticles,
    animateParticles,
  };
})();
