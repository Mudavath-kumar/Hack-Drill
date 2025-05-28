"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Satellite,
  Camera,
  Leaf,
  Bug,
  Droplets,
  Thermometer,
  Activity,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Calendar,
  TrendingUp,
  Eye,
  Target,
  Radio,
  BarChart3,
  Shield,
  Sprout,
} from "lucide-react"

export default function FieldMonitoringPage() {
  const [selectedField, setSelectedField] = useState("north-field")
  const [isScanning, setIsScanning] = useState(false)
  const [lastScanTime, setLastScanTime] = useState(new Date())

  const [fieldData, setFieldData] = useState({
    "north-field": {
      name: "North Field",
      crop: "Winter Wheat",
      area: 45.2,
      plantingDate: "2024-09-15",
      expectedHarvest: "2024-07-20",
      health: 92,
      moisture: 78,
      temperature: 24.5,
      growth: "Flowering Stage",
      ndvi: 0.82,
      issues: [],
      lastUpdate: "2 minutes ago",
      coordinates: { lat: 40.7128, lng: -74.006 },
      zones: [
        { id: 1, name: "Zone A", health: 95, moisture: 82, area: 12.3 },
        { id: 2, name: "Zone B", health: 89, moisture: 75, area: 15.1 },
        { id: 3, name: "Zone C", health: 91, moisture: 77, area: 17.8 },
      ],
    },
    "south-field": {
      name: "South Field",
      crop: "Corn",
      area: 38.7,
      plantingDate: "2024-04-20",
      expectedHarvest: "2024-09-15",
      health: 87,
      moisture: 65,
      temperature: 26.2,
      growth: "Vegetative Growth",
      ndvi: 0.75,
      issues: [{ type: "pest", severity: "medium", description: "Aphid population detected in southeast corner" }],
      lastUpdate: "5 minutes ago",
      coordinates: { lat: 40.71, lng: -74.008 },
      zones: [
        { id: 1, name: "Zone A", health: 92, moisture: 70, area: 13.2 },
        { id: 2, name: "Zone B", health: 82, moisture: 60, area: 12.8 },
        { id: 3, name: "Zone C", health: 87, moisture: 65, area: 12.7 },
      ],
    },
    "east-field": {
      name: "East Field",
      crop: "Soybeans",
      area: 52.1,
      plantingDate: "2024-05-10",
      expectedHarvest: "2024-10-05",
      health: 95,
      moisture: 82,
      temperature: 23.8,
      growth: "Reproductive Stage",
      ndvi: 0.88,
      issues: [],
      lastUpdate: "1 minute ago",
      coordinates: { lat: 40.715, lng: -74.004 },
      zones: [
        { id: 1, name: "Zone A", health: 97, moisture: 85, area: 18.4 },
        { id: 2, name: "Zone B", health: 93, moisture: 79, area: 16.7 },
        { id: 3, name: "Zone C", health: 95, moisture: 82, area: 17.0 },
      ],
    },
  })

  const [satelliteData, setSatelliteData] = useState({
    lastCapture: "2024-01-15T10:30:00Z",
    resolution: "3m per pixel",
    cloudCover: 5,
    quality: "Excellent",
    nextPass: "2024-01-16T14:45:00Z",
  })

  const [diseaseDetection, setDiseaseDetection] = useState([
    {
      id: 1,
      field: "south-field",
      zone: "Zone B",
      disease: "Aphid Infestation",
      confidence: 94,
      severity: "Medium",
      location: { lat: 40.7095, lng: -74.0085 },
      detectedAt: "2024-01-15T08:15:00Z",
      treatment: "Apply targeted insecticide",
      status: "Active",
    },
  ])

  const currentField = fieldData[selectedField]

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFieldData((prev) => {
        const updated = { ...prev }
        Object.keys(updated).forEach((fieldId) => {
          updated[fieldId] = {
            ...updated[fieldId],
            health: Math.max(70, Math.min(100, updated[fieldId].health + (Math.random() - 0.5) * 2)),
            moisture: Math.max(40, Math.min(100, updated[fieldId].moisture + (Math.random() - 0.5) * 3)),
            temperature: Math.max(15, Math.min(35, updated[fieldId].temperature + (Math.random() - 0.5) * 1)),
            ndvi: Math.max(0.3, Math.min(1.0, updated[fieldId].ndvi + (Math.random() - 0.5) * 0.02)),
          }
        })
        return updated
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleSatelliteScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      setLastScanTime(new Date())
    }, 3000)
  }

  const getHealthColor = (health) => {
    if (health >= 90) return "text-green-600"
    if (health >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  const getHealthBadge = (health) => {
    if (health >= 90) return "bg-green-100 text-green-800"
    if (health >= 75) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Field Monitoring Center</h1>
          <p className="text-gray-600">Real-time crop health monitoring and satellite analysis</p>
          <div className="flex items-center space-x-4 mt-4">
            <Badge className="bg-green-100 text-green-800">
              <Satellite className="h-3 w-3 mr-1" />
              Satellite Active
            </Badge>
            <Badge className="bg-blue-100 text-blue-800">
              <Radio className="h-3 w-3 mr-1" />
              Live Sensors
            </Badge>
            <Badge className="bg-purple-100 text-purple-800">
              <Activity className="h-3 w-3 mr-1" />
              AI Analysis
            </Badge>
          </div>
        </div>

        {/* Field Selector */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mb-8">
          <CardHeader>
            <CardTitle>Select Field</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(fieldData).map(([fieldId, field]) => (
                <Button
                  key={fieldId}
                  variant={selectedField === fieldId ? "default" : "outline"}
                  className={`p-6 h-auto flex-col space-y-2 ${
                    selectedField === fieldId
                      ? "bg-gradient-to-r from-green-600 to-blue-600 text-white"
                      : "hover:bg-green-50"
                  }`}
                  onClick={() => setSelectedField(fieldId)}
                >
                  <div className="flex items-center space-x-2">
                    <Sprout className="h-5 w-5" />
                    <span className="font-semibold">{field.name}</span>
                  </div>
                  <div className="text-sm opacity-80">
                    {field.crop} • {field.area} acres
                  </div>
                  <Badge className={`${getHealthBadge(field.health)} text-xs`}>{field.health}% Health</Badge>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Field Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Crop Health</p>
                  <p className="text-3xl font-bold">{currentField.health}%</p>
                  <p className="text-sm text-green-200">NDVI: {currentField.ndvi.toFixed(2)}</p>
                </div>
                <Leaf className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Soil Moisture</p>
                  <p className="text-3xl font-bold">{currentField.moisture}%</p>
                  <p className="text-sm text-blue-200">Optimal range</p>
                </div>
                <Droplets className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Temperature</p>
                  <p className="text-3xl font-bold">{currentField.temperature.toFixed(1)}°C</p>
                  <p className="text-sm text-orange-200">Field average</p>
                </div>
                <Thermometer className="h-12 w-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-violet-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Growth Stage</p>
                  <p className="text-lg font-bold">{currentField.growth}</p>
                  <p className="text-sm text-purple-200">{currentField.area} acres</p>
                </div>
                <Sprout className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="satellite">Satellite</TabsTrigger>
            <TabsTrigger value="zones">Field Zones</TabsTrigger>
            <TabsTrigger value="diseases">Disease Detection</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Field Information */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-6 w-6 text-green-600" />
                    <span>Field Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Crop Type</p>
                      <p className="font-semibold">{currentField.crop}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Area</p>
                      <p className="font-semibold">{currentField.area} acres</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Planting Date</p>
                      <p className="font-semibold">{new Date(currentField.plantingDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Expected Harvest</p>
                      <p className="font-semibold">{new Date(currentField.expectedHarvest).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Coordinates</p>
                    <p className="font-mono text-sm">
                      {currentField.coordinates.lat.toFixed(4)}, {currentField.coordinates.lng.toFixed(4)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Real-time Metrics */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-6 w-6 text-blue-600" />
                    <span>Real-time Metrics</span>
                    <Badge className="bg-green-100 text-green-800">Live</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Crop Health Index</span>
                      <span className={`font-semibold ${getHealthColor(currentField.health)}`}>
                        {currentField.health}%
                      </span>
                    </div>
                    <Progress value={currentField.health} className="h-3" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Soil Moisture</span>
                      <span className="font-semibold text-blue-600">{currentField.moisture}%</span>
                    </div>
                    <Progress value={currentField.moisture} className="h-3" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">NDVI Score</span>
                      <span className="font-semibold text-green-600">{currentField.ndvi.toFixed(2)}</span>
                    </div>
                    <Progress value={currentField.ndvi * 100} className="h-3" />
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500">Last updated: {currentField.lastUpdate}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Issues and Alerts */}
            {currentField.issues.length > 0 && (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                    <span>Active Issues</span>
                    <Badge className="bg-red-100 text-red-800">{currentField.issues.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentField.issues.map((issue, index) => (
                      <Alert key={index} className="border-red-200 bg-red-50">
                        <Bug className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-800">
                          <strong>{issue.type.charAt(0).toUpperCase() + issue.type.slice(1)} Alert:</strong>{" "}
                          {issue.description}
                          <Button size="sm" className="ml-4 bg-red-600 hover:bg-red-700 text-white">
                            Take Action
                          </Button>
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="satellite" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Satellite className="h-6 w-6 text-blue-600" />
                      <span>Satellite Imagery</span>
                      <Badge className="bg-blue-100 text-blue-800">{satelliteData.quality}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center mb-6">
                      <div className="text-center">
                        <Satellite className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Satellite Image Placeholder</p>
                        <p className="text-sm text-gray-500">Resolution: {satelliteData.resolution}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        onClick={handleSatelliteScan}
                        disabled={isScanning}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {isScanning ? (
                          <>
                            <Activity className="h-4 w-4 mr-2 animate-spin" />
                            Scanning...
                          </>
                        ) : (
                          <>
                            <Satellite className="h-4 w-4 mr-2" />
                            Request New Scan
                          </>
                        )}
                      </Button>
                      <Button variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View History
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle>Satellite Data</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Last Capture</p>
                      <p className="font-semibold">{new Date(satelliteData.lastCapture).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Cloud Cover</p>
                      <p className="font-semibold">{satelliteData.cloudCover}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Next Pass</p>
                      <p className="font-semibold">{new Date(satelliteData.nextPass).toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle>Analysis Tools</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      NDVI Analysis
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Growth Tracking
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Target className="h-4 w-4 mr-2" />
                      Yield Prediction
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="zones" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-6 w-6 text-green-600" />
                  <span>Field Zone Analysis</span>
                </CardTitle>
                <CardDescription>Detailed monitoring of individual field zones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {currentField.zones.map((zone) => (
                    <Card key={zone.id} className="border-2 border-gray-200 hover:border-green-300 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">{zone.name}</h3>
                          <Badge className={getHealthBadge(zone.health)}>{zone.health}%</Badge>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">Health</span>
                              <span className={`font-semibold ${getHealthColor(zone.health)}`}>{zone.health}%</span>
                            </div>
                            <Progress value={zone.health} className="h-2" />
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">Moisture</span>
                              <span className="font-semibold text-blue-600">{zone.moisture}%</span>
                            </div>
                            <Progress value={zone.moisture} className="h-2" />
                          </div>

                          <div className="pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600">Area: {zone.area} acres</p>
                          </div>
                        </div>

                        <div className="mt-4 space-y-2">
                          <Button size="sm" variant="outline" className="w-full">
                            <Camera className="h-4 w-4 mr-2" />
                            View Images
                          </Button>
                          <Button size="sm" variant="outline" className="w-full">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Zone Analytics
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="diseases" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bug className="h-6 w-6 text-red-600" />
                  <span>AI Disease Detection</span>
                  <Badge className="bg-purple-100 text-purple-800">AI-Powered</Badge>
                </CardTitle>
                <CardDescription>Computer vision analysis for early disease and pest detection</CardDescription>
              </CardHeader>
              <CardContent>
                {diseaseDetection.length > 0 ? (
                  <div className="space-y-6">
                    {diseaseDetection.map((detection) => (
                      <div key={detection.id} className="p-6 rounded-lg border-2 border-red-200 bg-red-50">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-red-800">{detection.disease}</h3>
                            <p className="text-sm text-red-600">
                              {fieldData[detection.field].name} - {detection.zone}
                            </p>
                          </div>
                          <Badge className="bg-red-100 text-red-800">{detection.confidence}% Confidence</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Severity</p>
                            <p className="font-semibold text-red-700">{detection.severity}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Detected</p>
                            <p className="font-semibold">{new Date(detection.detectedAt).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Status</p>
                            <Badge className="bg-yellow-100 text-yellow-800">{detection.status}</Badge>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-2">Recommended Treatment</p>
                          <p className="font-semibold text-gray-900">{detection.treatment}</p>
                        </div>

                        <div className="flex space-x-4">
                          <Button className="bg-red-600 hover:bg-red-700">
                            <Shield className="h-4 w-4 mr-2" />
                            Apply Treatment
                          </Button>
                          <Button variant="outline">
                            <Camera className="h-4 w-4 mr-2" />
                            View Images
                          </Button>
                          <Button variant="outline">
                            <MapPin className="h-4 w-4 mr-2" />
                            Show Location
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Issues Detected</h3>
                    <p className="text-gray-600">Your crops are healthy! AI monitoring is active.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                    <span>Growth Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Growth Analytics Chart</p>
                      <p className="text-sm text-gray-500">30-day trend analysis</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-6 w-6 text-blue-600" />
                    <span>Yield Predictions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Expected Yield</span>
                        <span className="font-semibold text-green-600">4.2 tons/hectare</span>
                      </div>
                      <Progress value={85} className="h-3" />
                      <p className="text-xs text-gray-500 mt-1">85% of optimal conditions</p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Quality Score</span>
                        <span className="font-semibold text-blue-600">92/100</span>
                      </div>
                      <Progress value={92} className="h-3" />
                      <p className="text-xs text-gray-500 mt-1">Premium grade expected</p>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-2">Harvest Readiness</p>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          Estimated: {new Date(currentField.expectedHarvest).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
