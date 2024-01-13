import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { nextAuthOptions } from "../../../auth/[...nextauth]/route"
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!, options: { timeout: 5000 } });

export async function POST(req: Request, { params }: { params: { orderId: string } }) {
  try {
    const session = await getServerSession(nextAuthOptions)
    const values = await req.json()

    if(!session) return new NextResponse('Algo deu errado, tente novamente.', { status: 401 })

    if(!values) return new NextResponse('Algo deu errado, tente novamente.', { status: 400 })

    const payment = new Payment(client)

    const payed = await payment.create({
      body: {
       token: values.token,
       transaction_amount: values.transaction_amount,
       installments: values.installments,
       payment_method_id: values.payment_method_id,
       payer: {
        email: values.payer.email
       } 
      }
    })

    const order = await db.order.findUnique({
      where: {
        id: params.orderId,
      }
    })

    JSON.parse(order?.ticketsInCart!).map(async (ticket: any) => {
      const ticketExists = await db.ticket.findUnique({
        where: {
          id: ticket.id
        }
      })
      if(!ticketExists) return new NextResponse('Esse ingresso não existe em nossa base de dados.', { status: 400 })

      await db.ticket.update({
        where: {
          id: ticket.id,
        },
        data: {
          quantity: ticketExists.quantity! - ticket.quantity
        }
      })
    })

    const updatedOrder = await db.order.update({
      where: {
        id: params.orderId,
      },
      data: {
        payed_at: payed.date_approved,
        status: payed.status === 'approved' 
                ? 'APPROVED' 
                : payed.status === 'rejected' 
                ? 'REJECTED'
                : payed.status === 'canceled' ? 'CANCELLED' : "PENDING",
        typePayment: payed.payment_type_id,
      }
    })

    return NextResponse.json(updatedOrder)

  } catch (error) {
    console.log('[CREATE_ORDER]', error)
    return new NextResponse('Algo deu errado, tente novamente.', { status: 400 })
  }
}