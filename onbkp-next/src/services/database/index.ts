import { QueryFunctionContext } from "@tanstack/react-query"
import { api } from "../api"
import { Meta } from "../meta"
import { Database } from "./types"
import { formSchemaData } from "@/app/dashboard/bancos/create-database-form"
import { editFormSchemaData } from "@/app/dashboard/bancos/[id_database]/edit-database-form"

export const getDatabases = async (ctx: QueryFunctionContext) => {
  const [, user_id, page] = ctx.queryKey
    const { data } = await api.get<{data: Database[], meta: Meta}>('/databases/' + user_id + '?page_index=' + page)

    return data.data
  }

export const getDatabase = async (ctx: QueryFunctionContext) => {
  const [, id_database] = ctx.queryKey
  const { data } = await api.get<{database: Database}>('/databases?id_database=' + id_database)

  return data.database
}

export const createDatabase = async (formData: formSchemaData) => {
  await api.post("/database", {...formData})
}

export const editDatabase = async (formData: editFormSchemaData) => {
  await api.patch("/database/" + formData.id_database, {...formData})
}