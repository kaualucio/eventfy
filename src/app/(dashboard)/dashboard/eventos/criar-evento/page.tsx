'use client'
import { Title } from '@/components/shared/title'
import React, { useEffect, useState } from 'react'
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Banner } from '@/components/shared/banner'
import { useSession } from 'next-auth/react'
import { getOrganizerProfile } from '@/actions/get-organizer-profile'
import { useOrganizerProfile } from '@/hooks/useOrganizerProfile'

const createEventSchema = z.object({
  title: z.string().min(3, { message: 'O título deve conter pelo menos 3 caracteres' })
})

export default function CriarEvento() {
  const session = useSession()
  const router = useRouter()
  const { profileExists, profileId, profileIsCompleted } = useOrganizerProfile(session.data?.user.id!)
  const form = useForm<z.infer<typeof createEventSchema>>({
    defaultValues: {
      title: ""
    },
    resolver: zodResolver(createEventSchema)
  })
  const { isSubmitting, isValid } = form.formState
  const onSubmit = async (values: z.infer<typeof createEventSchema>) => {
    try {
      const response = await axios.post('/api/events/create', values)
      toast.success('Seu evento foi criado com sucesso!')
      router.push(`/dashboard/eventos/editar/${response.data.slug}`)
    } catch (error) {
      toast.error('Algo deu errado, tente novamente')
    }
  }

  const createOrganizerProfile = async () => {
    try {
      const response = await axios.post('/api/profile/organizer/create', {
        userId: session.data?.user.id
      })
      toast.success('Seu perfil foi criado com sucesso. Você será redirecionado para a página de configuração do perfil.')
      router.push(`/dashboard/perfil/organizador/editar/${response.data.id}`)
    } catch (error) {
      toast.error('Algo deu errado, tente novamente')
    }
  }

  return (
    <>
      {
        !profileExists && (
          <Banner
            label="Ooops! Parece que você ainda não criou seu perfil de organizador. Clique no link ao lado para criar seu perfil."
            variant="warning"
          >
            <Button 
              onClick={createOrganizerProfile}
              variant="link"
            >
              Criar perfil
            </Button>
          </Banner>
        )
      }
      {
        profileExists && !profileIsCompleted && (
          <Banner
            label="Parece que você ainda não configurou seu perfil de organizador. Clique no link ao lado para completar seu perfil."
            variant="warning"
          >
            <Link 
              href={`/dashboard/perfil/organizador/editar/${profileId}`}
            >
              Completar perfil
            </Link>
          </Banner>
        )
      }
      <section className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
        <div>
          <div className="flex flex-col">
            <Title title="Criar Evento" />
            <p className="text-sm text-secondary400">Comece a criar um novo evento. Vamos começar pelo básico, qual é o nome do seu evento?</p>
          </div>
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-8"  
            >
              <FormField 
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Título do Evento
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="text" 
                        placeholder="Como se chama seu evento?"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="mt-2  ">
                      Seja criativo com o título, um bom título será a primeira coisa que chamará a atenção do seu público.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-3">
                <Link href="/">
                  <Button type="button" variant="ghost">
                    Cancelar
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                >
                  Criar evento
                </Button>
              </div>  
            </form>
          </Form>
        </div>
      </section>
    </>
  )
}
