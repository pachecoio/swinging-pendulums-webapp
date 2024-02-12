import { Config, pauseAllPendulums, startAllPendulums, stopAllPendulums, updateSettings } from '@/api'
import { Button } from '@/components/ui/button'
import { PlayIcon, PauseIcon, StopIcon, GearIcon } from '@radix-ui/react-icons'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { MainControlForm } from '@/forms/main-control-form'

export function MainControlPanel() {

  async function handleSettingsChange(settings: Config) {
    console.log('update settings', settings)
    await updateSettings(settings)
  }

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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline'>
              <GearIcon className='mx-2' />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Settings</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Change the settings for the pendulum simulation.
            </DialogDescription>
            <MainControlForm initialValues={{
              gravity: 1,
              time: 1,
              refreshRate: 100,
            }} onSubmit={handleSettingsChange} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}


