import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ErrorBoundary } from "@/components/error-boundary"
import { DbInitializer } from "@/components/db-initializer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FarmWise - Smart Farming Dashboard",
  description: "Personalized crop advisory and market trends for farmers",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DbInitializer />
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  )
}
