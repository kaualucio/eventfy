'use client'
import React, { useState } from 'react'
import axios from 'axios';
import * as z from 'zod'
import { Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
// import { Textarea } from '@/components/ui/textarea';
import { Combobox } from '@/components/ui/combobox';
   

interface TypeEventFormProps {
  initialData: {
    id: string;
    typeId: string | null
  };
  options: {
    label: string;
    value: string;
  }[]
}

const formSchema = z.object({
  typeId: z.string().min(1)
})

export const TypeEventForm = ({ initialData, options }: TypeEventFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()
  const toggleEdit = () => setIsEditing((current) => !current)

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      typeId: initialData.typeId || ''
    },
    resolver: zodResolver(formSchema)
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/events/update/${initialData.id}`, values)
      toast.success('A categoria do evento foi alterada com sucesso!')
      toggleEdit()
      router.refresh()
    } catch { 
      toast.error('Algo deu errado ao alterar a categoria, tente novamente.')
    }
  }

  const selectedOption = options.find(option => option.value === initialData.typeId)

  return (
    <div className="mt-6 border bg-slate-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Tipo do evento
        <Button 
          variant="ghost" 
          onClick={toggleEdit}
          className="text-primary600 hover:bg-transparent hover:text-primary800"
        >
          {isEditing 
            ? (
              <>Cancelar</>
            ) 
            : (
              <>
                <Pencil className="h-4 w-5 mr-2" />
                Editar Tipo
              </>
            )
          }
          </Button>
      </div>
      {
        !isEditing 
          ? (
              <p className={cn(
                "text-sm mt-2 ",
                !initialData.typeId && 'italic'
              )}>
                { selectedOption?.label || 'Sem tipo'}
              </p>
            )
          : (
            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-4"  
              >
                <FormField
                  control={form.control}
                  name="typeId"
                  render={({ field}) => (
                    <FormItem>
                      <FormControl>
                        <Combobox 
                          placeholder="Escolha um tipo"
                          placeholderSearch="Procure por tipo de evento..."
                          options={options}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-x-2">
                  <Button 
                    disabled={!isValid || isSubmitting}
                    type="submit"
                  >Salvar</Button>
                </div>
              </form>
            </Form>
          )
      }
    </div>
  )
}
