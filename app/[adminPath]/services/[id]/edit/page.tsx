import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { ServiceForm } from "@/components/admin/service-form";

export const revalidate = 0;

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ adminPath: string; id: string }>;
}) {
  const resolvedParams = await params;
  const adminPath = resolvedParams.adminPath;
  const id = resolvedParams.id;

  const service = await prisma.service.findUnique({
    where: { id },
  });

  if (!service) {
    notFound();
  }

  return <ServiceForm service={service} adminPath={adminPath} />;
}
