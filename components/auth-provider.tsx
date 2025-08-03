"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "customer" | "admin"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - replace with actual API call
    if (email === "admin@fusionware.com" && password === "admin123") {
      const adminUser = {
        id: "1",
        name: "Admin User",
        email: "admin@fusionware.com",
        role: "admin" as const,
      }
      setUser(adminUser)
      localStorage.setItem("user", JSON.stringify(adminUser))
      return true
    } else if (email === "user@example.com" && password === "user123") {
      const customerUser = {
        id: "2",
        name: "John Doe",
        email: "user@example.com",
        role: "customer" as const,
      }
      setUser(customerUser)
      localStorage.setItem("user", JSON.stringify(customerUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export { AuthContext }
