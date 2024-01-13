'use client'
import React, { useState } from 'react'
import { ChevronDown, Pencil, Trash } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Schedule } from '@prisma/client';
import { Preview } from '@/components/shared/preview';
import * as z from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Editor } from '@/components/shared/editor';

interface ScheduleDayProps {
  onEdit: (id: string) => void;
  item: Schedule;
  isFirst: boolean;
  isLast: boolean;
}

const formSchema = z.object({
  description: z.string().min(1),
})

export const ScheduleDay = ({ item, onEdit, isFirst, isLast }: ScheduleDayProps) => {
  const [openDescription, setOpenDescription] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()
  const toggleEdit = () => setIsEditing((current) => !current)
  const handleOpenScheduleDescription = (scheduleDayId: string) => {
    if(openDescription === scheduleDayId) {
      return setOpenDescription(null)
    }

    setOpenDescription(scheduleDayId)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      description: item.description || ''
    },
    resolver: zodResolver(formSchema)
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/events/update/${item.eventId}/schedule/update/${item.id}`, values)
      toast.success(`A descrição da agenda do dia ${item.day} foi atualizada com sucesso!`)
      toggleEdit()
      router.refresh()
    } catch { 
      toast.error('Algo deu errado ao atualizar a descrição, tente novamente.')
    }
  }

  const deleteScheduleDay = async () => {
    try {
      await axios.delete(`/api/events/update/${item.eventId}/schedule/delete/${item.id}`)
      toast.success(`A descrição da agenda do dia ${item.day} foi deletada com sucesso!`)
      toggleEdit()
      router.refresh()
    } catch { 
      toast.error(`Algo deu errado ao deletar o cronograma do dia ${item.day}, tente novamente.`)
    }
  }

  return (
    <div className="bg-primary50 flex flex-col">
      <div 
        className={cn(
          "flex flex-col bg-primary50 border-x border-t border-primary100  text-secondary500 text-sm",
          isFirst && 'border-x rounded-t',
          isLast && 'border-b border-x rounded-b'
        )}
      >
        <div className="flex items-center gap-x-2 ">
          <button 
            onClick={() => handleOpenScheduleDescription(item.id)}
            className={cn(
              "px-2 py-3 border-r text-primary600 border-r-primary100 hover:bg-primary100 transition", 
            )}
          >
            <ChevronDown 
              className="h-5 w-5"
            />
          </button>
          Dia {item.day}
          <div className="ml-auto pr-2 flex items-center gap-x-2">
            <Pencil 
              onClick={toggleEdit}
              className="w-4 h-4 cursor-pointer text-primary600 hover:text-primary700 transition" 
            />
            <Trash 
              onClick={deleteScheduleDay}
              className="w-4 h-4 cursor-pointer text-primary600 hover:text-primary700 transition" 
            />
          </div>
        </div>
        <div className={cn(
          "bg-primary50 p-4 text-sm hidden border-t border-t-primary100",
          openDescription === item.id && 'block'
        )}>
          {
            item.description ? (
              <Preview value={item.description} />
            ) : (
              <p className="text-sm italic text-slate-500">
                Nenhuma descrição para esse dia do evento
              </p>
            )
          }
        </div>     
          {
            isEditing && (
              <div className="p-4 border-t border-t-primary100">
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
              </div> 
              )
          }
      </div> 
    </div> 
        
  )
}
