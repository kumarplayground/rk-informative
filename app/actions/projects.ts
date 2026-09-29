"use server"

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id }
    });
    const adminPath = process.env.ADMIN_PATH || 'secure-panel-x7k29m';
    revalidatePath(`/${adminPath}/projects`);
    revalidatePath(`/projects`);
    revalidatePath(`/`);
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
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      // Ensure dir exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);
      data.thumbnail = `/uploads/${fileName}`;
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
    revalidatePath(`/${adminPath}/projects`);
    revalidatePath(`/projects`);
    revalidatePath(`/`);
    return { success: true };
  } catch (error) {
    console.error("Failed to update project:", error);
    return { success: false, error: "Failed to update project" };
  }
}
