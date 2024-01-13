import { getFavoritedEvents } from '@/actions/get-favorited-events'
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { EventCard } from '@/components/shared/event-card'
import { Title } from '@/components/shared/title'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function MyFavorites() {

  const session = await getServerSession(nextAuthOptions)

  if(!session) redirect('/')

  const favoritedEvent = await getFavoritedEvents(session)

  return (
    <section className="w-full h-screen px-7">
        <div className="w-full container py-10 flex flex-col gap-6">
          <Title title="Meus Eventos Favoritados" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            
            {
              favoritedEvent.length > 0 
                ? favoritedEvent.map(event => (
                  <EventCard 
                    key={event.id}
                    event={event}
                  />
                ))
              : (
                <p className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 text-gray-400">Você ainda não possui nenhum evento favoritado.</p>
              )
            }

          </div>
        </div>
      </section>
  )
}
