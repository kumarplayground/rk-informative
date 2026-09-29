import { prisma } from "@/lib/db/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function AdminAboutPage({ params }: { params: Promise<{ adminPath: string }> }) {
  const resolvedParams = await params;
  const adminPath = resolvedParams.adminPath;
  const profile = await prisma.aboutProfile.findFirst();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">About Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your public bio and skills.</p>
        </div>
      </div>

      {!profile ? (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No profile data found. Please run the database seed.
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{profile.name}</CardTitle>
              <CardDescription>{profile.designation}</CardDescription>
            </div>
            <Button variant="outline" asChild>
              <Link href={`/${adminPath}/about/${profile.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground uppercase mb-1">Biography</h3>
              <p>{profile.bio}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground uppercase mb-1">Skills</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.skills.split(',').map((skill, i) => (
                  <span key={i} className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-sm">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
            {profile.experience && (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground uppercase mb-1">Experience</h3>
                <p>{profile.experience}</p>
              </div>
            )}
            <div className="pt-4 border-t">
              <span className="text-sm font-medium">Visibility: </span>
              {profile.visibility ? (
                <span className="text-green-500 font-semibold">Public</span>
              ) : (
                <span className="text-muted-foreground font-semibold">Hidden</span>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
