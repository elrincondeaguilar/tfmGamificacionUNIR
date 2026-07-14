import { useState, useEffect } from "react";
import ChartCanvas from "./ChartCanvas";
import Activity2Battle from "./Activity2Battle";
import { gameConfig } from "../data/gameData";
import { getRankName } from "../utils/gameUtils";

const heroBookTiers = [
  { id: "aprendiz", name: "Aprendiz", xp: 400, reward: "Ritmo flexible" },
  { id: "escudero", name: "Escudero", xp: 650, reward: "Ritmo estándar" },
  {
    id: "caballero",
    name: "Caballero",
    xp: 900,
    reward: "Acceso a retos extra",
  },
  {
    id: "maestro",
    name: "Maestro Héroe",
    xp: 1200,
    reward: "Mentor de equipo",
  },
];

const heroBookQuests = [
  {
    id: "base-cinematica",
    title: "Completar las 6 misiones base de Cinemática",
    detail: "Entregas mínimas del trimestre.",
    xp: 80,
  },
  {
    id: "bitacora-semanal",
    title: "Mantener mi Bitácora del Héroe actualizada cada semana",
    detail: "Registro continuo de evidencias en el portafolio.",
    xp: 60,
  },
  {
    id: "liderar-escuadron",
    title:
      "Liderar mi escuadrón como Capitán o Cronometrador en al menos 2 retos",
    detail: "Asumir un rol cooperativo activo.",
    xp: 100,
  },
  {
    id: "error-fertil",
    title:
      "Superar un «Error Fértil»: reintentar un reto fallido y documentar qué aprendí",
    detail: "Mecánica de aprendizaje desde el error.",
    xp: 120,
  },
  {
    id: "reto-extra",
    title: "Diseñar y proponer un reto extra para mi escuadrón",
    detail: "Reto creado por el propio estudiante (agencia).",
    xp: 90,
  },
  {
    id: "participacion-asincrona",
    title:
      "Asistir y participar activamente, aunque sea de forma asíncrona si falto",
    detail: "Compromiso de continuidad pase lo que pase.",
    xp: 70,
  },
];

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

