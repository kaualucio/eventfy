'use client'

import React, { createContext, useState } from "react"

export interface TicketInCartProps {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface CartContextProps {
  ticketsInCart: TicketInCartProps[];
  totalPrice: number;
  addOneTicketInCart: (data: TicketInCartProps) => void;
  removeOneTicketInCart: (ticketId: string) => void;
  getSelectedTicket: (ticketId: string) => TicketInCartProps | null;
}

export const CartContext = createContext({} as CartContextProps)

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [ticketsInCart, setTicketsInCart] = useState<TicketInCartProps[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)

  function addOneTicketInCart(data: TicketInCartProps) {
    const ticketAlreadyExistInCart = ticketsInCart.filter(ticket => ticket.id === data.id)[0]

    if(ticketAlreadyExistInCart) {
      const updatedProductInCartData = {
        ...ticketAlreadyExistInCart, 
        quantity: ticketAlreadyExistInCart.quantity + 1
      }
      setTicketsInCart((prevState) => {
        return [...prevState.filter(product => product.id !== ticketAlreadyExistInCart.id), updatedProductInCartData]
      })
      setTotalPrice((prevPrice) => prevPrice + ticketAlreadyExistInCart.price)
    }else {
      setTicketsInCart((prevState) => [...prevState, data])
      setTotalPrice((prevPrice) => prevPrice + data.price)
    }

  }

  function removeOneTicketInCart(ticketId: string) {
    const ticketAlreadyExistInCart = ticketsInCart.filter(ticket => ticket.id === ticketId)[0]
    if(ticketAlreadyExistInCart) {
      if(ticketAlreadyExistInCart.quantity <= 1) {
        setTotalPrice((prevPrice) => prevPrice - ticketAlreadyExistInCart.price)
        return setTicketsInCart(prevState => [...prevState.filter(product => product.id !== ticketId)])
      }
      setTicketsInCart((prevState) => {
        return [
          ...prevState.filter(product => product.id !== ticketAlreadyExistInCart.id), 
          {...ticketAlreadyExistInCart, 
            quantity: ticketAlreadyExistInCart.quantity - 1
          }
        ]
      })
      setTotalPrice((prevPrice) => prevPrice - ticketAlreadyExistInCart.price)
    }
  }

  const getSelectedTicket = (ticketId: string) => {
    return ticketsInCart.filter(ticket => ticket.id === ticketId)[0]
  }

  return (
    <CartContext.Provider
      value={{
        ticketsInCart,
        totalPrice,
        addOneTicketInCart,
        removeOneTicketInCart,
        getSelectedTicket
      }}
    >
      {children}
    </CartContext.Provider>)

} 