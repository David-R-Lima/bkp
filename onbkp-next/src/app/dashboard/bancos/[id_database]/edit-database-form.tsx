"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { useForm } from 'react-hook-form'
  import { z } from 'zod'
  import { zodResolver } from '@hookform/resolvers/zod'
  import { Input } from "@/components/ui/input"
  import { useHookFormMask } from 'use-mask-input'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { editDatabase } from "@/services/database";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner";
import { Database } from "@/services/database/types";
import { useEffect } from "react";

const formSchema = z.object({
    id_database: z.string(),
    server: z.string().optional(),
    port: z.coerce.number().optional(),
    host: z.string().optional(),
    database_name: z.string().optional(),
    database_description: z.string().optional(),
    database_type: z.string().optional(),
    database_user: z.string().optional(),
    database_password:  z.string().optional(),
  })
  
  export type editFormSchemaData = z.infer<typeof formSchema>

interface Props {
  database: Database;
}

export function EditBancoForm({database}: Props) {

  const session = useSession()

  const queryCient = useQueryClient()

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        clearErrors,
        formState: { errors, isSubmitting },
      } = useForm<editFormSchemaData>({
        resolver: zodResolver(formSchema),
      })

      const registerWithMask = useHookFormMask(register)

      const submitMutation = useMutation({
        mutationFn: async (form: editFormSchemaData) => {
            return editDatabase(form)
        },
        onSuccess: (e) => {
            clearErrors()
            toast.success("Banco cadastrado com sucesso!")
            queryCient.invalidateQueries({
              queryKey: ['databases-table'],
            })
        },
        onError: (error) => {
          console.log('error: ', error);
          toast.error("Erro as cadastrar banco")
        }
      })

      const handleSumbitMutation = (data: editFormSchemaData) => {
        submitMutation.mutate(data)
      }

      useEffect(() => {
        setValue('id_database', database.id_database)
        setValue('server', database.server_name)
        setValue('port', Number.parseInt(database.port))
        setValue('host', database.host)
        setValue('database_name', database.database_name)
        setValue('database_description', database.database_description)
        setValue('database_type', database.database_type)
      }, [])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Editar</Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSubmit(handleSumbitMutation)} className="space-y-4">

                    <div className="flex-col space-y-2 items-center justify-around">
                        <div>
                          <Input placeholder="Nome do serviço" {...register('server')}></Input>
                          {errors.server && (
                            <span className="text-red-500 text-xs">{errors.server.message}</span>
                          )}
                        </div>
                        <div>
                          <Input placeholder="Número da porta" {...register('port')}></Input>
                          {errors.port && (
                            <span className="text-red-500 text-xs">{errors.port.message}</span>
                          )}
                        </div>
                        <div>
                          <Input placeholder="Nome do host" {...register('host')}></Input>
                          {errors.host && (
                            <span className="text-red-500 text-xs">{errors.host.message}</span>
                          )}
                        </div>
                        <div>
                          <Input placeholder="Nome do banco" {...register('database_name')}></Input>
                          {errors.database_name && (
                            <span className="text-red-500 text-xs">{errors.database_name.message}</span>
                          )}
                        </div>
                        <div>
                          <Input placeholder="Descrição do banco" {...register('database_description')}></Input>
                          {errors.database_description && (
                            <span className="text-red-500 text-xs">{errors.database_description.message}</span>
                          )}
                        </div>
                        <div>
                          <Select onValueChange={(e) => {
                            setValue('database_type', e)
                          }}
                          value={watch('database_type')}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Tipo do banco" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Tipo do banco</SelectLabel>
                                <SelectItem value="POSTGRES">Postgres</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Input placeholder="Usuário do banco" {...register('database_user')}></Input>
                          {errors.database_user && (
                            <span className="text-red-500 text-xs">{errors.database_user.message}</span>
                          )}
                        </div>
                        <div>
                          <Input placeholder="Senha do usuário" {...register('database_password')}></Input>
                          {errors.database_password && (
                            <span className="text-red-500 text-xs">{errors.database_password.message}</span>
                          )}
                        </div>
                    </div>
                    <hr />
                    <DialogClose asChild>
                      <Button className="w-full" type="submit">Editar</Button>
                    </DialogClose>
                </form>

            </DialogContent>
        </Dialog>
    )
}
