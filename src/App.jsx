import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import ParticlesCanvas from "./components/ParticlesCanvas";
import ActivityPages from "./components/ActivityPages";
import Sidebar from "./components/Sidebar";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { gameConfig, initialReflection } from "./data/gameData";

const modalContent = {
  modalStart: {
    title: "Aventura iniciada",
    body: "El Gran Maestre te da la bienvenida. Tu primera mision ya esta desbloqueada.",
    action: { label: "Reclamar bono inicial (+40 XP)", xp: 40 },
  },
  modalPrototype: {
    title: "Guia de prototipo",
    body: "Incluye objetivo, materiales, diagrama de fuerzas y evidencia de prueba.",
    action: null,
  },
  modalFinal: {
    title: "Ceremonia del Maestro Heroe",
    body: "La academia reconoce el esfuerzo, la colaboracion y el pensamiento cientifico aplicado.",
    action: { label: "Recibir premio final (+120 XP)", xp: 120 },
  },
};

function getRankName(xp) {
  return (
    [...gameConfig.ranks].reverse().find((rank) => xp >= rank.min)?.name ??
    gameConfig.ranks[0].name
  );
}

function formatTimer(seconds) {
  const minutes = Math.floor(seconds / 60);
  const rest = String(seconds % 60).padStart(2, "0");
  return `${String(minutes).padStart(2, "0")}:${rest}`;
}

export default function App() {
  const [activePage, setActivePage] = useState("act0");
  const [xp, setXp] = useState(120);
  const [openModal, setOpenModal] = useState(null);
  const [reflections, setReflections] = useState(initialReflection);
  const [timerRemaining, setTimerRemaining] = useState(gameConfig.timerSeconds);
  const [timerRunning, setTimerRunning] = useState(false);
  const [user, setUser] = useState(null);
  const [currentAuthPage, setCurrentAuthPage] = useState("login");
  const [loading, setLoading] = useState(true);

  const rankName = useMemo(() => getRankName(xp), [xp]);
  const xpPercent = useMemo(
    () => Math.min(100, Math.round((xp / gameConfig.maxXP) * 100)),
    [xp],
  );
  const timer = useMemo(() => formatTimer(timerRemaining), [timerRemaining]);

  // Verificar si hay sesión activa al cargar
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      const u = JSON.parse(userData);
      setUser(u);
      setXp(u.xp ?? 0);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      setXp(user.xp ?? 0);
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  async function persistProgressToServer(newXp) {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch("http://localhost:5000/api/auth/progress", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ xp: newXp }),
      });
      if (!res.ok) return;
      const data = await res.json();
      const updatedUser = { ...(user || {}), xp: data.user.xp };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Error guardando progreso:", err);
    }
  }

  function handleGainXp(amount) {
    setXp((current) => {
      const newXp = current + amount;
      // persist in background
      persistProgressToServer(newXp);
      return newXp;
    });
  }

  function handleAddReflection(entry) {
    setReflections((current) => [{ ...entry }, ...current]);
    handleGainXp(35);
  }

  function handleModalAction() {
    const modal = modalContent[openModal];
    if (modal?.action?.xp) {
      handleGainXp(modal.action.xp);
    }
    setOpenModal(null);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setCurrentAuthPage("login");
  }

  useEffect(() => {
    if (!timerRunning) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setTimerRemaining((current) => {
        if (current === 0) {
          setTimerRunning(false);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [timerRunning]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        Cargando...
      </div>
    );
  }

  // Mostrar login/registro si no hay usuario
  if (!user) {
    return (
      <>
        <ParticlesCanvas />
        {currentAuthPage === "login" ? (
          <LoginPage
            onLoginSuccess={setUser}
            onSwitchToRegister={() => setCurrentAuthPage("register")}
          />
        ) : (
          <RegisterPage
            onRegisterSuccess={setUser}
            onSwitchToLogin={() => setCurrentAuthPage("login")}
          />
        )}
      </>
    );
  }

  // Mostrar aplicación principal si hay usuario
  return (
    <>
      <ParticlesCanvas />
      <div className="app">
        <Sidebar
          navigation={gameConfig.navigation}
          activePage={activePage}
          onNavigate={setActivePage}
          title={gameConfig.appTitle}
          rankTrack={gameConfig.rankTrack}
        />

        <main className="main">
          <Header
            title={gameConfig.appTitle}
            subtitle={gameConfig.appSubtitle}
            xp={xp}
            maxXP={gameConfig.maxXP}
            rankName={rankName}
            xpPercent={xpPercent}
            user={user}
            onLogout={handleLogout}
          />

          <ActivityPages
            activePage={activePage}
            onOpenModal={setOpenModal}
            onGainXp={handleGainXp}
            teams={gameConfig.teams}
            timer={timer}
            onStartTimer={() => setTimerRunning(true)}
            onStopTimer={() => setTimerRunning(false)}
            onResetTimer={() => {
              setTimerRunning(false);
              setTimerRemaining(gameConfig.timerSeconds);
            }}
            charts={gameConfig.charts}
            reflections={reflections}
            onSubmitReflection={handleAddReflection}
          />
        </main>
      </div>

      <Modal
        id="modalStart"
        title={modalContent.modalStart.title}
        open={openModal === "modalStart"}
        onClose={() => setOpenModal(null)}
      >
        <p>{modalContent.modalStart.body}</p>
        <button
          className="mission-btn"
          type="button"
          onClick={handleModalAction}
        >
          {modalContent.modalStart.action.label}
        </button>
        <button
          className="mission-btn"
          type="button"
          style={{ marginLeft: "8px" }}
          onClick={() => setOpenModal(null)}
        >
          Cerrar
        </button>
      </Modal>

      <Modal
        id="modalPrototype"
        title={modalContent.modalPrototype.title}
        open={openModal === "modalPrototype"}
        onClose={() => setOpenModal(null)}
      >
        <p>{modalContent.modalPrototype.body}</p>
        <button
          className="mission-btn"
          type="button"
          onClick={() => setOpenModal(null)}
        >
          Entendido
        </button>
      </Modal>

      <Modal
        id="modalFinal"
        title={modalContent.modalFinal.title}
        open={openModal === "modalFinal"}
        onClose={() => setOpenModal(null)}
      >
        <p>{modalContent.modalFinal.body}</p>
        <p>
          <span className="badge">Emblema Supremo desbloqueado</span>
        </p>
        <button
          className="mission-btn"
          type="button"
          onClick={handleModalAction}
        >
          {modalContent.modalFinal.action.label}
        </button>
        <button
          className="mission-btn"
          type="button"
          style={{ marginLeft: "8px" }}
          onClick={() => setOpenModal(null)}
        >
          Cerrar
        </button>
      </Modal>
    </>
  );
}
