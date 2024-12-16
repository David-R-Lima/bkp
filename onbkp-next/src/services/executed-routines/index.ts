import { Meta } from "@/services/meta"
import { api } from "../api"
import { ExecutedRoutines } from "./types"
import { QueryFunctionContext } from "@tanstack/react-query"

export const getExecutedRoutines = async (ctx: QueryFunctionContext) => {
    const [, id_database, page_index] = ctx.queryKey
    const { data } = await api.get<{data: ExecutedRoutines[], meta: Meta}>('/executed-routines/' + id_database + "?page_index=" + page_index)

    return data
}

export const downloadFile = async (id_routine: string, id_executed_routine: string) => {
    const { data } = await api.get<Buffer>(`/backups/${id_routine}/${id_executed_routine}/download`, { responseType: 'blob' })

    return data
}