import React, { useEffect, useState } from 'react';
import styles from './DoomsdayClock.module.css';

type TimeLeft = {
  hours: number;
  minutes: number;
  seconds: number;
};

const getTimeUntilMidnight = (): TimeLeft => {
  const now = new Date();
  const midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0,
    0
  );
  const diff = midnight.getTime() - now.getTime();

  const totalSeconds = Math.floor(diff / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
};

const formatNumber = (num: number): string => num.toString().padStart(2, '0');

const DoomsdayClock: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeUntilMidnight());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilMidnight());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.clockContainer} aria-label="Doomsday Clock">
      <div className={styles.timeSegment}>
        <span className={styles.number}>{formatNumber(timeLeft.hours)}</span>
        <span className={styles.label}>Hours</span>
      </div>
      <div className={styles.separator}>:</div>
      <div className={styles.timeSegment}>
        <span className={styles.number}>{formatNumber(timeLeft.minutes)}</span>
        <span className={styles.label}>Minutes</span>
      </div>
      <div className={styles.separator}>:</div>
      <div className={styles.timeSegment}>
        <span className={styles.number}>{formatNumber(timeLeft.seconds)}</span>
        <span className={styles.label}>Seconds</span>
      </div>
    </div>
  );
};

export default DoomsdayClock;