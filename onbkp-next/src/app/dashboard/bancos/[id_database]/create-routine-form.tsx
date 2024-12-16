"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { useForm } from 'react-hook-form'
  import z from 'zod'
  import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
  import { Input } from "@/components/ui/input"
  import { useHookFormMask } from 'use-mask-input'
import { useMutation, useMutationState, useQueryClient } from "@tanstack/react-query";
import { createRoutines } from "@/services/database-routines";
import { toast } from "sonner";

  

interface Props {
    id_database: string;
}

const formSchema = z.object({
    id_database: z.string(),
    execution_time: z.string()
  })
  
  type formSchemaData = z.infer<typeof formSchema>

export function CreateRoutineForm({id_database}: Props) {

  const queryCient = useQueryClient()

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        clearErrors,
        formState: { errors, isSubmitting },
      } = useForm<formSchemaData>({
        resolver: zodResolver(formSchema),
      })

      const registerWithMask = useHookFormMask(register)

      const submitMutation = useMutation({
        mutationFn: async ({id_database, execution_time}: formSchemaData) => {
            return createRoutines(id_database, execution_time)
        },
        onSuccess: () => {
            clearErrors()
            toast.success("Rotina cadastrada com sucesso!")
            queryCient.invalidateQueries({
              queryKey: ['database-routine'],
            })
        },
        onError: (error) => {
            toast.error("Erro ao cadastrar rotina.")
        }
      })

      const handleSumbitMutation = (data: formSchemaData) => {
        submitMutation.mutate(data)
      }

      useEffect(() => {
        if(id_database) {
            setValue('id_database', id_database)
        }
      }, [setValue, id_database])
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Adicionar Rotina</Button>
            </DialogTrigger>
            <DialogContent className="w-full flex-col justify-center items-center">
                <form onSubmit={handleSubmit(handleSumbitMutation)} className="space-y-4">

                    <div className="w-full flex space-x-2 items-center justify-around">
                        <label htmlFor="">Tempo para execução</label>
                        <Input {...registerWithMask('execution_time', '99:99', {
                            autoUnmask: true,
                        })} className="w-16"></Input>
                    </div>
                    <hr />
                    <DialogClose asChild>
                      <Button className="w-80" type="submit">Criar</Button>
                    </DialogClose>
                </form>

            </DialogContent>
        </Dialog>
    )
}
