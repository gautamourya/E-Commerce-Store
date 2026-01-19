// "use client";

// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import {
//   LayoutDashboard,
//   Package,
//   PlusCircle,
//   ShoppingCart,
//   Wallet,
//   Settings,
// } from "lucide-react";

// const sellerLinks = [
//   {
//     label: "Dashboard",
//     href: "/seller",
//     icon: LayoutDashboard,
//   },
//   {
//     label: "My Products",
//     href: "/seller/product",
//     icon: Package,
//   },
//   {
//     label: "Add Product",
//     href: "/seller/createproduct",
//     icon: PlusCircle,
//   },
//   {
//     label: "Orders",
//     href: "/seller/orders",
//     icon: ShoppingCart,
//   },
//   {
//     label: "Earnings",
//     href: "/seller/earning",
//     icon: Wallet,
//   },
//   {
//     label: "Settings",
//     href: "/seller/settings",
//     icon: Settings,
//   },
// ];

// export default function SellerLayout({ children }) {
//   const pathname = usePathname();

//   return (
//     <div className="min-h-screen flex bg-muted">
//       {/* Sidebar */}
//       <aside className="w-64 hidden md:flex flex-col border-r bg-background px-4 py-6">
//         <h2 className="text-lg font-bold mb-6">Seller Dashboard</h2>

//         <nav className="space-y-1">
//           {sellerLinks.map((link) => {
//             const Icon = link.icon;
//             const active = pathname === link.href;

//             return (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition
//                   ${
//                     active
//                       ? "bg-primary text-primary-foreground"
//                       : "text-muted-foreground hover:bg-muted"
//                   }`}
//               >
//                 <Icon className="h-4 w-4" />
//                 {link.label}
//               </Link>
//             );
//           })}
//         </nav>
//       </aside>

//       {/* Right Content */}
//       <main className="flex-1 p-4 sm:p-6 lg:p-8">
//         {children}
//       </main>
//     </div>
//   );
// }


"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu } from "lucide-react";

import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingCart,
  Wallet,
  Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

/* ================= Seller Sidebar Links ================= */
const sellerLinks = [
  {
    label: "Dashboard",
    href: "/seller",
    icon: LayoutDashboard,
  },
  {
    label: "My Products",
    href: "/seller/product",
    icon: Package,
  },
  {
    label: "Add Product",
    href: "/seller/createproduct",
    icon: PlusCircle,
  },
  {
    label: "Orders",
    href: "/seller/orders",
    icon: ShoppingCart,
  },
  {
    label: "Earnings",
    href: "/seller/earnings",
    icon: Wallet,
  },
  {
    label: "Settings",
    href: "/seller/settings",
    icon: Settings,
  },
];

function Sidebar({ onClick }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {sellerLinks.map((link) => {
        const Icon = link.icon;
        const active = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClick}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition
              ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
          >
            <Icon className="h-4 w-4" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function SellerLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-background">
      {/* ================= Desktop Sidebar ================= */}
      <aside className="hidden md:flex w-64 flex-col border-r px-4 py-6">
        <h2 className="text-lg font-bold mb-6">Seller Panel</h2>
        <Sidebar />
      </aside>

      {/* ================= Main Section ================= */}
      <div className="flex-1 flex flex-col p-5 bg-gray-100">
        {/* Topbar */}
        <header className="h-14 flex items-center gap-4 border-2 border-gray-200 rounded-2xl bg-background px-4 md:px-6">
          {/* Mobile Sidebar Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-64">
              <h2 className="text-lg font-bold mb-4">Seller Panel</h2>
              <Separator className="mb-4" />
              <Sidebar />
            </SheetContent>
          </Sheet>

          <h1 className="text-base md:text-lg font-semibold">
            Seller Dashboard
          </h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
