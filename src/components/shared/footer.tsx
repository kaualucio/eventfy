'use client'
import React from 'react'
import { Logo } from './logo'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="w-full bg-primary50 ">
      <div className="w-full container py-20 px-7 grid grid-cols-12 gap-6">
        <div className="col-span-1 sm:col-span-2 md:col-span-3">
          <Logo />
          <p className='mt-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem amet ut unde quae error eius perspiciatis.</p>
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-3">
          <h2 className="font-semibold text-lg text-secondary500">Sobre</h2>
          <div className="flex flex-col gap-3 mt-5">
            <Link href="/" className="text-sm font-light text-secondary400">
              Sobre nós
            </Link>
            <Link href="/" className="text-sm font-light text-secondary400">
              Como funciona
            </Link>
            <Link href="/" className="text-sm font-light text-secondary400">
              Check-In e Credenciamento
            </Link>
            <Link href="/" className="text-sm font-light text-secondary400">
              Políticas de Privacidade
            </Link>
            <Link href="/" className="text-sm font-light text-secondary400">
              Termos de Serviço
            </Link>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-3">
          <h2 className="font-semibold text-lg text-secondary500">Suporte</h2>
          <div className="flex flex-col gap-3 mt-5">
            <Link href="/" className="text-sm font-light text-secondary400">
              Contato para suporte
            </Link>
            <Link href="/" className="text-sm font-light text-secondary400">
              Conversar com o financeiro
            </Link>
            <Link href="/" className="text-sm font-light text-secondary400">
              Parcerias e Investidores
            </Link>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-3">
          <h2 className="font-semibold text-lg text-secondary500">Nossas Redes</h2>
          <div className="flex flex-col gap-3 mt-5">
            <Link href="/" className="text-sm font-light text-secondary400">
              Twitter
            </Link>
            <Link href="/" className="text-sm font-light text-secondary400">
              Instagram
            </Link>
            <Link href="/" className="text-sm font-light text-secondary400">
              Facebook
            </Link>
            <Link href="/" className="text-sm font-light text-secondary400">
              Linkedin
            </Link>
            <Link href="/" className="text-sm font-light text-secondary400">
              TikTok
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-primary500 px-7 text-white text-sm w-full h-14 text-center flex items-center justify-center">
        <p>© 2023 - Todos os direitos reservados</p>
      </div>
    </footer>
  )
}
