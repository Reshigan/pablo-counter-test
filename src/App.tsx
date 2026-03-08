import { useState } from 'react'
import Counter from './components/Counter'
import ThemeToggle from './components/ThemeToggle'
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme, toggleTheme } = useTheme()
  const [count, setCount] = useState(0)

  const increment = () => setCount(prev => prev + 1)
  const decrement = () => setCount(prev => prev - 1)
  const reset = () => setCount(0)

  return (
    <div className={`app ${theme}`}>
      <div className="container">
        <header className="header">
          <h1>Counter App</h1>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </header>
        <main>
          <Counter
            count={count}
            increment={increment}
            decrement={decrement}
            reset={reset}
          />
        </main>
      </div>
    </div>
  )
}

export default App