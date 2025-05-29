"use client"

import { useState, useEffect } from "react"

// Types for AI suggestions
export interface CropSuggestion {
  id: number
  name: string
  reason: string
  confidence: number
  roi: number
  expectedYield: string
  profitability: "High" | "Medium" | "Low"
  riskLevel: "High" | "Medium" | "Low"
  marketDemand: "High" | "Medium" | "Low"
  soilSuitability: number
  weatherCompatibility: number
  aiInsights: string[]
  marketTrends: string[]
  plantingWindow: string
  waterRequirement: string
}

export interface MarketSuggestion {
  id: number
  crop: string
  action: "Buy" | "Sell" | "Hold"
  reasoning: string
  currentPrice: number
  predictedPrice: number
  confidence: number
  marketFactors: string[]
  riskAssessment: "High" | "Medium" | "Low"
  profitPotential: number
}

export interface AIInsight {
  id: number
  title: string
  description: string
  type: "weather" | "market" | "crop" | "general"
  priority: "High" | "Medium" | "Low"
  confidence: number
  actionable: boolean
  suggestedActions: string[]
}

export interface MarketPrediction {
  crop: string
  currentPrice: number
  trend: "Bullish" | "Bearish" | "Neutral"
  confidence: number
  predictedPrices: {
    oneWeek: number
    oneMonth: number
    threeMonths: number
  }
  factors: string[]
}

export interface MarketValue {
  totalPortfolioValue: number
  dailyChange: number
  dailyChangePercent: number
  topPerformer: string
  topPerformerGain: number
  volatilityIndex: number
}

// Mock data for AI suggestions
const mockCropSuggestions: CropSuggestion[] = [
  {
    id: 1,
    name: "Winter Wheat",
    reason: "Optimal soil conditions and favorable market forecast",
    confidence: 92,
    roi: 156,
    expectedYield: "65 bu/acre",
    profitability: "High",
    riskLevel: "Low",
    marketDemand: "High",
    soilSuitability: 95,
    weatherCompatibility: 88,
    aiInsights: [
      "Current soil nitrogen levels are ideal for winter wheat",
      "Weather patterns suggest a mild winter with adequate precipitation",
      "Historical yield data shows 15% above average potential",
    ],
    marketTrends: [
      "Global wheat demand projected to increase 7% next quarter",
      "Local mills offering premium contracts for quality wheat",
      "Export opportunities expanding to Asian markets",
    ],
    plantingWindow: "Sept 15 - Oct 30",
    waterRequirement: "Moderate",
  },
  {
    id: 2,
    name: "Soybeans",
    reason: "Rising global demand and excellent growing conditions",
    confidence: 87,
    roi: 132,
    expectedYield: "58 bu/acre",
    profitability: "High",
    riskLevel: "Medium",
    marketDemand: "High",
    soilSuitability: 92,
    weatherCompatibility: 85,
    aiInsights: [
      "Soil pH levels are in optimal range for soybean cultivation",
      "Predicted rainfall patterns align with critical growth stages",
      "Low pest pressure expected based on current ecosystem analysis",
    ],
    marketTrends: [
      "Soybean futures showing strong upward momentum",
      "Increased demand from biofuel sector",
      "China imports expected to rise by 12% next season",
    ],
    plantingWindow: "May 1 - June 15",
    waterRequirement: "Moderate-High",
  },
  {
    id: 3,
    name: "Specialty Corn",
    reason: "Premium pricing and favorable growing conditions",
    confidence: 84,
    roi: 118,
    expectedYield: "210 bu/acre",
    profitability: "Medium",
    riskLevel: "Medium",
    marketDemand: "Medium",
    soilSuitability: 88,
    weatherCompatibility: 91,
    aiInsights: [
      "Soil organic matter content is ideal for corn development",
      "Temperature projections favor extended growing season",
      "Field drainage patterns support optimal root development",
    ],
    marketTrends: [
      "Specialty corn commanding 15% premium over commodity corn",
      "Growing market for non-GMO varieties",
      "Local ethanol plants increasing capacity",
    ],
    plantingWindow: "April 15 - May 20",
    waterRequirement: "High",
  },
]

const mockMarketSuggestions: MarketSuggestion[] = [
  {
    id: 1,
    crop: "Soybeans",
    action: "Buy",
    reasoning: "Futures indicate price increase due to export demand",
    currentPrice: 14.25,
    predictedPrice: 16.8,
    confidence: 88,
    marketFactors: [
      "China increasing import quotas by 15%",
      "Weather concerns in Brazil affecting global supply",
      "Domestic crush demand rising due to biofuel expansion",
    ],
    riskAssessment: "Low",
    profitPotential: 18.9,
  },
  {
    id: 2,
    crop: "Corn",
    action: "Hold",
    reasoning: "Price stability expected for next 30 days",
    currentPrice: 5.75,
    predictedPrice: 5.9,
    confidence: 76,
    marketFactors: [
      "Ethanol production steady with slight upward trend",
      "USDA reports indicate balanced supply/demand",
      "Weather conditions favorable for current growing season",
    ],
    riskAssessment: "Low",
    profitPotential: 2.6,
  },
  {
    id: 3,
    crop: "Wheat",
    action: "Sell",
    reasoning: "Price peak detected, decline expected",
    currentPrice: 7.85,
    predictedPrice: 6.95,
    confidence: 82,
    marketFactors: [
      "Record Russian wheat harvest entering global market",
      "Favorable weather in EU increasing yield expectations",
      "Technical indicators suggest overbought conditions",
    ],
    riskAssessment: "Medium",
    profitPotential: -11.5,
  },
]

