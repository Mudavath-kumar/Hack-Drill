"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRealTimeMarket } from "@/lib/market-service"
import {
  Newspaper,
  TrendingUp,
  TrendingDown,
  Globe,
  Clock,
  ExternalLink,
  Filter,
  Search,
  BookmarkPlus,
} from "lucide-react"

export default function MarketNewsPage() {
  const { marketNews } = useRealTimeMarket()

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "positive":
        return "bg-green-100 text-green-800 border-green-200"
      case "negative":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "positive":
        return <TrendingUp className="h-4 w-4" />
      case "negative":
        return <TrendingDown className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Market News & Analysis</h1>
          <p className="text-gray-600">Stay updated with the latest agricultural market developments</p>
          <div className="flex items-center space-x-4 mt-4">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* News Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-green-200" />
              <h3 className="text-2xl font-bold mb-2">24</h3>
              <p className="text-green-100">Positive News</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-pink-600 text-white border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <TrendingDown className="h-12 w-12 mx-auto mb-4 text-red-200" />
              <h3 className="text-2xl font-bold mb-2">8</h3>
              <p className="text-red-100">Market Concerns</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <Globe className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-2xl font-bold mb-2">15</h3>
              <p className="text-blue-100">Global Updates</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-violet-600 text-white border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <Newspaper className="h-12 w-12 mx-auto mb-4 text-purple-200" />
              <h3 className="text-2xl font-bold mb-2">47</h3>
              <p className="text-purple-100">Total Articles</p>
            </CardContent>
          </Card>
        </div>

        {/* Featured News */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Newspaper className="h-6 w-6 text-blue-600" />
              <span>Breaking News</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Global Grain Prices Surge 15% Following Weather Disruptions
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Unexpected weather patterns across major grain-producing regions have led to significant price
                    increases in wheat, corn, and rice markets. Analysts predict continued volatility through the next
                    quarter.
                  </p>
                  <div className="flex items-center space-x-4">
                    <Badge className="bg-red-100 text-red-800">High Impact</Badge>
                    <span className="text-sm text-gray-500">2 minutes ago</span>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Read Full Article
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* News Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {marketNews.map((news) => (
              <Card
                key={news.id}
                className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg border ${getImpactColor(news.impact)}`}>
                        {getImpactIcon(news.impact)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{news.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-600">{news.source}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {news.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <BookmarkPlus className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="text-gray-700 mb-4">{news.summary}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className={getImpactColor(news.impact)}>
                        {news.impact.charAt(0).toUpperCase() + news.impact.slice(1)} Impact
                      </Badge>
                      <div className="flex space-x-1">
                        {news.crops.map((crop, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {crop}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Trending Topics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { topic: "Climate Change Impact", mentions: 45 },
                  { topic: "Supply Chain Issues", mentions: 38 },
                  { topic: "Trade Agreements", mentions: 32 },
                  { topic: "Technology Adoption", mentions: 28 },
                  { topic: "Sustainable Farming", mentions: 24 },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200"
                  >
                    <span className="font-medium text-gray-900">{item.topic}</span>
                    <Badge variant="outline">{item.mentions}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Market Sentiment */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Market Sentiment</CardTitle>
                <CardDescription>Based on recent news analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Bullish</span>
                    <span className="text-sm font-medium text-green-600">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Bearish</span>
                    <span className="text-sm font-medium text-red-600">20%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Neutral</span>
                    <span className="text-sm font-medium text-gray-600">15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  Global Markets
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Price Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Newspaper className="h-4 w-4 mr-2" />
                  Research Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  Economic Calendar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
