import { prisma } from "@/lib/db/prisma";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function AdminSettingsPage({ params }: { params: Promise<{ adminPath: string }> }) {
  const resolvedParams = await params;
  const adminPath = resolvedParams.adminPath;
  const settings = await prisma.siteSetting.findMany({
    orderBy: { key: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
          <p className="text-muted-foreground mt-1">Configure global website parameters.</p>
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Setting Key</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {settings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">No settings found in database.</TableCell>
              </TableRow>
            ) : (
              settings.map((setting) => (
                <TableRow key={setting.id}>
                  <TableCell className="font-bold">{setting.key}</TableCell>
                  <TableCell className="font-mono text-sm max-w-[200px] truncate">{setting.value}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{setting.description}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/${adminPath}/settings/${setting.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
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
