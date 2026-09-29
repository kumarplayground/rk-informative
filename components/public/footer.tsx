import Link from "next/link";
import { Mail, MessageSquare } from "lucide-react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="border-t bg-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="font-bold text-xl tracking-tight">
              RAHUL<span className="text-primary">KUMAR</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Software Development & AI Solutions. Building custom solutions tailored to your business needs.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/services#web" className="hover:text-foreground transition-colors">Web Development</Link></li>
              <li><Link href="/services#mobile" className="hover:text-foreground transition-colors">Mobile Apps</Link></li>
              <li><Link href="/services#desktop" className="hover:text-foreground transition-colors">Desktop Software</Link></li>
              <li><Link href="/services#ai" className="hover:text-foreground transition-colors">AI & Automation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/projects" className="hover:text-foreground transition-colors">Projects</Link></li>
              <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/team" className="hover:text-foreground transition-colors">Team</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-4 mb-4">
              <Link href="https://github.com" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                <FaGithub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://linkedin.com" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                <FaLinkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://youtube.com" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                <FaYoutube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:contact@example.com" className="hover:text-foreground transition-colors">hello@rahulkumar.dev</a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <a href="#" className="hover:text-foreground transition-colors">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} RK Informative. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
