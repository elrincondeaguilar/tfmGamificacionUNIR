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

export function IntroSection({ onOpenModal }) {
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
          <div className="hero-illu" aria-hidden="true">
            🧪 ⚡ 🛡️ 📘
          </div>
          <div className="cards-row" style={{ marginTop: "10px" }}>
            <div className="mini">🧭 Escuadrones</div>
            <div className="mini">📚 Libro de Heroes</div>
            <div className="mini">🥇 Ranking</div>
            <div className="mini">🎖️ Insignias</div>
          </div>
          <div className="parchment" style={{ marginTop: "12px" }}>
            <strong>Juramento del Explorador</strong>
            <p style={{ margin: "6px 0 0" }}>
              Juro observar, medir y argumentar con honestidad cientifica.
              Aprendere del error y apoyare a mi escuadron.
            </p>
          </div>
          <button
            className="mission-btn"
            style={{ marginTop: "12px" }}
            type="button"
            onClick={() => onOpenModal("modalStart")}
          >
            Iniciar aventura
          </button>
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

export function MotionSection({ onGainXp }) {
  return (
    <section id="act1" className="page">
      <article className="card glass mission">
        <span className="badge">ACTIVIDAD 1 - El Movimiento del Heroe</span>
        <h3 className="title-font" style={{ margin: "10px 0" }}>
          Mision de Cinematica en el Bosque Vectorial
        </h3>
        <p className="story">
          El heroe cruza un bosque de trayectorias. Cada decision exige calcular
          posicion, desplazamiento y velocidad media para salir de la niebla
          mecanica.
        </p>
        <div className="cards-row">
          {motionLevels.map((level) => (
            <div key={level.title} className="mini">
              <strong>{level.title}</strong>
              <br />
              {level.text}
            </div>
          ))}
        </div>
        <div
          className="grid"
          style={{ gridTemplateColumns: "1fr 1fr", marginTop: "10px" }}
        >
          <div
            className="card"
            style={{
              background: "rgba(5, 9, 24, 0.7)",
              border: "1px solid rgba(49, 231, 255, 0.2)",
            }}
          >
            <h4 style={{ marginTop: 0 }}>Graficas x-t animadas</h4>
            <div
              style={{
                width: "100%",
                borderRadius: "10px",
                background: "rgba(8, 14, 34, 0.9)",
              }}
            >
              <LineChartCanvas
                points={[10, 20, 35, 50, 72, 92]}
                color="#31e7ff"
              />
            </div>
          </div>
          <div
            className="card"
            style={{
              background: "rgba(5, 9, 24, 0.7)",
              border: "1px solid rgba(49, 231, 255, 0.2)",
            }}
          >
            <h4 style={{ marginTop: 0 }}>Panel XP de mision</h4>
            <p>Resuelve 3 retos para reclamar la insignia.</p>
            <button
              className="mission-btn"
              type="button"
              onClick={() => onGainXp(80)}
            >
              Completar Nivel 1-3 (+80 XP)
            </button>
            <p style={{ marginTop: "10px" }}>
              <span className="badge">Insignia: Explorador del Movimiento</span>
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

export function SquadSection() {
  return (
    <section id="act2" className="page">
      <article className="card glass mission">
        <span className="badge">
          ACTIVIDAD 2 - La Carrera de los Escuadrones
        </span>
        <h3 className="title-font" style={{ margin: "10px 0" }}>
          Torneo cooperativo de Cinematica aplicada
        </h3>
        <div className="cards-row">
          {squadRoles.map((role) => (
            <div key={role} className="mini">
              {role}
            </div>
          ))}
        </div>
        <div
          className="grid"
          style={{ gridTemplateColumns: "1fr 1fr", marginTop: "10px" }}
        >
          <div
            className="card"
            style={{
              background: "rgba(8, 13, 28, 0.75)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <h4 style={{ marginTop: 0 }}>Tabla de posiciones animada</h4>
            <table className="table" id="ranking-table">
              <thead>
                <tr>
                  <th>Escuadron</th>
                  <th>Puntos</th>
                  <th>Progreso</th>
                </tr>
              </thead>
              <tbody />
            </table>
          </div>
          <div
            className="card"
            style={{
              background: "rgba(8, 13, 28, 0.75)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <h4 style={{ marginTop: 0 }}>Cronometro visual</h4>
            <p id="timer" style={{ fontSize: "2rem", margin: "8px 0" }}>
              03:00
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button className="mission-btn" type="button" id="start-timer">
                Iniciar
              </button>
              <button className="mission-btn" type="button" id="stop-timer">
                Pausar
              </button>
              <button className="mission-btn" type="button" id="reset-timer">
                Reiniciar
              </button>
            </div>
            <div
              style={{
                width: "100%",
                marginTop: "12px",
                borderRadius: "10px",
                background: "rgba(9, 14, 30, 0.88)",
              }}
            >
              <LineChartCanvas
                points={[14, 26, 40, 38, 62, 70]}
                color="#f4c86c"
              />
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

export function EngineeringSection({ onOpenModal, onGainXp }) {
  return (
    <section id="act3" className="page">
      <article className="card glass mission">
        <span className="badge">ACTIVIDAD 3 - El Diseno del Ingeniero</span>
        <h3 className="title-font" style={{ margin: "10px 0" }}>
          Mision voluntaria: Laboratorio futurista de Newton
        </h3>
        <p className="story">
          Disena un sistema mecanico heroico aplicando leyes de Newton: diagrama
          de cuerpo libre, calculo de fuerzas, poleas y planos inclinados.
        </p>
        <div className="cards-row">
          <div className="mini">📐 Diagramas de cuerpo libre</div>
          <div className="mini">💪 Calculo de fuerzas</div>
          <div className="mini">🧲 Sistema de poleas</div>
          <div className="mini">🛤️ Planos inclinados</div>
        </div>
        <div
          className="grid"
          style={{ gridTemplateColumns: "1fr 1fr", marginTop: "10px" }}
        >
          <div
            className="card"
            style={{
              background: "rgba(8, 15, 32, 0.78)",
              border: "1px solid rgba(49, 231, 255, 0.2)",
            }}
          >
            <h4 style={{ marginTop: 0 }}>Area de prototipos</h4>
            <div className="soft-zone card" style={{ minHeight: "160px" }}>
              Espacio para mostrar prototipos, fotos o bocetos del sistema
              mecanico.
            </div>
            <button
              className="mission-btn"
              type="button"
              style={{ marginTop: "8px" }}
              onClick={() => onOpenModal("modalPrototype")}
            >
              Ver guia de prototipo
            </button>
          </div>
          <div
            className="card"
            style={{
              background: "rgba(8, 15, 32, 0.78)",
              border: "1px solid rgba(49, 231, 255, 0.2)",
            }}
          >
            <h4 style={{ marginTop: 0 }}>Recompensas XP</h4>
            <ul>
              {engineeringItems.map((item, index) => (
                <li
                  key={item}
                >{`+${[40, 60, 30][index]} XP por ${item.toLowerCase()}`}</li>
              ))}
            </ul>
            <button
              className="mission-btn"
              type="button"
              onClick={() => onGainXp(130)}
            >
              Reclamar recompensas
            </button>
            <p style={{ marginTop: "8px" }}>
              <span className="badge">Insignia: Mente de Ingeniero</span>
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

export function ReflectionSection({ entries, onAddEntry }) {
  const [form, setForm] = useState({ hice: "", mal: "", mejorar: "" });

  function handleSubmit(event) {
    event.preventDefault();
    onAddEntry(form);
    setForm({ hice: "", mal: "", mejorar: "" });
  }

  return (
    <section id="act4" className="page">
      <article className="card glass soft-zone">
        <span className="badge">ACTIVIDAD 4 - El Error Fertil</span>
        <h3 className="title-font" style={{ margin: "10px 0" }}>
          Bitacora de crecimiento personal
        </h3>
        <p className="story">
          Reflexiona sobre el proceso de aprendizaje. El error se convierte en
          motor de mejora y pensamiento critico.
        </p>
        <form
          className="grid"
          style={{ gridTemplateColumns: "1fr 1fr", marginTop: "10px" }}
          onSubmit={handleSubmit}
        >
          <label
            className="card"
            style={{ background: "rgba(24, 31, 56, 0.5)" }}
          >
            ¿Que hice?
            <textarea
              name="hice"
              required
              value={form.hice}
              onChange={(event) =>
                setForm((current) => ({ ...current, hice: event.target.value }))
              }
              style={{ width: "100%", minHeight: "100px", marginTop: "6px" }}
            />
          </label>
          <label
            className="card"
            style={{ background: "rgba(24, 31, 56, 0.5)" }}
          >
            ¿Que salio mal?
            <textarea
              name="mal"
              required
              value={form.mal}
              onChange={(event) =>
                setForm((current) => ({ ...current, mal: event.target.value }))
              }
              style={{ width: "100%", minHeight: "100px", marginTop: "6px" }}
            />
          </label>
          <label
            className="card"
            style={{
              gridColumn: "1 / -1",
              background: "rgba(24, 31, 56, 0.5)",
            }}
          >
            ¿Como mejorarlo?
            <textarea
              name="mejorar"
              required
              value={form.mejorar}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  mejorar: event.target.value,
                }))
              }
              style={{ width: "100%", minHeight: "100px", marginTop: "6px" }}
            />
          </label>
          <button className="mission-btn" type="submit">
            Guardar reflexion
          </button>
        </form>
        <div
          className="scroll"
          id="reflection-log"
          style={{ marginTop: "10px" }}
        >
          {entries.map((entry, index) => (
            <article className="mini" key={`${entry.hice}-${index}`}>
              <strong>Bitacora guardada</strong>
              <br />
              <small>Que hice:</small> {entry.hice}
              <br />
              <small>Que salio mal:</small> {entry.mal}
              <br />
              <small>Como mejorarlo:</small> {entry.mejorar}
            </article>
          ))}
        </div>
        <p style={{ marginTop: "10px" }}>
          <span className="badge">Insignia: El Error Fertil</span>
        </p>
      </article>
    </section>
  );
}

export function FinalSection({ onOpenModal }) {
  return (
    <section id="act5" className="page">
      <article className="card glass mission">
        <span className="badge">ACTIVIDAD 5 - La Gran Prueba del Heroe</span>
        <h3 className="title-font" style={{ margin: "10px 0" }}>
          Torneo final y ceremonia epica
        </h3>
        <div className="cards-row">
          <div className="mini">Ronda 1: Preguntas conceptuales</div>
          <div className="mini">Ronda 2: Resolucion cooperativa</div>
          <div className="mini">Ronda 3: Exposicion oral</div>
        </div>
        <div
          className="grid"
          style={{ gridTemplateColumns: "1fr 1fr", marginTop: "12px" }}
        >
          <div className="card" style={{ background: "rgba(9, 13, 33, 0.75)" }}>
            <h4 style={{ marginTop: 0 }}>Podio animado</h4>
            <div className="podium">
              {finalPodium.map((step) => (
                <div
                  key={step.name}
                  className="podium-step"
                  style={{
                    height: `${step.height}px`,
                    background: step.background,
                  }}
                >
                  {step.place} {step.name}
                </div>
              ))}
            </div>
            <p style={{ marginTop: "10px" }}>
              Trofeos, emblemas y medallas entregados en la ceremonia final.
            </p>
          </div>
          <div className="card" style={{ background: "rgba(9, 13, 33, 0.75)" }}>
            <h4 style={{ marginTop: 0 }}>Ranking definitivo</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Heroe/Escuadron</th>
                  <th>Puntaje final</th>
                </tr>
              </thead>
              <tbody>
                {finalRanking.map((team) => (
                  <tr key={team.name}>
                    <td>{team.name}</td>
                    <td>{team.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="mission-btn"
              type="button"
              style={{ marginTop: "8px" }}
              onClick={() => onOpenModal("modalFinal")}
            >
              Abrir ceremonia final
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}
