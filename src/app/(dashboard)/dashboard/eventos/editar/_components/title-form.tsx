'use client'

import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Event } from '@prisma/client'
import { Pencil } from 'lucide-react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface TitleFormProps {
  initialData: Event
}

const formSchema = z.object({
  title: z.string().min(3, { message: 'Título é campo obrigatório' })
})

export const TitleForm = ({ initialData }: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((current) => !current)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      title: initialData.title
    },
    resolver: zodResolver(formSchema)
  })
  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/events/update/${initialData.id}`, values)
      toast.success('O título do evento foi alterado com sucesso!')
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error('Algo deu errado, tente novamente')
    }
  }

  return (
    <div className="mt-6 rounded-md bg-slate-50 p-5 border">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-secondary500 font-medium">Título do evento</h3>
        <Button 
          onClick={toggleEdit}
          variant="ghost" 
          className="text-primary600 hover:bg-transparent hover:text-primary800">
          {
            isEditing 
            ? (
              <>Cancelar</>
            ) 
            : (
              <>
                <Pencil className="h-4 w-5 mr-2" />
                Editar Título
              </>
            )
          }
        </Button>
      </div>
      {
        isEditing ? (
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-4"  
            >
              <FormField 
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        disabled={isSubmitting}
                        placeholder="Título do evento"
                        type="text"
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
        : (
          <p className="text-sm mt-2">{initialData.title}</p>
        )
      }
    </div>
  )
}
