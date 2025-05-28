"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Cloud, Thermometer, Droplets, Wind, Sun, Gauge, CloudRain } from "lucide-react"

export default function WeatherPage() {
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 24,
    humidity: 65,
    windSpeed: 12,
    pressure: 1013,
    visibility: 10,
    uvIndex: 6,
    condition: "Partly Cloudy",
    feelsLike: 26,
    dewPoint: 18,
  })

  const [hourlyForecast, setHourlyForecast] = useState(
    Array.from({ length: 24 }, (_, i) => ({
      time: new Date(Date.now() + i * 60 * 60 * 1000).getHours(),
      temp: Math.round(20 + Math.random() * 10),
      humidity: Math.round(50 + Math.random() * 30),
      windSpeed: Math.round(5 + Math.random() * 15),
      condition: ["sunny", "cloudy", "rainy"][Math.floor(Math.random() * 3)],
    })),
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWeather((prev) => ({
        ...prev,
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() - 0.5) * 5)),
        windSpeed: Math.max(0, prev.windSpeed + (Math.random() - 0.5) * 3),
        pressure: prev.pressure + (Math.random() - 0.5) * 5,
      }))
    }, 10000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Weather Center</h1>
          <p className="text-gray-600">Real-time weather monitoring and forecasts for your farm</p>
        </div>

        {/* Current Weather */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="lg:col-span-2 bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">Current Weather</CardTitle>
              <CardDescription className="text-blue-100">Live conditions at your farm location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Thermometer className="h-12 w-12 mx-auto mb-2 text-blue-200" />
                  <p className="text-4xl font-bold">{Math.round(currentWeather.temperature)}°C</p>
                  <p className="text-blue-200">Temperature</p>
                  <p className="text-sm text-blue-300">Feels like {Math.round(currentWeather.feelsLike)}°C</p>
                </div>
                <div className="text-center">
                  <Droplets className="h-12 w-12 mx-auto mb-2 text-blue-200" />
                  <p className="text-4xl font-bold">{Math.round(currentWeather.humidity)}%</p>
                  <p className="text-blue-200">Humidity</p>
                  <p className="text-sm text-blue-300">Dew point {currentWeather.dewPoint}°C</p>
                </div>
                <div className="text-center">
                  <Wind className="h-12 w-12 mx-auto mb-2 text-blue-200" />
                  <p className="text-4xl font-bold">{Math.round(currentWeather.windSpeed)}</p>
                  <p className="text-blue-200">km/h</p>
                  <p className="text-sm text-blue-300">Wind Speed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sun className="h-6 w-6 text-orange-500" />
                  <span>UV Index</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">{currentWeather.uvIndex}</p>
                  <Progress value={(currentWeather.uvIndex / 11) * 100} className="mt-2" />
                  <Badge className="mt-2 bg-orange-100 text-orange-800">
                    {currentWeather.uvIndex <= 2
                      ? "Low"
                      : currentWeather.uvIndex <= 5
                        ? "Moderate"
                        : currentWeather.uvIndex <= 7
                          ? "High"
                          : "Very High"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gauge className="h-6 w-6 text-blue-500" />
                  <span>Pressure</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{Math.round(currentWeather.pressure)}</p>
                  <p className="text-gray-600">hPa</p>
                  <Badge variant="outline" className="mt-2">
                    {currentWeather.pressure > 1020 ? "High" : currentWeather.pressure > 1000 ? "Normal" : "Low"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Hourly Forecast */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mb-8">
          <CardHeader>
            <CardTitle>24-Hour Forecast</CardTitle>
            <CardDescription>Hourly weather predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="flex space-x-4 pb-4" style={{ minWidth: "1200px" }}>
                {hourlyForecast.slice(0, 12).map((hour, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 text-center p-4 rounded-lg bg-gradient-to-b from-blue-50 to-indigo-50 border border-blue-200"
                  >
                    <p className="text-sm font-medium text-gray-700">
                      {hour.time === 0 ? "12 AM" : hour.time <= 12 ? `${hour.time} AM` : `${hour.time - 12} PM`}
                    </p>
                    {hour.condition === "sunny" ? (
                      <Sun className="h-8 w-8 mx-auto my-2 text-yellow-500" />
                    ) : hour.condition === "cloudy" ? (
                      <Cloud className="h-8 w-8 mx-auto my-2 text-gray-500" />
                    ) : (
                      <CloudRain className="h-8 w-8 mx-auto my-2 text-blue-500" />
                    )}
                    <p className="text-lg font-bold text-gray-900">{hour.temp}°</p>
                    <p className="text-xs text-gray-600">{hour.humidity}%</p>
                    <p className="text-xs text-gray-600">{hour.windSpeed} km/h</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Sun className="h-12 w-12 text-yellow-200" />
                <div>
                  <h3 className="text-xl font-bold">Heat Advisory</h3>
                  <p className="text-yellow-100">High temperatures expected</p>
                  <p className="text-sm text-yellow-200 mt-2">Ensure adequate irrigation</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <CloudRain className="h-12 w-12 text-blue-200" />
                <div>
                  <h3 className="text-xl font-bold">Rain Forecast</h3>
                  <p className="text-blue-100">Precipitation in 6 hours</p>
                  <p className="text-sm text-blue-200 mt-2">15mm expected rainfall</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Wind className="h-12 w-12 text-purple-200" />
                <div>
                  <h3 className="text-xl font-bold">Wind Warning</h3>
                  <p className="text-purple-100">Strong winds expected</p>
                  <p className="text-sm text-purple-200 mt-2">Secure equipment and structures</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
