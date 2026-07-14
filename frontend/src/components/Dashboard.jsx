import { gameConfig } from "../data/gameData";
import { getRankName, badgeCards } from "../utils/gameUtils";

export default function Dashboard({ xp, earnedBadges }) {
  const maxXP = gameConfig.maxXP;
  const rankName = getRankName(xp, gameConfig);
  const progressPercent = Math.min(100, (xp / maxXP) * 100);

  // Encontrar el próximo rango
  const currentRankIndex = gameConfig.ranks.findIndex(
    (rank) => rank.name === rankName,
  );
  const nextRank =
    currentRankIndex < gameConfig.ranks.length - 1
      ? gameConfig.ranks[currentRankIndex + 1]
      : null;
  const xpToNextRank = nextRank ? nextRank.min - xp : 0;

  // Filtrar insignias ganadas
  const displayedBadges = badgeCards.filter((badge) =>
    earnedBadges?.includes(badge.title.toLowerCase().replace(/\s+/g, "_")),
  );

  return (
    <section id="dashboard" className="page active">
      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Panel de Progreso */}
        <article className="card glass">
          <h2 className="title-font" style={{ margin: "0 0 20px" }}>
            📊 Tu Progreso
          </h2>

          {/* Rango Actual */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ margin: "0 0 8px", fontSize: "1.1em" }}>
              Rango Actual
            </h3>
            <div
              style={{
                padding: "16px",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: "2em", margin: "0", fontWeight: "bold" }}>
                {rankName}
              </p>
              <p style={{ fontSize: "0.9em", margin: "4px 0 0", opacity: 0.8 }}>
                Nivel {currentRankIndex + 1} de {gameConfig.ranks.length}
              </p>
            </div>
          </div>

          {/* Barra de Progreso */}
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
                fontSize: "0.9em",
              }}
            >
              <span>Experiencia:</span>
              <span style={{ fontWeight: "bold" }}>
                {xp} / {maxXP} XP
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: "24px",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progressPercent}%`,
                  background:
                    "linear-gradient(90deg, #4CAF50, #45a049, #3d7a40)",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>

          {/* Siguiente Rango */}
          {nextRank ? (
            <div
              style={{
                padding: "12px",
                background: "rgba(255, 193, 7, 0.1)",
                borderRadius: "8px",
                borderLeft: "4px solid #FFC107",
              }}
            >
              <p style={{ margin: "0 0 4px", fontSize: "0.9em" }}>
                Próximo Rango: <strong>{nextRank.name}</strong>
              </p>
              <p style={{ margin: "0", fontSize: "0.85em", opacity: 0.8 }}>
                Te faltan <strong>{xpToNextRank} XP</strong>
              </p>
            </div>
          ) : (
            <div
              style={{
                padding: "12px",
                background: "rgba(76, 175, 80, 0.1)",
                borderRadius: "8px",
                borderLeft: "4px solid #4CAF50",
              }}
            >
              <p style={{ margin: "0", fontSize: "0.9em" }}>
                ✓ ¡Has alcanzado el rango máximo!
              </p>
            </div>
          )}
        </article>

        {/* Panel de Insignias */}
        <article className="card glass">
          <h2 className="title-font" style={{ margin: "0 0 20px" }}>
            🎖️ Insignias Ganadas
          </h2>

          {displayedBadges.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                gap: "12px",
              }}
            >
              {displayedBadges.map((badge, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: "center",
                    padding: "8px",
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 193, 7, 0.3)",
                  }}
                >
                  <img
                    src={badge.src}
                    alt={badge.alt}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      marginBottom: "6px",
                    }}
                  />
                  <p
                    style={{
                      margin: "0",
                      fontSize: "0.75em",
                      wordBreak: "break-word",
                    }}
                  >
                    {badge.title}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                padding: "20px",
                textAlign: "center",
                opacity: 0.7,
              }}
            >
              <p style={{ margin: "0", fontSize: "0.95em" }}>
                Aún no has ganado insignias.
              </p>
              <p style={{ margin: "4px 0 0", fontSize: "0.85em" }}>
                ¡Completa actividades para ganarlas!
              </p>
            </div>
          )}
        </article>
      </div>

      {/* Panel de Estadísticas */}
      <article className="card glass" style={{ marginTop: 16 }}>
        <h2 className="title-font" style={{ margin: "0 0 20px" }}>
          📈 Estadísticas Generales
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "16px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <p style={{ margin: "0 0 8px", fontSize: "0.9em", opacity: 0.8 }}>
              Experiencia Total
            </p>
            <p style={{ margin: "0", fontSize: "1.8em", fontWeight: "bold" }}>
              {xp}
            </p>
          </div>

          <div style={{ textAlign: "center" }}>
            <p style={{ margin: "0 0 8px", fontSize: "0.9em", opacity: 0.8 }}>
              Insignias Ganadas
            </p>
            <p style={{ margin: "0", fontSize: "1.8em", fontWeight: "bold" }}>
              {displayedBadges.length}
            </p>
          </div>

          <div style={{ textAlign: "center" }}>
            <p style={{ margin: "0 0 8px", fontSize: "0.9em", opacity: 0.8 }}>
              Progreso General
            </p>
            <p style={{ margin: "0", fontSize: "1.8em", fontWeight: "bold" }}>
              {Math.round(progressPercent)}%
            </p>
          </div>

          <div style={{ textAlign: "center" }}>
            <p style={{ margin: "0 0 8px", fontSize: "0.9em", opacity: 0.8 }}>
              Nivel
            </p>
            <p style={{ margin: "0", fontSize: "1.8em", fontWeight: "bold" }}>
              {currentRankIndex + 1}
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}
