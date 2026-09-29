import { prisma } from "@/lib/db/prisma";
import { ContactForm } from "@/components/admin/contact-form";

export const revalidate = 0;

export default async function AdminContactDetailsPage({ params }: { params: Promise<{ adminPath: string }> }) {
  const settingsRows = await prisma.siteSetting.findMany({
    where: {
      key: {
        in: ["contact_email", "contact_whatsapp", "contact_location"]
      }
    }
  });

  // Convert array to object mapping
  const settings: Record<string, string> = {};
  settingsRows.forEach(row => {
    settings[row.key] = row.value;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contact Details</h1>
        <p className="text-muted-foreground mt-1">Manage the contact information displayed on your public website.</p>
      </div>

      <ContactForm settings={settings} />
    </div>
  );
}
