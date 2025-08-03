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
  LayoutDashboard,
  Package,
  MessageSquare,
  Users,
  BarChart3,
  Settings,
  LogOut,
  CreditCard,
  Shield,
  Database,
  Mail,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

const mainMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Product Management",
    url: "/admin/products",
    icon: Package,
  },
  {
    title: "Support Tickets",
    url: "/admin/tickets",
    icon: MessageSquare,
  },
  {
    title: "User Management",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Analytics",
    url: "/admin/analytics",
    icon: BarChart3,
  },
]

const systemMenuItems = [
  {
    title: "Payment Settings",
    url: "/admin/payments",
    icon: CreditCard,
  },
  {
    title: "Security",
    url: "/admin/security",
    icon: Shield,
  },
  {
    title: "Database",
    url: "/admin/database",
    icon: Database,
  },
  {
    title: "Email Templates",
    url: "/admin/email-templates",
    icon: Mail,
  },
  {
    title: "Reports",
    url: "/admin/reports",
    icon: FileText,
  },
  {
    title: "System Settings",
    url: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-purple-500/20">
      <SidebarHeader className="border-b border-purple-500/20 p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg" />
          <div>
            <p className="text-sm font-medium text-white">Fusion Ware</p>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-400">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
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
          <SidebarGroupLabel className="text-purple-400">System Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemMenuItems.map((item) => (
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
      </SidebarContent>

      <SidebarFooter className="border-t border-purple-500/20 p-4">
        <div className="space-y-2">
          <div className="text-sm text-white font-medium">{user?.name}</div>
          <div className="text-xs text-gray-400">{user?.email}</div>
          <div className="text-xs text-purple-400">Administrator</div>
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
