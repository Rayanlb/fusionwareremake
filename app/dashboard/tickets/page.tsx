"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CustomerSidebar } from "@/components/customer-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { useToast } from "@/hooks/use-toast"
import { Plus, MessageSquare, Clock, CheckCircle, AlertCircle, Search } from "lucide-react"

interface Ticket {
  id: string
  subject: string
  description: string
  status: "open" | "in-progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  category: string
  createdAt: string
  lastUpdate: string
  messages: {
    id: string
    sender: "customer" | "support"
    message: string
    timestamp: string
  }[]
}

export default function TicketsPage() {
  const { toast } = useToast()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [newTicket, setNewTicket] = useState({
    subject: "",
    description: "",
    category: "",
    priority: "medium",
  })

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockTickets: Ticket[] = [
      {
        id: "TK-001",
        subject: "Download link not working",
        description: "I purchased Game Enhancement Pro but the download link is not working. Please help.",
        status: "in-progress",
        priority: "high",
        category: "technical",
        createdAt: "2024-01-10T10:00:00Z",
        lastUpdate: "2024-01-12T14:30:00Z",
        messages: [
          {
            id: "1",
            sender: "customer",
            message: "I purchased Game Enhancement Pro but the download link is not working. Please help.",
            timestamp: "2024-01-10T10:00:00Z",
          },
          {
            id: "2",
            sender: "support",
            message:
              "Hi! I'm sorry to hear about the issue. I've checked your account and can see the purchase. Let me generate a new download link for you.",
            timestamp: "2024-01-10T11:15:00Z",
          },
          {
            id: "3",
            sender: "support",
            message:
              "I've sent a new download link to your email address. Please check your inbox and spam folder. The link will be valid for 48 hours.",
            timestamp: "2024-01-12T14:30:00Z",
          },
        ],
      },
      {
        id: "TK-002",
        subject: "Feature request for new tool",
        description: "Would it be possible to add a new feature to the productivity suite?",
        status: "open",
        priority: "medium",
        category: "feature-request",
        createdAt: "2024-01-08T15:30:00Z",
        lastUpdate: "2024-01-08T15:30:00Z",
        messages: [
          {
            id: "1",
            sender: "customer",
            message:
              "Would it be possible to add a new feature to the productivity suite? I would love to see integration with calendar apps.",
            timestamp: "2024-01-08T15:30:00Z",
          },
        ],
      },
      {
        id: "TK-003",
        subject: "Refund request",
        description: "I would like to request a refund for my recent purchase.",
        status: "resolved",
        priority: "medium",
        category: "billing",
        createdAt: "2024-01-05T09:00:00Z",
        lastUpdate: "2024-01-06T16:45:00Z",
        messages: [
          {
            id: "1",
            sender: "customer",
            message: "I would like to request a refund for my recent purchase. The product doesn't meet my needs.",
            timestamp: "2024-01-05T09:00:00Z",
          },
          {
            id: "2",
            sender: "support",
            message:
              "I understand your concern. I've processed your refund request. You should see the refund in your account within 3-5 business days.",
            timestamp: "2024-01-06T16:45:00Z",
          },
        ],
      },
    ]
    setTickets(mockTickets)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="w-4 h-4" />
      case "in-progress":
        return <Clock className="w-4 h-4" />
      case "resolved":
        return <CheckCircle className="w-4 h-4" />
      case "closed":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-600"
      case "in-progress":
        return "bg-yellow-600"
      case "resolved":
        return "bg-green-600"
      case "closed":
        return "bg-gray-600"
      default:
        return "bg-gray-600"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-600"
      case "high":
        return "bg-orange-600"
      case "medium":
        return "bg-yellow-600"
      case "low":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  const handleCreateTicket = async () => {
    if (!newTicket.subject || !newTicket.description || !newTicket.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const ticket: Ticket = {
      id: `TK-${String(tickets.length + 1).padStart(3, "0")}`,
      subject: newTicket.subject,
      description: newTicket.description,
      status: "open",
      priority: newTicket.priority as any,
      category: newTicket.category,
      createdAt: new Date().toISOString(),
      lastUpdate: new Date().toISOString(),
      messages: [
        {
          id: "1",
          sender: "customer",
          message: newTicket.description,
          timestamp: new Date().toISOString(),
        },
      ],
    }

    setTickets((prev) => [ticket, ...prev])
    setNewTicket({ subject: "", description: "", category: "", priority: "medium" })
    setIsCreateDialogOpen(false)

    toast({
      title: "Ticket created!",
      description: `Your support ticket ${ticket.id} has been created successfully.`,
    })
  }

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <SidebarProvider>
      <CustomerSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Support Tickets</h1>
                <p className="text-gray-300">Manage your support requests and get help</p>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Ticket
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-purple-500/20 text-white max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Support Ticket</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={newTicket.category}
                          onValueChange={(value) => setNewTicket((prev) => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger className="bg-gray-800/50 border-purple-500/20">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-purple-500/20">
                            <SelectItem value="technical">Technical Support</SelectItem>
                            <SelectItem value="billing">Billing & Payments</SelectItem>
                            <SelectItem value="feature-request">Feature Request</SelectItem>
                            <SelectItem value="bug-report">Bug Report</SelectItem>
                            <SelectItem value="general">General Inquiry</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                          value={newTicket.priority}
                          onValueChange={(value) => setNewTicket((prev) => ({ ...prev, priority: value }))}
                        >
                          <SelectTrigger className="bg-gray-800/50 border-purple-500/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-purple-500/20">
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={newTicket.subject}
                        onChange={(e) => setNewTicket((prev) => ({ ...prev, subject: e.target.value }))}
                        className="bg-gray-800/50 border-purple-500/20"
                        placeholder="Brief description of your issue"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={newTicket.description}
                        onChange={(e) => setNewTicket((prev) => ({ ...prev, description: e.target.value }))}
                        className="bg-gray-800/50 border-purple-500/20 min-h-[120px]"
                        placeholder="Please provide detailed information about your issue..."
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsCreateDialogOpen(false)}
                        className="border-purple-500/20 text-purple-400 bg-transparent"
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleCreateTicket} className="bg-purple-600 hover:bg-purple-700">
                        Create Ticket
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-900/50 border-purple-500/20 text-white"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48 bg-gray-900/50 border-purple-500/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-purple-500/20">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tickets List */}
            <div className="space-y-4">
              {filteredTickets.map((ticket) => (
                <Card
                  key={ticket.id}
                  className="bg-gray-900/50 border-purple-500/20 hover:border-purple-500/40 transition-colors cursor-pointer"
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(ticket.status)}
                        <div>
                          <CardTitle className="text-white">
                            {ticket.id} - {ticket.subject}
                          </CardTitle>
                          <CardDescription className="text-gray-300">
                            {ticket.description.length > 100
                              ? `${ticket.description.substring(0, 100)}...`
                              : ticket.description}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority.toUpperCase()}</Badge>
                        <Badge className={getStatusColor(ticket.status)}>{ticket.status.toUpperCase()}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex gap-4">
                        <span className="text-gray-400">
                          Created: {new Date(ticket.createdAt).toLocaleDateString()}
                        </span>
                        <span className="text-gray-400">
                          Updated: {new Date(ticket.lastUpdate).toLocaleDateString()}
                        </span>
                        <span className="text-gray-400">Category: {ticket.category}</span>
                      </div>
                      <span className="text-purple-400">
                        {ticket.messages.length} message{ticket.messages.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredTickets.length === 0 && (
                <Card className="bg-gray-900/50 border-purple-500/20">
                  <CardContent className="text-center py-12">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">No tickets found</p>
                    <p className="text-gray-500">Try adjusting your search or create a new ticket</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Ticket Detail Modal */}
            {selectedTicket && (
              <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
                <DialogContent className="bg-gray-900 border-purple-500/20 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <div className="flex items-center justify-between">
                      <DialogTitle className="text-xl">
                        {selectedTicket.id} - {selectedTicket.subject}
                      </DialogTitle>
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(selectedTicket.priority)}>
                          {selectedTicket.priority.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(selectedTicket.status)}>
                          {selectedTicket.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </DialogHeader>

                  <div className="space-y-6">
                    {/* Ticket Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-800/30 rounded-lg">
                      <div>
                        <p className="text-gray-400 text-sm">Created</p>
                        <p className="text-white">{new Date(selectedTicket.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Last Update</p>
                        <p className="text-white">{new Date(selectedTicket.lastUpdate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Category</p>
                        <p className="text-white capitalize">{selectedTicket.category.replace("-", " ")}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Messages</p>
                        <p className="text-white">{selectedTicket.messages.length}</p>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Conversation</h3>
                      {selectedTicket.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`p-4 rounded-lg ${
                            message.sender === "customer"
                              ? "bg-purple-600/20 border-l-4 border-purple-500"
                              : "bg-gray-800/50 border-l-4 border-green-500"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-white">
                              {message.sender === "customer" ? "You" : "Support Team"}
                            </span>
                            <span className="text-gray-400 text-sm">
                              {new Date(message.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-gray-300">{message.message}</p>
                        </div>
                      ))}
                    </div>

                    {/* Reply Section */}
                    {selectedTicket.status !== "closed" && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Add Reply</h3>
                        <Textarea
                          placeholder="Type your message here..."
                          className="bg-gray-800/50 border-purple-500/20 min-h-[100px]"
                        />
                        <div className="flex justify-end">
                          <Button className="bg-purple-600 hover:bg-purple-700">Send Reply</Button>
                        </div>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
