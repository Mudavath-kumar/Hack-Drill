"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Leaf,
  Sprout,
  TreePine,
  Wheat,
  Calendar,
  MapPin,
  Thermometer,
  Droplets,
  Sun,
  Target,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"

export default function CropsPage() {
  const [selectedSeason, setSelectedSeason] = useState("spring")
  const [cropRecommendations, setCropRecommendations] = useState([
    {
      name: "Winter Wheat",
      suitability: 95,
      expectedYield: "4.2 tons/hectare",
      profitability: "High",
      growthPeriod: "240 days",
      waterRequirement: "Medium",
      soilSuitability: "Excellent",
      marketDemand: "High",
      riskLevel: "Low",
      icon: Wheat,
      color: "from-yellow-400 to-orange-500",
    },
    {
      name: "Spring Barley",
      suitability: 88,
      expectedYield: "3.8 tons/hectare",
      profitability: "Medium-High",
      growthPeriod: "120 days",
      waterRequirement: "Low",
      soilSuitability: "Good",
      marketDemand: "Medium",
      riskLevel: "Low",
      icon: Sprout,
      color: "from-green-400 to-emerald-500",
    },
    {
      name: "Canola",
      suitability: 82,
      expectedYield: "2.1 tons/hectare",
      profitability: "High",
      growthPeriod: "300 days",
      waterRequirement: "Medium",
      soilSuitability: "Good",
      marketDemand: "High",
      riskLevel: "Medium",
      icon: Leaf,
      color: "from-blue-400 to-indigo-500",
    },
    {
      name: "Lentils",
      suitability: 76,
      expectedYield: "1.8 tons/hectare",
      profitability: "Medium",
      growthPeriod: "110 days",
      waterRequirement: "Low",
      soilSuitability: "Fair",
      marketDemand: "Medium",
      riskLevel: "Medium",
      icon: TreePine,
      color: "from-purple-400 to-pink-500",
    },
  ])

  const [cropCalendar] = useState([
    { month: "Jan", activity: "Planning & Soil Testing", crops: ["Winter Wheat"] },
    { month: "Feb", activity: "Equipment Maintenance", crops: [] },
    { month: "Mar", activity: "Spring Seeding", crops: ["Barley", "Canola"] },
    { month: "Apr", activity: "Fertilizer Application", crops: ["Winter Wheat", "Barley"] },
    { month: "May", activity: "Pest Monitoring", crops: ["All Crops"] },
    { month: "Jun", activity: "Herbicide Application", crops: ["Canola", "Lentils"] },
    { month: "Jul", activity: "Growth Monitoring", crops: ["All Crops"] },
    { month: "Aug", activity: "Harvest Preparation", crops: ["Barley", "Lentils"] },
    { month: "Sep", activity: "Harvest Season", crops: ["Barley", "Canola"] },
    { month: "Oct", activity: "Fall Seeding", crops: ["Winter Wheat"] },
    { month: "Nov", activity: "Field Preparation", crops: [] },
    { month: "Dec", activity: "Storage & Marketing", crops: [] },
  ])

  const [growthStages] = useState([
    { stage: "Germination", duration: "7-14 days", description: "Seed sprouting and initial root development" },
    { stage: "Vegetative", duration: "30-60 days", description: "Leaf and stem growth, tillering" },
    { stage: "Reproductive", duration: "45-75 days", description: "Flowering and grain formation" },
    { stage: "Maturation", duration: "30-45 days", description: "Grain filling and ripening" },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crop Advisory Center</h1>
          <p className="text-gray-600">Personalized crop recommendations and agricultural guidance</p>
        </div>

        {/* Season Selector */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mb-8">
          <CardHeader>
            <CardTitle>Select Growing Season</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["spring", "summer", "fall", "winter"].map((season) => (
                <Button
                  key={season}
                  variant={selectedSeason === season ? "default" : "outline"}
                  className={`capitalize ${selectedSeason === season ? "bg-gradient-to-r from-green-600 to-emerald-600" : ""}`}
                  onClick={() => setSelectedSeason(season)}
                >
                  {season}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Crop Recommendations */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Leaf className="h-6 w-6 text-green-600" />
                  <span>Recommended Crops for {selectedSeason}</span>
                </CardTitle>
                <CardDescription>Based on your soil type, climate, and market conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cropRecommendations.map((crop, index) => (
                    <Card
                      key={index}
                      className={`bg-gradient-to-br ${crop.color} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <crop.icon className="h-8 w-8 text-white" />
                            <h3 className="text-xl font-bold">{crop.name}</h3>
                          </div>
                          <Badge className="bg-white/20 text-white border-white/30">{crop.suitability}% match</Badge>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-white/80">Expected Yield:</span>
                            <span className="font-semibold">{crop.expectedYield}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/80">Profitability:</span>
                            <span className="font-semibold">{crop.profitability}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/80">Growth Period:</span>
                            <span className="font-semibold">{crop.growthPeriod}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/80">Water Need:</span>
                            <span className="font-semibold">{crop.waterRequirement}</span>
                          </div>

                          <Progress value={crop.suitability} className="mt-4 bg-white/20" />

                          <Button className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white border-white/30">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Growth Stages */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sprout className="h-6 w-6 text-green-600" />
                  <span>Crop Growth Stages</span>
                </CardTitle>
                <CardDescription>Understanding the lifecycle of your crops</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {growthStages.map((stage, index) => (
                    <div
                      key={index}
                      className="text-center p-6 rounded-xl bg-gradient-to-b from-green-50 to-emerald-50 border border-green-200"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{index + 1}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{stage.stage}</h3>
                      <p className="text-sm text-green-600 font-medium mb-2">{stage.duration}</p>
                      <p className="text-sm text-gray-600">{stage.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Crop Calendar */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  <span>Annual Crop Calendar</span>
                </CardTitle>
                <CardDescription>Monthly farming activities and schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cropCalendar.map((month, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{month.month}</h3>
                        <Badge variant="outline" className="text-xs">
                          {month.crops.length > 0 ? `${month.crops.length} crops` : "Maintenance"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{month.activity}</p>
                      {month.crops.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {month.crops.map((crop, cropIndex) => (
                            <Badge key={cropIndex} className="text-xs bg-blue-100 text-blue-800">
                              {crop}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Environmental Factors */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sun className="h-6 w-6 text-yellow-600" />
                  <span>Environmental Factors</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="h-5 w-5 text-orange-500" />
                    <span className="text-sm font-medium">Temperature</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Optimal</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-center space-x-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium">Soil Moisture</span>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Monitor</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
                  <div className="flex items-center space-x-2">
                    <Sun className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm font-medium">Sunlight</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Crop Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  <Target className="h-4 w-4 mr-2" />
                  Plan Crop Rotation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Activities
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Yield Predictions
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="h-4 w-4 mr-2" />
                  Field Mapping
                </Button>
              </CardContent>
            </Card>

            {/* Crop Alerts */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                  <span>Crop Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-yellow-50 border-l-4 border-yellow-500">
                  <p className="text-sm font-medium text-gray-900">Optimal Seeding Window</p>
                  <p className="text-xs text-gray-600 mt-1">Spring barley seeding recommended in next 2 weeks</p>
                </div>

                <div className="p-3 rounded-lg bg-green-50 border-l-4 border-green-500">
                  <p className="text-sm font-medium text-gray-900">Market Opportunity</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Canola prices trending upward - consider increasing acreage
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-blue-50 border-l-4 border-blue-500">
                  <p className="text-sm font-medium text-gray-900">Weather Update</p>
                  <p className="text-xs text-gray-600 mt-1">Favorable conditions for field work this week</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
