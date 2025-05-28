"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useRealTimeWeather } from "@/lib/weather-service"
import { Thermometer, Droplets, Wind, Eye, Gauge, Sun, Cloud, Compass, CloudRain, Activity } from "lucide-react"

export default function CurrentWeatherPage() {
  const { currentWeather } = useRealTimeWeather()

  const getUVLevel = (index: number) => {
    if (index <= 2) return { level: "Low", color: "bg-green-500" }
    if (index <= 5) return { level: "Moderate", color: "bg-yellow-500" }
    if (index <= 7) return { level: "High", color: "bg-orange-500" }
    if (index <= 10) return { level: "Very High", color: "bg-red-500" }
    return { level: "Extreme", color: "bg-purple-500" }
  }

  const getPressureStatus = (pressure: number) => {
    if (pressure > 1020) return { status: "High", color: "text-blue-600" }
    if (pressure > 1000) return { status: "Normal", color: "text-green-600" }
    return { status: "Low", color: "text-orange-600" }
  }

  const uvLevel = getUVLevel(currentWeather.uvIndex)
  const pressureStatus = getPressureStatus(currentWeather.pressure)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Current Weather Conditions</h1>
          <p className="text-gray-600">Real-time weather data for your farm location</p>
          <Badge className="mt-2 bg-green-100 text-green-800">
            <Activity className="h-3 w-3 mr-1" />
            Live Updates
          </Badge>
        </div>

        {/* Main Weather Display */}
        <Card className="mb-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 shadow-2xl">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="text-center lg:text-left">
                <h2 className="text-6xl font-bold mb-2">{Math.round(currentWeather.temperature)}°C</h2>
                <p className="text-2xl text-blue-100 mb-2">{currentWeather.condition}</p>
                <p className="text-blue-200">Feels like {Math.round(currentWeather.feelsLike)}°C</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <Droplets className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                  <p className="text-2xl font-bold">{Math.round(currentWeather.humidity)}%</p>
                  <p className="text-blue-200">Humidity</p>
                </div>
                <div className="text-center">
                  <Wind className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                  <p className="text-2xl font-bold">{Math.round(currentWeather.windSpeed)}</p>
                  <p className="text-blue-200">km/h {currentWeather.windDirection}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <CloudRain className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                  <p className="text-2xl font-bold">{Math.round(currentWeather.precipitation)}%</p>
                  <p className="text-blue-200">Precipitation</p>
                </div>
                <div className="text-center">
                  <Cloud className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                  <p className="text-2xl font-bold">{Math.round(currentWeather.cloudCover)}%</p>
                  <p className="text-blue-200">Cloud Cover</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sun className="h-6 w-6 text-orange-500" />
                <span>UV Index</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold text-orange-600 mb-2">{currentWeather.uvIndex.toFixed(1)}</p>
                <Progress value={(currentWeather.uvIndex / 11) * 100} className="mb-3" />
                <Badge className={`${uvLevel.color} text-white`}>{uvLevel.level}</Badge>
                <p className="text-sm text-gray-600 mt-2">
                  {uvLevel.level === "Low" && "Minimal protection required"}
                  {uvLevel.level === "Moderate" && "Some protection recommended"}
                  {uvLevel.level === "High" && "Protection essential"}
                  {uvLevel.level === "Very High" && "Extra protection required"}
                  {uvLevel.level === "Extreme" && "Avoid sun exposure"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gauge className="h-6 w-6 text-blue-500" />
                <span>Atmospheric Pressure</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold text-blue-600 mb-2">{Math.round(currentWeather.pressure)}</p>
                <p className="text-gray-600 mb-3">hPa</p>
                <Badge className={`${pressureStatus.color} bg-opacity-10`}>{pressureStatus.status}</Badge>
                <p className="text-sm text-gray-600 mt-2">
                  {pressureStatus.status === "High" && "Stable weather expected"}
                  {pressureStatus.status === "Normal" && "Typical conditions"}
                  {pressureStatus.status === "Low" && "Weather changes possible"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-6 w-6 text-gray-500" />
                <span>Visibility</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold text-gray-600 mb-2">{currentWeather.visibility}</p>
                <p className="text-gray-600 mb-3">km</p>
                <Badge variant="outline">
                  {currentWeather.visibility >= 10
                    ? "Excellent"
                    : currentWeather.visibility >= 5
                      ? "Good"
                      : currentWeather.visibility >= 2
                        ? "Moderate"
                        : "Poor"}
                </Badge>
                <p className="text-sm text-gray-600 mt-2">Clear visibility for field operations</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Thermometer className="h-6 w-6 text-red-500" />
                <span>Temperature Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Current Temperature</span>
                <span className="font-semibold">{Math.round(currentWeather.temperature)}°C</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Feels Like</span>
                <span className="font-semibold">{Math.round(currentWeather.feelsLike)}°C</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Dew Point</span>
                <span className="font-semibold">{Math.round(currentWeather.dewPoint)}°C</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Heat Index</span>
                <span className="font-semibold">{currentWeather.temperature > 27 ? "Caution" : "Normal"}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Compass className="h-6 w-6 text-green-500" />
                <span>Wind Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Wind Speed</span>
                <span className="font-semibold">{Math.round(currentWeather.windSpeed)} km/h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Wind Direction</span>
                <span className="font-semibold">{currentWeather.windDirection}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Wind Category</span>
                <span className="font-semibold">
                  {currentWeather.windSpeed < 6
                    ? "Calm"
                    : currentWeather.windSpeed < 20
                      ? "Light Breeze"
                      : currentWeather.windSpeed < 40
                        ? "Moderate Wind"
                        : "Strong Wind"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Farming Impact</span>
                <span className="font-semibold">
                  {currentWeather.windSpeed < 15
                    ? "Ideal"
                    : currentWeather.windSpeed < 30
                      ? "Caution"
                      : "Avoid Spraying"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
