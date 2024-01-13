'use client'
import React from 'react'
import { Button } from '../ui/button'

export const CTABanner = () => {
  return (
    <div className="w-full h-[400px] py-10 px-5 bg-primary500 flex items-center justify-center rounded-xl">
      <div className="max-w-3xl text-center ">
        <h2 className="font-semibold text-white text-6xl mb-10">Lorem ipsum dolor sit amet consectetur.</h2>
        <Button variant="secondary" className="h-14 px-10">
          Quero criar meu evento
        </Button>
      </div>
    </div>
  )
}
