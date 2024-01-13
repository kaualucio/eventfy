'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Badge } from '../ui/badge'
import { Heart } from 'lucide-react'
import { Event } from '@prisma/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface EventCardProps {
  event: Event & { Ticket: { price: number | null }[] } & { FavoriteEvent?: { id: string, eventId: string }[] }
}

export const EventCard = ({ event }: EventCardProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const isThisEventAlreadyFavorited = !!event.FavoriteEvent && event.FavoriteEvent.find(favorite => favorite.eventId === event.id)

  const handleFavorite = async () => {
    try {
      setIsLoading(true)
      if(!!isThisEventAlreadyFavorited) {
        console.log('aqui')
        await axios.post(`/api/favorites/events/${event.id}/${isThisEventAlreadyFavorited.id}/unfavorite`) 
      }else {
        await axios.post(`/api/favorites/events/${event.id}/favorite`) 
      }
      router.refresh()
    } catch (error) {
      console.log(error)
      toast.error('Ocorreu um erro, tente novamete!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="rounded-md shadow-md w-full sm:max-w-[300px] bg-white">
        <div className="relative h-[200px] w-full">
          <Image 
            src={event.image!}
            alt=""
            fill
            className="relative z-10 object-cover rounded-t-md"
          />
          <div className="z-[99] absolute bottom-2 left-0 w-full flex items-center justify-between px-3">
            <Badge className="font-medium">
              {
                event.Ticket[0].price === 0 ? 'Gratuito' : `A partir de ${event.Ticket[0].price}`
              }
            </Badge>
            <button
              onClick={handleFavorite} 
              disabled={isLoading}
              className="cursor-pointer h-8 w-8 rounded-full bg-white text-primary500 hover:bg-white/90 flex items-center justify-center"
            >
              <Heart className="w-5 h-5" fill={!!event.FavoriteEvent && !!isThisEventAlreadyFavorited ? '#07B067' : '#ffffff'} />
            </button>
          </div>
        </div>
        <Link href={`/${event.slug}`} className="group">
          <div className="px-2 p-5 flex flex-col gap-3">
            <p className="text-secondary500 text-md font-semibold transition group-hover:text-primary500 truncate">{event.title}</p>
            <span className="text-secondary500 text-xs capitalize">{format(new Date(event.datetime_start!), 'PPPP', { locale: ptBR })}</span>
            <p className="text-primary400 text-xs">Hotel Vila Oeste - Mossoró</p>
          </div>
        </Link>
      </div>
  )
}
