"use client"

import { useEffect, useRef } from "react"

interface CursorPosition {
  x: number
  y: number
}

export default function GlowingCursor({ position }: { position: CursorPosition }) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cursorRef.current) return

    // Update cursor position
    cursorRef.current.style.left = `${position.x}px`
    cursorRef.current.style.top = `${position.y}px`

    // Create trail effect
    if (Math.random() > 0.8 && trailRef.current) {
      const trail = document.createElement("div")
      trail.className = "absolute pointer-events-none"
      trail.style.left = `${position.x}px`
      trail.style.top = `${position.y}px`
      trail.style.width = "8px"
      trail.style.height = "8px"
      trail.style.borderRadius = "50%"
      trail.style.background = `linear-gradient(135deg, #FFD54F, #E91E63)`
      trail.style.opacity = "0.6"
      trail.style.boxShadow = "0 0 10px rgba(255, 213, 79, 0.8)"
      trail.style.animation = "float-up 0.6s ease-out forwards"

      trailRef.current.appendChild(trail)

      setTimeout(() => trail.remove(), 600)
    }
  }, [position])

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] w-6 h-6 -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "radial-gradient(circle, rgba(255,213,79,0.8), rgba(233,30,99,0.4))",
          borderRadius: "50%",
          boxShadow: "0 0 20px rgba(255, 213, 79, 0.6), 0 0 40px rgba(233, 30, 99, 0.3)",
          transition: "all 0.1s ease-out",
        }}
      >
        {/* Inner glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,213,79,1), transparent)",
            width: "4px",
            height: "4px",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 10px rgba(255, 213, 79, 1)",
          }}
        />
      </div>

      {/* Trail container */}
      <div ref={trailRef} className="fixed inset-0 pointer-events-none z-[9998]" />
    </>
  )
}
