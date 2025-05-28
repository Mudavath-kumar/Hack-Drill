"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Leaf,
  LayoutDashboard,
  Cloud,
  TrendingUp,
  Sprout,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Satellite,
  Activity,
  Menu,
  User,
  Bell,
} from "lucide-react"
import { signOut } from "@/lib/auth"
import { UserProvider, useUser } from "@/lib/user-context"
import { useState } from "react"

function SidebarContent({ onItemClick }: { onItemClick?: () => void }) {
  const pathname = usePathname()
  const { user } = useUser()
  const [expandedSections, setExpandedSections] = useState<string[]>(["weather", "market", "crops", "monitoring"])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    {
      name: "Field Monitoring",
      icon: Satellite,
      section: "monitoring",
      children: [
        { name: "Live Monitoring", href: "/dashboard/field-monitoring" },
        { name: "Satellite Imagery", href: "/dashboard/field-monitoring/satellite" },
        { name: "Disease Detection", href: "/dashboard/field-monitoring/diseases" },
        { name: "Pest Management", href: "/dashboard/field-monitoring/pests" },
      ],
    },
    {
      name: "Weather",
      icon: Cloud,
      section: "weather",
      children: [
        { name: "Current Weather", href: "/dashboard/weather/current" },
        { name: "7-Day Forecast", href: "/dashboard/weather/forecast" },
        { name: "Weather Alerts", href: "/dashboard/weather/alerts" },
        { name: "Historical Data", href: "/dashboard/weather/history" },
      ],
    },
    {
      name: "Market",
      icon: TrendingUp,
      section: "market",
      children: [
        { name: "Live Prices", href: "/dashboard/market/prices" },
        { name: "Market News", href: "/dashboard/market/news" },
        { name: "Price Alerts", href: "/dashboard/market/alerts" },
        { name: "Trading Tools", href: "/dashboard/market/tools" },
      ],
    },
    {
      name: "Crops",
      icon: Sprout,
      section: "crops",
      children: [
        { name: "Crop Recommendations", href: "/dashboard/crops/recommendations" },
        { name: "Growth Tracking", href: "/dashboard/crops/tracking" },
        { name: "Harvest Planning", href: "/dashboard/crops/harvest" },
      ],
    },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center space-x-3 p-4 lg:p-6 border-b border-green-100">
        <div className="relative">
          <Leaf className="h-8 w-8 lg:h-10 lg:w-10 text-green-600" />
          <div className="absolute -top-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        <div className="hidden sm:block">
          <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            FarmWise
          </span>
          <p className="text-xs text-gray-500 font-medium">Smart Agriculture Platform</p>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="px-4 lg:px-6 py-4 bg-gradient-to-r from-green-50 to-blue-50 border-b border-green-100">
        <Link href="/dashboard/profile" onClick={onItemClick}>
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/50 transition-colors cursor-pointer">
            <Avatar className="h-10 w-10 lg:h-12 lg:w-12">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} />
              <AvatarFallback className="bg-green-600 text-white">
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0 hidden sm:block">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name || "Loading..."}</p>
              <p className="text-xs text-gray-600 truncate">{user?.farmLocation || "Farm Location"}</p>
            </div>
            <User className="h-4 w-4 text-gray-400 hidden sm:block" />
          </div>
        </Link>
      </div>

      {/* Live Status */}
      <div className="px-4 lg:px-6 py-3 bg-gradient-to-r from-green-50 to-blue-50 border-b border-green-100">
        <div className="flex items-center space-x-2">
          <Activity className="h-4 w-4 text-green-500 animate-pulse" />
          <span className="text-sm font-medium text-green-700">Live Monitoring</span>
        </div>
        <p className="text-xs text-gray-600 mt-1 hidden sm:block">Real-time data streaming</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 lg:p-4 space-y-1 lg:space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          if (item.children) {
            const isExpanded = expandedSections.includes(item.section!)
            const hasActiveChild = item.children.some((child) => pathname === child.href)

            return (
              <div key={item.name}>
                <Button
                  variant="ghost"
                  className={`w-full justify-between p-2 lg:p-3 h-auto text-left ${
                    hasActiveChild
                      ? "text-green-700 bg-green-50 border border-green-200"
                      : "text-gray-700 hover:text-green-700 hover:bg-green-50"
                  }`}
                  onClick={() => toggleSection(item.section!)}
                >
                  <div className="flex items-center min-w-0">
                    <item.icon className="h-4 w-4 lg:h-5 lg:w-5 mr-2 lg:mr-3 flex-shrink-0" />
                    <span className="font-medium text-sm lg:text-base truncate">{item.name}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 flex-shrink-0" />
                  )}
                </Button>

                {isExpanded && (
                  <div className="ml-6 lg:ml-8 mt-1 lg:mt-2 space-y-1">
                    {item.children.map((child) => {
                      const isActive = pathname === child.href
                      return (
                        <Link key={child.name} href={child.href} onClick={onItemClick}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`w-full justify-start text-xs lg:text-sm py-1.5 lg:py-2 ${
                              isActive
                                ? "bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-md"
                                : "text-gray-600 hover:text-green-700 hover:bg-green-50"
                            }`}
                          >
                            <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-current mr-2 lg:mr-3 opacity-60 flex-shrink-0"></div>
                            <span className="truncate">{child.name}</span>
                          </Button>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          } else {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href!} onClick={onItemClick}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start p-2 lg:p-3 h-auto ${
                    isActive
                      ? "bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:text-green-700 hover:bg-green-50"
                  }`}
                >
                  <item.icon className="h-4 w-4 lg:h-5 lg:w-5 mr-2 lg:mr-3 flex-shrink-0" />
                  <span className="font-medium text-sm lg:text-base truncate">{item.name}</span>
                </Button>
              </Link>
            )
          }
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 lg:p-4 border-t border-green-100 space-y-1 lg:space-y-2 bg-gray-50/50">
        <Link href="/dashboard/settings" onClick={onItemClick}>
          <Button
            variant="ghost"
            className="w-full justify-start p-2 lg:p-3 text-gray-700 hover:text-green-700 hover:bg-green-50"
          >
            <Settings className="h-4 w-4 lg:h-5 lg:w-5 mr-2 lg:mr-3 flex-shrink-0" />
            <span className="font-medium text-sm lg:text-base">Settings</span>
          </Button>
        </Link>
        <form action={signOut}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start p-2 lg:p-3 text-gray-700 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 lg:h-5 lg:w-5 mr-2 lg:mr-3 flex-shrink-0" />
            <span className="font-medium text-sm lg:text-base">Sign Out</span>
          </Button>
        </form>
      </div>
    </div>
  )
}

function DashboardHeader() {
  const { user } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="lg:hidden bg-white/90 backdrop-blur-lg border-b border-green-100 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center space-x-3">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-80 bg-white/90 backdrop-blur-lg">
            <SidebarContent onItemClick={() => setMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>

        <div className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            FarmWise
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm" className="p-2">
          <Bell className="h-5 w-5 text-gray-600" />
        </Button>
        <Link href="/dashboard/profile">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} />
            <AvatarFallback className="bg-green-600 text-white text-sm">
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
        {/* Desktop Sidebar */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:w-72 lg:block">
          <div className="bg-white/90 backdrop-blur-lg border-r border-green-100 overflow-y-auto shadow-xl h-full">
            <SidebarContent />
          </div>
        </div>

        {/* Mobile Header */}
        <DashboardHeader />

        {/* Main Content */}
        <div className="lg:ml-72">
          <main className="min-h-screen">{children}</main>
        </div>
      </div>
    </UserProvider>
  )
}
