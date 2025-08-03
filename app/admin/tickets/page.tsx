"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AdminSidebar } from "@/components/admin-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { useToast } from "@/hooks/use-toast"
import { MessageSquare, Clock, CheckCircle, AlertCircle, Search, Send, User } from "lucide-react"

interface Ticket {
  id: string
  subject: string
  description: string
  status: "open" | "in-progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  category: string
  customerName: string
  customerEmail: string
  assignedTo?: string
  createdAt: string
  lastUpdate: string
  messages: {
    id: string
    sender: "customer" | "support"
    senderName: string
    message: string
    timestamp: string
  }[]
}

export default function AdminTicketsPage() {
  const { toast } = useToast()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [replyMessage, setReplyMessage] = useState("")

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
        customerName: "John Doe",
        customerEmail: "john@example.com",
        assignedTo: "Support Agent 1",
        createdAt: "2024-01-10T10:00:00Z",
        lastUpdate: "2024-01-12T14:30:00Z",
        messages: [
          {
            id: "1",
            sender: "customer",
            senderName: "John Doe",
            message: "I purchased Game Enhancement Pro but the download link is not working. Please help.",
            timestamp: "2024-01-10T10:00:00Z",
          },
          {
            id: "2",
            sender: "support",
            senderName: "Support Agent 1",
            message:
              "Hi John! I'm sorry to hear about the issue. I've checked your account and can see the purchase. Let me generate a new download link for you.",
            timestamp: "2024-01-10T11:15:00Z",
          },
          {
            id: "3",
            sender: "support",
            senderName: "Support Agent 1",
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
        customerName: "Jane Smith",
        customerEmail: "jane@example.com",
        createdAt: "2024-01-08T15:30:00Z",
        lastUpdate: "2024-01-08T15:30:00Z",
        messages: [
          {
            id: "1",
            sender: "customer",
            senderName: "Jane Smith",
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
        customerName: "Mike Johnson",
        customerEmail: "mike@example.com",
        assignedTo: "Support Agent 2",
        createdAt: "2024-01-05T09:00:00Z",
        lastUpdate: "2024-01-06T16:45:00Z",
        messages: [
          {
            id: "1",
            sender: "customer",
            senderName: "Mike Johnson",
            message: "I would like to request a refund for my recent purchase. The product doesn't meet my needs.",
            timestamp: "2024-01-05T09:00:00Z",
          },
          {
            id: "2",
            sender: "support",
            senderName: "Support Agent 2",
            message:
              "I understand your concern. I've processed your refund request. You should see the refund in your account within 3-5 business days.",
            timestamp: "2024-01-06T16:45:00Z",
          },
        ],
      },
      {
        id: "TK-004",
        subject: "Installation issues",
        description: "Having trouble installing the security software on Windows 11.",
        status: "open",
        priority: "urgent",
        category: "technical",
        customerName: "Sarah Wilson",
        customerEmail: "sarah@example.com",
        createdAt: "2024-01-15T08:00:00Z",
        lastUpdate: "2024-01-15T08:00:00Z",
        messages: [
          {
            id: "1",
            sender: "customer",
            senderName: "Sarah Wilson",
            message:
              "I'm having trouble installing the security software on my Windows 11 machine. It keeps showing an error message.",
            timestamp: "2024-01-15T08:00:00Z",
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

  const handleStatusChange = async (ticketId: string, newStatus: string) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: newStatus as any, lastUpdate: new Date().toISOString() } : ticket,
      ),
    )

    if (selectedTicket?.id === ticketId) {
      setSelectedTicket((prev) => (prev ? { ...prev, status: newStatus as any } : null))
    }

    toast({
      title: "Status updated!",
      description: `Ticket ${ticketId} status changed to ${newStatus}.`,
    })
  }

  const handleSendReply = async () => {
    if (!selectedTicket || !replyMessage.trim()) return

    const newMessage = {
      id: String(selectedTicket.messages.length + 1),
      sender: "support" as const,
      senderName: "Admin User",
      message: replyMessage,
      timestamp: new Date().toISOString(),
    }

    const updatedTicket = {
      ...selectedTicket,
      messages: [...selectedTicket.messages, newMessage],
      lastUpdate: new Date().toISOString(),
      status: selectedTicket.status === "open" ? ("in-progress" as const) : selectedTicket.status,
    }

    setTickets((prev) => prev.map((ticket) => (ticket.id === selectedTicket.id ? updatedTicket : ticket)))
    setSelectedTicket(updatedTicket)
    setReplyMessage("")

    toast({
      title: "Reply sent!",
      description: "Your response has been sent to the customer.",
    })
  }

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    inProgress: tickets.filter((t) => t.status === "in-progress").length,
    urgent: tickets.filter((t) => t.priority === "urgent").length,
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Support Tickets</h1>
              <p className="text-gray-300">Manage customer support requests and inquiries</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Tickets</CardTitle>
                  <MessageSquare className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.total}</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Open Tickets</CardTitle>
                  <AlertCircle className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.open}</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">In Progress</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.inProgress}</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Urgent</CardTitle>
                  <AlertCircle className="h-4 w-4 text-red-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.urgent}</div>
                </CardContent>
              </Card>
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
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full md:w-48 bg-gray-900/50 border-purple-500/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-purple-500/20">
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
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
                            From: {ticket.customerName} ({ticket.customerEmail})
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
                        {ticket.assignedTo && <span className="text-gray-400">Assigned: {ticket.assignedTo}</span>}
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
                    <p className="text-gray-500">Try adjusting your search filters</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Ticket Detail Modal */}
            {selectedTicket && (
              <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
                <DialogContent className="bg-gray-900 border-purple-500/20 text-white max-w-5xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <div className="flex items-center justify-between">
                      <DialogTitle className="text-xl">
                        {selectedTicket.id} - {selectedTicket.subject}
                      </DialogTitle>
                      <div className="flex gap-2">
                        <Select
                          value={selectedTicket.status}
                          onValueChange={(value) => handleStatusChange(selectedTicket.id, value)}
                        >
                          <SelectTrigger className="w-32 bg-gray-800/50 border-purple-500/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-purple-500/20">
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                        <Badge className={getPriorityColor(selectedTicket.priority)}>
                          {selectedTicket.priority.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </DialogHeader>

                  <div className="space-y-6">
                    {/* Customer Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-800/30 rounded-lg">
                      <div>
                        <p className="text-gray-400 text-sm">Customer</p>
                        <p className="text-white">{selectedTicket.customerName}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Email</p>
                        <p className="text-white">{selectedTicket.customerEmail}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Category</p>
                        <p className="text-white capitalize">{selectedTicket.category.replace("-", " ")}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Assigned To</p>
                        <p className="text-white">{selectedTicket.assignedTo || "Unassigned"}</p>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Conversation</h3>
                      <div className="max-h-96 overflow-y-auto space-y-4">
                        {selectedTicket.messages.map((message) => (
                          <div
                            key={message.id}
                            className={`p-4 rounded-lg ${
                              message.sender === "customer"
                                ? "bg-blue-600/20 border-l-4 border-blue-500"
                                : "bg-green-600/20 border-l-4 border-green-500"
                            }`}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span className="font-medium text-white">{message.senderName}</span>
                                <Badge variant="outline" className="border-purple-500/20 text-purple-400 text-xs">
                                  {message.sender}
                                </Badge>
                              </div>
                              <span className="text-gray-400 text-sm">
                                {new Date(message.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-gray-300">{message.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Reply Section */}
                    {selectedTicket.status !== "closed" && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Send Reply</h3>
                        <Textarea
                          value={replyMessage}
                          onChange={(e) => setReplyMessage(e.target.value)}
                          placeholder="Type your response here..."
                          className="bg-gray-800/50 border-purple-500/20 min-h-[120px]"
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            onClick={handleSendReply}
                            disabled={!replyMessage.trim()}
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Send Reply
                          </Button>
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
