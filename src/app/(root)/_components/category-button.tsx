import { LucideIcon } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'

interface CategoryButtonProps {
  icon: LucideIcon
  label: string
}

export const CategoryButton = ({ icon: Icon, label }: CategoryButtonProps) => {
  return (
    <Button variant="outline" className=" h-[50px] bg-primary50 hover:bg-primary100 gap-3">
      <Icon />
      {label}
    </Button>
  )
}
