export default function Header({
  title,
  subtitle,
  xp,
  maxXP,
  rankName,
  xpPercent,
  user,
  onLogout,
}) {
  return (
    <header className="header glass">
      <div className="header-top">
        <div>
          <h2 className="title-font" style={{ margin: 0, fontSize: "1.8rem" }}>
            {title}
          </h2>
          <p style={{ margin: "2px 0 0", color: "#c7d6f3" }}>{subtitle}</p>
        </div>
        <div className="xp-wrap">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "4px",
            }}
          >
            <strong>XP</strong>
            <strong>{xp} XP</strong>
          </div>
          <div className="xp-bar">
            <div
              className="xp-fill"
              style={{
                width: `${xpPercent ?? Math.min(100, Math.round((xp / maxXP) * 100))}%`,
              }}
            />
          </div>
          <div style={{ marginTop: "6px", color: "var(--muted)" }}>
            Rango actual:{" "}
            <span style={{ color: "var(--gold)" }}>{rankName}</span>
          </div>
        </div>
        {user && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, fontSize: "0.9rem" }}>{user.nombre}</p>
              <button
                onClick={onLogout}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--muted)",
                  cursor: "pointer",
                  textDecoration: "underline",
                  padding: 0,
                  fontSize: "0.8rem",
                }}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
