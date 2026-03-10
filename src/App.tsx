// src/App.tsx
import { useCounter } from './hooks/useCounter';
import { CounterDisplay } from './components/CounterDisplay';
import { CounterControls } from './components/CounterControls';
import { Toast } from './components/Toast';
import { DoomsdayClock } from './components/DoomsdayClock';

export default function App() {
  const {
    value,
    isLoading,
    error,
    increment,
    decrement,
    toast,
    dismissToast
  } = useCounter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-indigo-50 to-indigo-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl flex flex-col items-center space-y-6">
        <h1 className="text-3xl font-bold text-indigo-800">React Counter</h1>

        <CounterDisplay
          value={value}
          isLoading={isLoading}
          error={error}
        />

        <CounterControls
          onIncrement={increment}
          onDecrement={decrement}
          isLoading={isLoading}
        />

        <div className="text-sm text-gray-500 text-center">
          <p>Counter value persists across page refreshes</p>
          <p className="mt-1">API calls are made to the backend</p>
        </div>
      </div>

      <DoomsdayClock />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={dismissToast}
        />
      )}
    </div>
  );
}