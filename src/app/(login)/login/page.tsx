'use client'
import Google from '../../../../public/assets/images/google.svg'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import Image from 'next/image'
import { signIn, useSession } from "next-auth/react"

import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/shared/checkbox'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const loginSchema = z.object({
  email: z.string().min(1, { message: "O campo e-mail é obrigatório" }).email({ message: "Digite um e-mail válido" }),
  password: z.string().min(8, { message: "O campo senha é obrigatório" })
})

export default function Login() {
  const session = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true)
    signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    }).then(callback => {
      console.log(callback)
      if(callback?.error) {
        toast.error('Login/senha incorretos.')
      }

      if(callback?.ok && !callback?.error) {
        router.push('/')
      }
    }).finally(() => { setIsLoading(false) })
  }

  const socialLogin = async () => {
    signIn('google', { 
      redirect: true,
      callbackUrl: '/'
    })
  }

  useEffect(() =>{
    if(session.data?.user) return router.push('/')
  }, [session.data?.user, router])

  return (
    <section className="h-full flex">
      <div className="w-1/2 h-full bg-primary600">
        {/* TODO: Adicionar conteúdo */}
      </div>
      <div className="w-1/2 h-full p-5 flex items-center justify-center ">
        <div className="w-full px-5 py-10 max-w-md rounded-md">
          <header className="flex flex-col gap-5 text-center mb-16">
            <h1 className="text-3xl font-bold text-secondary500">Event<span className="text-primary500">fy</span></h1>
            <h2 className="text-2xl font-bold text-secondary500">Entre na sua conta</h2>
          </header>
          <div className="w-full max-w-sm mx-auto space-y-8 ">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-secondary300 font-medium text-xs">
                        E-mail
                      </FormLabel>
                      <FormControl>
                          <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-secondary300 font-medium text-xs">
                        Senha
                      </FormLabel>
                      <FormControl>
                          <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="py-3 flex items-center justify-between gap-3">
                  <Checkbox id="connected" label="Manter-me conectado" />
                  <Link 
                    href="/esquici-minha-senha"
                    className="underline text-secondary300 text-xs"
                  >
                    Esqueci minha senha
                  </Link>
                </div>
                <Button 
                  size="full"
                  type="submit"
                  disabled={isLoading}
                  >
                  Entrar
                </Button>
              </form>
            </Form>

            <div className="flex items-center gap-1 text-sm">
              Ainda não tem uma conta? 
              <Link href="/registrar" className="text-secondary500 font-medium underline">
                Cadastrar
              </Link>
            </div>

            <div className="relative">
              <Separator />
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-secondary500">Ou</span>
            </div>

            <button 
              onClick={socialLogin}
              disabled={isLoading}
              className="flex items-center gap-2 justify-center w-full h-12 border border-primary500 rounded-md text-sm transition hover:bg-primary100 hover:text-primary700">
              <Image 
                src={Google}
                width={24}
                height={24}
                alt="Entrar com o google"
              /> 
              Entrar com o google
            </button>
          </div>
        </div>
      </div>  
    </section>
  )
}
