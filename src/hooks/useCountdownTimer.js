import { useEffect, useRef, useState } from "react";

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const rest = String(seconds % 60).padStart(2, "0");
  return `${String(minutes).padStart(2, "0")}:${rest}`;
}

export function useCountdownTimer(initialSeconds) {
  const [remaining, setRemaining] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    intervalRef.current = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsRunning(false);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  useEffect(
    () => () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    },
    [],
  );

  const start = () => setIsRunning(true);
  const stop = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  const reset = () => {
    stop();
    setRemaining(initialSeconds);
  };

  return {
    remaining,
    formattedTime: formatTime(remaining),
    isRunning,
    start,
    stop,
    reset,
  };
}
