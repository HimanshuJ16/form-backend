import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const form = await prisma.form.findUnique({
      where: { id: params.id },
    })

    if (!form || form.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    await prisma.form.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting form:", error)
    return NextResponse.json({ error: "Failed to delete form" }, { status: 500 })
  }
}
