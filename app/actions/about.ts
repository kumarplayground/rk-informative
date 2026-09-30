"use server"

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";

export async function updateAboutProfile(id: string, formData: FormData) {
  try {
    const data: any = {
      name: formData.get("name") as string,
      designation: formData.get("designation") as string,
      bio: formData.get("bio") as string,
      skills: formData.get("skills") as string,
      experience: (formData.get("experience") as string) || null,
      socialLinks: (formData.get("socialLinks") as string) || null,
      visibility: formData.get("visibility") === "on",
    };

    // Handle Image Upload
    const file = formData.get("profileImageFile") as File;
    if (file && file.size > 0) {
      const blob = await put(file.name, file, { access: 'public' });
      data.profileImage = blob.url;
    } else {
      const existingUrl = formData.get("profileImageUrl") as string;
      if (existingUrl) data.profileImage = existingUrl;
    }

    await prisma.aboutProfile.update({
      where: { id },
      data
    });

    const adminPath = process.env.ADMIN_PATH || 'secure-panel-x7k29m';
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
}
