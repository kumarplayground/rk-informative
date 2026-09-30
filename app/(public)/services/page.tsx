import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layout, Code2, Smartphone, Database, BrainCircuit, Cog } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | RK Informative",
  description: "Comprehensive software development services including web, mobile, desktop, and AI solutions.",
};

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: { displayOrder: 'asc' },
  });

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          Software Development <span className="text-primary">Services</span>
        </h1>
        <p className="text-lg text-muted-foreground text-balance">
          End-to-end technical solutions designed to solve complex business problems, streamline operations, and drive growth.
        </p>
      </div>

      <div className="space-y-24">
        {services.map((service, index) => (
          <section key={service.id} id={service.slug} className="scroll-mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className={`space-y-6 ${index % 2 !== 0 ? 'md:order-last' : ''}`}>
                <div className="inline-flex items-center rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-sm font-medium">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h2 className="text-3xl font-bold">{service.title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                
                <div>
                  <h3 className="font-semibold mb-4">Key Capabilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.features.split(',').map((feature, i) => (
                      <Badge variant="outline" key={i} className="text-sm px-3 py-1">
                        {feature.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Button asChild>
                    <Link href={`/start-project?service=${service.slug}`}>
                      Discuss Your Project <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="aspect-square md:aspect-auto md:h-full min-h-[300px] bg-muted/30 border rounded-2xl flex items-center justify-center relative overflow-hidden">
                {service.thumbnail ? (
                  <Image 
                    src={service.thumbnail} 
                    alt={service.title} 
                    fill 
                    className="object-cover transition-transform duration-700 hover:scale-105" 
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
                    <div className="relative z-10 text-muted-foreground/30">
                      <Cog className="h-32 w-32 animate-spin-slow" style={{ animationDuration: '20s' }} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
      
      {/* Process Section */}
      <section className="mt-32 pt-24 border-t">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Development Process</h2>
          <p className="text-muted-foreground text-balance">
            A structured approach to transforming your ideas into robust, scalable software solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { step: '01', title: 'Understand', desc: 'Requirements gathering' },
            { step: '02', title: 'Plan', desc: 'Architecture & tech stack' },
            { step: '03', title: 'Design', desc: 'UI/UX and prototyping' },
            { step: '04', title: 'Develop', desc: 'Agile implementation' },
            { step: '05', title: 'Deploy', desc: 'Testing & launch' },
            { step: '06', title: 'Support', desc: 'Maintenance & updates' },
          ].map((phase, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 bg-muted/20 rounded-xl border">
              <span className="text-sm font-bold text-primary mb-4">{phase.step}</span>
              <h3 className="font-bold mb-2">{phase.title}</h3>
              <p className="text-xs text-muted-foreground">{phase.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
