import { useEffect, useRef } from "react";

function drawChart(canvas, points, color) {
  const context = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const padding = 22;

  context.clearRect(0, 0, width, height);
  context.strokeStyle = "rgba(255,255,255,.12)";

  for (let index = 0; index < 5; index += 1) {
    const y = padding + ((height - padding * 2) * index) / 4;
    context.beginPath();
    context.moveTo(padding, y);
    context.lineTo(width - padding, y);
    context.stroke();
  }

  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = 2.6;

  points.forEach((point, index) => {
    const x = padding + ((width - padding * 2) * index) / (points.length - 1);
    const y = height - padding - ((height - padding * 2) * point) / 100;

    if (index === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  });

  context.stroke();
}

export function LineChartCanvas({ points, color }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const render = () => drawChart(canvas, points, color);
    render();
    window.addEventListener("resize", render);

    return () => {
      window.removeEventListener("resize", render);
    };
  }, [points, color]);

  return <canvas ref={canvasRef} width="400" height="180" />;
}
