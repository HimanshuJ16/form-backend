// app/welcome/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
    const createUserInDb = async () => {
      try {
        await fetch("/api/users", {
          method: "POST",
        });
      } catch (error) {
        console.error("Failed to create user in database:", error);
      } finally {
        // Redirect to the dashboard after attempting to create the user
        router.push("/dashboard");
      }
    };

    createUserInDb();
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Setting up your account, please wait...</p>
    </div>
  );
}