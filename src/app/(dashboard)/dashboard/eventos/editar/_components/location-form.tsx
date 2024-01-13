'use client'

import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Event } from '@prisma/client'
import { Pencil } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { OnlineForm } from './online-form'
import { InPersonForm } from './in-person-online'
import Link from 'next/link'

interface LocationFormProps {
  initialData: Event
}

export const formSchema = z.object({
  in_person: z.object({
    state: z.string().min(3, { message: "Preencha esse campo para continuar" }),
    city: z.string().min(3, { message: "Preencha esse campo para continuar" }),
    address: z.string().min(3, { message: "Preencha esse campo para continuar" }),
    cep: z.string().min(3, { message: "Preencha esse campo para continuar" }),
    local_name: z.string().min(3, { message: "Preencha esse campo para continuar" }),
  }).optional(),
  online: z.object({
    url: z.string().min(1),
  }).optional()
})

export const LocationForm = ({ initialData }: LocationFormProps) => {
  const [typeLocation, setTypeLocation] = useState<'online' | 'in_person' | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })
  const { isSubmitting, isValid } = form.formState
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/events/update/${initialData.id}`, values)
      toast.success('O título do evento foi alterado com sucesso!')
      toggleEdit()
      router.refresh()
      console.log('valores', values)
    } catch (error) {
      toast.error('Algo deu errado, tente novamente')
    }
  }
  
  const toggleEdit = () => setIsEditing((current) => !current)
  
  const toggleTypeEvent = (type: 'online' | 'in_person') => {
    let parsedInitialData = initialData.location !== null && JSON.parse(initialData.location)
    if(typeLocation === type) {
      form.unregister(type)
      setTypeLocation(null)
    }else if(type === 'in_person') {
      let hasLocationInPerson = parsedInitialData.in_person && true
      form.unregister('online')
      form.setValue('in_person', {
        address: hasLocationInPerson ? parsedInitialData.in_person.address : '',
        cep: hasLocationInPerson ? parsedInitialData.in_person.cep : '',
        city: hasLocationInPerson ? parsedInitialData.in_person.city : '',
        local_name: hasLocationInPerson ? parsedInitialData.in_person.local_name : '',
        state: hasLocationInPerson ? parsedInitialData.in_person.state : ''
      })
      setTypeLocation(type)
    } else if(type === 'online') {
      let hasLocationOnline = parsedInitialData.online && true
      form.unregister('in_person')
      form.setValue('online', {
        url: hasLocationOnline ? parsedInitialData.online.url : '',
      })
      setTypeLocation(type)
    }
  }
  console.log(form.watch())
  return (
    <div className="mt-6 rounded-md bg-slate-50 p-5 border">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-secondary500 font-medium">Localização do evento</h3>
        <Button 
          onClick={toggleEdit}
          variant="ghost" 
          className="text-primary600 hover:bg-transparent hover:text-primary800">
          {
            isEditing 
            ? (
              <>Cancelar</>
            ) 
            : (
              <>
                <Pencil className="h-4 w-5 mr-2" />
                Editar Localização
              </>
            )
          }
        </Button>
      </div>
      {
        isEditing ? (
          <div className="mt-3 flex flex-col gap-3">
            <p className="text-sm">Seu evento ocorrerá de forma online ou presencial?</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Button 
                onClick={() => toggleTypeEvent('online')}
                variant="outline" 
                className={cn(
                "border-slate-300 hover:bg-white text-slate-500",
                typeLocation === 'online' && "border-primary500 text-primary500 bg-primary50"
              )}>
                Online
              </Button>
              <Button 
                onClick={() => toggleTypeEvent('in_person')}
                variant="outline" 
                className={cn(
                "border-slate-300 hover:bg-white text-slate-500",
                typeLocation === 'in_person' && "border-primary500 text-primary500 bg-primary50"
              )}>
                Presencial
              </Button>
            </div>

            {
              isEditing && typeLocation && typeLocation === "online" && (
                <OnlineForm 
                  form={form}
                  onSubmit={onSubmit}
                  isSubmitting={isSubmitting}
                  isValid={isValid}
                />
              ) 
            }
            {
              isEditing && typeLocation && typeLocation === "in_person" && (
                <InPersonForm
                  form={form}
                  onSubmit={onSubmit}
                  isSubmitting={isSubmitting}
                  isValid={isValid}
                />
              )
            }
          </div>
        )
        : (
          <>
            {
              !initialData.location ? (
                <p className="text-sm mt-2 italic">
                  Sem localização
                </p>
              )
              : initialData.location && JSON.parse(initialData.location).online ? (
                <div>
                  <Link 
                    href={JSON.parse(initialData.location).online.url}
                    className="underline text-medium text-sm"
                  >
                    {JSON.parse(initialData.location).online.url}
                  </Link> 
                </div>
              ) : (
                <div>
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium">Local:</p>
                      <p>{JSON.parse(initialData.location).in_person.local_name}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium">Endereço:</p>
                      <p>{JSON.parse(initialData.location).in_person.address}</p>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-3 ">

                      <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">CEP:</p>
                        <p>{JSON.parse(initialData.location).in_person.cep}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">Cidade:</p>
                        <p>{JSON.parse(initialData.location).in_person.city}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">Estado:</p>
                        <p>{JSON.parse(initialData.location).in_person.state}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          </>
        )
      }
    </div>
  )
}
