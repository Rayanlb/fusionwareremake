"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/hooks/use-auth"
import { Download, Calendar, CreditCard, MessageSquare, User, Settings, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { CustomerSidebar } from "@/components/customer-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

interface Purchase {
  id: string
  productName: string
  duration: string
  purchaseDate: string
  expiryDate: string
  status: "active" | "expired" | "pending"
  downloadUrl: string
  price: number
}

export function CustomerDashboard() {
  const { user } = useAuth()
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [stats, setStats] = useState({
    totalPurchases: 0,
    activeLicenses: 0,
    totalSpent: 0,
    openTickets: 0,
  })

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockPurchases: Purchase[] = [
      {
        id: "1",
        productName: "Game Enhancement Pro",
        duration: "1 Month",
        purchaseDate: "2024-01-01",
        expiryDate: "2024-02-01",
        status: "active",
        downloadUrl: "/downloads/game-enhancement-pro",
        price: 29.99,
      },
      {
        id: "2",
        productName: "Security Shield",
        duration: "6 Months",
        purchaseDate: "2023-12-15",
        expiryDate: "2024-06-15",
        status: "active",
        downloadUrl: "/downloads/security-shield",
        price: 179.99,
      },
      {
        id: "3",
        productName: "Productivity Suite",
        duration: "1 Month",
        purchaseDate: "2023-11-01",
        expiryDate: "2023-12-01",
        status: "expired",
        downloadUrl: "/downloads/productivity-suite",
        price: 49.99,
      },
    ]

    setPurchases(mockPurchases)
    setStats({
      totalPurchases: mockPurchases.length,
      activeLicenses: mockPurchases.filter((p) => p.status === "active").length,
      totalSpent: mockPurchases.reduce((sum, p) => sum + p.price, 0),
      openTickets: 2,
    })
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600"
      case "expired":
        return "bg-red-600"
      case "pending":
        return "bg-yellow-600"
      default:
        return "bg-gray-600"
    }
  }

  const getDaysRemaining = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <SidebarProvider>
      <CustomerSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {user?.name}!</h1>
              <p className="text-gray-300">Manage your purchases and account settings</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Purchases</CardTitle>
                  <CreditCard className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.totalPurchases}</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Active Licenses</CardTitle>
                  <Calendar className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.activeLicenses}</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Spent</CardTitle>
                  <CreditCard className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">${stats.totalSpent.toFixed(2)}</div>
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
            </div>

            {/* Recent Purchases */}
            <Card className="bg-gray-900/50 border-purple-500/20 mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Recent Purchases</CardTitle>
                  <Button asChild variant="outline" className="border-purple-500/20 text-purple-400 bg-transparent">
                    <Link href="/shop">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Browse Products
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {purchases.slice(0, 3).map((purchase) => (
                    <Card key={purchase.id} className="bg-gray-800/50 border-purple-500/20">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-white text-lg">{purchase.productName}</CardTitle>
                          <Badge className={getStatusColor(purchase.status)}>{purchase.status.toUpperCase()}</Badge>
                        </div>
                        <CardDescription className="text-gray-300">Duration: {purchase.duration}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Expires:</span>
                            <span className="text-white">{new Date(purchase.expiryDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Price:</span>
                            <span className="text-white">${purchase.price}</span>
                          </div>
                        </div>

                        {purchase.status === "active" && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Days Remaining:</span>
                              <span className="text-white">{getDaysRemaining(purchase.expiryDate)}</span>
                            </div>
                            <Progress
                              value={Math.max(0, Math.min(100, (getDaysRemaining(purchase.expiryDate) / 30) * 100))}
                              className="h-2"
                            />
                          </div>
                        )}

                        <Button
                          className="w-full bg-purple-600 hover:bg-purple-700"
                          disabled={purchase.status === "expired"}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          {purchase.status === "expired" ? "Expired" : "Download"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-purple-400" />
                    Support
                  </CardTitle>
                  <CardDescription className="text-gray-300">Get help with your products</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                    <Link href="/dashboard/tickets">View Tickets</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <User className="w-5 h-5 mr-2 text-purple-400" />
                    Profile
                  </CardTitle>
                  <CardDescription className="text-gray-300">Manage your account settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                    <Link href="/dashboard/profile">Edit Profile</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-purple-400" />
                    Settings
                  </CardTitle>
                  <CardDescription className="text-gray-300">Configure your preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                    <Link href="/dashboard/settings">Manage Settings</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
