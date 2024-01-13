import { cn } from '@/lib/utils'
import React from 'react'

interface SelectButtonProps {
  label: string;
}

export const SelectButton = ({ label }: SelectButtonProps) => {
  let selected = ''
  return (
    <button className={cn(
      "w-fit px-2 py-[2px] border border-input rounded-full text-secondary100 font-normal text-sm hover:text-primary500 hover:border-primary500",
      selected === label && 'text-primary500 border-primary500'
    )}>
      {label}
    </button>
  )
}
