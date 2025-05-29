"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Satellite,
  Cloud,
  TrendingUp,
  Sprout,
  BarChart3,
  Settings,
  User,
  Menu,
  Bell,
  Brain,
  Activity,
  LogOut,
} from "lucide-react"
import { UserProvider, useUser } from "@/lib/user-context"
import { signOut } from "@/lib/auth"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Field Monitoring", href: "/dashboard/field-monitoring", icon: Satellite },
  { name: "Weather", href: "/dashboard/weather", icon: Cloud },
  { name: "Market", href: "/dashboard/market", icon: TrendingUp },
  { name: "Crops", href: "/dashboard/crops", icon: Sprout },
  { name: "AI Insights", href: "/dashboard/ai-insights", icon: Brain },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

function DashboardSidebar({ onItemClick }: { onItemClick?: () => void }) {
  const pathname = usePathname()
  const { user } = useUser()

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center space-x-3 p-6 border-b border-green-100">
        <div className="p-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg">
          <Sprout className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">FarmAI</h2>
          <p className="text-sm text-gray-600">Smart Farming</p>
        </div>
      </div>

      {/* User Info */}
      {user && (
        <div className="p-4 border-b border-green-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase() || "U"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-600 truncate">{user.farmLocation}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center space-x-2">
            <Badge className="bg-green-100 text-green-800 text-xs">
              <Activity className="h-3 w-3 mr-1" />
              Active
            </Badge>
            <Badge variant="outline" className="text-xs">
              Premium
            </Badge>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onItemClick}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-500"}`} />
              <span>{item.name}</span>
              {item.name === "AI Insights" && (
                <Badge className="bg-purple-100 text-purple-800 text-xs ml-auto">New</Badge>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-green-100">
        <form action={signOut}>
          <Button
            type="submit"
            variant="outline"
            className="w-full justify-start text-gray-700 hover:text-red-600 hover:border-red-300"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </form>
      </div>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="p-0 w-80">
            <DashboardSidebar onItemClick={() => setSidebarOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Desktop sidebar */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-80 lg:flex-col">
          <div className="flex flex-col flex-grow bg-white border-r border-green-100 shadow-sm">
            <DashboardSidebar />
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-80">
          {/* Mobile header */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-green-100">
            <Button variant="outline" size="sm" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg">
                <Sprout className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">FarmAI</span>
            </div>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
          </div>

          {/* Page content */}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </UserProvider>
  )
}
