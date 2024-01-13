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
import { DatePicker } from '@/components/ui/date-picker'
import { TimePiker } from '@/components/ui/time-picker'
import { format, getHours, getMinutes, set, toDate } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface DatetimeStartFormProps {
  initialData: Event
}


export const DatetimeStartForm = ({ initialData }: DatetimeStartFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [dateStart, setDateStart] = useState<Date | undefined>(new Date(initialData.datetime_start!) || undefined)
  const [hourStart, setHourStart] = useState<string | number>(getHours(new Date(initialData.datetime_start!)) || '0')
  const [minuteStart, setMinuteStart] = useState<string | number>(getMinutes(new Date(initialData.datetime_start!)) || '0')
  const toggleEdit = () => setIsEditing((current) => !current)
  const router = useRouter()

  const onSubmit = async () => { 
    try {
      await axios.patch(`/api/events/update/${initialData.id}`, {
        datetime_start: set(dateStart!, { hours: Number(hourStart), minutes: Number(minuteStart)})
      })
      toast.success('A data de início do evento foi alterado com sucesso!')
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error('Algo deu errado, tente novamente')
    }
  }

  const handleSelectDate = (date: Date | undefined) => {
    setDateStart(date)
  }
  const handleSelectHour = (value: string | number) => {
    setHourStart(value)
  }
  const handleSelectMinute = (value: string | number) => {
    setMinuteStart(value)
  }

  return (
    <div className="mt-6 rounded-md bg-slate-50 p-5 border">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-secondary500 font-medium">Data de início</h3>
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
                Editar Data
              </>
            )
          }
        </Button>
      </div>
      {
        isEditing ? (
          <div className="mt-2 space-y-8">
            <div className="flex items-start min-[1360px]:items-end gap-5 flex-col min-[1360px]:flex-row">
              <DatePicker
                handleSelectDate={handleSelectDate}
                date={dateStart}
              />
              <div className="flex items-center gap-3">
                <div className="flex  flex-col gap-1">
                  <p className="text-center text-sm text-secondary200">Hora</p>
                  <TimePiker
                    onChange={handleSelectHour}
                    value={hourStart}
                    type="hours"
                  />
                </div>
                  <p className="pt-6 text-xl font-bold text-secondary500"> : </p>
                <div className="flex  flex-col gap-1">
                  <p className="text-center text-sm text-secondary200">Minuto</p>
                  <TimePiker
                    onChange={handleSelectMinute}
                    value={minuteStart}
                    type="minutes"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <Button
                onClick={onSubmit} 
                type="button"
              >Salvar</Button>
            </div>
          </div>
        )
        : (
          <>
            {
              initialData.datetime_start ? (
                <p className="mt-2 ">
                  O evento está marcado para iniciar no dia <span className="text-primary500 font-semibold">{format(new Date(initialData.datetime_start), 'PPP', { locale: ptBR })}</span> às <span className="text-primary500 font-semibold">{format(new Date(initialData.datetime_start), 'HH:mm')}</span>
                  </p>
              ) : (
                <p className="text-sm mt-2 italic">Sem data de início</p>
              )
            }
          </>
        )
      }
    </div>
  )
}
