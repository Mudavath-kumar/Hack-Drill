"use client"

import { useState, useEffect } from "react"

export interface MarketPrice {
  id: string
  crop: string
  price: number
  change: number
  changePercent: number
  volume: string
  high: number
  low: number
  forecast: "bullish" | "bearish" | "neutral"
  lastUpdate: Date
}

export interface MarketNews {
  id: string
  title: string
  summary: string
  impact: "positive" | "negative" | "neutral"
  crops: string[]
  time: string
  source: string
}

export function useRealTimeMarket() {
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([
    {
      id: "wheat",
      crop: "Wheat",
      price: 245,
      change: 5.2,
      changePercent: 2.17,
      volume: "2.3M tons",
      high: 250,
      low: 235,
      forecast: "bullish",
      lastUpdate: new Date(),
    },
    {
      id: "corn",
      crop: "Corn",
      price: 189,
      change: -2.1,
      changePercent: -1.1,
      volume: "4.1M tons",
      high: 195,
      low: 185,
      forecast: "bearish",
      lastUpdate: new Date(),
    },
    {
      id: "soybeans",
      crop: "Soybeans",
      price: 567,
      change: 8.7,
      changePercent: 1.56,
      volume: "1.8M tons",
      high: 575,
      low: 520,
      forecast: "bullish",
      lastUpdate: new Date(),
    },
    {
      id: "rice",
      crop: "Rice",
      price: 423,
      change: 3.4,
      changePercent: 0.81,
      volume: "3.2M tons",
      high: 430,
      low: 410,
      forecast: "neutral",
      lastUpdate: new Date(),
    },
    {
      id: "barley",
      crop: "Barley",
      price: 198,
      change: -1.8,
      changePercent: -0.9,
      volume: "1.5M tons",
      high: 205,
      low: 195,
      forecast: "neutral",
      lastUpdate: new Date(),
    },
    {
      id: "oats",
      crop: "Oats",
      price: 156,
      change: 4.2,
      changePercent: 2.77,
      volume: "0.8M tons",
      high: 160,
      low: 150,
      forecast: "bullish",
      lastUpdate: new Date(),
    },
  ])

  const [marketNews, setMarketNews] = useState<MarketNews[]>([
    {
      id: "1",
      title: "Global wheat production expected to increase by 3% this year",
      summary: "Favorable weather conditions and improved farming techniques contribute to higher yields",
      time: "2 hours ago",
      impact: "positive",
      crops: ["Wheat"],
      source: "AgriNews",
    },
    {
      id: "2",
      title: "Drought conditions affecting corn yields in major regions",
      summary: "Water shortages in key growing areas may reduce overall corn production",
      time: "4 hours ago",
      impact: "negative",
      crops: ["Corn"],
      source: "FarmReport",
    },
    {
      id: "3",
      title: "Strong demand for soybeans from Asian markets",
      summary: "Increased imports from China and Japan driving up soybean prices",
      time: "6 hours ago",
      impact: "positive",
      crops: ["Soybeans"],
      source: "CommodityWatch",
    },
    {
      id: "4",
      title: "New trade agreements boost agricultural exports",
      summary: "Recent trade deals expected to increase demand for multiple crops",
      time: "8 hours ago",
      impact: "positive",
      crops: ["Wheat", "Corn", "Soybeans"],
      source: "TradeDaily",
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketPrices((prev) =>
        prev.map((item) => {
          const priceChange = (Math.random() - 0.5) * 10
          const newPrice = Math.max(50, item.price + priceChange)
          const changePercent = ((newPrice - item.price) / item.price) * 100

          return {
            ...item,
            price: newPrice,
            change: priceChange,
            changePercent,
            lastUpdate: new Date(),
            forecast: changePercent > 2 ? "bullish" : changePercent < -2 ? "bearish" : "neutral",
          }
        }),
      )
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return { marketPrices, marketNews }
}
