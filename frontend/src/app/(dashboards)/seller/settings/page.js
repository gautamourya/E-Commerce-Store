import ProtectedRoute from "@/components/protectedroute/ProtectedRoute";

export default function settings() {
    return (
      <ProtectedRoute>
        <div>
          <h1>setting</h1>
        </div>
      </ProtectedRoute>
    );
  }
   