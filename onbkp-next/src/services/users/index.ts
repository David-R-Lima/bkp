import { api } from "../api"

export const createLoginCode = async (email: string) => {
    await api.post('/users/create-login-code', {email})
}