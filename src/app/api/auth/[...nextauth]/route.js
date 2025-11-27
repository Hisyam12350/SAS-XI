import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { getUserByEmail } from "../../../../../lib/action"


export const authOptions = {
    pages: {
        signIn: "/login"
    },
    providers: [
        CredentialsProvider ({
            async authorize(credentials, req) {
                // 1. Unboxing data email sm password
                const email = credentials.email
                const password = credentials.password
                // 2. Nyari user berdasarkan email
                const user =  await getUserByEmail(email)
                if(!user) return null
                // 3. Compare password
                const isValid = await compare(password, user.password)
                if(!isValid) return null
                // 4. Jika compare berhasil, login berhasil
                return {
                    id      : user.id,
                    name    : user.username,
                    email   : user.email,
                    role   : user.role
                }
            }
        })
    ],
}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
