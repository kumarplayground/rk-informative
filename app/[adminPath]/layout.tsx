import { notFound } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ adminPath: string }>;
}) {
  const resolvedParams = await params;
  const configuredAdminPath = process.env.ADMIN_PATH || 'secure-panel-x7k29m';
  
  if (resolvedParams.adminPath !== configuredAdminPath) {
    notFound();
  }

  // Also do not apply layout to the login page
  // Wait, layout applies to everything under [adminPath]. We will check the pathname in the client, but Next.js layouts don't have access to pathname easily without headers(). 
  // Let's create a Client Component wrapper if we want to hide sidebar on login.
  // Actually, I can just use a separate route group for login if needed, but since it's under [adminPath], they share the layout.
  // We can pass `children` as is.

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar is a client component that can hide itself on the login route */}
      <AdminSidebar adminPath={resolvedParams.adminPath} />
      
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <AdminHeader adminPath={resolvedParams.adminPath} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
