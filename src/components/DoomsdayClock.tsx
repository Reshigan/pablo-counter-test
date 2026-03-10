// src/components/DoomsdayClock.tsx
import React from 'react';
import { useTimer } from '../hooks/useTimer';
import { formatDuration } from '../utils/formatDuration';

const TARGET_DATE = new Date('2100-01-01T00:00:00Z');

export const DoomsdayClock: React.FC = () => {
  const timeLeftMs = useTimer(TARGET_DATE);

  // Progress calculation
  const now = Date.now();
  const totalDuration = TARGET_DATE.getTime() - now;
  const progress = totalDuration > 0 ? ((totalDuration - timeLeftMs) / totalDuration) * 100 : 100;

  // SVG circle parameters
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress / 100);

  return (
    <div className="flex flex-col items-center space-y-6 mt-12">
      <h2 className="text-2xl font-semibold text-gray-800">Universe Age</h2>
      <p className="text-4xl font-mono text-indigo-600">13.8 billion years</p>

      <h2 className="text-2xl font-semibold text-gray-800">Doomsday Clock</h2>
      <div className="relative w-80 h-80">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#f97316"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-3xl font-mono text-indigo-600">
            {formatDuration(timeLeftMs)}
          </p>
          <p className="text-sm text-gray-500">until doomsday</p>
        </div>
      </div>
    </div>
  );
};