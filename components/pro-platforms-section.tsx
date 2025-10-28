"use client"

import { useEffect, useRef, useState } from "react"

const platforms = [
  {
    name: "MetaTrader 4",
    description: "The industry standard. Familiar, powerful, reliable.",
    features: ["Expert Advisors", "Custom Indicators", "Backtesting"],
    icon: "📊",
  },
  {
    name: "MetaTrader 5",
    description: "Next generation. More assets, more power, more control.",
    features: ["Multi-Asset Trading", "Advanced Analytics", "Hedging"],
    icon: "🚀",
  },
  {
    name: "TraderEvolution",
    description: "Modern web platform. Trade anywhere, anytime.",
    features: ["Web-Based", "Mobile Ready", "Real-Time Charts"],
    icon: "💻",
  },
  {
    name: "FIX API",
    description: "Direct market access. For serious traders and institutions.",
    features: ["Ultra-Low Latency", "Custom Integration", "Institutional Grade"],
    icon: "⚡",
  },
]

export default function ProPlatformsSection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(platforms.length).fill(false))
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardsRef.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setVisibleCards((prev) => {
                const newVisible = [...prev]
                newVisible[index] = true
                return newVisible
              })
            }
          }
        })
      },
      { threshold: 0.1 },
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="platforms"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-brand-navy-light"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Pro Platforms</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your trading environment. All platforms, same low costs and flow rewards.
          </p>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {platforms.map((platform, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className={`group relative p-8 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-brand-gold/50 transition-all duration-500 overflow-hidden ${
                visibleCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: visibleCards[index] ? `${index * 100}ms` : "0ms",
              }}
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 via-transparent to-brand-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10">
                <div className="text-5xl mb-4">{platform.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{platform.name}</h3>
                <p className="text-muted-foreground mb-6">{platform.description}</p>

                <div className="space-y-2">
                  {platform.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
