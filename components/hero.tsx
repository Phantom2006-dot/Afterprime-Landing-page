"use client"

import { useEffect, useState } from "react"
import ShaderCanvas from "./shader-canvas"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden bg-background pt-20">
      <div className="absolute inset-0 w-full h-full">
        {/* Video Background */}
        <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-40">
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Firefly%20%E2%80%9CA%20mesmerizing%20underwater%20scene%20featuring%20glowing%203D%20jellyfish%20gracefully%20swimming%20in%20deep%20w%20%282%29%20%281%29-T3wanTdJzypBYwdD8UsaHZqZz8rBrA.mp4"
            type="video/mp4"
          />
        </video>
        {/* Colorful gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/40 via-brand-navy/60 to-brand-navy" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/10 via-transparent to-brand-pink/10 opacity-60" />
      </div>

      {/* Shader Effects Canvas */}
      <ShaderCanvas />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
  <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
    Get Paid
  </span>
  <br />
  <span className="text-white">to Trade</span>
</h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Lowest verified costs. Flow rewards. Professional platforms. Real alignment with traders.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-brand-gold via-brand-orange to-brand-pink text-background font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-brand-pink/60 transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto min-h-14 flex items-center justify-center">
              Start Trading
            </button>
            <button className="px-8 py-4 rounded-lg border-2 border-brand-gold text-brand-gold font-bold text-base sm:text-lg hover:bg-brand-gold/10 hover:shadow-lg hover:shadow-brand-gold/30 transition-all duration-300 w-full sm:w-auto min-h-14 flex items-center justify-center">
              Learn More
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-brand-gold rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-gradient-to-b from-brand-gold to-brand-pink rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
