import { ProjectForm } from "@/components/admin/project-form";

export const revalidate = 0;

export default async function NewProjectPage({
  params,
}: {
  params: Promise<{ adminPath: string }>;
}) {
  const resolvedParams = await params;
  const adminPath = resolvedParams.adminPath;

  // Empty project shell for creation
  const emptyProject = {
    id: "new",
    title: "",
    slug: "",
    shortDescription: "",
    description: "",
    category: "",
    clientType: "",
    status: "",
    technologies: "",
    features: "",
    published: false,
    featured: false,
  };

  return <ProjectForm project={emptyProject} adminPath={adminPath} />;
}
