"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { Since2003Section } from "@/components/sections/since2003-section"
import { ImpactSection } from "@/components/sections/impact-section"
import { SpotifySection } from "@/components/sections/spotify-section"
import { SupportSection } from "@/components/sections/support-section"
import { CTASection } from "@/components/sections/cta-section"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  useEffect(() => {

    const refresh = () => ScrollTrigger.refresh()

    window.addEventListener("load", refresh)

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 300)

    return () => {
      window.removeEventListener("load", refresh)
      clearTimeout(timeout)
    }

  }, [])

  return (
    <main className="relative overflow-hidden">

      <Navigation />

      <HeroSection />

      <AboutSection />

      <section id="since-section">
        <Since2003Section />
      </section>

      <ImpactSection />

      <section id="spotify-section">
        <SpotifySection />
      </section>

      <section id="support-section">
        <SupportSection />
      </section>

      <CTASection />

    </main>
  )
}