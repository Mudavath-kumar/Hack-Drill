"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useAISuggestions, useRealTimeMarketValue } from "@/lib/ai-service"
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Target,
  Lightbulb,
  CheckCircle,
  Clock,
  DollarSign,
  Sprout,
  BarChart3,
  Activity,
  Zap,
  Star,
  ArrowUp,
  ArrowDown,
  Eye,
  Calendar,
  Droplets,
  Thermometer,
} from "lucide-react"

export default function AIInsightsPage() {
  const { cropSuggestions, marketSuggestions, aiInsights, marketPredictions } = useAISuggestions()
  const marketValue = useRealTimeMarketValue()

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "Buy":
        return "bg-green-100 text-green-800"
      case "Sell":
        return "bg-red-100 text-red-800"
      case "Hold":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "Bullish":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "Bearish":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <BarChart3 className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI-Powered Insights</h1>
              <p className="text-gray-600">Intelligent recommendations for your farming operations</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-purple-100 text-purple-800">
              <Activity className="h-3 w-3 mr-1 animate-pulse" />
              AI Analysis Active
            </Badge>
            <Badge className="bg-blue-100 text-blue-800">
              <Zap className="h-3 w-3 mr-1" />
              Real-time Processing
            </Badge>
          </div>
        </div>

        {/* Real-time Market Value Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Portfolio Value</p>
                  <p className="text-2xl font-bold">${(marketValue.totalPortfolioValue / 1000000).toFixed(2)}M</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {marketValue.dailyChangePercent > 0 ? (
                      <ArrowUp className="h-3 w-3 text-green-200" />
                    ) : (
                      <ArrowDown className="h-3 w-3 text-red-200" />
                    )}
                    <span className="text-xs text-green-200">
                      {marketValue.dailyChangePercent > 0 ? "+" : ""}
                      {marketValue.dailyChangePercent.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <DollarSign className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Daily Change</p>
                  <p className="text-2xl font-bold">${(marketValue.dailyChange / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-blue-200">vs yesterday</p>
                </div>
                <TrendingUp className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Top Performer</p>
                  <p className="text-2xl font-bold">{marketValue.topPerformer}</p>
                  <p className="text-xs text-purple-200">+{marketValue.topPerformerGain.toFixed(1)}% today</p>
                </div>
                <Star className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Volatility Index</p>
                  <p className="text-2xl font-bold">{marketValue.volatilityIndex.toFixed(1)}</p>
                  <p className="text-xs text-orange-200">Market stability</p>
                </div>
                <Activity className="h-12 w-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - AI Insights & Crop Suggestions */}
          <div className="lg:col-span-2 space-y-8">
            {/* AI Insights */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-6 w-6 text-yellow-600" />
                  <span>AI Insights & Recommendations</span>
                </CardTitle>
                <CardDescription>Real-time intelligent analysis of your farming operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiInsights.map((insight) => (
                    <div
                      key={insight.id}
                      className="p-4 rounded-lg border-l-4 bg-gradient-to-r from-gray-50 to-blue-50"
                      style={{
                        borderLeftColor:
                          insight.priority === "High"
                            ? "#ef4444"
                            : insight.priority === "Medium"
                              ? "#f59e0b"
                              : "#10b981",
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {insight.type === "weather" && <Thermometer className="h-5 w-5 text-blue-600" />}
                          {insight.type === "market" && <TrendingUp className="h-5 w-5 text-green-600" />}
                          {insight.type === "crop" && <Sprout className="h-5 w-5 text-green-600" />}
                          {insight.type === "general" && <Brain className="h-5 w-5 text-purple-600" />}
                          <div>
                            <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                            <p className="text-sm text-gray-600">{insight.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(insight.priority)}>{insight.priority}</Badge>
                          <Badge variant="outline" className="text-xs">
                            {insight.confidence}% confidence
                          </Badge>
                        </div>
                      </div>

                      {insight.actionable && (
                        <div className="mt-3 p-3 bg-white/60 rounded-lg">
                          <p className="text-sm font-medium text-gray-700 mb-2">Suggested Actions:</p>
                          <ul className="space-y-1">
                            {insight.suggestedActions.map((action, index) => (
                              <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Crop Suggestions */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sprout className="h-6 w-6 text-green-600" />
                  <span>AI Crop Recommendations</span>
                </CardTitle>
                <CardDescription>Intelligent crop selection based on multiple data sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {cropSuggestions.map((crop) => (
                    <div
                      key={crop.id}
                      className="p-6 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{crop.name}</h3>
                          <p className="text-sm text-gray-600">{crop.reason}</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1">
                            {crop.confidence}% AI Match
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">ROI: {crop.roi}%</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="text-center p-3 bg-white/60 rounded-lg">
                          <p className="text-xs text-gray-600">Expected Yield</p>
                          <p className="font-semibold text-gray-900">{crop.expectedYield}</p>
                        </div>
                        <div className="text-center p-3 bg-white/60 rounded-lg">
                          <p className="text-xs text-gray-600">Profitability</p>
                          <Badge
                            className={
                              crop.profitability === "High"
                                ? "bg-green-100 text-green-800"
                                : crop.profitability === "Medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }
                          >
                            {crop.profitability}
                          </Badge>
                        </div>
                        <div className="text-center p-3 bg-white/60 rounded-lg">
                          <p className="text-xs text-gray-600">Risk Level</p>
                          <Badge
                            className={
                              crop.riskLevel === "Low"
                                ? "bg-green-100 text-green-800"
                                : crop.riskLevel === "Medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }
                          >
                            {crop.riskLevel}
                          </Badge>
                        </div>
                        <div className="text-center p-3 bg-white/60 rounded-lg">
                          <p className="text-xs text-gray-600">Market Demand</p>
                          <Badge
                            className={
                              crop.marketDemand === "High"
                                ? "bg-green-100 text-green-800"
                                : crop.marketDemand === "Medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }
                          >
                            {crop.marketDemand}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-600">Soil Suitability</span>
                            <span className="text-sm font-semibold">{crop.soilSuitability}%</span>
                          </div>
                          <Progress value={crop.soilSuitability} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-600">Weather Compatibility</span>
                            <span className="text-sm font-semibold">{crop.weatherCompatibility}%</span>
                          </div>
                          <Progress value={crop.weatherCompatibility} className="h-2" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-semibold text-green-700 mb-2">AI Insights</h4>
                          <ul className="space-y-1">
                            {crop.aiInsights.map((insight, index) => (
                              <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                                <Brain className="h-3 w-3 text-purple-500 mt-0.5 flex-shrink-0" />
                                <span>{insight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-700 mb-2">Market Trends</h4>
                          <ul className="space-y-1">
                            {crop.marketTrends.map((trend, index) => (
                              <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                                <TrendingUp className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span>{trend}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-green-200">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{crop.plantingWindow}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Droplets className="h-4 w-4" />
                            <span>{crop.waterRequirement} water</span>
                          </div>
                        </div>
                        <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                          <Target className="h-4 w-4 mr-2" />
                          Select Crop
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Market Suggestions & Predictions */}
          <div className="space-y-8">
            {/* Market Suggestions */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                  <span>AI Market Suggestions</span>
                </CardTitle>
                <CardDescription>Intelligent trading recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketSuggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{suggestion.crop}</h3>
                          <p className="text-sm text-gray-600">{suggestion.reasoning}</p>
                        </div>
                        <Badge className={getActionColor(suggestion.action)}>{suggestion.action}</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="text-center p-2 bg-white/60 rounded">
                          <p className="text-xs text-gray-600">Current</p>
                          <p className="font-semibold">${suggestion.currentPrice}</p>
                        </div>
                        <div className="text-center p-2 bg-white/60 rounded">
                          <p className="text-xs text-gray-600">Predicted</p>
                          <p className="font-semibold">${suggestion.predictedPrice}</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Confidence</span>
                          <span className="text-sm font-semibold">{suggestion.confidence}%</span>
                        </div>
                        <Progress value={suggestion.confidence} className="h-2" />
                      </div>

                      <div className="space-y-1 mb-3">
                        <p className="text-xs font-medium text-gray-700">Key Factors:</p>
                        {suggestion.marketFactors.slice(0, 2).map((factor, index) => (
                          <p key={index} className="text-xs text-gray-600">
                            • {factor}
                          </p>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600">Risk:</span>
                          <Badge
                            variant="outline"
                            className={
                              suggestion.riskAssessment === "Low"
                                ? "border-green-500 text-green-700"
                                : suggestion.riskAssessment === "Medium"
                                  ? "border-yellow-500 text-yellow-700"
                                  : "border-red-500 text-red-700"
                            }
                          >
                            {suggestion.riskAssessment}
                          </Badge>
                        </div>
                        <span className="font-semibold text-green-600">
                          +{suggestion.profitPotential.toFixed(1)}% potential
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Predictions */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                  <span>Price Predictions</span>
                </CardTitle>
                <CardDescription>AI-powered market forecasts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {marketPredictions.map((prediction) => (
                    <div
                      key={prediction.crop}
                      className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{prediction.crop}</h3>
                          {getTrendIcon(prediction.trend)}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {prediction.confidence}% confidence
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="text-center p-2 bg-white/60 rounded">
                          <p className="text-xs text-gray-600">Current Price</p>
                          <p className="font-semibold">${prediction.currentPrice.toFixed(2)}</p>
                        </div>
                        <div className="text-center p-2 bg-white/60 rounded">
                          <p className="text-xs text-gray-600">Trend</p>
                          <Badge
                            className={
                              prediction.trend === "Bullish"
                                ? "bg-green-100 text-green-800"
                                : prediction.trend === "Bearish"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                            }
                          >
                            {prediction.trend}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">1 Week:</span>
                          <span className="font-semibold">${prediction.predictedPrices.oneWeek.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">1 Month:</span>
                          <span className="font-semibold">${prediction.predictedPrices.oneMonth.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">3 Months:</span>
                          <span className="font-semibold">${prediction.predictedPrices.threeMonths.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-700">Key Factors:</p>
                        {prediction.factors.slice(0, 3).map((factor, index) => (
                          <p key={index} className="text-xs text-gray-600">
                            • {factor}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-6 w-6 text-yellow-600" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                  <Brain className="h-4 w-4 mr-2" />
                  Run Full AI Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="h-4 w-4 mr-2" />
                  View Detailed Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Set Price Alerts
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  Schedule Analysis
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
