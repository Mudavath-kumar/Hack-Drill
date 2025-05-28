"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Globe, Calendar, Target, AlertCircle } from "lucide-react"

export default function MarketPage() {
  const [marketData, setMarketData] = useState([
    {
      crop: "Wheat",
      price: 245,
      change: +5.2,
      volume: "2.3M tons",
      high: 250,
      low: 235,
      forecast: "bullish",
    },
    {
      crop: "Corn",
      price: 189,
      change: -2.1,
      volume: "4.1M tons",
      high: 195,
      low: 185,
      forecast: "bearish",
    },
    {
      crop: "Soybeans",
      price: 567,
      change: +8.7,
      volume: "1.8M tons",
      high: 575,
      low: 520,
      forecast: "bullish",
    },
    {
      crop: "Rice",
      price: 423,
      change: +3.4,
      volume: "3.2M tons",
      high: 430,
      low: 410,
      forecast: "neutral",
    },
    {
      crop: "Barley",
      price: 198,
      change: -1.8,
      volume: "1.5M tons",
      high: 205,
      low: 195,
      forecast: "neutral",
    },
    {
      crop: "Oats",
      price: 156,
      change: +4.2,
      volume: "0.8M tons",
      high: 160,
      low: 150,
      forecast: "bullish",
    },
  ])

  const [newsItems] = useState([
    {
      title: "Global wheat production expected to increase by 3% this year",
      time: "2 hours ago",
      impact: "positive",
      crops: ["Wheat"],
    },
    {
      title: "Drought conditions affecting corn yields in major regions",
      time: "4 hours ago",
      impact: "negative",
      crops: ["Corn"],
    },
    {
      title: "Strong demand for soybeans from Asian markets",
      time: "6 hours ago",
      impact: "positive",
      crops: ["Soybeans"],
    },
    {
      title: "New trade agreements boost agricultural exports",
      time: "8 hours ago",
      impact: "positive",
      crops: ["Wheat", "Corn", "Soybeans"],
    },
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setMarketData((prev) =>
        prev.map((item) => ({
          ...item,
          price: Math.max(100, item.price + (Math.random() - 0.5) * 10),
          change: (Math.random() - 0.5) * 20,
        })),
      )
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Market Center</h1>
          <p className="text-gray-600">Real-time commodity prices and market analysis</p>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Market Cap</p>
                  <p className="text-2xl font-bold">$2.4T</p>
                  <p className="text-sm text-green-200">+2.3% today</p>
                </div>
                <Globe className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Trading Volume</p>
                  <p className="text-2xl font-bold">15.2M</p>
                  <p className="text-sm text-blue-200">tons today</p>
                </div>
                <BarChart3 className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Active Contracts</p>
                  <p className="text-2xl font-bold">8,456</p>
                  <p className="text-sm text-purple-200">+156 today</p>
                </div>
                <Target className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Price Alerts</p>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-orange-200">active alerts</p>
                </div>
                <AlertCircle className="h-12 w-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Prices */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-6 w-6 text-green-600" />
                  <span>Live Commodity Prices</span>
                </CardTitle>
                <CardDescription>Real-time market data updated every 5 seconds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{item.crop[0]}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{item.crop}</h3>
                          <p className="text-sm text-gray-600">Volume: {item.volume}</p>
                          <p className="text-xs text-gray-500">
                            H: ${item.high} L: ${item.low}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-3xl font-bold text-gray-900">${Math.round(item.price)}</p>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={item.change > 0 ? "default" : "destructive"}
                            className={`${item.change > 0 ? "bg-green-100 text-green-800" : ""} flex items-center space-x-1`}
                          >
                            {item.change > 0 ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            <span>
                              {item.change > 0 ? "+" : ""}
                              {item.change.toFixed(1)}%
                            </span>
                          </Badge>
                          <Badge
                            variant="outline"
                            className={
                              item.forecast === "bullish"
                                ? "border-green-500 text-green-700"
                                : item.forecast === "bearish"
                                  ? "border-red-500 text-red-700"
                                  : "border-gray-500 text-gray-700"
                            }
                          >
                            {item.forecast}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Market News */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                  <span>Market News</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {newsItems.map((news, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-l-4 ${
                        news.impact === "positive"
                          ? "bg-green-50 border-green-500"
                          : news.impact === "negative"
                            ? "bg-red-50 border-red-500"
                            : "bg-blue-50 border-blue-500"
                      }`}
                    >
                      <h4 className="font-medium text-gray-900 text-sm leading-tight">{news.title}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-gray-500">{news.time}</p>
                        <div className="flex space-x-1">
                          {news.crops.map((crop, cropIndex) => (
                            <Badge key={cropIndex} variant="outline" className="text-xs">
                              {crop}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Price Alerts */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Price Alerts</CardTitle>
                <CardDescription>Set alerts for price movements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Create Alert
                </Button>

                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-sm">Wheat &gt; $250</p>
                        <p className="text-xs text-gray-600">Target price alert</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Active</Badge>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-sm">Corn &lt; $180</p>
                        <p className="text-xs text-gray-600">Buy opportunity</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trading Tools */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Trading Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Futures Calendar
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Technical Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Market Trends
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  Global Markets
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
