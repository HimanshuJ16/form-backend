"use client";

import { useState, useEffect, use } from "react"; // Import 'use'
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import {
  Download,
  Trash2,
  ArrowLeft,
  FileIcon,
  ExternalLink,
} from "lucide-react";

interface Submission {
  id: string;
  data: Record<string, any>;
  files?: Record<string, any>;
  createdAt: string;
  ipAddress: string;
}

// Define the expected type for params
interface FormSubmissionsParams {
  id: string;
}

export default function FormSubmissions({
  params,
}: {
  params: FormSubmissionsParams; // Use the defined type
}) {
  // Use React.use() to access the id
  const formId = use(params).id;

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [formName, setFormName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define fetchSubmissions inside useEffect or wrap it in useCallback
    // to include formId in dependency array safely.
    const fetchSubmissions = async () => {
      setLoading(true); // Set loading true when fetching starts
      try {
        // Use the unwrapped formId here
        const response = await fetch(`/api/forms/${formId}/submissions`);
        if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFormName(data.formName);
        setSubmissions(data.submissions);
      } catch (error) {
        console.error("Failed to fetch submissions:", error);
        // Optionally set an error state here
      } finally {
        setLoading(false);
      }
    };

    if (formId) { // Ensure formId is available before fetching
      fetchSubmissions();
    }
  }, [formId]); // Depend on the unwrapped formId

  const deleteSubmission = async (submissionId: string) => {
    if (!confirm("Delete this submission?")) return;

    try {
      await fetch(`/api/submissions/${submissionId}`, { method: "DELETE" });
      setSubmissions((prevSubmissions) =>
        prevSubmissions.filter((s) => s.id !== submissionId)
      );
    } catch (error) {
      console.error("Failed to delete submission:", error);
    }
  };

  const exportToCSV = () => {
    if (submissions.length === 0) return;

    // Get all unique keys from all submissions' data
    const allKeys = submissions.reduce((keys, s) => {
       Object.keys(s.data).forEach(key => keys.add(key));
       return keys;
    }, new Set<string>());
    const headers = Array.from(allKeys);


    const csv = [
      ["Submitted At", "IP Address", ...headers].join(","),
      ...submissions.map((s) =>
        [
          new Date(s.createdAt).toLocaleString(),
          s.ipAddress,
          ...headers.map((h) => {
            const value = s.data[h];
            // Handle file objects specifically
             if (typeof value === "object" && value?.filename) {
               return `"${value.filename} (${(value.size / 1024).toFixed(2)} KB)"`;
             }
            const stringValue =
              typeof value === "string"
                ? value
                : value !== null && value !== undefined
                ? JSON.stringify(value)
                : ""; // Handle null/undefined values
            return `"${stringValue.replace(/"/g, '""')}"`; // Escape double quotes
          }),
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formName || "form"}-submissions.csv`; // Use formName if available
    document.body.appendChild(a); // Append link to body
    a.click();
    document.body.removeChild(a); // Clean up
    window.URL.revokeObjectURL(url); // Free up memory
  };

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

          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold">{formName || "Loading..."}</h1>
              {!loading && ( // Only show count when not loading
                 <p className="text-muted-foreground">
                   {submissions.length} submission
                   {submissions.length !== 1 ? "s" : ""}
                 </p>
              )}
            </div>
            {submissions.length > 0 && !loading && (
              <Button onClick={exportToCSV} className="gap-2">
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading submissions...</p>
            </div>
          ) : submissions.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground font-medium">
                  No submissions yet
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <Card
                  key={submission.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <CardTitle className="text-base">
                          {new Date(submission.createdAt).toLocaleString()}
                        </CardTitle>
                        <CardDescription>IP: {submission.ipAddress}</CardDescription>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteSubmission(submission.id)}
                        className="gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Delete</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(submission.data).map(([key, value]) => (
                        <div
                          key={key}
                          className="border-b pb-3 last:border-b-0"
                        >
                          <p className="text-sm font-medium text-muted-foreground capitalize break-words">
                            {key.replace(/_/g, " ")} {/* Improve key display */}
                          </p>
                          <div className="text-sm mt-1 break-words">
                            {typeof value === "object" && value?.filename ? (
                              <div className="flex items-center gap-2 mt-2 flex-wrap">
                                <FileIcon className="w-4 h-4 flex-shrink-0" />
                                <span className="font-medium">{value.filename}</span>
                                <span className="text-xs text-muted-foreground">
                                  ({(value.size / 1024).toFixed(2)} KB)
                                </span>
                                {value.cloudinaryUrl && (
                                  <a
                                    href={value.cloudinaryUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline flex items-center gap-1 text-xs"
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                    View/Download
                                  </a>
                                )}
                              </div>
                            ) : typeof value === "string" ? (
                               <p>{value}</p>
                            ) : (
                               <pre className="text-xs bg-muted/50 p-2 rounded overflow-x-auto">
                                 {JSON.stringify(value, null, 2)}
                              </pre>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}