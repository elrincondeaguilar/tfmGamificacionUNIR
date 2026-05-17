import { useState } from "react";
import { apiUrl } from "../config/api";

export default function RegisterPage({ onRegisterSuccess, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [matricula, setMatricula] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirm) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(apiUrl("/api/auth/register"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, nombre, password, matricula }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al registrarse");
        return;
      }

      // Guardar token y usuario
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      onRegisterSuccess(data.user);
    } catch (err) {
      setError("Error de conexión con el servidor");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container glass">
      <div className="auth-box" style={{ maxWidth: "500px" }}>
        <h1 className="title-font">PHYSICS CHALLENGER</h1>
        <p style={{ margin: "8px 0 24px", color: "var(--muted)" }}>
          Regístrate para comenzar tu aventura
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              id="nombre"
              type="text"
              placeholder="Juan Pérez"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="matricula">Matrícula (opcional)</label>
            <input
              id="matricula"
              type="text"
              placeholder="2024001"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="passwordConfirm">Confirmar contraseña</label>
            <input
              id="passwordConfirm"
              type="password"
              placeholder="••••••••"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="mission-btn"
            style={{ width: "100%", marginTop: "16px" }}
          >
            {loading ? "Registrando..." : "Crear Cuenta"}
          </button>
        </form>

        <p
          style={{
            marginTop: "16px",
            textAlign: "center",
            color: "var(--muted)",
          }}
        >
          ¿Ya tienes cuenta?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            style={{
              background: "none",
              border: "none",
              color: "var(--accent)",
              cursor: "pointer",
              textDecoration: "underline",
              padding: 0,
            }}
          >
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </div>
  );
}
