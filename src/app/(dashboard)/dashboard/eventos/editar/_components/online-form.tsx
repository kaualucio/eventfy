'use client'
import React, { useEffect } from 'react'
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

import { formSchema } from './location-form'
import { Button } from '@/components/ui/button'

interface OnlineFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isSubmitting?: boolean
  isValid?: boolean
}

export const OnlineForm = ({ form, onSubmit, isSubmitting, isValid }: OnlineFormProps) => {

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 mt-4"  
      >
        <FormField 
          name="online.url"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  disabled={isSubmitting}
                  placeholder="Url do evento"
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
