import { Button } from "@/components/ui/button";
import { Hammer, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminComingSoonPage({
  params,
}: {
  params: Promise<{ adminPath: string; catchAll: string[] }>;
}) {
  const resolvedParams = await params;
  const adminPath = resolvedParams.adminPath;
  const pathParts = resolvedParams.catchAll;
  
  // Create a readable module name from the URL path
  const moduleName = pathParts
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" / ");

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <Card className="max-w-md w-full shadow-lg text-center border-primary/20">
        <CardHeader className="pt-8">
          <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Hammer className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Under Construction</CardTitle>
          <CardDescription className="text-base mt-2">
            The <strong className="text-foreground">{moduleName}</strong> module is currently being built.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-8">
          <p className="text-muted-foreground text-sm mb-8">
            This section of the admin panel is scheduled for the next development sprint. Please check back later.
          </p>
          <Button asChild className="w-full">
            <Link href={`/${adminPath}/dashboard`}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Return to Dashboard
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
