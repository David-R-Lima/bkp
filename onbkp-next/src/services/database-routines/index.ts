import { MutationKey, QueryFunctionContext } from "@tanstack/react-query"
import { api } from "../api"
import { DatabaseRoutine } from "./types"

export const getDatabaseRoutines = async (ctx: QueryFunctionContext) => {
    const [, id_database] = ctx.queryKey
    const { data } = await api.get<DatabaseRoutine[]>('/routines/' + id_database)

    return data
}

export const createRoutines = async (id_database: string, execution_time: string) => {
    const array = splitNumber(execution_time as unknown as number)

    const hours = array[0]
    const minutes = array[1]

    if(hours > 24 || hours < 0) {
        throw new Error("Invalid hours")
    }

    if(minutes > 59 || minutes < 0) {
        throw new Error("Invalid minutes")
    }

    const temp = new Date()

    temp.setHours(hours)
    temp.setMinutes(minutes)

    await api.post("/routine", {
        id_database: id_database,
        execution_time: temp
    })
}

export const activateRoutine = async (id_database: string, id_routine: string) => {
    await api.post('/database/' + id_database + "/" + id_routine + "/schedule-backup")
}

export const inactivateRoutine = async (id_database: string, id_routine: string) => {
    await api.post('/database/' + id_database + "/" + id_routine + "/unschedule-backup")
}


function splitNumber(number: number) {
    // Convert the number to a string
    const numStr = number.toString();

    // Initialize an array to hold the results
    const result = [];

    // Loop through the string in steps of 2 characters
    for (let i = 0; i < numStr.length; i += 2) {
        // Slice the string to get two characters and convert them to a number
        result.push(parseInt(numStr.substring(i, i + 2), 10));
    }

    return result;
}