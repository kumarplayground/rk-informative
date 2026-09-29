import { ServiceForm } from "@/components/admin/service-form";

export const revalidate = 0;

export default async function NewServicePage({
  params,
}: {
  params: Promise<{ adminPath: string }>;
}) {
  const resolvedParams = await params;
  const adminPath = resolvedParams.adminPath;

  const emptyService = {
    id: "new",
    title: "",
    slug: "",
    description: "",
    features: "",
    icon: "",
    thumbnail: "",
    published: false,
  };

  return <ServiceForm service={emptyService} adminPath={adminPath} />;
}
