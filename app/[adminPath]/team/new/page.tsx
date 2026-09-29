import { TeamForm } from "@/components/admin/team-form";

export const revalidate = 0;

export default async function NewTeamPage({
  params,
}: {
  params: Promise<{ adminPath: string }>;
}) {
  const resolvedParams = await params;
  const adminPath = resolvedParams.adminPath;

  const emptyMember = {
    id: "new",
    name: "",
    designation: "",
    bio: "",
    skills: "",
    linkedIn: "",
    github: "",
    socialUrl: "",
    published: false,
  };

  return <TeamForm member={emptyMember} adminPath={adminPath} />;
}
