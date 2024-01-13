import { Sparkles } from 'lucide-react'
import React, { ReactNode } from 'react'

export const HowToItem = ({children}: { children: ReactNode }) => {
  return (
    <div className="flex items-center gap-3">
      <Sparkles className="w-6 h-6 text-primary500" />
      {children}
    </div>
  )
}
