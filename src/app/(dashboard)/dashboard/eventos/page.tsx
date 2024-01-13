import { getUserEvents } from '@/actions/get-user-events'
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { Title } from '@/components/shared/title'
import { PlusCircle } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
export default async function Eventos() {
  const session = await getServerSession(nextAuthOptions)

  if(!session) return redirect('/')

  const userCreatedEvents = await getUserEvents(session.user.id)

  const formatedEvents = userCreatedEvents.map(event => ({
    slug: event.slug,
    title: event.title,
    status: event.status,
    is_published: event.is_published,
    price: event.Ticket.length > 0 ? event.Ticket[0].price === 0 ? 'Gratuito' : event.Ticket[0]?.price : 'Valor não adicionado',
    created_at: event.created_at
  }))

  return (
    <section className="p-4 sm:p-6 md:p-10 lg:px-20 lg:py-[50px]">
      <div className="flex items-center justify-between gap-5">
        <Title title="Meus eventos criados" />
        <Link 
          href="/dashboard/eventos/criar-evento"
          className="w-fit h-10 px-3 flex items-center gap-1 rounded-md text-sm font-medium bg-primary500 transition hover:bg-primary600 text-white"
        >
          <PlusCircle className="w-4 h-4" />
          Novo evento
        </Link>
      </div>
      <div className="mt-10">
        <DataTable 
          columns={columns}
          data={formatedEvents}
        />
      </div>
    </section>
  )
}
