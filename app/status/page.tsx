"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertCircle, Clock, RefreshCw } from "lucide-react"

interface ServiceStatus {
  id: string
  name: string
  status: "operational" | "degraded" | "outage" | "maintenance"
  uptime: number
  lastChecked: string
  description: string
}

interface Incident {
  id: string
  title: string
  status: "investigating" | "identified" | "monitoring" | "resolved"
  severity: "low" | "medium" | "high" | "critical"
  createdAt: string
  updatedAt: string
  description: string
  updates: {
    timestamp: string
    message: string
    status: string
  }[]
}

export default function StatusPage() {
  const [services, setServices] = useState<ServiceStatus[]>([])
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [lastUpdated, setLastUpdated] = useState<string>("")

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockServices: ServiceStatus[] = [
      {
        id: "1",
        name: "Authentication Service",
        status: "operational",
        uptime: 99.9,
        lastChecked: "2024-01-15T10:30:00Z",
        description: "User login and registration system",
      },
      {
        id: "2",
        name: "Payment Processing",
        status: "operational",
        uptime: 99.8,
        lastChecked: "2024-01-15T10:30:00Z",
        description: "Payment gateway and transaction processing",
      },
      {
        id: "3",
        name: "Product Delivery",
        status: "degraded",
        uptime: 98.5,
        lastChecked: "2024-01-15T10:30:00Z",
        description: "Digital product download and delivery system",
      },
      {
        id: "4",
        name: "Support System",
        status: "operational",
        uptime: 99.7,
        lastChecked: "2024-01-15T10:30:00Z",
        description: "Customer support and ticketing system",
      },
      {
        id: "5",
        name: "API Services",
        status: "operational",
        uptime: 99.9,
        lastChecked: "2024-01-15T10:30:00Z",
        description: "Core API and backend services",
      },
    ]

    const mockIncidents: Incident[] = [
      {
        id: "1",
        title: "Intermittent delays in product delivery",
        status: "monitoring",
        severity: "medium",
        createdAt: "2024-01-15T08:00:00Z",
        updatedAt: "2024-01-15T10:15:00Z",
        description: "Some users may experience delays when downloading products",
        updates: [
          {
            timestamp: "2024-01-15T10:15:00Z",
            message: "We have implemented a fix and are monitoring the situation",
            status: "monitoring",
          },
          {
            timestamp: "2024-01-15T09:30:00Z",
            message: "Issue identified with delivery server load balancer",
            status: "identified",
          },
          {
            timestamp: "2024-01-15T08:00:00Z",
            message: "We are investigating reports of slow download speeds",
            status: "investigating",
          },
        ],
      },
    ]

    setServices(mockServices)
    setIncidents(mockIncidents)
    setLastUpdated(new Date().toISOString())
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "degraded":
        return <AlertCircle className="w-5 h-5 text-yellow-400" />
      case "outage":
        return <XCircle className="w-5 h-5 text-red-400" />
      case "maintenance":
        return <Clock className="w-5 h-5 text-blue-400" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-600"
      case "degraded":
        return "bg-yellow-600"
      case "outage":
        return "bg-red-600"
      case "maintenance":
        return "bg-blue-600"
      default:
        return "bg-gray-600"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-blue-600"
      case "medium":
        return "bg-yellow-600"
      case "high":
        return "bg-orange-600"
      case "critical":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const overallStatus = services.every((s) => s.status === "operational")
    ? "All Systems Operational"
    : services.some((s) => s.status === "outage")
      ? "System Outage"
      : "Partial System Outage"

  const overallStatusColor = services.every((s) => s.status === "operational") ? "text-green-400" : "text-yellow-400"

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">System Status</h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div
              className={`w-3 h-3 rounded-full ${services.every((s) => s.status === "operational") ? "bg-green-400" : "bg-yellow-400"}`}
            />
            <span className={`text-xl font-semibold ${overallStatusColor}`}>{overallStatus}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span>Last updated: {new Date(lastUpdated).toLocaleString()}</span>
            <Button variant="ghost" size="sm" onClick={() => setLastUpdated(new Date().toISOString())}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Current Incidents */}
        {incidents.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Current Incidents</h2>
            <div className="space-y-4">
              {incidents.map((incident) => (
                <Card key={incident.id} className="bg-gray-900/50 border-purple-500/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">{incident.title}</CardTitle>
                      <div className="flex gap-2">
                        <Badge className={getSeverityColor(incident.severity)}>{incident.severity.toUpperCase()}</Badge>
                        <Badge variant="outline" className="border-purple-500/20 text-purple-400">
                          {incident.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-gray-300">{incident.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {incident.updates.map((update, index) => (
                        <div key={index} className="border-l-2 border-purple-500/20 pl-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-gray-400">{new Date(update.timestamp).toLocaleString()}</span>
                            <Badge variant="outline" className="border-purple-500/20 text-purple-400 text-xs">
                              {update.status}
                            </Badge>
                          </div>
                          <p className="text-gray-300 text-sm">{update.message}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Services Status */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <Card key={service.id} className="bg-gray-900/50 border-purple-500/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">{service.name}</CardTitle>
                    {getStatusIcon(service.status)}
                  </div>
                  <CardDescription className="text-gray-300">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Status:</span>
                      <Badge className={getStatusColor(service.status)}>{service.status.toUpperCase()}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Uptime:</span>
                      <span className="text-white font-semibold">{service.uptime}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Last Check:</span>
                      <span className="text-white text-sm">{new Date(service.lastChecked).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Uptime Chart Placeholder */}
        <Card className="bg-gray-900/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">90-Day Uptime History</CardTitle>
            <CardDescription className="text-gray-300">Historical uptime data for all services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-purple-500/20 rounded-lg">
              <p className="text-gray-400">Uptime chart would be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
