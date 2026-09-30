"use server"

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id }
    });
    const adminPath = process.env.ADMIN_PATH || 'secure-panel-x7k29m';
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error("Failed to delete project:", error);
    return { success: false, error: "Failed to delete project" };
  }
}

export async function updateProject(id: string, formData: FormData) {
  try {
    const data: any = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      shortDescription: formData.get("shortDescription") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      clientType: formData.get("clientType") as string,
      status: formData.get("status") as string,
      technologies: formData.get("technologies") as string,
      features: formData.get("features") as string,
      published: formData.get("published") === "on",
      featured: formData.get("featured") === "on",
    };

    // Handle Image Upload
    const file = formData.get("thumbnailFile") as File;
    if (file && file.size > 0) {
      const blob = await put(file.name, file, { access: 'public' });
      data.thumbnail = blob.url;
    } else {
      const existingUrl = formData.get("thumbnailUrl") as string;
      if (existingUrl) data.thumbnail = existingUrl;
    }

    if (id === "new") {
      await prisma.project.create({
        data
      });
    } else {
      await prisma.project.update({
        where: { id },
        data
      });
    }

    const adminPath = process.env.ADMIN_PATH || 'secure-panel-x7k29m';
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error("Failed to update project:", error);
    return { success: false, error: "Failed to update project" };
  }
}
