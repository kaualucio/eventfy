import { Logo } from '@/components/shared/logo'
import React from 'react'
import { SidebarRoutes } from './sidebar-routes'

export const Sidebar = () => {
  return (
    <aside className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </aside>
  )
}
