import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { api } from '@/services/api'
import { cookies } from 'next/headers'
import dayjs from 'dayjs'
import { decode } from 'next-auth/jwt'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'example@email.com',
        },
        code: { label: 'code', type: 'password' },
      },

      async authorize(credentials) {
        const res = await api.post('/sessions', {
          email: credentials?.email,
          code: credentials?.code,
        })

        const token = res.data.access_token
        
        cookies().set('access_token.onbkp', token, {
          expires: dayjs().add(3, 'day').toDate(),
        })

        const session = await api.get('/users', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })

        const decodedToken = decode(token)

        const { user } =
          session.data

        if (user) {
          return {
            id: user.id_user,
            name: user.name,
            email: user.email,
          }
        } else {
          return null
        }
      },
    }),
  ],
  session: {
    maxAge: 24 * 60 * 60 * 3, // 3 days
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        return { ...token, ...session.user }
      }
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token as any
      return session
    },
  },
})

export { handler as GET, handler as POST }
