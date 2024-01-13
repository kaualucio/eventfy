'use client'
import React from 'react'
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ArrowUpRight, MoreHorizontal, Pencil } from "lucide-react"
import Link from "next/link"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { cn } from '@/lib/utils';
import { ConfirmModal } from '@/components/shared/confirm-modal'
import { format } from 'date-fns'

export interface Event {
  slug: string;
  title: string;
  status: string | any;
  is_published: boolean;
  price: string | number | null ;
  created_at: Date | string
}

const eventStatus: Record<string, string> = {
  'DRAFT': 'Rascunho',
  'UNAVAILABLE': 'Indisponível',
  'IN_PROGRESS': 'Em progresso',
  'CANCELLED': 'Cancelado',
  'POSTPONED': 'Adiado',
  'ADVANCE': 'Antecipado',
}

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          className="truncate"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Título
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      console.log(row.original)
      return (
        <Badge className={cn(
          "bg-slate-500 normal-case hover:bg-slate-500",
          status === 'UNAVAILABLE' && 'bg-slate-500 hover:bg-slate-500',
          status === 'IN_PROGRESS' && 'bg-primary500 hover:bg-primary500',
          status === 'CANCELLED' && 'bg-red-500 hover:bg-red-500',
          status === 'POSTPONED' && 'bg-yellow-500 hover:bg-yellow-500',
          status === 'ADVANCE' && 'bg-amber-500 hover:bg-amber-500',
        )}>
          {eventStatus[status]}
        </Badge>
      )

    }
  },
  {
    accessorKey: "is_published",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Publicado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const is_published= row.getValue('is_published') || false;
      
      return (
        <Badge className={cn(
          "bg-slate-500 hover:bg-slate-500",
          is_published && 'bg-primary500 hover:bg-primary500'
        )}>
          {is_published ? 'Publicado' : 'Rascunho'}
        </Badge>
      )
    }
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Preço
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      let price: number | string;
      let formatted
      if(typeof row.getValue('price') === 'number') {
        price = parseFloat(row.getValue('price') || "0")
        formatted = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        }).format(price)
      }else {
        price = row.getValue('price')
      }
      return (
        <div>
          {formatted || price}
        </div>
      )
    }
  },
  {
    accessorKey: "created_at",
    header: "Criado em",
    cell: ({ row }) => {
      const created_at = row.getValue('created_at') as Date

      return (
        <div>
          { format(new Date(created_at), 'dd/MM/yyyy') }
        </div>
      )
    },
  },
  {
    accessorKey: "actions",
    header: 'Ações',
    cell: ({ row }) => {
      const { slug } = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/dashboard/eventos/editar/${slug}`} >
              <DropdownMenuItem className="cursor-pointer">
                <Pencil className="mr-2 h-4 w-4"/>
                Editar
              </DropdownMenuItem>
            </Link>
            <Link href={`/evento/${slug}`} >
              <DropdownMenuItem className="cursor-pointer">
                <ArrowUpRight className="mr-2 h-4 w-4"/>
                Ir para a página
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
