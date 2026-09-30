"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { updateTeamMember } from "@/app/actions/team";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TeamForm({ member, adminPath }: { member: any, adminPath: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const formData = new FormData(e.currentTarget);
      const result = await updateTeamMember(member.id, formData);
      
      if (result.success) {
        router.push(`/${adminPath}/team`);
      } else {
        setError(result.error || "Failed to save team member");
        setLoading(false);
      }
    } catch (err: any) {
      console.error(err);
      setError("Network Error: The image might be too large (max 1MB limit).");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/${adminPath}/team`}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{member.id === 'new' ? 'Add Team Member' : 'Edit Team Member'}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Member Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-sm text-destructive">{error}</p>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" defaultValue={member.name} required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="designation">Designation / Role</Label>
                <Input id="designation" name="designation" defaultValue={member.designation} required />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Profile Picture</Label>
              {member.profileImage && (
                <div className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-primary/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={member.profileImage} alt="Current profile" className="object-cover w-full h-full" />
                </div>
              )}
              <div className="flex flex-col gap-2 max-w-sm">
                <Label htmlFor="profileImageFile" className="text-muted-foreground text-sm">Upload New Picture</Label>
                <Input id="profileImageFile" name="profileImageFile" type="file" accept="image/*" />
                <input type="hidden" name="profileImageUrl" value={member.profileImage || ""} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Biography</Label>
              <Textarea id="bio" name="bio" defaultValue={member.bio} rows={4} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Technical Arsenal / Skills (comma separated)</Label>
              <Textarea id="skills" name="skills" defaultValue={member.skills} rows={2} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="linkedIn">LinkedIn URL</Label>
                <Input id="linkedIn" name="linkedIn" type="url" defaultValue={member.linkedIn || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub URL</Label>
                <Input id="github" name="github" type="url" defaultValue={member.github || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="socialUrl">Other Social URL</Label>
                <Input id="socialUrl" name="socialUrl" type="url" defaultValue={member.socialUrl || ""} />
              </div>
            </div>

            <div className="flex gap-6 pt-4 border-t">
              <div className="flex items-center space-x-2">
                <Checkbox id="published" name="published" defaultChecked={member.published} />
                <Label htmlFor="published">Published (Visible on site)</Label>
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Member</>}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
