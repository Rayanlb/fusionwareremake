"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AdminSidebar } from "@/components/admin-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { BarChart3, Users, ShoppingCart, MessageSquare, DollarSign, TrendingUp } from "lucide-react"

export function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSales: 0,
    activeProducts: 0,
    openTickets: 0,
    revenue: 0,
    monthlyGrowth: 0,
  })

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: "sale", message: "New purchase: Game Enhancement Pro", time: "2 minutes ago" },
    { id: 2, type: "user", message: "New user registration: john@example.com", time: "5 minutes ago" },
    { id: 3, type: "ticket", message: "Support ticket #1234 created", time: "10 minutes ago" },
    { id: 4, type: "sale", message: "New purchase: Security Shield", time: "15 minutes ago" },
  ])

  useEffect(() => {
    // Mock data - replace with actual API calls
    setStats({
      totalUsers: 1247,
      totalSales: 3892,
      activeProducts: 12,
      openTickets: 23,
      revenue: 89750.5,
      monthlyGrowth: 12.5,
    })
  }, [])

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-gray-300">Manage your platform and monitor performance</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-green-400">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Sales</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.totalSales.toLocaleString()}</div>
                  <p className="text-xs text-green-400">+8% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Active Products</CardTitle>
                  <BarChart3 className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.activeProducts}</div>
                  <p className="text-xs text-blue-400">2 new this month</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Open Tickets</CardTitle>
                  <MessageSquare className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.openTickets}</div>
                  <p className="text-xs text-yellow-400">5 urgent</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">${stats.revenue.toLocaleString()}</div>
                  <p className="text-xs text-green-400">+15% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Growth</CardTitle>
                  <TrendingUp className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.monthlyGrowth}%</div>
                  <p className="text-xs text-green-400">Monthly growth rate</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                  <CardDescription className="text-gray-300">Latest platform activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full" />
                        <div className="flex-1">
                          <p className="text-white text-sm">{activity.message}</p>
                          <p className="text-gray-400 text-xs">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">System Overview</CardTitle>
                  <CardDescription className="text-gray-300">Current system status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Server Status</span>
                      <Badge className="bg-green-600">Online</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Database</span>
                      <Badge className="bg-green-600">Connected</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Payment Gateway</span>
                      <Badge className="bg-green-600">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Email Service</span>
                      <Badge className="bg-green-600">Running</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Backup Status</span>
                      <Badge className="bg-blue-600">Scheduled</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Placeholder */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Sales Analytics</CardTitle>
                  <CardDescription className="text-gray-300">Revenue trends over time</CardDescription>
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
                  <CardDescription className="text-gray-300">User registration trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-purple-500/20 rounded-lg">
                    <p className="text-gray-400">User growth chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
