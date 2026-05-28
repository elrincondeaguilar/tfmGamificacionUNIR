import { useEffect } from "react";
import { loadYouTubeIframeAPI, missionVideoId } from "../utils/gameUtils";

export default function useMissionVideo(
  missionVideoOpen,
  containerRef,
  playerRef,
  onEnded,
) {
  useEffect(() => {
    if (!missionVideoOpen || !containerRef.current) {
      return undefined;
    }

    let cancelled = false;

    const initializePlayer = async () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }

      try {
        await loadYouTubeIframeAPI();

        if (cancelled || !containerRef.current) {
          return;
        }

        playerRef.current = new window.YT.Player(containerRef.current, {
          videoId: missionVideoId,
          playerVars: {
            autoplay: 1,
            controls: 1,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
          },
          events: {
            onReady: (event) => {
              event.target.playVideo();
            },
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                onEnded?.();
              }
            },
          },
        });
      } catch (error) {
        console.error(error);
      }
    };

    initializePlayer();

    return () => {
      cancelled = true;

      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [missionVideoOpen, containerRef, playerRef, onEnded]);
}
