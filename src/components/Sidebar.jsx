export default function Sidebar({
  navigation,
  activePage,
  onNavigate,
  title,
  rankTrack,
}) {
  return (
    <aside className="sidebar">
      <section className="brand glass">
        <h1 className="title-font">{title}</h1>
        <p style={{ margin: "4px 0 0", color: "var(--muted)" }}>
          La Academia del Heroe
        </p>
        <div className="rank-track">{rankTrack}</div>
      </section>
      <nav className="nav-list" aria-label="Actividades">
        {navigation.map((item) => (
          <button
            key={item.id}
            className={`nav-btn ${activePage === item.id ? "active" : ""}`}
            onClick={() => onNavigate(item.id)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
