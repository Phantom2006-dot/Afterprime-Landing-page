"use client"

import { useEffect, useRef, useState } from "react"

const assets = [
  { name: "Forex", icon: "💱", description: "Major, minor, and exotic pairs" },
  { name: "Indices", icon: "📈", description: "Global stock market indices" },
  { name: "Commodities", icon: "🛢️", description: "Oil, gold, metals, and more" },
  { name: "Crypto", icon: "₿", description: "Bitcoin, Ethereum, and altcoins" },
]

export default function MultiAssetSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Multi-Asset Markets</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trade everything you want across all major asset classes with the same low costs.
          </p>
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {assets.map((asset, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm hover:border-brand-gold/50 transition-all duration-500 text-center group cursor-pointer ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{asset.icon}</div>
              <h3 className="font-bold text-white mb-1">{asset.name}</h3>
              <p className="text-xs text-muted-foreground">{asset.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
