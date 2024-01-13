'use client'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/useCart'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

interface BuyButtonProps {
  ticketsId: string[]
}

export const BuyButton = ({ ticketsId }: BuyButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { totalPrice, ticketsInCart, getSelectedTicket } = useCart()
  const isTicketInCart = !!ticketsId.some(ticket => ticket === getSelectedTicket(ticket)?.id)
  
  const handleBuyTickets = async () => {
    try {
      setIsLoading(true)
      const order = await axios.post('/api/order/ticket', {
        ticketsInCart,
        totalPrice
       })
      router.push(`/checkout/pedido/${order.data.id}`)
    } catch (error) {
      toast.error('Algo deu errado ao comprar o/os ingressos, tente novamente!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      size="full"
      disabled={!isTicketInCart || isLoading}
      onClick={handleBuyTickets}
    >
      Comprar ingressos
    </Button>
  )
}
