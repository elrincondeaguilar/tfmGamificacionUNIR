(() => {
  const root = (window.PhysicsChallenger = window.PhysicsChallenger || {});
  const { config, dom } = root;

  function drawSimpleChart(canvasId, points, color) {
    const canvas = dom.byId(canvasId);
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const padding = 22;

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "rgba(255,255,255,.12)";

    for (let index = 0; index < 5; index += 1) {
      const y = padding + ((height - padding * 2) * index) / 4;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.6;

    points.forEach((point, index) => {
      const x = padding + ((width - padding * 2) * index) / (points.length - 1);
      const y = height - padding - ((height - padding * 2) * point) / 100;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();
  }

  function renderCharts() {
    drawSimpleChart("chart-xt", config.charts.xt, "#31e7ff");
    drawSimpleChart("chart-vt", config.charts.vt, "#f4c86c");
  }

  function initCharts() {
    renderCharts();
    window.addEventListener("resize", renderCharts);
  }

  root.charts = {
    initCharts,
    renderCharts,
    drawSimpleChart,
  };
})();
