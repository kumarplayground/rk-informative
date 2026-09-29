"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateContactSettings } from "@/app/actions/settings";
import { Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export function ContactForm({ settings }: { settings: Record<string, string> }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [email, setEmail] = useState(settings.contact_email || "hello@rahulkumar.dev");
  const [whatsapp, setWhatsapp] = useState(settings.contact_whatsapp || "+91 (000) 000-0000");
  const [location, setLocation] = useState(settings.contact_location || "Remote / Global");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const formData = new FormData(e.currentTarget);
    const result = await updateContactSettings(formData);
    
    if (result.success) {
      toast.success("Contact details updated successfully!");
    } else {
      setError(result.error || "Failed to update details");
      toast.error("Failed to update contact details.");
    }
    setLoading(false);
  };

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Public Contact Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-sm text-destructive">{error}</p>}
          
          <div className="space-y-2">
            <Label htmlFor="contact_email">Public Email</Label>
            <Input 
              id="contact_email" 
              name="contact_email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact_whatsapp">WhatsApp Number</Label>
            <Input 
              id="contact_whatsapp" 
              name="contact_whatsapp" 
              type="text" 
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact_location">Location Display Text</Label>
            <Input 
              id="contact_location" 
              name="contact_location" 
              type="text" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required 
            />
          </div>

          <div className="pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Contact Details</>}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
