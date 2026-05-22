export default function Sidebar({
  navigation,
  activePage,
  onNavigate,
  title,
  rankTrack,
  leaderboard,
  currentUserEmail,
  currentUserName,
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
      <section className="ranking-panel glass">
        <div className="ranking-panel__header">
          <h2 className="ranking-panel__title">Ranking global</h2>
          <span className="ranking-panel__count">
            {leaderboard.length} usuarios
          </span>
        </div>
        <ol className="ranking-list">
          {leaderboard.map((user) => {
            const isCurrentUser =
              user.email === currentUserEmail ||
              user.nombre === currentUserName;

            return (
              <li
                key={user.email}
                className={`ranking-item ${isCurrentUser ? "ranking-item--current" : ""}`}
              >
                <div>
                  <strong>
                    #{user.position} {user.nombre}
                  </strong>
                  <div className="ranking-item__meta">{user.ranking}</div>
                </div>
                <div className="ranking-item__xp">{user.xp} XP</div>
              </li>
            );
          })}
        </ol>
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
