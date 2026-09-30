import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, ExternalLink, Layout } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";

export const revalidate = 60;

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
  });

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Projects | RK Informative`,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
    include: { images: true }
  });

  if (!project || !project.published) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Project Header */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 bg-muted/30 border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/projects" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge variant="secondary" className="text-sm">{project.category}</Badge>
            <Badge variant="outline" className="text-sm text-muted-foreground">{project.clientType}</Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            {project.title}
          </h1>
          
          <p className="text-xl text-muted-foreground text-balance">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            {project.liveUrl && (
              <Button asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Visit Live Site <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  View Source Code <FaGithub className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="aspect-video w-full bg-muted rounded-xl overflow-hidden relative mb-16 shadow-lg border">
            {project.thumbnail ? (
               <Image src={project.thumbnail} alt={project.title} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary/20">
                <Layout className="h-16 w-16 opacity-20" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
                  {project.description}
                </div>
              </div>

              {project.challenge && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
                  <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
                    {project.challenge}
                  </div>
                </div>
              )}

              {project.solution && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">The Solution</h2>
                  <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
                    {project.solution}
                  </div>
                </div>
              )}

              {project.result && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Results & Impact</h2>
                  <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
                    {project.result}
                  </div>
                </div>
              )}
            </div>

            <div className="md:col-span-1 space-y-8">
              <div className="p-6 bg-muted/30 rounded-xl border">
                <h3 className="font-bold mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.split(',').map((tech, i) => (
                    <Badge variant="secondary" key={i}>{tech.trim()}</Badge>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-muted/30 rounded-xl border">
                <h3 className="font-bold mb-4">Key Features</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {project.features.split(',').map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-primary mr-2">•</span> {feature.trim()}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-6 bg-muted/30 rounded-xl border">
                <h3 className="font-bold mb-4">Project Details</h3>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Client Type</dt>
                    <dd className="font-medium mt-1">{project.clientType}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Status</dt>
                    <dd className="font-medium mt-1">{project.status}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Something Similar?</h2>
          <p className="text-primary-foreground/80 mb-10 max-w-xl mx-auto text-lg">
            Let's discuss your project requirements and see how we can build a solution tailored for your business.
          </p>
          <Button size="lg" variant="secondary" className="text-primary font-semibold" asChild>
            <Link href="/start-project">
              Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
