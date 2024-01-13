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
import { Editor } from '@/components/shared/editor';
import { Event } from '@prisma/client';
import { Preview } from '@/components/shared/preview';
   

interface DescriptionFormProps {
  initialData: Event;
}

const formSchema = z.object({
  description: z.string().min(1),
})

export const DescriptionForm = ({ initialData }: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()
  const toggleEdit = () => setIsEditing((current) => !current)

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      description: initialData.description || ''
    },
    resolver: zodResolver(formSchema)
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/events/update/${initialData.id}`, values)
      toast.success('A descrição do evento foi atualizada com sucesso!')
      toggleEdit()
      router.refresh()
    } catch { 
      toast.error('Algo deu errado ao atualizar a descrição, tente novamente.')
    }
  }


  return (
    <div className="mt-6 border bg-slate-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Descrição do evento
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
                Editar Descrição
              </>
            )
          }
          </Button>
      </div>
      {
        !isEditing 
          ? (
              <div className={cn(
                "text-sm mt-2 ",
                !initialData.description && 'text-slate-500 italic'
              )}>
                { !initialData.description && 'Sem descrição'}
                { initialData.description && (
                  <Preview value={initialData.description} />
                )}
              </div>
            )
          : (
            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-4"  
              >
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field}) => (
                    <FormItem>
                      <FormControl>
                       <Editor 
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
