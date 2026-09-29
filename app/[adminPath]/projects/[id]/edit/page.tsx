import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/project-form";

export const revalidate = 0;

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ adminPath: string; id: string }>;
}) {
  const resolvedParams = await params;
  const adminPath = resolvedParams.adminPath;
  const id = resolvedParams.id;

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    notFound();
  }

  return <ProjectForm project={project} adminPath={adminPath} />;
}
