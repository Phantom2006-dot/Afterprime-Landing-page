"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-r from-[#0a1128]/95 via-[#0f172a]/95 to-[#0a1128]/95 backdrop-blur-md border-b border-[#FFD700]/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo and Branding */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 relative flex-shrink-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Adobe%20Express%20-%20file-hd0tzraST5XcrazSXdKLcX9Toa4Efc.png"
              alt="Afterprime Logo"
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-white font-bold text-sm sm:text-lg whitespace-nowrap">Afterprime</span>
            <span className="text-xs bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF69B4] bg-clip-text text-transparent font-semibold whitespace-nowrap">
              GET PAID TO TRADE
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#value"
            className="text-[#94a3b8] hover:text-[#FFD700] transition-colors text-sm font-medium"
          >
            Value
          </a>
          <a
            href="#costs"
            className="text-[#94a3b8] hover:text-[#FFA500] transition-colors text-sm font-medium"
          >
            Costs
          </a>
          <a
            href="#rewards"
            className="text-[#94a3b8] hover:text-[#FF69B4] transition-colors text-sm font-medium"
          >
            Rewards
          </a>
          <a
            href="#platforms"
            className="text-[#94a3b8] hover:text-[#9333ea] transition-colors text-sm font-medium"
          >
            Platforms
          </a>
        </nav>

        {/* CTA Button */}
        <button className="px-4 sm:px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF69B4] text-[#1a1a1a] font-bold text-xs sm:text-sm hover:shadow-2xl hover:shadow-[#FF69B4]/60 transition-all duration-300 hover:scale-105 active:scale-95 flex-shrink-0">
          Get Started
        </button>
      </div>
    </header>
  )
}
