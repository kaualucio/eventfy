'use client'
import Link from 'next/link'
import React from 'react'
import { AlignRight, ShoppingBasket } from 'lucide-react'

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { mapNavigation } from './web-menu'
import { LoggedUser } from './logged-user'
import { MainNavigationMenuProps } from './header'
import { useCart } from '@/hooks/useCart'

export const MobileMenu = ({ user }: MainNavigationMenuProps) => {
  return (
    <div className="md:hidden flex items-center gap-5">
      <Sheet>
        <SheetTrigger className="bg-primary50 text-secondary500 w-10 h-10 flex items-center justify-center rounded-md hover:bg-primary100">
          <AlignRight />
        </SheetTrigger>
        <SheetContent className="pt-20">
          <nav className="flex flex-col items-center gap-8">
            {
              mapNavigation.map(link => (
                <Link 
                  key={link.label}
                  href={link.href}
                  className="text-md font-medium text-secondary500 transition hover:text-primary500"
                >
                  {link.label}
                </Link>
              ))
            }
          </nav>
          {
            !user && (
                <div className="mt-8 flex flex-col items-center gap-4">
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
        </SheetContent>
      </Sheet>
      {
       user && (<LoggedUser name={user.name!} image={user.image!}/>)
      }
    </div>
  )
}
