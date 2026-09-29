"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  FolderGit2, 
  Layers, 
  Users, 
  MessageSquare, 
  Settings, 
  UserCircle,
  Clock,
  Image as ImageIcon,
  PhoneCall
} from "lucide-react";

export function AdminSidebar({ adminPath }: { adminPath: string }) {
  const pathname = usePathname();

  // Hide sidebar on login page
  if (pathname === `/${adminPath}/login`) {
    return null;
  }

  const routes = [
    { name: "Dashboard", href: `/${adminPath}/dashboard`, icon: LayoutDashboard },
    { name: "Inquiries", href: `/${adminPath}/inquiries`, icon: MessageSquare },
    { name: "Projects", href: `/${adminPath}/projects`, icon: FolderGit2 },
    { name: "Services", href: `/${adminPath}/services`, icon: Layers },
    { name: "About Me", href: `/${adminPath}/about`, icon: UserCircle },
    { name: "Team", href: `/${adminPath}/team`, icon: Users },
    { name: "Timeline", href: `/${adminPath}/timeline`, icon: Clock },
    { name: "Contact Details", href: `/${adminPath}/contact-details`, icon: PhoneCall },
    { name: "Media", href: `/${adminPath}/media`, icon: ImageIcon },
    { name: "Settings", href: `/${adminPath}/settings`, icon: Settings },
  ];

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-background h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b">
        <Link href={`/${adminPath}/dashboard`} className="font-bold text-lg tracking-tight flex items-center gap-2">
          <div className="bg-primary text-primary-foreground p-1 rounded-md">
            RK
          </div>
          Studio Admin
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3">
        <nav className="space-y-1">
          {routes.map((route) => {
            const isActive = pathname === route.href || pathname.startsWith(`${route.href}/`);
            return (
              <Link
                key={route.name}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-muted",
                  isActive ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground"
                )}
              >
                <route.icon className="h-4 w-4" />
                {route.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  );
}
