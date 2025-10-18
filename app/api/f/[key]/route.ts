import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { sendSubmissionEmail } from "@/lib/email"
import { uploadToCloudinary } from "@/lib/cloudinary"

export async function POST(request: NextRequest, { params }: { params: { key: string } }) {
  try {
    const { key } = params

    const form = await prisma.form.findUnique({
      where: { key },
    })

    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 })
    }

    console.log("Form found:", form)

    // Parse form data
    const formData = await request.formData()
    const data: Record<string, any> = {}
    const files: Record<string, any> = {}

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        // Upload file to Cloudinary
        try {
          const uploadResult = await uploadToCloudinary(value)
          files[key] = uploadResult
          data[key] = {
            filename: value.name,
            size: value.size,
            type: value.type,
            cloudinaryUrl: (uploadResult as any).secure_url,
          }
        } catch (uploadError) {
          console.error(`Failed to upload file ${key}:`, uploadError)
          data[key] = {
            filename: value.name,
            size: value.size,
            type: value.type,
            error: "Upload failed",
          }
        }
      } else {
        data[key] = value
      }
    }

    await prisma.submission.create({
      data: {
        formId: form.id,
        data,
        files: Object.keys(files).length > 0 ? files : undefined,
        ipAddress: request.headers.get("x-forwarded-for") || "unknown",
        userAgent: request.headers.get("user-agent") || "unknown",
      },
    })

    // Send email notification
    try {
      await sendSubmissionEmail(form.email, form.name, data, files)
    } catch (emailError) {
      console.error("Failed to send email:", emailError)
      // Don't fail the submission if email fails
    }

    // Redirect if specified
    if (form.redirectUrl) {
      return NextResponse.redirect(form.redirectUrl)
    }

    return NextResponse.json({ success: true, message: "Submission received" }, { status: 200 })
  } catch (error) {
    console.error("Form submission error:", error)
    return NextResponse.json({ error: "Failed to process submission" }, { status: 500 })
  }
}
