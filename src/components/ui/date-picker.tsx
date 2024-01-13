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
 
interface DatePickerProps {
  date: Date | undefined
  handleSelectDate: (date: Date | undefined) => void
}

export function DatePicker({ date, handleSelectDate }: DatePickerProps) {
 
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full max-w-xs justify-start text-left font-normal border-secondary50 hover:bg-white text-md text-secondary500 rounded-sm h-14",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-6 w-6" />
          {date ? format(date, "PPP", { locale: ptBR }) : <span>Escolha uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelectDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}