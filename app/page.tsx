import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { ArrowRight, Mail, Upload, Zap, BarChart3 } from "lucide-react"
import { SignedIn, SignedOut } from "@clerk/nextjs"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-20">
          {/* Hero Section */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <p className="text-sm font-medium text-primary">Headless Form Backend</p>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              Collect Form Submissions Without Hassle
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-balance">
              Get a unique endpoint for each form. Receive email notifications instantly. Export data anytime.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <SignedIn>
                <Link href="/dashboard">
                  <Button size="lg" className="gap-2">
                    Go to Dashboard <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </SignedIn>
              <SignedOut>
                <Link href="/sign-up">
                  <Button size="lg" className="gap-2">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </SignedOut>
              <Link href="/docs">
                <Button size="lg" variant="outline">
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            <Card className="border-0 bg-card/50 backdrop-blur">
              <CardHeader>
                <Zap className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Instant Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Create a form and get a unique endpoint in seconds. No configuration needed.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card/50 backdrop-blur">
              <CardHeader>
                <Mail className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Email Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Receive instant email notifications for every form submission with all data.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card/50 backdrop-blur">
              <CardHeader>
                <Upload className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">File Uploads</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Support file uploads with automatic cloud storage and email notifications.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card/50 backdrop-blur">
              <CardHeader>
                <BarChart3 className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Export Data</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Export all submissions as CSV for analysis and record keeping.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Example Section */}
          <div className="max-w-3xl mx-auto mb-20">
            <Card className="border-0 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Example Usage</CardTitle>
                <CardDescription>Use your form endpoint with any HTML form</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm border border-border">
                  {`<form action="https://yourapp.vercel.app/f/YOUR_KEY" 
      method="POST" 
      enctype="multipart/form-data">
  <input type="email" name="email" required>
  <input type="text" name="name" required>
  <input type="file" name="file">
  <button type="submit">Send</button>
</form>`}
                </pre>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-muted-foreground mb-8">
              Create your first form in seconds and start collecting submissions.
            </p>
            <SignedIn>
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  Go to Dashboard <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <Link href="/sign-up">
                <Button size="lg" className="gap-2">
                  Sign Up Now <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </SignedOut>
          </div>
        </div>
      </main>
    </>
  )
}
