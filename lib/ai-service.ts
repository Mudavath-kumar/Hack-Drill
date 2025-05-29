"use client"

import { useState, useEffect } from "react"

// Types for AI suggestions
export interface CropSuggestion {
  id: string
  name: string
  confidence: number
  reason: string
  expectedYield: string
  profitability: "High" | "Medium" | "Low"
  riskLevel: "Low" | "Medium" | "High"
  plantingWindow: string
  marketDemand: "High" | "Medium" | "Low"
  waterRequirement: "Low" | "Medium" | "High"
  soilSuitability: number
  aiInsights: string[]
  marketTrends: string[]
  weatherCompatibility: number
  roi: number
}

export interface MarketSuggestion {
  id: string
  crop: string
  action: "Buy" | "Sell" | "Hold"
  confidence: number
  currentPrice: number
  predictedPrice: number
  timeframe: string
  reasoning: string
  marketFactors: string[]
  riskAssessment: "Low" | "Medium" | "High"
  profitPotential: number
}

export interface AIInsight {
  id: string
  type: "weather" | "market" | "crop" | "general"
  title: string
  description: string
  priority: "High" | "Medium" | "Low"
  actionable: boolean
  suggestedActions: string[]
  confidence: number
  timestamp: Date
}

export interface MarketPrediction {
  crop: string
  currentPrice: number
  predictedPrices: {
    oneWeek: number
    oneMonth: number
    threeMonths: number
  }
  trend: "Bullish" | "Bearish" | "Neutral"
  confidence: number
  factors: string[]
}

export interface CropRecommendation {
  id: string
  name: string
  confidence: number
  soilSuitability: number
  weatherCompatibility: number
  marketDemand: "high" | "medium" | "low"
  expectedYield: number
  profitability: "high" | "medium" | "low"
  plantingWindow: string
  waterRequirement: string
  growthPeriod: number
  riskLevel: "low" | "medium" | "high"
  roi: number
}

export interface AIAlert {
  id: string
  type: "weather" | "market" | "crop" | "equipment"
  priority: "high" | "medium" | "low"
  title: string
  message: string
  actionRequired: boolean
  confidence: number
  timestamp: Date
}

export interface PortfolioData {
  totalValue: number
  dailyChange: number
  dailyChangePercent: number
  topPerformer: string
  topPerformerGain: number
  volatilityIndex: number
  riskScore: number
}

export interface MarketValue {
  totalPortfolioValue: number
  dailyChange: number
  dailyChangePercent: number
  topPerformer: string
  topPerformerGain: number
  marketCap: number
  tradingVolume: number
  activeContracts: number
  volatilityIndex: number
}

// Mock data
const mockCropSuggestions: CropSuggestion[] = [
  {
    id: "1",
    name: "Precision Corn",
    confidence: 94,
    reason: "Optimal soil conditions and favorable weather patterns detected",
    expectedYield: "185 bushels/acre",
    profitability: "High",
    riskLevel: "Low",
    plantingWindow: "April 15 - May 10",
    marketDemand: "High",
    waterRequirement: "Medium",
    soilSuitability: 92,
    aiInsights: [
      "Soil pH levels are optimal for corn growth",
      "Weather patterns show 85% chance of adequate rainfall",
      "Market demand projected to increase 12% this season",
    ],
    marketTrends: [
      "Export demand from Asia increasing",
      "Ethanol production driving prices up",
      "Supply chain improvements reducing costs",
    ],
    weatherCompatibility: 88,
    roi: 156,
  },
  {
    id: "2",
    name: "Drought-Resistant Soybeans",
    confidence: 89,
    reason: "Climate resilience and strong market fundamentals",
    expectedYield: "52 bushels/acre",
    profitability: "High",
    riskLevel: "Medium",
    plantingWindow: "May 1 - June 15",
    marketDemand: "High",
    waterRequirement: "Low",
    soilSuitability: 87,
    aiInsights: [
      "Drought-resistant variety recommended for your region",
      "Nitrogen-fixing properties will improve soil health",
      "Strong protein content commands premium pricing",
    ],
    marketTrends: [
      "Plant-based protein demand surging",
      "China trade relations improving",
      "Sustainable farming incentives available",
    ],
    weatherCompatibility: 91,
    roi: 142,
  },
  {
    id: "3",
    name: "Winter Wheat Premium",
    confidence: 82,
    reason: "Extended growing season maximizes yield potential",
    expectedYield: "68 bushels/acre",
    profitability: "Medium",
    riskLevel: "Low",
    plantingWindow: "September 20 - October 15",
    marketDemand: "Medium",
    waterRequirement: "Medium",
    soilSuitability: 85,
    aiInsights: [
      "Cold tolerance excellent for your climate zone",
      "Disease resistance reduces input costs",
      "Premium quality grade achievable with proper management",
    ],
    marketTrends: ["Global wheat stocks declining", "Quality premiums increasing", "Local mill contracts available"],
    weatherCompatibility: 79,
    roi: 128,
  },
]

