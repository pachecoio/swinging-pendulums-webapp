import { useEffect, useState } from 'react'
import './App.css'
import { PendulumConfig, listPendulumConfigs, pauseAllPendulums, startAllPendulums, stopAllPendulums } from './api'
import { Canvas } from './components/canvas'

function App() {
  const [configs, setConfigs] = useState<PendulumConfig[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadConfigs()
  }, [])

  async function loadConfigs() {
    setLoading(true)
    const configs = await listPendulumConfigs()
    setConfigs(configs)
    setLoading(false)
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <div>
        <h1>Pendulum Playground</h1>
        <button onClick={startAllPendulums}>Start</button>
        <button onClick={pauseAllPendulums}>Pause</button>
        <button onClick={stopAllPendulums}>Stop and reset</button>
      </div>
      <Canvas configs={configs} />
    </>
  )
}

export default App
