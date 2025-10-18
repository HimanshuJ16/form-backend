-- This file is for reference only
-- Use Prisma migrations instead: npx prisma migrate dev --name init

-- Create forms table
CREATE TABLE IF NOT EXISTS "Form" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "key" TEXT NOT NULL UNIQUE,
  "email" TEXT NOT NULL,
  "description" TEXT,
  "redirectUrl" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create submissions table
CREATE TABLE IF NOT EXISTS "Submission" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "formId" TEXT NOT NULL,
  "data" JSONB NOT NULL,
  "ipAddress" TEXT,
  "userAgent" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Submission_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS "Form_userId_idx" ON "Form"("userId");
CREATE INDEX IF NOT EXISTS "Form_key_idx" ON "Form"("key");
CREATE INDEX IF NOT EXISTS "Submission_formId_idx" ON "Submission"("formId");
CREATE INDEX IF NOT EXISTS "Submission_createdAt_idx" ON "Submission"("createdAt");
