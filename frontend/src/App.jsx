import { useEffect, useMemo, useRef, useState } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import ParticlesCanvas from "./components/ParticlesCanvas";
import ActivityPages from "./components/ActivityPages";
import Sidebar from "./components/Sidebar";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { apiUrl } from "./config/api";
import { gameConfig, initialReflection } from "./data/gameData";
import { badgeCards, getRankName, formatTimer } from "./utils/gameUtils";
import useMissionVideo from "./hooks/useMissionVideo";
import BadgeCarousel from "./components/BadgeCarousel";

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

// utilities moved to ./utils/gameUtils.js

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
  const [missionVideoOpen, setMissionVideoOpen] = useState(false);
  const [activity0Completed, setActivity0Completed] = useState(false);
  const [badgeCarouselOpen, setBadgeCarouselOpen] = useState(false);
  const [badgeCarouselFullscreen, setBadgeCarouselFullscreen] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const missionVideoContainerRef = useRef(null);
  const missionVideoPlayerRef = useRef(null);

  const rankName = useMemo(() => getRankName(xp, gameConfig), [xp]);
  const xpPercent = useMemo(
    () => Math.min(100, Math.round((xp / gameConfig.maxXP) * 100)),
    [xp],
  );
  const timer = useMemo(() => formatTimer(timerRemaining), [timerRemaining]);

  function closeModal() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setOpenModal(null);
  }

  function openMissionVideo() {
    if (activity0Completed) {
      return;
    }

    setOpenModal(null);
    setMissionVideoOpen(true);
  }

  function closeMissionVideo() {
    if (missionVideoPlayerRef.current) {
      missionVideoPlayerRef.current.destroy();
      missionVideoPlayerRef.current = null;
    }

    setMissionVideoOpen(false);
  }

  function openBadgeCarousel() {
    if (badgeCards.length === 0) {
      return;
    }

    setBadgeCarouselFullscreen(false);
    setBadgeCarouselOpen(true);
  }

  function closeBadgeCarousel() {
    if (document.fullscreenElement?.id === "badgeCarouselModal") {
      document.exitFullscreen().catch(() => {});
    }

    setBadgeCarouselOpen(false);
    setBadgeCarouselFullscreen(false);
  }

  function toggleBadgeCarouselFullscreen() {
    const modalElement = document.getElementById("badgeCarouselModal");

    if (!modalElement) {
      return;
    }

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
      return;
    }

    modalElement.requestFullscreen?.().catch(() => {
      setBadgeCarouselFullscreen((current) => !current);
    });
  }

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

  useEffect(() => {
    if (!user) {
      setLeaderboard([]);
      return undefined;
    }

    let cancelled = false;

    async function loadLeaderboard() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLeaderboard([]);
          return;
        }

        const response = await fetch(apiUrl("/api/auth/ranking"), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("No se pudo cargar el ranking");
        }

        const data = await response.json();

        if (!cancelled) {
          setLeaderboard(Array.isArray(data.ranking) ? data.ranking : []);
        }
      } catch (error) {
        console.error(error);
        if (!cancelled) {
          setLeaderboard([]);
        }
      }
    }

    loadLeaderboard();

    return () => {
      cancelled = true;
    };
  }, [user]);

  async function persistProgressToServer(newXp) {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch(apiUrl("/api/auth/progress"), {
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
    closeModal();
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

  useMissionVideo(
    missionVideoOpen,
    missionVideoContainerRef,
    missionVideoPlayerRef,
    () => {
      closeMissionVideo();
      setActivity0Completed(true);
      setActivePage("act1");
      setOpenModal("modalStart");
    },
  );

  useEffect(() => {
    const handleFullscreenChange = () => {
      setBadgeCarouselFullscreen(
        document.fullscreenElement?.id === "badgeCarouselModal",
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

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
          leaderboard={leaderboard}
          currentUserEmail={user.email}
          currentUserName={user.nombre}
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
            onMissionClick={openMissionVideo}
            onOpenBadges={openBadgeCarousel}
            activity0Completed={activity0Completed}
            leaderboard={leaderboard}
            onGainXp={handleGainXp}
            xp={xp}
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
        id="missionVideoModal"
        title="Presentacion de la mision"
        open={missionVideoOpen}
        onClose={closeMissionVideo}
        className="modal-box--video"
        headerActions={
          <div className="modal-box__actions">
            <button
              className="modal-icon-btn"
              type="button"
              onClick={closeMissionVideo}
              aria-label="Cerrar modal"
              title="Cerrar"
            >
              ×
            </button>
          </div>
        }
      >
        <div className="video-modal">
          <div className="video-modal__frame">
            <div
              ref={missionVideoContainerRef}
              className="video-modal__player"
              aria-label="Video de YouTube de la mision"
            />
          </div>
          <p className="video-modal__hint">
            Introducción a la Academia del Héroe
          </p>
        </div>
      </Modal>

      <BadgeCarousel
        open={badgeCarouselOpen}
        onClose={closeBadgeCarousel}
        fullscreen={badgeCarouselFullscreen}
        toggleFullscreen={toggleBadgeCarouselFullscreen}
        badgeCards={badgeCards}
      />

      <Modal
        id="modalStart"
        title={modalContent.modalStart.title}
        open={openModal === "modalStart"}
        onClose={closeModal}
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
          onClick={closeModal}
        >
          Cerrar
        </button>
      </Modal>

      <Modal
        id="modalPrototype"
        title={modalContent.modalPrototype.title}
        open={openModal === "modalPrototype"}
        onClose={closeModal}
      >
        <p>{modalContent.modalPrototype.body}</p>
        <button className="mission-btn" type="button" onClick={closeModal}>
          Cerrar
        </button>
      </Modal>
    </>
  );
}
