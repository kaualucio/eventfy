'use client'

import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Profile } from '@prisma/client'
import { Pencil } from 'lucide-react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { maskPhone } from '@/utils/masks'

interface PhoneNumberFormProps {
  initialData: Profile | null
}

const formSchema = z.object({
  phone: z.string().min(15, { message: 'Digite um número de telefone válido' }).max(15, { message: 'Digite um número de telefone válido' })
})

export const PhoneNumberForm = ({ initialData }: PhoneNumberFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((current) => !current)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      phone: initialData?.phone || ''
    },
    resolver: zodResolver(formSchema)
  })
  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/profile/organizer/update/${initialData?.id}`, values)
      toast.success('O número de telefone foi alterado com sucesso!')
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error('Algo deu errado, tente novamente')
    }
  }

  return (
    <div className="mt-6 rounded-md bg-slate-50 p-5 border">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-secondary500 font-medium">Número de telefone</h3>
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
                Editar Telefone
              </>
            )
          }
        </Button>
      </div>
      {
        isEditing ? (
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-4"  
            >
              <FormField 
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        disabled={isSubmitting}
                        placeholder="(99) 99999-9999"
                        type="text"
                        {...field}
                        onChange={(e) => field.onChange(maskPhone(e))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <div className="flex items-center gap-x-2">
                  <Button 
                    disabled={!isValid || isSubmitting}
                    type="submit"
                  >Salvar</Button>
                </div>
            </form>
          </Form>
        )
        : initialData?.phone ? (
          <p className="text-sm mt-2">{initialData?.phone}</p>
        ) 
        : <p className="text-sm mt-2 italic">Sem telefone</p>
      }
    </div>
  )
}
