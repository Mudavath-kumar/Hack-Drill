"use client"

import { useEffect, useState } from "react"

export function DbInitializer() {
  const [initialized, setInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initDb = async () => {
      try {
        const response = await fetch("/api/init-db", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })

        const data = await response.json()

        if (data.success) {
          console.log("Database initialized successfully")
          setInitialized(true)
        } else {
          console.error("Database initialization failed:", data.message)
          setError(data.message)
        }
      } catch (err) {
        console.error("Error initializing database:", err)
        setError("Failed to initialize database")
      }
    }

    initDb()
  }, [])

  // This component doesn't render anything visible
  return null
}
