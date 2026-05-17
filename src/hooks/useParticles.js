import { useEffect } from "react";

export function useParticles(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext("2d");
    const particles = [];
    let animationFrameId = 0;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function initializeParticles() {
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

    function animate() {
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

      animationFrameId = window.requestAnimationFrame(animate);
    }

    function handleResize() {
      resizeCanvas();
      initializeParticles();
    }

    resizeCanvas();
    initializeParticles();
    animate();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [canvasRef]);
}
