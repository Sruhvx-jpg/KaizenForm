"use client"

import { ContainerScroll } from "./container-scroll-animation"

export function BodySection() {
  return (
    <section className="relative overflow-hidden bg-black/95 text-white py-24">
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 35%)" }} />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-white/60">Interactive showcase</p>
          <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">Experience the motion-driven product flow</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70 leading-7">
            A modern product section that reveals your value with subtle scroll animation, polished motion, and layered contrasts that feel connected to the hero aesthetic.
          </p>
        </div>

        <ContainerScroll
          titleComponent={
            <>
              <h3 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Transform every conversion into an immersive journey.
              </h3>
              <p className="mt-4 text-sm text-white/70 max-w-2xl mx-auto">
                Build sections that move naturally as users scroll, with a premium card experience and a strong graphic focal point.
              </p>
            </>
          }
        >
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1400&q=80"
            alt="Interactive dashboard preview"
            className="mx-auto h-full w-full rounded-2xl object-cover object-center"
          />
        </ContainerScroll>
      </div>
    </section>
  )
}
