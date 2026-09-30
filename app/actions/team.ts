"use server"

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";

export async function deleteTeamMember(id: string) {
  try {
    await prisma.teamMember.delete({
      where: { id }
    });
    const adminPath = process.env.ADMIN_PATH || 'secure-panel-x7k29m';
    revalidatePath(`/${adminPath}/team`);
    revalidatePath(`/team`);
    return { success: true };
  } catch (error) {
    console.error("Failed to delete team member:", error);
    return { success: false, error: "Failed to delete team member" };
  }
}

export async function updateTeamMember(id: string, formData: FormData) {
  try {
    const data: any = {
      name: formData.get("name") as string,
      designation: formData.get("designation") as string,
      bio: formData.get("bio") as string,
      skills: formData.get("skills") as string,
      linkedIn: (formData.get("linkedIn") as string) || null,
      github: (formData.get("github") as string) || null,
      socialUrl: (formData.get("socialUrl") as string) || null,
      published: formData.get("published") === "on",
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

    if (id === "new") {
      await prisma.teamMember.create({
        data
      });
    } else {
      await prisma.teamMember.update({
        where: { id },
        data
      });
    }

    const adminPath = process.env.ADMIN_PATH || 'secure-panel-x7k29m';
    revalidatePath(`/${adminPath}/team`);
    revalidatePath(`/team`);
    return { success: true };
  } catch (error) {
    console.error("Failed to update team member:", error);
    return { success: false, error: "Failed to update team member" };
  }
}
