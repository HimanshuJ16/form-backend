"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Plus, Eye, Trash2, Copy, MessageSquare } from "lucide-react"

interface Form {
  id: string
  name: string
  key: string
  email: string
  createdAt: string
  _count?: { submissions: number }
}

export default function Dashboard() {
  const [forms, setForms] = useState<Form[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    fetchForms()
  }, [])

  const fetchForms = async () => {
    try {
      const response = await fetch("/api/forms")
      const data = await response.json()
      setForms(data)
    } catch (error) {
      console.error("Failed to fetch forms:", error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (key: string) => {
    const endpoint = `${window.location.origin}/f/${key}`
    navigator.clipboard.writeText(endpoint)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const deleteForm = async (id: string) => {
    if (!confirm("Are you sure you want to delete this form?")) return

    try {
      await fetch(`/api/forms/${id}`, { method: "DELETE" })
      setForms(forms.filter((f) => f.id !== id))
    } catch (error) {
      console.error("Failed to delete form:", error)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Forms Dashboard</h1>
              <p className="text-muted-foreground">Manage your forms and view submissions</p>
            </div>
            <Link href="/dashboard/create">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Form
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading forms...</p>
            </div>
          ) : forms.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground mb-4 font-medium">No forms yet</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Create your first form to start collecting submissions
                </p>
                <Link href="/dashboard/create">
                  <Button>Create your first form</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {forms.map((form) => (
                <Card key={form.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1">{form.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {form._count?.submissions || 0} submission{form._count?.submissions !== 1 ? "s" : ""}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <code className="bg-muted px-3 py-1 rounded text-sm font-mono">/f/{form.key}</code>
                          <button
                            onClick={() => copyToClipboard(form.key)}
                            className="text-xs text-primary hover:underline flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            {copied === form.key ? "Copied!" : "Copy"}
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Link href={`/dashboard/form/${form.id}`}>
                          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                            <Eye className="w-4 h-4" />
                            <span className="hidden sm:inline">View</span>
                          </Button>
                        </Link>
                        <Button variant="destructive" size="sm" onClick={() => deleteForm(form.id)} className="gap-2">
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
