"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import ValuePropositions from "@/components/value-propositions"
import CostAdvantageSection from "@/components/cost-advantage-section"
import FlowRewardsSection from "@/components/flow-rewards-section"
import ProPlatformsSection from "@/components/pro-platforms-section"
import MultiAssetSection from "@/components/multi-asset-section"
import TransparencySection from "@/components/transparency-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"
import GlowingCursor from "@/components/glowing-cursor"
import AfterprimeProfitCalculator from "@/components/afterprime-profit-calculator"

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <main className="relative w-full overflow-x-hidden bg-background">
      <GlowingCursor position={mousePosition} />
      <Header />
      <Hero />
      <ValuePropositions />
      <section className="relative w-full bg-gradient-to-b from-slate-900/50 to-slate-800/30 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <AfterprimeProfitCalculator />
        </div>
      </section>
      <CostAdvantageSection />
      <FlowRewardsSection />
      <ProPlatformsSection />
      <MultiAssetSection />
      <TransparencySection />
      <CTASection />
      <Footer />
    </main>
  )
}
