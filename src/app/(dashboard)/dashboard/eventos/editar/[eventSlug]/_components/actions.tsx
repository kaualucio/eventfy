'use client'
import React, { useState } from 'react'

import { ConfirmModal } from '@/components/shared/confirm-modal'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface ActionsProps {
  isDisabled?: boolean
  isPublished?: boolean
  eventId: string
}

export const Actions = ({isDisabled, isPublished, eventId}: ActionsProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onClick = async () => {
    try {
      setIsLoading(true)
      if(isPublished) {
        await axios.patch(`/api/events/unpublish/${eventId}`)
        toast.success(`O evento foi despublicado com sucesso!`)
      } else {
        await axios.patch(`/api/events/publish/${eventId}`)
        toast.success(`O evento foi publicado com sucesso!`)
      }
      router.refresh()
    } catch (error) {
      toast.error('Algo deu errado, tente novamente')
    } finally {
      setIsLoading(false)
    }
  }

  const onConfirm = async () => {
    try {
      setIsLoading(true)
      await axios.patch(`/api/events/delete/${eventId}`)
      toast.success(`O evento foi deletado com sucesso com sucesso!`)

      router.push('/dashboard/eventos')
    } catch (error) {
      toast.error('Algo deu errado, tente novamente')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        onClick={onClick}
        disabled={isDisabled || isLoading}
      >
        { isPublished ? 'Despublicar' : 'Publicar' }
      </Button>
      <ConfirmModal
        onConfirm={onConfirm}
        title="Você tem certeza?"
        description={`Essa ação não poderá ser desfeita, você tem certeza que deseja realmente deletar o evento?`}
      >
        <Button variant="outline" size="sm">
          <Trash />
        </Button>
      </ConfirmModal>
    </div>
  )
}
