import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Code2, Mail, Upload, FileJson, CheckCircle2 } from "lucide-react"

export default function Docs() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl font-bold mb-2">Documentation</h1>
              <p className="text-muted-foreground">Learn how to use the form backend service</p>
            </div>

            <div className="space-y-8">
              {/* Getting Started */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Getting Started
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">1. Create a Form</h3>
                    <p className="text-muted-foreground text-sm">
                      Go to the dashboard and click "New Form". Fill in your form details and email address where you
                      want to receive submissions.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">2. Get Your Endpoint</h3>
                    <p className="text-muted-foreground text-sm">
                      Each form gets a unique endpoint:{" "}
                      <code className="bg-muted px-2 py-1 rounded text-xs font-mono">/f/YOUR_KEY</code>
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">3. Add to Your Form</h3>
                    <p className="text-muted-foreground text-sm">
                      Use the endpoint as your form's action attribute and start collecting submissions.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* HTML Form Example */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-primary" />
                    HTML Form Example
                  </CardTitle>
                  <CardDescription>Basic HTML form that submits to your endpoint</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm border border-border font-mono">
                    {`<form action="https://yourapp.vercel.app/f/YOUR_KEY" 
      method="POST" 
      enctype="multipart/form-data">
  <input type="text" 
         name="name" 
         placeholder="Your Name" 
         required>
  <input type="email" 
         name="email" 
         placeholder="Your Email" 
         required>
  <textarea name="message" 
            placeholder="Your Message" 
            required></textarea>
  <input type="file" name="attachment">
  <button type="submit">Send</button>
</form>`}
                  </pre>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle>Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Email Notifications</h3>
                      <p className="text-muted-foreground text-sm">
                        Receive instant email notifications for every submission with all form data included.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Upload className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">File Uploads</h3>
                      <p className="text-muted-foreground text-sm">
                        Support file uploads with automatic tracking of file names and sizes.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <FileJson className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Flexible Data</h3>
                      <p className="text-muted-foreground text-sm">
                        Support any form fields - text, email, file, checkbox, select, and more.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* API Reference */}
              <Card>
                <CardHeader>
                  <CardTitle>API Reference</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Submit Form</h3>
                    <div className="bg-muted/50 p-3 rounded text-sm mb-2 border border-border font-mono">
                      <p>
                        <span className="font-semibold text-primary">POST</span> /f/[key]
                      </p>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Submit form data. Supports multipart/form-data for file uploads. Returns 200 on success.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4 pt-4">
                <Link href="/dashboard">
                  <Button>Go to Dashboard</Button>
                </Link>
                <Link href="/">
                  <Button variant="outline">Back to Home</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
