'use client'
import { Schedule } from '@prisma/client'
import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


interface ScheduleTabsProps {
  schedule: Schedule[]
}

export const ScheduleTabs = ({ schedule }: ScheduleTabsProps) => {

  return (
    <Tabs defaultValue="day1" className="w-full">
      <TabsList className="bg-white w-full justify-start rounded-none p-0 h-12 border-b">
        {
          schedule.map((schedule) => (
            <TabsTrigger 
              className="bg-white rounded-none h-full px-7 data-[state=active]:text-white data-[state=active]:bg-primary500"
              key={schedule.id} 
              value={`day${schedule.id}`}
            >
              Dia {schedule.day}
            </TabsTrigger>
          ))
        }
      </TabsList>
      {
          schedule.map((schedule) => (
            <TabsContent 
              className="p-3 text-sm"
              key={schedule.id} 
              value={`day${schedule.id}`}
            >
              <div dangerouslySetInnerHTML={{
                __html: schedule.description!
              }}></div>
            </TabsContent>
          ))
        }
    </Tabs>
  )
}
