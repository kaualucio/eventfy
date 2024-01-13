'use client'
import React from 'react'
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Download, FileText, MoreHorizontal } from "lucide-react"

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { TicketInCartProps } from '@/context/cart-context'
import Link from 'next/link';
import { DownloadTicketPDF } from './download-ticket-pdf';

export interface Order {
  id: string;
  name: string;
  price: number;
  quantity: number;
  eventId: string;
  eventTitle: string;
  eventSlug: string;
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          className="truncate"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome Ingresso
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "eventTitle",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Evento
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      let eventTitle = row.getValue('eventTitle') as string
      let {eventSlug} = row.original
      console.log(row.original)
      return (
        <Link href={`/${eventSlug}`} className="underline">
          {eventTitle}
        </Link>
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
      let { quantity } = row.original
      let price: number | string = parseFloat(row.getValue('price') || "0") * quantity
      let formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(price)

      return (
        <div>
          {formatted}
        </div>
      )
    }
  },
  {
    accessorKey: "quantity",
    header: 'Quantidade'
  },
  {
    accessorKey: "Download",
    header: 'Ações',
    cell: ({ row }) => {
      const data = row.original


      return (
        <DownloadTicketPDF
          data={data}
        >
          <span className="sr-only">Baixar ingresso</span>
          <Download className="h-4 w-4"/>
        </DownloadTicketPDF>
      )
    },
  },
]
