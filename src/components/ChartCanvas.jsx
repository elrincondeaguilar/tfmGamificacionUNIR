import { useEffect, useRef } from "react";

export default function ChartCanvas({
  canvasId,
  points,
  color,
  width = 400,
  height = 180,
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
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
  }, [points, color, width, height]);

  return (
    <canvas
      id={canvasId}
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
    />
  );
}
