import { useMemo, useState } from "react";
import { activity2Questions } from "../data/activity2Questions";

const KAHOOT_URL = "https://play.kahoot.it/v2/lobby";
const START_POSITION = 5;
const ENEMY_FLAG_POSITION = 10;

const initialRoles = {
  captain: "Ariadna",
  analyst: "Gael",
  verifier: "Luna",
  spokesperson: "Bruno",
};

const roleLabels = {
  captain: "Capitán",
  analyst: "Analista",
  verifier: "Verificador",
  spokesperson: "Portavoz",
};

function getOptionClassName(selectedAnswer, option, feedback) {
  const isSelected = selectedAnswer === option;

  if (!feedback) {
    return isSelected ? "battle-option battle-option--selected" : "battle-option";
  }

  if (feedback.type === "success") {
    return option === feedback.correctAnswer
      ? "battle-option battle-option--correct"
      : isSelected
        ? "battle-option battle-option--selected"
        : "battle-option";
  }

  if (option === feedback.correctAnswer) {
    return "battle-option battle-option--correct";
  }

  return isSelected
    ? "battle-option battle-option--wrong"
    : "battle-option";
}

function BattleVictoryScreen({ xpEarned, correctCount, onRestartBattle }) {
  return (
    <section id="act2" className="page active">
      <article className="card glass mission battle-victory">
        <span className="badge">VICTORIA EN KAHOOTOPIA</span>
        <h3 className="title-font battle-victory__title">
          La bandera enemiga ha caído.
        </h3>
        <p className="story">
          Tu escuadrón dominó la cinemática, rompió la línea defensiva y
          conquistó el territorio rival en la Gran Guerra de las Banderas.
        </p>
        <div className="battle-victory__stats">
          <div className="battle-victory__stat">
            <strong>XP obtenidos</strong>
            <span>{xpEarned} XP</span>
          </div>
          <div className="battle-victory__stat">
            <strong>Respuestas correctas</strong>
            <span>{correctCount}</span>
          </div>
        </div>
        <div className="battle-victory__actions">
          <button className="mission-btn" type="button" onClick={onRestartBattle}>
            Reiniciar batalla
          </button>
          <a
            className="battle-link-button"
            href={KAHOOT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Entrar al Kahoot Oficial
          </a>
        </div>
      </article>
    </section>
  );
}

function BattleDefeatScreen({ onRestartBattle }) {
  return (
    <section id="act2" className="page active">
      <article className="card glass mission battle-victory">
        <span className="badge">BATALLA INCOMPLETA</span>
        <h3 className="title-font battle-victory__title">
          El banco de preguntas se agotó.
        </h3>
        <p className="story">
          La fortaleza resiste por ahora. Reinicia la misión para reorganizar tu
          escuadrón y volver a cargar contra la línea enemiga.
        </p>
        <div className="battle-victory__actions">
          <button className="mission-btn" type="button" onClick={onRestartBattle}>
            Reiniciar batalla
          </button>
          <a
            className="battle-link-button"
            href={KAHOOT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Entrar al Kahoot Oficial
          </a>
        </div>
      </article>
    </section>
  );
}

export default function Activity2Battle({ onGainXp }) {
  const [roles, setRoles] = useState(initialRoles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [territoryPosition, setTerritoryPosition] = useState(START_POSITION);
  const [streak, setStreak] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [battleState, setBattleState] = useState("playing");

  const currentQuestion = activity2Questions[currentIndex];

  const conqueredTerritories = Math.max(0, territoryPosition - START_POSITION);
  const territoriesToWin = ENEMY_FLAG_POSITION - START_POSITION;
  const progressPercent = useMemo(
    () => Math.max(0, Math.min(100, (conqueredTerritories / territoriesToWin) * 100)),
    [conqueredTerritories, territoriesToWin],
  );
  const xpPercent = Math.min(100, Math.round((xpEarned / 200) * 100));
  const isLastQuestion = currentIndex === activity2Questions.length - 1;

  function resetBattle() {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setFeedback(null);
    setTerritoryPosition(START_POSITION);
    setStreak(0);
    setXpEarned(0);
    setCorrectCount(0);
    setBattleState("playing");
  }

  function handleRoleChange(roleKey, value) {
    setRoles((current) => ({
      ...current,
      [roleKey]: value,
    }));
  }

  function handleAnswer(option) {
    if (selectedAnswer || battleState !== "playing") {
      return;
    }

    const isCorrect = option === currentQuestion.correctAnswer;
    const nextStreak = isCorrect ? streak + 1 : 0;
    const shouldTriggerStreakBonus = isCorrect && nextStreak % 3 === 0;
    const baseTerritoryAdvance = isCorrect ? 1 : 0;
    const extraTerritoryAdvance = shouldTriggerStreakBonus ? 1 : 0;
    const nextTerritoryPosition = Math.min(
      ENEMY_FLAG_POSITION,
      territoryPosition + baseTerritoryAdvance + extraTerritoryAdvance,
    );

    let gainedXp = isCorrect ? 10 : 0;

    if (shouldTriggerStreakBonus) {
      gainedXp += 20;
    }

    if (nextTerritoryPosition === ENEMY_FLAG_POSITION) {
      gainedXp += 100;
    }

    if (gainedXp > 0) {
      setXpEarned((current) => current + gainedXp);
      onGainXp?.(gainedXp);
    }

    setTerritoryPosition(nextTerritoryPosition);
    setStreak(nextStreak);
    setCorrectCount((current) => current + (isCorrect ? 1 : 0));
    setSelectedAnswer(option);
    setFeedback({
      type: isCorrect ? "success" : "error",
      message: isCorrect
        ? shouldTriggerStreakBonus
          ? "¡Acierto legendario! La racha de 3 impulsa el avance extra sobre Kahootopia."
          : "¡Acierto! El escuadrón avanza un territorio hacia la bandera enemiga."
        : "Respuesta incorrecta. La línea defensiva resiste y tu escuadrón no avanza.",
      correctAnswer: currentQuestion.correctAnswer,
    });

    if (nextTerritoryPosition === ENEMY_FLAG_POSITION) {
      setBattleState("victory");
    }
  }

  function handleNextStep() {
    if (battleState !== "playing") {
      return;
    }

    if (currentIndex >= activity2Questions.length - 1) {
      setBattleState("defeat");
      return;
    }

    setCurrentIndex((current) => current + 1);
    setSelectedAnswer(null);
    setFeedback(null);
  }

  if (battleState === "victory") {
    return (
      <BattleVictoryScreen
        xpEarned={xpEarned}
        correctCount={correctCount}
        onRestartBattle={resetBattle}
      />
    );
  }

  if (battleState === "defeat") {
    return <BattleDefeatScreen onRestartBattle={resetBattle} />;
  }

  return (
    <section id="act2" className="page active">
      <div className="grid battle-layout" style={{ gridTemplateColumns: "1.5fr 0.85fr" }}>
        <article className="card glass mission battle-mission">
          <div className="battle-hero">
            <div>
              <span className="badge">ACTIVIDAD 2 - La Gran Guerra de las Banderas</span>
              <h3 className="title-font battle-title">La Gran Guerra de las Banderas</h3>
              <p className="story">
                Batalla Física en Kahootopia. Cada respuesta correcta empuja a tu
                escuadrón azul hacia la fortaleza roja y demuestra dominio sobre
                el movimiento rectilíneo.
              </p>
            </div>
            <a
              className="battle-link-button"
              href={KAHOOT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Entrar al Kahoot Oficial
            </a>
          </div>

          <div className="battle-stats-row">
            <div className="battle-stat-card">
              <span>Pregunta</span>
              <strong>
                {currentIndex + 1}/{activity2Questions.length}
              </strong>
            </div>
            <div className="battle-stat-card">
              <span>Aciertos</span>
              <strong>{correctCount}</strong>
            </div>
            <div className="battle-stat-card">
              <span>Territorios conquistados</span>
              <strong>
                {conqueredTerritories}/{territoriesToWin}
              </strong>
            </div>
            <div className="battle-stat-card">
              <span>Racha</span>
              <strong>{streak}</strong>
            </div>
          </div>

          <div className="battle-xp-panel">
            <div className="battle-xp-panel__header">
              <span>XP de la misión</span>
              <strong>{xpEarned} XP</strong>
            </div>
            <div className="xp-bar battle-xp-bar">
              <div className="xp-fill" style={{ width: `${xpPercent}%` }} />
            </div>
            <p className="battle-xp-panel__hint">
              +10 XP por acierto, +20 XP por racha de 3 y +100 XP al capturar la bandera.
            </p>
          </div>

          <section className="battlefield">
            <div className="battlefield__header">
              <span className="battle-flag battle-flag--blue">Bandera Azul</span>
              <span className="battlefield__objective">Territorios de Kahootopia</span>
              <span className="battle-flag battle-flag--red">Bandera Roja</span>
            </div>
            <div
              className="battle-map"
              role="list"
              aria-label="Campo de batalla de la Gran Guerra de las Banderas"
            >
              {Array.from({ length: ENEMY_FLAG_POSITION + 1 }).map((_, index) => {
                const isStart = index === START_POSITION;
                const isPlayer = index === territoryPosition;
                const isBlueFlag = index === 0;
                const isRedFlag = index === ENEMY_FLAG_POSITION;

                return (
                  <div
                    key={index}
                    role="listitem"
                    className={`battle-map__cell ${isStart ? "battle-map__cell--start" : ""} ${isPlayer ? "battle-map__cell--player" : ""}`}
                  >
                    {isBlueFlag ? <span className="battle-map__flag">🟦</span> : null}
                    {isRedFlag ? <span className="battle-map__flag">🟥</span> : null}
                    {isPlayer ? <span className="battle-map__marker">⚔️</span> : null}
                    {isStart && !isPlayer ? <span className="battle-map__marker">🏁</span> : null}
                  </div>
                );
              })}
            </div>
            <div className="battlefield__footer">
              <span>Escuadrón azul en movimiento</span>
              <span>{progressPercent}% hacia la bandera enemiga</span>
            </div>
          </section>

          <section className="battle-question card glass">
            <div className="battle-question__meta">
              <span>Desafío {currentIndex + 1}</span>
              <span>{activity2Questions.length - currentIndex - 1} restantes</span>
            </div>
            <div className="battle-question__progress">
              <div style={{ width: `${((currentIndex + 1) / activity2Questions.length) * 100}%` }} />
            </div>
            <h4 className="battle-question__title">{currentQuestion.question}</h4>
            <div className="battle-options">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={getOptionClassName(selectedAnswer, option, feedback)}
                  onClick={() => handleAnswer(option)}
                  disabled={Boolean(selectedAnswer)}
                >
                  {option}
                </button>
              ))}
            </div>
            {feedback ? (
              <div className={`battle-feedback battle-feedback--${feedback.type}`}>
                {feedback.message}
              </div>
            ) : null}
            <div className="battle-question__actions">
              <button
                className="mission-btn"
                type="button"
                onClick={handleNextStep}
                disabled={!selectedAnswer}
              >
                {isLastQuestion ? "Reiniciar batalla" : "Siguiente desafío"}
              </button>
              <button className="battle-link-button" type="button" onClick={resetBattle}>
                Reiniciar progreso
              </button>
            </div>
          </section>
        </article>

        <aside className="card glass battle-sidebar">
          <section className="battle-panel">
            <h4 className="battle-panel__title">Roles cooperativos</h4>
            <div className="battle-role-grid">
              {Object.entries(roleLabels).map(([key, label]) => (
                <label key={key} className="battle-role-field">
                  <span>{label}</span>
                  <input
                    type="text"
                    value={roles[key]}
                    onChange={(event) => handleRoleChange(key, event.target.value)}
                    placeholder={label}
                  />
                </label>
              ))}
            </div>
          </section>

          <section className="battle-panel">
            <h4 className="battle-panel__title">Coordinación del escuadrón</h4>
            <div className="battle-brief">
              <strong>{roles.captain || "Capitán"}</strong>
              <p>Dirige la estrategia de avance.</p>
            </div>
            <div className="battle-brief">
              <strong>{roles.analyst || "Analista"}</strong>
              <p>Interpreta las magnitudes y gráficas.</p>
            </div>
            <div className="battle-brief">
              <strong>{roles.verifier || "Verificador"}</strong>
              <p>Comprueba cálculos y opciones correctas.</p>
            </div>
            <div className="battle-brief">
              <strong>{roles.spokesperson || "Portavoz"}</strong>
              <p>Comparte la respuesta final del equipo.</p>
            </div>
          </section>

          <section className="battle-panel">
            <h4 className="battle-panel__title">Reglas de avance</h4>
            <ul className="battle-rules">
              <li>Respuesta correcta: avanza 1 territorio.</li>
              <li>Racha de 3 aciertos: avanza 1 territorio adicional.</li>
              <li>Captura la bandera roja para obtener +100 XP.</li>
            </ul>
          </section>
        </aside>
      </div>
    </section>
  );
}