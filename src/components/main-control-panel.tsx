import { pauseAllPendulums, startAllPendulums, stopAllPendulums } from '@/api'
import { Button } from '@/components/ui/button'
import { PlayIcon, PauseIcon, StopIcon } from '@radix-ui/react-icons'

export function MainControlPanel() {
  return (
    <>
      <div className='flex items-center space-x-2 my-4'>
        <Button onClick={startAllPendulums}>
          <PlayIcon className='mx-2' />
        </Button>
        <Button variant='outline' onClick={pauseAllPendulums}>
          <PauseIcon className='mx-2' />
        </Button>
        <Button variant='destructive' onClick={stopAllPendulums}>
          <StopIcon className='mx-2' />
        </Button>
      </div>
    </>
  )
}


