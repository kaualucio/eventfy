'use client'
import { SelectButton } from '@/components/shared/select-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'

export const HomeSearch = () => {
  return (
    <div className="w-full max-w-xl flex flex-col gap-3">
      <div className="flex items-center gap-5">
        <Input placeholder="Pesquise por um evento..." />
        <Button size="lg" className="h-[50px]">
          <Search />
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <SelectButton label="Online" />
        <SelectButton label="Hoje" />
        <SelectButton label="Gratuito" />
        <SelectButton label="Este final de semana" />
      </div>
    </div>
  )
}
