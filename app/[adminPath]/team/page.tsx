import { prisma } from "@/lib/db/prisma";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Edit, Plus, Trash2 } from "lucide-react";

export const revalidate = 0;

export default async function AdminTeamPage({ params }: { params: Promise<{ adminPath: string }> }) {
  const resolvedParams = await params;
  const adminPath = resolvedParams.adminPath;
  const team = await prisma.teamMember.findMany({
    orderBy: { displayOrder: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground mt-1">Manage team members.</p>
        </div>
        <Button asChild>
          <Link href={`/${adminPath}/team/new`}>
            <Plus className="mr-2 h-4 w-4" /> Add Member
          </Link>
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {team.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">No team members found.</TableCell>
              </TableRow>
            ) : (
              team.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.designation}</TableCell>
                  <TableCell>
                    {member.published ? <Badge className="bg-green-500">Published</Badge> : <Badge variant="secondary">Draft</Badge>}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/${adminPath}/team/${member.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <form action={async () => {
                        "use server"
                        const { deleteTeamMember } = await import("@/app/actions/team");
                        await deleteTeamMember(member.id)
                      }}>
                        <Button variant="ghost" size="icon" type="submit" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </form>
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
