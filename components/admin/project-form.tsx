"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { updateProject } from "@/app/actions/projects";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProjectForm({ project, adminPath }: { project: any, adminPath: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const formData = new FormData(e.currentTarget);
      const result = await updateProject(project.id, formData);
      
      if (result.success) {
        router.push(`/${adminPath}/projects`);
      } else {
        setError(result.error || "Failed to update project");
        setLoading(false);
      }
    } catch (err: any) {
      console.error(err);
      setError("Network Error: The image might be too large (max 5MB limit).");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/${adminPath}/projects`}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-sm text-destructive">{error}</p>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={project.title} required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" name="slug" defaultValue={project.slug} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Input id="shortDescription" name="shortDescription" defaultValue={project.shortDescription} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Full Description</Label>
              <Textarea id="description" name="description" defaultValue={project.description} rows={5} required />
            </div>

            <div className="space-y-4">
              <Label>Project Thumbnail Image</Label>
              {project.thumbnail && (
                <div className="relative h-48 w-full max-w-sm rounded-md overflow-hidden border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.thumbnail} alt="Current thumbnail" className="object-cover w-full h-full" />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <Label htmlFor="thumbnailFile" className="text-muted-foreground text-sm">Upload New Image (Overrides existing)</Label>
                <Input id="thumbnailFile" name="thumbnailFile" type="file" accept="image/*" />
                <input type="hidden" name="thumbnailUrl" value={project.thumbnail || ""} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" defaultValue={project.category} required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clientType">Client Type</Label>
                <Input id="clientType" name="clientType" defaultValue={project.clientType} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Input id="status" name="status" defaultValue={project.status} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="technologies">Technologies (comma separated)</Label>
              <Input id="technologies" name="technologies" defaultValue={project.technologies} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">Features (comma separated)</Label>
              <Textarea id="features" name="features" defaultValue={project.features} rows={3} required />
            </div>

            <div className="flex gap-6 pt-4 border-t">
              <div className="flex items-center space-x-2">
                <Checkbox id="published" name="published" defaultChecked={project.published} />
                <Label htmlFor="published">Published (Visible on site)</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="featured" name="featured" defaultChecked={project.featured} />
                <Label htmlFor="featured">Featured (Show on homepage)</Label>
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Project</>}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
