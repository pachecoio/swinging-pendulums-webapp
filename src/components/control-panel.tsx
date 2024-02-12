import { PendulumConfig, UpdatePendulumOptions, updatePendulum } from "@/api"
import { useFetchPendulum } from "@/hooks/pendulumHooks"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { PendulumConfigForm } from "@/forms/pendulum-config-form"

export function PendulumControlPanel({ config }: { config: PendulumConfig }) {

  const { pendulum, loading } = useFetchPendulum(config.port)

  const handleUpdatePendulum = async (data: UpdatePendulumOptions) => {
    await updatePendulum(config.port, data)
  }

  if (loading || !pendulum) {
    return <h1>Loading...</h1>
  }

  return (
    <Card className='w-[200px]' >
      <CardHeader>
        <CardTitle>Pendulum {config.pendulum.id}</CardTitle>
      </CardHeader>
      <CardContent>
        <PendulumConfigForm pendulum={pendulum} onSubmit={handleUpdatePendulum} />
      </CardContent>
    </Card>
  )
}



