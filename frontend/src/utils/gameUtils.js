export const missionVideoId = "USBsHK7C8S0";

export function loadYouTubeIframeAPI() {
  if (window.YT?.Player) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(
      "script[data-youtube-iframe-api]",
    );
    if (existingScript) {
      const previousReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previousReady?.();
        resolve();
      };
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.dataset.youtubeIframeApi = "true";
    script.onerror = () => reject(new Error("No se pudo cargar la API de YouTube"));

    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      resolve();
    };

    document.body.appendChild(script);
  });
}

export function getRankName(xp, gameConfig) {
  return (
    [...gameConfig.ranks].reverse().find((rank) => xp >= rank.min)?.name ??
    gameConfig.ranks[0].name
  );
}

export function formatTimer(seconds) {
  const minutes = Math.floor(seconds / 60);
  const rest = String(seconds % 60).padStart(2, "0");
  return `${String(minutes).padStart(2, "0")}:${rest}`;
}

const badgeCardModules = import.meta.glob(
  "../assets/images/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    import: "default",
  },
);

export const badgeCards = Object.entries(badgeCardModules)
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([path, src], index) => {
    const fileName = path.split("/").pop() ?? `insignia-${index + 1}`;
    const baseName = fileName.replace(/\.[^.]+$/, "");
    const title = baseName
      .replace(/^Tarjeta_de_/i, "")
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    return {
      src,
      title,
      alt: `Tarjeta de insignia ${index + 1}`,
    };
  });
