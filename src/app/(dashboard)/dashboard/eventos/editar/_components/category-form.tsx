'use client'
import React, { useState } from 'react'
import axios from 'axios';
import * as z from 'zod'
import { Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
// import { Textarea } from '@/components/ui/textarea';
import { Combobox } from '@/components/ui/combobox';
   

interface CategoryFormProps {
  initialData: {
    id: string;
    categoryId: string | null
  };
  options: {
    label: string;
    value: string;
  }[]
}

const formSchema = z.object({
  categoryId: z.string().min(1)
})

export const CategoryForm = ({ initialData, options }: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()
  const toggleEdit = () => setIsEditing((current) => !current)

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      categoryId: initialData.categoryId || ''
    },
    resolver: zodResolver(formSchema)
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/events/update/${initialData.id}`, values)
      toast.success('A categoria do evento foi alterada com sucesso!')
      toggleEdit()
      router.refresh()
    } catch { 
      toast.error('Algo deu errado ao alterar a categoria, tente novamente.')
    }
  }

  const selectedOption = options.find(option => option.value === initialData.categoryId)

  return (
    <div className="mt-6 border bg-slate-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Categoria do evento
        <Button 
          variant="ghost" 
          onClick={toggleEdit}
          className="text-primary600 hover:bg-transparent hover:text-primary800"
        >
          {isEditing 
            ? (
              <>Cancelar</>
            ) 
            : (
              <>
                <Pencil className="h-4 w-5 mr-2" />
                Editar Categoria
              </>
            )
          }
          </Button>
      </div>
      {
        !isEditing 
          ? (
              <p className={cn(
                "text-sm mt-2 ",
                !initialData.categoryId && 'italic'
              )}>
                { selectedOption?.label || 'Sem categoria'}
              </p>
            )
          : (
            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-4"  
              >
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field}) => (
                    <FormItem>
                      <FormControl>
                        <Combobox 
                          options={options}
                          {...field} 
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
      }
    </div>
  )
}
