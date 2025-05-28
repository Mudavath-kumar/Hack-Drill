"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRealTimeWeather } from "@/lib/weather-service"
import { Sun, Cloud, CloudRain, Calendar, TrendingUp, TrendingDown, Droplets, Wind } from "lucide-react"

export default function WeatherForecastPage() {
  const { forecast } = useRealTimeWeather()

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-8 w-8 text-blue-500" />
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "sunny":
        return "from-yellow-400 to-orange-500"
      case "cloudy":
        return "from-gray-400 to-gray-600"
      case "rainy":
        return "from-blue-400 to-indigo-600"
      default:
        return "from-yellow-400 to-orange-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">7-Day Weather Forecast</h1>
          <p className="text-gray-600">Extended weather outlook for farm planning</p>
        </div>

        {/* Weekly Overview */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-blue-600" />
              <span>Weekly Overview</span>
            </CardTitle>
            <CardDescription>Detailed 7-day weather forecast</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
              {forecast.map((day, index) => (
                <Card
                  key={index}
                  className={`bg-gradient-to-br ${getConditionColor(day.condition)} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-bold mb-2">{day.day}</h3>
                    <div className="mb-4">{getWeatherIcon(day.condition)}</div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold">{day.high}°</span>
                        <span className="text-lg opacity-80">{day.low}°</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm">
                        <Droplets className="h-4 w-4" />
                        <span>{day.precipitation}%</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm">
                        <Wind className="h-4 w-4" />
                        <span>{day.windSpeed} km/h</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Daily Forecasts */}
        <div className="space-y-6">
          {forecast.map((day, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                  <div className="flex items-center space-x-4">
                    <div className={`p-4 rounded-full bg-gradient-to-br ${getConditionColor(day.condition)}`}>
                      {getWeatherIcon(day.condition)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{day.day}</h3>
                      <p className="text-gray-600">{day.date}</p>
                      <p className="text-sm text-gray-500 capitalize">{day.condition}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">High</p>
                      <p className="text-3xl font-bold text-red-600">{day.high}°C</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Low</p>
                      <p className="text-3xl font-bold text-blue-600">{day.low}°C</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-gray-600">Rain</span>
                      </div>
                      <p className="text-xl font-bold text-blue-600">{day.precipitation}%</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Wind className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Wind</span>
                      </div>
                      <p className="text-xl font-bold text-gray-600">{day.windSpeed} km/h</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Badge
                      variant={
                        day.precipitation < 20 ? "default" : day.precipitation < 60 ? "secondary" : "destructive"
                      }
                      className={
                        day.precipitation < 20
                          ? "bg-green-100 text-green-800"
                          : day.precipitation < 60
                            ? "bg-yellow-100 text-yellow-800"
                            : ""
                      }
                    >
                      {day.precipitation < 20
                        ? "Good for fieldwork"
                        : day.precipitation < 60
                          ? "Monitor conditions"
                          : "Avoid field operations"}
                    </Badge>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      {day.high > 25 ? (
                        <TrendingUp className="h-4 w-4 text-red-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-blue-500" />
                      )}
                      <span>{day.high > 25 ? "Warm day" : day.high > 15 ? "Mild day" : "Cool day"}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Farming Recommendations */}
        <Card className="mt-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle>Weekly Farming Recommendations</CardTitle>
            <CardDescription>Based on weather forecast</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">Best Days for Planting</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {forecast
                    .filter((day) => day.precipitation < 20 && day.high < 30)
                    .map((day) => day.day)
                    .join(", ") || "Monitor conditions"}
                </p>
                <Badge className="bg-green-100 text-green-800">Optimal Conditions</Badge>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">Irrigation Planning</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {forecast.some((day) => day.precipitation > 60)
                    ? "Reduce irrigation - rain expected"
                    : "Maintain regular irrigation schedule"}
                </p>
                <Badge className="bg-blue-100 text-blue-800">Water Management</Badge>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2">Pest Management</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {forecast.some((day) => day.humidity > 70)
                    ? "Monitor for fungal diseases - high humidity"
                    : "Good conditions for pest control"}
                </p>
                <Badge className="bg-yellow-100 text-yellow-800">Crop Protection</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
