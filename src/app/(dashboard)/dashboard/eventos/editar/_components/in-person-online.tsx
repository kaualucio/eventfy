'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { UseFormReturn } from 'react-hook-form'
import * as z from 'zod'
import { consultarCep } from 'correios-brasil';

import { formSchema } from './location-form'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from "react"
import { Combobox } from "@/components/ui/combobox"
import axios from "axios"
import { brazileanState } from "@/utils/states"

interface InPersonFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isSubmitting?: boolean
  isValid?: boolean
}

export const InPersonForm = ({ form, onSubmit, isSubmitting, isValid }: InPersonFormProps) => {

  return (
    <Form {...form} >
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 mt-4"  
      >
        <div className="flex flex-col lg:flex-row gap-5">
          <FormField 
            name="in_person.cep"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input 
                    disabled={isSubmitting}
                    placeholder="CEP"
                    type="text"
                    {...field}
                    onChange={async (e) => {
                      field.onChange(e)
                      let sizeOfCep = e.target.value.length
                      if(/^\d{5}-?\d{3}$/.test(e.target.value)) {
                        const cep = await consultarCep(e.target.value)
                        form.setValue('in_person.address', `Rua ${cep.logradouro} - Bairro ${cep.bairro}`)
                        form.setValue('in_person.city', cep.localidade)
                        form.setValue('in_person.state', brazileanState[cep.uf])
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            name="in_person.address"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input 
                    disabled={isSubmitting}
                    placeholder="Local do Evento"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-5">
          <FormField 
            name="in_person.state"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input 
                    disabled={isSubmitting}
                    placeholder="Local do Evento"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            name="in_person.city"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input 
                    disabled={isSubmitting}
                    placeholder="Cidade do evento"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField 
          name="in_person.local_name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  disabled={isSubmitting}
                  placeholder="Local do Evento"
                  type="text"
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
