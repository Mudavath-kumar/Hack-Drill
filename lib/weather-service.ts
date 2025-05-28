"use client"

import { useState, useEffect } from "react"

export interface WeatherData {
  temperature: number
  humidity: number
  windSpeed: number
  windDirection: string
  pressure: number
  visibility: number
  uvIndex: number
  condition: string
  feelsLike: number
  dewPoint: number
  precipitation: number
  cloudCover: number
}

export interface WeatherForecast {
  date: string
  day: string
  high: number
  low: number
  condition: string
  precipitation: number
  humidity: number
  windSpeed: number
}

export function useRealTimeWeather() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData>({
    temperature: 24,
    humidity: 65,
    windSpeed: 12,
    windDirection: "NW",
    pressure: 1013,
    visibility: 10,
    uvIndex: 6,
    condition: "Partly Cloudy",
    feelsLike: 26,
    dewPoint: 18,
    precipitation: 0,
    cloudCover: 45,
  })

  const [forecast, setForecast] = useState<WeatherForecast[]>([
    {
      date: "2024-01-15",
      day: "Mon",
      high: 26,
      low: 18,
      condition: "sunny",
      precipitation: 0,
      humidity: 60,
      windSpeed: 10,
    },
    {
      date: "2024-01-16",
      day: "Tue",
      high: 28,
      low: 20,
      condition: "cloudy",
      precipitation: 10,
      humidity: 65,
      windSpeed: 15,
    },
    {
      date: "2024-01-17",
      day: "Wed",
      high: 22,
      low: 16,
      condition: "rainy",
      precipitation: 80,
      humidity: 85,
      windSpeed: 20,
    },
    {
      date: "2024-01-18",
      day: "Thu",
      high: 25,
      low: 17,
      condition: "sunny",
      precipitation: 5,
      humidity: 55,
      windSpeed: 8,
    },
    {
      date: "2024-01-19",
      day: "Fri",
      high: 27,
      low: 19,
      condition: "cloudy",
      precipitation: 20,
      humidity: 70,
      windSpeed: 12,
    },
    {
      date: "2024-01-20",
      day: "Sat",
      high: 29,
      low: 21,
      condition: "sunny",
      precipitation: 0,
      humidity: 50,
      windSpeed: 6,
    },
    {
      date: "2024-01-21",
      day: "Sun",
      high: 31,
      low: 23,
      condition: "sunny",
      precipitation: 0,
      humidity: 45,
      windSpeed: 8,
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWeather((prev) => ({
        ...prev,
        temperature: Math.max(15, Math.min(35, prev.temperature + (Math.random() - 0.5) * 2)),
        humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() - 0.5) * 5)),
        windSpeed: Math.max(0, Math.min(50, prev.windSpeed + (Math.random() - 0.5) * 3)),
        pressure: Math.max(980, Math.min(1040, prev.pressure + (Math.random() - 0.5) * 5)),
        uvIndex: Math.max(0, Math.min(11, prev.uvIndex + (Math.random() - 0.5) * 1)),
        precipitation: Math.max(0, Math.min(100, prev.precipitation + (Math.random() - 0.5) * 10)),
        cloudCover: Math.max(0, Math.min(100, prev.cloudCover + (Math.random() - 0.5) * 10)),
      }))
    }, 3000) // Update every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return { currentWeather, forecast }
}
