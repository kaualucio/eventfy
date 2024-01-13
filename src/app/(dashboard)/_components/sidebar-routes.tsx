'use client'
import React from 'react'
import { SidebarItem } from './sidebar-item'
import { BarChartHorizontalBig, CalendarDays, CreditCard, LayoutPanelLeft, Settings, Ticket } from 'lucide-react'

const routes = [
  { label: 'Home', href:'/dashboard', icon: LayoutPanelLeft },
  { label: 'Eventos', href:'/dashboard/eventos', icon: CalendarDays },
  { label: 'Ingressos', href:'/dashboard/ingressos', icon: Ticket },
  { label: 'Métricas', href:'/dashboard/metricas', icon: BarChartHorizontalBig },
  { label: 'Pagamentos', href:'/dashboard/pagamentos', icon: CreditCard },
  { label: 'Configurações', href:'/dashboard/configuracoes', icon: Settings },
]

export const SidebarRoutes = () => {

  return (
    <div className="flex flex-col w-full">
      {
        routes.map((route) => (
          <SidebarItem 
            key={route.label}
            label={route.label}
            icon={route.icon}
            href={route.href}
          />
        ))
      }
    </div>
  )
}
