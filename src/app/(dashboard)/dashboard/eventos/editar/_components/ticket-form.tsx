'use client'
import React, { useState } from 'react'
import axios from 'axios';
import { PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Event, Ticket } from '@prisma/client';
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { TicketSingle } from './ticket';

interface TicketFormProps {
  initialData: Event & { Ticket: Ticket[] };
}

const formSchema = z.object({
  name: z.string().min(3, { message: 'O nome é um campo obrigatório' })
})


export const TicketForm = ({ initialData }: TicketFormProps) => {
  const [isCreating, setIsCreating] = useState(false)
  const toggleCreate = () => setIsCreating((current) => !current)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: ''
    },
    resolver: zodResolver(formSchema)
  })
  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      await axios.post(`/api/events/update/${initialData.id}/ticket`, values)
      toggleCreate()  
      router.refresh()
    } catch { 
      toast.error('Algo deu errado ao criar o ingresso, tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-6 border bg-slate-50 rounded-md p-4 relative">
      <div className="font-medium flex items-center justify-between">
        Ingressos 
        <Button 
          variant="ghost" 
          disabled={isLoading}
          onClick={toggleCreate}
          className="text-primary600 hover:bg-transparent hover:text-primary800 disabled:bg-transparent"  
        >
          {
            isCreating 
            ? (
              <>Cancelar</>
            ) 
            : (
              <>
                <PlusCircle className="h-4 w-5 mr-1" />
                Adicionar um ingresso
              </>
            )
          }
        </Button>
      </div>
        {
          isCreating ? (
            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 mt-4"  
              >
                <FormField 
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          disabled={isSubmitting}
                          placeholder="Nome do ingresso"
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
            <>
              {
                initialData.Ticket.length > 0 ? (
                  <div className="mt-6 space-y-3">
                    {
                      initialData.Ticket.map(ticket => (
                        <TicketSingle
                          key={ticket.id}
                          item={ticket}
                          eventId={initialData.id}
                        />
                      ))
                    }
                  </div>
                ) : (
                  <p className="text-sm italic mt-2">Nenhum ingresso encontrado</p>
                )
              }
            </>
          )
        }
    </div>
  )
}
