import React from 'react'

interface CounterProps {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

const Counter: React.FC<CounterProps> = ({ count, increment, decrement, reset }) => {
  return (
    <div className="counter">
      <div className="counter-display" aria-live="polite" aria-atomic="true">
        {count}
      </div>
      <div className="counter-controls">
        <button
          className="counter-button decrement"
          onClick={decrement}
          aria-label="Decrement counter"
        >
          -
        </button>
        <button
          className="counter-button reset"
          onClick={reset}
          aria-label="Reset counter to zero"
        >
          Reset
        </button>
        <button
          className="counter-button increment"
          onClick={increment}
          aria-label="Increment counter"
        >
          +
        </button>
      </div>
    </div>
  )
}

export default Counter