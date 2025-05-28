"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, CloudRain, Sun, Wind, Thermometer, Snowflake, Zap, Bell, Settings } from "lucide-react"

export default function WeatherAlertsPage() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "severe",
      icon: AlertTriangle,
      title: "Severe Weather Warning",
      message: "Heavy thunderstorms expected with hail and strong winds",
      time: "15 minutes ago",
      severity: "high",
      duration: "Next 6 hours",
      action: "Secure equipment and livestock",
    },
    {
      id: 2,
      type: "rain",
      icon: CloudRain,
      title: "Heavy Rain Alert",
      message: "Significant rainfall expected - 25-40mm in next 12 hours",
      time: "1 hour ago",
      severity: "medium",
      duration: "Next 12 hours",
      action: "Delay field operations and check drainage",
    },
    {
      id: 3,
      type: "heat",
      icon: Sun,
      title: "Heat Advisory",
      message: "Temperatures above 35°C expected for next 3 days",
      time: "2 hours ago",
      severity: "medium",
      duration: "Next 3 days",
      action: "Increase irrigation and monitor livestock",
    },
    {
      id: 4,
      type: "wind",
      icon: Wind,
      title: "High Wind Warning",
      message: "Wind speeds up to 60 km/h expected",
      time: "3 hours ago",
      severity: "medium",
      duration: "Next 8 hours",
      action: "Avoid spraying operations",
    },
    {
      id: 5,
      type: "frost",
      icon: Snowflake,
      title: "Frost Warning",
      message: "Temperatures may drop below 0°C tonight",
      time: "4 hours ago",
      severity: "high",
      duration: "Tonight",
      action: "Protect sensitive crops",
    },
  ])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-red-500 bg-red-50"
      case "medium":
        return "border-yellow-500 bg-yellow-50"
      case "low":
        return "border-blue-500 bg-blue-50"
      default:
        return "border-gray-500 bg-gray-50"
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High Priority</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Priority</Badge>
      case "low":
        return <Badge className="bg-blue-100 text-blue-800">Low Priority</Badge>
      default:
        return <Badge variant="outline">Info</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Weather Alerts & Warnings</h1>
          <p className="text-gray-600">Stay informed about weather conditions that may affect your farm</p>
          <div className="flex items-center space-x-4 mt-4">
            <Badge className="bg-red-100 text-red-800">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {alerts.filter((a) => a.severity === "high").length} High Priority
            </Badge>
            <Badge className="bg-yellow-100 text-yellow-800">
              <Bell className="h-3 w-3 mr-1" />
              {alerts.filter((a) => a.severity === "medium").length} Medium Priority
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Alert Settings
            </Button>
          </div>
        </div>

        {/* Active Alerts */}
        <div className="space-y-6 mb-8">
          {alerts.map((alert) => (
            <Alert key={alert.id} className={`${getSeverityColor(alert.severity)} border-l-4`}>
              <alert.icon className="h-6 w-6" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
                  <div className="flex items-center space-x-2">
                    {getSeverityBadge(alert.severity)}
                    <span className="text-sm text-gray-500">{alert.time}</span>
                  </div>
                </div>
                <AlertDescription className="text-gray-700 mb-3">{alert.message}</AlertDescription>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Duration: </span>
                    <span className="text-gray-900">{alert.duration}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Recommended Action: </span>
                    <span className="text-gray-900">{alert.action}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Acknowledge
                    </Button>
                    <Button size="sm" variant="outline">
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            </Alert>
          ))}
        </div>

        {/* Alert Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-red-500" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">5</h3>
              <p className="text-gray-600">Active Alerts</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <Zap className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">12</h3>
              <p className="text-gray-600">This Week</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <Bell className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">48</h3>
              <p className="text-gray-600">This Month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <Settings className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">95%</h3>
              <p className="text-gray-600">Accuracy Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Alert Types */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle>Alert Types & Thresholds</CardTitle>
            <CardDescription>Configure when you want to receive different types of weather alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: CloudRain,
                  title: "Heavy Rain",
                  threshold: "> 20mm/hour",
                  color: "text-blue-600",
                  enabled: true,
                },
                {
                  icon: Wind,
                  title: "High Winds",
                  threshold: "> 50 km/h",
                  color: "text-gray-600",
                  enabled: true,
                },
                {
                  icon: Thermometer,
                  title: "Extreme Heat",
                  threshold: "> 35°C",
                  color: "text-red-600",
                  enabled: true,
                },
                {
                  icon: Snowflake,
                  title: "Frost Warning",
                  threshold: "< 2°C",
                  color: "text-blue-400",
                  enabled: true,
                },
                {
                  icon: Zap,
                  title: "Thunderstorms",
                  threshold: "Lightning detected",
                  color: "text-yellow-600",
                  enabled: true,
                },
                {
                  icon: Sun,
                  title: "UV Index",
                  threshold: "> 8",
                  color: "text-orange-600",
                  enabled: false,
                },
              ].map((alertType, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-gray-200 bg-gradient-to-r from-gray-50 to-white"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <alertType.icon className={`h-6 w-6 ${alertType.color}`} />
                      <h3 className="font-semibold text-gray-900">{alertType.title}</h3>
                    </div>
                    <Badge variant={alertType.enabled ? "default" : "outline"}>
                      {alertType.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Threshold: {alertType.threshold}</p>
                  <Button size="sm" variant="outline" className="w-full">
                    Configure
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
