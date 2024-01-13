import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { Title } from '@/components/shared/title'
import React from 'react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import { getUserTickets } from '@/actions/get-user-tickets'
import { Button } from '@/components/ui/button'

export default async function Eventos() {
  const session = await getServerSession(nextAuthOptions)

  if(!session) return redirect('/')

  const userTickets = await getUserTickets(session.user.id)

  const formatedTickets = userTickets.map(ticket => ({
    id: ticket.id,
    name: ticket.name,
    quantity: ticket.quantity,
    price: ticket.price,
    is_half_price: ticket.is_half_price,
    event: ticket.event.title,
    slug: ticket.event.slug,
    created_at: ticket.created_at  
  }))

  return (
    <section className="p-4 sm:p-6 md:p-10 lg:px-20 lg:py-[50px]">
      <div className="flex items-center justify-between gap-5">
        <Title title="Meus ingressos criados" />
        <Button>
          <Link href="/dashboard/meus-pedidos">
            Ingressos Adquiridos
          </Link>
        </Button>
      </div>
      <div className="mt-10">
        <DataTable 
          columns={columns}
          data={formatedTickets}
        />
      </div>
    </section>
  )
}
