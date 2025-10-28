"use client"

import { useEffect, useRef, useState } from "react"

const transparencyPoints = [
  {
    title: "Real Costs",
    description: "No hidden fees. Every cost is verified by ForexBenchmark and updated daily.",
    icon: "💎",
  },
  {
    title: "Real Data",
    description: "Our statistics come from independent sources. No cherry-picked numbers.",
    icon: "📊",
  },
  {
    title: "Real Alignment",
    description: "We succeed when you succeed. Flow rewards align our incentives perfectly.",
    icon: "🤝",
  },
  {
    title: "Real Support",
    description: "Dedicated support team that understands trading. Not a chatbot.",
    icon: "👥",
  },
]

export default function TransparencySection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(transparencyPoints.length).fill(false))
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
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-brand-navy-light">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Built on Transparency</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real alignment with traders. No games, no tricks, just honest trading.
          </p>
        </div>

        {/* Transparency Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {transparencyPoints.map((point, index) => (
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
                <div className="text-4xl mb-4">{point.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{point.title}</h3>
                <p className="text-muted-foreground">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
