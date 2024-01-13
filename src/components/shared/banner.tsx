'use client'
import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { AlertTriangle, Info, LucideIcon, XCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const bannerVariants = cva(
  "w-full lg:h-14 flex flex-col lg:flex-row items-center justify-between gap-3 px-10 py-2 text-secondary500 text-sm",
  {
    variants: {
      variant: {
        default: "bg-primary200",
        warning: "bg-yellow-100",
        danger: "bg-red-200",
        info: "bg-sky-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
  children?: React.ReactNode
}

const iconMap = {
  default: '',
  warning: AlertTriangle,
  info: Info,
  danger: XCircle
}

export const Banner = ({ label, children, variant }: BannerProps) => {
  const Icon = iconMap[variant || 'warning']
  return (
    <div className={cn(bannerVariants({ variant }))}>
      <div className="flex items-center gap-3">
        <Icon className="w-10 lg:w-6 h-10 lg:h-6" />
        {label}
      </div>
      { children }
    </div>
  )
}