const mockAIInsights: AIInsight[] = [
  {
    id: 1,
    title: "Drought Risk Alert",
    description: "Weather models predict 60% below average rainfall for next 30 days",
    type: "weather",
    priority: "High",
    confidence: 85,
    actionable: true,
    suggestedActions: [
      "Adjust irrigation schedules to compensate for rainfall deficit",
      "Consider deploying drought-resistant varieties for late planting",
      "Review water conservation strategies for critical growth stages",
    ],
  },
  {
    id: 2,
    title: "Market Opportunity: Soybeans",
    description: "Futures contracts showing favorable entry point with 15% upside potential",
    type: "market",
    priority: "Medium",
    confidence: 78,
    actionable: true,
    suggestedActions: [
      "Consider forward contracting 30% of expected soybean harvest",
      "Monitor Brazil weather patterns for potential supply disruptions",
      "Set price alerts at $14.50 for potential additional contracts",
    ],
  },
  {
    id: 3,
    title: "Pest Pressure Warning",
    description: "Satellite imagery and temperature data indicate increased risk of corn rootworm",
    type: "crop",
    priority: "High",
    confidence: 92,
    actionable: true,
    suggestedActions: [
      "Schedule field scouting within next 7 days",
      "Prepare targeted pesticide application if threshold levels detected",
      "Consider biological control options for organic fields",
    ],
  },
  {
    id: 4,
    title: "Equipment Efficiency Alert",
    description: "Combine harvester showing 15% below optimal performance based on IoT sensors",
    type: "general",
    priority: "Medium",
    confidence: 94,
    actionable: true,
    suggestedActions: [
      "Schedule maintenance check focusing on threshing components",
      "Calibrate sensors and adjust settings for current crop conditions",
      "Consider operator training refresher for optimal machine settings",
    ],
  },
]

const mockMarketPredictions: MarketPrediction[] = [
  {
    crop: "Soybeans",
    currentPrice: 14.25,
    trend: "Bullish",
    confidence: 87,
    predictedPrices: {
      oneWeek: 14.65,
      oneMonth: 15.3,
      threeMonths: 16.8,
    },
    factors: [
      "Strong export demand from China",
      "Weather concerns in South America",
      "Declining domestic stockpiles",
      "Increased biofuel mandates",
    ],
  },
  {
    crop: "Corn",
    currentPrice: 5.75,
    trend: "Neutral",
    confidence: 76,
    predictedPrices: {
      oneWeek: 5.8,
      oneMonth: 5.9,
      threeMonths: 5.85,
    },
    factors: [
      "Balanced supply and demand fundamentals",
      "Stable ethanol production",
      "Average crop conditions in major growing regions",
      "Adequate global stockpiles",
    ],
  },
  {
    crop: "Wheat",
    currentPrice: 7.85,
    trend: "Bearish",
    confidence: 82,
    predictedPrices: {
      oneWeek: 7.6,
      oneMonth: 7.25,
      threeMonths: 6.95,
    },
    factors: [
      "Record Russian wheat exports",
      "Favorable growing conditions in EU",
      "Declining global import demand",
      "Technical selling pressure",
    ],
  },
]

const mockMarketValue: MarketValue = {
  totalPortfolioValue: 2450000,
  dailyChange: 35000,
  dailyChangePercent: 1.45,
  topPerformer: "Soybeans",
  topPerformerGain: 3.2,
  volatilityIndex: 18.5,
}

// Hooks for AI suggestions
export function useAISuggestions() {
  const [cropSuggestions, setCropSuggestions] = useState<CropSuggestion[]>([])
  const [marketSuggestions, setMarketSuggestions] = useState<MarketSuggestion[]>([])
  const [aiInsights, setAIInsights] = useState<AIInsight[]>([])
  const [marketPredictions, setMarketPredictions] = useState<MarketPrediction[]>([])

  useEffect(() => {
    // Simulate API fetch with mock data
    const fetchData = () => {
      setCropSuggestions(mockCropSuggestions)
      setMarketSuggestions(mockMarketSuggestions)
      setAIInsights(mockAIInsights)
      setMarketPredictions(mockMarketPredictions)
    }

    fetchData()
    // In a real app, you would fetch from an API and possibly set up a refresh interval
  }, [])

  return { cropSuggestions, marketSuggestions, aiInsights, marketPredictions }
}

export function useRealTimeMarketValue() {
  const [marketValue, setMarketValue] = useState<MarketValue>(mockMarketValue)

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // In a real app, this would fetch from an API
      // Here we just slightly modify the mock data to simulate changes
      setMarketValue((prev) => ({
        ...prev,
        totalPortfolioValue: prev.totalPortfolioValue + (Math.random() * 10000 - 5000),
        dailyChange: prev.dailyChange + (Math.random() * 1000 - 500),
        dailyChangePercent: prev.dailyChangePercent + (Math.random() * 0.2 - 0.1),
        volatilityIndex: Math.max(5, Math.min(30, prev.volatilityIndex + (Math.random() * 1 - 0.5))),
      }))
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return marketValue
}
