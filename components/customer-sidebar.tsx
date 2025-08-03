"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/use-auth"
import {
  Home,
  ShoppingCart,
  Download,
  MessageSquare,
  User,
  Settings,
  LogOut,
  CreditCard,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "My Purchases",
    url: "/dashboard/purchases",
    icon: Download,
  },
  {
    title: "Support Tickets",
    url: "/dashboard/tickets",
    icon: MessageSquare,
  },
  {
    title: "Live Chat",
    url: "/dashboard/chat",
    icon: MessageCircle,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

const quickActions = [
  {
    title: "Browse Shop",
    url: "/shop",
    icon: ShoppingCart,
  },
  {
    title: "Payment Methods",
    url: "/dashboard/payment-methods",
    icon: CreditCard,
  },
]

export function CustomerSidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-purple-500/20">
      <SidebarHeader className="border-b border-purple-500/20 p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg" />
          <div>
            <p className="text-sm font-medium text-white">Fusion Ware</p>
            <p className="text-xs text-gray-400">Customer Portal</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-400">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-400">Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickActions.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-purple-500/20 p-4">
        <div className="space-y-2">
          <div className="text-sm text-white font-medium">{user?.name}</div>
          <div className="text-xs text-gray-400">{user?.email}</div>
          <Button
            onClick={logout}
            variant="ghost"
            size="sm"
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
