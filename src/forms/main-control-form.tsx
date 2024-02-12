import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  gravity: z.string(),
  time: z.string(),
  refreshRate: z.string(),
})

export function MainControlForm({ initialValues, onSubmit }: MainControlFormProps) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gravity: `${initialValues.gravity}`,
      time: `${initialValues.time}`,
      refreshRate: `${initialValues.refreshRate}`,
    }
  })

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit?.({
      gravity: parseFloat(values.gravity),
      time: parseFloat(values.time),
      refreshRate: parseFloat(values.refreshRate),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name='gravity'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gravity</FormLabel>
              <FormControl>
                <Input {...field} type='number' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='time'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                <Input {...field} type='number' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='refreshRate'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Refresh Rate</FormLabel>
              <FormControl>
                <Input {...field} type='number' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}


type MainControlFormProps = {
  initialValues: MainControlConfig
  onSubmit?: (values: MainControlConfig) => void
}

export type MainControlConfig = {
  gravity: number
  time: number
  refreshRate: number
}
