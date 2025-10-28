"use client"

import { useEffect, useRef, useState } from "react"

export default function CTASection() {
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
      <div className="max-w-4xl mx-auto">
        <div
          className={`rounded-xl border border-border bg-gradient-to-br from-card/50 to-brand-navy-light/50 backdrop-blur-sm p-12 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Ready to Get Paid to Trade?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of traders who are already saving thousands and earning flow rewards.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
           <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF69B4] text-[#1a1a1a] font-bold text-lg hover:shadow-2xl hover:shadow-[#FF69B4]/50 transition-all duration-300 hover:scale-105 w-full sm:w-auto">
  Start Trading Now
</button>
<button className="px-8 py-4 rounded-lg border-2 border-[#FFD700] text-[#FFD700] font-bold text-lg hover:bg-[#FFD700]/10 transition-all duration-300 w-full sm:w-auto">
  Schedule Demo
</button>
          </div>
        </div>
      </div>
    </section>
  )
}
