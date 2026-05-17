import { useRef } from "react";
import { useParticles } from "../hooks/useParticles";

export default function ParticlesCanvas() {
  const canvasRef = useRef(null);
  useParticles(canvasRef);

  return <canvas ref={canvasRef} className="particles" aria-hidden="true" />;
}
