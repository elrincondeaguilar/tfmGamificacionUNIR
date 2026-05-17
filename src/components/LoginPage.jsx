import { useState } from "react";

export default function LoginPage({ onLoginSuccess, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al iniciar sesión");
        return;
      }

      // Guardar token y usuario
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      onLoginSuccess(data.user);
    } catch (err) {
      setError("Error de conexión con el servidor");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container glass">
      <div className="auth-box">
        <h1 className="title-font">PHYSICS CHALLENGER</h1>
        <p style={{ margin: "8px 0 24px", color: "var(--muted)" }}>
          La Academia del Heroe
        </p>

        <form onSubmit={handleSubmit}>
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

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="mission-btn"
            style={{ width: "100%", marginTop: "16px" }}
          >
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        <p
          style={{
            marginTop: "16px",
            textAlign: "center",
            color: "var(--muted)",
          }}
        >
          ¿No tienes cuenta?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            style={{
              background: "none",
              border: "none",
              color: "var(--accent)",
              cursor: "pointer",
              textDecoration: "underline",
              padding: 0,
            }}
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
}
