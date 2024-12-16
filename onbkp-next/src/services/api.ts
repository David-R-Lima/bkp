import axios, { AxiosError } from 'axios'
import { getCookie } from 'cookies-next';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

api.defaults.headers.common.Authorization = `Bearer ${getCookie(
  'access_token.onbkp',
)}`

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error: AxiosError) {
    if (error instanceof AxiosError) {
      if (error.request.status === 500) {
        console.log(error)
      }
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.log(error)
      }
    }

    return Promise.reject(error)
  },
)