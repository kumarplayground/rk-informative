import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail, Phone, Calendar, Building, DollarSign, Target } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const revalidate = 0;

export default async function InquiryDetailsPage({
  params,
}: {
  params: Promise<{ adminPath: string; id: string }>;
}) {
  const resolvedParams = await params;
  const adminPath = resolvedParams.adminPath;
  const id = resolvedParams.id;

  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
  });

  if (!inquiry) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/${adminPath}/inquiries`}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Inquiry Details</h1>
        {inquiry.status === "NEW" && (
          <Badge className="bg-blue-500 ml-auto">New Request</Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Requirements</CardTitle>
              <CardDescription>What the client wants to build</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
                {inquiry.requirement}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Client Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-muted-foreground">Name</p>
                <p className="font-medium">{inquiry.name}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                  <Mail className="h-3 w-3" /> Email
                </p>
                <a href={`mailto:${inquiry.email}`} className="text-primary hover:underline">{inquiry.email}</a>
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                  <Phone className="h-3 w-3" /> Phone
                </p>
                <a href={`tel:${inquiry.phone}`} className="text-primary hover:underline">{inquiry.phone}</a>
              </div>
              {inquiry.company && (
                <div>
                  <p className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                    <Building className="h-3 w-3" /> Company
                  </p>
                  <p>{inquiry.company}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Specs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                  <Target className="h-3 w-3" /> Type
                </p>
                <p className="font-medium">{inquiry.projectType}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                  <DollarSign className="h-3 w-3" /> Budget
                </p>
                <p>{inquiry.budget || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-3 w-3" /> Timeline
                </p>
                <p>{inquiry.timeline || "Flexible"}</p>
              </div>
              <div className="pt-4 border-t text-xs text-muted-foreground">
                Submitted on: {new Date(inquiry.createdAt).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
