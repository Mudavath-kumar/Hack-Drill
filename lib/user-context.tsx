"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { getCurrentUser } from "@/lib/auth"

interface User {
  id: number
  name: string
  email: string
  farmLocation: string
  soilType: string
}

interface UserContextType {
  user: User | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  error: null,
  refetch: async () => {},
})

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUser = async () => {
    try {
      setLoading(true)
      setError(null)

      const userData = await getCurrentUser()
      setUser(userData)
    } catch (error) {
      console.error("Failed to fetch user:", error)
      setError("Failed to load user data")
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return <UserContext.Provider value={{ user, loading, error, refetch: fetchUser }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
