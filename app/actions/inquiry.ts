"use server"

import { prisma } from "@/lib/db/prisma"
import { z } from "zod"
import { revalidatePath } from "next/cache"

const inquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number is required"),
  company: z.string().optional(),
  projectType: z.string().min(2, "Project type is required"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  requirement: z.string().min(10, "Please provide more details about your project"),
})

export async function submitInquiry(prevState: any, formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      projectType: formData.get("projectType"),
      budget: formData.get("budget"),
      timeline: formData.get("timeline"),
      requirement: formData.get("requirement"),
    }

    const validatedData = inquirySchema.parse(rawData)

    await prisma.inquiry.create({
      data: {
        ...validatedData,
        status: "NEW"
      }
    })

    // Revalidate admin dashboard if we had one cached
    revalidatePath(`/${process.env.ADMIN_PATH || 'secure-panel-x7k29m'}/dashboard`)

    return {
      success: true,
      message: "Thank you! Your project inquiry has been received. I will get back to you shortly.",
      errors: undefined
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
        message: "Please check the form for errors."
      }
    }
    
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
      errors: undefined
    }
  }
}
