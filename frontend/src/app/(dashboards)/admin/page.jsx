"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your store
        </p>
      </div>

      {/* ================= Stats Cards ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value="1,240" />
        <StatCard title="Orders" value="320" />
        <StatCard title="Products" value="85" />
        <StatCard title="Revenue" value="₹1,20,000" />
      </div>

      {/* ================= Recent Activity ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm">
            <li>✔ New user registered</li>
            <li>✔ Order #1234 placed</li>
            <li>✔ Product added</li>
            <li>✔ Payment received</li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm">
            <li>✔ New user registered</li>
            <li>✔ Order #1234 placed</li>
            <li>✔ Product added</li>
            <li>✔ Payment received</li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm">
            <li>✔ New user registered</li>
            <li>✔ Order #1234 placed</li>
            <li>✔ Product added</li>
            <li>✔ Payment received</li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm">
            <li>✔ New user registered</li>
            <li>✔ Order #1234 placed</li>
            <li>✔ Product added</li>
            <li>✔ Payment received</li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm">
            <li>✔ New user registered</li>
            <li>✔ Order #1234 placed</li>
            <li>✔ Product added</li>
            <li>✔ Payment received</li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm">
            <li>✔ New user registered</li>
            <li>✔ Order #1234 placed</li>
            <li>✔ Product added</li>
            <li>✔ Payment received</li>
          </ul>
        </CardContent>
      </Card>
    </div>

    
  );
}

/* 🔁 Reusable Stat Card */
function StatCard({ title, value }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}



// "use client";

// export default function AdminDashboardPage() {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">
//         Dashboard Overview
//       </h1>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard title="Total Users" value="1,240" />
//         <StatCard title="Total Orders" value="320" />
//         <StatCard title="Products" value="85" />
//         <StatCard title="Revenue" value="₹1,20,000" />
//       </div>

//       {/* Recent Activity */}
//       <div className="mt-10 bg-white rounded-lg shadow p-6">
//         <h2 className="text-lg font-semibold mb-4">
//           Recent Activity
//         </h2>

//         <ul className="space-y-3 text-gray-700">
//           <li>✔ New user registered</li>
//           <li>✔ Order #1234 placed</li>
//           <li>✔ Product “Shoes” added</li>
//           <li>✔ Payment received</li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// /* 🔁 Reusable Card Component */
// function StatCard({ title, value }) {
//   return (
//     <div className="bg-white p-5 rounded-lg shadow">
//       <p className="text-gray-500 text-sm">{title}</p>
//       <p className="text-2xl font-bold text-gray-800 mt-1">
//         {value}
//       </p>
//     </div>
//   );
// }
