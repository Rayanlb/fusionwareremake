"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, User } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Status", href: "/status" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg" />
            <span className="text-xl font-bold text-white">Fusion Ware</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="text-gray-300 hover:text-purple-400 transition-colors">
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white">
                    <User className="w-4 h-4 mr-2" />
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-900 border-purple-500/20">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="ghost" className="text-white">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-gray-900 border-purple-500/20">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-purple-400 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {user ? (
                  <>
                    <Link href="/dashboard" className="text-gray-300 hover:text-purple-400">
                      Dashboard
                    </Link>
                    <Button onClick={logout} variant="ghost" className="justify-start">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="text-gray-300 hover:text-purple-400">
                      Login
                    </Link>
                    <Link href="/register" className="text-gray-300 hover:text-purple-400">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
