// components/navbar.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <FileText className="w-5 h-5" />
          FormBackend
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/docs">
            <Button variant="ghost" size="sm">
              Docs
            </Button>
          </Link>
          <SignedIn>
            <Link href="/dashboard">
              <Button size="sm">Dashboard</Button>
            </Link>
            {/* Add afterSignOutUrl="/" here */}
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm">Sign Up</Button>
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}