import React from 'react'
import { LucideIcon } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const backgroundVariants = cva(
  "rounded-md flex items-center justify-center border",
  {
    variants: {
      variant: {
        default: 'bg-primary50 border-primary100',
        secondary: 'bg-secondary500 border-secondary100' 
      },
      size: {
        default: 'p-2 ',
        sm: 'p-1'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

const iconVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: 'text-primary500',
        secondary: 'text-white',
      },
      size: {
        default: 'h-8 w-8',
        sm: 'h-4 w-4'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: "default",
    }
  }
)

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>
type IconVariantsProps = VariantProps<typeof iconVariants>

interface IconBadgeProps extends BackgroundVariantsProps, IconVariantsProps {
  icon: LucideIcon
}

export const IconBadge = ({ icon: Icon, size,variant }: IconBadgeProps) => {
  return (
    <div className={cn(backgroundVariants({ size, variant }))}>
      <Icon  className={cn(iconVariants({ size, variant }))}/>
    </div>
  )
}
