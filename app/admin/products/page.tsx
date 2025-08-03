"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AdminSidebar } from "@/components/admin-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { useToast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, Eye, Search, Package } from "lucide-react"

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
  status: "active" | "inactive" | "draft"
  createdAt: string
  updatedAt: string
}

export default function ProductManagementPage() {
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    shortDescription: "",
    price: 0,
    category: "",
    features: [""],
    durations: [{ label: "1 Month", days: 30, price: 0 }],
    image: "",
    popular: false,
    status: "draft" as const,
  })

  useEffect(() => {
    // Mock data - replace with actual API calls
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
        status: "active",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-15T00:00:00Z",
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
        status: "active",
        createdAt: "2024-01-02T00:00:00Z",
        updatedAt: "2024-01-10T00:00:00Z",
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
        status: "active",
        createdAt: "2024-01-03T00:00:00Z",
        updatedAt: "2024-01-12T00:00:00Z",
      },
    ]
    setProducts(mockProducts)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600"
      case "inactive":
        return "bg-red-600"
      case "draft":
        return "bg-yellow-600"
      default:
        return "bg-gray-600"
    }
  }

  const handleCreateProduct = async () => {
    if (!newProduct.name || !newProduct.description || !newProduct.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const product: Product = {
      id: String(products.length + 1),
      ...newProduct,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setProducts((prev) => [product, ...prev])
    setNewProduct({
      name: "",
      description: "",
      shortDescription: "",
      price: 0,
      category: "",
      features: [""],
      durations: [{ label: "1 Month", days: 30, price: 0 }],
      image: "",
      popular: false,
      status: "draft",
    })
    setIsCreateDialogOpen(false)

    toast({
      title: "Product created!",
      description: `${product.name} has been created successfully.`,
    })
  }

  const handleEditProduct = async () => {
    if (!selectedProduct) return

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setProducts((prev) =>
      prev.map((p) => (p.id === selectedProduct.id ? { ...selectedProduct, updatedAt: new Date().toISOString() } : p)),
    )
    setIsEditDialogOpen(false)
    setSelectedProduct(null)

    toast({
      title: "Product updated!",
      description: `${selectedProduct.name} has been updated successfully.`,
    })
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    setProducts((prev) => prev.filter((p) => p.id !== productId))

    toast({
      title: "Product deleted!",
      description: "The product has been deleted successfully.",
    })
  }

  const addFeature = (isEdit = false) => {
    if (isEdit && selectedProduct) {
      setSelectedProduct({
        ...selectedProduct,
        features: [...selectedProduct.features, ""],
      })
    } else {
      setNewProduct((prev) => ({
        ...prev,
        features: [...prev.features, ""],
      }))
    }
  }

  const removeFeature = (index: number, isEdit = false) => {
    if (isEdit && selectedProduct) {
      setSelectedProduct({
        ...selectedProduct,
        features: selectedProduct.features.filter((_, i) => i !== index),
      })
    } else {
      setNewProduct((prev) => ({
        ...prev,
        features: prev.features.filter((_, i) => i !== index),
      }))
    }
  }

  const updateFeature = (index: number, value: string, isEdit = false) => {
    if (isEdit && selectedProduct) {
      const newFeatures = [...selectedProduct.features]
      newFeatures[index] = value
      setSelectedProduct({
        ...selectedProduct,
        features: newFeatures,
      })
    } else {
      const newFeatures = [...newProduct.features]
      newFeatures[index] = value
      setNewProduct((prev) => ({
        ...prev,
        features: newFeatures,
      }))
    }
  }

  const addDuration = (isEdit = false) => {
    if (isEdit && selectedProduct) {
      setSelectedProduct({
        ...selectedProduct,
        durations: [...selectedProduct.durations, { label: "", days: 0, price: 0 }],
      })
    } else {
      setNewProduct((prev) => ({
        ...prev,
        durations: [...prev.durations, { label: "", days: 0, price: 0 }],
      }))
    }
  }

  const removeDuration = (index: number, isEdit = false) => {
    if (isEdit && selectedProduct) {
      setSelectedProduct({
        ...selectedProduct,
        durations: selectedProduct.durations.filter((_, i) => i !== index),
      })
    } else {
      setNewProduct((prev) => ({
        ...prev,
        durations: prev.durations.filter((_, i) => i !== index),
      }))
    }
  }

  const updateDuration = (index: number, field: string, value: any, isEdit = false) => {
    if (isEdit && selectedProduct) {
      const newDurations = [...selectedProduct.durations]
      newDurations[index] = { ...newDurations[index], [field]: value }
      setSelectedProduct({
        ...selectedProduct,
        durations: newDurations,
      })
    } else {
      const newDurations = [...newProduct.durations]
      newDurations[index] = { ...newDurations[index], [field]: value }
      setNewProduct((prev) => ({
        ...prev,
        durations: newDurations,
      }))
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const categories = ["all", "gaming", "productivity", "security"]

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Product Management</h1>
                <p className="text-gray-300">Create, edit, and manage your digital products</p>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-purple-500/20 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Product</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Product Name *</Label>
                          <Input
                            id="name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))}
                            className="bg-gray-800/50 border-purple-500/20"
                            placeholder="Enter product name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category *</Label>
                          <Select
                            value={newProduct.category}
                            onValueChange={(value) => setNewProduct((prev) => ({ ...prev, category: value }))}
                          >
                            <SelectTrigger className="bg-gray-800/50 border-purple-500/20">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-purple-500/20">
                              <SelectItem value="gaming">Gaming</SelectItem>
                              <SelectItem value="productivity">Productivity</SelectItem>
                              <SelectItem value="security">Security</SelectItem>
                              <SelectItem value="utility">Utility</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shortDescription">Short Description *</Label>
                        <Input
                          id="shortDescription"
                          value={newProduct.shortDescription}
                          onChange={(e) => setNewProduct((prev) => ({ ...prev, shortDescription: e.target.value }))}
                          className="bg-gray-800/50 border-purple-500/20"
                          placeholder="Brief description for product cards"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Full Description *</Label>
                        <Textarea
                          id="description"
                          value={newProduct.description}
                          onChange={(e) => setNewProduct((prev) => ({ ...prev, description: e.target.value }))}
                          className="bg-gray-800/50 border-purple-500/20 min-h-[120px]"
                          placeholder="Detailed product description"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="image">Image URL</Label>
                          <Input
                            id="image"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct((prev) => ({ ...prev, image: e.target.value }))}
                            className="bg-gray-800/50 border-purple-500/20"
                            placeholder="Product image URL"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="status">Status</Label>
                          <Select
                            value={newProduct.status}
                            onValueChange={(value: any) => setNewProduct((prev) => ({ ...prev, status: value }))}
                          >
                            <SelectTrigger className="bg-gray-800/50 border-purple-500/20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-purple-500/20">
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="popular"
                          checked={newProduct.popular}
                          onChange={(e) => setNewProduct((prev) => ({ ...prev, popular: e.target.checked }))}
                          className="rounded border-purple-500/20"
                        />
                        <Label htmlFor="popular">Mark as Popular</Label>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">Features</h3>
                        <Button
                          type="button"
                          onClick={() => addFeature()}
                          variant="outline"
                          size="sm"
                          className="border-purple-500/20 text-purple-400 bg-transparent"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Feature
                        </Button>
                      </div>
                      {newProduct.features.map((feature, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={feature}
                            onChange={(e) => updateFeature(index, e.target.value)}
                            className="bg-gray-800/50 border-purple-500/20"
                            placeholder="Feature description"
                          />
                          {newProduct.features.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeFeature(index)}
                              variant="outline"
                              size="sm"
                              className="border-red-500/20 text-red-400 bg-transparent"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Durations & Pricing */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">Durations & Pricing</h3>
                        <Button
                          type="button"
                          onClick={() => addDuration()}
                          variant="outline"
                          size="sm"
                          className="border-purple-500/20 text-purple-400 bg-transparent"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Duration
                        </Button>
                      </div>
                      {newProduct.durations.map((duration, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2">
                          <Input
                            value={duration.label}
                            onChange={(e) => updateDuration(index, "label", e.target.value)}
                            className="bg-gray-800/50 border-purple-500/20"
                            placeholder="Duration label"
                          />
                          <Input
                            type="number"
                            value={duration.days}
                            onChange={(e) => updateDuration(index, "days", Number.parseInt(e.target.value) || 0)}
                            className="bg-gray-800/50 border-purple-500/20"
                            placeholder="Days"
                          />
                          <Input
                            type="number"
                            step="0.01"
                            value={duration.price}
                            onChange={(e) => updateDuration(index, "price", Number.parseFloat(e.target.value) || 0)}
                            className="bg-gray-800/50 border-purple-500/20"
                            placeholder="Price"
                          />
                          {newProduct.durations.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeDuration(index)}
                              variant="outline"
                              size="sm"
                              className="border-red-500/20 text-red-400 bg-transparent"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsCreateDialogOpen(false)}
                        className="border-purple-500/20 text-purple-400 bg-transparent"
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleCreateProduct} className="bg-purple-600 hover:bg-purple-700">
                        Create Product
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{products.length}</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Active Products</CardTitle>
                  <Package className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {products.filter((p) => p.status === "active").length}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Draft Products</CardTitle>
                  <Package className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {products.filter((p) => p.status === "draft").length}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Popular Products</CardTitle>
                  <Package className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{products.filter((p) => p.popular).length}</div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-900/50 border-purple-500/20 text-white"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48 bg-gray-900/50 border-purple-500/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-purple-500/20">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Products Table */}
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Products</CardTitle>
                <CardDescription className="text-gray-300">Manage your digital product catalog</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="text-white font-semibold">{product.name}</h3>
                          <p className="text-gray-400 text-sm">{product.shortDescription}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge className={getStatusColor(product.status)}>{product.status.toUpperCase()}</Badge>
                            <Badge variant="outline" className="border-purple-500/20 text-purple-400">
                              {product.category}
                            </Badge>
                            {product.popular && <Badge className="bg-yellow-600">Popular</Badge>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">${product.price}</span>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedProduct(product)}
                            className="border-purple-500/20 text-purple-400 bg-transparent"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedProduct(product)
                              setIsEditDialogOpen(true)
                            }}
                            className="border-blue-500/20 text-blue-400 bg-transparent"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="border-red-500/20 text-red-400 bg-transparent"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                      <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400 text-lg">No products found</p>
                      <p className="text-gray-500">Try adjusting your search or create a new product</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Edit Product Dialog */}
            {selectedProduct && (
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="bg-gray-900 border-purple-500/20 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Product: {selectedProduct.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    {/* Same form structure as create, but with selectedProduct data */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-name">Product Name *</Label>
                          <Input
                            id="edit-name"
                            value={selectedProduct.name}
                            onChange={(e) =>
                              setSelectedProduct((prev) => (prev ? { ...prev, name: e.target.value } : null))
                            }
                            className="bg-gray-800/50 border-purple-500/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-category">Category *</Label>
                          <Select
                            value={selectedProduct.category}
                            onValueChange={(value) =>
                              setSelectedProduct((prev) => (prev ? { ...prev, category: value } : null))
                            }
                          >
                            <SelectTrigger className="bg-gray-800/50 border-purple-500/20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-purple-500/20">
                              <SelectItem value="gaming">Gaming</SelectItem>
                              <SelectItem value="productivity">Productivity</SelectItem>
                              <SelectItem value="security">Security</SelectItem>
                              <SelectItem value="utility">Utility</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      {/* Add similar fields for editing */}
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditDialogOpen(false)}
                        className="border-purple-500/20 text-purple-400 bg-transparent"
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleEditProduct} className="bg-purple-600 hover:bg-purple-700">
                        Update Product
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
