import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Database, Layout, Smartphone } from "lucide-react";
import { prisma } from "@/lib/db/prisma";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const SERVICE_IMAGES: Record<string, string> = {
  'web-application-development': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
  'mobile-app-development': 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800',
  'desktop-software': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  'erp-management-systems': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
  'ai-chatbots': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
  'ai-automation': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
  'api-backend-development': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
};

export const revalidate = 60; // Revalidate every 60s

export default async function HomePage() {
  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: { displayOrder: 'asc' },
    take: 8
  });

  const featuredProjects = await prisma.project.findMany({
    where: { published: true, featured: true },
    orderBy: { displayOrder: 'asc' },
    take: 3
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 md:pt-36 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 mb-6 bg-secondary text-secondary-foreground border-transparent">
            SOFTWARE DEVELOPMENT & AI SOLUTIONS
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto text-balance">
            Build Software That Moves Your <span className="text-primary">Business Forward</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance">
            I design and develop custom web, mobile, desktop and AI-powered solutions tailored to your business needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto text-base" asChild>
              <Link href="/start-project">
                Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base" asChild>
              <Link href="/projects">
                Explore My Work
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Strip Marquee */}
      <section className="border-y bg-muted/30 py-8 overflow-hidden flex whitespace-nowrap">
        <div className="flex w-max animate-marquee items-center gap-12 md:gap-24 pr-12 md:pr-24">
          {/* First set */}
          <div className="flex items-center gap-12 md:gap-24 opacity-70">
            <div className="flex items-center gap-2 font-medium shrink-0"><Layout className="h-5 w-5" /> Web Development</div>
            <div className="flex items-center gap-2 font-medium shrink-0"><Smartphone className="h-5 w-5" /> Mobile Apps</div>
            <div className="flex items-center gap-2 font-medium shrink-0"><Code2 className="h-5 w-5" /> Desktop Software</div>
            <div className="flex items-center gap-2 font-medium shrink-0"><Database className="h-5 w-5" /> AI & Automation</div>
          </div>
          {/* Duplicate set for seamless looping */}
          <div className="flex items-center gap-12 md:gap-24 opacity-70">
            <div className="flex items-center gap-2 font-medium shrink-0"><Layout className="h-5 w-5" /> Web Development</div>
            <div className="flex items-center gap-2 font-medium shrink-0"><Smartphone className="h-5 w-5" /> Mobile Apps</div>
            <div className="flex items-center gap-2 font-medium shrink-0"><Code2 className="h-5 w-5" /> Desktop Software</div>
            <div className="flex items-center gap-2 font-medium shrink-0"><Database className="h-5 w-5" /> AI & Automation</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
              End-to-end software development services delivering high-performance, scalable solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="transition-all hover:shadow-md hover:border-primary/50 overflow-hidden flex flex-col group/card">
                <div className="relative h-48 w-full overflow-hidden border-b bg-muted/50">
                  <Image 
                    src={service.thumbnail || SERVICE_IMAGES[service.slug] || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'} 
                    alt={service.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover/card:scale-105" 
                  />
                </div>
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.split(',').map((f) => f.trim()).filter(Boolean).slice(0,3).map((feature, i) => (
                      <Badge variant="secondary" key={i} className="text-xs font-normal">{feature}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button variant="ghost" className="w-full text-sm group" asChild>
                    <Link href={`/services#${service.slug}`}>
                      Learn More <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Work</h2>
              <p className="text-muted-foreground max-w-2xl text-balance">
                A selection of recent projects demonstrating technical capability and business impact.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Link href={`/projects/${project.slug}`} key={project.id} className="group flex flex-col h-full">
                <Card className="flex flex-col h-full overflow-hidden border-transparent transition-all hover:border-primary/50 hover:shadow-lg bg-background">
                  <div className="aspect-video w-full bg-muted overflow-hidden relative">
                    {project.thumbnail ? (
                      <Image 
                        src={project.thumbnail} 
                        alt={project.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        <Layout className="h-12 w-12 opacity-20" />
                      </div>
                    )}
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
                      {project.technologies.split(',').slice(0,3).map((tech, i) => (
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to turn your idea into reality?</h2>
          <p className="text-primary-foreground/80 mb-10 max-w-2xl mx-auto text-lg">
            Let's discuss how we can build software that solves your business challenges.
          </p>
          <Button size="lg" variant="secondary" className="text-primary font-semibold" asChild>
            <Link href="/start-project">
              Start Your Project
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
