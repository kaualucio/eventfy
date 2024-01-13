import { CartContext } from "@/context/cart-context"
import { useContext } from "react"


export const useCart = () => {
  const { addOneTicketInCart, ticketsInCart, removeOneTicketInCart, totalPrice, getSelectedTicket } = useContext(CartContext)

  return { addOneTicketInCart, ticketsInCart, removeOneTicketInCart, totalPrice, getSelectedTicket }
}