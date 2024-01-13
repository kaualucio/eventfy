'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,  
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { signOut } from 'next-auth/react'

interface LoggedUserProps {
  name: string;
  image?: string;
}

export const LoggedUser = ({ name, image }: LoggedUserProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={image || `https://github.com/shadcn.png`} />
          <AvatarFallback>{`${name.split(' ')[0][0]}${name.split(' ')[1][0]}`}</AvatarFallback>
        </Avatar>
        <p className="text-sm font-medium text-secondary400">Kauã Lúcio</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="text-start rounded-sm w-[200px]">
        <DropdownMenuLabel>Kauã Lúcio</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="group p-0">
          <Link href="/dashboard/meu-perfil" className="p-2 w-full h-full group-hover:bg-slate-100">
            Meu perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="group p-0">
          <Link href="/meus-favoritos" className="p-2 w-full h-full group-hover:bg-slate-100">
            Meus favoritos
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="group p-0">
          <Link href="/dashboard/meus-pedidos" className="p-2 w-full h-full group-hover:bg-slate-100">
            Meus pedidos
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="group p-0">
          <button 
            onClick={() => signOut({
              callbackUrl: "/"
            })}
            className="p-2 w-full h-full group-hover:bg-slate-100">
            Sair
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
