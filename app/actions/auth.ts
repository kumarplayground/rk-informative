"use server"

import { deleteSession, createSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/db/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

export async function logout() {
  await deleteSession()
  const adminPath = process.env.ADMIN_PATH || 'secure-panel-x7k29m'
  redirect(`/${adminPath}/login`)
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})

export async function login(prevState: any, formData: FormData) {
  try {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password")
    }

    const { email, password } = loginSchema.parse(rawData)

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return { success: false, message: "Invalid credentials" }
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    
    if (!passwordMatch) {
      return { success: false, message: "Invalid credentials" }
    }

    await createSession(user.id)
    
    // Will redirect after success in the component, or we can redirect here
    const adminPath = process.env.ADMIN_PATH || 'secure-panel-x7k29m'
    redirect(`/${adminPath}/dashboard`)

  } catch (error) {
    if ((error as any).message === 'NEXT_REDIRECT') {
      throw error // Let Next.js handle redirect
    }
    return { success: false, message: "Authentication failed. Please check your inputs." }
  }
}
