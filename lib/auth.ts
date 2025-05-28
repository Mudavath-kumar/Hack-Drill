"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface User {
  id: number
  email: string
  name: string
  farmLocation: string
  soilType: string
  created_at?: string
  last_login?: string
}

export interface UserWithPassword extends User {
  password: string
}

// Helper function to generate a secure random token
function generateToken() {
  return crypto.randomBytes(32).toString("hex")
}

// Hash password function
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

// Verify password function
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// Create user function
export async function createUser(userData: {
  email: string
  password: string
  name: string
  farm_location: string
  soil_type: string
}): Promise<User> {
  try {
    const hashedPassword = await hashPassword(userData.password)

    const result = await sql`
      INSERT INTO users (email, password, name, farm_location, soil_type)
      VALUES (${userData.email}, ${hashedPassword}, ${userData.name}, ${userData.farm_location}, ${userData.soil_type})
      RETURNING id, email, name, farm_location as "farmLocation", soil_type as "soilType", created_at, last_login
    `

    if (!result || result.length === 0) {
      throw new Error("Failed to create user")
    }

    return result[0] as User
  } catch (error) {
    console.error("Error creating user:", error)
    throw new Error("Failed to create user")
  }
}

// Get user with password function
export async function getUserWithPassword(email: string): Promise<UserWithPassword | null> {
  try {
    const result = await sql`
      SELECT id, email, password, name, farm_location as "farmLocation", soil_type as "soilType", created_at, last_login
      FROM users 
      WHERE email = ${email}
    `

    return (result[0] as UserWithPassword) || null
  } catch (error) {
    console.error("Error getting user with password:", error)
    return null
  }
}

// Create session function
export async function createSession(userId: number): Promise<string> {
  try {
    const token = generateToken()
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

    await sql`
      INSERT INTO sessions (user_id, session_token, expires_at)
      VALUES (${userId}, ${token}, ${expires.toISOString()})
    `

    return token
  } catch (error) {
    console.error("Error creating session:", error)
    throw new Error("Failed to create session")
  }
}

// Delete session function
export async function deleteSession(sessionToken: string): Promise<void> {
  try {
    await sql`DELETE FROM sessions WHERE session_token = ${sessionToken}`
  } catch (error) {
    console.error("Error deleting session:", error)
  }
}

// Update last login function
export async function updateLastLogin(userId: number): Promise<void> {
  try {
    await sql`
      UPDATE users 
      SET last_login = NOW() 
      WHERE id = ${userId}
    `
  } catch (error) {
    console.error("Error updating last login:", error)
  }
}

// Get user by email function
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const result = await sql`
      SELECT id, email, name, farm_location as "farmLocation", soil_type as "soilType", created_at, last_login
      FROM users 
      WHERE email = ${email}
    `

    return (result[0] as User) || null
  } catch (error) {
    console.error("Error getting user by email:", error)
    return null
  }
}

// Get session user function
export async function getSessionUser(sessionToken: string): Promise<User | null> {
  try {
    const result = await sql`
      SELECT u.id, u.email, u.name, u.farm_location as "farmLocation", u.soil_type as "soilType", u.created_at, u.last_login
      FROM users u
      JOIN sessions s ON u.id = s.user_id
      WHERE s.session_token = ${sessionToken} AND s.expires_at > NOW()
    `

    return (result[0] as User) || null
  } catch (error) {
    console.error("Error getting session user:", error)
    return null
  }
}

// Clean up expired sessions function
export async function cleanupExpiredSessions(): Promise<void> {
  try {
    await sql`DELETE FROM sessions WHERE expires_at < NOW()`
  } catch (error) {
    console.error("Error cleaning up expired sessions:", error)
  }
}

// Sign up function
export async function signUp(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const name = formData.get("name") as string
    const farmLocation = formData.get("farmLocation") as string
    const soilType = formData.get("soilType") as string

    // Basic validation
    if (!email || !password || !name || !farmLocation || !soilType) {
      return { error: "All fields are required" }
    }

    if (password.length < 6) {
      return { error: "Password must be at least 6 characters" }
    }

    // Check if user exists
    const existingUsers = await sql`SELECT id FROM users WHERE email = ${email}`
    if (existingUsers.length > 0) {
      return { error: "Email already in use" }
    }

    // Create user
    const user = await createUser({
      email,
      password,
      name,
      farm_location: farmLocation,
      soil_type: soilType,
    })

    // Create session
    const token = await createSession(user.id)

    // Set cookie
    cookies().set({
      name: "session",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    })

    console.log("User created successfully:", user.id)
  } catch (error) {
    console.error("Signup error:", error)
    return { error: "An error occurred during signup" }
  }

  // Redirect to dashboard on success
  redirect("/dashboard")
}

// Sign in function
export async function signIn(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // Basic validation
    if (!email || !password) {
      return { error: "Email and password are required" }
    }

    // Get user with password
    const user = await getUserWithPassword(email)
    if (!user) {
      return { error: "Invalid email or password" }
    }

    // Verify password
    const passwordMatch = await verifyPassword(password, user.password)
    if (!passwordMatch) {
      return { error: "Invalid email or password" }
    }

    // Update last login
    await updateLastLogin(user.id)

    // Clean up old sessions
    await sql`DELETE FROM sessions WHERE user_id = ${user.id} OR expires_at < NOW()`

    // Create new session
    const token = await createSession(user.id)

    // Set cookie
    cookies().set({
      name: "session",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    })

    console.log("User logged in successfully:", user.id)
  } catch (error) {
    console.error("Login error:", error)
    return { error: "An error occurred during login" }
  }

  // Redirect to dashboard on success
  redirect("/dashboard")
}

// Sign out function
export async function signOut() {
  try {
    const sessionToken = cookies().get("session")?.value

    if (sessionToken) {
      await deleteSession(sessionToken)
    }

    cookies().delete("session")
  } catch (error) {
    console.error("Logout error:", error)
  }

  redirect("/")
}

// Get current user function
export async function getCurrentUser(): Promise<User | null> {
  try {
    const sessionToken = cookies().get("session")?.value

    if (!sessionToken) {
      return null
    }

    return await getSessionUser(sessionToken)
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}

// Verify auth function
export async function verifyAuth() {
  try {
    const sessionToken = cookies().get("session")?.value

    if (!sessionToken) return null

    // Check if session is valid
    const result = await sql`
      SELECT user_id FROM sessions 
      WHERE session_token = ${sessionToken} AND expires_at > NOW()
    `

    if (result.length === 0) return null

    return { userId: result[0].user_id }
  } catch (error) {
    console.error("Verify auth error:", error)
    return null
  }
}
