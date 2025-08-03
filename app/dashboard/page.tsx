"use client"

import { useAuth } from "@/hooks/use-auth"
import { CustomerDashboard } from "@/components/customer-dashboard"
import { AdminDashboard } from "@/components/admin-dashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800 flex items-center justify-center">
        <Card className="bg-gray-900/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Access Denied</CardTitle>
            <CardDescription className="text-gray-300">Please log in to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <Link href="/login">Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return user.role === "admin" ? <AdminDashboard /> : <CustomerDashboard />
}
