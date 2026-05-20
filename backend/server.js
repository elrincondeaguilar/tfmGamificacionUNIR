import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const server = app.listen(PORT, () => {
  console.log(`✅ Backend ejecutándose en puerto ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});

server.on("error", (err) => {
  console.error("\n❌ Error al iniciar el servidor:", err.message || err);
  if (err && err.code === "EADDRINUSE") {
    console.error(`El puerto ${PORT} ya está en uso.`);
    console.error("Opciones para solucionarlo:");
    console.error(
      "  1) Detener el proceso que usa el puerto 5000 (PowerShell):",
    );
    console.error(
      `       Get-NetTCPConnection -LocalPort ${PORT} | Select-Object -ExpandProperty OwningProcess -Unique`,
    );
    console.error("       Stop-Process -Id <PID> -Force");
    console.error(
      "  2) O cambiar el puerto en backend/.env (ej. PORT=5001) y reiniciar",
    );
    console.error(
      "  3) Si usas WSL/containers revisa procesos dentro del entorno correspondiente",
    );
  }
  process.exit(1);
});
