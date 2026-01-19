import ProtectedRoute from "@/components/protectedroute/ProtectedRoute";

export default function cart() {
    return (
      <ProtectedRoute>
        <div>
          <h1>cart</h1>
        </div>
      </ProtectedRoute>
    );
  }