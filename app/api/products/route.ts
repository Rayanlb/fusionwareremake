import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock product data - replace with actual database query
    const products = [
      {
        id: "1",
        name: "Game Enhancement Pro",
        description:
          "Advanced gaming enhancement tool with multiple features including aimbot, wallhack, and ESP. Designed for competitive gaming with undetectable algorithms.",
        shortDescription: "Advanced gaming enhancement with multiple features",
        price: 29.99,
        category: "gaming",
        features: ["Aimbot", "Wallhack", "ESP", "No Recoil", "Speed Hack"],
        durations: [
          { label: "1 Day", days: 1, price: 9.99 },
          { label: "1 Week", days: 7, price: 19.99 },
          { label: "1 Month", days: 30, price: 29.99 },
          { label: "3 Months", days: 90, price: 79.99 },
        ],
        image: "/placeholder.svg?height=200&width=300",
        popular: true,
      },
      {
        id: "2",
        name: "Productivity Suite",
        description:
          "Complete productivity enhancement package with automation tools, workflow optimization, and advanced analytics.",
        shortDescription: "Complete productivity enhancement package",
        price: 49.99,
        category: "productivity",
        features: ["Automation Tools", "Workflow Optimization", "Analytics", "Team Collaboration"],
        durations: [
          { label: "1 Month", days: 30, price: 49.99 },
          { label: "6 Months", days: 180, price: 199.99 },
          { label: "1 Year", days: 365, price: 349.99 },
        ],
        image: "/placeholder.svg?height=200&width=300",
        popular: false,
      },
      {
        id: "3",
        name: "Security Shield",
        description:
          "Advanced security suite with real-time protection, privacy tools, and secure browsing capabilities.",
        shortDescription: "Advanced security and privacy protection",
        price: 39.99,
        category: "security",
        features: ["Real-time Protection", "Privacy Tools", "Secure Browsing", "VPN Access"],
        durations: [
          { label: "1 Month", days: 30, price: 39.99 },
          { label: "6 Months", days: 180, price: 179.99 },
          { label: "1 Year", days: 365, price: 299.99 },
        ],
        image: "/placeholder.svg?height=200&width=300",
        popular: true,
      },
    ]

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
