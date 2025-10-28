"use client"

import { useEffect, useRef, useState } from "react"

const propositions = [
  {
    icon: "💰",
    title: "Lowest Verified Costs",
    description: "Industry-leading spreads and commissions verified by ForexBenchmark. Save thousands on every trade.",
  },
  {
    icon: "🎁",
    title: "Flow Rewards",
    description: "Get paid to trade. Earn rewards on every lot traded, directly aligned with your success.",
  },
  {
    icon: "🛠️",
    title: "Pro Platforms",
    description: "MT4, MT5, TraderEvolution, and FIX API. Choose your weapon and trade your way.",
  },
  {
    icon: "🌍",
    title: "Multi-Asset Markets",
    description: "Forex, Indices, Commodities, Crypto. Trade what matters across all major markets.",
  },
  {
    icon: "🔍",
    title: "Transparency",
    description: "Real costs, real data, real alignment. No hidden fees, no surprises.",
  },
  {
    icon: "⚡",
    title: "Lightning Fast",
    description: "Ultra-low latency execution. Your edge matters, and we preserve it.",
  },
]

export default function ValuePropositions() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(propositions.length).fill(false))
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
    <section id="value" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Why Traders Choose Afterprime</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built by traders, for traders. Real advantages that compound over time.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {propositions.map((prop, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className={`group relative p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-brand-gold/50 transition-all duration-500 cursor-pointer overflow-hidden ${
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
                <div className="text-4xl mb-4">{prop.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{prop.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{prop.description}</p>
              </div>

              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-xl border border-brand-gold/0 group-hover:border-brand-gold/50 transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
