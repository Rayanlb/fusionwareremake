"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { CustomerSidebar } from "@/components/customer-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Calendar, Shield, Edit, Save, X } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "Digital product enthusiast and tech lover.",
    location: "San Francisco, CA",
    website: "https://example.com",
    phone: "+1 (555) 123-4567",
  })

  const handleSave = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Profile updated!",
      description: "Your profile has been successfully updated.",
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      bio: "Digital product enthusiast and tech lover.",
      location: "San Francisco, CA",
      website: "https://example.com",
      phone: "+1 (555) 123-4567",
    })
    setIsEditing(false)
  }

  return (
    <SidebarProvider>
      <CustomerSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Profile Settings</h1>
              <p className="text-gray-300">Manage your account information and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Overview */}
              <div className="lg:col-span-1">
                <Card className="bg-gray-900/50 border-purple-500/20">
                  <CardHeader className="text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src="/placeholder.svg" alt={user?.name} />
                      <AvatarFallback className="bg-purple-600 text-white text-2xl">
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-white">{user?.name}</CardTitle>
                    <CardDescription className="text-gray-300">{user?.email}</CardDescription>
                    <Badge className="bg-purple-600 mt-2">Premium Customer</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-300">Member since January 2024</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Account Verified</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300">3 Active Licenses</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Account Stats */}
                <Card className="bg-gray-900/50 border-purple-500/20 mt-6">
                  <CardHeader>
                    <CardTitle className="text-white">Account Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Total Purchases</span>
                      <span className="text-white font-semibold">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Total Spent</span>
                      <span className="text-white font-semibold">$459.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Support Tickets</span>
                      <span className="text-white font-semibold">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Account Level</span>
                      <Badge className="bg-gold-600">Gold</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Profile Form */}
              <div className="lg:col-span-2">
                <Card className="bg-gray-900/50 border-purple-500/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white">Personal Information</CardTitle>
                        <CardDescription className="text-gray-300">
                          Update your personal details and contact information
                        </CardDescription>
                      </div>
                      {!isEditing ? (
                        <Button onClick={() => setIsEditing(true)} className="bg-purple-600 hover:bg-purple-700">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Profile
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                            <Save className="w-4 h-4 mr-2" />
                            Save
                          </Button>
                          <Button
                            onClick={handleCancel}
                            variant="outline"
                            className="border-red-500/20 text-red-400 hover:bg-red-400/10 bg-transparent"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                          className="bg-gray-800/50 border-purple-500/20 text-white"
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                            className="bg-gray-800/50 border-purple-500/20 text-white"
                            disabled={!isEditing}
                          />
                          <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-white">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                          className="bg-gray-800/50 border-purple-500/20 text-white"
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-white">
                          Location
                        </Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                          className="bg-gray-800/50 border-purple-500/20 text-white"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website" className="text-white">
                        Website
                      </Label>
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                        className="bg-gray-800/50 border-purple-500/20 text-white"
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-white">
                        Bio
                      </Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                        className="bg-gray-800/50 border-purple-500/20 text-white min-h-[100px]"
                        disabled={!isEditing}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Security Settings */}
                <Card className="bg-gray-900/50 border-purple-500/20 mt-6">
                  <CardHeader>
                    <CardTitle className="text-white">Security Settings</CardTitle>
                    <CardDescription className="text-gray-300">
                      Manage your account security and privacy
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                      <div>
                        <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                        <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                      </div>
                      <Button variant="outline" className="border-purple-500/20 text-purple-400 bg-transparent">
                        Enable 2FA
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                      <div>
                        <h4 className="text-white font-medium">Change Password</h4>
                        <p className="text-gray-400 text-sm">Update your account password</p>
                      </div>
                      <Button variant="outline" className="border-purple-500/20 text-purple-400 bg-transparent">
                        Change Password
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                      <div>
                        <h4 className="text-white font-medium">Login Sessions</h4>
                        <p className="text-gray-400 text-sm">Manage your active login sessions</p>
                      </div>
                      <Button variant="outline" className="border-purple-500/20 text-purple-400 bg-transparent">
                        View Sessions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
