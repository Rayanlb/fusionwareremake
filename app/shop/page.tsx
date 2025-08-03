"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ProductModal } from "@/components/product-modal"
import { Search } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  shortDescription: string
  price: number
  category: string
  features: string[]
  durations: {
    label: string
    days: number
    price: number
  }[]
  image: string
  popular: boolean
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockProducts: Product[] = [
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
    setProducts(mockProducts)
    setFilteredProducts(mockProducts)
  }, [])

  useEffect(() => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, products])

  const categories = ["all", "gaming", "productivity", "security"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Digital Products</h1>
          <p className="text-gray-300 text-lg">Discover our premium collection of digital solutions</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900/50 border-purple-500/20 text-white"
            />
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "border-purple-500/20 text-purple-400 hover:bg-purple-400 hover:text-black"
                }
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all"
            >
              <CardHeader>
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  {product.popular && <Badge className="absolute top-2 right-2 bg-purple-600">Popular</Badge>}
                </div>
                <CardTitle className="text-white">{product.name}</CardTitle>
                <CardDescription className="text-gray-300">{product.shortDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-purple-400">${product.price}</span>
                  <Badge variant="outline" className="border-purple-500/20 text-purple-400">
                    {product.category}
                  </Badge>
                </div>
                <Button
                  onClick={() => setSelectedProduct(product)}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  )
}
