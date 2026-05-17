(() => {
  const root = (window.PhysicsChallenger = window.PhysicsChallenger || {});
  const { config, state, dom } = root;

  function getCurrentRank() {
    return [...config.ranks].reverse().find((rank) => state.xp >= rank.min);
  }

  function updateXPView() {
    const xpFill = dom.byId("xp-fill");
    const xpText = dom.byId("xp-text");
    const rankName = dom.byId("rank-name");

    if (!xpFill || !xpText || !rankName) {
      return;
    }

    const pct = Math.min(100, Math.round((state.xp / config.maxXP) * 100));
    xpFill.style.width = `${pct}%`;
    xpText.textContent = `${state.xp} XP`;
    rankName.textContent = getCurrentRank().name;
  }

  function setActivePage(targetId) {
    dom.qsa(".nav-btn").forEach((button) => {
      button.classList.toggle("active", button.dataset.target === targetId);
    });

    dom.qsa(".page").forEach((page) => {
      page.classList.toggle("active", page.id === targetId);
    });
  }

  function initNavigation() {
    dom.qsa(".nav-btn").forEach((button) => {
      button.addEventListener("click", () =>
        setActivePage(button.dataset.target),
      );
    });
  }

  function initAccordions() {
    dom.qsa(".accordion-toggle").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const accordion = toggle.closest(".accordion");
        if (accordion) {
          accordion.classList.toggle("open");
        }
      });
    });
  }

  function initModals() {
    dom.qsa("[data-modal-open]").forEach((button) => {
      button.addEventListener("click", () => {
        const modal = dom.byId(button.dataset.modalOpen);
        if (modal) {
          modal.classList.add("open");
        }
      });
    });

    dom.qsa("[data-modal-close]").forEach((button) => {
      button.addEventListener("click", () => {
        const modal = dom.byId(button.dataset.modalClose);
        if (modal) {
          modal.classList.remove("open");
        }
      });
    });
  }

  function addXp(amount) {
    state.xp += amount;
    updateXPView();
  }

  function initXpButtons() {
    dom.qsa(".xp-gain").forEach((button) => {
      button.addEventListener("click", () => {
        addXp(Number(button.dataset.xp || 0));
      });
    });
  }

  function renderRanking() {
    const tbody = dom.qs("#ranking-table tbody");
    if (!tbody) {
      return;
    }

    const rows = [...config.teams]
      .sort((left, right) => right.score - left.score)
      .map((team) => {
        const row = document.createElement("tr");
        const teamCell = document.createElement("td");
        const scoreCell = document.createElement("td");
        const progressCell = document.createElement("td");
        const bar = document.createElement("div");
        const fill = document.createElement("div");

        bar.style.height = "8px";
        bar.style.background = "#18294e";
        bar.style.borderRadius = "999px";

        fill.style.height = "8px";
        fill.style.width = `${team.score}%`;
        fill.style.background = "linear-gradient(90deg,#31e7ff,#f4c86c)";
        fill.style.borderRadius = "999px";

        teamCell.textContent = team.name;
        scoreCell.textContent = String(team.score);
        bar.appendChild(fill);
        progressCell.appendChild(bar);

        row.append(teamCell, scoreCell, progressCell);
        return row;
      });

    tbody.replaceChildren(...rows);
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const rest = String(seconds % 60).padStart(2, "0");
    return `${String(minutes).padStart(2, "0")}:${rest}`;
  }

  function drawTimer() {
    const timerNode = dom.byId("timer");
    if (timerNode) {
      timerNode.textContent = formatTime(state.timerRemaining);
    }
  }

  function stopTimer() {
    if (state.timerId) {
      clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  function startTimer() {
    if (state.timerId) {
      return;
    }

    state.timerId = window.setInterval(() => {
      if (state.timerRemaining === 0) {
        stopTimer();
        return;
      }

      state.timerRemaining -= 1;
      drawTimer();
    }, 1000);
  }

  function resetTimer() {
    stopTimer();
    state.timerRemaining = config.timerSeconds;
    drawTimer();
  }

  function initTimer() {
    const startButton = dom.byId("start-timer");
    const stopButton = dom.byId("stop-timer");
    const resetButton = dom.byId("reset-timer");

    startButton?.addEventListener("click", startTimer);
    stopButton?.addEventListener("click", stopTimer);
    resetButton?.addEventListener("click", resetTimer);

    drawTimer();
  }

  function createReflectionCard(data) {
    const article = document.createElement("article");
    const title = document.createElement("strong");
    const lineBreak = document.createElement("br");
    const small1 = document.createElement("small");
    const small2 = document.createElement("small");
    const small3 = document.createElement("small");
    const text1 = document.createTextNode(data.get("hice") || "");
    const text2 = document.createTextNode(data.get("mal") || "");
    const text3 = document.createTextNode(data.get("mejorar") || "");

    article.className = "mini";
    title.textContent = "Bitacora guardada";
    small1.textContent = "Que hice:";
    small2.textContent = "Que salio mal:";
    small3.textContent = "Como mejorarlo:";

    article.appendChild(title);
    article.appendChild(lineBreak);
    article.appendChild(small1);
    article.appendChild(document.createTextNode(" "));
    article.appendChild(text1);
    article.appendChild(document.createElement("br"));
    article.appendChild(small2);
    article.appendChild(document.createTextNode(" "));
    article.appendChild(text2);
    article.appendChild(document.createElement("br"));
    article.appendChild(small3);
    article.appendChild(document.createTextNode(" "));
    article.appendChild(text3);

    return article;
  }

  function initReflectionForm() {
    const form = dom.byId("reflection-form");
    const log = dom.byId("reflection-log");

    if (!form || !log) {
      return;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      log.prepend(createReflectionCard(data));
      form.reset();
      addXp(35);
    });
  }

  function initUi() {
    initNavigation();
    initAccordions();
    initModals();
    initXpButtons();
    renderRanking();
    initTimer();
    initReflectionForm();
    updateXPView();
  }

  root.ui = {
    initUi,
    updateXPView,
    addXp,
    renderRanking,
    startTimer,
    stopTimer,
    resetTimer,
  };
})();
