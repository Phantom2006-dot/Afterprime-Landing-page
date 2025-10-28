"use client"

import Image from "next/image"

export default function Footer() {
  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-brand-navy-light to-brand-navy border-t border-brand-gold/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 relative flex-shrink-0">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Adobe%20Express%20-%20file-hd0tzraST5XcrazSXdKLcX9Toa4Efc.png"
                  alt="Afterprime Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold">Afterprime</span>
                <span className="text-xs bg-gradient-to-r from-brand-gold to-brand-pink bg-clip-text text-transparent font-semibold">
                  GET PAID TO TRADE
                </span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">Lowest verified costs. Flow rewards. Real alignment.</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-brand-gold transition-colors">
                  Platforms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-orange transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-pink transition-colors">
                  Features
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-brand-gold transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-orange transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-pink transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-brand-gold transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-pink transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-purple transition-colors">
                  Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-brand-gold/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2025 Afterprime. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-brand-gold transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-brand-orange transition-colors">
              LinkedIn
            </a>
            <a href="#" className="hover:text-brand-pink transition-colors">
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
