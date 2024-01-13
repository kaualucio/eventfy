import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (pathname === '/' && href === '/') || pathname === href 
  // || pathname?.startsWith(`${href}/`) TODO: Remove if dont needed
  const onClick = () => {
    router.push(href)
  }

  return (
    <button 
      onClick={onClick}
      type="button"
      className={cn(
        "group flex items-center gap-x-2 text-secondary300 text-sm font-[500] pl-6 transition-all hover:text-primary500 hover:bg-primary50",
        isActive && "text-primary500 bg-primary50 hover:bg-primary100 hover:text-primary500"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon 
          size={22} 
          className={cn(
            "text-secondary300 group-hover:text-primary500",
            isActive && "text-primary500"
          )} 
        />
        {label}
      </div>
      <div className={cn(
        "ml-auto opacity-0 border-2 border-primary500 h-full transition-all",
        isActive && "opacity-100"
      )} />
    </button>
  )
}
