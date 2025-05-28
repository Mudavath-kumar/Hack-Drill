"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Leaf,
  Sprout,
  TreePine,
  Wheat,
  Target,
  TrendingUp,
  Droplets,
  DollarSign,
  Calendar,
  MapPin,
  Star,
  CheckCircle,
} from "lucide-react"

export default function CropRecommendationsPage() {
  const [selectedSeason, setSelectedSeason] = useState("spring")
  const [selectedRegion, setSelectedRegion] = useState("temperate")

  const cropRecommendations = [
    {
      id: 1,
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
      plantingWindow: "September - October",
      harvestWindow: "June - July",
      advantages: ["High market price", "Disease resistant", "Cold tolerant"],
      challenges: ["Long growing season", "Weather dependent"],
      roi: 145,
    },
    {
      id: 2,
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
      plantingWindow: "March - April",
      harvestWindow: "July - August",
      advantages: ["Short season", "Low water needs", "Good rotation crop"],
      challenges: ["Lower market price", "Competition"],
      roi: 118,
    },
    {
      id: 3,
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
      plantingWindow: "August - September",
      harvestWindow: "July - August",
      advantages: ["High oil content", "Premium pricing", "Export demand"],
      challenges: ["Pest pressure", "Weather sensitive"],
      roi: 132,
    },
    {
      id: 4,
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
      plantingWindow: "April - May",
      harvestWindow: "August - September",
      advantages: ["Nitrogen fixing", "Health food trend", "Drought tolerant"],
      challenges: ["Market volatility", "Disease risk"],
      roi: 108,
    },
  ]

  const getROIColor = (roi: number) => {
    if (roi >= 140) return "text-green-600"
    if (roi >= 120) return "text-blue-600"
    if (roi >= 100) return "text-yellow-600"
    return "text-red-600"
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "High":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crop Recommendations</h1>
          <p className="text-gray-600">AI-powered crop suggestions based on your farm conditions and market trends</p>
        </div>

        {/* Filters */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mb-8">
          <CardHeader>
            <CardTitle>Customize Recommendations</CardTitle>
            <CardDescription>Adjust parameters to get personalized crop suggestions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Growing Season</label>
                <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spring">Spring</SelectItem>
                    <SelectItem value="summer">Summer</SelectItem>
                    <SelectItem value="fall">Fall</SelectItem>
                    <SelectItem value="winter">Winter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Climate Zone</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="temperate">Temperate</SelectItem>
                    <SelectItem value="continental">Continental</SelectItem>
                    <SelectItem value="mediterranean">Mediterranean</SelectItem>
                    <SelectItem value="subtropical">Subtropical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  <Target className="h-4 w-4 mr-2" />
                  Update Recommendations
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {cropRecommendations.slice(0, 2).map((crop) => (
            <Card
              key={crop.id}
              className={`bg-gradient-to-br ${crop.color} text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300`}
            >
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <crop.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{crop.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Star className="h-4 w-4 text-yellow-300" />
                        <span className="text-white/90">Top Recommendation</span>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-white/20 text-white border-white/30 text-lg px-3 py-1">
                    {crop.suitability}% match
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-white/80 text-sm">Expected Yield</p>
                    <p className="text-xl font-bold">{crop.expectedYield}</p>
                  </div>
                  <div>
                    <p className="text-white/80 text-sm">ROI</p>
                    <p className="text-xl font-bold">{crop.roi}%</p>
                  </div>
                  <div>
                    <p className="text-white/80 text-sm">Growth Period</p>
                    <p className="text-xl font-bold">{crop.growthPeriod}</p>
                  </div>
                  <div>
                    <p className="text-white/80 text-sm">Profitability</p>
                    <p className="text-xl font-bold">{crop.profitability}</p>
                  </div>
                </div>

                <Progress value={crop.suitability} className="mb-6 bg-white/20" />

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-white/80 text-xs">Planting Window</p>
                    <p className="text-sm font-semibold">{crop.plantingWindow}</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-white/80 text-xs">Harvest Window</p>
                    <p className="text-sm font-semibold">{crop.harvestWindow}</p>
                  </div>
                </div>

                <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Select This Crop
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* All Recommendations */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span>All Crop Recommendations</span>
            </CardTitle>
            <CardDescription>Detailed analysis of all suitable crops for your conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {cropRecommendations.map((crop) => (
                <div
                  key={crop.id}
                  className="p-6 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Crop Info */}
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${crop.color} rounded-full flex items-center justify-center`}
                      >
                        <crop.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{crop.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className="bg-green-100 text-green-800">{crop.suitability}% match</Badge>
                          <Badge className={getRiskColor(crop.riskLevel)}>{crop.riskLevel} Risk</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Expected Yield</span>
                        <span className="font-semibold">{crop.expectedYield}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">ROI</span>
                        <span className={`font-semibold ${getROIColor(crop.roi)}`}>{crop.roi}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Market Demand</span>
                        <span className="font-semibold">{crop.marketDemand}</span>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-gray-600">Water: {crop.waterRequirement}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600">Soil: {crop.soilSuitability}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-purple-500" />
                        <span className="text-sm text-gray-600">{crop.growthPeriod}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                      <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                        <Target className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" className="w-full">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Cost Analysis
                      </Button>
                    </div>
                  </div>

                  {/* Advantages & Challenges */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-200">
                    <div>
                      <h4 className="font-semibold text-green-700 mb-3">Advantages</h4>
                      <ul className="space-y-2">
                        {crop.advantages.map((advantage, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>{advantage}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-700 mb-3">Challenges</h4>
                      <ul className="space-y-2">
                        {crop.challenges.map((challenge, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                            <Target className="h-4 w-4 text-orange-500" />
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendation Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-green-600" />
                <span>Best ROI</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600 mb-2">145%</p>
                <p className="text-gray-600">Winter Wheat</p>
                <p className="text-sm text-gray-500 mt-2">Highest return on investment</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Droplets className="h-6 w-6 text-blue-600" />
                <span>Water Efficient</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600 mb-2">Low</p>
                <p className="text-gray-600">Spring Barley</p>
                <p className="text-sm text-gray-500 mt-2">Minimal water requirements</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-purple-600" />
                <span>Quick Harvest</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600 mb-2">110</p>
                <p className="text-gray-600">Days - Lentils</p>
                <p className="text-sm text-gray-500 mt-2">Shortest growing season</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
