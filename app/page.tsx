import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Shield, Zap, Users, Star } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee",
    },
    {
      icon: Zap,
      title: "Instant Delivery",
      description: "Get your digital products delivered instantly after purchase",
    },
    {
      icon: Users,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your needs",
    },
    {
      icon: Star,
      title: "Premium Quality",
      description: "Only the highest quality digital products and services",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-black/40" />
        <div className="relative max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-purple-600 hover:bg-purple-700">Welcome to Fusion Ware</Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Premium Digital
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {" "}
              Solutions
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Discover cutting-edge digital products designed to enhance your experience. From gaming enhancements to
            productivity tools, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Link href="/shop">Browse Products</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black bg-transparent"
            >
              <Link href="/contact">Get Support</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Why Choose Fusion Ware?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-900/50 border-purple-500/20 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <feature.icon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-center">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-purple-900/50 to-black/50 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-3xl text-white mb-4">Ready to Get Started?</CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Join thousands of satisfied customers and experience the difference
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Link href="/shop">Explore Products</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
