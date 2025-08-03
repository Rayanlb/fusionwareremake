"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, LogIn } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        toast({
          title: "Login successful!",
          description: "Welcome back to Fusion Ware.",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800 flex items-center justify-center py-8 px-4">
      <Card className="w-full max-w-md bg-gray-900/50 border-purple-500/20">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mx-auto mb-4" />
          <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
          <CardDescription className="text-gray-300">Sign in to your Fusion Ware account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800/50 border-purple-500/20 text-white"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800/50 border-purple-500/20 text-white pr-10"
                  placeholder="Enter your password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700">
              {isLoading ? (
                "Signing in..."
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link href="/register" className="text-purple-400 hover:text-purple-300">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-4 p-4 bg-gray-800/30 rounded-lg">
            <p className="text-xs text-gray-400 mb-2">Demo Credentials:</p>
            <p className="text-xs text-gray-300">Customer: user@example.com / user123</p>
            <p className="text-xs text-gray-300">Admin: admin@fusionware.com / admin123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
