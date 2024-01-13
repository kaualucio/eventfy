'use client'
import React from 'react'
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns'
import Link from 'next/link'
import toast from 'react-hot-toast'
import axios from 'axios'
import { redirect, useRouter } from 'next/navigation'

export interface Event {
  id: string;
  name: string;
  slug: string;
  price: number | null;
  quantity: number | null;
  event: string;
  is_half_price: boolean;
  created_at: Date | string;
}

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          className="truncate"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "event",
    header: ({ column }) => {
      return (
        <Button
          className="truncate"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Evento
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const {event, slug} = row.original
      console.log()
      return (
        <Link href={`/${slug}`} className="underline">{event}</Link>
      )
    }
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantidade (unid)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const quantity= row.getValue('quantity') as number;
      
      return (
        <p>{quantity} unidades</p>
      )
    }
  },
  {
    accessorKey: "is_half_price",
    header: 'Meia-entrada',
    cell: ({ row }) => {
      let is_half_price = row.getValue('is_half_price')
    
      return (
        <Badge
          variant={is_half_price ? 'default' : 'secondary'}
        >
          {is_half_price ? 'Sim' : 'Não'}
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
          Preço (R$)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      let price: number | string = parseFloat(row.getValue('price') || "0")
      let formatted
      if(price === 0) {
        formatted = 'Gratuito'
      }else {
        formatted = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        }).format(price)
      }
      
      return (
        <div>
          {formatted}
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
        <p>
          { format(new Date(created_at), 'dd/MM/yyyy') }
        </p>
      )
    },
  },
  {
    accessorKey: "actions",
    header: 'Ações',
    cell: ({ row }) => {
      const { id } = row.original
      const handleDeleteTicket = async () => {
        try {
          await axios.delete(`/api/events/delete/ticket/${id}`)
          toast.success('O ingresso foi deletado com sucesso!')
        } catch (error) {
          console.log(error)
          toast.error(error as any)
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <Link href={`/dashboard/eventos/editar/${slug}`} >
              <DropdownMenuItem className="cursor-pointer">
                <Pencil className="mr-2 h-4 w-4"/>
                Editar
              </DropdownMenuItem>
            </Link> */}
            <Button 
              variant="ghost"
              className="w-full" 
              onClick={handleDeleteTicket}
            >
              Excluir
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]