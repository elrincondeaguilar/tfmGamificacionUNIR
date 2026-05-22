import { useState } from "react";
import ChartCanvas from "./ChartCanvas";

function AccordionItem({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`accordion${open ? " open" : ""}`}>
      <button
        className="accordion-toggle"
        onClick={() => setOpen((value) => !value)}
      >
        {title}
      </button>
      <div className="accordion-content">{children}</div>
    </div>
  );
}

function Activity0({ onMissionClick, onOpenBadges, completed }) {
  return (
    <section id="act0" className="page active">
      <div className="grid" style={{ gridTemplateColumns: "1.2fr 0.8fr" }}>
        <article
          className="card glass mission"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <span className="badge">ACTIVIDAD 0 - El Gran Comienzo</span>
          <h3 className="title-font" style={{ margin: "10px 0" }}>
            Bienvenida a la Academia de Heroes Cientificos
          </h3>
          <p className="story">
            El docente asume el rol de El Gran Maestre y abre las puertas de la
            academia. Aqui los estudiantes ascienden por rangos dominando
            misiones de fisica mecanica y trabajo cooperativo.
          </p>
          <div className="cards-row" style={{ marginTop: 10 }}>
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
          </div>
          <div className="parchment" style={{ marginTop: 12 }}>
            <strong>Juramento del Explorador</strong>
            <p style={{ margin: "6px 0 0" }}>
              Juro observar, medir y argumentar con honestidad cientifica.
              Aprendere del error y apoyare a mi escuadron.
            </p>
          </div>
          <button
            className="mission-btn"
            style={{ alignSelf: "flex-start" }}
            onClick={onMissionClick}
            disabled={completed}
          >
            {completed ? "Actividad 0 completada" : "Iniciar aventura"}
          </button>
        </article>
        <aside className="card glass">
          <h4 className="title-font" style={{ margin: "0 0 8px" }}>
            Panel de diagnostico motivacional
          </h4>
          <AccordionItem title="¿Como llego hoy a la mision?">
            Selecciona tu energia: Alta, Media o Enfocado en mejorar.
          </AccordionItem>
          <AccordionItem title="Fortaleza personal">
            Analisis de problemas, trabajo en equipo, creatividad experimental.
          </AccordionItem>
          <AccordionItem title="Meta del dia">
            Ganar la insignia inicial con participacion y razonamiento fisico.
          </AccordionItem>
        </aside>
      </div>
    </section>
  );
}

function Activity1() {
  return (
    <section id="act1" className="page active">
      <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
        <article className="card glass mission">
          <span className="badge">ACTIVIDAD 1 - Proxima mision</span>
          <h3 className="title-font" style={{ margin: "10px 0" }}>
            Actividad 0 completada
          </h3>
          <p className="story">
            Ya viste la presentacion inicial. Usa el menu lateral para continuar
            con la Actividad 1.
          </p>
        </article>
      </div>
    </section>
  );
}

export default function ActivityPages({
  activePage,
  onMissionClick,
  onOpenBadges,
  activity0Completed,
  onGainXp,
  teams,
  timer,
  onStartTimer,
  onStopTimer,
  onResetTimer,
  charts,
  reflections,
  onSubmitReflection,
}) {
  return (
    <div>
      {activePage === "act1" ? (
        <Activity1 />
      ) : (
        <Activity0
          onMissionClick={onMissionClick}
          onOpenBadges={onOpenBadges}
          completed={activity0Completed}
        />
      )}
    </div>
  );
}