function Activity0({
  onMissionClick,
  onOpenBadges,
  onOpenHeroBook,
  completed,
  leaderboard,
}) {
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
            <button
              className="mini mini--clickable"
              type="button"
              onClick={onOpenHeroBook}
              title="Abrir el Libro de Heroes"
            >
              📚 Libro de Heroes
            </button>
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

function HeroBookPage({ onBack }) {
  const [selectedTierId, setSelectedTierId] = useState("aprendiz");
  const [quests, setQuests] = useState(
    heroBookQuests.map((quest) => ({ ...quest, checked: false })),
  );
  const [customQuestText, setCustomQuestText] = useState("");
  const [sealed, setSealed] = useState(false);

  const selectedTier = heroBookTiers.find(
    (tier) => tier.id === selectedTierId,
  );

  const earnedXp = quests
    .filter((quest) => quest.checked)
    .reduce((total, quest) => total + quest.xp, 0);

  const progressGoal = selectedTier?.xp ?? 1;
  const progressPercent = Math.min(100, (earnedXp / progressGoal) * 100);

  function toggleQuest(questId) {
    setQuests((current) =>
      current.map((quest) =>
        quest.id === questId ? { ...quest, checked: !quest.checked } : quest,
      ),
    );
  }

  function addCustomQuest() {
    const text = customQuestText.trim();
    if (!text) {
      return;
    }

    setQuests((current) => [
      ...current,
      {
        id: `custom-${Date.now()}`,
        title: text,
        detail: "Misión propuesta por el estudiante.",
        xp: 50,
        checked: true,
      },
    ]);
    setCustomQuestText("");
  }

  return (
    <section id="libro" className="page active">
      <style>{`#libro{--parchment:#EDE3C7;--parchment-light:#F7F1E1;--ink:#3B2A1A;--ink-soft:#5C4632;--gold:#C99A3B;--forest:#2F4538;--crimson:#8B2E2E;--line:rgba(59,42,26,0.18);color:var(--ink);font-family:"Crimson Pro",Georgia,serif;font-size:16.5px;line-height:1.55;background:var(--parchment);background-image:radial-gradient(circle at 12% 15%, rgba(201,154,59,0.10), transparent 40%),radial-gradient(circle at 88% 85%, rgba(47,69,56,0.08), transparent 45%);}#libro .hero-book__wrap{max-width:920px;margin:0 auto;padding:40px 22px 80px;}#libro .hero-book__eyebrow{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:var(--forest);font-weight:600;text-align:center;}#libro h1{font-family:"Cinzel",serif;font-weight:900;text-align:center;font-size:2.2rem;margin:8px 0 4px;}#libro .hero-book__subtitle{text-align:center;font-style:italic;color:var(--ink-soft);max-width:560px;margin:0 auto 8px;}#libro .hero-book__seal-divider{display:flex;align-items:center;justify-content:center;gap:14px;margin:22px 0 30px;}#libro .hero-book__seal-divider .line{height:1px;width:90px;background:var(--line);}#libro .hero-book__seal-divider svg{width:24px;height:24px;}#libro fieldset{border:none;padding:0;margin:0 0 34px;}#libro .hero-book__section-title{display:flex;align-items:baseline;gap:12px;margin-bottom:16px;}#libro .hero-book__section-title h2{font-family:"Cinzel",serif;font-size:1.2rem;margin:0;color:var(--forest);white-space:nowrap;}#libro .hero-book__section-title .rule{flex:1;height:1px;background:var(--line);}#libro .hero-book__section-title .pts{font-family:"JetBrains Mono",monospace;font-size:11px;color:var(--gold);white-space:nowrap;}#libro .card{background:var(--parchment-light);border:1px solid var(--line);border-radius:4px;padding:24px;position:relative;}#libro .card::before{content:"";position:absolute;inset:7px;border:1px solid rgba(201,154,59,0.30);border-radius:2px;pointer-events:none;}#libro .tier-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;}#libro .tier{border:1px solid var(--line);border-radius:4px;padding:16px 12px;text-align:center;cursor:pointer;background:var(--parchment);transition:all .15s ease;}#libro .tier:hover{border-color:var(--gold);}#libro .tier.active{background:rgba(47,69,56,0.10);border-color:var(--forest);box-shadow:inset 0 0 0 1px var(--forest);}#libro .tier .name{font-family:"Cinzel",serif;font-weight:700;font-size:.95rem;color:var(--ink);margin-bottom:4px;}#libro .tier .xp{font-family:"JetBrains Mono",monospace;font-size:11px;color:var(--ink-soft);}#libro .tier .reward{font-family:"JetBrains Mono",monospace;font-size:10.5px;color:var(--crimson);margin-top:6px;display:block;}#libro .quest-menu{display:flex;flex-direction:column;gap:10px;margin-top:6px;}#libro .quest-item{display:flex;align-items:flex-start;gap:12px;background:var(--parchment);border:1px solid var(--line);border-radius:4px;padding:12px 14px;cursor:pointer;}#libro .quest-item input{margin-top:4px;accent-color:var(--forest);width:16px;height:16px;flex-shrink:0;}#libro .quest-item .qtext{flex:1;}#libro .quest-item .qtitle{font-weight:600;color:var(--ink);}#libro .quest-item .qxp{font-family:"JetBrains Mono",monospace;font-size:11px;color:var(--gold);white-space:nowrap;margin-left:auto;align-self:center;}#libro .quest-item.checked{border-color:var(--forest);background:rgba(47,69,56,0.06);}#libro .custom-quest{display:flex;gap:10px;margin-top:14px;}#libro .custom-quest input[type=text]{flex:1;font-family:"Crimson Pro",serif;font-size:14.5px;padding:9px 12px;border:1px solid var(--line);border-radius:4px;background:var(--parchment);}#libro .custom-quest button,#libro .hero-book__back,#libro #sealBtn{font-family:"JetBrains Mono",monospace;font-size:11.5px;background:var(--forest);color:#fff;border:none;border-radius:4px;padding:0 16px;cursor:pointer;}#libro .xp-summary{display:flex;align-items:center;gap:14px;margin-top:18px;font-family:"JetBrains Mono",monospace;font-size:12px;color:var(--ink-soft);}#libro .xp-track{flex:1;height:12px;border-radius:7px;background:rgba(59,42,26,0.10);border:1px solid var(--line);overflow:hidden;}#libro .xp-fill{height:100%;width:0%;background:linear-gradient(90deg,var(--crimson),var(--gold),var(--forest));transition:width .3s ease;}#libro .field{margin-bottom:18px;}#libro .field label{display:block;font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:var(--forest);margin-bottom:6px;}#libro .field textarea,#libro .field input[type=text]{width:100%;font-family:"Crimson Pro",serif;font-size:15px;padding:10px 12px;border:1px solid var(--line);border-radius:4px;background:var(--parchment);resize:vertical;}#libro .field textarea{min-height:70px;}#libro .sign-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:8px;}#libro .sign-box{text-align:center;}#libro .sign-line{border-bottom:1px solid var(--ink);min-height:40px;display:flex;align-items:flex-end;justify-content:center;font-family:"Cinzel",serif;font-size:1.1rem;padding-bottom:6px;color:var(--ink);}#libro .sign-input{width:100%;border:none;background:transparent;text-align:center;font-family:"Cinzel",serif;font-size:1.1rem;color:var(--ink);outline:none;}#libro .sign-caption{font-family:"JetBrains Mono",monospace;font-size:10.5px;color:var(--ink-soft);margin-top:6px;letter-spacing:.05em;}#libro .seal-btn-row{text-align:center;margin-top:30px;}#libro #sealBtn{font-family:"Cinzel",serif;font-weight:700;font-size:1rem;letter-spacing:.03em;background:var(--crimson);border-radius:30px;padding:14px 34px;box-shadow:0 10px 24px -10px rgba(139,46,46,0.6);transition:transform .15s ease;}#libro #sealBtn:hover{transform:translateY(-1px);}#libro #sealBtn:disabled{background:var(--ink-soft);cursor:default;box-shadow:none;}#libro .seal-stamp{display:none;margin:20px auto 0;width:120px;height:120px;border-radius:50%;border:3px double var(--crimson);align-items:center;justify-content:center;font-family:"Cinzel",serif;font-weight:900;color:var(--crimson);text-align:center;line-height:1.2;font-size:.85rem;letter-spacing:.05em;transform:rotate(-8deg);background:rgba(139,46,46,0.05);}#libro .seal-stamp.show{display:flex;}#libro .hero-book__footer{text-align:center;margin-top:46px;color:var(--ink-soft);font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.05em;}#libro .hero-book__back{margin:0 auto 18px;display:inline-flex;align-items:center;justify-content:center;gap:8px;background:var(--crimson);}#libro fieldset[disabled] .card{opacity:.65;}@media (max-width:620px){#libro .tier-grid{grid-template-columns:repeat(2,1fr);}#libro .sign-grid{grid-template-columns:1fr;}#libro h1{font-size:1.7rem;}#libro .custom-quest{flex-direction:column;}}`}</style>

      <div className="hero-book__wrap">
        <div className="hero-book__eyebrow">Academia de Héroes · Física Challenger</div>
        <h1>Pacto del Héroe</h1>
        <p className="hero-book__subtitle">Contrato de aprendizaje gamificado — Trimestre. Aquí negocias tu propio camino: tú elegirás tu nivel de reto, tus misiones y tu objetivo personal.</p>
        <div className="hero-book__seal-divider"><div className="line" /><svg viewBox="0 0 24 24" fill="none" stroke="#C99A3B" strokeWidth="1.5"><path d="M12 2l2.6 5.6L21 8.5l-4.5 4.2 1 6.1L12 16l-5.5 2.8 1-6.1L3 8.5l6.4-0.9L12 2z" /></svg><div className="line" /></div>
        <button className="hero-book__back" type="button" onClick={onBack}>Volver a Actividad 0</button>

        <fieldset disabled={sealed}>
          <div className="hero-book__section-title"><h2>I. Elige tu nivel de reto</h2><div className="rule" /><span className="pts">negociable</span></div>
          <div className="card"><div className="tier-grid">{heroBookTiers.map((tier) => (<div key={tier.id} className={`tier ${selectedTierId === tier.id ? "active" : ""}`} role="button" tabIndex={0} onClick={() => setSelectedTierId(tier.id)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelectedTierId(tier.id); } }}><div className="name">{tier.name}</div><div className="xp">Meta: {tier.xp} XP</div><span className="reward">{tier.reward}</span></div>))}</div></div>

          <div className="hero-book__section-title" style={{ marginTop: 26 }}><h2>II. Negocia tus misiones</h2><div className="rule" /><span className="pts">elige las que te comprometes a cumplir</span></div>
          <div className="card"><div className="quest-menu">{quests.map((quest) => (<label key={quest.id} className={`quest-item ${quest.checked ? "checked" : ""}`}><input type="checkbox" checked={quest.checked} onChange={() => toggleQuest(quest.id)} /><span className="qtext"><span className="qtitle">{quest.title}</span><br />{quest.detail}</span><span className="qxp">+{quest.xp} XP</span></label>))}</div><div className="custom-quest"><input type="text" value={customQuestText} onChange={(event) => setCustomQuestText(event.target.value)} placeholder="Propón tu propia misión personalizada..." /><button type="button" onClick={addCustomQuest}>Añadir misión</button></div><div className="xp-summary"><span>XP NEGOCIADO</span><div className="xp-track"><div className="xp-fill" id="xpFill" style={{ width: `${progressPercent}%` }} /></div><span id="xpText">{earnedXp} / {selectedTier ? selectedTier.xp : "—"} XP</span></div></div>

          <div className="hero-book__section-title" style={{ marginTop: 26 }}><h2>III. Tu objetivo personal</h2><div className="rule" /></div>
          <div className="card"><div className="field"><label>Mi objetivo principal este trimestre</label><textarea placeholder="Ej.: Quiero entender de verdad el movimiento parabólico, no solo memorizar la fórmula..." /></div><div className="field"><label>Lo que necesito de mi profesor para lograrlo</label><textarea placeholder="Ej.: Más tiempo para revisar mis Errores Fértiles, retroalimentación antes del viernes..." /></div><div className="field"><label>Cómo sabré que cumplí mi pacto</label><textarea placeholder="Ej.: Habré completado mis misiones elegidas y mi portafolio tendrá evidencia de cada una..." /></div></div>

          <div className="hero-book__section-title" style={{ marginTop: 26 }}><h2>IV. Sellamos el pacto</h2><div className="rule" /></div>
          <div className="card"><div className="sign-grid"><div className="sign-box"><div className="sign-line"><input className="sign-input" type="text" placeholder="Nombre del héroe (estudiante)" /></div><div className="sign-caption">FIRMA DEL ESTUDIANTE</div></div><div className="sign-box"><div className="sign-line"><input className="sign-input" type="text" placeholder="Nombre del docente" /></div><div className="sign-caption">FIRMA DEL DOCENTE — TESTIGO DEL PACTO</div></div></div><div className="seal-btn-row"><button id="sealBtn" type="button" disabled={sealed} onClick={() => setSealed(true)}>{sealed ? "Pacto sellado ✓" : "Sellar el pacto"}</button><div className={`seal-stamp ${sealed ? "show" : ""}`} id="sealStamp">PACTO<br />SELLADO</div></div></div>
        </fieldset>

        <div className="hero-book__footer">PACTO DEL HÉROE — CONTRATO DE APRENDIZAJE GAMIFICADO — ACADEMIA DE HÉROES, FÍSICA CHALLENGER</div>
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

export default function ActivityPages({
  activePage,
  onMissionClick,
  onOpenBadges,
  onOpenHeroBook,
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
      ) : activePage === "libro" ? (
        <HeroBookPage onBack={onOpenHeroBook} />
      ) : activePage === "act1" ? (
        <Activity1 onGainXp={onGainXp} xp={xp} />
      ) : (
        <Activity0
          onMissionClick={onMissionClick}
          onOpenBadges={onOpenBadges}
          onOpenHeroBook={onOpenHeroBook}
          completed={activity0Completed}
          leaderboard={leaderboard}
        />
      )}
    </div>
  );
}
