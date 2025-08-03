import Link from "next/link"
import { Facebook, Twitter, Instagram, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg" />
              <span className="text-xl font-bold text-white">Fusion Ware</span>
            </div>
            <p className="text-gray-400 mb-4">
              Premium digital solutions for modern needs. Secure, reliable, and innovative.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-purple-400">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-400">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-400">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-400">
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-purple-400">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/status" className="text-gray-400 hover:text-purple-400">
                  Status
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-purple-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-purple-400">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-purple-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-purple-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-gray-400 hover:text-purple-400">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-500/20 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 Fusion Ware. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
