"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Home, FileText, MessageSquare, ShoppingBag, Calendar, User, Settings, LogOut } from "lucide-react"

export default function AppSidebar() {
  const pathname = usePathname()
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const menuItems = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Health Reports", icon: FileText, path: "/reports" },
    { name: "AI Chat", icon: MessageSquare, path: "/chat" },
    { name: "Products", icon: ShoppingBag, path: "/products" },
    { name: "Consultations", icon: Calendar, path: "/consultations" },
  ]

  return (
    <Sidebar variant="floating" className="glassmorphism border-none">
      <SidebarHeader className="flex flex-col items-center justify-center p-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 neon-glow mb-2">
          <span className="text-white font-bold text-xl">A</span>
        </div>
        <h1 className="text-xl font-bold text-white">Ayurveda X</h1>
        <p className="text-xs text-gray-400">AI Health & Wellness</p>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.path}
                tooltip={item.name}
                className="transition-all duration-200 hover:bg-green-500/20 data-[active=true]:bg-green-500/20"
              >
                <Link href={item.path} className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="relative">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 hover:bg-green-500/20"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <User className="h-5 w-5" />
            <span>John Doe</span>
          </Button>

          {userMenuOpen && (
            <div className="absolute bottom-full left-0 w-full mb-2 bg-card rounded-lg shadow-lg p-2 border border-border">
              <Button variant="ghost" className="w-full justify-start gap-3 mb-1">
                <Settings className="h-4 w-4" />
                <span className="text-sm">Settings</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 text-red-500 hover:text-red-400">
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </Button>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

