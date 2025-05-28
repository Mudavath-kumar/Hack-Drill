"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Target,
  Leaf,
  Droplets,
  DollarSign,
  PieChart,
  Activity,
  Award,
} from "lucide-react"

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [yieldData, setYieldData] = useState([
    { crop: "Wheat", current: 4.2, target: 4.5, lastYear: 3.8, efficiency: 93 },
    { crop: "Corn", current: 8.1, target: 8.5, lastYear: 7.9, efficiency: 95 },
    { crop: "Soybeans", current: 2.8, target: 3.0, lastYear: 2.6, efficiency: 93 },
    { crop: "Barley", current: 3.9, target: 4.0, lastYear: 3.7, efficiency: 98 },
  ])

  const [financialData] = useState({
    totalRevenue: 245680,
    totalCosts: 189420,
    netProfit: 56260,
    profitMargin: 22.9,
    costPerAcre: 773,
    revenuePerAcre: 1003,
  })

  const [resourceUsage] = useState([
    { resource: "Water", used: 1240, allocated: 1500, unit: "m³", efficiency: 83 },
    { resource: "Fertilizer", used: 2.8, allocated: 3.2, unit: "tons", efficiency: 88 },
    { resource: "Seeds", used: 145, allocated: 160, unit: "kg", efficiency: 91 },
    { resource: "Fuel", used: 890, allocated: 1000, unit: "liters", efficiency: 89 },
  ])

  const [sustainabilityMetrics] = useState([
    { metric: "Carbon Footprint", value: 2.4, unit: "tons CO₂", trend: -8.2, target: 2.2 },
    { metric: "Soil Health Index", value: 8.7, unit: "/10", trend: +5.1, target: 9.0 },
    { metric: "Biodiversity Score", value: 7.8, unit: "/10", trend: +12.3, target: 8.5 },
    { metric: "Water Efficiency", value: 92, unit: "%", trend: +6.7, target: 95 },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Farm Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into your farm's performance and efficiency</p>
        </div>

        {/* Period Selector */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mb-8">
          <CardHeader>
            <CardTitle>Analysis Period</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["week", "month", "quarter", "year"].map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? "default" : "outline"}
                  className={`capitalize ${selectedPeriod === period ? "bg-gradient-to-r from-green-600 to-blue-600" : ""}`}
                  onClick={() => setSelectedPeriod(period)}
                >
                  {period}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Revenue</p>
                  <p className="text-2xl font-bold">${(financialData.totalRevenue / 1000).toFixed(0)}K</p>
                  <p className="text-sm text-green-200">+12.5% vs last year</p>
                </div>
                <DollarSign className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Profit Margin</p>
                  <p className="text-2xl font-bold">{financialData.profitMargin}%</p>
                  <p className="text-sm text-blue-200">+3.2% improvement</p>
                </div>
                <TrendingUp className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Avg Efficiency</p>
                  <p className="text-2xl font-bold">
                    {Math.round(yieldData.reduce((acc, crop) => acc + crop.efficiency, 0) / yieldData.length)}%
                  </p>
                  <p className="text-sm text-purple-200">Across all crops</p>
                </div>
                <Target className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Sustainability</p>
                  <p className="text-2xl font-bold">8.2/10</p>
                  <p className="text-sm text-orange-200">+0.8 improvement</p>
                </div>
                <Award className="h-12 w-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Yield Analysis */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-green-600" />
                <span>Yield Performance</span>
              </CardTitle>
              <CardDescription>Current vs target yields (tons/hectare)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {yieldData.map((crop, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900">{crop.crop}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={crop.current >= crop.target ? "default" : "secondary"}
                          className={crop.current >= crop.target ? "bg-green-100 text-green-800" : ""}
                        >
                          {crop.efficiency}% efficient
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current: {crop.current} t/ha</span>
                        <span>Target: {crop.target} t/ha</span>
                      </div>
                      <Progress value={(crop.current / crop.target) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Last year: {crop.lastYear} t/ha</span>
                        <span className={crop.current > crop.lastYear ? "text-green-600" : "text-red-600"}>
                          {crop.current > crop.lastYear ? "+" : ""}
                          {(((crop.current - crop.lastYear) / crop.lastYear) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resource Usage */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Droplets className="h-6 w-6 text-blue-600" />
                <span>Resource Efficiency</span>
              </CardTitle>
              <CardDescription>Usage vs allocated resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {resourceUsage.map((resource, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900">{resource.resource}</h3>
                      <Badge
                        variant={resource.efficiency >= 90 ? "default" : "secondary"}
                        className={resource.efficiency >= 90 ? "bg-green-100 text-green-800" : ""}
                      >
                        {resource.efficiency}% efficient
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>
                          Used: {resource.used} {resource.unit}
                        </span>
                        <span>
                          Allocated: {resource.allocated} {resource.unit}
                        </span>
                      </div>
                      <Progress value={(resource.used / resource.allocated) * 100} className="h-2" />
                      <div className="text-xs text-gray-600">
                        Saved: {resource.allocated - resource.used} {resource.unit}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Financial Overview */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-6 w-6 text-purple-600" />
                <span>Financial Overview</span>
              </CardTitle>
              <CardDescription>Revenue, costs, and profitability analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-600">${financialData.totalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-r from-red-50 to-orange-50 border border-red-200">
                    <p className="text-sm text-gray-600">Total Costs</p>
                    <p className="text-2xl font-bold text-red-600">${financialData.totalCosts.toLocaleString()}</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                  <p className="text-sm text-gray-600">Net Profit</p>
                  <p className="text-3xl font-bold text-blue-600">${financialData.netProfit.toLocaleString()}</p>
                  <p className="text-sm text-blue-700">Margin: {financialData.profitMargin}%</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Cost per Acre</p>
                    <p className="text-xl font-bold text-gray-900">${financialData.costPerAcre}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Revenue per Acre</p>
                    <p className="text-xl font-bold text-gray-900">${financialData.revenuePerAcre}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sustainability Metrics */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Leaf className="h-6 w-6 text-green-600" />
                <span>Sustainability Metrics</span>
              </CardTitle>
              <CardDescription>Environmental impact and sustainability scores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sustainabilityMetrics.map((metric, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900">{metric.metric}</h3>
                      <div className="flex items-center space-x-2">
                        {metric.trend > 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                        <span className={`text-sm font-medium ${metric.trend > 0 ? "text-green-600" : "text-red-600"}`}>
                          {metric.trend > 0 ? "+" : ""}
                          {metric.trend.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>
                          Current: {metric.value} {metric.unit}
                        </span>
                        <span>
                          Target: {metric.target} {metric.unit}
                        </span>
                      </div>
                      <Progress
                        value={
                          metric.unit === "tons CO₂"
                            ? (metric.target / metric.value) * 100
                            : (metric.value / metric.target) * 100
                        }
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Items */}
        <Card className="mt-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-6 w-6 text-orange-600" />
              <span>Recommended Actions</span>
            </CardTitle>
            <CardDescription>AI-powered recommendations to improve your farm performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2">Optimize Water Usage</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Implement precision irrigation to reduce water consumption by 15%
                </p>
                <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                  View Details
                </Button>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">Soil Health Improvement</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Add organic matter to increase soil health index by 0.5 points
                </p>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  View Details
                </Button>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">Crop Rotation Plan</h3>
                <p className="text-sm text-gray-600 mb-3">Optimize rotation to increase overall yield by 8%</p>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
