'use client'
import React, { useEffect } from 'react'
import { CardPayment, initMercadoPago } from '@mercadopago/sdk-react'
import toast from 'react-hot-toast';
import axios from 'axios';


interface PaymentProps {
  orderId: string;
  totalPrice: number;
}
export const Payment = ({ totalPrice, orderId }: PaymentProps) => {
  const onSubmit = async (data: any) => {
    try {
      console.log(data)
      const response = await axios.post(`/api/order/process_payment/${orderId}`, data)
      toast.success('Sua compra foi realizada com sucesso! Obrigado por comprar conosco.')
    } catch (error) {
      console.log(error)
      toast.error('Algo deu errado ao realizar o pagamento, tente novamente!')
    } 
  }
  
  const onError = async (error:any) => {
    // callback chamado para todos os casos de erro do Brick
    console.log(error);
  };
  
  const onReady = async () => {
    /*
    Callback chamado quando o Brick estiver pronto.
    Aqui você pode ocultar loadings do seu site, por exemplo.
    */
  };
  
  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY!);
  }, [])

  return (
    
    <CardPayment
      initialization={{
        amount: totalPrice
      }}
      customization={{
        paymentMethods: {
          types: {
            included: ['credit_card', 'debit_card']
          },
        },
        visual: {
          style: {
            customVariables: {
              baseColorFirstVariant: "#07B067",
              baseColorSecondVariant: "#07B067",
            }
          }
        }
      }}
      onSubmit={onSubmit}
      onReady={onReady}
      onError={onError} 
    />
  )
}
