// frontend/src/components/protectedroute/ProtectedRoute.jsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Wait for auth check
    if (!user) {
      router.push("/login"); // Redirect if not authenticated
    }
  }, [user, loading, router]);

  // Show loading while checking auth
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg text-gray-600">Verifying access...</p>
    </div>
  );

  // Show content only if user is authenticated
  if (!user) return null;

  return children;
}  