'use client'
import React, { useState } from 'react'
import { ChevronDown, Loader2, Pencil, Settings, TicketIcon, Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Ticket } from '@prisma/client';
import * as z from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { DatetimeStartForm } from './datetime-start-form';
import { DatePicker } from '@/components/ui/date-picker';
import { getHours, getMinutes, set } from 'date-fns';
import { TimePiker } from '@/components/ui/time-picker';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ConfirmModal } from '@/components/shared/confirm-modal';
import { formatPrice } from '@/utils/format-price';

interface TicketProps {
  item: Ticket;
  eventId: string;
}
const formSchema = z.object({
  name: z.string().min(3, { message: 'O nome é um campo obrigatório' }),
  remark: z.string(),
  price: z.coerce.number(),
  quantity: z.coerce.number().min(1),
  min_quantity: z.coerce.number().min(1),
  max_quantity: z.coerce.number().min(1),
  is_half_price: z.boolean().default(false)
})

export const TicketSingle = ({ item, eventId }: TicketProps) => {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [dateStart, setDateStart] = useState<Date | undefined>(new Date(item.start_sell!) || undefined)
  const [hourStart, setHourStart] = useState<string | number>(getHours(new Date(item.start_sell!)) || '0')
  const [minuteStart, setMinuteStart] = useState<string | number>(getMinutes(new Date(item.start_sell!)) || '0')
  const [dateEnd, setDateEnd] = useState<Date | undefined>(new Date(item.end_sell!) || undefined)
  const [hourEnd, setHourEnd] = useState<string | number>(getHours(new Date(item.end_sell!)) || '0')
  const [minuteEnd, setMinuteEnd] = useState<string | number>(getMinutes(new Date(item.end_sell!)) || '0')
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: item.name,
      remark: item.remark || '',
      price: item.price || 0,
      quantity: item.quantity || 0,
      min_quantity: item.min_quantity || 0,
      max_quantity: item.max_quantity || 0,
      is_half_price: item.is_half_price || false,
    },
    resolver: zodResolver(formSchema)
  })
  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/events/update/${eventId}/ticket/${item.id}`, {
        ...values,
        start_sell: set(dateStart!, { hours: Number(hourStart), minutes: Number(minuteStart)}),
        end_sell: set(dateEnd!, { hours: Number(hourEnd), minutes: Number(minuteEnd)})
      })
      toast.success(`As informações do ingresso ${item.name} foram atualizadas com sucesso!`)
      router.refresh()
    } catch(error) {
      console.log(error)
      toast.error('Algo deu errado ao atualizar as informações do ingresso.')
    }
  }

  const onConfirm = async () => {
    try {
      setIsDeleting(true)
      const deletedTicket = await axios.delete(`/api/events/update/${eventId}/ticket/delete/${item.id}`)
      toast.success(`O ingresso ${deletedTicket.data.name} foi deletado com sucesso!`)
      router.refresh()
    } catch(error) {
      toast.error('Algo deu errado ao deletar o ingresso, tente novamente.')
    } finally {
      setIsDeleting(false)
    }
  }
  
  const handleSelectDateStart = (date: Date | undefined) => {
    console.log('date start', date)
    setDateStart(date)
  }
  const handleSelectHourStart = (value: string | number) => {
    setHourStart(value)
  }
  const handleSelectMinuteStart = (value: string | number) => {
    setMinuteStart(value)
  }

  const handleSelectDateEnd = (date: Date | undefined) => {
    setDateEnd(date)
  }
  const handleSelectHourEnd = (value: string | number) => {
    setHourEnd(value)
  }
  const handleSelectMinuteEnd = (value: string | number) => {
    setMinuteEnd(value)
  }

  return (
    <div 
      className= "flex items-center justify-between py-3 px-2 rounded-md bg-primary50 border border-primary100 text-secondary500 text-sm"
    >
      {item.name}
      <div className="ml-auto pr-2 flex items-center gap-x-2">
        {
          item?.price === 0 ? (
            <Badge>
              Gratuito
            </Badge>
          ) : null
        }
        {
          item.price && item.price > 0 ? (
            <Badge>
              {formatPrice(item.price)}
            </Badge>
          ) : null
        }
        {
          item?.is_half_price ? (
            <Badge>
              Meia-entrada
            </Badge>
          ) : null
        }
        <Sheet>
          <SheetTrigger disabled={isDeleting || isSubmitting}>
            <Settings 
              onClick={() => {}}
              className="w-4 h-4 cursor-pointer text-primary600 hover:text-primary700 transition" 
            />
          </SheetTrigger>
          <SheetContent className="w-[500px] sm:max-w-[700px] overflow-y-auto py-10">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-3">
                <TicketIcon className="w-6 h-6" />
                Configure seu ingresso
              </SheetTitle>
              <SheetDescription>
                Configure aqui todas as informações relacionadas ao seu ingresso <span className="italic text-secondary500 font-medium">{item.name}</span>
              </SheetDescription>

              <div className="w-full">
                <Form {...form}>
                  <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-6 mt-4"  
                  >
                    <FormField 
                      name="name"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Nome
                          </FormLabel>
                          <FormControl>
                            <Input 
                              disabled={isSubmitting}
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField 
                      name="remark"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Observações (opcional)
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              disabled={isSubmitting}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                      <FormField 
                        name="quantity"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>
                              Total de ingressos disponível
                            </FormLabel>
                            <FormControl>
                              <Input 
                                className=""
                                disabled={isSubmitting}
                                type="number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField 
                        name="price"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>
                              Preço unitário (R$)
                            </FormLabel>
                            <FormControl>
                              <Input 
                                disabled={isSubmitting}
                                type="number"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Ao deixar o campo valor <span className="italic text-secondary500">zerado</span> você estará criando um ingresso gratuito
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    <div className="flex items-center gap-5">
                      <FormField 
                        name="min_quantity"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>
                              Quantidade mínima
                            </FormLabel>
                            <FormControl>
                              <Input 
                                disabled={isSubmitting}
                                type="number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField 
                        name="max_quantity"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>
                              Quantidade máxima
                            </FormLabel>
                            <FormControl>
                              <Input 
                                disabled={isSubmitting}
                                type="number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2 w-full">
                      <FormLabel>
                        Inicio da venda dos ingressos
                      </FormLabel>
                      <div className="w-full flex items-center justify-between gap-5">
                        <div className="mt-1">
                          <p className="text-sm text-secondary200">Data</p>
                          <DatePicker 
                            date={dateStart}
                            handleSelectDate={handleSelectDateStart}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-center text-sm text-secondary200">Hora</p>
                          <TimePiker
                            onChange={handleSelectHourStart}
                            value={hourStart}
                            type="hours"
                          />
                        </div>
                        <p className="pt-6 text-xl font-bold text-secondary500"> : </p>
                        <div className="flex  flex-col gap-1">
                          <p className="text-center text-sm text-secondary200">Minuto</p>
                          <TimePiker
                            onChange={handleSelectMinuteStart}
                            value={minuteStart}
                            type="minutes"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <FormLabel>
                        Encerramento da venda dos ingressos
                      </FormLabel>
                      <div className="w-full flex items-center justify-between gap-3">
                        <div className="mt-1">
                          <p className="text-sm text-secondary200">Data</p>
                          <DatePicker 
                            date={dateEnd}
                            handleSelectDate={handleSelectDateEnd}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-center text-sm text-secondary200">Hora</p>
                          <TimePiker
                            onChange={handleSelectHourEnd}
                            value={hourEnd}
                            type="hours"
                          />
                        </div>
                        <p className="pt-6 text-xl font-bold text-secondary500"> : </p>
                        <div className="flex  flex-col gap-1">
                          <p className="text-center text-sm text-secondary200">Minuto</p>
                          <TimePiker
                            onChange={handleSelectMinuteEnd}
                            value={minuteEnd}
                            type="minutes"
                          />
                        </div>
                      </div>
                    </div>
                    <FormField 
                        name="is_half_price"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <div className="flex items-center gap-2 mt-6">
                                <Checkbox
                                  className="border-secondary100"
                                  {...field}
                                  onCheckedChange={() => {
                                    field.onChange(!field.value)
                                    return
                                  }}
                                  defaultChecked={field.value}
                                  value={String(field.value)}
                                />
                                <span className="text-sm text-secondary200">Quero que esse ingresso seja classificado como meia entrada</span>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    <div className="flex items-center gap-x-2">
                      <Button 
                        disabled={!isValid || isSubmitting}
                        size="full"
                        type="submit"
                      >Salvar</Button>
                    </div>
                  </form>
                </Form>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <ConfirmModal
          onConfirm={onConfirm}
          isLoading={isDeleting || isSubmitting}
          title="Você tem certeza?"
          description={`Essa ação não poderá ser desfeita, você tem certeza que deseja realmente deletar o ingresso "${item.name}"`}
        >
          {
            isDeleting ? (
              <div className="animate-spin text-primary500">
                <Loader2 />
              </div>
            ) : <Trash className="w-4 h-4 cursor-pointer text-primary600 hover:text-primary700 transition" />
          }
        </ConfirmModal>
      </div>
    </div>     
  )
}
