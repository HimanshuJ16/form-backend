import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"
import crypto from "crypto"

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const forms = await prisma.form.findMany({
      where: { userId },
      include: {
        _count: {
          select: { submissions: true },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(forms)
  } catch (error) {
    console.error("Error fetching forms:", error)
    return NextResponse.json({ error: "Failed to fetch forms" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, email, description, redirect_url } = body

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    const key = crypto.randomBytes(16).toString("hex")

    const form = await prisma.form.create({
      data: {
        userId,
        name,
        key,
        email,
        description: description || null,
        redirectUrl: redirect_url || null,
      },
    })

    return NextResponse.json(form, { status: 201 })
  } catch (error) {
    console.error("Error creating form:", error)
    return NextResponse.json({ error: "Failed to create form" }, { status: 500 })
  }
}
