import { useState } from "react";
import { LineChartCanvas } from "./LineChartCanvas";
import {
  engineeringItems,
  finalPodium,
  finalRanking,
  introAccordions,
  motionLevels,
  squadRoles,
} from "../data/gameData";

function AccordionList() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      {introAccordions.map((item, index) => (
        <div
          key={item.title}
          className={`accordion ${openIndex === index ? "open" : ""}`}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(index)}
            className="accordion-toggle"
          >
            {item.title}
          </button>
          <div className="accordion-content">{item.content}</div>
        </div>
      ))}
    </>
  );
}

export function IntroSection({ onMissionClick, onOpenBadges }) {
  return (
    <section id="act0" className="page active">
      <div className="grid" style={{ gridTemplateColumns: "1.2fr 0.8fr" }}>
        <article className="card glass mission">
          <span className="badge">ACTIVIDAD 0 - El Gran Comienzo</span>
          <h3 className="title-font" style={{ margin: "10px 0" }}>
            Bienvenida a la Academia de Heroes Cientificos
          </h3>
          <p className="story">
            El docente asume el rol de El Gran Maestre y abre las puertas de la
            academia. Aqui los estudiantes ascienden por rangos dominando
            misiones de fisica mecanica y trabajo cooperativo.
          </p>
          <button
            className="mission-btn"
            style={{ marginTop: "12px" }}
            type="button"
            onClick={onMissionClick}
          >
            Iniciar aventura
          </button>
          {/* <div className="hero-illu" aria-hidden="true">
            🧪 ⚡ 🛡️ 📘
          </div> */}
          {/* <div className="cards-row" style={{ marginTop: "10px" }}>
            <div className="mini">🧭 Escuadrones</div>
            <div className="mini">📚 Libro de Heroes</div>
            <div className="mini">🥇 Ranking</div>
            <div
              className="mini mini--clickable"
              role="button"
              tabIndex={0}
              onClick={onOpenBadges}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onOpenBadges();
                }
              }}
            >
              🎖️ Insignias
            </div>
          </div> */}
          <div className="parchment" style={{ marginTop: "12px" }}>
            <strong>Juramento del Explorador</strong>
            <p style={{ margin: "6px 0 0" }}>
              Juro observar, medir y argumentar con honestidad cientifica.
              Aprendere del error y apoyare a mi escuadron.
            </p>
          </div>
        </article>
        <aside className="card glass">
          <h4 className="title-font" style={{ margin: "0 0 8px" }}>
            Panel de diagnostico motivacional
          </h4>
          <AccordionList />
        </aside>
      </div>
    </section>
  );
}
