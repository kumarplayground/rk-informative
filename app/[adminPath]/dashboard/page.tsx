import { prisma } from "@/lib/db/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FolderGit2, Layers, Users, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const revalidate = 0; // Don't cache admin dashboard

export default async function AdminDashboard({ params }: { params: Promise<{ adminPath: string }> }) {
  const resolvedParams = await params;
  const adminPath = resolvedParams.adminPath;

  const [
    totalProjects,
    publishedProjects,
    totalServices,
    teamMembers,
    newInquiries,
    totalInquiries,
    recentInquiries
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { published: true } }),
    prisma.service.count(),
    prisma.teamMember.count(),
    prisma.inquiry.count({ where: { status: "NEW" } }),
    prisma.inquiry.count(),
    prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5
    })
  ]);

  const stats = [
    {
      title: "Projects",
      value: `${publishedProjects} / ${totalProjects}`,
      description: "Published / Total",
      icon: FolderGit2,
      href: `/${adminPath}/projects`
    },
    {
      title: "Services",
      value: totalServices,
      description: "Active services",
      icon: Layers,
      href: `/${adminPath}/services`
    },
    {
      title: "Team Members",
      value: teamMembers,
      description: "Active profiles",
      icon: Users,
      href: `/${adminPath}/team`
    },
    {
      title: "Inquiries",
      value: newInquiries,
      description: "New unread / Total: " + totalInquiries,
      icon: MessageSquare,
      href: `/${adminPath}/inquiries`
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your studio's performance and recent activities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link href={stat.href} key={stat.title}>
            <Card className="hover:shadow-md transition-shadow hover:border-primary/50 cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Inquiries</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/${adminPath}/inquiries`}>View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentInquiries.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">No inquiries yet.</p>
            ) : (
              <div className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="mb-2 sm:mb-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{inquiry.name}</span>
                        {inquiry.status === "NEW" ? (
                          <Badge variant="default" className="text-[10px] h-5">NEW</Badge>
                        ) : (
                          <Badge variant="outline" className="text-[10px] h-5">{inquiry.status}</Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground line-clamp-1 max-w-[250px]">
                        {inquiry.projectType}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                      <Button variant="ghost" size="sm" className="h-8 text-primary" asChild>
                        <Link href={`/${adminPath}/inquiries?id=${inquiry.id}`}>
                          Review <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href={`/${adminPath}/projects/new`}>+ Add New Project</Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href={`/${adminPath}/services/new`}>+ Add New Service</Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href={`/${adminPath}/about`}>Edit About Profile</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
