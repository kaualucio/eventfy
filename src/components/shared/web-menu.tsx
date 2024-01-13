'use client'
import Link from 'next/link'
import React from 'react'
import { LoggedUser } from './logged-user'
import { MainNavigationMenuProps } from './header';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ShoppingBasket } from 'lucide-react';
import { useCart } from '@/hooks/useCart';


export const mapNavigation = [
  {
    label: 'Início',
    href: '/'
  },
  {
    label: 'Buscar Eventos',
    href: '/buscar'
  },
  {
    label: 'Como começar',
    href: '/como-comecar'
  },
  {
    label: 'Sobre',
    href: '/sobre'
  },
  {
    label: 'Contato',
    href: '/contato'
  },
]

export const WebMenu = async ({ user }: MainNavigationMenuProps) => {
  const pathname = usePathname()
  return (
    <>
      <nav className="hidden md:flex items-center gap-4 lg:gap-8"> 
        {
          mapNavigation.map(link => (
            <Link 
              key={link.label}
              href={link.href}
              className={cn(
                "relative text-sm font-medium text-secondary500 transition hover:text-primary500 link-detail",
                pathname === link.href && 'text-primary500'
              )}
            >
              {link.label}
            </Link>
          ))
        }
      </nav>
      <div className="hidden md:block">
        {
            user 
              ? (<LoggedUser name={user.name!} image={user.image!}/>)
              : (         
                <div className="hidden md:flex items-center gap-3">
                  <Link 
                    href="/login"
                    className="bg-primary500 rounded-md w-fit h-10 px-3 flex items-center justify-center font-medium text-white transition hover:bg-primary600 "  
                  >
                    Login
                  </Link>
                  <Link 
                    href="/registrar"
                    className="border border-primary500 rounded-md w-fit h-10 px-3 flex items-center justify-center font-medium text-primary500 transition hover:bg-primary50 "  
                  >
                    Registrar-se
                  </Link>
                </div>
              )
          }
      </div>
    </>
  )
}
