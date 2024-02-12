import { UpdatePendulumOptions } from '../api'
import { Button } from '../components/ui/button'
import { Pendulum } from '../models'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form'
import { Input } from '../components/ui/input'

const formSchema = z.object({
  armLength: z.string(),
  angle: z.string(),
  bobRadius: z.string(),
  bobColor: z.string(),
  mass: z.string(),
})

export function PendulumConfigForm({ pendulum, onSubmit }: PendulumConfigFormProps) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      armLength: `${pendulum.armLength}`,
      angle: `${pendulum.angle}`,
      bobRadius: `${pendulum.bob.radius}`,
      bobColor: pendulum.bob.color,
      mass: `${pendulum.mass}`,
    }
  })

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit?.({
      armLength: parseFloat(values.armLength),
      angle: parseFloat(values.angle),
      bobRadius: parseFloat(values.bobRadius),
      bobColor: values.bobColor,
      mass: parseFloat(values.mass),
    })
  }

  return (
    <div className='flex flex-col space-x-2 my-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name='armLength'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Arm Length</FormLabel>
                <FormControl>
                  <Input {...field} type='number' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='angle'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Angle</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='bobRadius'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bob Radius</FormLabel>
                <FormControl>
                  <Input {...field} type='number' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='bobColor'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bob Color</FormLabel>
                <FormControl>
                  <Input {...field} type='text' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='mass'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mass</FormLabel>
                <FormControl>
                  <Input {...field} type='number' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex mt-4'>
            <Button type='submit'>Update</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

interface PendulumConfigFormProps {
  pendulum: Pendulum
  onSubmit?: (data: UpdatePendulumOptions) => void
}
