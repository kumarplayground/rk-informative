import { prisma } from "@/lib/db/prisma";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team | RK Informative",
  description: "Meet the experts building your next software solution.",
};

export const revalidate = 60;

export default async function TeamPage() {
  const team = await prisma.teamMember.findMany({
    where: { published: true },
    orderBy: { displayOrder: 'asc' },
  });

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          Our <span className="text-primary">Team</span>
        </h1>
        <p className="text-lg text-muted-foreground text-balance">
          Dedicated professionals committed to delivering exceptional software solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {team.map((member) => (
          <Card key={member.id} className="overflow-hidden border-transparent transition-all hover:border-primary/50 hover:shadow-lg bg-background">
            <div className="aspect-square w-full bg-muted relative">
              {member.profileImage ? (
                <Image src={member.profileImage} alt={member.name} fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-secondary/20">
                  <span className="text-4xl font-bold text-muted-foreground">{member.name.charAt(0)}</span>
                </div>
              )}
            </div>
            <CardHeader className="text-center pb-2">
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-sm font-medium text-primary">{member.designation}</p>
            </CardHeader>
            <CardContent className="text-center pb-6">
              <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                {member.bio}
              </p>
              
              <div className="flex flex-wrap justify-center gap-1 mb-6">
                {member.skills.split(',').slice(0, 4).map((skill, i) => (
                  <Badge variant="secondary" key={i} className="text-[10px]">{skill.trim()}</Badge>
                ))}
              </div>

              <div className="flex justify-center gap-3">
                {member.github && (
                  <a href={member.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <FaGithub className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </a>
                )}
                {member.linkedIn && (
                  <a href={member.linkedIn} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <FaLinkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                )}
                {member.socialUrl && (
                  <a href={member.socialUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Globe className="h-4 w-4" />
                    <span className="sr-only">Website</span>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {team.length === 0 && (
        <div className="text-center py-24 border rounded-xl bg-muted/20">
          <h3 className="text-xl font-semibold mb-2">No team members found</h3>
          <p className="text-muted-foreground">Team profiles are currently being updated.</p>
        </div>
      )}
    </div>
  );
}
