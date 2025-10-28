"use client"

import { useEffect, useRef, useState } from "react"

export default function CostAdvantageSection() {
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
    <section
      id="costs"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-brand-navy-light"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">See Your Cost Advantage</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interactive calculator showing real profit differences. Adjust your parameters and watch the advantage
            compound.
          </p>
        </div>

        {/* Calculator Embed */}
        <div
          className={`rounded-xl border border-border bg-card/50 backdrop-blur-sm p-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <iframe
            src="https://blob.v0.app/Wz2AF.html"
            className="w-full h-[600px] rounded-lg border border-border/50 bg-background"
            title="Cost Advantage Calculator"
            style={{ colorScheme: "dark" }}
          />
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-brand-gold to-brand-orange bg-clip-text text-transparent mb-2">
              42.0%
            </div>
            <p className="text-muted-foreground text-sm">Lower costs than industry average</p>
          </div>
          <div className="p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-brand-pink to-brand-purple bg-clip-text text-transparent mb-2">
              $4.20
            </div>
            <p className="text-muted-foreground text-sm">Cost per standard lot (verified)</p>
          </div>
          <div className="p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-brand-gold via-brand-pink to-brand-purple bg-clip-text text-transparent mb-2">
              Real-Time
            </div>
            <p className="text-muted-foreground text-sm">Updated daily from ForexBenchmark</p>
          </div>
        </div>
      </div>
    </section>
  )
}
