"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion"

const testimonials = [
  {
    quote: "Transformed our entire creative process overnight.",
    author: "Sarah Chen",
    role: "Design Director",
    company: "Linear",
  },
  {
    quote: "The most elegant solution we've ever implemented.",
    author: "Marcus Webb",
    role: "Creative Lead",
    company: "Vercel",
  },
  {
    quote: "Pure craftsmanship in every single detail.",
    author: "Elena Frost",
    role: "Head of Product",
    company: "Stripe",
  },
]

export function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const x = useSpring(mouseX, { damping: 25, stiffness: 200 })
  const y = useSpring(mouseY, { damping: 25, stiffness: 200 })
  const numberX = useTransform(x, [-200, 200], [-20, 20])
  const numberY = useTransform(y, [-200, 200], [-10, 10])

  useEffect(() => {
    const checkMobile = () => {
      if (containerRef.current) {
        const width = window.innerWidth <= 768
        if (width) {
          mouseX.set(0)
          mouseY.set(0)
        }
      }
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [mouseX, mouseY])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(event.clientX - centerX)
    mouseY.set(event.clientY - centerY)
  }

  const goNext = () => setActiveIndex((prev) => (prev + 1) % testimonials.length)
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    const timer = window.setInterval(goNext, 6000)
    return () => window.clearInterval(timer)
  }, [])

  const current = testimonials[activeIndex] ?? testimonials[0]!

  return (
    <section className="relative overflow-hidden bg-black text-white py-24">
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 40%)" }} />
      <div className="relative mx-auto max-w-6xl px-6" ref={containerRef} onMouseMove={handleMouseMove}>
        <div className="mb-16 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-white/60">Customer feedback</p>
          <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">Trusted by teams who build for next-gen audiences</h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_0.4fr]">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <motion.div style={{ x: numberX, y: numberY }} className="pointer-events-none absolute -left-8 top-1/2 hidden h-40 w-40 -translate-y-1/2 select-none text-[10rem] font-black text-white/5 md:block">
              {activeIndex + 1}
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.company}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.35 }}
                className="relative"
              >
                <p className="text-xl leading-9 text-white/90 md:text-2xl">“{current.quote}”</p>
                <div className="mt-8 flex flex-col gap-1 text-sm text-white/70">
                  <span className="font-semibold text-white">{current.author}</span>
                  <span>{current.role} · {current.company}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/60">Feedback flow</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">Responsive, human motion</h3>
              </div>
              <div className="flex gap-2">
                <button onClick={goPrev} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/90 transition hover:bg-white/10">
                  Prev
                </button>
                <button onClick={goNext} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/90 transition hover:bg-white/10">
                  Next
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-white/70">
                Every testimonial is designed to stand out with strong typography and layered depth, matching the hero section feel across the page.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-black/40 p-4 text-sm text-white/70">High-impact visuals and premium transitions help deliver a polished brand experience.</div>
                <div className="rounded-3xl border border-white/10 bg-black/40 p-4 text-sm text-white/70">The motion system keeps the page feeling smooth and cohesive on scroll.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
