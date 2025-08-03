"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    })

    setFormData({
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-gray-300 text-lg">Get in touch with our team for support, questions, or feedback</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900/50 border-purple-500/20 mb-6">
              <CardHeader>
                <CardTitle className="text-white">Get in Touch</CardTitle>
                <CardDescription className="text-gray-300">
                  We're here to help you with any questions or concerns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-gray-300">support@fusionware.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-white font-medium">Phone</p>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-white font-medium">Address</p>
                    <p className="text-gray-300">
                      123 Tech Street
                      <br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-white font-medium">Business Hours</p>
                    <p className="text-gray-300">
                      Mon-Fri: 9AM-6PM PST
                      <br />
                      Sat-Sun: 10AM-4PM PST
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Quick Links */}
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Quick Help</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-purple-400 hover:text-white hover:bg-purple-600/20"
                >
                  How to download products?
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-purple-400 hover:text-white hover:bg-purple-600/20"
                >
                  Refund policy
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-purple-400 hover:text-white hover:bg-purple-600/20"
                >
                  Technical support
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-purple-400 hover:text-white hover:bg-purple-600/20"
                >
                  Account issues
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Send us a Message</CardTitle>
                <CardDescription className="text-gray-300">
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="bg-gray-800/50 border-purple-500/20 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="bg-gray-800/50 border-purple-500/20 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-white">
                        Category *
                      </Label>
                      <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                        <SelectTrigger className="bg-gray-800/50 border-purple-500/20 text-white">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-purple-500/20">
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="billing">Billing & Payments</SelectItem>
                          <SelectItem value="refund">Refund Request</SelectItem>
                          <SelectItem value="bug">Bug Report</SelectItem>
                          <SelectItem value="feature">Feature Request</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-white">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleChange("subject", e.target.value)}
                        className="bg-gray-800/50 border-purple-500/20 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className="bg-gray-800/50 border-purple-500/20 text-white min-h-[120px]"
                      placeholder="Please describe your inquiry in detail..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    size="lg"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-900/50 border-purple-500/20">
            <CardHeader className="text-center">
              <CardTitle className="text-white">Response Time</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-2xl font-bold text-purple-400 mb-2">&lt; 24 hours</p>
              <p className="text-gray-300">Average response time for all inquiries</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-purple-500/20">
            <CardHeader className="text-center">
              <CardTitle className="text-white">Support Rating</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-2xl font-bold text-purple-400 mb-2">4.9/5</p>
              <p className="text-gray-300">Customer satisfaction rating</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-purple-500/20">
            <CardHeader className="text-center">
              <CardTitle className="text-white">Live Chat</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-2xl font-bold text-purple-400 mb-2">Available</p>
              <p className="text-gray-300">For logged-in customers</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
