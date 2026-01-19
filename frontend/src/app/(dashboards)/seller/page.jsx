"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import {
  Package,
  ShoppingCart,
  Wallet,
  Clock,
} from "lucide-react";

export default function SellerDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Seller Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your store performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Products"
          value="24"
          icon={Package}
        />
        <StatCard
          title="Total Orders"
          value="120"
          icon={ShoppingCart}
        />
        <StatCard
          title="Pending Orders"
          value="15"
          icon={Clock}
        />
        <StatCard
          title="Total Earnings"
          value="₹45,000"
          icon={Wallet}
        />
      </div>

      {/* Recent Info Section */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Quick Info</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            You have <span className="font-semibold">15 pending orders</span>.
            Make sure to ship them on time to keep your rating high.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

/* 🔁 Reusable Stat Card */
function StatCard({ title, value, icon: Icon }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
