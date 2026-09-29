"use server"

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

export async function deleteService(id: string) {
  try {
    await prisma.service.delete({
      where: { id }
    });
    const adminPath = process.env.ADMIN_PATH || 'secure-panel-x7k29m';
    revalidatePath(`/${adminPath}/services`);
    revalidatePath(`/services`);
    revalidatePath(`/`);
    return { success: true };
  } catch (error) {
    console.error("Failed to delete service:", error);
    return { success: false, error: "Failed to delete service" };
  }
}

export async function updateService(id: string, formData: FormData) {
  try {
    const data: any = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      description: formData.get("description") as string,
      icon: (formData.get("icon") as string) || null,
      features: formData.get("features") as string,
      published: formData.get("published") === "on",
    };

    // Handle Image Upload
    const file = formData.get("thumbnailFile") as File;
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-service-${file.name.replace(/\s+/g, '-')}`;
      
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
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
      await prisma.service.create({
        data
      });
    } else {
      await prisma.service.update({
        where: { id },
        data
      });
    }

    const adminPath = process.env.ADMIN_PATH || 'secure-panel-x7k29m';
    revalidatePath(`/${adminPath}/services`);
    revalidatePath(`/services`);
    revalidatePath(`/`);
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update service:", error);
    return { success: false, error: "Failed to update service: " + (error.message || String(error)) };
  }
}