const mockMarketSuggestions: MarketSuggestion[] = [
  {
    id: "1",
    crop: "Corn",
    action: "Sell",
    confidence: 87,
    currentPrice: 6.85,
    predictedPrice: 7.2,
    timeframe: "Next 2 weeks",
    reasoning: "Price momentum strong, weather concerns in key growing regions",
    marketFactors: [
      "Drought conditions in Midwest",
      "Strong export demand",
      "Reduced planted acres",
      "Ethanol production increasing",
    ],
    riskAssessment: "Low",
    profitPotential: 15.2,
  },
  {
    id: "2",
    crop: "Soybeans",
    action: "Hold",
    confidence: 73,
    currentPrice: 14.2,
    predictedPrice: 14.8,
    timeframe: "Next month",
    reasoning: "Market consolidating, wait for clearer trend direction",
    marketFactors: [
      "Trade negotiations ongoing",
      "South American harvest approaching",
      "Crushing margins improving",
      "Weather patterns uncertain",
    ],
    riskAssessment: "Medium",
    profitPotential: 8.7,
  },
  {
    id: "3",
    crop: "Wheat",
    action: "Buy",
    confidence: 91,
    currentPrice: 8.45,
    predictedPrice: 9.15,
    timeframe: "Next 6 weeks",
    reasoning: "Seasonal demand surge expected, supply concerns mounting",
    marketFactors: [
      "Global inventory declining",
      "Quality issues in major exporters",
      "Seasonal demand from millers",
      "Currency factors favorable",
    ],
    riskAssessment: "Low",
    profitPotential: 18.9,
  },
]

const mockAIInsights: AIInsight[] = [
  {
    id: "1",
    type: "weather",
    title: "Optimal Planting Window Approaching",
    description: "Weather models show ideal conditions for corn planting in 5-7 days",
    priority: "High",
    actionable: true,
    suggestedActions: ["Prepare planting equipment", "Check seed inventory", "Schedule soil testing"],
    confidence: 92,
    timestamp: new Date(),
  },
  {
    id: "2",
    type: "market",
    title: "Soybean Price Surge Predicted",
    description: "AI models predict 12% price increase in soybeans over next 30 days",
    priority: "High",
    actionable: true,
    suggestedActions: ["Consider forward contracting", "Review storage capacity", "Monitor basis levels"],
    confidence: 85,
    timestamp: new Date(),
  },
  {
    id: "3",
    type: "crop",
    title: "Disease Pressure Alert",
    description: "Fungal disease risk elevated for wheat crops in your area",
    priority: "Medium",
    actionable: true,
    suggestedActions: ["Scout fields regularly", "Prepare fungicide application", "Monitor weather conditions"],
    confidence: 78,
    timestamp: new Date(),
  },
]

const mockMarketPredictions: MarketPrediction[] = [
  {
    crop: "Corn",
    currentPrice: 6.85,
    predictedPrices: {
      oneWeek: 7.02,
      oneMonth: 7.35,
      threeMonths: 7.8,
    },
    trend: "Bullish",
    confidence: 87,
    factors: [
      "Weather concerns in key regions",
      "Strong ethanol demand",
      "Export pace above average",
      "Reduced planted acres",
    ],
  },
  {
    crop: "Soybeans",
    currentPrice: 14.2,
    predictedPrices: {
      oneWeek: 14.35,
      oneMonth: 14.8,
      threeMonths: 15.25,
    },
    trend: "Bullish",
    confidence: 73,
    factors: [
      "China trade improving",
      "Protein demand increasing",
      "South American weather risks",
      "Crushing margins strong",
    ],
  },
  {
    crop: "Wheat",
    currentPrice: 8.45,
    predictedPrices: {
      oneWeek: 8.65,
      oneMonth: 9.15,
      threeMonths: 9.45,
    },
    trend: "Bullish",
    confidence: 91,
    factors: [
      "Global stocks declining",
      "Quality concerns in major exporters",
      "Seasonal demand surge",
      "Currency factors favorable",
    ],
  },
]

