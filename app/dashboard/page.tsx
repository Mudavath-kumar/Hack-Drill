"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Thermometer,
  Droplets,
  Wind,
  Sun,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Activity,
  Satellite,
  Sprout,
  BarChart3,
  MapPin,
  Calendar,
  DollarSign,
  Leaf,
  Eye,
  Bell,
  Zap,
  Brain,
} from "lucide-react"
import { useUser } from "@/lib/user-context"

interface LiveData {
  temperature: number
  humidity: number
  windSpeed: number
  soilMoisture: number
  ndvi: number
  lastUpdate: string
}

interface MarketData {
  crop: string
  price: number
  change: number
  trend: "up" | "down"
}

interface Alert {
  id: string
  type: "warning" | "info" | "success" | "error"
  title: string
  message: string
  time: string
}

interface AIInsight {
  id: string
  type: "crop" | "market" | "weather"
  title: string
  description: string
  confidence: number
  action: string
}

export default function DashboardPage() {
  const { user } = useUser()
  const [liveData, setLiveData] = useState<LiveData>({
    temperature: 72,
    humidity: 65,
    windSpeed: 8,
    soilMoisture: 45,
    ndvi: 0.75,
    lastUpdate: new Date().toLocaleTimeString(),
  })

  const [marketData] = useState<MarketData[]>([
    { crop: "Corn", price: 6.85, change: 2.3, trend: "up" },
    { crop: "Soybeans", price: 14.2, change: -1.2, trend: "down" },
    { crop: "Wheat", price: 8.45, change: 0.8, trend: "up" },
  ])

  const [alerts] = useState<Alert[]>([
    {
      id: "1",
      type: "warning",
      title: "Low Soil Moisture",
      message: "Field A3 showing moisture levels below optimal range",
      time: "10 min ago",
    },
    {
      id: "2",
      type: "info",
      title: "Weather Update",
      message: "Rain expected tomorrow afternoon - perfect for irrigation planning",
      time: "25 min ago",
    },
    {
      id: "3",
      type: "success",
      title: "Harvest Ready",
      message: "Field B2 corn crop has reached optimal harvest maturity",
      time: "1 hour ago",
    },
  ])

  const [aiInsights] = useState<AIInsight[]>([
    {
      id: "1",
      type: "crop",
      title: "Optimal Planting Window",
      description: "AI recommends planting soybeans in Field C1 within the next 5 days",
      confidence: 92,
      action: "View Recommendations",
    },
    {
      id: "2",
      type: "market",
      title: "Price Surge Predicted",
      description: "Corn prices expected to rise 8% in the next 2 weeks",
      confidence: 87,
      action: "View Market Analysis",
    },
    {
      id: "3",
      type: "weather",
      title: "Irrigation Timing",
      description: "Optimal irrigation window detected for tomorrow 6-8 AM",
      confidence: 95,
      action: "Schedule Irrigation",
    },
  ])

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData((prev) => ({
        ...prev,
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() - 0.5) * 5)),
        windSpeed: Math.max(0, prev.windSpeed + (Math.random() - 0.5) * 3),
        soilMoisture: Math.max(20, Math.min(80, prev.soilMoisture + (Math.random() - 0.5) * 3)),
        ndvi: Math.max(0.3, Math.min(0.9, prev.ndvi + (Math.random() - 0.5) * 0.05)),
        lastUpdate: new Date().toLocaleTimeString(),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Bell className="h-4 w-4 text-blue-500" />
    }
  }

  const getAlertBorderColor = (type: string) => {
    switch (type) {
      case "warning":
        return "border-l-orange-500"
      case "error":
        return "border-l-red-500"
      case "success":
        return "border-l-green-500"
      default:
        return "border-l-blue-500"
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "crop":
        return <Sprout className="h-5 w-5 text-green-600" />
      case "market":
        return <TrendingUp className="h-5 w-5 text-blue-600" />
      case "weather":
        return <Sun className="h-5 w-5 text-orange-600" />
      default:
        return <Brain className="h-5 w-5 text-purple-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name?.split(" ")[0] || "Farmer"}! 👋
              </h1>
              <p className="text-gray-600 flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{user?.farmLocation || "Farm Location"}</span>
                <span className="text-gray-400">•</span>
                <Calendar className="h-4 w-4" />
                <span>{new Date().toLocaleDateString()}</span>
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-green-100 px-3 py-2 rounded-full">
                <Activity className="h-4 w-4 text-green-600 animate-pulse" />
                <span className="text-sm font-medium text-green-700">Live Monitoring</span>
              </div>
              <Link href="/dashboard/profile">
                <Avatar className="h-10 w-10 lg:h-12 lg:w-12 ring-2 ring-green-200">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} />
                  <AvatarFallback className="bg-green-600 text-white">
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </div>

        {/* Real-Time Monitoring Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Temperature</p>
                  <p className="text-2xl lg:text-3xl font-bold text-gray-900">{liveData.temperature.toFixed(1)}°F</p>
                  <p className="text-xs text-gray-500 mt-1">Last: {liveData.lastUpdate}</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Thermometer className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Soil Moisture</p>
                  <p className="text-2xl lg:text-3xl font-bold text-gray-900">{liveData.soilMoisture.toFixed(0)}%</p>
                  <Progress value={liveData.soilMoisture} className="mt-2 h-2" />
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">NDVI Score</p>
                  <p className="text-2xl lg:text-3xl font-bold text-gray-900">{liveData.ndvi.toFixed(2)}</p>
                  <Badge className="mt-2 bg-green-100 text-green-800">Healthy</Badge>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Wind Speed</p>
                  <p className="text-2xl lg:text-3xl font-bold text-gray-900">{liveData.windSpeed.toFixed(1)} mph</p>
                  <p className="text-xs text-gray-500 mt-1">Optimal for spraying</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Wind className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Insights */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    <span>AI Insights</span>
                  </CardTitle>
                  <CardDescription>Smart recommendations powered by AI</CardDescription>
                </div>
                <Link href="/dashboard/ai-insights">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiInsights.map((insight) => (
                    <div
                      key={insight.id}
                      className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-white rounded-full shadow-sm">{getInsightIcon(insight.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-semibold text-gray-900">{insight.title}</h4>
                            <Badge className="bg-purple-100 text-purple-800 text-xs">
                              {insight.confidence}% confidence
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                          <Button size="sm" variant="outline" className="text-xs">
                            {insight.action}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  <span>Quick Actions</span>
                </CardTitle>
                <CardDescription>Common farming tasks and monitoring tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                  <Link href="/dashboard/field-monitoring">
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-green-50 hover:border-green-300 transition-colors"
                    >
                      <Satellite className="h-6 w-6 text-green-600" />
                      <span className="text-sm font-medium">Field Monitor</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/weather/current">
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                      <Sun className="h-6 w-6 text-blue-600" />
                      <span className="text-sm font-medium">Weather</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/market/prices">
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-purple-50 hover:border-purple-300 transition-colors"
                    >
                      <TrendingUp className="h-6 w-6 text-purple-600" />
                      <span className="text-sm font-medium">Market</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/crops/recommendations">
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-orange-50 hover:border-orange-300 transition-colors"
                    >
                      <Sprout className="h-6 w-6 text-orange-600" />
                      <span className="text-sm font-medium">Crops</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Market Prices */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span>Live Market Prices</span>
                  </CardTitle>
                  <CardDescription>Real-time commodity pricing</CardDescription>
                </div>
                <Link href="/dashboard/market/prices">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50/50">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 rounded-full">
                          <Sprout className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{item.crop}</p>
                          <p className="text-sm text-gray-600">per bushel</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">${item.price}</p>
                        <div className="flex items-center space-x-1">
                          {item.trend === "up" ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          )}
                          <span
                            className={`text-sm font-medium ${item.trend === "up" ? "text-green-600" : "text-red-600"}`}
                          >
                            {item.change > 0 ? "+" : ""}
                            {item.change}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Alerts & Notifications */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-orange-600" />
                  <span>Recent Alerts</span>
                </CardTitle>
                <CardDescription>Important notifications and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-3 rounded-lg border-l-4 bg-gray-50/50 ${getAlertBorderColor(alert.type)}`}
                    >
                      <div className="flex items-start space-x-3">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                          <p className="text-xs text-gray-600 mt-1">{alert.message}</p>
                          <p className="text-xs text-gray-500 mt-2">{alert.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Alerts
                </Button>
              </CardContent>
            </Card>

            {/* Farm Overview */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  <span>Farm Overview</span>
                </CardTitle>
                <CardDescription>Key performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Fields</span>
                  <span className="font-semibold">12 / 15</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Crop Health</span>
                  <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Equipment Status</span>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600">All Operational</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Yield Forecast</span>
                  <span className="font-semibold text-green-600">+18% vs last year</span>
                </div>
                <Link href="/dashboard/analytics">
                  <Button variant="outline" className="w-full mt-4">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
