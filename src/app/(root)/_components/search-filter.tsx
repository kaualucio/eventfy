'use client'
import { SelectButton } from '@/components/shared/select-button'
import { Input } from '@/components/ui/input'
import React from 'react'

export const SearchFilter = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div className="w-full md:max-w-sm">
        <Input 
          type="text"
          placeholder="Pesquise por nome..."
        />
      </div>
      <div className="flex items-center flex-wrap gap-3">
        <SelectButton label="Todos" />
        <SelectButton label="Hoje" />
        <SelectButton label="Online" />
        <SelectButton label="Esse final de semana" />
        <SelectButton label="Gratuito" />
        <SelectButton label="Músicas & Shows" />
        <SelectButton label="Geek" />
        <SelectButton label="Tecnologia" />
      </div>
    </div>
  )
}
