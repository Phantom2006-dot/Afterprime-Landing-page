"use client"

import { useEffect, useRef, useState } from "react"

export default function FlowRewardsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [animatedValue, setAnimatedValue] = useState(0)

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

  useEffect(() => {
    if (!isVisible) return

    let current = 0
    const target = 5181
    const increment = target / 30

    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        setAnimatedValue(target)
        clearInterval(interval)
      } else {
        setAnimatedValue(Math.floor(current))
      }
    }, 30)

    return () => clearInterval(interval)
  }, [isVisible])

  return (
    <section id="rewards" ref={sectionRef} className="relative py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Flow Rewards</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Earn up to $5,181 per month trading 100 lots. Get paid to trade with our flow rewards program.
          </p>
        </div>

        {/* Main Card */}
        <div
          className={`rounded-xl border border-border bg-gradient-to-br from-card/50 to-brand-navy-light/50 backdrop-blur-sm p-8 md:p-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">Get Paid to Trade</h3>
              <p className="text-muted-foreground mb-6">
                Our flow rewards program directly aligns our success with yours. The more you trade, the more you earn.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Earn rewards on every lot traded",
                  "No minimum trading volume",
                  "Instant payouts",
                  "Transparent reward structure",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-gold to-brand-pink" />
                    {item}
                  </li>
                ))}
              </ul>

              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-brand-gold via-brand-orange to-brand-pink text-background font-semibold hover:shadow-lg hover:shadow-brand-pink/50 transition-all duration-300 hover:scale-105">
                Learn About Rewards
              </button>
            </div>

            {/* Right Stats */}
            <div className="space-y-4">
              <div className="p-6 rounded-lg border border-brand-gold/30 bg-brand-gold/5 backdrop-blur-sm">
                <p className="text-muted-foreground text-sm mb-2">Monthly Earnings (100 lots)</p>
                <div className="text-4xl font-bold text-brand-gold">${animatedValue.toLocaleString()}</div>
              </div>

              <div className="p-6 rounded-lg border border-brand-pink/30 bg-brand-pink/5 backdrop-blur-sm">
                <p className="text-muted-foreground text-sm mb-2">Annual Potential</p>
                <div className="text-4xl font-bold text-brand-pink">${(animatedValue * 12).toLocaleString()}</div>
              </div>

              <div className="p-6 rounded-lg border border-brand-purple/30 bg-brand-purple/5 backdrop-blur-sm">
                <p className="text-muted-foreground text-sm mb-2">Per Lot Reward</p>
                <div className="text-4xl font-bold text-brand-purple">${(animatedValue / 100).toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
