'use client'

import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
import { api } from "@/services/api"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { getCookie } from 'cookies-next'
import { signIn } from 'next-auth/react'
import { useLogin } from "@/context/login-context"
import { Database } from "lucide-react"

interface Login {
  email: string
  code: number
}

export default function Confirm() {
  const { email } = useLogin()
  const [loading, setLoading] = useState(false)
  const [CredentialsError, setCredentialsError] = useState(false)
  const [SignatureError, setSignatureError] = useState(false)
  const [value, setValue] = useState("")

  const router = useRouter()

  async function login({ email, code }: Login) {
    setLoading(true)

    const res = await signIn('credentials', {
      email,
      code,
      redirect: false,
    })

    if (res?.error) {
      if (res.error.includes('403')) {
        setLoading(false)
        setSignatureError(true)


        return
      }

      setLoading(false)
      setCredentialsError(true)

      return
    }

    api.defaults.headers.common.Authorization = `Bearer ${getCookie(
      'access_token.onbkp',
    )}`

    router.push('/dashboard')
  }
  return (
    <div className="w-full md:grid md:min-h-[600px] md:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden h-[100vh] md:flex items-center justify-center border-r-2 bg-muted">
        <Database className="w-[40%] h-[40%]" />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Confirma o código abaixo
            </p>
          </div>
          <div className="grid gap-6 ">
              <div className="flex items-center justify-center">
                  <InputOTP maxLength={6}         
                    value={value}
                    onChange={(value) => setValue(value)}
                  >
                      <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                      </InputOTPGroup>
                  </InputOTP>
              </div>
              <Button type="submit" className="w-full" onClick={() => {
                login({email, code: Number(value)})
              }}>
              Confirm
              </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            <Link href="#" className="underline">
              Resend Code
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}