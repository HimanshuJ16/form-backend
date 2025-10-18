// app/api/users/route.ts
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if the user already exists in the database
  const existingUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (existingUser) {
    // User already exists, so just return the user data
    return NextResponse.json(existingUser);
  }

  // Create a new user in the database
  const newUser = await prisma.user.create({
    data: {
      id: user.id,
      email: user.emailAddresses[0].emailAddress,
      name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
    },
  });

  return NextResponse.json(newUser);
}