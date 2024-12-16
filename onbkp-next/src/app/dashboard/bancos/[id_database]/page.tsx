'use client'

import { getDatabase } from "@/services/database"
import { activateRoutine, getDatabaseRoutines, inactivateRoutine } from "@/services/database-routines"
import { useMutation, useQueries } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import dayjs from 'dayjs'
import { getExecutedRoutines } from "@/services/executed-routines"
import { TableComponent } from "@/components/table"
import { ExecutedRoutinesColumns } from "./executed-routines-columns"
import { CreateRoutineForm } from "./create-routine-form"
import { EditBancoForm } from "./edit-database-form"
import { useState } from "react"
  

export default function ManageDatabase() {
    const [page, setPage] = useState(0)
    const { id_database } = useParams()

    const columns = ExecutedRoutinesColumns()

    const [database, routines, executedRoutines] = useQueries({
        queries: [
            {
                queryKey: ['database', id_database],
                queryFn: getDatabase,
                retry: 0,
            },
            {
                queryKey: ['database-routine', id_database],
                queryFn: getDatabaseRoutines,
                retry: 0,
            },
            {
                queryKey: ['executed-routines', id_database, 0],
                queryFn: getExecutedRoutines,
                retry: 0,
            }
        ]
    })
    interface mutationProps {
        id_database: string
        id_routine: string
    }

    const activateRoutineMutation = useMutation({
        mutationFn: async ({id_database, id_routine}: mutationProps) => {
            return await activateRoutine(id_database, id_routine);
        },
        onSuccess: () => {
            routines.refetch()
        },
        onError: (error) => {
            console.log(error)
        }
    });

    const handleActivateRoutineMutation = (id_database: string, id_routine: string) => {
        activateRoutineMutation.mutate({id_database, id_routine})
    }

    const inactivateRoutineMutation = useMutation({
        mutationFn: async ({id_database, id_routine}: mutationProps) => {
            return inactivateRoutine(id_database, id_routine);
        },
        onSuccess: () => {
            routines.refetch()
        },
        onError: (error) => {
            console.log(error)
        }
    });

    const handleInactivateRoutineMutation = (id_database: string, id_routine: string) => {
        inactivateRoutineMutation.mutate({id_database, id_routine})
    }

    return <div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Banco</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <div className="space-y-2">
                                    <p><strong>Nome:</strong> {database.data?.database_name}</p>
                                    <p><strong>Descrição:</strong> {database.data?.database_description}</p>
                                    <p><strong>Host:</strong> {database.data?.host}</p>
                                    <p><strong>Port:</strong> {database.data?.port}</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div>
                                {database.data && (
                                    <EditBancoForm database={database.data}></EditBancoForm>
                                )}
                            </div>
                        </CardFooter>
                    </Card>
                </div>
                <hr className="my-6"/>
                <h1 className="font-bold text-xl">Rotinas</h1>
                <div className="space-y-4 mt-4 border p-4 rounded-lg">
                    <div>
                    <CreateRoutineForm id_database={id_database as string}></CreateRoutineForm>
                    </div>
                    <div className="space-y-4">
                    {routines.data?.map((routine) => (
                        <Card key={routine.id_database_routine} className="flex items-center">
                            <CardHeader className="space-y-4">
                                <div>
                                    <p>Tempo de execução: {dayjs(routine.execution_time).format("HH:mm") }</p>
                                    <p>Status Atual: {routine.active ? "Ativo" : "Inativo"}</p>
                                </div>
                            </CardHeader>
                            <div className="space-x-4">
                                {routine.active ? <Button onClick={() => {
                                    handleInactivateRoutineMutation(routine.id_database, routine.id_database_routine)
                                }}>Inativar</Button> : <Button onClick={() => {
                                    handleActivateRoutineMutation(routine.id_database, routine.id_database_routine)
                                }}>Ativar</Button>}
                                {/* <Button variant={'destructive'}>Excluir rotina</Button> */}
                            </div>
                        </Card>
                    ))}
                    </div>
                </div>
                <hr className="my-6"/>

                <h1 className="font-bold text-xl">Backups</h1>
                <div className="mt-6">
                    <TableComponent name="" columns={columns} data={executedRoutines.data?.data ?? []} page={page} setPage={setPage}></TableComponent>
                </div>
            </div>
}