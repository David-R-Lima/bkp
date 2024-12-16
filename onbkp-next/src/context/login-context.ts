import { create } from 'zustand'

type Store = {
  email: string
  setEmail: (email: string) => void
} 

export const useLogin = create<Store>()((set) => ({
  email: "",
  setEmail: (email: string) => set((state) => ({ email: email })),
}))
