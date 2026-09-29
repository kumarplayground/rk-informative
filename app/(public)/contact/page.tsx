import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageSquare, MapPin, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import { prisma } from "@/lib/db/prisma";

export const metadata: Metadata = {
  title: "Contact | RK Informative",
  description: "Get in touch for software development and AI solutions.",
};

export const revalidate = 0;

export default async function ContactPage() {
  const settingsRows = await prisma.siteSetting.findMany({
    where: {
      key: {
        in: ["contact_email", "contact_whatsapp", "contact_location"]
      }
    }
  });

  const settings: Record<string, string> = {};
  settingsRows.forEach(row => {
    settings[row.key] = row.value;
  });

  const email = settings.contact_email || "hello@rahulkumar.dev";
  const whatsapp = settings.contact_whatsapp || "+91 (000) 000-0000";
  const location = settings.contact_location || "Remote / Global";

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mb-16 text-center mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          Get in <span className="text-primary">Touch</span>
        </h1>
        <p className="text-lg text-muted-foreground text-balance">
          Have a general question or want to discuss a potential partnership? Reach out using the details below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold mb-2">Email</h3>
            <p className="text-muted-foreground text-sm mb-4">For general inquiries</p>
            <a href={`mailto:${email}`} className="text-primary font-medium hover:underline">
              {email}
            </a>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold mb-2">WhatsApp</h3>
            <p className="text-muted-foreground text-sm mb-4">For quick communication</p>
            <a href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-primary font-medium hover:underline">
              {whatsapp}
            </a>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold mb-2">Location</h3>
            <p className="text-muted-foreground text-sm mb-4">Available Worldwide</p>
            <span className="font-medium text-foreground">
              {location}
            </span>
          </CardContent>
        </Card>
      </div>

      <div className="text-center max-w-2xl mx-auto p-8 bg-muted/30 rounded-2xl border">
        <h2 className="text-2xl font-bold mb-4">Have a specific project in mind?</h2>
        <p className="text-muted-foreground mb-8 text-balance">
          If you have a clear requirement for a software project, please use the project inquiry form to provide details so I can better understand your needs.
        </p>
        <Button size="lg" asChild>
          <Link href="/start-project">
            Fill Project Inquiry Form <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
