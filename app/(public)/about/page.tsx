import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | RK Informative",
  description: "About RK Informative - Founder & Software Developer.",
};

export const revalidate = 60;

export default async function AboutPage() {
  const profile = await prisma.aboutProfile.findFirst({
    where: { visibility: true }
  });

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Profile Not Found</h1>
        <p className="text-muted-foreground">The profile information is currently being updated.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        {/* Left Column - Sticky Profile */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-24 space-y-8">
            <div className="aspect-square max-w-sm mx-auto lg:mx-0 bg-muted rounded-2xl overflow-hidden border relative">
              {profile.profileImage ? (
                <Image src={profile.profileImage} alt={profile.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-secondary/30 flex items-center justify-center">
                  <span className="text-muted-foreground text-4xl font-bold">RK</span>
                </div>
              )}
            </div>
            
            <div>
              <h1 className="text-4xl font-extrabold mb-2">{profile.name}</h1>
              <p className="text-xl text-primary font-medium">{profile.designation}</p>
            </div>
            
            <div className="flex gap-4">
              <Button variant="outline" size="icon" asChild>
                <a href="https://github.com" target="_blank" rel="noreferrer">
                  <FaGithub className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <FaLinkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
            </div>
            
            <div className="pt-6 border-t">
              <Button className="w-full lg:w-auto" asChild>
                <Link href="/start-project">
                  Work With Me <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Right Column - Bio & Details */}
        <div className="lg:col-span-7 space-y-16">
          <section>
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground text-lg leading-relaxed whitespace-pre-wrap">
              {profile.bio}
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-6">Technical Arsenal</h2>
            <div className="flex flex-wrap gap-3">
              {profile.skills.split(',').map((skill, i) => (
                <Badge key={i} variant="secondary" className="text-sm px-4 py-2 font-medium">
                  {skill.trim()}
                </Badge>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Development Philosophy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-muted/30 rounded-xl border">
                <h3 className="font-bold mb-2">Pragmatic Solutions</h3>
                <p className="text-sm text-muted-foreground">Focus on solving real business problems rather than chasing the latest hype. I choose the right tool for the job.</p>
              </div>
              <div className="p-6 bg-muted/30 rounded-xl border">
                <h3 className="font-bold mb-2">Scalable Architecture</h3>
                <p className="text-sm text-muted-foreground">Systems are designed to grow with your business, ensuring long-term viability and reduced technical debt.</p>
              </div>
              <div className="p-6 bg-muted/30 rounded-xl border">
                <h3 className="font-bold mb-2">User-Centric Design</h3>
                <p className="text-sm text-muted-foreground">Performance and accessibility are prioritized to deliver an exceptional experience for all users.</p>
              </div>
              <div className="p-6 bg-muted/30 rounded-xl border">
                <h3 className="font-bold mb-2">Transparent Communication</h3>
                <p className="text-sm text-muted-foreground">Clear timelines, honest technical assessments, and regular progress updates throughout the project.</p>
              </div>
            </div>
          </section>
        </div>
        
      </div>
    </div>
  );
}
