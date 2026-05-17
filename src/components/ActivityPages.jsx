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

function Activity0({ onOpenModal }) {
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
          <div className="cards-row" style={{ marginTop: 10 }}>
            <div className="mini">🧭 Escuadrones</div>
            <div className="mini">📚 Libro de Heroes</div>
            <div className="mini">🥇 Ranking</div>
            <div className="mini">🎖️ Insignias</div>
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
            style={{ marginTop: 12 }}
            onClick={() => onOpenModal("modalStart")}
          >
            Iniciar aventura
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

function Activity1({ onGainXp, charts }) {
  return (
    <section id="act1" className="page active">
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
          <div className="mini">
            <strong>Nivel 1</strong>
            <br />
            Posicion y referencia espacial
          </div>
          <div className="mini">
            <strong>Nivel 2</strong>
            <br />
            Desplazamiento y direccion
          </div>
          <div className="mini">
            <strong>Nivel 3</strong>
            <br />
            Velocidad media y analisis
          </div>
        </div>
        <div
          className="grid"
          style={{ gridTemplateColumns: "1fr 1fr", marginTop: 10 }}
        >
          <div
            className="card"
            style={{
              background: "rgba(5, 9, 24, 0.7)",
              border: "1px solid rgba(49, 231, 255, 0.2)",
            }}
          >
            <h4 style={{ marginTop: 0 }}>Graficas x-t animadas</h4>
            <ChartCanvas
              canvasId="chart-xt"
              points={charts.xt}
              color="#31e7ff"
              width={400}
              height={180}
              className="chart-surface"
            />
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
            <button className="mission-btn" onClick={() => onGainXp(80)}>
              Completar Nivel 1-3 (+80 XP)
            </button>
            <p style={{ marginTop: 10 }}>
              <span className="badge">Insignia: Explorador del Movimiento</span>
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

function Activity2({
  onGainXp,
  teams,
  timer,
  onStartTimer,
  onStopTimer,
  onResetTimer,
  charts,
}) {
  return (
    <section id="act2" className="page active">
      <article className="card glass mission">
        <span className="badge">
          ACTIVIDAD 2 - La Carrera de los Escuadrones
        </span>
        <h3 className="title-font" style={{ margin: "10px 0" }}>
          Torneo cooperativo de Cinematica aplicada
        </h3>
        <div className="cards-row">
          <div className="mini">🧑‍✈️ Capitan</div>
          <div className="mini">⏱️ Cronometrador</div>
          <div className="mini">📝 Escriba</div>
          <div className="mini">🎤 Portavoz</div>
        </div>
        <div
          className="grid"
          style={{ gridTemplateColumns: "1fr 1fr", marginTop: 10 }}
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
              <tbody>
                {teams.map((team) => (
                  <tr key={team.name}>
                    <td>{team.name}</td>
                    <td>{team.score}</td>
                    <td>
                      <div
                        style={{
                          height: 8,
                          background: "#18294e",
                          borderRadius: 999,
                        }}
                      >
                        <div
                          style={{
                            height: 8,
                            width: `${team.score}%`,
                            background:
                              "linear-gradient(90deg,#31e7ff,#f4c86c)",
                            borderRadius: 999,
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
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
              {timer}
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button className="mission-btn" onClick={onStartTimer}>
                Iniciar
              </button>
              <button className="mission-btn" onClick={onStopTimer}>
                Pausar
              </button>
              <button className="mission-btn" onClick={onResetTimer}>
                Reiniciar
              </button>
            </div>
            <ChartCanvas
              canvasId="chart-vt"
              points={charts.vt}
              color="#f4c86c"
              width={400}
              height={160}
              className="chart-surface chart-surface--compact"
            />
          </div>
        </div>
      </article>
    </section>
  );
}

function Activity3({ onOpenModal, onGainXp }) {
  return (
    <section id="act3" className="page active">
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
          style={{ gridTemplateColumns: "1fr 1fr", marginTop: 10 }}
        >
          <div
            className="card"
            style={{
              background: "rgba(8, 15, 32, 0.78)",
              border: "1px solid rgba(49, 231, 255, 0.2)",
            }}
          >
            <h4 style={{ marginTop: 0 }}>Area de prototipos</h4>
            <div className="soft-zone card" style={{ minHeight: 160 }}>
              Espacio para mostrar prototipos, fotos o bocetos del sistema
              mecanico.
            </div>
            <button
              className="mission-btn"
              style={{ marginTop: 8 }}
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
              <li>+40 XP por DCL correcto</li>
              <li>+60 XP por sistema funcional</li>
              <li>+30 XP por sustentacion</li>
            </ul>
            <button className="mission-btn" onClick={() => onGainXp(130)}>
              Reclamar recompensas
            </button>
            <p style={{ marginTop: 8 }}>
              <span className="badge">Insignia: Mente de Ingeniero</span>
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

function Activity4({ reflections, onSubmitReflection }) {
  const [formValues, setFormValues] = useState({
    hice: "",
    mal: "",
    mejorar: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmitReflection(formValues);
    setFormValues({ hice: "", mal: "", mejorar: "" });
  };

  return (
    <section id="act4" className="page active">
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
          style={{ gridTemplateColumns: "1fr 1fr", marginTop: 10 }}
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
              style={{ width: "100%", minHeight: 100, marginTop: 6 }}
              value={formValues.hice}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  hice: event.target.value,
                }))
              }
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
              style={{ width: "100%", minHeight: 100, marginTop: 6 }}
              value={formValues.mal}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  mal: event.target.value,
                }))
              }
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
              style={{ width: "100%", minHeight: 100, marginTop: 6 }}
              value={formValues.mejorar}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  mejorar: event.target.value,
                }))
              }
            />
          </label>
          <button className="mission-btn" type="submit">
            Guardar reflexion
          </button>
        </form>
        <div className="scroll" id="reflection-log" style={{ marginTop: 10 }}>
          {reflections.map((entry, index) => (
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
        <p style={{ marginTop: 10 }}>
          <span className="badge">Insignia: El Error Fertil</span>
        </p>
      </article>
    </section>
  );
}

function Activity5({ onOpenModal }) {
  return (
    <section id="act5" className="page active">
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
          style={{ gridTemplateColumns: "1fr 1fr", marginTop: 12 }}
        >
          <div className="card" style={{ background: "rgba(9, 13, 33, 0.75)" }}>
            <h4 style={{ marginTop: 0 }}>Podio animado</h4>
            <div className="podium">
              <div
                className="podium-step"
                style={{ height: 90, background: "#cdd8ef" }}
              >
                🥈 Escuadron Beta
              </div>
              <div
                className="podium-step"
                style={{
                  height: 120,
                  background: "linear-gradient(180deg, #ffe8aa, #f4c86c)",
                }}
              >
                🥇 Escuadron Alfa
              </div>
              <div
                className="podium-step"
                style={{ height: 70, background: "#d9a775" }}
              >
                🥉 Escuadron Gamma
              </div>
            </div>
            <p style={{ marginTop: 10 }}>
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
                <tr>
                  <td>Alfa</td>
                  <td>980</td>
                </tr>
                <tr>
                  <td>Beta</td>
                  <td>910</td>
                </tr>
                <tr>
                  <td>Gamma</td>
                  <td>870</td>
                </tr>
              </tbody>
            </table>
            <button
              className="mission-btn"
              style={{ marginTop: 8 }}
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

export default function ActivityPages({
  activePage,
  onOpenModal,
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
    <>
      <div
        className={activePage === "act0" ? "page active" : "page"}
        style={{ display: activePage === "act0" ? "block" : "none" }}
      >
        <Activity0 onOpenModal={onOpenModal} />
      </div>
      <div
        className={activePage === "act1" ? "page active" : "page"}
        style={{ display: activePage === "act1" ? "block" : "none" }}
      >
        <Activity1 onGainXp={onGainXp} charts={charts} />
      </div>
      <div
        className={activePage === "act2" ? "page active" : "page"}
        style={{ display: activePage === "act2" ? "block" : "none" }}
      >
        <Activity2
          teams={teams}
          timer={timer}
          onStartTimer={onStartTimer}
          onStopTimer={onStopTimer}
          onResetTimer={onResetTimer}
          charts={charts}
        />
      </div>
      <div
        className={activePage === "act3" ? "page active" : "page"}
        style={{ display: activePage === "act3" ? "block" : "none" }}
      >
        <Activity3 onOpenModal={onOpenModal} onGainXp={onGainXp} />
      </div>
      <div
        className={activePage === "act4" ? "page active" : "page"}
        style={{ display: activePage === "act4" ? "block" : "none" }}
      >
        <Activity4
          reflections={reflections}
          onSubmitReflection={onSubmitReflection}
        />
      </div>
      <div
        className={activePage === "act5" ? "page active" : "page"}
        style={{ display: activePage === "act5" ? "block" : "none" }}
      >
        <Activity5 onOpenModal={onOpenModal} />
      </div>
    </>
  );
}
