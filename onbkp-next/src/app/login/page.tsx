'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useLogin } from "@/context/login-context"
import { useMutation } from "@tanstack/react-query"
import { createLoginCode } from "@/services/users"
import { Database } from "lucide-react"
  
interface Login {
  email: string;
}

export default function Dashboard() {
  const { email, setEmail } = useLogin()
  const router = useRouter()

  const createLoginCodeMutation = useMutation({
    mutationFn: async ({ email }: Login) => {
      return createLoginCode(email)
    },
    onSuccess: (data) => {
      router.push('/login/confirm')
    },
    onError: (error) => {
      console.log(error)
    }
  })
  const handleSumbitMutation = (data: Login) => {
    createLoginCodeMutation.mutate(data)
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
              Enter your email below to login to your account
            </p>
          </div>
              <div className="grid gap-6">
                  <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      onChange={(e) => {
                        setEmail(e.currentTarget.value)
                      }}
                  />
                  </div>
                  <Button type="submit" className="w-full" onClick={() => {
                    handleSumbitMutation({email})
                  }}>
                    Login
                  </Button>
              </div> 
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
