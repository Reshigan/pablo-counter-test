// src/hooks/useTimer.tsx
import { useState, useEffect } from 'react';

export const useTimer = (target: Date) => {
  const [timeLeft, setTimeLeft] = useState<number>(target.getTime() - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = target.getTime() - Date.now();
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  return timeLeft;
};