import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { TeamForm } from "@/components/admin/team-form";

export const revalidate = 0;

export default async function EditTeamPage({
  params,
}: {
  params: Promise<{ adminPath: string; id: string }>;
}) {
  const resolvedParams = await params;
  const adminPath = resolvedParams.adminPath;
  const id = resolvedParams.id;

  const member = await prisma.teamMember.findUnique({
    where: { id },
  });

  if (!member) {
    notFound();
  }

  return <TeamForm member={member} adminPath={adminPath} />;
}
