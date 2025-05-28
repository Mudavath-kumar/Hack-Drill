import { type NextRequest, NextResponse } from "next/server"
import { createUser, createSession } from "@/lib/auth"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, farm_location, soil_type } = await request.json()

    // Validation
    if (!email || !password || !name || !farm_location || !soil_type) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    // Create user
    const user = await createUser({
      email,
      password,
      name,
      farm_location,
      soil_type,
    })

    // Create session
    const sessionToken = await createSession(user.id)

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    return NextResponse.json({
      message: "Account created successfully",
      user,
    })
  } catch (error) {
    console.error("Sign up error:", error)

    if (error instanceof Error && error.message.includes("duplicate key")) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 })
    }

    return NextResponse.json({ error: "Failed to create account" }, { status: 500 })
  }
}
