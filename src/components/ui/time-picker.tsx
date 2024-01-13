"use client"
 
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import * as z from 'zod'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ptBR } from "date-fns/locale"
 
interface TimePickerProps {
  type: 'hours' | 'minutes';
  value:  string | number
  onChange: (value: number | string) => void
}

// Array de horas (0 a 23)
const hours = Array.from({ length: 24 }, (_, index) => index);

// Lista de minutos (0 a 59)
const minutes = Array.from({ length: 60 }, (_, index) => index);


export function TimePiker({ type, onChange, value }: TimePickerProps) {
  const [selectedValue, setSelectedValue] = React.useState(value)
  const [open, setOpen] = React.useState(false);
  

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="min-w-[56px] bg-white border-secondary50 hover:bg-white w-14 h-14 text-lg text-secondary500"
        >
          {String(value).padStart(2, '0')}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 flex flex-col max-h-[300px] overflow-y-auto ">
        {
          type === 'hours' ? hours.map(hour => (
              <Button
                onClick={() => { 
                  onChange(hour)
                  setOpen(false)
                }}
                key={hour}
                variant="ghost"
                className="rounded-none"
              >
                {String(hour).padStart(2, '0')}
              </Button>
            )) : minutes.map(hour => (
              <Button
                onClick={() => { 
                  onChange(hour)
                  setOpen(false)
                }}
                key={hour}
                variant="ghost"
                className="rounded-none"
              >
                {String(hour).padStart(2, '0')}
              </Button>
            ))
        }

      </PopoverContent>
    </Popover>
  )
}