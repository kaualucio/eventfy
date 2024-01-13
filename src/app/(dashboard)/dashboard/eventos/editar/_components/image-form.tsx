'use client'

import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Event } from '@prisma/client'
import { ImageIcon, Pencil, PlusCircle, UploadCloudIcon } from 'lucide-react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useEdgeStore } from '@/lib/edgestore'

interface ImageFormProps {
  initialData: {
    id: string,
    image: string | null
  }
}

const formSchema = z.object({
  image: z.string().min(3, { message: 'A imagem de capa do evento é obrigatório' })
})

export const ImageForm = ({ initialData }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()
  const { edgestore } = useEdgeStore();

  const toggleEdit = () => setIsEditing((current) => !current)

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      image: initialData.image || undefined
    },
    resolver: zodResolver(formSchema)
  })
  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/events/update/${initialData.id}`, values)
      toast.success('A imagem do evento foi alterada com sucesso!')
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error('Algo deu errado, tente novamente')
    }
  }

  return (
    <div className="mt-6 rounded-md bg-slate-50 p-5 border">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-secondary500 font-medium">Image de capa</h3>
        <Button 
          onClick={toggleEdit}
          variant="ghost" 
          className="text-primary600 hover:bg-transparent hover:text-primary800"
        >
          {
            isEditing && (
              <>Cancelar</>
            )
          }
          {
            !isEditing && !initialData.image && (
              <>
                <PlusCircle className="h-4 w-5 mr-1" />
                Adicionar Imagem
              </>
            )
          }
          {
            !isEditing && initialData.image && (
              <>
                <Pencil className="h-4 w-5 mr-2" />
                Editar Imagem
              </>
            )
          }
        </Button>
      </div>
      {
        isEditing ? (
          <div>
            <div className="mt-2">
              <label 
                htmlFor="fileUpload"
                className="aspect-video cursor-pointer  w-full rounded-md border-2 border-dashed border-primary100 bg-primary50 flex items-center justify-center p-5"  
              >
                <input 
                  id="fileUpload"
                  type="file"
                  name="fileUpload"
                  className="hidden"
                  onChange={async (e) => {
                    let file = e.target.files?.[0]

                    if (file) {
                      const res = await edgestore.publicFiles.upload({
                        file,
                        onProgressChange: (progress) => {
                          console.log(progress);
                        },
                      });
                      console.log(res);
                      onSubmit({ image: res.url })
                    }
                  }}
                />
                <div className="flex flex-col items-center justify-center text-center">
                  <UploadCloudIcon className="w-10 h-10 text-primary500" />
                  <p className="font-medium text-secondary500 text-sm">Escolha uma imagem</p>
                </div>
              </label>
            </div>
            <div className="text-xs text-muted-foreground mt-4">
              Recomendado 16:9 aspect ratio
            </div>
          </div>
        )
        : (
          <>
            {
              initialData.image ? (
                <div className="relative aspect-video mt-2">
                  <Image 
                    src={initialData.image} 
                    alt="Upload Image"
                    fill
                    className="object-cover rounded-md"  
                  />
                </div>
              ) : (
                <div className="mt-3 flex items-center justify-center gap-3 h-60 bg-primary100 rounded-md">
                    <ImageIcon className="w-9 h-9 text-primary500" />
                </div>
              )
            }
          </>
        )
      }
    </div>
  )
}
