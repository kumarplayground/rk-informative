"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { updateService } from "@/app/actions/services";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export function ServiceForm({ service, adminPath }: { service: any, adminPath: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await updateService(service.id, formData);
    
    if (result.success) {
      toast.success("Service saved successfully!");
      router.push(`/${adminPath}/services`);
    } else {
      toast.error(result.error || "Failed to save service");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/${adminPath}/services`}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{service.id === 'new' ? 'Add Service' : 'Edit Service'}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Service Title</Label>
                <Input id="title" name="title" defaultValue={service.title} required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL friendly)</Label>
                <Input id="slug" name="slug" defaultValue={service.slug} required />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Service Thumbnail / Image</Label>
              {service.thumbnail && (
                <div className="relative h-48 w-full max-w-sm rounded-md overflow-hidden border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={service.thumbnail} alt="Current thumbnail" className="object-cover w-full h-full" />
                </div>
              )}
              <div className="flex flex-col gap-2 max-w-sm">
                <Label htmlFor="thumbnailFile" className="text-muted-foreground text-sm">Upload Image</Label>
                <Input id="thumbnailFile" name="thumbnailFile" type="file" accept="image/*" />
                <input type="hidden" name="thumbnailUrl" value={service.thumbnail || ""} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Full Description</Label>
              <Textarea id="description" name="description" defaultValue={service.description} rows={5} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">Key Features (comma separated)</Label>
              <Textarea id="features" name="features" defaultValue={service.features} rows={3} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon Name (Optional, e.g. lucide-react name)</Label>
              <Input id="icon" name="icon" defaultValue={service.icon || ""} />
            </div>

            <div className="flex gap-6 pt-4 border-t">
              <div className="flex items-center space-x-2">
                <Checkbox id="published" name="published" defaultChecked={service.published} />
                <Label htmlFor="published">Published (Visible on site)</Label>
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Service</>}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
