import { Ticket } from '@prisma/client'
import React from 'react'
import { TicketAvailable } from './ticket-available'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BuyButton } from './buy-button'

interface TicketsProps {
  tickets: Ticket[]
}

export const Tickets = ({ tickets }: TicketsProps) => {
  return (
    <div className="w-full rounded-lg p-2 border-2 border-primary300 flex flex-col gap-2">
      {
        tickets.map(ticket => (
          <TicketAvailable key={ticket.id} ticket={ticket} />
        ))
      }
      <BuyButton ticketsId={tickets.map(ticket => ticket.id)} />
    </div>
  )
}
