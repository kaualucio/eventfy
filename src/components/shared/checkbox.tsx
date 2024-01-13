import React from 'react'
import { FormLabel } from '../ui/form'
import { Checkbox as CheckboxCn } from '../ui/checkbox' 

interface CheckboxProps {
  label: string;
  id: string;
}

export const Checkbox = ({ id, label }: CheckboxProps) => {
  return (
    <div className="flex items-center gap-1 cursor-pointer">
      <CheckboxCn id={id} />
      <FormLabel htmlFor={id} className="text-xs text-secondary300 cursor-pointer">
        {label}
      </FormLabel>
    </div>
  )
}
