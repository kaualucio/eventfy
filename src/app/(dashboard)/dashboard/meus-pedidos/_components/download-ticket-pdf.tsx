'use client'
import React from 'react'
import { useRef } from 'react';
import generatePDF, { Margin, Resolution, Options } from 'react-to-pdf';
import QRCode from "react-qr-code";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatPrice } from '@/utils/format-price';
import { QrCode } from 'lucide-react';

interface DownloadTicketPDFProps {
  children: React.ReactNode
  data: any;
}

export const DownloadTicketPDF = ({ children, data }: DownloadTicketPDFProps) => {
  const targetRef = useRef<any>();
  const options: Options = {
    method: "open",
    resolution: Resolution.HIGH,
    page: {
        margin: Margin.SMALL,
        orientation: 'portrait',
    },
    overrides: {
      pdf: {
        compress: true
      },
      canvas: {
        useCORS: true
      }
   },
  }

  let quantityTicketToGenerate = [];
  for(let i = 0; i < data.quantity; i++) {
    quantityTicketToGenerate[i] = i + 1
  }

  return (
    <>
      <Button
        variant="link"
        onClick={() => generatePDF(targetRef, options)}
      >
        {children}
      </Button>
      <div ref={targetRef} className="absolute -top-[1000px] -left-[1000px]" >
        <div className="flex flex-col gap-3"></div>
        <div className="flex items-center gap-2">
          <span className="text-lg text-secondary500 font-bold">Evento:</span>
          <p>{data.eventTitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg text-secondary500 font-bold">Nome do ingresso:</span>
          <p>{data.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg text-secondary500 font-bold">Preço (R$/unid):</span>
          <p>{formatPrice(data.price)}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg text-secondary500 font-bold">Quantidade:</span>
          <p>{data.quantity}</p>
        </div>
        <div className="mt-10 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {
            quantityTicketToGenerate.map(ticket => (
              <QRCode
                key={ticket}
                size={150}
                className="w-full"
                value={`Ingresso ${ticket}`}
              />
            ))
          }
        </div>
      </div>
    </>
  )
}
