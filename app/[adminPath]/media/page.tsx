import { prisma } from "@/lib/db/prisma";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Upload, Trash2 } from "lucide-react";

export const revalidate = 0;

export default async function AdminMediaPage({ params }: { params: Promise<{ adminPath: string }> }) {
  const resolvedParams = await params;
  const adminPath = resolvedParams.adminPath;
  const media = await prisma.media.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground mt-1">Manage uploaded images and files.</p>
        </div>
        <Button asChild>
          <Link href={`/${adminPath}/media/upload`}>
            <Upload className="mr-2 h-4 w-4" /> Upload File
          </Link>
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Preview</TableHead>
              <TableHead>File URL</TableHead>
              <TableHead>Size (bytes)</TableHead>
              <TableHead>Date Uploaded</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {media.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">No media files found.</TableCell>
              </TableRow>
            ) : (
              media.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={file.url} alt={file.alt || "media"} className="w-12 h-12 object-cover rounded" />
                  </TableCell>
                  <TableCell className="font-medium text-xs break-all max-w-[200px]">{file.url}</TableCell>
                  <TableCell>{file.size}</TableCell>
                  <TableCell className="whitespace-nowrap">{new Date(file.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
