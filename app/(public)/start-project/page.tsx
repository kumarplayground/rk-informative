"use client"

import { useActionState } from "react"
import { submitInquiry } from "@/app/actions/inquiry"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Loader2 } from "lucide-react"
import Link from "next/link"

const initialState = {
  success: false,
  message: "",
  errors: {} as {
    name?: string[];
    email?: string[];
    phone?: string[];
    projectType?: string[];
    requirement?: string[];
  }
}

export default function StartProjectPage() {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState)
  const formErrors = state?.errors as any

  if (state.success) {
    return (
      <div className="container mx-auto px-4 py-24 md:py-32 flex justify-center">
        <Card className="w-full max-w-lg text-center border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Project Inquiry Received</CardTitle>
            <CardDescription className="text-base">
              {state.message}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="mt-4">
              <Link href="/">Return to Homepage</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Start Your <span className="text-primary">Project</span>
        </h1>
        <p className="text-lg text-muted-foreground text-balance mx-auto max-w-2xl">
          Fill out the form below to discuss your project requirements. I'll review your details and get back to you within 24 hours.
        </p>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardContent className="pt-6">
          <form action={formAction} className="space-y-8">
            {state.message && !state.success && (
              <div className="bg-destructive/10 text-destructive text-sm p-4 rounded-md font-medium">
                {state.message}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" name="name" placeholder="John Doe" required />
                {formErrors?.name && <p className="text-xs text-destructive">{formErrors.name[0]}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" name="email" type="email" placeholder="john@company.com" required />
                {formErrors?.email && <p className="text-xs text-destructive">{formErrors.email[0]}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone / WhatsApp *</Label>
                <Input id="phone" name="phone" placeholder="+1 (555) 000-0000" required />
                {formErrors?.phone && <p className="text-xs text-destructive">{formErrors.phone[0]}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company / Organization</Label>
                <Input id="company" name="company" placeholder="Company Name" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="projectType">Project Type *</Label>
                <Select name="projectType" required defaultValue="Web Application">
                  <SelectTrigger id="projectType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Web Application">Web Application</SelectItem>
                    <SelectItem value="Mobile App">Mobile App</SelectItem>
                    <SelectItem value="Desktop Software">Desktop Software</SelectItem>
                    <SelectItem value="ERP">ERP</SelectItem>
                    <SelectItem value="AI Chatbot">AI Chatbot</SelectItem>
                    <SelectItem value="AI Automation">AI Automation</SelectItem>
                    <SelectItem value="API / Backend">API / Backend</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {formErrors?.projectType && <p className="text-xs text-destructive">{formErrors.projectType[0]}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Estimated Budget</Label>
                <Select name="budget" defaultValue="Not sure yet">
                  <SelectTrigger id="budget">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="₹10,000 – ₹25,000">₹10,000 – ₹25,000</SelectItem>
                    <SelectItem value="₹25,000 – ₹50,000">₹25,000 – ₹50,000</SelectItem>
                    <SelectItem value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000</SelectItem>
                    <SelectItem value="₹1,00,000+">₹1,00,000+</SelectItem>
                    <SelectItem value="Not sure yet">Not sure yet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline">Expected Timeline</Label>
                <Select name="timeline" defaultValue="Flexible">
                  <SelectTrigger id="timeline">
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ASAP (< 1 month)">ASAP (&lt; 1 month)</SelectItem>
                    <SelectItem value="1-3 months">1-3 months</SelectItem>
                    <SelectItem value="3-6 months">3-6 months</SelectItem>
                    <SelectItem value="6+ months">6+ months</SelectItem>
                    <SelectItem value="Flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirement">Project Requirements *</Label>
              <Textarea 
                id="requirement" 
                name="requirement" 
                placeholder="Please describe your project, goals, and any specific features you need..."
                className="min-h-[150px]"
                required 
              />
              {formErrors?.requirement && <p className="text-xs text-destructive">{formErrors.requirement[0]}</p>}
            </div>

            <Button type="submit" size="lg" className="w-full md:w-auto" disabled={pending}>
              {pending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Inquiry"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
