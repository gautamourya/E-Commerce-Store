"use client";
import Navbar from "@/components/navbar/Nav";
import ReduxProvider from "@/components/ReduxProvider";
import "../style/globals.css";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
