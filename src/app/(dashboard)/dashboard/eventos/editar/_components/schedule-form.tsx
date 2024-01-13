'use client'
import React, { useState } from 'react'
import axios from 'axios';
import { Loader2, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Event, Schedule } from '@prisma/client';
import { ScheduleDay } from './schedule-day';
// import { ChapterList } from './ChapterList';
   

interface ScheduleFormProps {
  initialData: Event & { Schedule: Schedule[] };
}

export const ScheduleForm = ({ initialData }: ScheduleFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async () => {
    try {
      setIsLoading(true)
      await axios.post(`/api/events/update/${initialData.id}/schedule`)
      router.refresh()
    } catch { 
      toast.error('Algo deu errado ao atualizar a descrição, tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-6 border bg-slate-50 rounded-md p-4 relative">
      <div className="font-medium flex items-center justify-between">
        Cronograma 
        <Button 
          variant="ghost" 
          disabled={isLoading}
          onClick={onSubmit}
          className="text-primary600 hover:bg-transparent hover:text-primary800 disabled:bg-transparent"  
        >
          <PlusCircle className="h-4 w-5 mr-1" />
          Adicionar um cronograma
        </Button>
      </div>
      {
        initialData.Schedule.length > 0 ? (
          <div className="mt-6">
            {
              initialData.Schedule.map((schedule, index) => (
                <ScheduleDay 
                  key={schedule.id}
                  item={schedule}
                  onEdit={() => {}}
                  isFirst={index === 0}
                  isLast={ (initialData.Schedule.length - 1) === index}
                />
              ))
            }
          </div>
        ) : (
          <p className="text-sm italic mt-2">Nenhum cronograma encontrado</p>
        )
      }
    </div>
  )
}
