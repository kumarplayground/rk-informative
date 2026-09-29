import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | RK Informative",
  description: "Explore my portfolio of custom software development projects.",
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { displayOrder: 'asc' },
  });

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          Selected <span className="text-primary">Work</span>
        </h1>
        <p className="text-lg text-muted-foreground text-balance">
          A collection of software development projects spanning web, mobile, desktop, and AI solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link href={`/projects/${project.slug}`} key={project.id} className="group flex flex-col h-full">
            <Card className="flex flex-col h-full overflow-hidden border-transparent transition-all hover:border-primary/50 hover:shadow-lg bg-background">
              <div className="aspect-video w-full bg-muted overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <Layout className="h-12 w-12 opacity-20" />
                </div>
              </div>
              <CardHeader className="flex-grow pb-4">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <Badge variant="secondary" className="font-medium text-xs">{project.category}</Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{project.title}</CardTitle>
                <CardDescription className="line-clamp-2 mt-2">{project.shortDescription}</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.split(',').slice(0, 3).map((tech, i) => (
                    <Badge variant="outline" key={i} className="text-[10px]">{tech.trim()}</Badge>
                  ))}
                  {project.technologies.split(',').length > 3 && (
                    <Badge variant="outline" className="text-[10px]">+{project.technologies.split(',').length - 3}</Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-0 pb-6">
                <span className="text-sm font-medium text-primary flex items-center">
                  View Case Study <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      
      {projects.length === 0 && (
        <div className="text-center py-24 border rounded-xl bg-muted/20">
          <h3 className="text-xl font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground">Projects are currently being updated. Please check back later.</p>
        </div>
      )}
    </div>
  );
}
