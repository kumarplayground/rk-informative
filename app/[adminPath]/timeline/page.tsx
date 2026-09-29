import { prisma } from "@/lib/db/prisma";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Edit, Plus, Trash2 } from "lucide-react";

export const revalidate = 0;

export default async function AdminTimelinePage({ params }: { params: Promise<{ adminPath: string }> }) {
  const resolvedParams = await params;
  const adminPath = resolvedParams.adminPath;
  const timeline = await prisma.timelineEntry.findMany({
    orderBy: { displayOrder: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Timeline</h1>
          <p className="text-muted-foreground mt-1">Manage your experience & history.</p>
        </div>
        <Button asChild>
          <Link href={`/${adminPath}/timeline/new`}>
            <Plus className="mr-2 h-4 w-4" /> Add Entry
          </Link>
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Period</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {timeline.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">No timeline entries found.</TableCell>
              </TableRow>
            ) : (
              timeline.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.period}</TableCell>
                  <TableCell>{entry.title}</TableCell>
                  <TableCell>{entry.company}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/${adminPath}/timeline/${entry.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
