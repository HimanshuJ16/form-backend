"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    redirect_url: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/dashboard")
      } else {
        alert("Failed to create form")
      }
    } catch (error) {
      console.error("Error creating form:", error)
      alert("Error creating form")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Create New Form</CardTitle>
                <CardDescription>Set up a new form to start collecting submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Form Name *</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., Contact Form"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">Submissions will be sent to this email address</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe what this form is for..."
                      className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Redirect URL (Optional)</label>
                    <Input
                      type="url"
                      name="redirect_url"
                      value={formData.redirect_url}
                      onChange={handleChange}
                      placeholder="https://example.com/thank-you"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Users will be redirected here after successful submission
                    </p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" disabled={loading}>
                      {loading ? "Creating..." : "Create Form"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}
