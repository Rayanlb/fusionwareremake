import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Mock authentication - replace with actual database validation
    if (email === "admin@fusionware.com" && password === "admin123") {
      return NextResponse.json({
        success: true,
        user: {
          id: "1",
          name: "Admin User",
          email: "admin@fusionware.com",
          role: "admin",
        },
      })
    } else if (email === "user@example.com" && password === "user123") {
      return NextResponse.json({
        success: true,
        user: {
          id: "2",
          name: "John Doe",
          email: "user@example.com",
          role: "customer",
        },
      })
    }

    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
