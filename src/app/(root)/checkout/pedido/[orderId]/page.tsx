import { Ticket } from 'lucide-react';
import { Payment } from '../../_components/payment';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { formatPrice } from '@/utils/format-price';

export default async function Checkout({ params }: { params: { orderId: string } }) {

  const order = await db.order.findUnique({
    where: {
      id: params.orderId
    }
  })

  if(!order) return redirect('/')

  return  (
    <div className="h-full py-20 px-5">
      <div className="w-full container grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 gap-8 md:gap-20">
        <div className="col-span-1 sm:col-span-2 md:col-span-3">
          <h2 className="text-xl font-bold text-secondary500 mb-10">Informações da compra</h2>
          <div className="flex flex-col gap-3">
            {
              JSON.parse(order.ticketsInCart).map((ticket: any) => (
                <div key={ticket.name} className="py-2 flex items-center justify-between gap-4 border-b">
                  <div className="flex items-center gap-3 text-sm">
                    <Ticket className="text-primary500" />
                    {ticket.name}
                  </div>
                  <p className="text-sm">Meia Entrada</p>
                  <p className="text-sm font-semibold">{formatPrice(ticket.price)} (x{ticket.quantity})</p>
                </div>
              ))
            }
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-2">
          <h2 className="text-xl font-bold text-secondary500 mb-10">Informações do pagamento</h2>
          <Payment 
            orderId={order.id}
            totalPrice={order.totalPrice}
          />
        </div>
      </div>    
    </div>
 
  )
}
