"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/authContext";
import { Loader2 } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { isAuth, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuth) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }
  }, [isAuth, isLoading, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="text-blue-600 font-medium">Loading...</p>
      </div>
    </div>
  );
}