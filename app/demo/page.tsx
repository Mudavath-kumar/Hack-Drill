"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Cloud, TrendingUp, Thermometer, Droplets, Wind, DollarSign, ArrowRight, Play } from "lucide-react"

export default function DemoPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [demoStep, setDemoStep] = useState(0)

  const demoSteps = [
    "Real-time Weather Monitoring",
    "Live Market Price Tracking",
    "Personalized Crop Recommendations",
    "Pest & Disease Alerts",
    "Yield Predictions & Analytics",
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    const stepTimer = setInterval(() => {
      setDemoStep((prev) => (prev + 1) % demoSteps.length)
    }, 3000)

    return () => {
      clearInterval(timer)
      clearInterval(stepTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                FarmWise Demo
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Demo Banner */}
        <Card className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Play className="h-8 w-8" />
              <h1 className="text-3xl font-bold">Live Demo Dashboard</h1>
            </div>
            <p className="text-xl text-blue-100 mb-6">
              Experience the power of smart farming with real-time data simulation
            </p>
            <div className="bg-white/20 rounded-lg p-4 inline-block">
              <p className="text-lg font-semibold">Currently Demonstrating:</p>
              <p className="text-2xl font-bold">{demoSteps[demoStep]}</p>
            </div>
          </CardContent>
        </Card>

        {/* Live Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Temperature</p>
                  <p className="text-3xl font-bold">{Math.round(24 + Math.sin(Date.now() / 10000) * 3)}°C</p>
                  <p className="text-sm text-blue-200">Live Update</p>
                </div>
                <Thermometer className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Humidity</p>
                  <p className="text-3xl font-bold">{Math.round(65 + Math.cos(Date.now() / 8000) * 10)}%</p>
                  <p className="text-sm text-green-200">Optimal Range</p>
                </div>
                <Droplets className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Wind Speed</p>
                  <p className="text-3xl font-bold">{Math.round(12 + Math.sin(Date.now() / 6000) * 5)} km/h</p>
                  <p className="text-sm text-purple-200">Gentle Breeze</p>
                </div>
                <Wind className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Wheat Price</p>
                  <p className="text-3xl font-bold">${Math.round(245 + Math.sin(Date.now() / 12000) * 15)}</p>
                  <p className="text-sm text-orange-200">Per Ton</p>
                </div>
                <DollarSign className="h-12 w-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weather Demo */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cloud className="h-6 w-6 text-blue-600" />
                <span>Weather Monitoring</span>
                <Badge className="bg-green-100 text-green-800">Live</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Current Conditions</h3>
                  <p className="text-sm text-gray-600">
                    Perfect weather for spring planting. Temperature and humidity levels are optimal for seed
                    germination.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
                  <h3 className="font-semibold text-gray-900 mb-2">7-Day Forecast</h3>
                  <p className="text-sm text-gray-600">
                    Sunny conditions expected with occasional light rain. Ideal for crop growth and field operations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Demo */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-green-600" />
                <span>Market Trends</span>
                <Badge className="bg-blue-100 text-blue-800">Real-time</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { crop: "Wheat", price: 245, change: +5.2 },
                  { crop: "Corn", price: 189, change: -2.1 },
                  { crop: "Soybeans", price: 567, change: +8.7 },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.crop}</h3>
                      <p className="text-2xl font-bold text-gray-900">${item.price}/ton</p>
                    </div>
                    <Badge
                      variant={item.change > 0 ? "default" : "destructive"}
                      className={item.change > 0 ? "bg-green-100 text-green-800" : ""}
                    >
                      {item.change > 0 ? "+" : ""}
                      {item.change.toFixed(1)}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 text-white border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Farm?</h2>
            <p className="text-xl text-green-100 mb-6">
              This is just a preview. Get access to the full dashboard with personalized recommendations for your farm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-4 border-white text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
