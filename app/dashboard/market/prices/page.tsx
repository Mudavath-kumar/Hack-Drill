"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRealTimeMarket } from "@/lib/market-service"
import { TrendingUp, TrendingDown, BarChart3, Activity, Target, Bell } from "lucide-react"

export default function MarketPricesPage() {
  const { marketPrices } = useRealTimeMarket()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Market Prices</h1>
          <p className="text-gray-600">Real-time commodity prices and market data</p>
          <Badge className="mt-2 bg-green-100 text-green-800">
            <Activity className="h-3 w-3 mr-1" />
            Live Updates Every 5 Seconds
          </Badge>
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
                <BarChart3 className="h-12 w-12 text-green-200" />
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
                <Activity className="h-12 w-12 text-blue-200" />
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
                <Bell className="h-12 w-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Prices Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {marketPrices.map((item, index) => (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">{item.crop[0]}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{item.crop}</h3>
                      <p className="text-sm text-gray-600">Volume: {item.volume}</p>
                      <p className="text-xs text-gray-500">Last updated: {item.lastUpdate.toLocaleTimeString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold text-gray-900">${Math.round(item.price)}</p>
                    <p className="text-sm text-gray-600">per ton</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                    <p className="text-sm text-gray-600">24h High</p>
                    <p className="text-xl font-bold text-green-600">${item.high}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-gradient-to-r from-red-50 to-orange-50 border border-red-200">
                    <p className="text-sm text-gray-600">24h Low</p>
                    <p className="text-xl font-bold text-red-600">${item.low}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={item.change > 0 ? "default" : "destructive"}
                      className={`${item.change > 0 ? "bg-green-100 text-green-800" : ""} flex items-center space-x-1`}
                    >
                      {item.change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      <span>
                        {item.change > 0 ? "+" : ""}${item.change.toFixed(2)}
                      </span>
                    </Badge>
                    <Badge
                      variant={item.changePercent > 0 ? "default" : "destructive"}
                      className={item.changePercent > 0 ? "bg-green-100 text-green-800" : ""}
                    >
                      {item.changePercent > 0 ? "+" : ""}
                      {item.changePercent.toFixed(2)}%
                    </Badge>
                  </div>
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
                    {item.forecast.toUpperCase()}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Chart
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Bell className="h-4 w-4 mr-2" />
                    Set Alert
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Market Movers */}
        <Card className="mt-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <span>Top Market Movers</span>
            </CardTitle>
            <CardDescription>Biggest price changes in the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-600 mb-4">Top Gainers</h3>
                <div className="space-y-3">
                  {marketPrices
                    .filter((item) => item.changePercent > 0)
                    .sort((a, b) => b.changePercent - a.changePercent)
                    .slice(0, 3)
                    .map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-semibold text-gray-900">{item.crop}</p>
                            <p className="text-sm text-gray-600">${Math.round(item.price)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">+{item.changePercent.toFixed(2)}%</p>
                          <p className="text-sm text-gray-600">+${item.change.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-red-600 mb-4">Top Losers</h3>
                <div className="space-y-3">
                  {marketPrices
                    .filter((item) => item.changePercent < 0)
                    .sort((a, b) => a.changePercent - b.changePercent)
                    .slice(0, 3)
                    .map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-200"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-semibold text-gray-900">{item.crop}</p>
                            <p className="text-sm text-gray-600">${Math.round(item.price)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-red-600">{item.changePercent.toFixed(2)}%</p>
                          <p className="text-sm text-gray-600">${item.change.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
