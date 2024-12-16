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
import { createDatabase } from "@/services/database";
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

const formSchema = z.object({
    server: z.string().min(1, "Campo obrigatório"),
    port: z.coerce.number().min(1, "Campo obrigatório"),
    host: z.string().min(1, "Campo obrigatório"),
    database_name: z.string().min(1, "Campo obrigatório"),
    database_description: z.string().min(1, "Campo obrigatório"),
    database_type: z.string().min(1, "Campo obrigatório"),
    database_user: z.string().min(1, "Campo obrigatório"),
    database_password:  z.string().min(1, "Campo obrigatório"),
    database_collection: z.string().optional()
  })
  
  export type formSchemaData = z.infer<typeof formSchema>

export function CreateBancoForm() {

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
        mutationFn: async (form: formSchemaData) => {
            return createDatabase(form)
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

      const handleSumbitMutation = (data: formSchemaData) => {
        submitMutation.mutate(data)
      }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Criar banco</Button>
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
                            switch (e) {
                              case "POSTGRES":
                                setValue('server', "postgresql")
                                break
                              case "MYSQL":
                                setValue('server', "mysql")
                                break
                              case "MONGO":
                                setValue('server', "mongodb")
                                break
                              default:
                                setValue('server', "")
                                break
                            }
                          }}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Tipo do banco" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Tipo do banco</SelectLabel>
                                <SelectItem value="POSTGRES">Postgres</SelectItem>
                                <SelectItem value="MYSQL">MySql</SelectItem>
                                <SelectItem value="MONGO">Mongodb</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        {
                          watch('database_type') === "MONGO" && (
                            <Input placeholder="Nome da coleção" {...register('database_collection')}></Input>
                          )
                        }
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
                      <Button className="w-full" type="submit">Criar</Button>
                    </DialogClose>
                </form>

            </DialogContent>
        </Dialog>
    )
}
