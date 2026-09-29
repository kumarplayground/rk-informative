import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { AboutForm } from "@/components/admin/about-form";

export const revalidate = 0;

export default async function EditAboutPage({
  params,
}: {
  params: Promise<{ adminPath: string; id: string }>;
}) {
  const resolvedParams = await params;
  const adminPath = resolvedParams.adminPath;
  const id = resolvedParams.id;

  const profile = await prisma.aboutProfile.findUnique({
    where: { id },
  });

  if (!profile) {
    notFound();
  }

  return <AboutForm profile={profile} adminPath={adminPath} />;
}
