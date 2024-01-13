import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { Title } from '@/components/shared/title'
import React from 'react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import { Button } from '@/components/ui/button'
import { getUserOrderedTickets } from '@/actions/get-user-ordered-tickets'
import { db } from '@/lib/db'

export default async function Eventos() {
  const session = await getServerSession(nextAuthOptions)

  if(!session) return redirect('/')

  const userOrderedTickets = await getUserOrderedTickets(session.user.id)

  
  const tickets = Array.prototype.concat.call(...userOrderedTickets.map((order: any) => JSON.parse(order.ticketsInCart)))
  return (
    <section className="p-4 sm:p-6 md:p-10 lg:px-20 lg:py-[50px]">
      <div className="flex items-center justify-between gap-5">
        <Title title="Meus ingressos adquiridos" />
        <Button>
          <Link href="/dashboard/ingressos">
            Ingressos criados
          </Link>
        </Button>
      </div>
      <div className="mt-10">
        <DataTable 
          columns={columns}
          data={tickets}
        />
      </div>
    </section>
  )
}
