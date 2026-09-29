"use client"

import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants, Button } from "@/components/ui/button";
import { Menu, LogOut, ExternalLink } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { logout } from "@/app/actions/auth";

export function AdminHeader({ adminPath }: { adminPath: string }) {
  const pathname = usePathname();

  if (pathname === `/${adminPath}/login`) {
    return null;
  }

  const routes = [
    { name: "Dashboard", href: `/${adminPath}/dashboard` },
    { name: "Inquiries", href: `/${adminPath}/inquiries` },
    { name: "Projects", href: `/${adminPath}/projects` },
    { name: "Services", href: `/${adminPath}/services` },
    { name: "About", href: `/${adminPath}/about` },
    { name: "Team", href: `/${adminPath}/team` },
  ];

  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger className={buttonVariants({ variant: "ghost", size: "icon" }) + " md:hidden"}>
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="h-16 flex items-center px-6 border-b">
              <span className="font-bold text-lg">RK Studio Admin</span>
            </div>
            <div className="py-4">
              {routes.map(r => (
                <Link key={r.name} href={r.href} className="block px-6 py-3 hover:bg-muted font-medium">
                  {r.name}
                </Link>
              ))}
              <div className="border-t my-2" />
              <form action={logout}>
                <button type="submit" className="w-full text-left px-6 py-3 hover:bg-muted font-medium text-destructive flex items-center">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </button>
              </form>
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="hidden md:flex font-semibold">
          {pathname.split('/').pop()?.replace('-', ' ').toUpperCase()}
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="outline" size="sm" asChild className="hidden sm:flex">
          <Link href="/" target="_blank">
            View Site <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <ThemeToggle />
        <form action={logout} className="hidden md:block">
          <Button variant="ghost" size="icon" type="submit" title="Logout">
            <LogOut className="h-5 w-5 text-muted-foreground" />
          </Button>
        </form>
      </div>
    </header>
  );
}