// Hook for AI suggestions (REQUIRED EXPORT)
export function useAISuggestions() {
  const [cropSuggestions, setCropSuggestions] = useState<CropSuggestion[]>([])
  const [marketSuggestions, setMarketSuggestions] = useState<MarketSuggestion[]>([])
  const [aiInsights, setAIInsights] = useState<AIInsight[]>([])
  const [marketPredictions, setMarketPredictions] = useState<MarketPrediction[]>([])

  useEffect(() => {
    // Simulate API fetch with mock data
    setCropSuggestions(mockCropSuggestions)
    setMarketSuggestions(mockMarketSuggestions)
    setAIInsights(mockAIInsights)
    setMarketPredictions(mockMarketPredictions)

    // Simulate real-time updates
    const interval = setInterval(() => {
      // Update market predictions with slight variations
      setMarketPredictions((prev) =>
        prev.map((prediction) => ({
          ...prediction,
          currentPrice: prediction.currentPrice + (Math.random() - 0.5) * 0.2,
          confidence: Math.max(60, Math.min(95, prediction.confidence + (Math.random() - 0.5) * 5)),
        })),
      )

      // Update crop suggestions confidence
      setCropSuggestions((prev) =>
        prev.map((suggestion) => ({
          ...suggestion,
          confidence: Math.max(70, Math.min(98, suggestion.confidence + (Math.random() - 0.5) * 3)),
        })),
      )
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return {
    cropSuggestions,
    marketSuggestions,
    aiInsights,
    marketPredictions,
  }
}

// Hook for real-time market value (REQUIRED EXPORT)
export function useRealTimeMarketValue() {
  const [marketValue, setMarketValue] = useState<MarketValue>({
    totalPortfolioValue: 2450000,
    dailyChange: 45600,
    dailyChangePercent: 1.9,
    topPerformer: "Corn",
    topPerformerGain: 8.7,
    marketCap: 2400000000000,
    tradingVolume: 15200000,
    activeContracts: 8456,
    volatilityIndex: 23.4,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketValue((prev) => {
        const change = (Math.random() - 0.5) * 50000
        const newValue = prev.totalPortfolioValue + change
        const changePercent = (change / prev.totalPortfolioValue) * 100

        return {
          ...prev,
          totalPortfolioValue: newValue,
          dailyChange: prev.dailyChange + change,
          dailyChangePercent: changePercent,
          topPerformerGain: Math.max(0, prev.topPerformerGain + (Math.random() - 0.5) * 2),
          volatilityIndex: Math.max(10, Math.min(40, prev.volatilityIndex + (Math.random() - 0.5) * 2)),
          tradingVolume: prev.tradingVolume + Math.floor((Math.random() - 0.5) * 100000),
          activeContracts: prev.activeContracts + Math.floor((Math.random() - 0.5) * 100),
        }
      })
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return marketValue
}

// Additional hooks for compatibility
export function useCropRecommendations() {
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRecommendations([
        {
          id: "1",
          name: "Soybeans",
          confidence: 92,
          soilSuitability: 88,
          weatherCompatibility: 91,
          marketDemand: "high",
          expectedYield: 48,
          profitability: "high",
          plantingWindow: "April 15 - May 10",
          waterRequirement: "Medium",
          growthPeriod: 120,
          riskLevel: "low",
          roi: 156,
        },
        {
          id: "2",
          name: "Corn",
          confidence: 87,
          soilSuitability: 92,
          weatherCompatibility: 85,
          marketDemand: "medium",
          expectedYield: 180,
          profitability: "high",
          plantingWindow: "April 20 - May 15",
          waterRequirement: "High",
          growthPeriod: 110,
          riskLevel: "medium",
          roi: 134,
        },
        {
          id: "3",
          name: "Wheat",
          confidence: 79,
          soilSuitability: 85,
          weatherCompatibility: 79,
          marketDemand: "medium",
          expectedYield: 65,
          profitability: "medium",
          plantingWindow: "September 15 - October 10",
          waterRequirement: "Low",
          growthPeriod: 300,
          riskLevel: "low",
          roi: 98,
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  return { recommendations, loading }
}

export function useMarketPredictions() {
  const [predictions, setPredictions] = useState(mockMarketPredictions)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setPredictions((prev) =>
        prev.map((prediction) => ({
          ...prediction,
          currentPrice: prediction.currentPrice + (Math.random() - 0.5) * 0.1,
          confidence: Math.max(60, Math.min(95, prediction.confidence + (Math.random() - 0.5) * 3)),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return { predictions, loading }
}

export function useAIAlerts() {
  const [alerts, setAlerts] = useState<AIAlert[]>([
    {
      id: "1",
      type: "weather",
      priority: "high",
      title: "Optimal Planting Window",
      message: "Weather conditions perfect for soybean planting in next 48 hours",
      actionRequired: true,
      confidence: 95,
      timestamp: new Date(),
    },
    {
      id: "2",
      type: "market",
      priority: "medium",
      title: "Price Alert",
      message: "Corn futures up 3.2% - consider selling position",
      actionRequired: false,
      confidence: 82,
      timestamp: new Date(Date.now() - 1800000),
    },
    {
      id: "3",
      type: "crop",
      priority: "high",
      title: "Disease Risk",
      message: "High probability of fungal infection in Field B2",
      actionRequired: true,
      confidence: 88,
      timestamp: new Date(Date.now() - 3600000),
    },
  ])

  return { alerts }
}

export function usePortfolioData() {
  const [portfolio, setPortfolio] = useState<PortfolioData>({
    totalValue: 2450000,
    dailyChange: 12500,
    dailyChangePercent: 0.51,
    topPerformer: "Soybeans",
    topPerformerGain: 8.3,
    volatilityIndex: 23.5,
    riskScore: 6.2,
  })

  useEffect(() => {
    // Simulate real-time portfolio updates
    const interval = setInterval(() => {
      setPortfolio((prev) => ({
        ...prev,
        totalValue: prev.totalValue + (Math.random() - 0.5) * 5000,
        dailyChange: prev.dailyChange + (Math.random() - 0.5) * 1000,
        dailyChangePercent: prev.dailyChangePercent + (Math.random() - 0.5) * 0.1,
        volatilityIndex: Math.max(10, Math.min(40, prev.volatilityIndex + (Math.random() - 0.5) * 2)),
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return { portfolio }
}
