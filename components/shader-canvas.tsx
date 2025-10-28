"use client"

import { useEffect, useRef } from "react"

export default function ShaderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle system for bubbles
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      opacity: number
      life: number
    }> = []

    // Create initial particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        life: Math.random() * 100 + 50,
      })
    }

    // Ripple effect
    const ripples: Array<{
      x: number
      y: number
      radius: number
      maxRadius: number
      opacity: number
    }> = []

    // Animation loop
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw and update particles (bubbles)
      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        p.life--
        p.opacity = (p.life / 150) * 0.5

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Draw bubble
        ctx.fillStyle = `rgba(255, 213, 79, ${p.opacity})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()

        // Glow effect
        ctx.strokeStyle = `rgba(255, 213, 79, ${p.opacity * 0.5})`
        ctx.lineWidth = 1
        ctx.stroke()

        // Respawn if dead
        if (p.life <= 0) {
          particles[i] = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.2,
            life: Math.random() * 100 + 50,
          }
        }
      })

      // Draw and update ripples
      ripples.forEach((r, i) => {
        r.radius += 2
        r.opacity = 1 - r.radius / r.maxRadius

        ctx.strokeStyle = `rgba(255, 213, 79, ${r.opacity * 0.3})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2)
        ctx.stroke()

        if (r.radius >= r.maxRadius) {
          ripples.splice(i, 1)
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Create ripples on click
    const handleClick = (e: MouseEvent) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 100,
        opacity: 1,
      })
    }

    canvas.addEventListener("click", handleClick)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("click", handleClick)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto" />
}
