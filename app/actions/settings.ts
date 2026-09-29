"use server"

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function updateContactSettings(formData: FormData) {
  try {
    const email = formData.get("contact_email") as string;
    const whatsapp = formData.get("contact_whatsapp") as string;
    const location = formData.get("contact_location") as string;

    await prisma.siteSetting.upsert({
      where: { key: "contact_email" },
      update: { value: email },
      create: { key: "contact_email", value: email, description: "Public contact email" }
    });

    await prisma.siteSetting.upsert({
      where: { key: "contact_whatsapp" },
      update: { value: whatsapp },
      create: { key: "contact_whatsapp", value: whatsapp, description: "Public WhatsApp number" }
    });

    await prisma.siteSetting.upsert({
      where: { key: "contact_location" },
      update: { value: location },
      create: { key: "contact_location", value: location, description: "Public location" }
    });

    const adminPath = process.env.ADMIN_PATH || 'secure-panel-x7k29m';
    revalidatePath(`/${adminPath}/contact-details`);
    revalidatePath(`/contact`);
    revalidatePath(`/`);
    
    return { success: true };
  } catch (error) {
    console.error("Failed to update contact settings:", error);
    return { success: false, error: "Failed to update contact details" };
  }
}
