import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const form = await prisma.form.findUnique({
      where: { id: params.id },
      include: {
        submissions: {
          orderBy: { createdAt: "desc" },
        },
      },
    })

    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 })
    }

    if (form.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    return NextResponse.json({
      formName: form.name,
      submissions: form.submissions,
    })
  } catch (error) {
    console.error("Error fetching submissions:", error)
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 })
  }
}
