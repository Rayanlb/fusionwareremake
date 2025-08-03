"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"
import { BarChart3, Users, ShoppingCart, MessageSquare, Plus } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSales: 0,
    activeProducts: 0,
    openTickets: 0,
    revenue: 0,
  })

  useEffect(() => {
    // Mock data - replace with actual API calls
    setStats({
      totalUsers: 1247,
      totalSales: 3892,
      activeProducts: 12,
      openTickets: 23,
      revenue: 89750.5,
    })
  }, [])

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800 flex items-center justify-center">
        <Card className="bg-gray-900/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Access Denied</CardTitle>
            <CardDescription className="text-gray-300">You don't have permission to access this page</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <Link href="/">Go Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-300">Manage your platform and monitor performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Users</CardTitle>
              <Users className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Sales</CardTitle>
              <ShoppingCart className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalSales.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Products</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.activeProducts}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Open Tickets</CardTitle>
              <MessageSquare className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.openTickets}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Revenue</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.revenue.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-gray-900/50 border-purple-500/20">
            <TabsTrigger value="products" className="data-[state=active]:bg-purple-600">
              Products
            </TabsTrigger>
            <TabsTrigger value="tickets" className="data-[state=active]:bg-purple-600">
              Support Tickets
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-purple-600">
              Users
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Product Management</h2>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>

            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Products Overview</CardTitle>
                <CardDescription className="text-gray-300">
                  Manage your digital products, pricing, and features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Product management interface would be implemented here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Support Tickets</h2>
              <Badge className="bg-red-600">{stats.openTickets} Open</Badge>
            </div>

            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Ticket Queue</CardTitle>
                <CardDescription className="text-gray-300">
                  Manage customer support requests and inquiries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Ticket management interface would be implemented here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">User Management</h2>
              <Badge className="bg-green-600">{stats.totalUsers} Total Users</Badge>
            </div>

            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">User Overview</CardTitle>
                <CardDescription className="text-gray-300">
                  Manage user accounts, permissions, and activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">User management interface would be implemented here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Analytics & Reports</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Sales Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-purple-500/20 rounded-lg">
                    <p className="text-gray-400">Sales chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-purple-500/20 rounded-lg">
                    <p className="text-gray-400">User growth chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
