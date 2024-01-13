'use client'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/utils/format-price'
import { Ticket } from '@prisma/client'
import { Minus, Plus } from 'lucide-react'
import React from 'react'

interface TicketProps {
  ticket: Ticket
}

export const TicketAvailable = ({ ticket }: TicketProps) => {
  const { addOneTicketInCart, removeOneTicketInCart, getSelectedTicket } = useCart()

  const selectedTicket = getSelectedTicket(ticket.id)

  return (
    <div className="bg-primary50 rounded-lg p-3 flex flex-col gap-3">
      <div>
        <h3 className="text-md font-semibold text-secondary500">{ticket.name}</h3>
        <div className="flex items-center gap-1 text-xs italic font-medium text-secondary400">
          <p>{ticket.is_half_price ? 'Meia' : 'Inteira'}</p> - 
          <p>Disponível: {ticket.quantity}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-secondary500">{formatPrice(ticket.price!)}</span>
        {
          new Date(ticket.end_sell!) <= new Date() || ticket.quantity! <= 0 ? (
            <div className="flex items-center gap-3">
              <button 
                className="rounded-full p-1 border border-primary500"
                onClick={() => removeOneTicketInCart(ticket.id)}
              >
                <Minus size={14} />
              </button>
              <p className="text-md font-semibold">{ selectedTicket ? selectedTicket.quantity : 0 }</p>
              <button 
                className="rounded-full p-1 border border-primary500"
                onClick={() => addOneTicketInCart({
                  id: ticket.id,
                  name: ticket.name,
                  price: ticket.price!,
                  quantity: 1
                })}
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <span>As vendas se encerraram</span>
          )
        }
      </div>
    </div>
  )
}
