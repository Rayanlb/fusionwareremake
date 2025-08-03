"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Star, Shield, Zap } from "lucide-react"

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

interface ProductModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedDuration, setSelectedDuration] = useState(product.durations[0])

  const handlePurchase = () => {
    // Implement purchase logic here
    console.log(`Purchasing ${product.name} for ${selectedDuration.label}`)
    // Redirect to payment or handle purchase
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-gray-900 border-purple-500/20 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Image and Basic Info */}
          <div>
            <div className="relative mb-4">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              {product.popular && <Badge className="absolute top-2 right-2 bg-purple-600">Popular</Badge>}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="border-purple-500/20 text-purple-400">
                {product.category}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-300">4.8 (124 reviews)</span>
              </div>
            </div>

            <p className="text-gray-300 mb-6">{product.description}</p>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Features</h3>
              <div className="grid grid-cols-1 gap-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Features */}
            <Card className="bg-gray-800/50 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="font-semibold text-white">Security Features</span>
                </div>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Undetectable algorithms</li>
                  <li>• Regular updates</li>
                  <li>• 24/7 monitoring</li>
                  <li>• Secure delivery</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Purchase Section */}
          <div>
            <Card className="bg-gray-800/50 border-purple-500/20 mb-6">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Choose Duration</h3>

                <Select
                  value={selectedDuration.label}
                  onValueChange={(value) => {
                    const duration = product.durations.find((d) => d.label === value)
                    if (duration) setSelectedDuration(duration)
                  }}
                >
                  <SelectTrigger className="bg-gray-900/50 border-purple-500/20 text-white mb-4">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-purple-500/20">
                    {product.durations.map((duration) => (
                      <SelectItem key={duration.label} value={duration.label}>
                        <div className="flex justify-between items-center w-full">
                          <span>{duration.label}</span>
                          <span className="ml-4 font-semibold">${duration.price}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Selected Plan:</span>
                    <span className="text-white font-semibold">{selectedDuration.label}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Duration:</span>
                    <span className="text-white">{selectedDuration.days} days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Price:</span>
                    <span className="text-2xl font-bold text-purple-400">${selectedDuration.price}</span>
                  </div>
                </div>

                <Button
                  onClick={handlePurchase}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3"
                  size="lg"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Purchase Now - ${selectedDuration.price}
                </Button>

                <p className="text-xs text-gray-400 text-center mt-3">Instant delivery • 30-day money-back guarantee</p>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="space-y-4">
              <Card className="bg-gray-800/50 border-purple-500/20">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-white mb-2">What's Included</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Instant download link</li>
                    <li>• Setup instructions</li>
                    <li>• 24/7 customer support</li>
                    <li>• Regular updates</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-purple-500/20">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-white mb-2">System Requirements</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Windows 10/11</li>
                    <li>• 4GB RAM minimum</li>
                    <li>• Internet connection</li>
                    <li>• Administrator privileges</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
