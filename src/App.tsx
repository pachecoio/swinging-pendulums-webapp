import { useEffect, useState } from 'react'
import { PendulumConfig, listPendulumConfigs } from './api'
import { Canvas } from './components/canvas'
import { MainControlPanel } from './components/main-control-panel'
import { PendulumControlPanel } from './components/control-panel'

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
      <div className='flex flex-col items-center'>
        <h1 className='text-4xl font-extrabold'>Pendulum Playground</h1>
        <MainControlPanel />
      </div>
      <Canvas configs={configs} />
      <ControlPanel configs={configs} />
    </>
  )
}

export function ControlPanel({ configs }: { configs: PendulumConfig[] }) {

  return (
    <div className='flex space-x-2'>
      {configs.map((config, i) => (
        <PendulumControlPanel key={i} config={config} />
      ))}
    </div>
  )
}

export default App
