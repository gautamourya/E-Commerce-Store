"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Menu, ShoppingCart, User, Settings } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import UserMenu from "./UserMenu";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  const userFromStore = useSelector((state) => state.userReducer.user);
  const name = userFromStore?.name;

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const userMenuRef = useRef(null);

  const isActive = (href) => pathname === href;

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="border-b bg-background">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LEFT — Logo */}
        <Link href="/" className="text-lg font-bold tracking-tight">
          MyStore
        </Link>

        {/* CENTER — MENU LINKS */}
        <div className="hidden md:flex items-center gap-6 mx-auto">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>

          <Link
            href="/product"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/product")
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            Products
          </Link>

          {isAuthenticated && (
            <Link
              href="/createproduct"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/createproduct")
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Create Product
            </Link>
          )}
        </div>

        {/* RIGHT — Cart / User / Login */}
        <div className="hidden md:flex items-center gap-4">

          {/* Cart */}
          {isAuthenticated && (
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5 text-muted-foreground hover:text-primary transition" />
            </Link>
          )}

          {/* User Dropdown */}
          {isAuthenticated && (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="rounded-full p-1 hover:bg-gray-100 transition"
              >
                <User className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </button>

              {userMenuOpen && (
                <UserMenu onClose={() => setUserMenuOpen(false)} />
              )}
            </div>
          )}

          {/* Login Button */}
          {!isAuthenticated && (
            <Button asChild size="sm">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>

        {/* MOBILE NAV */}
        <div className="flex items-center md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-64">
              <SheetHeader className="px-2 py-1 pt-2">
                <SheetTitle className="sr-only">MyStore User Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigation menu
                </SheetDescription>

                {/* User Info */}
                {isAuthenticated && (
                  <div className="flex items-center gap-3 py-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {name || "User"}
                      </p>
                      <p className="text-xs text-gray-500">Welcome back</p>
                    </div>
                  </div>
                )}
              </SheetHeader>

              <div className="flex flex-col gap-3">
                <SheetClose asChild>
                  <Link href="/" className="px-2 py-2">Home</Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href="/product" className="px-2 py-2">Products</Link>
                </SheetClose>

                {isAuthenticated && (
                  <>
                    <SheetClose asChild>
                      <Link href="/createproduct" className="px-2 py-2">
                        Create Product
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link href="/cart" className="px-2 py-2 flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5" />
                        Cart
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link href="/settings" className="px-2 py-2 flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Settings
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link href="/profile" className="px-2 py-2 flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Profile
                      </Link>
                    </SheetClose>
                  </>
                )}

                {!isAuthenticated && (
                  <SheetClose asChild>
                    <Button asChild className="mt-2 ml-2 w-fit px-4 py-2 text-sm">
                      <Link href="/login">Login</Link>
                    </Button>
                  </SheetClose>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
       