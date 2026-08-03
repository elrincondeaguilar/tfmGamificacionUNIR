import { useState, useEffect } from "react";
import ChartCanvas from "./ChartCanvas";
import Activity2Battle from "./Activity2Battle";
import { gameConfig, finalPodium, finalRanking } from "../data/gameData";
import { getRankName } from "../utils/gameUtils";

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

function Activity0({ onMissionClick, onOpenBadges, completed, leaderboard }) {
  const [activePanel, setActivePanel] = useState(null);

  const registeredUsers = leaderboard ?? [];

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
            <div
              className={`mini mini--clickable ${
                activePanel === "escuadrones" ? "mini--selected" : ""
              }`}
              role="button"
              tabIndex={0}
              onClick={() =>
                setActivePanel((current) =>
                  current === "escuadrones" ? null : "escuadrones",
                )
              }
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActivePanel((current) =>
                    current === "escuadrones" ? null : "escuadrones",
                  );
                }
              }}
            >
              🧭 Escuadrones
            </div>
            <a
              href="https://drive.google.com/file/d/19LneXeAXTaDeHTs1nBllwsOSvuYQxG_5/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="mini mini--clickable"
              title="Abrir el Libro de Heroes"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              📚 Libro de Heroes
            </a>
            <div
              className={`mini mini--clickable ${
                activePanel === "ranking" ? "mini--selected" : ""
              }`}
              role="button"
              tabIndex={0}
              onClick={() =>
                setActivePanel((current) =>
                  current === "ranking" ? null : "ranking",
                )
              }
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActivePanel((current) =>
                    current === "ranking" ? null : "ranking",
                  );
                }
              }}
            >
              🥇 Ranking
            </div>
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
            {activePanel === "escuadrones" ? (
              <div className="parchment" style={{ marginTop: 12 }}>
                <strong>Escuadrones registrados</strong>
                {registeredUsers.length > 0 ? (
                  <div className="registered-list">
                    {registeredUsers.map((user) => (
                      <div key={user.email} className="registered-list__item">
                        <div>
                          <strong>{user.nombre}</strong>
                          <p>
                            {user.heroe || "Sin héroe"} · {user.email}
                          </p>
                        </div>
                        <span>{user.xp} XP</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ margin: "6px 0 0" }}>
                    Todavía no hay personas registradas.
                  </p>
                )}
              </div>
            ) : null}
            {activePanel === "ranking" ? (
              <div className="parchment" style={{ marginTop: 12 }}>
                <strong>Ranking global</strong>
                {registeredUsers.length > 0 ? (
                  <div className="ranking-summary">
                    {registeredUsers.map((user) => (
                      <div key={user.email} className="ranking-summary__item">
                        <div>
                          <strong>
                            #{user.position} {user.nombre}
                          </strong>
                          <p>{user.ranking}</p>
                        </div>
                        <span>{user.xp} XP</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ margin: "6px 0 0" }}>
                    Todavía no hay ranking disponible.
                  </p>
                )}
              </div>
            ) : null}
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

function Activity1({ onGainXp, xp }) {
  const [claimedReward, setClaimedReward] = useState(null);
  const detectedRank = getRankName(xp, gameConfig);
  const availableReward =
    detectedRank === "Aprendiz"
      ? { level: "Nivel 1", amount: 20 }
      : detectedRank === "Explorador"
        ? { level: "Nivel 2", amount: 35 }
        : { level: "Nivel 3", amount: 50 };

  function handleClaimLevelReward(level, amount) {
    if (claimedReward) {
      return;
    }

    onGainXp(amount);
    setClaimedReward({
      level,
      amount,
      nextRank: getRankName(xp + amount, gameConfig),
    });
  }

  const [geniallyDone, setGeniallyDone] = useState(false);

  useEffect(() => {
    function onMessage(e) {
      try {
        // Accept explicit messages or simple string markers
        if (
          (e.origin && e.origin.includes("view.genially.com")) ||
          e.data === "geniallyComplete" ||
          (e.data && e.data.type === "geniallyComplete")
        ) {
          setGeniallyDone(true);
        }
      } catch (err) {
        // ignore
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <section id="act1" className="page active">
      <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
        <article className="card glass mission">
          <span className="badge">ACTIVIDAD 1 - Proxima mision</span>
          <h3 className="title-font" style={{ margin: "10px 0" }}>
            El misterio del heroe desaparecido sigue sin resolverse, y nuevas
            pistas te esperan dentro de la Academia.
          </h3>
          <div style={{ width: "100%", marginTop: 12 }}>
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                paddingTop: 0,
                height: 0,
              }}
            >
              <iframe
                title="Bosque Cinematico"
                frameBorder="0"
                width="1200"
                height="675"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                src="https://view.genially.com/6a10de4990e4c7327bfc37bd"
                type="text/html"
                allowScriptAccess="always"
                allowFullScreen
                scrolling="yes"
                allowNetworking="all"
              />
            </div>
          </div>
          <div className="parchment" style={{ marginTop: 16 }}>
            <strong>Finalizar actividad y sumar XP</strong>
            <p style={{ margin: "6px 0 10px" }}>
              Tu opcion disponible depende del rango detectado automaticamente.
            </p>
            <p style={{ margin: "0 0 10px" }}>
              Nivel detectado automaticamente: <strong>{detectedRank}</strong>
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {/* Show reward button only after Genially signals completion */}
              {geniallyDone ? (
                <button
                  className="mission-btn"
                  type="button"
                  disabled={Boolean(claimedReward)}
                  onClick={() =>
                    handleClaimLevelReward(
                      availableReward.level,
                      availableReward.amount,
                    )
                  }
                >
                  {availableReward.level} (+{availableReward.amount} XP)
                </button>
              ) : (
                <button
                  className="mission-btn"
                  type="button"
                  onClick={() => setGeniallyDone(true)}
                  title="Marcar actividad como finalizada manualmente"
                >
                  Marcar como completada
                </button>
              )}
            </div>
            {claimedReward ? (
              <p style={{ margin: "10px 0 0" }}>
                Recompensa aplicada por {claimedReward.level} (+
                {claimedReward.amount} XP). Rango actual:{" "}
                {claimedReward.nextRank}.
              </p>
            ) : null}
          </div>
        </article>
      </div>
    </section>
  );
}

const ERROR_FERTIL_KEY = "errorFertilFichas";
const ERROR_FERTIL_BADGE = "error_fértil";
const ERROR_FERTIL_XP = 10;
const ERROR_FERTIL_META = 3;

const errorFertilQuestions = [
  {
    id: "hice",
    label: "1. ¿Que hice?",
    placeholder: "Describe el procedimiento que seguiste en la mision.",
  },
  {
    id: "mal",
    label: "2. ¿Que salio mal y por que?",
    placeholder: "Identifica el concepto de fisica que aplicaste mal.",
  },
  {
    id: "diferente",
    label: "3. ¿Como lo haria diferente?",
    placeholder: "Explica la estrategia que usarias la proxima vez.",
  },
  {
    id: "correccion",
    label: "4. Correccion del ejercicio",
    placeholder: "Resuelve de nuevo el ejercicio con el concepto corregido.",
  },
];

const emptyFicha = { hice: "", mal: "", diferente: "", correccion: "" };

function ErrorFertilFicha({ onGainXp, onEarnBadge }) {
  const [answers, setAnswers] = useState(emptyFicha);
  const [fichas, setFichas] = useState(() => {
    try {
      const stored = localStorage.getItem(ERROR_FERTIL_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(ERROR_FERTIL_KEY, JSON.stringify(fichas));
    } catch {
      // almacenamiento no disponible: la ficha sigue viva en memoria
    }
  }, [fichas]);

  const complete = errorFertilQuestions.every(
    (question) => answers[question.id].trim().length >= 15,
  );

  function handleChange(id, value) {
    setAnswers((current) => ({ ...current, [id]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!complete) {
      return;
    }

    const nextFichas = [...fichas, answers];
    setFichas(nextFichas);
    setAnswers(emptyFicha);
    onGainXp(ERROR_FERTIL_XP);

    if (nextFichas.length === ERROR_FERTIL_META) {
      onEarnBadge(ERROR_FERTIL_BADGE);
      setFeedback(
        `Ficha ${nextFichas.length} enviada (+${ERROR_FERTIL_XP} XP). ¡Desbloqueaste la insignia "El Error Fertil"!`,
      );
      return;
    }

    setFeedback(
      `Ficha ${nextFichas.length} enviada (+${ERROR_FERTIL_XP} XP). Faltan ${
        Math.max(0, ERROR_FERTIL_META - nextFichas.length)
      } para la insignia "El Error Fertil".`,
    );
  }

  return (
    <article className="card glass mission" style={{ marginTop: 16 }}>
      <span className="badge">MECANISMO TRANSVERSAL - El Error Fertil</span>
      <h3 className="title-font" style={{ margin: "10px 0" }}>
        Convierte tu error en evidencia de aprendizaje
      </h3>
      <p className="story">
        Si una mision quedo calificada con menos XP de los esperados, completa
        esta ficha del Libro de Heroes. El docente la revisa antes de la
        siguiente sesion: si es reflexiva y honesta, otorga +{ERROR_FERTIL_XP}{" "}
        XP. Con {ERROR_FERTIL_META} fichas reflexivas ganas la insignia "El
        Error Fertil". Tiempo estimado: 15-20 minutos.
      </p>

      <div className="parchment" style={{ marginTop: 12 }}>
        <strong>
          Fichas completadas: {fichas.length}/{ERROR_FERTIL_META}
        </strong>
        <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
          {errorFertilQuestions.map((question) => (
            <label
              key={question.id}
              style={{ display: "block", marginBottom: 12 }}
            >
              <span style={{ display: "block", marginBottom: 6 }}>
                {question.label}
              </span>
              <textarea
                value={answers[question.id]}
                onChange={(event) =>
                  handleChange(question.id, event.target.value)
                }
                placeholder={question.placeholder}
                rows={3}
                style={{
                  width: "100%",
                  padding: 10,
                  borderRadius: 6,
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  background: "rgba(255, 255, 255, 0.08)",
                  color: "inherit",
                  font: "inherit",
                  resize: "vertical",
                }}
              />
            </label>
          ))}
          <button className="mission-btn" type="submit" disabled={!complete}>
            Enviar ficha al docente (+{ERROR_FERTIL_XP} XP)
          </button>
          {!complete ? (
            <p style={{ margin: "8px 0 0", opacity: 0.8 }}>
              Responde las cuatro preguntas con al menos una frase cada una.
            </p>
          ) : null}
          {feedback ? (
            <p style={{ margin: "10px 0 0", color: "#90EE90" }}>{feedback}</p>
          ) : null}
        </form>
      </div>

      {fichas.length > 0 ? (
        <div className="parchment" style={{ marginTop: 12 }}>
          <strong>Historial de fichas</strong>
          {fichas.map((ficha, index) => (
            <AccordionItem key={index} title={`Ficha ${index + 1}`}>
              {errorFertilQuestions.map((question) => (
                <p key={question.id} style={{ margin: "6px 0" }}>
                  <strong>{question.label}</strong>
                  <br />
                  {ficha[question.id]}
                </p>
              ))}
            </AccordionItem>
          ))}
        </div>
      ) : null}
    </article>
  );
}

function Activity3({ onGainXp, onEarnBadge, xp }) {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [claimedReward, setClaimedReward] = useState(false);

  function handleFileUpload(event) {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
      ];
      if (validTypes.includes(file.type)) {
        setFileUploaded(true);
      } else {
        alert("Por favor sube un PDF o una imagen (JPG, PNG)");
      }
    }
  }

  function handleClaimReward() {
    if (claimedReward) return;

    onGainXp(80);
    onEarnBadge("mente_de_ingeniero");
    setClaimedReward(true);
  }

  return (
    <section id="act3" className="page active">
      <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
        <article className="card glass mission">
          <span className="badge">ACTIVIDAD 3 - Desafío de Ingeniería</span>
          <h3 className="title-font" style={{ margin: "10px 0" }}>
            Demuestra tu pensamiento de ingeniero diseñando una solución
            innovadora
          </h3>
          <div style={{ width: "100%", marginTop: 12 }}>
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                paddingTop: 0,
                height: 0,
              }}
            >
              <iframe
                title="Desafío de Ingeniería"
                frameBorder="0"
                width="1200"
                height="675"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                src="https://view.genially.com/6a56710bcd6c1a917ee86511"
                type="text/html"
                allowScriptAccess="always"
                allowFullScreen
                scrolling="yes"
                allowNetworking="all"
              />
            </div>
          </div>
          <div className="parchment" style={{ marginTop: 16 }}>
            <strong>Sube tu solución y obtén recompensas</strong>
            <p style={{ margin: "6px 0 10px" }}>
              Completa la presentación y sube una foto o PDF de tu solución.
            </p>
            <div style={{ marginBottom: 16 }}>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                style={{
                  padding: "10px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              />
              {fileUploaded && (
                <p style={{ margin: "8px 0 0", color: "#90EE90" }}>
                  ✓ Archivo cargado correctamente
                </p>
              )}
            </div>
            {fileUploaded && !claimedReward ? (
              <button
                className="mission-btn"
                type="button"
                onClick={handleClaimReward}
              >
                Reclamar Recompensa (+80 XP + Insignia)
              </button>
            ) : claimedReward ? (
              <p style={{ margin: "10px 0 0", color: "#90EE90" }}>
                ✓ ¡Felicidades! Has ganado 80 XP y la insignia "Mente de
                Ingeniero"
              </p>
            ) : null}
          </div>
        </article>
      </div>
    </section>
  );
}

function Activity4({ onGainXp, onEarnBadge }) {
  return (
    <section id="act4" className="page active">
      <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
        <ErrorFertilFicha onGainXp={onGainXp} onEarnBadge={onEarnBadge} />
      </div>
    </section>
  );
}

const TORNEO_LETTER_KEY = "cartaAlYoAprendiz";
const TORNEO_LEGENDARY_BADGE = "legendaria";
const TORNEO_MAX_XP = 150;

const ronda1Questions = [
  {
    id: "cinematica",
    topic: "Cinematica",
    question:
      "Un heroe recorre 60 m en 12 s en linea recta y a velocidad constante. ¿Cual es su rapidez?",
    options: ["2 m/s", "5 m/s", "12 m/s", "72 m/s"],
    correct: "5 m/s",
  },
  {
    id: "dinamica",
    topic: "Dinamica",
    question:
      "Segun la segunda ley de Newton, si duplicas la fuerza neta sobre un objeto de masa constante, su aceleracion...",
    options: [
      "Se mantiene igual",
      "Se duplica",
      "Se reduce a la mitad",
      "Se anula",
    ],
    correct: "Se duplica",
  },
  {
    id: "energia",
    topic: "Energia",
    question:
      "Un objeto en caida libre pierde altura. En ausencia de friccion, ¿que ocurre con su energia mecanica total?",
    options: [
      "Se conserva",
      "Aumenta",
      "Disminuye",
      "Se convierte solo en calor",
    ],
    correct: "Se conserva",
  },
];

const ronda1MaxXp = ronda1Questions.length * 10;
const ronda2MaxXp = 70;
const ronda3MaxXp = 50;

const ronda3Checklist = [
  "La aplicacion describe una situacion fisica real (no inventada).",
  "El equipo explico el concepto de fisica involucrado con claridad.",
  "La presentacion respeto el tiempo de 5 minutos por equipo.",
];

function TorneoFinal({ xp, onGainXp, onEarnBadge }) {
  const [answers, setAnswers] = useState({});
  const [ronda1Submitted, setRonda1Submitted] = useState(false);
  const [ronda1Xp, setRonda1Xp] = useState(0);

  const [squad, setSquad] = useState("");
  const [ronda2Solution, setRonda2Solution] = useState("");
  const [ronda2Submitted, setRonda2Submitted] = useState(false);

  const [oralTitle, setOralTitle] = useState("");
  const [oralDescription, setOralDescription] = useState("");
  const [oralChecklist, setOralChecklist] = useState(
    ronda3Checklist.map(() => false),
  );
  const [ronda3Submitted, setRonda3Submitted] = useState(false);

  const [letter, setLetter] = useState("");
  const [letterSent, setLetterSent] = useState(() => {
    try {
      return Boolean(localStorage.getItem(TORNEO_LETTER_KEY));
    } catch {
      return false;
    }
  });

  function handleSelectAnswer(questionId, option) {
    if (ronda1Submitted) return;
    setAnswers((current) => ({ ...current, [questionId]: option }));
  }

  function handleSubmitRonda1(event) {
    event.preventDefault();
    if (ronda1Submitted) return;
    if (Object.keys(answers).length < ronda1Questions.length) return;

    const correctCount = ronda1Questions.reduce(
      (count, question) =>
        answers[question.id] === question.correct ? count + 1 : count,
      0,
    );
    const earned = correctCount * 10;

    setRonda1Xp(earned);
    setRonda1Submitted(true);
    onGainXp(earned);
  }

  const ronda2Ready = squad !== "" && ronda2Solution.trim().length >= 30;

  function handleSubmitRonda2(event) {
    event.preventDefault();
    if (ronda2Submitted || !ronda2Ready) return;

    setRonda2Submitted(true);
    onGainXp(ronda2MaxXp);
  }

  function toggleChecklistItem(index) {
    if (ronda3Submitted) return;
    setOralChecklist((current) =>
      current.map((checked, itemIndex) =>
        itemIndex === index ? !checked : checked,
      ),
    );
  }

  const ronda3Ready =
    oralTitle.trim().length > 0 &&
    oralDescription.trim().length >= 20 &&
    oralChecklist.every(Boolean);

  function handleSubmitRonda3(event) {
    event.preventDefault();
    if (ronda3Submitted || !ronda3Ready) return;

    setRonda3Submitted(true);
    onGainXp(ronda3MaxXp);
  }

  const torneoXp =
    (ronda1Submitted ? ronda1Xp : 0) +
    (ronda2Submitted ? ronda2MaxXp : 0) +
    (ronda3Submitted ? ronda3MaxXp : 0);
  const torneoCompleto = ronda1Submitted && ronda2Submitted && ronda3Submitted;

  const xpPercent = Math.min(100, (xp / gameConfig.maxXP) * 100);
  const torneoPercent = Math.min(100, (torneoXp / TORNEO_MAX_XP) * 100);
  const notaCien = xpPercent * 0.3 + torneoPercent * 0.7;
  const notaEscala5 = (notaCien / 100) * 5;

  const eliteSquads = [...gameConfig.teams]
    .sort((left, right) => right.score - left.score)
    .slice(0, 3);

  function handleSendLetter(event) {
    event.preventDefault();
    if (letterSent || letter.trim().length < 40) return;

    try {
      localStorage.setItem(TORNEO_LETTER_KEY, letter);
    } catch {
      // almacenamiento no disponible: la carta sigue viva en memoria
    }

    setLetterSent(true);
    onEarnBadge(TORNEO_LEGENDARY_BADGE);
  }

  return (
    <section id="act5" className="page active">
      <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
        <article className="card glass mission">
          <span className="badge">ACTIVIDAD 5 - Torneo Final</span>
          <h3 className="title-font" style={{ margin: "10px 0" }}>
            La Gran Prueba del Heroe
          </h3>
          <p className="story">
            Ha llegado el momento de la verdad. La Gran Prueba del Heroe
            determinara quien ha alcanzado el rango de Maestro Heroe y guiara
            a las generaciones futuras de la Academia. El Torneo integra los
            XP acumulados durante el proyecto (30%) y el desempeno en el
            Torneo (70%) para conformar la nota final del periodo.
          </p>
        </article>

        <article className="card glass mission" style={{ marginTop: 16 }}>
          <span className="badge">
            RONDA 1 - Preguntas conceptuales (individual, 15 min)
          </span>
          <form onSubmit={handleSubmitRonda1} style={{ marginTop: 12 }}>
            {ronda1Questions.map((question) => (
              <div key={question.id} className="parchment" style={{ marginBottom: 12 }}>
                <strong>{question.topic}</strong>
                <p style={{ margin: "6px 0" }}>{question.question}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {question.options.map((option) => {
                    const isSelected = answers[question.id] === option;
                    const showResult = ronda1Submitted;
                    const isCorrectOption = option === question.correct;

                    return (
                      <button
                        key={option}
                        type="button"
                        className="mini mini--clickable"
                        style={{
                          border: showResult
                            ? isCorrectOption
                              ? "2px solid #90EE90"
                              : isSelected
                                ? "2px solid #f28b82"
                                : undefined
                            : isSelected
                              ? "2px solid #ffc107"
                              : undefined,
                          cursor: ronda1Submitted ? "default" : "pointer",
                        }}
                        onClick={() => handleSelectAnswer(question.id, option)}
                        disabled={ronda1Submitted}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <button
              className="mission-btn"
              type="submit"
              disabled={
                ronda1Submitted ||
                Object.keys(answers).length < ronda1Questions.length
              }
            >
              Enviar respuestas (hasta {ronda1MaxXp} XP)
            </button>
            {ronda1Submitted ? (
              <p style={{ margin: "10px 0 0", color: "#90EE90" }}>
                ✓ Ronda 1 completada: +{ronda1Xp} XP.
              </p>
            ) : null}
          </form>
        </article>

        <article className="card glass mission" style={{ marginTop: 16 }}>
          <span className="badge">
            RONDA 2 - Problema cooperativo por escuadrones (25 min)
          </span>
          <form onSubmit={handleSubmitRonda2} style={{ marginTop: 12 }}>
            <label style={{ display: "block", marginBottom: 12 }}>
              <span style={{ display: "block", marginBottom: 6 }}>
                Escuadron
              </span>
              <select
                value={squad}
                onChange={(event) => setSquad(event.target.value)}
                disabled={ronda2Submitted}
                style={{
                  padding: 10,
                  borderRadius: 6,
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  background: "rgba(255, 255, 255, 0.08)",
                  color: "inherit",
                  font: "inherit",
                }}
              >
                <option value="" style={{ color: "#1a1a1a", background: "#fff" }}>
                  Selecciona tu escuadron
                </option>
                {gameConfig.teams.map((team) => (
                  <option
                    key={team.name}
                    value={team.name}
                    style={{ color: "#1a1a1a", background: "#fff" }}
                  >
                    {team.name}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ display: "block", marginBottom: 12 }}>
              <span style={{ display: "block", marginBottom: 6 }}>
                Solucion del problema cooperativo
              </span>
              <textarea
                value={ronda2Solution}
                onChange={(event) => setRonda2Solution(event.target.value)}
                placeholder="Describe el procedimiento, calculos y conclusion acordada por el escuadron."
                rows={4}
                disabled={ronda2Submitted}
                style={{
                  width: "100%",
                  padding: 10,
                  borderRadius: 6,
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  background: "rgba(255, 255, 255, 0.08)",
                  color: "inherit",
                  font: "inherit",
                  resize: "vertical",
                }}
              />
            </label>
            <button
              className="mission-btn"
              type="submit"
              disabled={ronda2Submitted || !ronda2Ready}
            >
              Entregar solucion (+{ronda2MaxXp} XP)
            </button>
            {ronda2Submitted ? (
              <p style={{ margin: "10px 0 0", color: "#90EE90" }}>
                ✓ Ronda 2 completada: +{ronda2MaxXp} XP.
              </p>
            ) : null}
          </form>
        </article>

        <article className="card glass mission" style={{ marginTop: 16 }}>
          <span className="badge">
            RONDA 3 - Aplicacion epica (presentacion oral, 5 min por equipo)
          </span>
          <form onSubmit={handleSubmitRonda3} style={{ marginTop: 12 }}>
            <label style={{ display: "block", marginBottom: 12 }}>
              <span style={{ display: "block", marginBottom: 6 }}>
                Situacion fisica real
              </span>
              <input
                type="text"
                value={oralTitle}
                onChange={(event) => setOralTitle(event.target.value)}
                placeholder="Ej: El frenado de una bicicleta al bajar una loma"
                disabled={ronda3Submitted}
                style={{
                  width: "100%",
                  padding: 10,
                  borderRadius: 6,
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  background: "rgba(255, 255, 255, 0.08)",
                  color: "inherit",
                  font: "inherit",
                }}
              />
            </label>
            <label style={{ display: "block", marginBottom: 12 }}>
              <span style={{ display: "block", marginBottom: 6 }}>
                Explicacion del concepto fisico aplicado
              </span>
              <textarea
                value={oralDescription}
                onChange={(event) => setOralDescription(event.target.value)}
                placeholder="Explica que conceptos de cinematica, dinamica o energia estan presentes."
                rows={3}
                disabled={ronda3Submitted}
                style={{
                  width: "100%",
                  padding: 10,
                  borderRadius: 6,
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  background: "rgba(255, 255, 255, 0.08)",
                  color: "inherit",
                  font: "inherit",
                  resize: "vertical",
                }}
              />
            </label>
            <div style={{ marginBottom: 12 }}>
              <span style={{ display: "block", marginBottom: 6 }}>
                Autoevaluacion de la presentacion
              </span>
              {ronda3Checklist.map((item, index) => (
                <label
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 6,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={oralChecklist[index]}
                    onChange={() => toggleChecklistItem(index)}
                    disabled={ronda3Submitted}
                  />
                  {item}
                </label>
              ))}
            </div>
            <button
              className="mission-btn"
              type="submit"
              disabled={ronda3Submitted || !ronda3Ready}
            >
              Presentar ante el jurado (+{ronda3MaxXp} XP)
            </button>
            {ronda3Submitted ? (
              <p style={{ margin: "10px 0 0", color: "#90EE90" }}>
                ✓ Ronda 3 completada: +{ronda3MaxXp} XP.
              </p>
            ) : null}
          </form>
        </article>

        {torneoCompleto ? (
          <article className="card glass mission" style={{ marginTop: 16 }}>
            <span className="badge">CEREMONIA - Cierre del proyecto</span>
            <h3 className="title-font" style={{ margin: "10px 0" }}>
              Ceremonia del Maestro Heroe
            </h3>

            <div className="parchment" style={{ marginTop: 12 }}>
              <strong>Nota final del periodo</strong>
              <p style={{ margin: "6px 0 0" }}>
                XP acumulado (30%): {Math.round(xpPercent)}% · Desempeno en el
                Torneo (70%): {Math.round(torneoPercent)}% de {TORNEO_MAX_XP}{" "}
                XP posibles ({torneoXp} XP obtenidos).
              </p>
              <p style={{ margin: "6px 0 0", fontSize: "1.3em" }}>
                <strong>
                  {notaCien.toFixed(1)}/100 · {notaEscala5.toFixed(1)}/5.0
                </strong>
              </p>
            </div>

            <div className="parchment" style={{ marginTop: 12 }}>
              <strong>Actualizacion definitiva del Ranking de Heroes</strong>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 16,
                  marginTop: 12,
                  minHeight: 140,
                }}
              >
                {finalPodium.map((squadPodium) => (
                  <div
                    key={squadPodium.name}
                    style={{
                      textAlign: "center",
                      flex: 1,
                    }}
                  >
                    <div style={{ marginBottom: 6 }}>{squadPodium.place}</div>
                    <div
                      style={{
                        height: squadPodium.height,
                        background: squadPodium.background,
                        borderRadius: "6px 6px 0 0",
                      }}
                    />
                    <p style={{ margin: "6px 0 0", fontSize: "0.85em" }}>
                      {squadPodium.name}
                    </p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12 }}>
                {finalRanking.map((entry, index) => (
                  <div
                    key={entry.name}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "4px 0",
                    }}
                  >
                    <span>
                      #{index + 1} {entry.name}
                    </span>
                    <span>{entry.score} XP</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="parchment" style={{ marginTop: 12 }}>
              <strong>🛡️ Escuadron de Elite</strong>
              <p style={{ margin: "6px 0 0" }}>
                Los tres escuadrones con mayor XP grupal reciben el emblema
                'Escuadron de Elite':
              </p>
              <div style={{ marginTop: 6 }}>
                {eliteSquads.map((team) => (
                  <div
                    key={team.name}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "4px 0",
                    }}
                  >
                    <span>{team.name}</span>
                    <span>{team.score} XP</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="parchment" style={{ marginTop: 12 }}>
              <strong>Diagnostico final</strong>
              <p style={{ margin: "6px 0 0" }}>
                Cierra la sesion con el cuestionario IMI (Inventario de
                Motivacion Intrinseca) entregado por el docente en el aula.
              </p>
            </div>

            <form onSubmit={handleSendLetter} style={{ marginTop: 12 }}>
              <div className="parchment">
                <strong>Carta a mi yo Aprendiz</strong>
                <p style={{ margin: "6px 0 10px" }}>
                  Escribe en tu Libro de Heroes una carta a la persona que
                  eras al iniciar la Academia, reflexionando sobre lo que
                  aprendiste.
                </p>
                <textarea
                  value={letter}
                  onChange={(event) => setLetter(event.target.value)}
                  placeholder="Querido yo aprendiz..."
                  rows={5}
                  disabled={letterSent}
                  style={{
                    width: "100%",
                    padding: 10,
                    borderRadius: 6,
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    background: "rgba(255, 255, 255, 0.08)",
                    color: "inherit",
                    font: "inherit",
                    resize: "vertical",
                  }}
                />
                <button
                  className="mission-btn"
                  type="submit"
                  style={{ marginTop: 10 }}
                  disabled={letterSent || letter.trim().length < 40}
                >
                  Sellar mi Libro de Heroes
                </button>
                {letterSent ? (
                  <p style={{ margin: "10px 0 0", color: "#90EE90" }}>
                    ✓ ¡Felicidades, Maestro Heroe! Tu carta quedo sellada y
                    ganaste la insignia legendaria.
                  </p>
                ) : null}
              </div>
            </form>
          </article>
        ) : null}
      </div>
    </section>
  );
}

export default function ActivityPages({
  activePage,
  onMissionClick,
  onOpenBadges,
  onEarnBadge,
  activity0Completed,
  leaderboard,
  onGainXp,
  xp,
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
      {activePage === "act2" ? (
        <Activity2Battle onGainXp={onGainXp} />
      ) : activePage === "act3" ? (
        <Activity3 onGainXp={onGainXp} onEarnBadge={onEarnBadge} xp={xp} />
      ) : activePage === "act4" ? (
        <Activity4 onGainXp={onGainXp} onEarnBadge={onEarnBadge} />
      ) : activePage === "act5" ? (
        <TorneoFinal xp={xp} onGainXp={onGainXp} onEarnBadge={onEarnBadge} />
      ) : activePage === "act1" ? (
        <Activity1 onGainXp={onGainXp} xp={xp} />
      ) : (
        <Activity0
          onMissionClick={onMissionClick}
          onOpenBadges={onOpenBadges}
          completed={activity0Completed}
          leaderboard={leaderboard}
        />
      )}
    </div>
  );
}
