"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  LayoutDashboard,
  Users,
  ShoppingBag,
  Package,
  Settings,
  Home,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const adminLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Products", href: "/admin/admin-products", icon: Package },
  { label: "Settings", href: "/admin/setting", icon: Settings },
];

function SidebarLink({ link, pathname, onClick }) {
  const Icon = link.icon;
  const isActive = pathname === link.href;

  return (
    <Link
      href={link.href}
      onClick={onClick}
      className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 border-2 ${
        isActive
          ? "text-white bg-black shadow-lg shadow-primary/20 border-primary hover:scale-[1.02]"
          : "border-transparent text-muted-foreground hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.02]"
      }`}
    >
      <Icon
        className={`h-5 w-5 shrink-0 transition-all duration-200 ${
          isActive ? "scale-110 drop-shadow-sm" : "group-hover:scale-110"
        }`}
      />
      <span
        className={`font-semibold transition-all duration-200 whitespace-nowrap ${
          isActive ? "drop-shadow-sm" : "group-hover:translate-x-1"
        }`}
      >
        {link.label}
      </span>
    </Link>
  );
}

function Sidebar({ onClick }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-2">
      {adminLinks.map((link) => (
        <SidebarLink
          key={link.href}
          link={link}
          pathname={pathname}
          onClick={onClick}
        />
      ))}
    </nav>
  );
}

export default function AdminLayout({ children }) {
  return (
    <div className="h-screen flex overflow-hidden bg-linear-to-br from-slate-50 via-white to-blue-50">
      {/* ================= FIXED SIDEBAR ================= */}
      <aside className="hidden md:flex w-72 flex-col border-r border-slate-200/50 bg-white/80 backdrop-blur-xl shadow-xl px-6 py-8">
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-200/50">
          <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center shadow-lg">
            <Home className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              AdminHub
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Control Panel
            </p>
          </div>
        </div>

        {/* Sidebar content (no scroll) */}
        <Sidebar />
      </aside>

      {/* ================= RIGHT SECTION ================= */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-100">
        {/* ================= FIXED HEADER ================= */}
        <header className="shrink-0 h-20 flex items-center gap-4 rounded-2xl border-b border-slate-200/50 bg-white/90 backdrop-blur-xl shadow-sm px-6 mx-3 mt-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden border-slate-200 hover:bg-slate-100"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-80 p-0 bg-white/95 backdrop-blur-xl border-r-slate-200/50 border-r-2"
            >
              <div className="p-8 border-b border-slate-200/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-linear-to-r from-primary to-primary-foreground rounded-2xl flex items-center justify-center shadow-lg">
                    <Home className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                      AdminHub
                    </h2>
                    <p className="text-sm text-slate-500">
                      Control Panel
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
              </div>
              <div className="p-2">
                <Sidebar />
              </div>
            </SheetContent>
          </Sheet>

          <h1 className="text-xl md:text-2xl font-bold bg-linear-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent tracking-tight">
            Admin Dashboard
          </h1>
        </header>

        {/* ================= SCROLLABLE CONTENT ================= */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}


// "use client";

// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import { Menu, LayoutDashboard, Users, ShoppingBag, Package, Settings, Home } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Separator } from "@/components/ui/separator";

// const adminLinks = [
//   { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
//   { label: "Users", href: "/admin/users", icon: Users },
//   { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
//   { label: "Products", href: "/admin/admin-products", icon: Package },
//   { label: "Settings", href: "/admin/setting", icon: Settings },
// ];

// function SidebarLink({ link, pathname, onClick }) {
//   const Icon = link.icon;
//   const isActive = pathname === link.href;

//   return (
//     <Link
//       href={link.href}
//       onClick={onClick}
//       className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 border-2 ${
//         isActive
//           ? " text-white bg-black shadow-lg shadow-primary/20 border-primary hover:from-primary hover:to-primary-foreground hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-100"
//           : "border-transparent hover:border-primary/30 text-muted-foreground hover:bg-linear-to-r hover:from-primary/10 hover:to-primary/5 hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.02]"
//       }`}
//     >
//       <Icon className={`h-5 w-5 shrink-0 transition-all duration-200 ${
//         isActive ? "scale-110 drop-shadow-sm" : "group-hover:scale-110"
//       }`} />
//       <span className={`font-semibold transition-all duration-200 whitespace-nowrap ${
//         isActive ? "drop-shadow-sm" : "group-hover:translate-x-1"
//       }`}>
//         {link.label}
//       </span>
//     </Link>
//   );
// }

// function Sidebar({ onClick }) {
//   const pathname = usePathname();

//   return (
//     <nav className="space-y-2">
//       {adminLinks.map((link) => (
//         <SidebarLink key={link.href} link={link} pathname={pathname} onClick={onClick} />
//       ))}
//     </nav>
//   );
// }

// export default function AdminLayout({ children }) {
//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-white to-blue-50">
//       {/* ================= Enhanced Desktop Sidebar ================= */}
//       <aside className="hidden md:flex w-72 flex-col border-r border-slate-200/50 bg-white/80 backdrop-blur-xl shadow-xl px-6 py-8">
//         <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-200/50">
//           <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center shadow-lg">
//             <Home className="h-6 w-6 text-white drop-shadow-sm" />
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//               AdminHub
//             </h2>
//             <p className="text-xs text-slate-500 font-medium">Control Panel</p>
//           </div>
//         </div>
//         <Sidebar />
//       </aside>

//       {/* ================= Enhanced Main Section ================= */}
//       <div className="flex-1 flex flex-col overflow-hidden p-3 bg-gray-100 ">
//         {/* Modern Topbar */}
//         <header className="h-20 flex items-center gap-4 p-10 rounded-2xl border-b border-slate-200/50 bg-white/90 backdrop-blur-xl shadow-sm px-6">
//           {/* Mobile Sidebar Button */}
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="outline" size="icon" className="md:hidden border-slate-200 hover:bg-slate-100">
//                 <Menu className="h-5 w-5" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="left" className="w-80 p-0 bg-white/95 backdrop-blur-xl border-r-slate-200/50 border-r-2">
//               <div className="p-8 border-b border-slate-200/50">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-foreground rounded-2xl flex items-center justify-center shadow-lg">
//                     <Home className="h-7 w-7 text-white" />
//                   </div>
//                   <div>
//                     <h2 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                       AdminHub
//                     </h2>
//                     <p className="text-sm text-slate-500">Control Panel</p>
//                   </div>
//                 </div>
//                 <Separator className="my-4" />
//               </div>
//               <div className="p-2">
//                 <Sidebar />
//               </div>
//             </SheetContent>
//           </Sheet>

//           <div className="flex-1 flex items-center justify-between">
//             <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent tracking-tight">
//               Admin Dashboard
//             </h1>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 p-6 md:p-8 overflow-auto">{children}</main>
//       </div>
//     </div>
//   );
// }




// "use client";

// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import { Menu } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Separator } from "@/components/ui/separator";

// const adminLinks = [
//   { label: "Dashboard", href: "/admin" },
//   { label: "Users", href: "/admin/users" },
//   { label: "Orders", href: "/admin/orders" },
//   { label: "Products", href: "/admin/admin-products" },
//   { label: "Settings", href: "/admin/setting" },
// ];

// function Sidebar({ onClick }) {
//   const pathname = usePathname();

//   return (
//     <nav className="space-y-1">
//       {adminLinks.map((link) => (
//         <Link
//           key={link.href}
//           href={link.href}
//           onClick={onClick}
//           className={`block rounded-md px-3 py-2 text-sm font-medium transition
//             ${
//               pathname === link.href
//                 ? "bg-primary text-primary-foreground"
//                 : "text-muted-foreground hover:bg-muted"
//             }`}
//         >
//           {link.label}
//         </Link>
//       ))}
//     </nav>
//   );
// }

// export default function AdminLayout({ children }) {
//   return (
//     <div className="min-h-screen flex bg-background">
//       {/* ================= Desktop Sidebar ================= */}
//       <aside className="hidden md:flex w-64 flex-col border-r px-4 py-6">
//         <h2 className="text-lg font-bold mb-6">MyStore</h2>
//         <Sidebar />
//       </aside>

//       {/* ================= Main Section ================= */}
//       <div className="flex-1 flex flex-col p-5 bg-gray-100">
//         {/* Topbar */}
//         <header className="h-14 flex items-center gap-4 border-2 border-gray-200 rounded-2xl bg-background px-4 md:px-6">
//           {/* Mobile Sidebar Button */}
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="ghost" size="icon" className="md:hidden">
//                 <Menu className="h-5 w-5" />
//               </Button>
//             </SheetTrigger>

//             <SheetContent side="left" className="w-64">
//               <h2 className="text-lg font-bold mb-4 ">Admin Panel</h2>
//               <Separator className="mb-4" />
//               <Sidebar />
//             </SheetContent>
//           </Sheet>

//           <h1 className="text-base md:text-lg font-semibold  ">Admin Panel</h1>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 p-4 md:p-6">{children}</main>
//       </div>
//     </div>
//   );
// }


